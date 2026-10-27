import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";
import { Icon } from "@iconify/react";

const ToastContext = createContext(null);

const AUTO_DISMISS_MS = 4000;
const EXIT_MS = 150;

/** useToast() -> { showToast(message, type), success(msg), error(msg) } */
export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within <ToastProvider>");
  return ctx;
}

/* The timer pauses while the toast is hovered or focused, and while the tab
   is hidden, so a message is never missed. */
function ToastItem({ toast, onRemove }) {
  const [entered, setEntered] = useState(false);
  const [leaving, setLeaving] = useState(false);
  const [held, setHeld] = useState(false);
  const [tabHidden, setTabHidden] = useState(() => document.hidden);
  const remaining = useRef(AUTO_DISMISS_MS);

  useEffect(() => {
    const frame = requestAnimationFrame(() => setEntered(true));
    const onVisibility = () => setTabHidden(document.hidden);
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      cancelAnimationFrame(frame);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  useEffect(() => {
    if (held || tabHidden || leaving) return;
    const started = Date.now();
    const timer = setTimeout(() => setLeaving(true), remaining.current);
    return () => {
      clearTimeout(timer);
      remaining.current -= Date.now() - started;
    };
  }, [held, tabHidden, leaving]);

  useEffect(() => {
    if (!leaving) return;
    const timer = setTimeout(() => onRemove(toast.id), EXIT_MS);
    return () => clearTimeout(timer);
  }, [leaving, onRemove, toast.id]);

  const isError = toast.type === "error";
  const shown = entered && !leaving;

  return (
    <div
      role="status"
      onPointerEnter={() => setHeld(true)}
      onPointerLeave={() => setHeld(false)}
      onFocus={() => setHeld(true)}
      onBlur={() => setHeld(false)}
      className={[
        "chamfer pointer-events-auto flex max-w-md items-start gap-3 bg-surface-3 py-3 pr-2 pl-4 shadow-float",
        "transition-[opacity,translate] ease-out motion-reduce:translate-y-0",
        leaving ? "duration-150" : "duration-200",
        shown ? "translate-y-0 opacity-100" : "-translate-y-2 opacity-0",
        isError ? "text-error" : "text-success",
      ].join(" ")}
    >
      <Icon
        icon={isError ? "ph:warning-circle-fill" : "ph:check-circle-fill"}
        className="mt-0.5 shrink-0 text-lead"
        aria-hidden="true"
      />
      <p className="py-0.5 text-body font-medium text-ink">
        {toast.message}
      </p>
      <button
        type="button"
        onClick={() => setLeaving(true)}
        className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-ink-muted press hover:bg-surface-2 hover:text-ink"
        aria-label="Dismiss notification"
      >
        <Icon icon="ph:x-bold" className="text-small" aria-hidden="true" />
      </button>
    </div>
  );
}

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);
  const idRef = useRef(0);

  const remove = useCallback((id) => {
    setToasts((list) => list.filter((t) => t.id !== id));
  }, []);

  const showToast = useCallback((message, type = "success") => {
    const id = ++idRef.current;
    setToasts((list) => [...list, { id, message, type }]);
  }, []);

  const value = useMemo(
    () => ({
      showToast,
      success: (msg) => showToast(msg, "success"),
      error: (msg) => showToast(msg, "error"),
    }),
    [showToast],
  );

  return (
    <ToastContext.Provider value={value}>
      {children}
      {typeof document !== "undefined" &&
        createPortal(
          <div className="pointer-events-none fixed inset-x-0 top-4 z-[100] flex flex-col items-center gap-2 px-4">
            {toasts.map((toast) => (
              <ToastItem key={toast.id} toast={toast} onRemove={remove} />
            ))}
          </div>,
          document.body,
        )}
    </ToastContext.Provider>
  );
}

export default ToastProvider;

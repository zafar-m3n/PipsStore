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

/** useToast() -> { showToast(message, type), success(msg), error(msg) } */
export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within <ToastProvider>");
  return ctx;
}

function ToastItem({ toast, onClose }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const enter = requestAnimationFrame(() => setVisible(true));
    const timer = setTimeout(() => setVisible(false), AUTO_DISMISS_MS - 220);
    const remove = setTimeout(onClose, AUTO_DISMISS_MS);
    return () => {
      cancelAnimationFrame(enter);
      clearTimeout(timer);
      clearTimeout(remove);
    };
  }, [onClose]);

  const isError = toast.type === "error";

  return (
    <div
      role="status"
      className={[
        "pointer-events-auto flex items-start gap-3 rounded-2xl border px-4 py-3 shadow-pips-hover",
        "transition-all duration-200 ease-out",
        visible
          ? "translate-y-0 scale-100 opacity-100"
          : "-translate-y-2 scale-95 opacity-0",
        isError
          ? "border-pips-bear/30 bg-pips-bear-soft text-pips-bear"
          : "border-pips-bull/30 bg-pips-bull-soft text-pips-bull",
      ].join(" ")}
    >
      <Icon
        icon={isError ? "ph:warning-circle-fill" : "ph:check-circle-fill"}
        className="mt-0.5 shrink-0 text-xl"
      />
      <p className="text-sm font-medium leading-snug text-pips-ink">
        {toast.message}
      </p>
      <button
        type="button"
        onClick={onClose}
        className="ml-1 shrink-0 rounded-full p-0.5 text-pips-muted transition-colors hover:text-pips-ink"
        aria-label="Dismiss notification"
      >
        <Icon icon="ph:x-bold" className="text-sm" />
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
              <ToastItem
                key={toast.id}
                toast={toast}
                onClose={() => remove(toast.id)}
              />
            ))}
          </div>,
          document.body,
        )}
    </ToastContext.Provider>
  );
}

export default ToastProvider;

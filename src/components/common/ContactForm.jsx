import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";
import Select from "react-select";
import http from "@/lib/http.js";
import { getAdTracking, clearAdTracking } from "@/lib/tracking.js";
import { useToast } from "@/components/common/ToastProvider.jsx";
import { EXPERIENCE_OPTIONS } from "@/data/site.js";
import { selectStyles, selectTheme, menuPortalTarget } from "@/lib/selectStyles.js";

const EMPTY = {
  name: "",
  email: "",
  phone: "",
  trading_experience: "",
  botcheck: false,
};

const REQUIRED = [
  ["name", "your full name"],
  ["email", "your email address"],
  ["phone", "your phone number"],
  ["trading_experience", "your trading experience"],
];

const EXPERIENCE_SELECT_OPTIONS = EXPERIENCE_OPTIONS.map((o) => ({
  value: o,
  label: o,
}));

const fieldClass =
  "w-full rounded-xl border border-pips-line bg-pips-surface px-4 py-2.5 text-sm text-pips-ink placeholder:text-pips-muted/70 outline-none transition-shadow focus:border-pips-accent focus:ring-2 focus:ring-pips-accent/30";

export function ContactForm({ className = "", heading, blurb }) {
  const [values, setValues] = useState(EMPTY);
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();
  const toast = useToast();

  const update = (key) => (e) => {
    const val = e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setValues((v) => ({ ...v, [key]: val }));
  };

  const experienceValue = useMemo(
    () =>
      EXPERIENCE_SELECT_OPTIONS.find(
        (o) => o.value === values.trading_experience,
      ) || null,
    [values.trading_experience],
  );

  const onSubmit = async (e) => {
    e.preventDefault();
    if (submitting) return;

    // Honeypot: real users never see or check this.
    if (values.botcheck) return;

    const missing = REQUIRED.find(([key]) => !String(values[key]).trim());
    if (missing) {
      toast.error(`Please enter ${missing[1]}.`);
      return;
    }

    const { gclid = "", keyword = "", location = "" } = getAdTracking();
    const payload = {
      name: values.name.trim(),
      email: values.email.trim(),
      phone: values.phone.trim(),
      trading_experience: values.trading_experience,
      gclid,
      keyword,
      location,
      botcheck: values.botcheck,
    };

    setSubmitting(true);
    try {
      const { data } = await http.post("/api/v1/contact", payload);
      if (data?.code === "OK") {
        setValues(EMPTY);
        clearAdTracking();
        navigate("/thank-you", { state: { fromContactForm: true } });
      } else {
        toast.error(
          data?.message || "Something went wrong. Please try again in a moment.",
        );
      }
    } catch (err) {
      const message =
        err?.response?.data?.message ||
        err?.message ||
        "We couldn't send your message. Please try again shortly.";
      toast.error(message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      className={["card-journal p-5 sm:p-6", className].join(" ")}
    >
      {heading && (
        <h3 className="text-lg font-semibold text-pips-ink">{heading}</h3>
      )}
      {blurb && <p className="mt-1 text-sm text-pips-muted">{blurb}</p>}

      <div className={heading || blurb ? "mt-4 space-y-3" : "space-y-3"}>
        <div>
          <label htmlFor="cf-name" className="sr-only">
            Full name
          </label>
          <input
            id="cf-name"
            type="text"
            autoComplete="name"
            placeholder="Full name"
            className={fieldClass}
            value={values.name}
            onChange={update("name")}
          />
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          <div>
            <label htmlFor="cf-email" className="sr-only">
              Email address
            </label>
            <input
              id="cf-email"
              type="email"
              autoComplete="email"
              placeholder="Email address"
              className={fieldClass}
              value={values.email}
              onChange={update("email")}
            />
          </div>
          <div>
            <label htmlFor="cf-phone" className="sr-only">
              Phone number
            </label>
            <input
              id="cf-phone"
              type="tel"
              autoComplete="tel"
              placeholder="Phone number"
              className={fieldClass}
              value={values.phone}
              onChange={update("phone")}
            />
          </div>
        </div>

        <div>
          <label htmlFor="cf-exp" className="sr-only">
            What is your trading experience?
          </label>
          <Select
            inputId="cf-exp"
            instanceId="cf-exp"
            options={EXPERIENCE_SELECT_OPTIONS}
            value={experienceValue}
            onChange={(opt) =>
              setValues((v) => ({
                ...v,
                trading_experience: opt?.value ?? "",
              }))
            }
            placeholder="What is your trading experience?"
            isSearchable={false}
            styles={selectStyles}
            theme={selectTheme}
            menuPortalTarget={menuPortalTarget}
            aria-label="What is your trading experience?"
          />
        </div>

        {/* Honeypot — visually hidden, off-screen, not focusable */}
        <div aria-hidden="true" className="absolute left-[-9999px] top-[-9999px]">
          <label>
            Leave this box unchecked
            <input
              type="checkbox"
              tabIndex={-1}
              autoComplete="off"
              checked={values.botcheck}
              onChange={update("botcheck")}
            />
          </label>
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-pips-accent px-6 py-3 text-sm font-semibold text-white shadow-pips transition-colors hover:bg-pips-accent-strong disabled:cursor-not-allowed disabled:opacity-70"
        >
          {submitting ? (
            <>
              <Icon icon="ph:circle-notch-bold" className="animate-spin" />
              Sending…
            </>
          ) : (
            <>
              Get started free
              <Icon icon="ph:paper-plane-tilt-bold" className="text-sm" />
            </>
          )}
        </button>

        <p className="text-center text-xs leading-relaxed text-pips-muted">
          Free educational content only. No signals, no spam. See our{" "}
          <Link to="/privacy-policy" className="text-pips-accent hover:underline">
            Privacy Policy
          </Link>
          .
        </p>
      </div>
    </form>
  );
}

export default ContactForm;

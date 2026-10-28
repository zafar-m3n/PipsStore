import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";
import Select from "react-select";
import http from "@/lib/http.js";
import { getAdTracking, clearAdTracking } from "@/lib/tracking.js";
import { useToast } from "@/components/common/ToastProvider.jsx";
import { EXPERIENCE_OPTIONS } from "@/data/site.js";
import { selectStyles, selectTheme, menuPortalTarget } from "@/lib/selectStyles.js";
import { BUTTON_PRIMARY, FIELD, FIELD_FOCUS } from "@/lib/ui.js";

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
  [
    "min-h-12 w-full",
    FIELD,
    "px-4 py-3 text-body text-ink placeholder:text-ink-muted outline-hidden transition-colors",
    FIELD_FOCUS,
  ].join(" ");

function ContactForm({ className = "", heading, blurb, surface = "card" }) {
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
      className={[surface === "glass" ? "glass" : "card", "p-6 sm:p-8", className].join(" ")}
    >
      {heading && (
        <h3 className="text-lead font-bold text-ink">{heading}</h3>
      )}
      {blurb && <p className="mt-2 text-body text-ink-soft">{blurb}</p>}

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
        <div aria-hidden="true" className="absolute -left-[9999px] -top-[9999px]">
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
          className={[BUTTON_PRIMARY, "w-full justify-center py-3 disabled:cursor-not-allowed disabled:opacity-70"].join(" ")}
        >
          <span className="grid">
            <span
              aria-hidden={submitting}
              className={[
                "inline-flex items-center justify-center gap-2 transition-[opacity,filter] duration-200 [grid-area:1/1]",
                submitting ? "opacity-0 blur-[2px]" : "opacity-100",
              ].join(" ")}
            >
              Get started free
              <Icon icon="ph:paper-plane-tilt-bold" aria-hidden="true" />
            </span>
            <span
              aria-hidden={!submitting}
              className={[
                "inline-flex items-center justify-center gap-2 transition-[opacity,filter] duration-200 [grid-area:1/1]",
                submitting ? "opacity-100" : "opacity-0 blur-[2px]",
              ].join(" ")}
            >
              <Icon icon="ph:circle-notch-bold" aria-hidden="true" className={submitting ? "animate-spin motion-reduce:animate-none" : ""} />
              Sending…
            </span>
          </span>
        </button>

        <p className="text-small text-ink-muted">
          Free educational content only. No signals, no spam. See our{" "}
          <Link to="/privacy-policy" className="text-brand underline hover:text-brand-hover">
            Privacy Policy
          </Link>
          .
        </p>
      </div>
    </form>
  );
}

export default ContactForm;

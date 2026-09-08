import { Link } from "react-router-dom";

/* Wordmark with a hand-drawn underline flourish — echoes the
   annotation device used across the site. */
export function Logo({ className = "", onClick }) {
  return (
    <Link
      to="/"
      onClick={onClick}
      className={["inline-flex flex-col leading-none", className].join(" ")}
      aria-label="PipsStore — home"
    >
      <span className="font-display text-xl font-extrabold tracking-tight text-pips-ink">
        Pips<span className="text-pips-accent">Store</span>
      </span>
      <svg
        viewBox="0 0 120 12"
        className="mt-0.5 h-2 w-[88px]"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M2 8C22 3 45 3 60 6c14 3 38 4 58-2"
          stroke="#c2542f"
          strokeWidth="3"
          strokeLinecap="round"
        />
      </svg>
    </Link>
  );
}

export default Logo;

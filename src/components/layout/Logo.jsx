import { Link } from "react-router-dom";
import markUrl from "@/assets/brand/pips-mark.png";
import wordmarkUrl from "@/assets/brand/pips-wordmark.png";

function Logo({ className = "", onClick }) {
  return (
    <Link
      to="/"
      onClick={onClick}
      className={["inline-flex shrink-0 items-center gap-2 rounded-md", className].join(" ")}
      aria-label="PipsStore — home"
    >
      <img src={markUrl} alt="" width={121} height={96} className="h-7 w-auto sm:h-8" />
      <img src={wordmarkUrl} alt="" width={402} height={48} className="h-3.5 w-auto sm:h-4" />
    </Link>
  );
}

export default Logo;

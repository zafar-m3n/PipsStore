import { Link } from "react-router-dom";
import { Icon } from "@iconify/react";
import { BUTTON_PRIMARY } from "@/lib/ui.js";

/* The site's primary call to action: a router link, or a plain anchor for
   in-page jumps (`href`). */
function ButtonLink({ to, href, icon = "ph:arrow-right-bold", className = "", children }) {
  const cls = [BUTTON_PRIMARY, className].filter(Boolean).join(" ");
  const content = (
    <>
      {children}
      {icon && <Icon icon={icon} aria-hidden="true" />}
    </>
  );

  return href ? (
    <a href={href} className={cls}>
      {content}
    </a>
  ) : (
    <Link to={to} className={cls}>
      {content}
    </Link>
  );
}

export default ButtonLink;

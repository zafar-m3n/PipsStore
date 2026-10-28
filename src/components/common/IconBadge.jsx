import { Icon } from "@iconify/react";

/* A bare inline icon in the brand colour. No tinted square. */
const SIZES = {
  sm: "text-lead",
  md: "text-title",
  lg: "text-title",
};

function IconBadge({ icon, size = "md", className = "" }) {
  return (
    <Icon
      icon={icon}
      aria-hidden="true"
      className={["shrink-0 text-brand", SIZES[size] || SIZES.md, className].join(" ")}
    />
  );
}

export default IconBadge;

/* Shared react-select styling, driven by the CSS tokens in src/index.css.
   Used by the contact form and the calculator pair pickers. */

const v = (name) => `var(--color-${name})`;

export const selectStyles = {
  control: (base, state) => ({
    ...base,
    minHeight: 48,
    backgroundColor: v("surface-2"),
    borderColor: state.isFocused ? v("brand") : v("field"),
    borderRadius: 4,
    boxShadow: state.isFocused ? `0 0 0 1px ${v("brand")}` : "none",
    fontSize: "var(--text-body)",
    transition: "border-color 120ms ease, box-shadow 120ms ease",
    "&:hover": { borderColor: v("brand") },
  }),
  valueContainer: (base) => ({ ...base, padding: "2px 16px" }),
  singleValue: (base) => ({ ...base, color: v("ink") }),
  placeholder: (base) => ({ ...base, color: v("ink-muted") }),
  input: (base) => ({ ...base, color: v("ink") }),
  indicatorSeparator: () => ({ display: "none" }),
  dropdownIndicator: (base, state) => ({
    ...base,
    color: state.isFocused ? v("brand") : v("ink-muted"),
    "&:hover": { color: v("brand") },
  }),
  clearIndicator: (base) => ({
    ...base,
    color: v("ink-muted"),
    "&:hover": { color: v("brand") },
  }),
  menu: (base) => ({
    ...base,
    backgroundColor: v("surface-3"),
    borderRadius: 4,
    overflow: "hidden",
    boxShadow: "var(--shadow-float)",
  }),
  menuPortal: (base) => ({ ...base, zIndex: 60 }),
  menuList: (base) => ({ ...base, padding: 4 }),
  option: (base, state) => ({
    ...base,
    borderRadius: 4,
    fontSize: "var(--text-body)",
    cursor: "pointer",
    color: state.isSelected ? v("on-brand") : v("ink"),
    backgroundColor: state.isSelected
      ? v("brand")
      : state.isFocused
        ? v("surface-2")
        : "transparent",
    "&:active": { backgroundColor: v("brand-press"), color: v("on-brand") },
  }),
};

export const selectTheme = (theme) => ({
  ...theme,
  colors: {
    ...theme.colors,
    primary: v("brand"),
    primary25: v("surface-2"),
    primary50: v("surface-3"),
    primary75: v("surface-3"),
    neutral0: v("surface-2"),
    neutral20: v("field"),
    neutral30: v("brand"),
    neutral50: v("ink-muted"),
    neutral80: v("ink"),
  },
});

/* Portal menus to <body> so they escape overflow/rounded card clipping. */
export const menuPortalTarget =
  typeof document !== "undefined" ? document.body : undefined;

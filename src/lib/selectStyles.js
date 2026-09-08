/* Shared react-select styling so every dropdown matches the PipsStore
   notebook palette — warm paper background, terracotta focus, no default
   blue anywhere. Used by the contact form and the calculator pair pickers. */

const PIPS = {
  surface: "#fffdf9",
  line: "#e7ddd0",
  ink: "#2f2620",
  inkSoft: "#4b4038",
  muted: "#8a7d72",
  accent: "#c2542f",
  accentSoft: "#f0d9cd",
  accentTint: "#fbeee7",
};

export const selectStyles = {
  control: (base, state) => ({
    ...base,
    minHeight: 44,
    backgroundColor: PIPS.surface,
    borderColor: state.isFocused ? PIPS.accent : PIPS.line,
    borderRadius: 12,
    boxShadow: state.isFocused ? `0 0 0 3px ${PIPS.accent}33` : "none",
    fontSize: 14,
    transition: "border-color 120ms ease, box-shadow 120ms ease",
    "&:hover": { borderColor: PIPS.accent },
  }),
  valueContainer: (base) => ({ ...base, padding: "2px 12px" }),
  singleValue: (base) => ({ ...base, color: PIPS.ink }),
  placeholder: (base) => ({ ...base, color: `${PIPS.muted}b3` }),
  input: (base) => ({ ...base, color: PIPS.ink }),
  indicatorSeparator: (base) => ({ ...base, backgroundColor: PIPS.line }),
  dropdownIndicator: (base, state) => ({
    ...base,
    color: state.isFocused ? PIPS.accent : PIPS.muted,
    "&:hover": { color: PIPS.accent },
  }),
  clearIndicator: (base) => ({
    ...base,
    color: PIPS.muted,
    "&:hover": { color: PIPS.accent },
  }),
  menu: (base) => ({
    ...base,
    backgroundColor: PIPS.surface,
    border: `1px solid ${PIPS.line}`,
    borderRadius: 12,
    overflow: "hidden",
    boxShadow: "0 12px 30px rgba(47, 38, 32, 0.14)",
  }),
  menuPortal: (base) => ({ ...base, zIndex: 60 }),
  menuList: (base) => ({ ...base, padding: 4 }),
  option: (base, state) => ({
    ...base,
    borderRadius: 8,
    fontSize: 14,
    cursor: "pointer",
    color: state.isSelected ? "#ffffff" : PIPS.inkSoft,
    backgroundColor: state.isSelected
      ? PIPS.accent
      : state.isFocused
        ? PIPS.accentTint
        : "transparent",
    "&:active": { backgroundColor: PIPS.accentSoft },
  }),
};

export const selectTheme = (theme) => ({
  ...theme,
  colors: {
    ...theme.colors,
    primary: PIPS.accent,
    primary25: PIPS.accentTint,
    primary50: PIPS.accentSoft,
    primary75: PIPS.accentSoft,
    neutral20: PIPS.line,
    neutral30: PIPS.accent,
  },
});

/* Portal menus to <body> so they escape overflow/rounded card clipping. */
export const menuPortalTarget =
  typeof document !== "undefined" ? document.body : undefined;

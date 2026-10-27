/* Site facts, counted from the real content so they can't drift from it. */
import { LEARNING_PATHS } from "@/data/learningPaths.js";
import { TOOLS_PREVIEW } from "@/data/tools.js";
import { GLOSSARY_TERMS } from "@/data/glossary.js";

export const SITE_FACTS = [
  { value: LEARNING_PATHS.length, label: "learning paths" },
  { value: TOOLS_PREVIEW.filter((t) => !t.to).length, label: "free calculators" },
  { value: GLOSSARY_TERMS.length, label: "glossary terms" },
  { value: "100%", label: "free, no account" },
];

/* Glossary search shared by Home and the Academy: matches the term or its
   definition, optionally within one category, with an exact term match first. */
export function filterGlossary(terms, { query = "", category = "All" } = {}) {
  const q = query.trim().toLowerCase();
  return terms
    .filter((t) => {
      const inCategory = category === "All" || t.category === category;
      const matches = !q || t.term.toLowerCase().includes(q) || t.definition.toLowerCase().includes(q);
      return inCategory && matches;
    })
    .sort((a, b) => (b.term.toLowerCase() === q) - (a.term.toLowerCase() === q));
}

import SectionIntro from "@/components/common/SectionIntro.jsx";

/* An editorial chapter for long-form pages: the serif title, intro and any
   controls stay pinned in a narrow left column while the content scrolls
   past on the right. Stacks on small screens. */
function Chapter({ id, titleId, title, intro, introWidth = "40ch", aside, lit = false, className = "", children }) {
  return (
    <section
      id={id}
      aria-labelledby={titleId}
      className={[lit ? "section-lit py-section" : "py-section", className].join(" ")}
    >
      <div className="container-page grid gap-10 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-28">
            <SectionIntro id={titleId} title={title} width={introWidth}>
              {intro}
            </SectionIntro>
            {aside && <div className="mt-8">{aside}</div>}
          </div>
        </div>
        <div className="min-w-0 lg:col-span-8">{children}</div>
      </div>
    </section>
  );
}

export default Chapter;

/**
 * Category photography, keyed by course-category id.
 *
 * Sources are the client's own course images, archived from their legacy
 * lp.rehtraining.co.za landing pages (`.firecrawl/lp/*.md`) and cropped/optimised to
 * 16:10 in `public/images/categories/`. They are shared by the home-page category cards
 * and the /courses category filter tiles + section covers, so the files are listed in
 * exactly one place. Swap for real centre photos when the client sends them.
 */
export type CategoryImage = { src: string; alt: string };

export const CATEGORY_IMAGES: Record<string, CategoryImage> = {
  "safety-compliance": {
    src: "/images/categories/safety-compliance.jpg",
    alt: "Two site workers in PPE reviewing risk assessment documentation",
  },
  "heights-and-access": {
    src: "/images/categories/heights-and-access.jpg",
    alt: "Learner in a fall-arrest harness during working at heights training",
  },
  "emergency-courses": {
    src: "/images/categories/emergency-courses.jpg",
    alt: "Firefighting practical — trainee using a fire extinguisher on a live fire",
  },
  "technical-courses": {
    src: "/images/categories/technical-courses.jpg",
    alt: "Construction site with tower crane during technical skills training",
  },
  "machines-tools": {
    src: "/images/categories/machines-tools.jpg",
    alt: "Plant operator in a cherry picker during machine operator training",
  },
  "dangerous-goods": {
    src: "/images/categories/dangerous-goods.jpg",
    alt: "Hazchem tanker transporting dangerous goods by road",
  },
};

/** Same contract as the category lookups in lib/courses.ts: throw loudly, never render blank. */
export function categoryImage(id: string): CategoryImage {
  const image = CATEGORY_IMAGES[id];
  if (!image) throw new Error(`Missing category image: ${id}`);
  return image;
}

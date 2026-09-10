import { ImageResponse } from "next/og";
import { ALL_COURSES_WITH_SLUG } from "@/lib/slugs";
import { SITE } from "@/lib/site";
import { COURSE_CATEGORIES } from "@/lib/courses";

/**
 * Per-course Open Graph card. Next wires this file to the route automatically, so each
 * of the 94 course pages gets its own share card (course name, category, price) instead
 * of the generic site card — which is what makes a link look credible when it lands in
 * WhatsApp, LinkedIn or a client's inbox.
 */
export const alt = "RSTL Centre course";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function CourseOgImage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const course = ALL_COURSES_WITH_SLUG.find((c) => c.slug === slug);
  const category = COURSE_CATEGORIES.find((c) => c.id === course?.categoryId)?.title ?? "Health & Safety";
  const name = course?.name ?? "Health & Safety Training";
  const price = course?.price ? `${course.price} per learner` : "Request a quote";
  const duration = course?.duration && course.duration !== "To Quote" ? course.duration : null;

  // Long course names need to step down or they overflow the card.
  const titleSize = name.length > 46 ? 54 : name.length > 30 ? 64 : 76;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          background: "#252423",
          padding: "0",
        }}
      >
        <div style={{ height: 14, background: "#e21c14", width: "100%" }} />
        <div style={{ display: "flex", flex: 1, padding: "56px 72px", gap: 32 }}>
          <div style={{ width: 14, background: "#e21c14", borderRadius: 4, display: "flex" }} />
          <div style={{ display: "flex", flexDirection: "column", flex: 1, justifyContent: "space-between" }}>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <div style={{ color: "#9c6a3d", fontSize: 26, fontWeight: 700, letterSpacing: 3, textTransform: "uppercase" }}>
                {category}
              </div>
              <div style={{ color: "#f5f0ec", fontSize: titleSize, fontWeight: 700, marginTop: 22, lineHeight: 1.1 }}>
                {name}
              </div>
              <div style={{ display: "flex", marginTop: 30, gap: 14 }}>
                <div
                  style={{
                    display: "flex",
                    background: "#e21c14",
                    color: "#ffffff",
                    fontSize: 28,
                    fontWeight: 700,
                    padding: "10px 22px",
                    borderRadius: 999,
                  }}
                >
                  {price}
                </div>
                {duration ? (
                  <div
                    style={{
                      display: "flex",
                      border: "2px solid #4a4744",
                      color: "#d9d2cb",
                      fontSize: 28,
                      padding: "10px 22px",
                      borderRadius: 999,
                    }}
                  >
                    {duration}
                  </div>
                ) : null}
              </div>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
              <div style={{ display: "flex", color: "#f5f0ec", fontSize: 30, fontWeight: 700 }}>{SITE.name}</div>
              <div style={{ display: "flex", color: "#a59e96", fontSize: 24 }}>
                Midrand · Durban · Mthatha · {SITE.phoneDisplay}
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
    size
  );
}

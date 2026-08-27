// SAMPLE reviews for pitch/preview purposes ONLY.
// Every record is flagged sample:true and rendered with a "Sample" badge.
// Real reviews replace these at launch (the /api/reviews backend is already wired).
import type { Review } from "@/components/ReviewsSection";

export const SAMPLE_REVIEWS: (Review & { sample?: boolean })[] = [
  {
    id: 9001,
    author_name: "Mandla Dlamini",
    rating: 5,
    comment:
      "Trained our whole site team on Working at Heights. Practical from the first hour and the assessor knew the SANS requirements inside out. Certificates came through quickly.",
    course_slug: "working-at-heights",
    course_name: "Working at Heights",
    created_at: new Date(Date.now() - 2 * 86400000).toISOString(),
    sample: true,
  },
  {
    id: 9002,
    author_name: "Charmaine Peters",
    rating: 5,
    comment:
      "Booked First Aid Level 1 for 12 staff on a Friday, done by Monday. Daily classes really do mean no waiting. The trainer kept it engaging the whole day.",
    course_slug: "first-aid-level-1",
    course_name: "First Aid Level 1",
    created_at: new Date(Date.now() - 5 * 86400000).toISOString(),
    sample: true,
  },
  {
    id: 9003,
    author_name: "Sibusiso Mokoena",
    rating: 4,
    comment:
      "Good value for the Safety Officer programme. Ten days is intense but the material is practical and you leave ready to run a safety file properly.",
    course_slug: "safety-officer-skills-programme",
    course_name: "Safety Officer Skills Programme",
    created_at: new Date(Date.now() - 9 * 86400000).toISOString(),
    sample: true,
  },
  {
    id: 9004,
    author_name: "Lerato Nkosi",
    rating: 5,
    comment:
      "Forklift training at our warehouse, no lost production time. The operator is confident and the documentation was sorted for our client audit.",
    course_slug: "forklift-operator",
    course_name: "Forklift Operator",
    created_at: new Date(Date.now() - 14 * 86400000).toISOString(),
    sample: true,
  },
  {
    id: 9005,
    author_name: "Pieter van der Merwe",
    rating: 5,
    comment:
      "We use REH for all our scaffolding tickets now. Clean site, proper equipment, and they arranged the group rate without any back and forth.",
    course_slug: "scaffolding-erector",
    course_name: "Scaffolding Erector",
    created_at: new Date(Date.now() - 21 * 86400000).toISOString(),
    sample: true,
  },
  {
    id: 9006,
    author_name: "Nompumelelo Zulu",
    rating: 5,
    comment:
      "Fire Marshal course was exactly what our compliance officer asked for. Clear, practical, and the certificate matches the unit standard we needed.",
    course_slug: "fire-marshal",
    course_name: "Fire Marshal",
    created_at: new Date(Date.now() - 30 * 86400000).toISOString(),
    sample: true,
  },
  {
    id: 9007,
    author_name: "Thabo Nkosi",
    rating: 5,
    comment:
      "Risk Assessment (HIRA) for our maintenance team. The trainer walked through real scenarios from our own site, which made it stick.",
    course_slug: "risk-assessment-hira",
    course_name: "Risk Assessment (HIRA)",
    created_at: new Date(Date.now() - 40 * 86400000).toISOString(),
    sample: true,
  },
  {
    id: 9008,
    author_name: "Anneline Botha",
    rating: 4,
    comment:
      "Arranged COIDA training for our admin team. Quick response on email and the certificates were issued the same week.",
    course_slug: "coida",
    course_name: "COIDA (Compensation for Occupational Injuries & Diseases Act)",
    created_at: new Date(Date.now() - 55 * 86400000).toISOString(),
    sample: true,
  },
];

// One-off cleanup: remove the leads created by local API testing so the client's
// live lead store contains no fabricated entries.
import { list, del } from "@vercel/blob";

const { blobs } = await list({ prefix: "leads/", limit: 1000 });
console.log(`found ${blobs.length} lead blob(s)`);

const testIds = process.argv.slice(2);
if (testIds.length === 0) {
  console.error(
    "Refusing to run without explicit lead ids — pass the ids to delete as arguments.\n" +
      "Running with no arguments would delete EVERY stored lead.\n" +
      "Usage: node scripts/cleanup-test-leads.mjs <id> [id...]"
  );
  process.exit(1);
}

for (const b of blobs) {
  const path = b.pathname || b.url;
  const isTest = testIds.some((id) => path.includes(id));
  if (!isTest) {
    console.log("keeping (not a listed test id):", path);
    continue;
  }
  await del(b.url);
  console.log("deleted:", path);
}

const after = await list({ prefix: "leads/", limit: 1000 });
console.log(`leads remaining: ${after.blobs.length}`);

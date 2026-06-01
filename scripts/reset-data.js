// Clears test/sample data so the site is fresh for real classmates.
//
//   npm run db:reset            -> clears all profiles, posts, photos, comments,
//                                  likes, memorials (KEEPS member accounts)
//   npm run db:reset -- --all   -> also deletes every member account
//
// The 56 yearbook throwback images (files in public/gallery) are NOT affected;
// their gallery entries simply re-create themselves, empty, on next visit.

require("dotenv").config({ path: ".env.local" });
const { Client } = require("pg");

function sslConfig() {
  const url = process.env.DATABASE_URL || "";
  if (process.env.PGSSL === "require") return { rejectUnauthorized: false };
  if (process.env.PGSSL === "disable") return false;
  const isLocal = /@(localhost|127\.0\.0\.1)(:|\/)/.test(url);
  return isLocal ? false : { rejectUnauthorized: false };
}

async function main() {
  if (!process.env.DATABASE_URL) {
    console.error("\n  Missing DATABASE_URL in .env.local\n");
    process.exit(1);
  }
  const wipeAccounts = process.argv.includes("--all");
  const client = new Client({ connectionString: process.env.DATABASE_URL, ssl: sslConfig() });
  await client.connect();

  console.log("Clearing content (classmates, memorials, feed, gallery uploads, comments, likes, photos)...");
  await client.query(
    "TRUNCATE comments, likes, gallery_posts, feed_replies, feed_posts, flashback_photos, memorials, classmates, photos, password_resets RESTART IDENTITY CASCADE;"
  );

  if (wipeAccounts) {
    console.log("Deleting all member accounts...");
    await client.query("TRUNCATE members RESTART IDENTITY CASCADE;");
  }

  await client.end();
  console.log(
    wipeAccounts
      ? "\nDone. All content AND accounts cleared — totally fresh.\n"
      : "\nDone. All content cleared. Member accounts were kept.\n"
  );
}

main().catch((e) => { console.error(e); process.exit(1); });

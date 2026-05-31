import site from "@/lib/site-config";
import { getFeedPosts } from "@/lib/data";
import { timeAgo } from "@/lib/format";
import { hasAccess } from "@/lib/access";
import { createPublicPost } from "../actions";
import AccessGate from "../components/AccessGate";

export const dynamic = "force-dynamic";

export const metadata = { title: "Classmates Feed" };

export default async function FeedPage({ searchParams }) {
  const posts = await getFeedPosts();
  const unlocked = hasAccess();

  return (
    <>
      <div className="page-header">
        <div className="container">
          <h1>Classmates Feed</h1>
          <p>Catch up, reminisce, and get hyped for the Class of {site.classYear} reunion.</p>
        </div>
      </div>

      <section className="section">
        <div className="container">
          <div className="feed">
            {site.allowPublicPosts && (
              <div style={{ marginBottom: 28 }}>
                <AccessGate unlocked={unlocked} redirectTo="/feed" badCode={searchParams?.badcode} title="Post to the feed" blurb="Enter the class access code to post an update.">
                  <form action={createPublicPost} className="form" style={{ maxWidth: "none" }}>
                    <label htmlFor="author">Your name</label>
                    <input id="author" name="author" required placeholder="Jordan Avery" />
                    <label htmlFor="body">Say something</label>
                    <textarea id="body" name="body" required placeholder="Can't wait to see everyone in April!" />
                    <button className="btn" type="submit">Post to the Feed</button>
                  </form>
                </AccessGate>
              </div>
            )}

            {posts.length === 0 ? (
              <p className="empty">No posts yet. Be the first to say hi!</p>
            ) : (
              posts.map((p) => (
                <article key={p.id} className="post">
                  <div>
                    <span className="author">{p.author}</span>{" "}
                    <span className="time">· {timeAgo(p.created_at)}</span>
                  </div>
                  <p className="body">{p.body}</p>
                </article>
              ))
            )}
          </div>
        </div>
      </section>
    </>
  );
}

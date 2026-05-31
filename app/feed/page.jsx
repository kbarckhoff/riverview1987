import Link from "next/link";
import site from "@/lib/site-config";
import { getFeedPosts } from "@/lib/data";
import { timeAgo } from "@/lib/format";
import { getCurrentMember } from "@/lib/member-auth";
import { createFeedPost } from "../actions";

export const dynamic = "force-dynamic";
export const metadata = { title: "Classmates Feed" };

export default async function FeedPage() {
  const posts = await getFeedPosts();
  const me = await getCurrentMember();
  return (
    <>
      <div className="page-header"><div className="container">
        <h1>Classmates Feed</h1>
        <p>Catch up, reminisce, and get hyped for the Class of {site.classYear} reunion.</p>
      </div></div>

      <section className="section"><div className="container"><div className="feed">
        {me ? (
          <form action={createFeedPost} className="form" style={{ maxWidth: "none", marginBottom: 28 }}>
            <label>Say something</label>
            <textarea name="body" required placeholder={`Posting as ${me.name}`} />
            <button className="btn" type="submit">Post to the Feed</button>
          </form>
        ) : (
          <p className="notice" style={{ marginBottom: 28, textAlign: "center" }}>
            <Link href="/account/login">Log in</Link> or <Link href="/account/register">create an account</Link> to post.
          </p>
        )}

        {posts.length === 0 ? (
          <p className="empty">No posts yet. Be the first to say hi!</p>
        ) : (
          posts.map((p) => (
            <article key={p.id} className="post">
              <div><span className="author">{p.author}</span> <span className="time">· {timeAgo(p.created_at)}</span></div>
              <p className="body">{p.body}</p>
            </article>
          ))
        )}
      </div></div></section>
    </>
  );
}

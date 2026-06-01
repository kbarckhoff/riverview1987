import Link from "next/link";
import site from "@/lib/site-config";
import { getFeedPosts } from "@/lib/data";
import { getFeedReplies } from "@/lib/community";
import { timeAgo } from "@/lib/format";
import { getCurrentMember } from "@/lib/member-auth";
import { createFeedPost, createFeedReply, adminDeleteFeedPost, adminDeleteFeedReply } from "../actions";

export const dynamic = "force-dynamic";
export const metadata = { title: "Classmates Feed" };

export default async function FeedPage() {
  const posts = await getFeedPosts();
  const me = await getCurrentMember();
  const replies = await getFeedReplies(posts.map((p) => p.id));

  return (
    <>
      <div className="page-header"><div className="container">
        <h1>Classmates Feed</h1>
        <p>Start a conversation, reply to classmates, and reminisce together.</p>
      </div></div>

      <section className="section"><div className="container"><div className="feed">
        {me ? (
          <form action={createFeedPost} className="form" style={{ maxWidth: "none", marginBottom: 28 }}>
            <label>Start a new thread</label>
            <textarea name="body" required placeholder={`What's on your mind, ${me.name.split(" ")[0]}?`} />
            <button className="btn" type="submit">Post</button>
          </form>
        ) : (
          <p className="notice" style={{ marginBottom: 28, textAlign: "center" }}>
            <Link href="/account/login">Log in</Link> or <Link href="/account/register">create an account</Link> to post and reply.
          </p>
        )}

        {posts.length === 0 ? (
          <p className="empty">No conversations yet. Start one!</p>
        ) : (
          posts.map((p) => {
            const rs = replies[p.id] || [];
            return (
              <article key={p.id} className="thread">
                <div className="post">
                  <div className="post-top">
                    <div><span className="author">{p.author}</span> <span className="time">· {timeAgo(p.created_at)}</span></div>
                    {me?.is_admin ? (
                      <form action={adminDeleteFeedPost}><input type="hidden" name="post_id" value={p.id} /><button className="cmt-del" title="Delete thread">×</button></form>
                    ) : null}
                  </div>
                  <p className="body">{p.body}</p>
                </div>

                <div className="replies">
                  {rs.length ? rs.map((r) => (
                    <div key={r.id} className="reply">
                      <div className="reply-main">
                        <span className="cmt-author">{r.author_name}</span> {r.body}
                        <span className="reply-time"> · {timeAgo(r.created_at)}</span>
                      </div>
                      {me?.is_admin ? (
                        <form action={adminDeleteFeedReply} style={{ display: "inline" }}><input type="hidden" name="reply_id" value={r.id} /><button className="cmt-del" title="Delete reply">×</button></form>
                      ) : null}
                    </div>
                  )) : <p className="reply-empty">No replies yet.</p>}

                  {me ? (
                    <form action={createFeedReply} className="cmt-form">
                      <input type="hidden" name="post_id" value={p.id} />
                      <input name="body" required placeholder="Write a reply…" />
                      <button className="btn" type="submit">Reply</button>
                    </form>
                  ) : null}
                </div>
              </article>
            );
          })
        )}
      </div></div></section>
    </>
  );
}

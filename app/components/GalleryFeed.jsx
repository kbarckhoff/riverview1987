import Link from "next/link";
import { timeAgo } from "@/lib/format";
import PhotoUploadClient from "./PhotoUploadClient";
import { addComment, toggleLike, adminDeletePost, adminDeleteComment } from "../actions";

export default function GalleryFeed({ me, posts, comments, category, uploadTitle, uploadButton, captionPlaceholder, emptyText, commentPlaceholder }) {
  return (
    <>
      {me ? (
        <PhotoUploadClient category={category} title={uploadTitle} buttonText={uploadButton} captionPlaceholder={captionPlaceholder} />
      ) : (
        <p className="notice" style={{ maxWidth: 640, margin: "0 auto 30px", textAlign: "center" }}>
          <Link href="/account/login">Log in</Link> or <Link href="/account/register">create an account</Link> to post, like, and comment.
        </p>
      )}

      {posts.length === 0 ? (
        <p className="empty" style={{ textAlign: "center" }}>{emptyText || "Nothing here yet."}</p>
      ) : (
        <div className="gallery-feed">
          {posts.map((p) => (
            <article key={p.id} className="gpost">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img className="gpost-img" src={p.image_url} alt={p.caption || "Raiders photo"} loading="lazy" />
              <div className="gpost-body">
                <div className="gpost-head">
                  <span className="gpost-author">{p.poster_name || "Raiders Throwback"}</span>
                  <span className="gpost-time">{timeAgo(p.created_at)}</span>
                </div>
                {p.caption ? <p className="gpost-caption">{p.caption}</p> : null}

                <div className="gpost-actions">
                  <form action={toggleLike}>
                    <input type="hidden" name="post_id" value={p.id} />
                    <button className={`likebtn${p.liked ? " liked" : ""}`} type="submit" disabled={!me} title={me ? "" : "Log in to like"}>♥ {p.like_count}</button>
                  </form>
                  <span className="gpost-cc">{p.comment_count} comment{p.comment_count === 1 ? "" : "s"}</span>
                  {me?.is_admin ? (
                    <form action={adminDeletePost} style={{ marginLeft: "auto" }}>
                      <input type="hidden" name="post_id" value={p.id} />
                      <button className="btn btn-danger" type="submit">Delete</button>
                    </form>
                  ) : null}
                </div>

                {(comments[p.id] || []).length ? (
                  <div className="comments">
                    {(comments[p.id] || []).map((c) => (
                      <div key={c.id} className="cmt">
                        <span className="cmt-author">{c.author_name}</span> {c.body}
                        {me?.is_admin ? (
                          <form action={adminDeleteComment} style={{ display: "inline" }}>
                            <input type="hidden" name="comment_id" value={c.id} />
                            <button className="cmt-del" type="submit" title="Delete comment">×</button>
                          </form>
                        ) : null}
                      </div>
                    ))}
                  </div>
                ) : null}

                {me ? (
                  <form action={addComment} className="cmt-form">
                    <input type="hidden" name="post_id" value={p.id} />
                    <input name="body" required placeholder={commentPlaceholder || "Add a comment…"} />
                    <button className="btn" type="submit">Post</button>
                  </form>
                ) : null}
              </div>
            </article>
          ))}
        </div>
      )}
    </>
  );
}

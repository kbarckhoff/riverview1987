import { getFeedPosts } from "@/lib/data";
import { timeAgo } from "@/lib/format";
import AdminNav from "../AdminNav";
import { addFeedPost, deleteFeedPost } from "../actions";

export const dynamic = "force-dynamic";
export const metadata = { title: "Manage Feed" };

export default async function AdminFeed() {
  const posts = await getFeedPosts();

  return (
    <>
      <AdminNav />
      <section className="section">
        <div className="container">
          <h1>Feed</h1>
          <div className="admin-grid">
            <div>
              <h3>Post an update</h3>
              <form action={addFeedPost} className="form" style={{ maxWidth: "none" }}>
                <label>Author *</label>
                <input name="author" required placeholder="Reunion Committee" />
                <label>Message *</label>
                <textarea name="body" required placeholder="Tickets are now on sale!" />
                <button className="btn btn-primary" type="submit">Post</button>
              </form>
            </div>

            <div>
              <h3>All posts ({posts.length})</h3>
              {posts.length === 0 ? (
                <p className="empty">None yet.</p>
              ) : (
                posts.map((p) => (
                  <div key={p.id} className="list-row">
                    <div>
                      <strong>{p.author}</strong>{" "}
                      <span className="time">· {timeAgo(p.created_at)}</span>
                      <div className="meta" style={{ margin: 0 }}>{p.body}</div>
                    </div>
                    <form action={deleteFeedPost}>
                      <input type="hidden" name="id" value={p.id} />
                      <button className="btn btn-danger" type="submit">Delete</button>
                    </form>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

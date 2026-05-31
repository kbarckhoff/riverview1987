import { getMemorials } from "@/lib/data";
import AdminNav from "../AdminNav";
import { addMemorial, deleteMemorial } from "../actions";

export const dynamic = "force-dynamic";
export const metadata = { title: "Manage Memorials" };

export default async function AdminMemorials() {
  const memorials = await getMemorials();

  return (
    <>
      <AdminNav />
      <section className="section">
        <div className="container">
          <h1>Memorials</h1>
          <div className="admin-grid">
            <div>
              <h3>Add a memorial</h3>
              <form action={addMemorial} className="form" style={{ maxWidth: "none" }}>
                <label>Full name *</label>
                <input name="full_name" required placeholder="Daniel Cooper" />
                <div className="two-col">
                  <div>
                    <label>Birth year</label>
                    <input name="birth_year" inputMode="numeric" placeholder="1987" />
                  </div>
                  <div>
                    <label>Year passed</label>
                    <input name="passed_year" inputMode="numeric" placeholder="2019" />
                  </div>
                </div>
                <label>Tribute</label>
                <textarea name="tribute" placeholder="A short remembrance." />
                <label>Photo URL</label>
                <input name="photo_url" placeholder="https://..." />
                <button className="btn btn-primary" type="submit">Add Memorial</button>
              </form>
            </div>

            <div>
              <h3>Current list ({memorials.length})</h3>
              {memorials.length === 0 ? (
                <p className="empty">None yet.</p>
              ) : (
                memorials.map((m) => (
                  <div key={m.id} className="list-row">
                    <div>
                      <strong>{m.full_name}</strong>
                      <div className="meta" style={{ margin: 0 }}>
                        {m.birth_year || "?"} – {m.passed_year || "?"}
                      </div>
                    </div>
                    <form action={deleteMemorial}>
                      <input type="hidden" name="id" value={m.id} />
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

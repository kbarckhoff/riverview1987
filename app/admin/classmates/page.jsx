import { getClassmates } from "@/lib/data";
import AdminNav from "../AdminNav";
import { addClassmate, deleteClassmate } from "../actions";

export const dynamic = "force-dynamic";
export const metadata = { title: "Manage Classmates" };

export default async function AdminClassmates() {
  const classmates = await getClassmates();

  return (
    <>
      <AdminNav />
      <section className="section">
        <div className="container">
          <h1>Classmates</h1>
          <div className="admin-grid">
            <div>
              <h3>Add a classmate</h3>
              <form action={addClassmate} className="form" style={{ maxWidth: "none" }}>
                <label>Full name *</label>
                <input name="full_name" required placeholder="Maria Delgado" />

                <div className="two-col">
                  <div>
                    <label>Maiden name</label>
                    <input name="maiden_name" placeholder="Reyes" />
                  </div>
                  <div>
                    <label>Current city</label>
                    <input name="current_city" placeholder="Austin, TX" />
                  </div>
                </div>

                <label>Occupation</label>
                <input name="occupation" placeholder="Pediatric Nurse" />

                <label>Bio</label>
                <textarea name="bio" placeholder="A few sentences about what they've been up to." />

                <div className="two-col">
                  <div>
                    <label>Map latitude</label>
                    <input name="lat" inputMode="decimal" placeholder="30.2672" />
                  </div>
                  <div>
                    <label>Map longitude</label>
                    <input name="lng" inputMode="decimal" placeholder="-97.7431" />
                  </div>
                </div>

                <label>"Then" photo URL</label>
                <input name="photo_then_url" placeholder="https://..." />
                <label>"Now" photo URL</label>
                <input name="photo_now_url" placeholder="https://..." />

                <button className="btn btn-primary" type="submit">Add Classmate</button>
              </form>
              <p className="notice" style={{ marginTop: 14 }}>
                Tip: to place someone on the map, look up their city's latitude/longitude
                (e.g. search "Austin TX lat long") and paste the numbers above.
              </p>
            </div>

            <div>
              <h3>Current list ({classmates.length})</h3>
              {classmates.length === 0 ? (
                <p className="empty">None yet.</p>
              ) : (
                classmates.map((c) => (
                  <div key={c.id} className="list-row">
                    <div>
                      <strong>{c.full_name}</strong>
                      <div className="meta" style={{ margin: 0 }}>{c.current_city || "—"}</div>
                    </div>
                    <form action={deleteClassmate}>
                      <input type="hidden" name="id" value={c.id} />
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

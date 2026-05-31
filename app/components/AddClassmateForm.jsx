import { addClassmateProfile } from "../actions";

export default function AddClassmateForm() {
  return (
    <form action={addClassmateProfile} className="form" style={{ maxWidth: "none" }}>
      <label>Full name *</label>
      <input name="full_name" required placeholder="Your name" />

      <div className="two-col">
        <div>
          <label>Maiden name</label>
          <input name="maiden_name" placeholder="(if applicable)" />
        </div>
        <div>
          <label>City &amp; state</label>
          <input name="current_city" placeholder="Austin, TX" />
        </div>
      </div>

      <label>What do you do?</label>
      <input name="occupation" placeholder="Occupation / what you're up to" />

      <label>A little about you</label>
      <textarea name="bio" placeholder="Share an update, a favorite RHS memory, anything." />

      <div className="two-col">
        <div>
          <label>Senior photo (then)</label>
          <input type="file" name="photo_then" accept="image/*" />
        </div>
        <div>
          <label>Current photo (now)</label>
          <input type="file" name="photo_now" accept="image/*" />
        </div>
      </div>

      <button className="btn" type="submit">Add Me to the Directory</button>
    </form>
  );
}

import Link from "next/link";
import site from "@/lib/site-config";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div>
          <strong>
            {site.schoolName} — Class of {site.classYear}
          </strong>
          <div>{site.cityState}</div>
        </div>
        <div>
          <div>
            Questions? <a href={`mailto:${site.contactEmail}`}>{site.contactEmail}</a>
          </div>
          <div>
            <Link href="/admin">Organizer login</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

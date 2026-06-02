import site from "@/lib/site-config";
import { getCurrentMember } from "@/lib/member-auth";
import { ensureGalleryPosts, getGalleryFeed, getCommentsForPosts } from "@/lib/community";
import { getTeacherImages } from "@/lib/gallery";
import GalleryFeed from "../components/GalleryFeed";

export const dynamic = "force-dynamic";
export const metadata = { title: "Teachers" };

export default async function TeachersPage() {
  const me = await getCurrentMember();
  await ensureGalleryPosts(getTeacherImages(), "teacher");
  const posts = await getGalleryFeed(me?.id, "teacher");
  const comments = await getCommentsForPosts(posts.map((p) => p.id));

  return (
    <>
      <div className="page-header"><div className="container">
        <h1>Our Teachers</h1>
        <p>Add yearbook photos of the {site.schoolName} teachers who shaped us — and share your favorite memories.</p>
      </div></div>
      <section className="section"><div className="container">
        <GalleryFeed
          me={me} posts={posts} comments={comments} category="teacher"
          uploadTitle="Add a teacher photo" uploadButton="Post Teacher"
          captionPlaceholder="Teacher's name (and class/subject)"
          commentPlaceholder="Share a favorite memory…"
          emptyText="No teacher photos yet — add one from your yearbook!"
        />
      </div></section>
    </>
  );
}

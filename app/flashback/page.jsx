import site from "@/lib/site-config";
import { getGalleryImages } from "@/lib/gallery";
import { getCurrentMember } from "@/lib/member-auth";
import { ensureGalleryPosts, getGalleryFeed, getCommentsForPosts } from "@/lib/community";
import GalleryFeed from "../components/GalleryFeed";

export const dynamic = "force-dynamic";
export const metadata = { title: "Flashback" };

export default async function FlashbackPage() {
  const me = await getCurrentMember();
  await ensureGalleryPosts(getGalleryImages());
  const posts = await getGalleryFeed(me?.id, "flashback");
  const comments = await getCommentsForPosts(posts.map((p) => p.id));

  return (
    <>
      <div className="page-header"><div className="container">
        <h1>Flashback</h1>
        <p>Throwbacks and new memories from {site.schoolName}. Like and comment below.</p>
      </div></div>
      <section className="section"><div className="container">
        <GalleryFeed
          me={me} posts={posts} comments={comments} category="flashback"
          uploadTitle="Share a photo" uploadButton="Post to Gallery"
          captionPlaceholder="Say something about it"
          emptyText="No photos yet."
        />
      </div></section>
    </>
  );
}

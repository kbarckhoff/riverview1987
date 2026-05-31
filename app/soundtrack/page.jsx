import site from "@/lib/site-config";
import { top10, top35, slowJams } from "@/lib/soundtrack";

export const metadata = { title: "Soundtrack of '87" };

const q = (a, s) => encodeURIComponent(`${a} ${s}`);
const spotifySearch = (a, s) => `https://open.spotify.com/search/${q(a, s)}`;
const appleSearch = (a, s) => `https://music.apple.com/us/search?term=${q(a, s)}`;

function spotifyEmbed(url) {
  const m = (url || "").match(/playlist\/([A-Za-z0-9]+)/);
  return m ? `https://open.spotify.com/embed/playlist/${m[1]}?theme=0` : null;
}
function appleEmbed(url) {
  if (!url) return null;
  return url.replace("music.apple.com", "embed.music.apple.com");
}

function SongLinks({ a, s }) {
  return (
    <span className="song-links">
      <a href={spotifySearch(a, s)} target="_blank" rel="noreferrer">Spotify</a>
      <a href={appleSearch(a, s)} target="_blank" rel="noreferrer">Apple</a>
    </span>
  );
}

export default function SoundtrackPage() {
  const sEmbed = spotifyEmbed(site.spotifyPlaylistUrl);
  const aEmbed = appleEmbed(site.appleMusicPlaylistUrl);

  return (
    <>
      <div className="page-header"><div className="container">
        <h1>The Soundtrack of &rsquo;87</h1>
        <p>The songs that owned the {site.schoolName} dance floor. Tap any track to play on Spotify or Apple Music.</p>
      </div></div>

      <section className="section"><div className="container">
        {(sEmbed || aEmbed) ? (
          <div className="playlist-embeds">
            {sEmbed ? <iframe title="Spotify playlist" src={sEmbed} width="100%" height="380" frameBorder="0" allow="encrypted-media" loading="lazy"></iframe> : null}
            {aEmbed ? <iframe title="Apple Music playlist" src={aEmbed} width="100%" height="380" frameBorder="0" allow="encrypted-media" loading="lazy"></iframe> : null}
          </div>
        ) : (
          <p className="notice" style={{ marginBottom: 8 }}>
            Full Spotify &amp; Apple Music playlists are coming soon. For now, tap the <strong>Spotify</strong> or <strong>Apple</strong> link on any song to play it.
          </p>
        )}

        {/* Top 10 with stories */}
        <h2 className="display" style={{ marginTop: 36 }}>Top 10 Dance Songs</h2>
        <div className="song-list">
          {top10.map((t) => (
            <div key={t.rank} className="song-row top">
              <div className="song-rank">{t.rank}</div>
              <div className="song-main">
                <div className="song-line">
                  <span className="song-title">{t.song}</span>
                  <span className="song-artist">{t.artist}</span>
                  <SongLinks a={t.artist} s={t.song} />
                </div>
                {t.note ? <p className="song-note">{t.note}</p> : null}
              </div>
            </div>
          ))}
        </div>

        {/* 11-35 */}
        <h2 className="display" style={{ marginTop: 44 }}>Top 35 Dance Songs <span style={{ color: "var(--muted)", fontWeight: 400, textTransform: "none", fontSize: "1rem" }}>(#11&ndash;35)</span></h2>
        <div className="song-list grid2">
          {top35.map((t) => (
            <div key={t.rank} className="song-row">
              <div className="song-rank sm">{t.rank}</div>
              <div className="song-main">
                <div className="song-line">
                  <span className="song-title">{t.song}</span>
                  <span className="song-artist">{t.artist}</span>
                  <SongLinks a={t.artist} s={t.song} />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Slow jams */}
        <h2 className="display" style={{ marginTop: 44 }}>Slow Jams <span style={{ color: "var(--muted)", fontWeight: 400, textTransform: "none", fontSize: "1rem" }}>(no particular order)</span></h2>
        <div className="song-list grid2">
          {slowJams.map((t, i) => (
            <div key={i} className="song-row">
              <div className="song-rank sm">&hearts;</div>
              <div className="song-main">
                <div className="song-line">
                  <span className="song-title">{t.song}</span>
                  <span className="song-artist">{t.artist}</span>
                  <SongLinks a={t.artist} s={t.song} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div></section>
    </>
  );
}

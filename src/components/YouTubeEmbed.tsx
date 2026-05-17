import type { Track } from "@/types/music";

type YouTubeEmbedProps = {
  track: Track;
};

export function YouTubeEmbed({ track }: YouTubeEmbedProps) {
  if (!track.videoId) {
    return null;
  }

  const src = `https://www.youtube-nocookie.com/embed/${track.videoId}?rel=0&modestbranding=1&playsinline=1`;

  return (
    <div className="mt-4 overflow-hidden rounded-xl border border-white/10 bg-black/30">
      <iframe
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        className="aspect-video w-full"
        loading="lazy"
        referrerPolicy="strict-origin-when-cross-origin"
        src={src}
        title={`Reproduzir ${track.title}`}
      />
      {track.externalUrl ? (
        <a
          className="block border-t border-white/10 px-3 py-2 text-sm font-bold text-cyan-200 transition hover:bg-white/10"
          href={track.externalUrl}
          rel="noopener noreferrer"
          target="_blank"
        >
          Abrir no YouTube
        </a>
      ) : null}
    </div>
  );
}

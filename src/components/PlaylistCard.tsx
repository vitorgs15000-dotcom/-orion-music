import { CoverArt } from "@/components/CoverArt";
import type { Playlist } from "@/types/music";

type PlaylistCardProps = {
  playlist: Playlist;
};

export function PlaylistCard({ playlist }: PlaylistCardProps) {
  return (
    <article className={`liquid-glass overflow-hidden bg-gradient-to-br ${playlist.gradient} p-4`}>
      <CoverArt variant={playlist.cover} className="max-w-36" />
      <h3 className="mt-4 text-lg font-black text-white">{playlist.title}</h3>
      <p className="mt-1 text-sm text-slate-300">{playlist.description}</p>
    </article>
  );
}

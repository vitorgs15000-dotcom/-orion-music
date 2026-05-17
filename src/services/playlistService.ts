import { playlists, tracks } from "@/data/mockLibrary";
import type { Playlist, Track } from "@/types/music";

export function getPlaylistTracks(playlist: Playlist): Track[] {
  return playlist.trackIds
    .map((id) => tracks.find((track) => track.id === id))
    .filter((track): track is Track => Boolean(track));
}

export function generateSmartPlaylist(prompt: string): Track[] {
  const text = prompt.toLowerCase();
  const scored = tracks
    .map((track) => {
      let score = 0;
      if (text.includes("foco") && track.mood === "focus") score += 4;
      if (text.includes("madrugada") && track.mood === "night") score += 4;
      if (text.includes("relax") && track.mood === "relax") score += 4;
      if (text.includes("epic") || text.includes("filme")) score += track.mood === "cinematic" ? 4 : 1;
      if (text.includes(track.artist.toLowerCase())) score += 3;
      return { track, score };
    })
    .sort((a, b) => b.score - a.score);

  return scored.slice(0, 4).map((item) => item.track);
}

export function getFeaturedPlaylist(): Playlist {
  return playlists[0];
}

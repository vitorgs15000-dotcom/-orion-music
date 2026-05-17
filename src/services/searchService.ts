import { tracks } from "@/data/mockLibrary";
import { apiGet } from "@/services/httpClient";
import type { Track } from "@/types/music";

export async function searchTracks(query: string): Promise<Track[]> {
  const normalized = query.trim().toLowerCase();

  if (!normalized) {
    return tracks;
  }

  const fallback = tracks.filter((track) =>
    `${track.title} ${track.artist} ${track.album} ${track.mood}`.toLowerCase().includes(normalized)
  );

  return apiGet<Track[]>(`/search?q=${encodeURIComponent(query)}`, fallback);
}

import { playlists, tracks } from "@/data/mockLibrary";
import type { Playlist, Track } from "@/types/music";

export async function getTracks(): Promise<Track[]> {
  return tracks;
}

export async function getPlaylists(): Promise<Playlist[]> {
  return playlists;
}

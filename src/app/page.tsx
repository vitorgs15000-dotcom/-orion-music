import { OrionApp } from "@/components/OrionApp";
import { getPlaylists, getTracks } from "@/services/musicService";

export default async function Home() {
  const [tracks, playlists] = await Promise.all([getTracks(), getPlaylists()]);

  return <OrionApp playlists={playlists} tracks={tracks} />;
}

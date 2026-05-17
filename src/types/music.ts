export type Track = {
  id: string;
  title: string;
  artist: string;
  album: string;
  duration: number;
  cover: string;
  audioUrl: string;
  externalUrl?: string;
  videoId?: string;
  thumbnailUrl?: string;
  source?: "local" | "youtube";
  mood: "focus" | "night" | "pulse" | "relax" | "cinematic";
  color: string;
};

export type Playlist = {
  id: string;
  title: string;
  description: string;
  cover: string;
  trackIds: string[];
  gradient: string;
};

export type Artist = {
  id: string;
  name: string;
  genre: string;
  followers: string;
};

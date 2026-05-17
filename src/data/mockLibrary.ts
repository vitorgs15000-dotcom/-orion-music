import type { Artist, Playlist, Track } from "@/types/music";

const previewAudioUrl = "/api/preview";

export const tracks: Track[] = [
  {
    id: "nebula-drive",
    title: "Nebula Drive",
    artist: "Astra Vale",
    album: "Orion Nights",
    duration: 222,
    cover: "cover-orion",
    audioUrl: previewAudioUrl,
    mood: "pulse",
    color: "#71e1ff",
    source: "local"
  },
  {
    id: "lunar-focus",
    title: "Lunar Focus",
    artist: "Noctilux",
    album: "Deep Work Station",
    duration: 258,
    cover: "cover-focus",
    audioUrl: previewAudioUrl,
    mood: "focus",
    color: "#6ef7b1",
    source: "local"
  },
  {
    id: "andromeda-rain",
    title: "Andromeda Rain",
    artist: "Vesper AI",
    album: "Weather Signals",
    duration: 244,
    cover: "cover-night",
    audioUrl: previewAudioUrl,
    mood: "relax",
    color: "#9b6bff",
    source: "local"
  },
  {
    id: "cinema-atlas",
    title: "Cinema Atlas",
    artist: "Orion Scores",
    album: "Future Trailers",
    duration: 316,
    cover: "cover-cinema",
    audioUrl: previewAudioUrl,
    mood: "cinematic",
    color: "#ff6f91",
    source: "local"
  },
  {
    id: "midnight-cache",
    title: "Midnight Cache",
    artist: "Cache Bloom",
    album: "Offline Dreams",
    duration: 205,
    cover: "cover-pulse",
    audioUrl: previewAudioUrl,
    mood: "night",
    color: "#ffd166",
    source: "local"
  }
];

export const playlists: Playlist[] = [
  {
    id: "infinite-mix",
    title: "Orion Infinite Mix",
    description: "Transicoes inteligentes para tocar sem quebrar o clima.",
    cover: "cover-orion",
    trackIds: ["nebula-drive", "lunar-focus", "midnight-cache"],
    gradient: "from-cyan-300/35 via-violet-500/20 to-emerald-300/25"
  },
  {
    id: "deep-code",
    title: "Deep Code",
    description: "Foco, batida estavel e baixa fadiga sonora.",
    cover: "cover-focus",
    trackIds: ["lunar-focus", "andromeda-rain", "cinema-atlas"],
    gradient: "from-emerald-300/35 via-cyan-300/20 to-blue-800/25"
  },
  {
    id: "night-city",
    title: "Night City Radio",
    description: "Synth, neon suave e atmosfera de madrugada.",
    cover: "cover-night",
    trackIds: ["nebula-drive", "midnight-cache", "andromeda-rain"],
    gradient: "from-violet-400/35 via-fuchsia-500/20 to-cyan-300/20"
  }
];

export const artists: Artist[] = [
  { id: "astra", name: "Astra Vale", genre: "Synthwave", followers: "1.2M" },
  { id: "noctilux", name: "Noctilux", genre: "Focus Electronic", followers: "842K" },
  { id: "vesper", name: "Vesper AI", genre: "Ambient", followers: "618K" }
];

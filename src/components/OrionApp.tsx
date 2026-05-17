"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { CoverArt } from "@/components/CoverArt";
import { ParticleField } from "@/components/ParticleField";
import { PlayerBar } from "@/components/PlayerBar";
import { SearchBar } from "@/components/SearchBar";
import { TrackCard } from "@/components/TrackCard";
import { Visualizer } from "@/components/Visualizer";
import { YouTubeEmbed } from "@/components/YouTubeEmbed";
import { useMusicPlayer } from "@/hooks/useMusicPlayer";
import type { Playlist, Track } from "@/types/music";

type OrionAppProps = {
  tracks: Track[];
  playlists: Playlist[];
};

function statusText(status: string | null) {
  if (!status) return "Biblioteca local pronta";
  if (status === "youtube-ok") return "YouTube conectado";
  if (status?.endsWith("-cache")) return "Resultado em cache rapido";
  if (status === "youtube-empty") return "YouTube sem resultados, usando biblioteca local";
  if (status === "missing-key") return "Chave nao configurada, usando biblioteca local";
  if (status.startsWith("youtube-http-")) return `YouTube respondeu ${status.replace("youtube-http-", "")}`;
  if (status === "youtube-network-error") return "YouTube nao respondeu rapido, usando biblioteca local";
  return "Busca local segura";
}

export function OrionApp({ tracks }: OrionAppProps) {
  const player = useMusicPlayer(tracks);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Track[]>(tracks);
  const [status, setStatus] = useState<string | null>(null);
  const [isSearching, setIsSearching] = useState(false);

  const selectedTrack = player.currentTrack;
  const isYouTube = selectedTrack.source === "youtube" && Boolean(selectedTrack.videoId);

  const visibleResults = useMemo(() => {
    if (query.trim() || status) return results;
    return tracks;
  }, [query, results, status, tracks]);

  async function handleSearch(nextQuery: string) {
    const normalized = nextQuery.trim();
    setQuery(nextQuery);

    if (!normalized) {
      setResults(tracks);
      setStatus(null);
      return;
    }

    setIsSearching(true);

    try {
      const response = await fetch(`/api/search?q=${encodeURIComponent(normalized)}`);
      const nextResults = (await response.json()) as Track[];
      setResults(nextResults.length ? nextResults : tracks);
      setStatus(response.headers.get("x-orion-api-status") ?? "unknown");
    } catch {
      setResults(tracks);
      setStatus("client-search-error");
    } finally {
      setIsSearching(false);
    }
  }

  function playTrack(track: Track) {
    const sourceList = visibleResults.length ? visibleResults : tracks;
    const index = Math.max(0, sourceList.findIndex((item) => item.id === track.id));
    player.playFromQueue(sourceList, index);
  }

  return (
    <>
      <ParticleField />
      <main className="relative z-10 mx-auto grid min-h-screen w-full max-w-7xl gap-4 px-3 pb-36 pt-3 md:px-5 md:pt-5">
        <header className="liquid-glass grid gap-4 p-4 md:grid-cols-[1fr_minmax(280px,460px)] md:items-center">
          <div className="min-w-0">
            <p className="text-xs font-black uppercase tracking-[0.24em] text-cyan-200">Orion Music</p>
            <h1 className="mt-1 text-3xl font-black leading-tight text-white md:text-5xl">Musica e video em Liquid Glass.</h1>
            <p className="mt-2 max-w-2xl text-sm text-slate-300 md:text-base">
              Pesquise musicas e videos por API autorizada. Resultados do YouTube usam o player oficial embutido; faixas locais usam o player Orion.
            </p>
          </div>
          <SearchBar onSearch={(value) => void handleSearch(value)} />
        </header>

        <section className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_360px]">
          <motion.section
            className="liquid-glass min-h-[420px] p-4 md:p-5"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
          >
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.24em] text-cyan-200">Tocando agora</p>
                <h2 className="mt-1 text-2xl font-black text-white md:text-3xl">{selectedTrack.title}</h2>
                <p className="text-slate-400">{selectedTrack.artist}</p>
              </div>
              <span className={`rounded-full border px-3 py-1 text-xs font-black uppercase tracking-[0.16em] ${
                isYouTube ? "border-red-300/30 bg-red-400/10 text-red-100" : "border-cyan-300/30 bg-cyan-300/10 text-cyan-100"
              }`}>
                {isYouTube ? "YouTube oficial" : "Audio local"}
              </span>
            </div>

            {isYouTube ? (
              <YouTubeEmbed track={selectedTrack} />
            ) : (
              <div className="mt-5 grid gap-5 md:grid-cols-[260px_1fr] md:items-center">
                <CoverArt imageUrl={selectedTrack.thumbnailUrl} variant={selectedTrack.cover} />
                <div>
                  <p className="text-sm text-slate-300">
                    Player local funcional com play, pause, seek, volume, shuffle e repeat. Para catalogo real, conecte uma API licenciada ou use os videos oficiais embutidos.
                  </p>
                  <div className="mt-5">
                    <Visualizer active={player.isPlaying} />
                  </div>
                  <button className="primary-action mt-5" onClick={player.togglePlay} type="button">
                    {player.isPlaying ? "Pausar" : "Tocar"}
                  </button>
                </div>
              </div>
            )}
          </motion.section>

          <aside className="liquid-glass p-4">
            <p className="text-xs font-black uppercase tracking-[0.24em] text-cyan-200">Status</p>
            <h2 className="mt-2 text-xl font-black text-white">{isSearching ? "Buscando..." : statusText(status)}</h2>
            <div className="mt-4 grid gap-3 text-sm text-slate-300">
              <p>Chave protegida no servidor e fora do JavaScript do navegador.</p>
              <p>Sem extrair audio do YouTube, sem pirataria, sem anuncios proprios do Orion.</p>
              <p>Se aparecer erro de rede local, no Render tende a funcionar com internet e chave correta.</p>
            </div>
          </aside>
        </section>

        <section className="liquid-glass p-4">
          <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.24em] text-cyan-200">
                {status === "youtube-ok" ? "Resultados do YouTube" : "Resultados"}
              </p>
              <h2 className="text-2xl font-black text-white">{query.trim() ? `Busca: ${query}` : "Biblioteca inicial"}</h2>
            </div>
            <span className="rounded-full border border-white/10 bg-white/[0.06] px-3 py-1 text-sm font-bold text-slate-300">
              {visibleResults.length} itens
            </span>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {visibleResults.map((track) => (
              <TrackCard
                active={selectedTrack.id === track.id}
                key={track.id}
                onPlay={() => playTrack(track)}
                track={track}
              />
            ))}
          </div>
        </section>
      </main>

      <PlayerBar
        audioRef={player.setAudioElement}
        isPlaying={player.isPlaying}
        onNext={player.next}
        onPrevious={player.previous}
        onRepeat={player.toggleRepeat}
        onSeek={player.seek}
        onShuffle={() => player.setShuffle((value) => !value)}
        onTogglePlay={player.togglePlay}
        onVolume={player.setVolume}
        progress={player.progress}
        repeat={player.repeat}
        shuffle={player.shuffle}
        track={selectedTrack}
        volume={player.volume}
      />
    </>
  );
}

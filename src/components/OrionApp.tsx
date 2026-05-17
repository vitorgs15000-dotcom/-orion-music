"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { CoverArt } from "@/components/CoverArt";
import { ParticleField } from "@/components/ParticleField";
import { PlayerBar } from "@/components/PlayerBar";
import { SearchBar } from "@/components/SearchBar";
import { TrackCard } from "@/components/TrackCard";
import { Visualizer } from "@/components/Visualizer";
import { useMusicPlayer } from "@/hooks/useMusicPlayer";
import type { Playlist, Track } from "@/types/music";

type OrionAppProps = {
  tracks: Track[];
  playlists: Playlist[];
};

function statusText(status: string | null) {
  if (!status) return "Biblioteca local pronta";
  if (status === "youtube-ok") return "YouTube conectado em modo musica";
  if (status?.endsWith("-cache")) return "Resultado em cache rapido";
  if (status === "youtube-empty") return "YouTube sem resultados, usando biblioteca local";
  if (status === "missing-key") return "Chave nao configurada, usando biblioteca local";
  if (status.startsWith("youtube-http-")) return `YouTube respondeu ${status.replace("youtube-http-", "")}`;
  if (status === "youtube-network-error") return "YouTube nao respondeu rapido, usando biblioteca local";
  return "Busca local segura";
}

export function OrionApp({ tracks, playlists }: OrionAppProps) {
  const player = useMusicPlayer(tracks);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Track[]>(tracks);
  const [status, setStatus] = useState<string | null>(null);
  const [isSearching, setIsSearching] = useState(false);

  const selectedTrack = player.currentTrack;
  const isYouTube = selectedTrack.source === "youtube";

  const visibleResults = useMemo(() => {
    if (query.trim() || status) return results;
    return tracks;
  }, [query, results, status, tracks]);

  const queuePreview = useMemo(() => {
    return player.queue.slice(0, 5);
  }, [player.queue]);

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

  function playPlaylist(playlist: Playlist) {
    const playlistTracks = playlist.trackIds
      .map((trackId) => tracks.find((track) => track.id === trackId))
      .filter((track): track is Track => Boolean(track));

    if (playlistTracks.length) {
      player.playFromQueue(playlistTracks, 0);
    }
  }

  return (
    <>
      <ParticleField />
      <main className="relative z-10 mx-auto grid min-h-screen w-full max-w-7xl gap-4 px-3 pb-48 pt-3 md:px-5 md:pb-36 md:pt-5">
        <header className="liquid-glass grid gap-4 p-4 md:grid-cols-[1fr_minmax(280px,460px)] md:items-center">
          <div className="min-w-0">
            <p className="text-xs font-black uppercase tracking-[0.24em] text-cyan-200">Orion Music</p>
            <h1 className="mt-1 text-2xl font-black leading-tight text-white md:text-4xl">Musica, capa e controle rapido.</h1>
            <p className="mt-2 max-w-2xl text-sm text-slate-300">
              Pesquise musicas por API autorizada. O Orion mostra tudo como faixa com capa, sem video embutido e com player otimizado para celular.
            </p>
          </div>
          <SearchBar onSearch={(value) => void handleSearch(value)} />
        </header>

        <section className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_340px]">
          <motion.section
            className="liquid-glass now-panel min-h-[360px] p-4 md:p-5"
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
                isYouTube ? "border-cyan-300/30 bg-cyan-300/10 text-cyan-100" : "border-emerald-300/30 bg-emerald-300/10 text-emerald-100"
              }`}>
                {isYouTube ? "YouTube music" : "Audio Orion"}
              </span>
            </div>

            <div className="mt-5 grid gap-5 md:grid-cols-[minmax(210px,280px)_1fr] md:items-center">
              <CoverArt variant={selectedTrack.cover} className="mx-auto max-w-[300px] md:max-w-none" />
              <div>
                <p className="text-sm text-slate-300">
                  Modo musica: capa Orion, mix, fila, seek, volume e play/pause. Videos ficam desativados dentro do app para manter a experiencia leve.
                </p>
                <div className="mt-5">
                  <Visualizer active={player.isPlaying} />
                </div>
                <div className="mt-5 flex flex-wrap gap-2">
                  <button className="primary-action" onClick={player.togglePlay} type="button">
                    {player.isPlaying ? "Pause" : "Play"}
                  </button>
                  <button className="secondary-action" onClick={player.previous} type="button">
                    Anterior
                  </button>
                  <button className="secondary-action" onClick={() => player.setShuffle((value) => !value)} type="button">
                    {player.shuffle ? "Mix ligado" : "Misturar"}
                  </button>
                  <button className="secondary-action" onClick={player.next} type="button">
                    Proxima
                  </button>
                  {selectedTrack.externalUrl ? (
                    <a className="secondary-action inline-grid place-items-center" href={selectedTrack.externalUrl} rel="noopener noreferrer" target="_blank">
                      Abrir musica
                    </a>
                  ) : null}
                </div>
              </div>
            </div>
          </motion.section>

          <aside className="grid gap-4">
            <section className="liquid-glass p-4">
              <p className="text-xs font-black uppercase tracking-[0.24em] text-cyan-200">Status</p>
              <h2 className="mt-2 text-xl font-black text-white">{isSearching ? "Buscando..." : statusText(status)}</h2>
              <div className="mt-4 grid gap-3 text-sm text-slate-300">
                <p>Chave protegida no servidor e fora do JavaScript do navegador.</p>
                <p>Sem extrair audio do YouTube e sem video embutido.</p>
                <p>Interface mais preta, leve e pronta para tela pequena.</p>
              </div>
            </section>

            <section className="liquid-glass p-4">
              <p className="text-xs font-black uppercase tracking-[0.24em] text-cyan-200">Mixes Orion</p>
              <div className="mt-3 grid gap-2">
                {playlists.map((playlist) => (
                  <button className="playlist-row" key={playlist.id} onClick={() => playPlaylist(playlist)} type="button">
                    <CoverArt variant={playlist.cover} className="h-12 w-12 shrink-0" />
                    <span className="min-w-0">
                      <strong className="block truncate text-white">{playlist.title}</strong>
                      <span className="block truncate text-xs text-slate-400">{playlist.description}</span>
                    </span>
                  </button>
                ))}
              </div>
            </section>

            <section className="liquid-glass p-4">
              <p className="text-xs font-black uppercase tracking-[0.24em] text-cyan-200">Fila</p>
              <div className="mt-3 grid gap-2">
                {queuePreview.map((track, index) => (
                  <button className={`queue-row ${selectedTrack.id === track.id ? "is-active" : ""}`} key={`${track.id}-${index}`} onClick={() => player.playFromQueue(player.queue, index)} type="button">
                    <span className="queue-index">{index + 1}</span>
                    <span className="min-w-0">
                      <strong className="block truncate text-white">{track.title}</strong>
                      <span className="block truncate text-xs text-slate-400">{track.artist}</span>
                    </span>
                  </button>
                ))}
              </div>
            </section>
          </aside>
        </section>

        <section className="liquid-glass p-4">
          <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.24em] text-cyan-200">
                {status === "youtube-ok" ? "Musicas encontradas" : "Musicas"}
              </p>
              <h2 className="text-2xl font-black text-white">{query.trim() ? `Busca: ${query}` : "Biblioteca inicial"}</h2>
            </div>
            <span className="rounded-full border border-white/10 bg-white/[0.06] px-3 py-1 text-sm font-bold text-slate-300">
              {visibleResults.length} itens
            </span>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
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

"use client";

import { CoverArt } from "@/components/CoverArt";
import { Visualizer } from "@/components/Visualizer";
import { formatTime } from "@/lib/formatTime";
import type { RepeatMode } from "@/hooks/useMusicPlayer";
import type { Track } from "@/types/music";

type PlayerBarProps = {
  track: Track;
  isPlaying: boolean;
  progress: number;
  volume: number;
  shuffle: boolean;
  repeat: RepeatMode;
  onTogglePlay: () => void;
  onNext: () => void;
  onPrevious: () => void;
  onSeek: (value: number) => void;
  onVolume: (value: number) => void;
  onShuffle: () => void;
  onRepeat: () => void;
  audioRef: (node: HTMLAudioElement | null) => void;
};

export function PlayerBar({
  track,
  isPlaying,
  progress,
  volume,
  shuffle,
  repeat,
  onTogglePlay,
  onNext,
  onPrevious,
  onSeek,
  onVolume,
  onShuffle,
  onRepeat,
  audioRef
}: PlayerBarProps) {
  const shownProgress = progress;
  const repeatLabel = repeat === "one" ? "Repetir uma" : repeat === "all" ? "Repetir fila" : "Repetir desligado";

  return (
    <footer className="fixed inset-x-2 bottom-2 z-30 md:inset-x-5 md:bottom-4">
      <div className="liquid-glass player-shell grid items-center gap-3 p-3 md:grid-cols-[minmax(180px,1fr)_auto_minmax(220px,1fr)] md:p-4">
        <audio ref={audioRef} preload="metadata">
          <source src={track.audioUrl} />
        </audio>

        <div className="flex min-w-0 items-center gap-3">
          <CoverArt variant={track.cover} className="h-14 w-14 shrink-0" />
          <div className="min-w-0">
            <strong className="block truncate text-white">{track.title}</strong>
            <span className="block truncate text-sm text-slate-400">{track.artist}</span>
          </div>
        </div>

        <div className="player-controls grid justify-items-center gap-2">
          <div className="flex items-center gap-2">
            <button className={`player-button ${shuffle ? "active" : ""}`} onClick={onShuffle} type="button" aria-label="Misturar">
              Mix
            </button>
            <button className="player-button" onClick={onPrevious} type="button" aria-label="Anterior">
              &lt;
            </button>
            <button className="play-button" onClick={onTogglePlay} type="button" aria-label="Play pause">
              {isPlaying ? <span className="icon-pause" aria-hidden="true" /> : <span className="icon-play" aria-hidden="true" />}
            </button>
            <button className="player-button" onClick={onNext} type="button" aria-label="Proxima">
              &gt;
            </button>
            <button className={`player-button ${repeat !== "off" ? "active" : ""}`} onClick={onRepeat} type="button" aria-label={repeatLabel}>
              {repeat === "one" ? "1" : "R"}
            </button>
          </div>

          <div className="grid w-full grid-cols-[2.2rem_minmax(0,1fr)_2.2rem] items-center gap-2 text-xs text-slate-400">
            <span>{formatTime((shownProgress / 100) * track.duration)}</span>
            <input
              aria-label="Seekbar"
              max="100"
              min="0"
              onChange={(event) => onSeek(Number(event.target.value))}
              type="range"
              value={shownProgress}
            />
            <span>{formatTime(track.duration)}</span>
          </div>
        </div>

        <div className="player-secondary-panel grid gap-2 md:justify-items-end">
          <Visualizer active={isPlaying} />
          <label className="flex w-full max-w-xs items-center gap-2 text-xs text-slate-400">
            Volume
            <input
              aria-label="Volume"
              className="min-w-0 flex-1"
              max="1"
              min="0"
              onChange={(event) => onVolume(Number(event.target.value))}
              step="0.01"
              type="range"
              value={volume}
            />
          </label>
        </div>
      </div>
    </footer>
  );
}

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
  const isYouTube = track.source === "youtube" && Boolean(track.videoId);
  const shownProgress = isYouTube ? 0 : progress;

  return (
    <footer className="fixed inset-x-3 bottom-3 z-30 md:inset-x-5">
      <div className="liquid-glass grid min-h-24 items-center gap-4 p-3 md:grid-cols-[minmax(180px,1fr)_auto_minmax(220px,1fr)] md:p-4">
        <audio ref={audioRef} preload="metadata">
          <source src={track.audioUrl} />
        </audio>

        <div className="flex min-w-0 items-center gap-3">
          <CoverArt imageUrl={track.thumbnailUrl} variant={track.cover} className="h-14 w-14 shrink-0" />
          <div className="min-w-0">
            <strong className="block truncate text-white">{track.title}</strong>
            <span className="block truncate text-sm text-slate-400">{track.artist}</span>
          </div>
        </div>

        <div className="grid justify-items-center gap-2">
          <div className="flex items-center gap-2">
            <button className={`player-button ${shuffle ? "active" : ""}`} disabled={isYouTube} onClick={onShuffle} type="button" aria-label="Shuffle">
              S
            </button>
            <button className="player-button" onClick={onPrevious} type="button" aria-label="Anterior">
              &lt;
            </button>
            <button className="play-button" disabled={isYouTube} onClick={onTogglePlay} type="button" aria-label="Play pause">
              {isYouTube ? "YT" : isPlaying ? "II" : "P"}
            </button>
            <button className="player-button" onClick={onNext} type="button" aria-label="Proxima">
              &gt;
            </button>
            <button className={`player-button ${repeat !== "off" ? "active" : ""}`} disabled={isYouTube} onClick={onRepeat} type="button" aria-label="Repeat">
              {repeat === "one" ? "1" : "R"}
            </button>
          </div>

          <div className="grid w-full min-w-[240px] grid-cols-[auto_minmax(120px,1fr)_auto] items-center gap-2 text-xs text-slate-400">
            <span>{formatTime((shownProgress / 100) * track.duration)}</span>
            <input
              aria-label="Seekbar"
              disabled={isYouTube}
              max="100"
              min="0"
              onChange={(event) => onSeek(Number(event.target.value))}
              type="range"
              value={shownProgress}
            />
            <span>{isYouTube ? "YouTube" : formatTime(track.duration)}</span>
          </div>
        </div>

        <div className="grid gap-2 md:justify-items-end">
          <Visualizer active={isYouTube || isPlaying} />
          <label className="flex w-full max-w-xs items-center gap-2 text-xs text-slate-400">
            Volume
            <input
              aria-label="Volume"
              className="min-w-0 flex-1"
              disabled={isYouTube}
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

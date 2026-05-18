"use client";

import { motion } from "framer-motion";
import { CoverArt } from "@/components/CoverArt";
import type { Track } from "@/types/music";

type TrackCardProps = {
  track: Track;
  active?: boolean;
  onPlay: () => void;
};

export function TrackCard({ track, active = false, onPlay }: TrackCardProps) {
  return (
    <motion.button
      className={`liquid-glass track-card group min-w-0 p-3 text-left transition ${active ? "is-active border-cyan-200/60 bg-cyan-200/10" : ""}`}
      onClick={onPlay}
      type="button"
      whileHover={{ y: -3, scale: 1.01 }}
      whileTap={{ scale: 0.98 }}
    >
      <div className="flex items-center gap-3 sm:block">
        <CoverArt variant={track.cover} className="track-card-cover h-16 w-16 shrink-0 sm:h-auto sm:w-full" />
        <div className="min-w-0 flex-1 sm:mt-3">
          {track.source === "youtube" ? (
            <span className="mb-2 inline-flex rounded-full border border-cyan-300/25 bg-cyan-300/10 px-2 py-1 text-[0.62rem] font-black uppercase tracking-[0.14em] text-cyan-100">
              YouTube music
            </span>
          ) : null}
          <div className="flex items-center justify-between gap-3">
            <div className="min-w-0">
              <h3 className="truncate font-black text-white">{track.title}</h3>
              <p className="truncate text-sm text-slate-400">{track.artist}</p>
              <p className="mt-1 truncate text-xs text-slate-500">{track.album}</p>
            </div>
            <span className="track-play-button shrink-0" aria-hidden="true">
              <span className="icon-play" />
            </span>
          </div>
        </div>
      </div>
    </motion.button>
  );
}

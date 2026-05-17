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
      className={`liquid-glass group min-w-0 p-3 text-left transition ${active ? "border-cyan-200/60 bg-cyan-200/10" : ""}`}
      onClick={onPlay}
      type="button"
      whileHover={{ y: -5, scale: 1.015 }}
      whileTap={{ scale: 0.98 }}
    >
      <CoverArt imageUrl={track.thumbnailUrl} variant={track.cover} />
      {track.source === "youtube" ? (
        <span className="mt-3 inline-flex rounded-full border border-red-300/30 bg-red-400/10 px-2 py-1 text-xs font-black uppercase tracking-[0.16em] text-red-100">
          YouTube video
        </span>
      ) : null}
      <div className="mt-3 flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h3 className="truncate font-black text-white">{track.title}</h3>
          <p className="truncate text-sm text-slate-400">{track.artist}</p>
        </div>
        <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-emerald-300 text-slate-950 opacity-0 transition group-hover:opacity-100">
          P
        </span>
      </div>
    </motion.button>
  );
}

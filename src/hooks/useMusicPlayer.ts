"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { Track } from "@/types/music";

export type RepeatMode = "off" | "one" | "all";

export function useMusicPlayer(initialTracks: Track[]) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [queue, setQueue] = useState(initialTracks);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [volume, setVolumeState] = useState(0.72);
  const [shuffle, setShuffle] = useState(false);
  const [repeat, setRepeat] = useState<RepeatMode>("all");

  const currentTrack = queue[currentIndex] ?? queue[0];

  const duration = currentTrack?.duration ?? 0;

  const setAudioElement = useCallback((node: HTMLAudioElement | null) => {
    audioRef.current = node;
    if (node) {
      node.volume = volume;
    }
  }, [volume]);

  const play = useCallback(async () => {
    const audio = audioRef.current;
    if (!audio) return;

    try {
      await audio.play();
      setIsPlaying(true);
    } catch {
      setIsPlaying(false);
    }
  }, []);

  const pause = useCallback(() => {
    audioRef.current?.pause();
    setIsPlaying(false);
  }, []);

  const seek = useCallback((value: number) => {
    const audio = audioRef.current;
    if (!audio || !duration) return;

    const nextTime = (value / 100) * duration;
    audio.currentTime = nextTime;
    setProgress(value);
  }, [duration]);

  const setVolume = useCallback((value: number) => {
    setVolumeState(value);
    if (audioRef.current) {
      audioRef.current.volume = value;
    }
  }, []);

  const next = useCallback(() => {
    setCurrentIndex((index) => {
      if (shuffle) {
        return Math.floor(Math.random() * queue.length);
      }

      if (index + 1 >= queue.length) {
        return repeat === "all" ? 0 : index;
      }

      return index + 1;
    });
  }, [queue.length, repeat, shuffle]);

  const previous = useCallback(() => {
    setCurrentIndex((index) => (index === 0 ? queue.length - 1 : index - 1));
  }, [queue.length]);

  const togglePlay = useCallback(() => {
    if (isPlaying) {
      pause();
      return;
    }

    void play();
  }, [isPlaying, pause, play]);

  const toggleRepeat = useCallback(() => {
    setRepeat((mode) => (mode === "off" ? "all" : mode === "all" ? "one" : "off"));
  }, []);

  const playFromQueue = useCallback((nextQueue: Track[], index: number) => {
    setQueue(nextQueue);
    setCurrentIndex(index);
    setIsPlaying(true);
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (currentTrack?.videoId) {
      audio.pause();
      setProgress(0);
      return;
    }

    audio.load();
    setProgress(0);

    if (isPlaying) {
      void audio.play().catch(() => setIsPlaying(false));
    }
  }, [currentTrack?.audioUrl, currentTrack?.videoId, isPlaying]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onTimeUpdate = () => {
      if (!duration) return;
      setProgress(Math.min(100, (audio.currentTime / duration) * 100));
    };

    const onEnded = () => {
      if (repeat === "one") {
        audio.currentTime = 0;
        void audio.play();
        return;
      }

      next();
    };

    audio.addEventListener("timeupdate", onTimeUpdate);
    audio.addEventListener("ended", onEnded);

    return () => {
      audio.removeEventListener("timeupdate", onTimeUpdate);
      audio.removeEventListener("ended", onEnded);
    };
  }, [duration, next, repeat]);

  return useMemo(() => ({
    currentTrack,
    queue,
    currentIndex,
    isPlaying,
    progress,
    volume,
    shuffle,
    repeat,
    setAudioElement,
    setQueue,
    setCurrentIndex,
    play,
    pause,
    togglePlay,
    next,
    previous,
    seek,
    setVolume,
    setShuffle,
    toggleRepeat,
    playFromQueue
  }), [
    currentIndex,
    currentTrack,
    isPlaying,
    next,
    pause,
    play,
    previous,
    progress,
    queue,
    repeat,
    seek,
    setAudioElement,
    setVolume,
    shuffle,
    playFromQueue,
    togglePlay,
    toggleRepeat,
    volume
  ]);
}

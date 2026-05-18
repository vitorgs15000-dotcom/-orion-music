import { NextResponse } from "next/server";
import { tracks } from "@/data/mockLibrary";
import { apiConfig } from "@/services/config";
import type { Track } from "@/types/music";

type YouTubeSearchItem = {
  id?: {
    videoId?: string;
  };
  snippet?: {
    title?: string;
    channelTitle?: string;
  };
};

const SEARCH_TIMEOUT_MS = 1800;
const cache = new Map<string, { createdAt: number; results: Track[]; status: string }>();

function fallbackSearch(query: string): Track[] {
  const normalized = query.trim().toLowerCase();

  if (!normalized) {
    return tracks;
  }

  const results = tracks.filter((track) =>
    `${track.title} ${track.artist} ${track.album} ${track.mood}`.toLowerCase().includes(normalized)
  );

  return results.length ? results : tracks;
}

async function fetchWithTimeout(url: URL) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), SEARCH_TIMEOUT_MS);

  try {
    return await fetch(url, {
      next: { revalidate: 120 },
      signal: controller.signal
    });
  } finally {
    clearTimeout(timeout);
  }
}

function jsonWithStatus(results: Track[], apiStatus: string) {
  return NextResponse.json(results, {
    headers: {
      "x-orion-api-status": apiStatus
    }
  });
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q")?.trim() ?? "";
  const cacheKey = query.toLowerCase();

  if (!query) {
    return jsonWithStatus(tracks, "empty-query");
  }

  const cached = cache.get(cacheKey);
  if (cached && Date.now() - cached.createdAt < 1000 * 60 * 5) {
    return jsonWithStatus(cached.results, `${cached.status}-cache`);
  }

  if (!apiConfig.apiKey) {
    return jsonWithStatus(fallbackSearch(query), "missing-key");
  }

  const url = new URL(`${apiConfig.apiUrl}/search`);
  url.searchParams.set("part", "snippet");
  url.searchParams.set("type", "video");
  url.searchParams.set("videoCategoryId", "10");
  url.searchParams.set("maxResults", "8");
  url.searchParams.set("fields", "items(id/videoId,snippet/title,snippet/channelTitle)");
  url.searchParams.set("q", `${query} music`);
  url.searchParams.set("key", apiConfig.apiKey);

  try {
    const response = await fetchWithTimeout(url);

    if (!response.ok) {
      return jsonWithStatus(fallbackSearch(query), `youtube-http-${response.status}`);
    }

    const data = (await response.json()) as { items?: YouTubeSearchItem[] };
    const results = (data.items ?? []).map((item, index): Track => {
      const videoId = item.id?.videoId ?? `external-${index}`;
      return {
        id: `youtube-${videoId}`,
        title: item.snippet?.title ?? "Resultado musical",
        artist: item.snippet?.channelTitle ?? "YouTube",
        album: "Resultado autorizado",
        duration: 180,
        cover: ["cover-orion", "cover-focus", "cover-night", "cover-pulse"][index % 4],
        audioUrl: "/api/preview",
        externalUrl: videoId.startsWith("external-") ? undefined : `https://www.youtube.com/watch?v=${videoId}`,
        source: "youtube",
        mood: ["focus", "night", "pulse", "relax", "cinematic"][index % 5] as Track["mood"],
        color: ["#71e1ff", "#6ef7b1", "#9b6bff", "#ff6f91"][index % 4]
      };
    });

    const finalResults = results.length ? results : fallbackSearch(query);
    const finalStatus = results.length ? "youtube-ok" : "youtube-empty";
    cache.set(cacheKey, { createdAt: Date.now(), results: finalResults, status: finalStatus });
    return jsonWithStatus(finalResults, finalStatus);
  } catch {
    const finalResults = fallbackSearch(query);
    cache.set(cacheKey, { createdAt: Date.now(), results: finalResults, status: "youtube-network-error" });
    return jsonWithStatus(finalResults, "youtube-network-error");
  }
}

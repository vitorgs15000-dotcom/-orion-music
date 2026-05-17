function cleanSecret(value: string | undefined) {
  return (value ?? "")
    .replace(/^YOUTUBE_API_KEY=/, "")
    .replace(/^NEXT_PUBLIC_API_KEY=/, "")
    .replace(/^["']|["']$/g, "")
    .trim()
    .split(/\s+/)[0];
}

export const apiConfig = {
  apiKey: cleanSecret(process.env.YOUTUBE_API_KEY),
  apiUrl: (process.env.YOUTUBE_API_URL ?? "https://www.googleapis.com/youtube/v3").trim()
};

export function hasExternalApi() {
  return Boolean(apiConfig.apiKey && apiConfig.apiUrl);
}

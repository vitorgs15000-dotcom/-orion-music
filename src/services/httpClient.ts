import { apiConfig } from "@/services/config";

export async function apiGet<T>(path: string, fallback: T): Promise<T> {
  if (!apiConfig.apiUrl || !apiConfig.apiKey) {
    return fallback;
  }

  const response = await fetch(`${apiConfig.apiUrl}${path}`, {
    headers: {
      Authorization: `Bearer ${apiConfig.apiKey}`
    },
    next: { revalidate: 120 }
  });

  if (!response.ok) {
    return fallback;
  }

  return response.json() as Promise<T>;
}

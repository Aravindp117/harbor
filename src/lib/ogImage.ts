/**
 * Fetches Open Graph images from article URLs via a CORS proxy.
 * Returns the og:image URL or null if not found.
 */

const CORS_PROXY = 'https://api.allorigins.win/raw?url=';

export async function fetchOgImage(articleUrl: string): Promise<string | null> {
  try {
    const res = await fetch(CORS_PROXY + encodeURIComponent(articleUrl), {
      signal: AbortSignal.timeout(6000),
    });
    if (!res.ok) return null;
    // Only read first 50KB to find meta tags quickly
    const text = await res.text();
    const chunk = text.slice(0, 50000);

    // Try og:image first
    const ogMatch = chunk.match(/<meta[^>]+property=["']og:image["'][^>]+content=["']([^"']+)["']/i)
      || chunk.match(/<meta[^>]+content=["']([^"']+)["'][^>]+property=["']og:image["']/i);
    if (ogMatch?.[1]) return ogMatch[1];

    // Try twitter:image
    const twMatch = chunk.match(/<meta[^>]+name=["']twitter:image["'][^>]+content=["']([^"']+)["']/i)
      || chunk.match(/<meta[^>]+content=["']([^"']+)["'][^>]+name=["']twitter:image["']/i);
    if (twMatch?.[1]) return twMatch[1];

    return null;
  } catch {
    return null;
  }
}

/**
 * Fetch OG images for multiple URLs in parallel.
 * Returns a Map of articleUrl → imageUrl.
 */
export async function fetchOgImages(urls: string[]): Promise<Map<string, string>> {
  const results = await Promise.allSettled(
    urls.map(async (url) => {
      const img = await fetchOgImage(url);
      return { url, img };
    })
  );

  const map = new Map<string, string>();
  for (const r of results) {
    if (r.status === 'fulfilled' && r.value.img) {
      map.set(r.value.url, r.value.img);
    }
  }
  return map;
}

const LONG_CACHE_SEC = 604800; // one week

export function longCacheHeader(
  header: Record<string, string> = {},
): Record<string, string> {
  header["Cache-Control"] = `max-age=${LONG_CACHE_SEC}`;

  return header;
}

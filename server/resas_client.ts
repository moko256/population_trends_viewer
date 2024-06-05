// path: api/v1/prefectures etc..
export function resasUrl(path: string): string {
  return "https://opendata.resas-portal.go.jp/" + path;
}

export function resasHeaders(
  key: string,
  header: Record<string, string> = {},
): Record<string, string> {
  header["X-API-KEY"] = key;

  return header;
}

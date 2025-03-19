export function convertSearch(res: string): string {
  return encodeURIComponent(res.trim());
}

export function extractSearch(res: string): string {
  return decodeURIComponent(res.trim());
}

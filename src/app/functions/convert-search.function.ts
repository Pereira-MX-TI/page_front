export function convertSearch(res: string): string {
  return encodeURIComponent(res.trim())
    .replace(/\(/g, '%28')
    .replace(/\)/g, '%29');
}

export function extractSearch(res: string): string {
  return decodeURIComponent(res.trim());
}

export function encodeBase64UrlSafe(name: string, id: string): string {
  return (
    `${convertSearch(name)}~` +
    btoa(id).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '')
  );
}

export function decodeBase64UrlSafe(base64Url: string) {
  // Restaurar los caracteres problemáticos
  let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');

  // Agregar padding si es necesario
  while (base64.length % 4 !== 0) {
    base64 += '=';
  }

  return atob(base64);
}

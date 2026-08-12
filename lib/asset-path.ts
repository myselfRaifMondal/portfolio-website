// Mirrors the basePath set in next.config.mjs (exposed via NEXT_PUBLIC_BASE_PATH).
// Needed because THREE.TextureLoader fetches by raw URL and doesn't go
// through next/image, so it never gets Next's automatic base-path prefixing.
const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? '';

export function withBasePath(path: string): string {
  return `${BASE_PATH}${path.startsWith('/') ? path : `/${path}`}`;
}

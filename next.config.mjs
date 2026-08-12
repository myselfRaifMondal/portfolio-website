/** @type {import('next').NextConfig} */
// Only the GitHub Pages workflow serves this app from a /portfolio-website
// subpath (username.github.io/portfolio-website). Vercel and local dev serve
// from the domain root, so basePath must stay empty there.
const isGithubPages = process.env.GITHUB_PAGES === 'true'
const basePath = isGithubPages ? '/portfolio-website' : ''

const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  basePath,
  assetPrefix: basePath,
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
}

export default nextConfig

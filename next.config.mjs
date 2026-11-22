/** @type {import('next').NextConfig} */
const nextConfig = {
  // Static export so we can deploy to GitHub Pages
  output: "export",

  // Generate folder-style routes (e.g. /afinidad/index.html)
  trailingSlash: true,

  // Required for next/image when using static export
  images: {
    unoptimized: true,
  },

  // 404 global (app/global-not-found.tsx): el sitio tiene un layout raiz por idioma.
  experimental: {
    globalNotFound: true,
  },
};

export default nextConfig;

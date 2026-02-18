/** @type {import('next').NextConfig} */
const nextConfig = {
  // Static export so we can deploy to GitHub Pages
  output: "export",

  // Serve the Next app under /preview (tonaltlan.com/preview)
  basePath: "/preview",

  // Generate folder-style routes (e.g. /preview/afinidad/index.html)
  trailingSlash: true,

  // Required for next/image when using static export
  images: {
    unoptimized: true,
  },
};

export default nextConfig;

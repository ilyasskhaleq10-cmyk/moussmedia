import type { NextConfig } from "next";

// Export estático: `npm run build` genera la carpeta out/ lista para nginx en el VPS.
const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
};

export default nextConfig;

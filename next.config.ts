import type { NextConfig } from "next";

// GitHub Pages publica este repositório dentro de /tinguita-site.
// Em desenvolvimento local não usamos prefixo, por isso localhost continua simples.
const isGitHubPages = process.env.GITHUB_ACTIONS === "true";
const basePath = isGitHubPages ? "/tinguita-site" : "";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  basePath,
  assetPrefix: basePath,
  images: {
    unoptimized: true,
  },
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
};

export default nextConfig;

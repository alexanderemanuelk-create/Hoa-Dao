import path from "node:path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Explicitne zafixovaný koreň workspace-u, aby Turbopack nehľadal
  // package-lock.json vo vyšších priečinkoch (a nemylil sa, ak nejaký nájde).
  turbopack: {
    root: path.resolve(__dirname),
  },
};

export default nextConfig;

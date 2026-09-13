import path from "node:path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Explicitne zafixovaný koreň workspace-u, aby Turbopack nehľadal
  // package-lock.json vo vyšších priečinkoch (a nemylil sa, ak nejaký nájde).
  turbopack: {
    root: path.resolve(__dirname),
  },
  images: {
    // 75 je predvolená kvalita next/image, 90 používajú dekoratívne fotky
    // (napr. strom v Menu.tsx), kde záleží na ostrosti.
    qualities: [75, 90],
  },
};

export default nextConfig;

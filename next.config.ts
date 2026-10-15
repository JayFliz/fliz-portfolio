import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ['reveal.js'],
  // The RSS reader reads its OPML from disk when the page regenerates.
  outputFileTracingIncludes: {
    '/experiments/rss-reader': ['./src/lib/rss/feeds.opml'],
  },
};

export default nextConfig;

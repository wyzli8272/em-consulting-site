import type { NextConfig } from "next";

// Pin the workspace root to this project. The user has a stray
// `package-lock.json` in their home directory that Turbopack would otherwise
// infer as the workspace root, producing a noisy build warning.
const projectRoot = import.meta.dirname;

// Security headers: baseline hardening for a marketing site. CSP with a GA-aware
// nonce is intentionally omitted here — it needs a middleware pass and a rewrite
// of the gtag Script strategy, scheduled for a future round. Everything below
// is safe to ship as-is.
const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
  },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
];

const nextConfig: NextConfig = {
  turbopack: {
    root: projectRoot,
  },
  experimental: {
    // Tree-shakes named imports from large packages; ~5-8 KB savings on framer-motion.
    optimizePackageImports: ["framer-motion"],
  },
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30 days
    // Next 16 added an opt-in allowlist: `quality` props on <Image>
    // outside this list are silently downgraded to 75 (measured in
    // Round 6: every Hero srcset URL emitted `q=75` despite passing
    // `quality={85}` in code). Keep 75 for the default + any values
    // any component actually passes.
    qualities: [75, 80, 85],
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;

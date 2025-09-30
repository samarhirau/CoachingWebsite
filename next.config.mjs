// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   eslint: {
//     ignoreDuringBuilds: true,
//   },
//   typescript: {
//     ignoreBuildErrors: true,
//   },
//   images: {
//     unoptimized: true,
//   },
//   // output: 'export',   
// }

// export default nextConfig
/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  async headers() {
    return [
      {
        source: "/(.*)", // sab routes ke liye
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable", // long-term caching
          },
          {
            key: "X-Frame-Options",
            value: "SAMEORIGIN", // best practice
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff", // best practice
          },
        ],
      },
    ]
  },
}

export default nextConfig

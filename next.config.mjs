/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: ["@prisma/client", "bcryptjs", "pdf-parse"],
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
  webpack: (config, { isServer }) => {
    if (isServer) {
      // Prevent pdf-parse from trying to load its test files
      config.externals = [
        ...(Array.isArray(config.externals) ? config.externals : []),
        "pdf-parse",
      ]
    }
    return config
  },
}

export default nextConfig

// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   output: "standalone",
//   images: {
//     remotePatterns: [
//       {
//         protocol: "https",
//         hostname: "techstudio.nyc3.cdn.digitaloceanspaces.com", //e.g cloudinary
//         pathname: "/**",
//       },
//     ],
//   },
//   transpilePackages: ["lucide-react"],
// };

// export default nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "techstudio.nyc3.cdn.digitaloceanspaces.com",
        pathname: "/**",
      },
    ],
  },
  transpilePackages: ["lucide-react"],
  experimental: {
    // Add these settings to avoid symlink issues
    outputFileTracingRoot: process.cwd(),
    outputFileTracingExcludes: {
      "*": ["node_modules/**/*"],
    },
  },
};

export default nextConfig;

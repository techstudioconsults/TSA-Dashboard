/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "techstudio.nyc3.cdn.digitaloceanspaces.com", //e.g cloudinary
        pathname: "/**",
      },
    ],
  },
  transpilePackages: ["lucide-react"],
};

export default nextConfig;

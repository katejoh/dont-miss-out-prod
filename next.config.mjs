/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  basePath: "/dont-miss-out-prod",
  images: {
    unoptimized: true,
  },
  compiler: {
    styledComponents: true,
  },
};

export default nextConfig;

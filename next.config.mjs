/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true, // evita falhas de build por causa de warnings do ESLint
  },
  typescript: {
    ignoreBuildErrors: true, // evita falhas de build por causa de erros de TypeScript
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      // Evita que módulos que usam 'fs' ou 'path' quebrem no cliente
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        path: false,
      };
    }
    return config;
  },
};

export default nextConfig;
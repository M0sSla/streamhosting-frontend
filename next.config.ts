import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin('./src/libs/i18n/request.ts')

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'eafed48a-3b6f-48fa-822a-ffdb08ca1a5b.selstorage.ru'
      }
    ]
  }
};

export default withNextIntl(nextConfig);

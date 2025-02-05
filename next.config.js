/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    API_URL: process.env.API_URL || 'https://api.pyreprocessing.com/api/v1',
    ENV: process.env.ENV,
    ENCRYPTION_KEY: process.env.ENCRYPTION_KEY,
    GHL_CLIENT_ID: process.env.NEXT_PUBLIC_GHL_CLIENT_ID,
    GHL_REDIRECT_URI: process.env.NEXT_PUBLIC_GHL_REDIRECT_URI,
    GHL_BASE_URL: process.env.NEXT_PUBLIC_GHL_BASE_URL,
    CALENDLY_CLIENT_ID: process.env.CALENDLY_CLIENT_ID,
    CALENDLY_REDIRECT_URI: process.env.CALENDLY_REDIRECT_URI,
    OAUTH_REDIRECT_URI: process.env.NEXT_PUBLIC_OAUTH_REDIRECT_URI,
  },

  //Redirect / to /dash
  redirects: async () => {
    return [
      {
        source: '/',
        destination: '/home',
        permanent: true,
      },
      {
        source: '/login',
        destination: '/home',
        permanent: true,
      },
    ];
  },

  images: {
    domains: ['s3.wasabisys.com', 'www.countryflags.io', 'upload.wikimedia.org', 'flagcdn.com'],
  },
};

module.exports = nextConfig;

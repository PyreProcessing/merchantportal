/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    API_URL: process.env.API_URL || 'https://api.pyreprocessing.com/api/v1',
    ENV: process.env.ENV,
    ENCRYPTION_KEY: 'asdf234as2342asdf2i;lk342342;$23423',
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
    domains: [
      's3.wasabisys.com',
      'www.countryflags.io',
      'upload.wikimedia.org',
      'flagcdn.com',
    ],
  },
};

module.exports = nextConfig;

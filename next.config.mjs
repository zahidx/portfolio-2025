// next.config.mjs
import withPWA from 'next-pwa';

const nextConfig = {
  reactStrictMode: true, // Optional: Enables strict mode
};

export default withPWA({
  ...nextConfig,
  pwa: {
    dest: 'public', // where the service worker file will be stored
    disable: process.env.NODE_ENV === 'development', // disable PWA in development mode
  },
});

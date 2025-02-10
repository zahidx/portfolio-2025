import withPWA from "next-pwa";

const nextConfig = {
  reactStrictMode: true, // ✅ This stays outside the pwa config
  pwa: {
    dest: "public", // Where the service worker file will be stored
    disable: process.env.NODE_ENV === "development", // Disable PWA in development mode
  },
};

export default withPWA(nextConfig);

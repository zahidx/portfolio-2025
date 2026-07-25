export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: "/message",
    },
    sitemap: "https://portfolio-2025-u.netlify.app/sitemap.xml",
  };
}

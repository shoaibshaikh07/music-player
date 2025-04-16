export const Constant = {
  PRODUCTION_URL: "https://soulplay.vercel.app",
  SITE_URL:
    process.env.NODE_ENV === "production"
      ? "https://soulplay.vercel.app"
      : "http://localhost:3000",
};

export const Constant = {
  SITE_URL:
    process.env.NODE_ENV === "production"
      ? "https://soulplay.vercel.app"
      : "http://localhost:3000",
};

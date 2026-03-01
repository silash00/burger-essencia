import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const siteUrl = process.env.VITE_SITE_URL || "";

export default defineConfig({
  plugins: [
    react(),
    {
      name: "html-og-image",
      transformIndexHtml(html) {
        if (!siteUrl) return html;
        const imageUrl = `${siteUrl.replace(/\/$/, "")}/og-image.png`;
        return html.replace(
          /content="\/og-image\.png"/g,
          `content="${imageUrl}"`
        );
      },
    },
  ],
  base: "/",
});

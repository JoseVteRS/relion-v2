import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
export default defineConfig({
  plugins: [tailwindcss()],
  publicDir: "./src/public",
  envDir:
    process.env.NODE_ENV === "production" ? "./env.production" : "./env.local",
});

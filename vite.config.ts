import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
export default defineConfig({
  build: {
    rollupOptions: {
      external: [
        /^\.prisma/, // Excluye cualquier importación que comience con .prisma
        "prisma",
        "@prisma/client",
      ],
    },
  },
  plugins: [tailwindcss()],
  publicDir: "./src/public",
  envDir:
    process.env.NODE_ENV === "production" ? "./env.production" : "./env.local",
  resolve: {
    alias: {
      // https://github.com/prisma/prisma/issues/12504#issuecomment-1136126199
      ".prisma/client/index-browser":
        "./node_modules/.prisma/client/index-browser.js",
    },
  },
});

import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import fs from "fs";
import path from "path";

// Plugin to copy CNAME file
const copyCNAME = () => {
  return {
    name: "copy-cname",
    closeBundle: () => {
      fs.copyFileSync("CNAME", "docs/CNAME");
    },
  };
};

export default defineConfig({
  plugins: [tailwindcss(), copyCNAME()],
  base: "/",
  root: "src",
  publicDir: "../public",
  build: {
    outDir: "../docs",
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: "src/index.html",
        about: "src/about.html",
      },
    },
    copyPublicDir: true,
  },
  server: {
    host: "0.0.0.0",
    port: 5173,
    allowedHosts: ["mbpro.local"],
  },
});

import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import fs from "fs";
import path from "path";

// Plugin to copy CNAME file
const copyCNAME = () => {
  return {
    name: "copy-cname",
    closeBundle: () => {
      const sourcePath = path.resolve(__dirname, "CNAME");
      const destPath = path.resolve(__dirname, "../docs/CNAME");
      if (fs.existsSync(sourcePath)) {
        const destDir = path.dirname(destPath);
        if (!fs.existsSync(destDir)) {
          fs.mkdirSync(destDir, { recursive: true });
        }
        fs.copyFileSync(sourcePath, destPath);
      }
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
        video: "src/video.html",
        contact: "src/contact.html",
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

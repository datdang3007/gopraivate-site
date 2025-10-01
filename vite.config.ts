import { defineConfig } from "vite";
import dyadComponentTagger from "@dyad-sh/react-vite-component-tagger";
import path from "path";
import react from "@vitejs/plugin-react-swc";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [dyadComponentTagger(), react()],
  server: {
    allowedHosts: true,
    host: "0.0.0.0",
    port: 5000,
  },
  preview: {
    allowedHosts: true,
    host: "0.0.0.0",
    port: 5000,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});

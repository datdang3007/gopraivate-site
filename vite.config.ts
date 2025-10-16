import { defineConfig, loadEnv } from "vite";
import dyadComponentTagger from "@dyad-sh/react-vite-component-tagger";
import path from "path";
import react from "@vitejs/plugin-react-swc";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  return {
    plugins: [dyadComponentTagger(), react()],
    server: {
      host: "0.0.0.0",
      port: 5000,
      strictPort: true,
      allowedHosts: true,
      hmr: {
        clientPort: 443,
        protocol: "wss",
      },
      // Thêm proxy configuration
      proxy: {
        "/api": {
          target: env.VITE_CONTACT_API_ENDPOINT || "",
          changeOrigin: true,
          secure: true,
          rewrite: (path) => path.replace(/^\/api/, "/api"),
          configure: (proxy) => {
            proxy.on("error", (err, req, res) => {
              console.log("proxy error", err);
            });
            proxy.on("proxyReq", (proxyReq, req, res) => {
              console.log(
                "Sending Request to the Target:",
                req.method,
                req.url,
              );
            });
            proxy.on("proxyRes", (proxyRes, req, res) => {
              console.log(
                "Received Response from the Target:",
                proxyRes.statusCode,
                req.url,
              );
            });
          },
        },
      },
    },
    preview: {
      host: "0.0.0.0",
      port: 5000,
      strictPort: true,
      allowedHosts: true,
      hmr: {
        clientPort: 443,
        protocol: "wss",
      },
      // Thêm proxy configuration
      proxy: {
        "/api": {
          target: env.VITE_CONTACT_API_ENDPOINT || "",
          changeOrigin: true,
          secure: true,
          rewrite: (path) => path.replace(/^\/api/, "/api"),
          configure: (proxy) => {
            proxy.on("error", (err, req, res) => {
              console.log("proxy error", err);
            });
            proxy.on("proxyReq", (proxyReq, req, res) => {
              console.log(
                "Sending Request to the Target:",
                req.method,
                req.url,
              );
            });
            proxy.on("proxyRes", (proxyRes, req, res) => {
              console.log(
                "Received Response from the Target:",
                proxyRes.statusCode,
                req.url,
              );
            });
          },
        },
      },
    },
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
  };
});

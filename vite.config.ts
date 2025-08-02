import path from "node:path";
import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tsconfigPaths({
      skip: (dir) => {
        return dir.includes("backend");
      },
    }),
  ],
  build: {
    rollupOptions: {
      external: [
        "../backend/api",
        "pg",
        "drizzle-orm",
        "drizzle-typebox",
        /^@elysiajs\/(?!eden$).*/,
        /^fs/,
        /^path/,
        /^os/,
        /^process/,
      ],
    },
  },
  server: {
    host: "0.0.0.0",
    port: 5174,
    fs: {
      strict: true,
      allow: [path.resolve(__dirname, "src")],
    },
  },
});

import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  build: {
    lib: {
      entry: "src/index.js",
      name: "LitComponents",
      formats: ["es"],
      fileName: "lit-components",
    },
    rollupOptions: {
      external: [],
    },
  },
  plugins: [tailwindcss()],
});

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Served from https://Panhwar-hub.github.io/my_portfolio/
export default defineConfig({
  base: "/my_portfolio/",
  plugins: [react()],
});

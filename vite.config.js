import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Served from https://Panhwar-hub.github.io/my_portfolio/
export default defineConfig({
  base: "/my_portfolio/",
  plugins: [react()],
  // changes every build so browsers fetch the newest CV instead of a cached one
  define: { __BUILD_ID__: JSON.stringify(Date.now().toString(36)) },
});

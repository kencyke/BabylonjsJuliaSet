import { defineConfig } from "vite"
import glsl from "vite-plugin-glsl"
import tsconfigPaths from "vite-tsconfig-paths"

// eslint-disable-next-line no-restricted-imports
import { version } from "./package.json"


export default defineConfig({
  base: "./",
  plugins: [
    glsl(),
    tsconfigPaths()
  ],
  define: {
    "import.meta.env.BUILD": JSON.stringify(version)
  },
  server: {
    host: "0.0.0.0",
    port: 3000,
    strictPort: true,
    open: true
  }
})

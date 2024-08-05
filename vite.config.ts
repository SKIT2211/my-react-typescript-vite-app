import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,         // Custom port
    open: true,         // Automatically open the browser
    host: true,         // Expose the server on the local network
  },
  build: {
    outDir: 'dist',    // Output directory
    sourcemap: true,   // Generate source maps
  },
})

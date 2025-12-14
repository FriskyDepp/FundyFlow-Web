import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),tailwindcss()],
  base: process.env.VITE_BASE_PATH || '/FundyFlow-Web',
  server: {
    proxy: {
      "/deepseek": {
        target: "https://api-ap-southeast-1.modelarts-maas.com",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/deepseek/, "")
      }
    }
  }

})

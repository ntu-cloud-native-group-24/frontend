import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server:{
    proxy:{
      "/api": {
        target: "https://backend.meal-order-24.csie.org",
        changeOrigin: true,
      }
    }
  }
})

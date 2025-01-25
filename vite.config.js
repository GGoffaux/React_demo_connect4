import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/React_demo_connect4",
  server: {
    port: 3000,
    host: true,
    watch: {
       usePolling: true,
    },
  },
})

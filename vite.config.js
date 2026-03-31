import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  preview: {
      allowedHosts: [
          'best-girl-irl.onrender.com',
          '.onrender.com',
          'localhost'
      ]},
  plugins: [react()],

})

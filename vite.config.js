import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      'smooth-scroll': path.resolve(__dirname, '../Smooth Scroll'),
    },
  },
  optimizeDeps: {
    include: ['framer-motion', 'lenis'],
    exclude: ['smooth-scroll'],
  },
})

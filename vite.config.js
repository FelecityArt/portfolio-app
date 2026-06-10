import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const nm = path.resolve(__dirname, 'node_modules')

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      {
        find: 'smooth-scroll',
        replacement: path.resolve(__dirname, './packages/smooth-scroll'),
      },
      // Force all bare react/lenis/framer-motion imports from outside the
      // project root (i.e. Smooth Scroll components) to resolve from THIS
      // project's node_modules so Rolldown can find them.
      {
        find: /^react\/jsx-runtime$/,
        replacement: `${nm}/react/jsx-runtime.js`,
      },
      {
        find: /^react\/jsx-dev-runtime$/,
        replacement: `${nm}/react/jsx-dev-runtime.js`,
      },
      {
        find: /^react$/,
        replacement: `${nm}/react/index.js`,
      },
      {
        find: /^lenis$/,
        replacement: `${nm}/lenis/dist/lenis.mjs`,
      },
    ],
    dedupe: ['react', 'react-dom', 'framer-motion'],
  },
  optimizeDeps: {
    include: ['framer-motion', 'lenis'],
  },
})

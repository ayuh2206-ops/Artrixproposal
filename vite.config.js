import { defineConfig } from 'vite'
import { createHtmlPlugin } from 'vite-plugin-html'

export default defineConfig({
  root: '.',
  base: '/',
  
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true
      }
    },
    rollupOptions: {
      output: {
        manualChunks: undefined,
        assetFileNames: 'assets/[name]-[hash][extname]',
        chunkFileNames: 'assets/[name]-[hash].js',
        entryFileNames: 'assets/[name]-[hash].js'
      }
    },
    cssCodeSplit: false,
    sourcemap: false
  },

  plugins: [
    createHtmlPlugin({
      minify: true,
      inject: {
        data: {
          title: 'Artrix x Vero Media | Strategic Alliance'
        }
      }
    })
  ],

  server: {
    port: 3000,
    open: true,
    cors: true
  },

  preview: {
    port: 4173
  },

  optimizeDeps: {
    include: []
  }
})

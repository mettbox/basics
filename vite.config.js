import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    vue({
      template: {
        // Vue 2 kept leading/trailing whitespace inside inline elements (e.g. "3 x 4" in Home.vue)
        compilerOptions: { whitespace: 'preserve' }
      }
    }),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'img/icons/*.png', 'img/icons/*.svg'],
      manifest: {
        name: 'basics',
        short_name: 'basics',
        icons: [
          {
            src: './img/icons/android-chrome-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: './img/icons/android-chrome-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ],
        start_url: './index.html',
        display: 'standalone',
        background_color: '#000000',
        theme_color: '#4DBA87'
      }
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  build: {
    // lightningcss (Vite default) rewrites Bulma's legacy :-moz-placeholder selectors
    // to :placeholder-shown, which changes the input's own color
    cssMinify: 'esbuild'
  },
  css: {
    preprocessorOptions: {
      scss: {
        // Bulma 0.7 uses Sass features deprecated in Dart Sass 1.x
        quietDeps: true,
        silenceDeprecations: ['import', 'global-builtin', 'color-functions', 'if-function']
      }
    }
  }
})

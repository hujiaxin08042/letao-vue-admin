import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import WindiCSS from 'vite-plugin-windicss'
import path from 'path' 

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      // ~是src目录的别名，指代src
      '~': path.resolve(__dirname, 'src')
    }
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://ceshi13.dishait.cn',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    }

  },
  plugins: [vue(), WindiCSS()],
})

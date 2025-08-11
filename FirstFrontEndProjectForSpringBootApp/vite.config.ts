import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      // 匹配所有以 /task-lists 開頭的路徑
      '/task-lists': {
        target: 'http://localhost:8080', // 轉發到後端
        changeOrigin: true, // 更改來源，解決 CORS
        // 添加日誌以確認代理
        configure: (proxy, options) => {
          proxy.on('error', (err, req, res) => {
            console.log('Proxy 錯誤:', err.message);
          });
          proxy.on('proxyReq', (proxyReq, req, res) => {
            console.log('代理請求:', req.url, '->', options.target + req.url);
          });
          proxy.on('proxyRes', (proxyRes, req, res) => {
            console.log('代理回應:', proxyRes.statusCode, req.url);
          });
        },
      },
      // 為 /enums 添加代理
      '/enums': {
        target: 'http://localhost:8080', // 轉發到後端
        changeOrigin: true, // 更改來源，解決 CORS
        configure: (proxy, options) => {
          proxy.on('error', (err, req, res) => {
            console.log('Proxy 錯誤:', err.message);
          });
          proxy.on('proxyReq', (proxyReq, req, res) => {
            console.log('代理請求:', req.url, '->', options.target + req.url);
          });
          proxy.on('proxyRes', (proxyRes, req, res) => {
            console.log('代理回應:', proxyRes.statusCode, req.url);
          });
        },
      },
    },
  },
});
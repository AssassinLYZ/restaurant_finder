import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export const PORT = 5176;

export default defineConfig({
  plugins: [react()],
  server: {
    port: PORT,
    host: true,
    proxy: {
      "/api": {
        target: "https://uk.api.just-eat.io",
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, ""),
      }
    }
  },
  resolve: {
    alias: [
      {
        find: /^~(.+)/,
        replacement: path.join(process.cwd(), 'node_modules/$1'),
      },
      {
        find: /^src(.+)/,
        replacement: path.join(process.cwd(), 'src/$1'),
      },
    ],
  },
  preview: { port: PORT, host: true },

});

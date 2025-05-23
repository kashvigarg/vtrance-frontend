import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(() => {
  return {
    server: {
        open: true,
        port: 3000, 
      },
    build: {
      outDir: 'build',
    },
    plugins: [react()],
    optimizeDeps: {
      exclude: ["@ffmpeg/ffmpeg", "@ffmpeg/util"],
    },
  };
});
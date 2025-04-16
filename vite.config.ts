import { defineConfig } from 'vite';

export default defineConfig({
  optimizeDeps: {
    exclude: ['@ionic/core']
  },
  build: {
    rollupOptions: {
      onwarn(warning, warn) {
        if (
          warning.message.includes('cannot be analyzed') ||
          warning.message.includes('Use the /* @vite-ignore */ comment')
        ) {
          return;
        }
        warn(warning);
      }
    }
  }
});
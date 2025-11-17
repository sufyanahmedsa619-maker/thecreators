import { fileURLToPath, URL } from 'url';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');
    return {
      server: {
        port: 3000,
        host: '0.0.0.0',
      },
      plugins: [react()],
      resolve: {
        alias: {
          // FIX: Use `import.meta.url` to get the current directory, as `__dirname` is not available in ES modules.
          '@': fileURLToPath(new URL('.', import.meta.url)),
        }
      }
    };
});
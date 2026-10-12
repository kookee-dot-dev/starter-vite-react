import { tanstackRouter } from '@tanstack/router-plugin/vite';
import react from '@vitejs/plugin-react';
import { defineConfig, loadEnv } from 'vite';

export default defineConfig(({ mode }) => {
  // Only these three reach the bundle, so no other variable, such as a copied secret, ships with it.
  const env = loadEnv(mode, '.', '');
  return {
    plugins: [tanstackRouter({ target: 'react', autoCodeSplitting: true }), react()],
    define: {
      'import.meta.env.KOOKEE_API_KEY': JSON.stringify(env.KOOKEE_API_KEY ?? ''),
      'import.meta.env.KOOKEE_ROADMAP': JSON.stringify(env.KOOKEE_ROADMAP ?? 'true'),
      'import.meta.env.KOOKEE_STATUS': JSON.stringify(env.KOOKEE_STATUS ?? 'false'),
    },
  };
});

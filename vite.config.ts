import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist', // Ensure this matches the output directory for deployment
  },
  server: {
    port: 3000, // Ensure this port is not conflicting with other services
  },
});

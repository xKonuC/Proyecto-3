import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// import dotenv from 'dotenv';
// dotenv.config({
//   path:'.env.seconddev',
// });

export default defineConfig(() => {
  return {
    build: {
      outDir: 'build',
    },
    // server: {
    //   port: 80
    // },
    plugins: [
      react(),
    ],
  };
});
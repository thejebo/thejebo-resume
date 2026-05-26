import { defineConfig } from 'vite';
import { resolve } from 'path';
import fs from 'fs';

export default defineConfig(({ command }) => ({
  base: '/thejebo-resume/',
  plugins: [
    {
      name: 'serve-local-letters',
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          const prefix = '/thejebo-resume/letters.local/';
          if (req.url.startsWith(prefix)) {
            const fileName = req.url.slice(prefix.length).split('?')[0];
            const filePath = resolve(__dirname, 'letters.local', fileName);
            
            if (fs.existsSync(filePath)) {
              res.setHeader('Content-Type', 'application/json');
              res.end(fs.readFileSync(filePath));
              return;
            }
          }
          next();
        });
      }
    }
  ],
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
      },
    },
  },
}));

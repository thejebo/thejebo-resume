import { defineConfig } from "vite";
import { resolve } from "path";
import fs from "fs";

export default defineConfig(({ command }) => ({
  base: "/thejebo-resume/",
  plugins: [
    {
      name: "serve-local-letters",
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          const rawUrl = req.url || "";
          const pathOnly = rawUrl.split("?")[0];
          const querySuffix = rawUrl.includes("?") ? rawUrl.slice(rawUrl.indexOf("?")) : "";

          if (
            pathOnly === "/thejebo-resume/print" ||
            pathOnly === "/thejebo-resume/print/"
          ) {
            req.url = `/thejebo-resume/print.html${querySuffix}`;
          }

          if (pathOnly === "/thejebo-resume/private/referrers") {
            const filePath = resolve(__dirname, "local-resources", "Referrers.md");

            if (fs.existsSync(filePath)) {
              res.statusCode = 200;
              res.setHeader("Content-Type", "text/markdown; charset=utf-8");
              res.end(fs.readFileSync(filePath));
              return;
            }

            res.statusCode = 404;
            res.end("Not found");
            return;
          }

          const prefix = "/thejebo-resume/letters.local/";
          if (rawUrl.startsWith(prefix)) {
            const fileName = rawUrl.slice(prefix.length).split("?")[0];
            const filePath = resolve(__dirname, "letters.local", fileName);

            if (fs.existsSync(filePath)) {
              res.setHeader("Content-Type", "application/json");
              res.end(fs.readFileSync(filePath));
              return;
            }
          }

          next();
        });
      },
    },
  ],
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        coverLetter: resolve(__dirname, "cover-letter.html"),
      },
    },
  },
}));

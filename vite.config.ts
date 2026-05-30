import { defineConfig } from "vite";
import fs from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = fileURLToPath(new URL(".", import.meta.url));

export default defineConfig(() => ({
  base: "/thejebo-resume/",
  plugins: [
    {
      name: "serve-local-letters",
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          const rawUrl = req.url || "";
          const pathOnly = rawUrl.split("?")[0];
          const querySuffix = rawUrl.includes("?")
            ? rawUrl.slice(rawUrl.indexOf("?"))
            : "";

          if (
            pathOnly === "/thejebo-resume/print" ||
            pathOnly === "/thejebo-resume/print/"
          ) {
            req.url = `/thejebo-resume/print.html${querySuffix}`;
          }

          if (pathOnly === "/thejebo-resume/private/referrers.json") {
            const filePath = resolve(
              projectRoot,
              "resources.local",
              "Referrers.json",
            );

            if (fs.existsSync(filePath)) {
              res.statusCode = 200;
              res.setHeader("Content-Type", "application/json; charset=utf-8");
              res.end(fs.readFileSync(filePath));
              return;
            }

            res.statusCode = 404;
            res.end("Not found");
            return;
          }

          if (pathOnly === "/thejebo-resume/private/referrers") {
            const filePath = resolve(
              projectRoot,
              "resources.local",
              "Referrers.md",
            );

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
            const filePath = resolve(projectRoot, "letters.local", fileName);

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
        main: resolve(projectRoot, "index.html"),
        coverLetter: resolve(projectRoot, "cover-letter.html"),
      },
    },
  },
}));

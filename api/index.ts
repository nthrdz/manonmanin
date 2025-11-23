// Point d'entrée Vercel pour l'application Express
// Ce fichier sera compilé par esbuild avec toutes les dépendances bundlées
import dotenv from 'dotenv';
import { resolve } from 'path';

// Charger .env.local en priorité, puis .env
dotenv.config({ path: resolve(process.cwd(), '.env.local') });
dotenv.config({ path: resolve(process.cwd(), '.env') });

import express, { type Request, Response, NextFunction } from "express";
import { registerRoutes } from "../server/routes";
import { serveStatic } from "../server/vite";

const app = express();

declare module 'http' {
  interface IncomingMessage {
    rawBody: unknown
  }
}

app.use(express.json({
  verify: (req, _res, buf) => {
    req.rawBody = buf;
  }
}));
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse: Record<string, any> | undefined = undefined;

  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path.startsWith("/api")) {
      let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }

      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "…";
      }

      console.log(logLine);
    }
  });

  next();
});

// Initialiser les routes de manière asynchrone
let appInitialized = false;
let initPromise: Promise<void> | null = null;

async function initializeApp() {
  if (appInitialized) return;
  if (initPromise) return initPromise;

  initPromise = (async () => {
    await registerRoutes(app);

    app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
      const status = err.status || err.statusCode || 500;
      const message = err.message || "Internal Server Error";

      res.status(status).json({ message });
      throw err;
    });

    // En production, servir les fichiers statiques
    if (process.env.NODE_ENV !== 'development') {
      serveStatic(app);
    }

    appInitialized = true;
  })();

  return initPromise;
}

// Middleware pour initialiser l'app avant de traiter les requêtes
app.use(async (req, res, next) => {
  await initializeApp();
  next();
});

export default app;


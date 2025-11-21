import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";

export default defineConfig({
  plugins: [
    react(),
    runtimeErrorOverlay(),
    ...(process.env.NODE_ENV !== "production" &&
    process.env.REPL_ID !== undefined
      ? [
          await import("@replit/vite-plugin-cartographer").then((m) =>
            m.cartographer(),
          ),
          await import("@replit/vite-plugin-dev-banner").then((m) =>
            m.devBanner(),
          ),
        ]
      : []),
  ],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "client", "src"),
      "@shared": path.resolve(import.meta.dirname, "shared"),
      "@assets": path.resolve(import.meta.dirname, "attached_assets"),
    },
  },
  root: path.resolve(import.meta.dirname, "client"),
  build: {
    outDir: path.resolve(import.meta.dirname, "dist/public"),
    emptyOutDir: true,
    rollupOptions: {
      output: {
        manualChunks: {
          // Framework React
          'react-vendor': ['react', 'react-dom', 'react/jsx-runtime'],
          // Routing
          'router': ['wouter'],
          // Animations
          'animations': ['framer-motion'],
          // Particles
          'particles': ['@tsparticles/react', '@tsparticles/slim', '@tsparticles/engine'],
          // UI Components - Radix UI
          'radix-ui': [
            '@radix-ui/react-dialog',
            '@radix-ui/react-toast',
            '@radix-ui/react-slot',
            '@radix-ui/react-label',
          ],
          // Forms
          'forms': ['react-hook-form', '@hookform/resolvers', 'zod'],
          // Data fetching
          'query': ['@tanstack/react-query'],
          // Icons
          'icons': ['lucide-react', 'react-icons'],
          // Utilities
          'utils': ['clsx', 'tailwind-merge', 'class-variance-authority'],
        },
      },
    },
    chunkSizeWarningLimit: 600,
  },
  server: {
    fs: {
      strict: true,
      deny: ["**/.*"],
    },
  },
});

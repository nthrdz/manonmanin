// api/index.ts
import dotenv2 from "dotenv";
import { resolve as resolve2 } from "path";
import express2 from "express";

// server/routes.ts
import { createServer } from "http";

// server/storage.ts
import { randomUUID } from "crypto";
var MemStorage = class {
  contacts;
  newsletters;
  constructor() {
    this.contacts = /* @__PURE__ */ new Map();
    this.newsletters = /* @__PURE__ */ new Map();
  }
  async saveContact(contact) {
    const id = randomUUID();
    const storedContact = {
      ...contact,
      id,
      createdAt: /* @__PURE__ */ new Date()
    };
    this.contacts.set(id, storedContact);
    return storedContact;
  }
  async getAllContacts() {
    return Array.from(this.contacts.values()).sort(
      (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
    );
  }
  async getContact(id) {
    return this.contacts.get(id);
  }
  async saveNewsletter(newsletter) {
    const existing = Array.from(this.newsletters.values()).find(
      (n) => n.email.toLowerCase() === newsletter.email.toLowerCase()
    );
    if (existing) {
      return existing;
    }
    const id = randomUUID();
    const storedNewsletter = {
      ...newsletter,
      id,
      createdAt: /* @__PURE__ */ new Date()
    };
    this.newsletters.set(id, storedNewsletter);
    return storedNewsletter;
  }
  async getAllNewsletters() {
    return Array.from(this.newsletters.values()).sort(
      (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
    );
  }
};
var storage = new MemStorage();

// server/email.ts
import dotenv from "dotenv";
import { resolve } from "path";
import nodemailer from "nodemailer";
if (!process.env.SMTP_HOST) {
  dotenv.config({ path: resolve(process.cwd(), ".env.local") });
  dotenv.config({ path: resolve(process.cwd(), ".env") });
}
var EmailService = class {
  transporter = null;
  isConfigured = false;
  constructor() {
    this.initialize();
  }
  async initialize() {
    try {
      const hasSmtpConfig = process.env.SMTP_HOST && process.env.SMTP_PORT && process.env.SMTP_USER && process.env.SMTP_PASS;
      if (hasSmtpConfig) {
        this.transporter = nodemailer.createTransport({
          host: process.env.SMTP_HOST,
          port: parseInt(process.env.SMTP_PORT || "587"),
          secure: process.env.SMTP_SECURE === "true",
          auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS
          }
        });
        this.isConfigured = true;
        console.log("\u2705 Email service configured with SMTP");
      } else {
        const testAccount = await nodemailer.createTestAccount();
        this.transporter = nodemailer.createTransport({
          host: "smtp.ethereal.email",
          port: 587,
          secure: false,
          auth: {
            user: testAccount.user,
            pass: testAccount.pass
          }
        });
        console.log("\u{1F4E7} Email service using Ethereal test account");
        console.log("   Preview emails at: https://ethereal.email");
      }
    } catch (error) {
      console.error("\u274C Failed to initialize email service:", error);
      this.transporter = null;
    }
  }
  async sendContactEmail(contact) {
    if (!this.transporter) {
      console.warn("\u26A0\uFE0F  Email not sent - transporter not initialized");
      return { success: false };
    }
    const typeLabels = {
      "post-partum": "Post-Partum",
      grossesse: "Grossesse",
      autre: "Autre"
    };
    const typeText = contact.typeAccompagnement ? typeLabels[contact.typeAccompagnement] : "Non sp\xE9cifi\xE9";
    try {
      const info = await this.transporter.sendMail({
        from: `"Site Post-Partum" <${process.env.SMTP_FROM || "noreply@manon-manin.fr"}>`,
        to: process.env.CONTACT_EMAIL || "contact@manon-manin.fr",
        replyTo: contact.email,
        subject: `Nouveau message de ${contact.nom}`,
        html: `
          <div style="font-family: 'Inter', Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f5f0;">
            <div style="background-color: white; border-radius: 12px; padding: 32px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
              <h1 style="color: #D4764B; font-family: 'Cormorant Garamond', Georgia, serif; font-size: 28px; margin-bottom: 24px; border-bottom: 2px solid #D4764B; padding-bottom: 12px;">
                Nouveau Message de Contact
              </h1>
              
              <div style="margin-bottom: 24px;">
                <h2 style="color: #5C3D2E; font-size: 18px; margin-bottom: 8px;">Informations</h2>
                <table style="width: 100%; border-collapse: collapse;">
                  <tr>
                    <td style="padding: 8px 0; color: #8B4513; font-weight: 600;">Nom:</td>
                    <td style="padding: 8px 0; color: #333;">${contact.nom}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; color: #8B4513; font-weight: 600;">Email:</td>
                    <td style="padding: 8px 0;"><a href="mailto:${contact.email}" style="color: #D4764B; text-decoration: none;">${contact.email}</a></td>
                  </tr>
                  ${contact.telephone ? `
                  <tr>
                    <td style="padding: 8px 0; color: #8B4513; font-weight: 600;">T\xE9l\xE9phone:</td>
                    <td style="padding: 8px 0; color: #333;">${contact.telephone}</td>
                  </tr>
                  ` : ""}
                  <tr>
                    <td style="padding: 8px 0; color: #8B4513; font-weight: 600;">Type:</td>
                    <td style="padding: 8px 0; color: #333;">${typeText}</td>
                  </tr>
                </table>
              </div>

              <div style="margin-bottom: 24px;">
                <h2 style="color: #5C3D2E; font-size: 18px; margin-bottom: 12px;">Message</h2>
                <div style="background-color: #f9f5f0; padding: 16px; border-radius: 8px; border-left: 4px solid #D4764B;">
                  <p style="color: #333; line-height: 1.6; margin: 0; white-space: pre-wrap;">${contact.message}</p>
                </div>
              </div>

              <div style="text-align: center; padding-top: 20px; border-top: 1px solid #e5e5e5;">
                <a href="mailto:${contact.email}" style="display: inline-block; background-color: #D4764B; color: white; padding: 12px 32px; border-radius: 6px; text-decoration: none; font-weight: 600;">
                  R\xE9pondre \xE0 ${contact.nom}
                </a>
              </div>
            </div>
          </div>
        `,
        text: `
Nouveau message de contact

Nom: ${contact.nom}
Email: ${contact.email}
${contact.telephone ? `T\xE9l\xE9phone: ${contact.telephone}` : ""}
Type d'accompagnement: ${typeText}

Message:
${contact.message}
        `
      });
      console.log("\u2705 Email sent:", info.messageId);
      if (!this.isConfigured) {
        const previewUrl = nodemailer.getTestMessageUrl(info);
        if (previewUrl) {
          console.log("\u{1F4E7} Preview URL:", previewUrl);
          return { success: true, previewUrl };
        }
      }
      return { success: true };
    } catch (error) {
      console.error("\u274C Failed to send email:", error);
      return { success: false };
    }
  }
  async sendConfirmationEmail(contact) {
    if (!this.transporter) {
      return;
    }
    try {
      await this.transporter.sendMail({
        from: `"Accompagnement Post-Partum" <${process.env.SMTP_FROM || "noreply@manon-manin.fr"}>`,
        to: contact.email,
        subject: "Confirmation de votre message",
        html: `
          <div style="font-family: 'Inter', Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f5f0;">
            <div style="background-color: white; border-radius: 12px; padding: 32px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
              <h1 style="color: #D4764B; font-family: 'Cormorant Garamond', Georgia, serif; font-size: 28px; margin-bottom: 16px;">
                Merci pour votre message !
              </h1>
              
              <p style="color: #333; line-height: 1.6; margin-bottom: 16px;">
                Bonjour ${contact.nom},
              </p>
              
              <p style="color: #333; line-height: 1.6; margin-bottom: 16px;">
                J'ai bien re\xE7u votre message et je vous en remercie. Je m'engage \xE0 vous r\xE9pondre dans les plus brefs d\xE9lais, g\xE9n\xE9ralement sous 24 \xE0 48 heures.
              </p>
              
              <p style="color: #333; line-height: 1.6; margin-bottom: 24px;">
                En attendant, n'h\xE9sitez pas \xE0 consulter mes ressources sur le site.
              </p>
              
              <div style="text-align: center; margin: 32px 0;">
                <div style="display: inline-block; background-color: #f9f5f0; padding: 20px; border-radius: 8px; border: 2px solid #D4764B;">
                  <p style="color: #8B4513; font-weight: 600; margin: 0;">
                    \u{1F49B} Prenez soin de vous \u{1F49B}
                  </p>
                </div>
              </div>
              
              <div style="text-align: center; padding-top: 20px; border-top: 1px solid #e5e5e5; font-size: 14px; color: #666;">
                <p>Accompagnement Post-Partum</p>
                <p>Nantes</p>
              </div>
            </div>
          </div>
        `,
        text: `
Bonjour ${contact.nom},

J'ai bien re\xE7u votre message et je vous en remercie. Je m'engage \xE0 vous r\xE9pondre dans les plus brefs d\xE9lais, g\xE9n\xE9ralement sous 24 \xE0 48 heures.

En attendant, n'h\xE9sitez pas \xE0 consulter mes ressources sur le site.

Prenez soin de vous,

Accompagnement Post-Partum
Nantes
        `
      });
      console.log("\u2705 Confirmation email sent to:", contact.email);
    } catch (error) {
      console.error("\u274C Failed to send confirmation email:", error);
    }
  }
  async sendNewsletterConfirmationEmail(newsletter) {
    if (!this.transporter) {
      return;
    }
    try {
      await this.transporter.sendMail({
        from: `"Accompagnement Post-Partum" <${process.env.SMTP_FROM || "noreply@manon-manin.fr"}>`,
        to: newsletter.email,
        subject: "Bienvenue dans notre newsletter !",
        html: `
          <div style="font-family: 'Inter', Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f5f0;">
            <div style="background-color: white; border-radius: 12px; padding: 32px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
              <h1 style="color: #D4764B; font-family: 'Cormorant Garamond', Georgia, serif; font-size: 28px; margin-bottom: 16px;">
                Bienvenue ! \u2728
              </h1>
              
              <p style="color: #333; line-height: 1.6; margin-bottom: 16px;">
                Merci de vous \xEAtre inscrit \xE0 notre newsletter !
              </p>
              
              <p style="color: #333; line-height: 1.6; margin-bottom: 16px;">
                Vous recevrez d\xE9sormais nos conseils, astuces et actualit\xE9s directement dans votre bo\xEEte mail. Nous partageons r\xE9guli\xE8rement des informations sur l'accompagnement post-partum, la parentalit\xE9 bienveillante et le bien-\xEAtre des mamans.
              </p>
              
              <div style="text-align: center; margin: 32px 0;">
                <div style="display: inline-block; background-color: #f9f5f0; padding: 20px; border-radius: 8px; border: 2px solid #D4764B;">
                  <p style="color: #8B4513; font-weight: 600; margin: 0;">
                    \u{1F49B} Prenez soin de vous \u{1F49B}
                  </p>
                </div>
              </div>
              
              <div style="text-align: center; padding-top: 20px; border-top: 1px solid #e5e5e5; font-size: 14px; color: #666;">
                <p>Accompagnement Post-Partum</p>
                <p>Nantes</p>
              </div>
            </div>
          </div>
        `,
        text: `
Merci de vous \xEAtre inscrit \xE0 notre newsletter !

Vous recevrez d\xE9sormais nos conseils, astuces et actualit\xE9s directement dans votre bo\xEEte mail. Nous partageons r\xE9guli\xE8rement des informations sur l'accompagnement post-partum, la parentalit\xE9 bienveillante et le bien-\xEAtre des mamans.

Prenez soin de vous,

Accompagnement Post-Partum
Nantes
        `
      });
      console.log("\u2705 Newsletter confirmation email sent to:", newsletter.email);
    } catch (error) {
      console.error("\u274C Failed to send newsletter confirmation email:", error);
    }
  }
};
var emailService = new EmailService();

// shared/schema.ts
import { z } from "zod";
var contactSchema = z.object({
  nom: z.string().min(2, "Le nom doit contenir au moins 2 caract\xE8res"),
  email: z.string().email("Email invalide"),
  telephone: z.string().optional(),
  message: z.string().min(10, "Le message doit contenir au moins 10 caract\xE8res"),
  typeAccompagnement: z.enum(["post-partum", "grossesse", "autre"]).optional()
});
var newsletterSchema = z.object({
  email: z.string().email("Email invalide")
});

// server/routes.ts
import { z as z2 } from "zod";
async function registerRoutes(app2) {
  app2.post("/api/contact", async (req, res) => {
    try {
      const validatedData = contactSchema.parse(req.body);
      const savedContact = await storage.saveContact(validatedData);
      const emailResult = await emailService.sendContactEmail(validatedData);
      emailService.sendConfirmationEmail(validatedData).catch(
        (err) => console.error("Failed to send confirmation:", err)
      );
      res.json({
        success: true,
        message: "Votre message a \xE9t\xE9 envoy\xE9 avec succ\xE8s !",
        id: savedContact.id,
        ...emailResult.previewUrl && { previewUrl: emailResult.previewUrl }
      });
    } catch (error) {
      if (error instanceof z2.ZodError) {
        return res.status(400).json({
          success: false,
          message: "Donn\xE9es invalides",
          errors: error.errors
        });
      }
      console.error("Error processing contact form:", error);
      res.status(500).json({
        success: false,
        message: "Une erreur est survenue. Veuillez r\xE9essayer."
      });
    }
  });
  app2.get("/api/contacts", async (req, res) => {
    try {
      const contacts = await storage.getAllContacts();
      res.json({
        success: true,
        contacts
      });
    } catch (error) {
      console.error("Error fetching contacts:", error);
      res.status(500).json({
        success: false,
        message: "Une erreur est survenue"
      });
    }
  });
  app2.post("/api/newsletter", async (req, res) => {
    try {
      const validatedData = newsletterSchema.parse(req.body);
      const savedNewsletter = await storage.saveNewsletter(validatedData);
      emailService.sendNewsletterConfirmationEmail(validatedData).catch(
        (err) => console.error("Failed to send newsletter confirmation:", err)
      );
      res.json({
        success: true,
        message: "Merci de vous \xEAtre inscrit \xE0 notre newsletter !",
        id: savedNewsletter.id
      });
    } catch (error) {
      if (error instanceof z2.ZodError) {
        return res.status(400).json({
          success: false,
          message: "Donn\xE9es invalides",
          errors: error.errors
        });
      }
      console.error("Error processing newsletter subscription:", error);
      res.status(500).json({
        success: false,
        message: "Une erreur est survenue. Veuillez r\xE9essayer."
      });
    }
  });
  const httpServer = createServer(app2);
  return httpServer;
}

// server/vite.ts
import express from "express";
import fs from "fs";
import path2 from "path";
import { createServer as createViteServer, createLogger } from "vite";

// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";
var vite_config_default = defineConfig({
  plugins: [
    react(),
    runtimeErrorOverlay(),
    ...process.env.NODE_ENV !== "production" && process.env.REPL_ID !== void 0 ? [
      await import("@replit/vite-plugin-cartographer").then(
        (m) => m.cartographer()
      ),
      await import("@replit/vite-plugin-dev-banner").then(
        (m) => m.devBanner()
      )
    ] : []
  ],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "client", "src"),
      "@shared": path.resolve(import.meta.dirname, "shared"),
      "@assets": path.resolve(import.meta.dirname, "attached_assets")
    }
  },
  root: path.resolve(import.meta.dirname, "client"),
  build: {
    outDir: path.resolve(import.meta.dirname, "dist/public"),
    emptyOutDir: true,
    rollupOptions: {
      output: {
        manualChunks: {
          // Framework React
          "react-vendor": ["react", "react-dom", "react/jsx-runtime"],
          // Routing
          "router": ["wouter"],
          // Animations
          "animations": ["framer-motion"],
          // Particles
          "particles": ["@tsparticles/react", "@tsparticles/slim", "@tsparticles/engine"],
          // UI Components - Radix UI
          "radix-ui": [
            "@radix-ui/react-dialog",
            "@radix-ui/react-toast",
            "@radix-ui/react-slot",
            "@radix-ui/react-label"
          ],
          // Forms
          "forms": ["react-hook-form", "@hookform/resolvers", "zod"],
          // Data fetching
          "query": ["@tanstack/react-query"],
          // Icons
          "icons": ["lucide-react", "react-icons"],
          // Utilities
          "utils": ["clsx", "tailwind-merge", "class-variance-authority"]
        }
      }
    },
    chunkSizeWarningLimit: 600
  },
  server: {
    fs: {
      strict: true,
      deny: ["**/.*"]
    }
  }
});

// server/vite.ts
import { nanoid } from "nanoid";
var viteLogger = createLogger();
function serveStatic(app2) {
  const distPath = path2.resolve(import.meta.dirname, "..", "dist", "public");
  if (!fs.existsSync(distPath)) {
    throw new Error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`
    );
  }
  app2.use(express.static(distPath));
  app2.use("*", (_req, res) => {
    res.sendFile(path2.resolve(distPath, "index.html"));
  });
}

// api/index.ts
dotenv2.config({ path: resolve2(process.cwd(), ".env.local") });
dotenv2.config({ path: resolve2(process.cwd(), ".env") });
var app = express2();
app.use(express2.json({
  verify: (req, _res, buf) => {
    req.rawBody = buf;
  }
}));
app.use(express2.urlencoded({ extended: false }));
app.use((req, res, next) => {
  const start = Date.now();
  const path3 = req.path;
  let capturedJsonResponse = void 0;
  const originalResJson = res.json;
  res.json = function(bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };
  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path3.startsWith("/api")) {
      let logLine = `${req.method} ${path3} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }
      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "\u2026";
      }
      console.log(logLine);
    }
  });
  next();
});
var appInitialized = false;
var initPromise = null;
async function initializeApp() {
  if (appInitialized) return;
  if (initPromise) return initPromise;
  initPromise = (async () => {
    await registerRoutes(app);
    app.use((err, _req, res, _next) => {
      const status = err.status || err.statusCode || 500;
      const message = err.message || "Internal Server Error";
      res.status(status).json({ message });
      throw err;
    });
    if (process.env.NODE_ENV !== "development") {
      serveStatic(app);
    }
    appInitialized = true;
  })();
  return initPromise;
}
app.use(async (req, res, next) => {
  await initializeApp();
  next();
});
var index_default = app;
export {
  index_default as default
};

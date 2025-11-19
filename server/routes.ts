import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { emailService } from "./email";
import { contactSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Contact form submission
  app.post("/api/contact", async (req, res) => {
    try {
      // Validate request body
      const validatedData = contactSchema.parse(req.body);

      // Save contact to storage
      const savedContact = await storage.saveContact(validatedData);

      // Send emails (notification + confirmation)
      const emailResult = await emailService.sendContactEmail(validatedData);
      
      // Send confirmation email to user (fire and forget)
      emailService.sendConfirmationEmail(validatedData).catch(err => 
        console.error('Failed to send confirmation:', err)
      );

      res.json({
        success: true,
        message: "Votre message a été envoyé avec succès !",
        id: savedContact.id,
        ...(emailResult.previewUrl && { previewUrl: emailResult.previewUrl }),
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({
          success: false,
          message: "Données invalides",
          errors: error.errors,
        });
      }

      console.error("Error processing contact form:", error);
      res.status(500).json({
        success: false,
        message: "Une erreur est survenue. Veuillez réessayer.",
      });
    }
  });

  // Get all contacts (admin endpoint - could be protected)
  app.get("/api/contacts", async (req, res) => {
    try {
      const contacts = await storage.getAllContacts();
      res.json({
        success: true,
        contacts,
      });
    } catch (error) {
      console.error("Error fetching contacts:", error);
      res.status(500).json({
        success: false,
        message: "Une erreur est survenue",
      });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}

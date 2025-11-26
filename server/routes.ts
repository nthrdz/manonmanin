import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { emailService } from "./email";
import { contactSchema, newsletterSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Contact form submission
  app.post("/api/contact", async (req, res) => {
    console.log('========================================');
    console.log('📨 CONTACT FORM SUBMISSION RECEIVED');
    console.log('========================================');
    console.log('📧 Request body:', JSON.stringify(req.body, null, 2));
    console.log('📧 Timestamp:', new Date().toISOString());
    
    try {
      // Validate request body
      const validatedData = contactSchema.parse(req.body);
      console.log('✅ Data validated:', validatedData.nom, validatedData.email);

      // Save contact to storage
      const savedContact = await storage.saveContact(validatedData);

      // Send emails (notification + confirmation)
      const emailResult = await emailService.sendContactEmail(validatedData);
      
      // Log le résultat de l'envoi
      console.log('========================================');
      console.log('📧 EMAIL SENDING RESULT');
      console.log('========================================');
      if (!emailResult.success) {
        console.error('❌ Email NOT sent - contact saved but email failed');
        console.error('❌ This means the message was received but email notification failed');
        console.error('❌ Check SMTP configuration on Vercel');
      } else {
        console.log('✅ Email sent successfully to:', process.env.CONTACT_EMAIL || 'contact@manonmanin-mamamia.fr');
        console.log('✅ Email result:', JSON.stringify(emailResult, null, 2));
      }
      console.log('========================================');
      
      // Send confirmation email to user (fire and forget)
      emailService.sendConfirmationEmail(validatedData).catch(err => 
        console.error('Failed to send confirmation:', err)
      );

      res.json({
        success: true,
        message: "Votre message a été envoyé avec succès !",
        id: savedContact.id,
        emailSent: emailResult.success,
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

  // Newsletter subscription
  app.post("/api/newsletter", async (req, res) => {
    console.log('========================================');
    console.log('📧 NEWSLETTER SUBSCRIPTION RECEIVED');
    console.log('========================================');
    console.log('📧 Request body:', JSON.stringify(req.body, null, 2));
    console.log('📧 Timestamp:', new Date().toISOString());
    
    try {
      // Validate request body
      const validatedData = newsletterSchema.parse(req.body);
      console.log('✅ Data validated:', validatedData.email);

      // Save newsletter subscription to storage
      const savedNewsletter = await storage.saveNewsletter(validatedData);
      console.log('✅ Newsletter saved to storage:', savedNewsletter.id);

      // Send confirmation email (includes notification to admin)
      const emailResult = await emailService.sendNewsletterConfirmationEmail(validatedData);
      
      console.log('========================================');
      console.log('📧 NEWSLETTER EMAIL RESULT');
      console.log('========================================');
      if (!emailResult.success) {
        console.error('❌ Newsletter emails NOT sent');
        console.error('❌ Check Resend configuration on Vercel');
      } else {
        console.log('✅ Newsletter confirmation sent to:', validatedData.email);
        console.log('✅ Newsletter notification sent to admin');
      }
      console.log('========================================');

      res.json({
        success: true,
        message: "Merci de vous être inscrit à notre newsletter !",
        id: savedNewsletter.id,
        emailSent: emailResult.success,
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({
          success: false,
          message: "Données invalides",
          errors: error.errors,
        });
      }

      console.error("Error processing newsletter subscription:", error);
      res.status(500).json({
        success: false,
        message: "Une erreur est survenue. Veuillez réessayer.",
      });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}

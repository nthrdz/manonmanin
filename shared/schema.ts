import { z } from "zod";

// Contact Form Schema
export const contactSchema = z.object({
  nom: z.string().min(2, "Le nom doit contenir au moins 2 caractères"),
  email: z.string().email("Email invalide"),
  telephone: z.string().optional(),
  message: z.string().min(10, "Le message doit contenir au moins 10 caractères"),
  typeAccompagnement: z.enum(["post-partum", "grossesse", "autre"]).optional(),
});

export type ContactForm = z.infer<typeof contactSchema>;

// Testimonial Type
export interface Testimonial {
  id: string;
  nom: string;
  texte: string;
  avatar?: string;
}

// Service Type
export interface Service {
  id: string;
  titre: string;
  description: string;
  icone: string;
  details: string[];
}

import { type ContactForm, type NewsletterForm } from "@shared/schema";
import { randomUUID } from "crypto";

interface StoredContact extends ContactForm {
  id: string;
  createdAt: Date;
}

interface StoredNewsletter extends NewsletterForm {
  id: string;
  createdAt: Date;
}

export interface IStorage {
  saveContact(contact: ContactForm): Promise<StoredContact>;
  getAllContacts(): Promise<StoredContact[]>;
  getContact(id: string): Promise<StoredContact | undefined>;
  saveNewsletter(newsletter: NewsletterForm): Promise<StoredNewsletter>;
  getAllNewsletters(): Promise<StoredNewsletter[]>;
}

export class MemStorage implements IStorage {
  private contacts: Map<string, StoredContact>;
  private newsletters: Map<string, StoredNewsletter>;

  constructor() {
    this.contacts = new Map();
    this.newsletters = new Map();
  }

  async saveContact(contact: ContactForm): Promise<StoredContact> {
    const id = randomUUID();
    const storedContact: StoredContact = {
      ...contact,
      id,
      createdAt: new Date(),
    };
    this.contacts.set(id, storedContact);
    return storedContact;
  }

  async getAllContacts(): Promise<StoredContact[]> {
    return Array.from(this.contacts.values()).sort(
      (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
    );
  }

  async getContact(id: string): Promise<StoredContact | undefined> {
    return this.contacts.get(id);
  }

  async saveNewsletter(newsletter: NewsletterForm): Promise<StoredNewsletter> {
    // Vérifier si l'email existe déjà
    const existing = Array.from(this.newsletters.values()).find(
      (n) => n.email.toLowerCase() === newsletter.email.toLowerCase()
    );
    
    if (existing) {
      return existing;
    }

    const id = randomUUID();
    const storedNewsletter: StoredNewsletter = {
      ...newsletter,
      id,
      createdAt: new Date(),
    };
    this.newsletters.set(id, storedNewsletter);
    return storedNewsletter;
  }

  async getAllNewsletters(): Promise<StoredNewsletter[]> {
    return Array.from(this.newsletters.values()).sort(
      (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
    );
  }
}

export const storage = new MemStorage();

import { type ContactForm } from "@shared/schema";
import { randomUUID } from "crypto";

interface StoredContact extends ContactForm {
  id: string;
  createdAt: Date;
}

export interface IStorage {
  saveContact(contact: ContactForm): Promise<StoredContact>;
  getAllContacts(): Promise<StoredContact[]>;
  getContact(id: string): Promise<StoredContact | undefined>;
}

export class MemStorage implements IStorage {
  private contacts: Map<string, StoredContact>;

  constructor() {
    this.contacts = new Map();
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
}

export const storage = new MemStorage();

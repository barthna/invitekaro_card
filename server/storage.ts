import { templates, uploads, cards, type Template, type InsertTemplate, type Upload, type InsertUpload, type Card, type InsertCard, type CardData } from "@shared/schema";
import { defaultTemplates } from '@/lib/templates';

// Interface for storage operations
export interface IStorage {
  // Template operations
  getAllTemplates(): Promise<Template[]>;
  getTemplateById(id: number): Promise<Template | undefined>;
  createTemplate(template: InsertTemplate): Promise<Template>;
  
  // Upload operations
  getUploadById(id: number): Promise<Upload | undefined>;
  createUpload(upload: InsertUpload): Promise<Upload>;
  
  // Card operations
  getCardById(id: number): Promise<Card | undefined>;
  createCard(card: Partial<InsertCard>): Promise<Card>;
}

// In-memory storage implementation
export class MemStorage implements IStorage {
  private templates: Map<number, Template>;
  private uploads: Map<number, Upload>;
  private cards: Map<number, Card>;
  private templateIdCounter: number;
  private uploadIdCounter: number;
  private cardIdCounter: number;

  constructor() {
    this.templates = new Map();
    this.uploads = new Map();
    this.cards = new Map();
    this.templateIdCounter = 1;
    this.uploadIdCounter = 1;
    this.cardIdCounter = 1;
    
    // Initialize with default templates
    this.initializeDefaultTemplates();
  }

  private initializeDefaultTemplates() {
    defaultTemplates.forEach(template => {
      this.templates.set(template.id, {
        ...template,
        createdAt: new Date()
      });
      this.templateIdCounter = Math.max(this.templateIdCounter, template.id + 1);
    });
  }

  // Template methods
  async getAllTemplates(): Promise<Template[]> {
    return Array.from(this.templates.values());
  }

  async getTemplateById(id: number): Promise<Template | undefined> {
    return this.templates.get(id);
  }

  async createTemplate(template: InsertTemplate): Promise<Template> {
    const id = this.templateIdCounter++;
    const newTemplate: Template = {
      id,
      ...template,
      createdAt: new Date()
    };
    this.templates.set(id, newTemplate);
    return newTemplate;
  }

  // Upload methods
  async getUploadById(id: number): Promise<Upload | undefined> {
    return this.uploads.get(id);
  }

  async createUpload(upload: InsertUpload): Promise<Upload> {
    const id = this.uploadIdCounter++;
    const newUpload: Upload = {
      id,
      ...upload,
      createdAt: new Date()
    };
    this.uploads.set(id, newUpload);
    return newUpload;
  }

  // Card methods
  async getCardById(id: number): Promise<Card | undefined> {
    return this.cards.get(id);
  }

  async createCard(partialCard: Partial<InsertCard>): Promise<Card> {
    const id = this.cardIdCounter++;
    const data = partialCard.data || {};
    
    const newCard: Card = {
      id,
      templateId: partialCard.templateId !== null ? partialCard.templateId : undefined,
      customBackgroundId: partialCard.customBackgroundId !== null ? partialCard.customBackgroundId : undefined,
      data,
      createdAt: new Date()
    };
    
    this.cards.set(id, newCard);
    return newCard;
  }
}

// Export a singleton instance
export const storage = new MemStorage();

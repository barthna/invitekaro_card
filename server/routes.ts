import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import multer from "multer";
import path from "path";
import fs from "fs/promises";
import { cardDataSchema } from "@shared/schema";
import { generateTempFilename } from "./utils";

// Configure multer for handling file uploads
const upload = multer({
  storage: multer.diskStorage({
    destination: async (req, file, cb) => {
      const uploadDir = path.join(process.cwd(), "uploads");
      try {
        await fs.mkdir(uploadDir, { recursive: true }); // Ensure directory exists
        cb(null, uploadDir);
      } catch (error) {
        cb(error as Error, uploadDir);
      }
    },
    filename: (req, file, cb) => {
      const uniqueFileName = generateTempFilename() + path.extname(file.originalname);
      cb(null, uniqueFileName);
    },
  }),
  limits: {
    fileSize: 5 * 1024 * 1024, // Limit file size to 5MB
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = ["image/jpeg", "image/png", "image/gif"];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Invalid file type. Only JPG, PNG and GIF are allowed."));
    }
  },
});

export async function registerRoutes(app: Express): Promise<Server> {
  // -------------------
  // Templates API
  // -------------------

  // Get all templates
  app.get("/api/templates", async (req: Request, res: Response) => {
    try {
      const templates = await storage.getAllTemplates();
      res.json({ templates });
    } catch (error) {
      console.error("Error fetching templates:", error);
      res.status(500).json({ message: "Failed to fetch templates" });
    }
  });

  // Get single template by ID
  app.get("/api/templates/:id", async (req: Request, res: Response) => {
    try {
      const templateId = parseInt(req.params.id);
      const template = await storage.getTemplateById(templateId);

      if (!template) {
        return res.status(404).json({ message: "Template not found" });
      }

      res.json(template);
    } catch (error) {
      console.error(`Error fetching template ${req.params.id}:`, error);
      res.status(500).json({ message: "Failed to fetch template" });
    }
  });

  // -------------------
  // Image Upload API
  // -------------------

  app.post("/api/upload", upload.single("image"), async (req: Request, res: Response) => {
    try {
      if (!req.file) {
        return res.status(400).json({ message: "No file uploaded" });
      }

      const fileUrl = `/uploads/${req.file.filename}`;

      const uploadRecord = await storage.createUpload({
        filename: req.file.filename,
        originalName: req.file.originalname,
        mimeType: req.file.mimetype,
        url: fileUrl,
      });

      res.json({
        url: fileUrl,
        id: uploadRecord.id,
      });
    } catch (error) {
      console.error("Error uploading file:", error);
      res.status(500).json({ message: "Failed to upload file" });
    }
  });

  // -------------------
  // Save Generated Card
  // -------------------

  app.post("/api/save-card", async (req: Request, res: Response) => {
    try {
      const { templateId, customBackground, cardData } = req.body;

      // Validate incoming card data using Zod schema
      const validatedData = cardDataSchema.parse(cardData);

      const customBackgroundId = customBackground
        ? parseInt(customBackground.split("/").pop() || "0")
        : null;

      const savedCard = await storage.createCard({
        templateId: templateId || null,
        customBackgroundId,
        data: validatedData,
      });

      res.json({
        success: true,
        cardId: savedCard.id,
      });
    } catch (error) {
      console.error("Error saving card:", error);
      res.status(500).json({ message: "Failed to save card data" });
    }
  });

  // -------------------
  // Create and return HTTP server
  // -------------------

  const httpServer = createServer(app);
  return httpServer;
}

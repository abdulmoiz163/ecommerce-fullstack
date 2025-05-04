import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { z } from "zod";
import { insertProductSchema, insertCategorySchema, insertCartItemSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Product Routes
  app.get("/api/products", async (req: Request, res: Response) => {
    try {
      const products = await storage.getProducts();
      res.json(products);
    } catch (error) {
      console.error("Error fetching products:", error);
      res.status(500).json({ error: "Failed to fetch products" });
    }
  });

  app.get("/api/products/search", async (req: Request, res: Response) => {
    try {
      const query = req.query.q as string;
      if (!query) {
        return res.status(400).json({ error: "Search query is required" });
      }
      
      const products = await storage.searchProducts(query);
      res.json(products);
    } catch (error) {
      console.error("Error searching products:", error);
      res.status(500).json({ error: "Failed to search products" });
    }
  });

  app.get("/api/products/category/:category", async (req: Request, res: Response) => {
    try {
      const category = req.params.category;
      const products = await storage.getProductsByCategory(category);
      res.json(products);
    } catch (error) {
      console.error(`Error fetching products for category ${req.params.category}:`, error);
      res.status(500).json({ error: "Failed to fetch products by category" });
    }
  });

  app.get("/api/products/:id", async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ error: "Invalid product ID" });
      }
      
      const product = await storage.getProductById(id);
      if (!product) {
        return res.status(404).json({ error: "Product not found" });
      }
      
      res.json(product);
    } catch (error) {
      console.error(`Error fetching product with ID ${req.params.id}:`, error);
      res.status(500).json({ error: "Failed to fetch product" });
    }
  });

  app.post("/api/products", async (req: Request, res: Response) => {
    try {
      const validationResult = insertProductSchema.safeParse(req.body);
      if (!validationResult.success) {
        return res.status(400).json({ 
          error: "Invalid product data", 
          details: validationResult.error.errors 
        });
      }
      
      const product = await storage.createProduct(validationResult.data);
      res.status(201).json(product);
    } catch (error) {
      console.error("Error creating product:", error);
      res.status(500).json({ error: "Failed to create product" });
    }
  });

  app.put("/api/products/:id", async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ error: "Invalid product ID" });
      }
      
      // Partial validation - validate fields that are present
      const validationSchema = z.object({
        name: z.string().optional(),
        description: z.string().optional(),
        price: z.string().optional(),
        oldPrice: z.string().nullable().optional(),
        category: z.string().optional(),
        imageUrl: z.string().optional(),
        rating: z.string().optional(),
        numReviews: z.number().or(z.string().transform(val => parseInt(val))).optional(),
        stock: z.number().or(z.string().transform(val => parseInt(val))).optional(),
        isNew: z.boolean().optional(),
        isSale: z.boolean().optional()
      });
      
      const validationResult = validationSchema.safeParse(req.body);
      if (!validationResult.success) {
        return res.status(400).json({ 
          error: "Invalid product data", 
          details: validationResult.error.errors 
        });
      }
      
      const updatedProduct = await storage.updateProduct(id, validationResult.data);
      if (!updatedProduct) {
        return res.status(404).json({ error: "Product not found" });
      }
      
      res.json(updatedProduct);
    } catch (error) {
      console.error(`Error updating product with ID ${req.params.id}:`, error);
      res.status(500).json({ error: "Failed to update product" });
    }
  });

  app.delete("/api/products/:id", async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ error: "Invalid product ID" });
      }
      
      const success = await storage.deleteProduct(id);
      res.json({ success });
    } catch (error) {
      console.error(`Error deleting product with ID ${req.params.id}:`, error);
      res.status(500).json({ error: "Failed to delete product" });
    }
  });

  // Category Routes
  app.get("/api/categories", async (req: Request, res: Response) => {
    try {
      const categories = await storage.getCategories();
      res.json(categories);
    } catch (error) {
      console.error("Error fetching categories:", error);
      res.status(500).json({ error: "Failed to fetch categories" });
    }
  });

  app.get("/api/categories/:id", async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ error: "Invalid category ID" });
      }
      
      const category = await storage.getCategoryById(id);
      if (!category) {
        return res.status(404).json({ error: "Category not found" });
      }
      
      res.json(category);
    } catch (error) {
      console.error(`Error fetching category with ID ${req.params.id}:`, error);
      res.status(500).json({ error: "Failed to fetch category" });
    }
  });

  app.post("/api/categories", async (req: Request, res: Response) => {
    try {
      const validationResult = insertCategorySchema.safeParse(req.body);
      if (!validationResult.success) {
        return res.status(400).json({ 
          error: "Invalid category data", 
          details: validationResult.error.errors 
        });
      }
      
      const category = await storage.createCategory(validationResult.data);
      res.status(201).json(category);
    } catch (error) {
      console.error("Error creating category:", error);
      res.status(500).json({ error: "Failed to create category" });
    }
  });

  // Cart Routes
  app.get("/api/cart/:userId", async (req: Request, res: Response) => {
    try {
      const userId = parseInt(req.params.userId);
      if (isNaN(userId)) {
        return res.status(400).json({ error: "Invalid user ID" });
      }
      
      const cartItems = await storage.getCartItemWithProduct(userId);
      res.json(cartItems);
    } catch (error) {
      console.error(`Error fetching cart for user ${req.params.userId}:`, error);
      res.status(500).json({ error: "Failed to fetch cart" });
    }
  });

  app.post("/api/cart", async (req: Request, res: Response) => {
    try {
      const validationResult = insertCartItemSchema.safeParse(req.body);
      if (!validationResult.success) {
        return res.status(400).json({ 
          error: "Invalid cart item data", 
          details: validationResult.error.errors 
        });
      }
      
      const cartItem = await storage.addToCart(validationResult.data);
      res.status(201).json(cartItem);
    } catch (error) {
      console.error("Error adding item to cart:", error);
      res.status(500).json({ error: "Failed to add item to cart" });
    }
  });

  app.put("/api/cart/:id/quantity", async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ error: "Invalid cart item ID" });
      }
      
      const quantitySchema = z.object({
        quantity: z.number().or(z.string().transform(val => parseInt(val)))
      });
      
      const validationResult = quantitySchema.safeParse(req.body);
      if (!validationResult.success) {
        return res.status(400).json({ 
          error: "Invalid quantity", 
          details: validationResult.error.errors 
        });
      }
      
      const updatedItem = await storage.updateCartItemQuantity(
        id, 
        validationResult.data.quantity
      );
      
      if (!updatedItem && validationResult.data.quantity > 0) {
        return res.status(404).json({ error: "Cart item not found" });
      }
      
      res.json({ success: true, item: updatedItem });
    } catch (error) {
      console.error(`Error updating quantity for cart item ${req.params.id}:`, error);
      res.status(500).json({ error: "Failed to update cart item quantity" });
    }
  });

  app.delete("/api/cart/:id", async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ error: "Invalid cart item ID" });
      }
      
      const success = await storage.removeFromCart(id);
      res.json({ success });
    } catch (error) {
      console.error(`Error removing cart item ${req.params.id}:`, error);
      res.status(500).json({ error: "Failed to remove cart item" });
    }
  });

  app.delete("/api/cart/user/:userId", async (req: Request, res: Response) => {
    try {
      const userId = parseInt(req.params.userId);
      if (isNaN(userId)) {
        return res.status(400).json({ error: "Invalid user ID" });
      }
      
      const success = await storage.clearCart(userId);
      res.json({ success });
    } catch (error) {
      console.error(`Error clearing cart for user ${req.params.userId}:`, error);
      res.status(500).json({ error: "Failed to clear cart" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}

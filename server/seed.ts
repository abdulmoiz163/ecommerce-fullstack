import { db } from "./db";
import { products, categories } from "@shared/schema";
import { log } from "./vite";

const categoryData = [
  {
    name: "Electronics",
    imageUrl: "https://images.unsplash.com/photo-1526738549149-8e07eca6c147?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  {
    name: "Smartphones",
    imageUrl: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  {
    name: "Laptops & Computers",
    imageUrl: "https://images.unsplash.com/photo-1517315003714-a071486bd9ea?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  {
    name: "Clothing",
    imageUrl: "https://images.unsplash.com/photo-1523381294911-8d3cead13475?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  {
    name: "Accessories",
    imageUrl: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  }
];

const productData = [
  {
    name: "Smartphone X Pro",
    description: "Latest smartphone with advanced camera and long battery life.",
    price: "799.99",
    oldPrice: "899.99",
    category: "Smartphones",
    imageUrl: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    rating: "4.7",
    numReviews: 124,
    stock: 50,
    isNew: true,
    isSale: true
  },
  {
    name: "Laptop Pro 15",
    description: "Powerful laptop for professionals with high performance CPU and GPU.",
    price: "1299.99",
    oldPrice: null,
    category: "Laptops & Computers",
    imageUrl: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    rating: "4.8",
    numReviews: 89,
    stock: 25,
    isNew: true,
    isSale: false
  },
  {
    name: "Wireless Headphones",
    description: "Premium wireless headphones with noise cancellation technology.",
    price: "199.99",
    oldPrice: "249.99",
    category: "Electronics",
    imageUrl: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    rating: "4.5",
    numReviews: 215,
    stock: 75,
    isNew: false,
    isSale: true
  },
  {
    name: "Smart Watch Series 5",
    description: "Track your fitness and stay connected with this advanced smartwatch.",
    price: "349.99",
    oldPrice: null,
    category: "Electronics",
    imageUrl: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    rating: "4.3",
    numReviews: 156,
    stock: 30,
    isNew: false,
    isSale: false
  },
  {
    name: "Tablet Air",
    description: "Ultra-thin tablet perfect for entertainment and productivity.",
    price: "499.99",
    oldPrice: "599.99",
    category: "Electronics",
    imageUrl: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    rating: "4.6",
    numReviews: 102,
    stock: 40,
    isNew: false,
    isSale: true
  },
  {
    name: "Wireless Earbuds",
    description: "Compact wireless earbuds with premium sound quality.",
    price: "129.99",
    oldPrice: "149.99",
    category: "Electronics",
    imageUrl: "https://images.unsplash.com/photo-1600294037732-d3363075e03e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    rating: "4.4",
    numReviews: 178,
    stock: 60,
    isNew: false,
    isSale: true
  },
  {
    name: "Designer T-Shirt",
    description: "Premium cotton t-shirt with modern design.",
    price: "29.99",
    oldPrice: null,
    category: "Clothing",
    imageUrl: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    rating: "4.2",
    numReviews: 87,
    stock: 100,
    isNew: false,
    isSale: false
  },
  {
    name: "Slim Fit Jeans",
    description: "Comfortable and stylish slim fit jeans.",
    price: "49.99",
    oldPrice: "69.99",
    category: "Clothing",
    imageUrl: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    rating: "4.1",
    numReviews: 63,
    stock: 80,
    isNew: false,
    isSale: true
  },
  {
    name: "Designer Watch",
    description: "Elegant designer watch for any occasion.",
    price: "199.99",
    oldPrice: null,
    category: "Accessories",
    imageUrl: "https://images.unsplash.com/photo-1524805444758-089113d48a6d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    rating: "4.6",
    numReviews: 42,
    stock: 15,
    isNew: true,
    isSale: false
  },
  {
    name: "Leather Wallet",
    description: "Genuine leather wallet with multiple card slots.",
    price: "39.99",
    oldPrice: "59.99",
    category: "Accessories",
    imageUrl: "https://images.unsplash.com/photo-1517627043994-d62e618d82f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    rating: "4.3",
    numReviews: 51,
    stock: 35,
    isNew: false,
    isSale: true
  },
  {
    name: "Smartphone Budget Model",
    description: "Affordable smartphone with all essential features.",
    price: "299.99",
    oldPrice: null,
    category: "Smartphones",
    imageUrl: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    rating: "4.0",
    numReviews: 96,
    stock: 45,
    isNew: false,
    isSale: false
  },
  {
    name: "Gaming Laptop",
    description: "High-performance laptop for gaming enthusiasts.",
    price: "1499.99",
    oldPrice: "1699.99",
    category: "Laptops & Computers",
    imageUrl: "https://images.unsplash.com/photo-1603302576837-37561b2e2302?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    rating: "4.7",
    numReviews: 74,
    stock: 20,
    isNew: true,
    isSale: true
  }
];

export async function seedDatabase() {
  try {
    log("Seeding categories...");
    const existingCategories = await db.select().from(categories);
    
    if (existingCategories.length === 0) {
      await db.insert(categories).values(categoryData);
      log("Categories seeded successfully!");
    } else {
      log("Categories already exist, skipping seed.");
    }
    
    log("Seeding products...");
    const existingProducts = await db.select().from(products);
    
    if (existingProducts.length === 0) {
      await db.insert(products).values(productData);
      log("Products seeded successfully!");
    } else {
      log("Products already exist, skipping seed.");
    }
    
    log("Database seeding completed!");
  } catch (error) {
    console.error("Error seeding database:", error);
  }
}

// No need for a module check in ES modules
// We'll call this function from index.ts
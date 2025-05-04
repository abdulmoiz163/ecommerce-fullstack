import { Product, Category, CartProductItem } from "@shared/schema";
import { queryClient, apiRequest } from "./queryClient";

// Re-export these types for convenience
export type { Product, Category, CartProductItem };

// These static variables will be replaced with API calls
let _cachedProducts: Product[] = [];
let _cachedCategories: Category[] = [];

// Helper functions to fetch products from the API
export async function fetchProducts(): Promise<Product[]> {
  try {
    const response = await fetch('/api/products');
    if (!response.ok) {
      throw new Error('Failed to fetch products');
    }
    const data = await response.json();
    _cachedProducts = data;
    return data;
  } catch (error) {
    console.error('Error fetching products:', error);
    return _cachedProducts;
  }
}

export async function fetchCategories(): Promise<Category[]> {
  try {
    const response = await fetch('/api/categories');
    if (!response.ok) {
      throw new Error('Failed to fetch categories');
    }
    const data = await response.json();
    _cachedCategories = data;
    return data;
  } catch (error) {
    console.error('Error fetching categories:', error);
    return _cachedCategories;
  }
}

export async function fetchProductsByCategory(category: string): Promise<Product[]> {
  try {
    const response = await fetch(`/api/products/category/${category}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch products in category ${category}`);
    }
    return await response.json();
  } catch (error) {
    console.error(`Error fetching products in category ${category}:`, error);
    return _cachedProducts.filter(p => p.category === category);
  }
}

export async function fetchProductById(id: number): Promise<Product | undefined> {
  try {
    const response = await fetch(`/api/products/${id}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch product with id ${id}`);
    }
    return await response.json();
  } catch (error) {
    console.error(`Error fetching product with id ${id}:`, error);
    return _cachedProducts.find(p => p.id === id);
  }
}

export async function searchProducts(query: string): Promise<Product[]> {
  try {
    const response = await fetch(`/api/products/search?q=${encodeURIComponent(query)}`);
    if (!response.ok) {
      throw new Error('Failed to search products');
    }
    return await response.json();
  } catch (error) {
    console.error('Error searching products:', error);
    return _cachedProducts.filter(p => p.name.toLowerCase().includes(query.toLowerCase()));
  }
}

// Functions that help with accessing products and categories
export async function getFeaturedProducts(limit: number = 4): Promise<Product[]> {
  let products = _cachedProducts;
  if (products.length === 0) {
    products = await fetchProducts();
  }
  return products.filter(p => p.isNew || p.isSale).slice(0, limit);
}

export async function getClothingProducts(limit: number = 5): Promise<Product[]> {
  let products = _cachedProducts;
  if (products.length === 0) {
    products = await fetchProducts();
  }
  return products.filter(p => p.category === "Clothing").slice(0, limit);
}

export async function getElectronicsProducts(limit: number = 5): Promise<Product[]> {
  let products = _cachedProducts;
  if (products.length === 0) {
    products = await fetchProducts();
  }
  return products.filter(p => p.category === "Electronics").slice(0, limit);
}

export async function getAllProducts(): Promise<Product[]> {
  if (_cachedProducts.length === 0) {
    return await fetchProducts();
  }
  return _cachedProducts;
}

export async function getCategories(): Promise<Category[]> {
  if (_cachedCategories.length === 0) {
    return await fetchCategories();
  }
  return _cachedCategories;
}

export async function getProduct(id: number): Promise<Product | undefined> {
  const cachedProduct = _cachedProducts.find(p => p.id === id);
  if (cachedProduct) {
    return cachedProduct;
  }
  return await fetchProductById(id);
}

export async function getRelatedProducts(product: Product, limit: number = 4): Promise<Product[]> {
  let products = _cachedProducts;
  if (products.length === 0) {
    products = await fetchProducts();
  }
  
  return products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, limit);
}

// Exporting a function to get all products
export async function allProducts(): Promise<Product[]> {
  return await getAllProducts();
}

// We'll keep these static for backward compatibility, but we'll eventually replace all usages
export const allCategories = [
  "Electronics",
  "Smartphones",
  "Laptops & Computers",
  "Clothing",
  "Accessories",
];

export const productImages = {
  1: [
    "https://images.unsplash.com/photo-1585060544812-6b45742d762f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=800&q=80",
    "https://images.unsplash.com/photo-1605236453806-6ff36851218e?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=200&q=80",
    "https://images.unsplash.com/photo-1591337676887-a217a6970a8a?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=200&q=80",
    "https://images.unsplash.com/photo-1565775017923-2a732fecaf64?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=200&q=80",
  ]
};

import { Product, Category, CartProductItem } from "@shared/schema";

export const featuredProducts: Product[] = [
  {
    id: 1,
    name: "iPhone 13 Pro",
    description: "The iPhone 13 Pro is Apple's most advanced iPhone to date, featuring the powerful A15 Bionic chip, a stunning Super Retina XDR display with ProMotion technology, and an advanced camera system.",
    price: 999.99,
    category: "Electronics",
    imageUrl: "https://images.unsplash.com/photo-1585060544812-6b45742d762f?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=500&q=80",
    rating: 4.5,
    numReviews: 128,
    isNew: true,
    isSale: false,
  },
  {
    id: 2,
    name: "Samsung Galaxy S21",
    description: "The Samsung Galaxy S21 features a dynamic AMOLED display, powerful camera system, and 5G capability for ultra-fast performance.",
    price: 799.99,
    oldPrice: 899.99,
    category: "Electronics",
    imageUrl: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=500&q=80",
    rating: 4.0,
    numReviews: 94,
    isNew: false,
    isSale: true,
  },
  {
    id: 3,
    name: "MacBook Pro M2",
    description: "The MacBook Pro with M2 chip delivers incredible performance, long battery life, and a brilliant Retina display, perfect for professionals.",
    price: 1899.99,
    category: "Electronics",
    imageUrl: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=500&q=80",
    rating: 5.0,
    numReviews: 216,
    isNew: false,
    isSale: false,
  },
  {
    id: 4,
    name: "Noise Cancelling Headphones",
    description: "Experience premium sound quality with these wireless headphones featuring active noise cancellation technology.",
    price: 249.99,
    category: "Electronics",
    imageUrl: "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=500&q=80",
    rating: 3.5,
    numReviews: 73,
    isNew: false,
    isSale: false,
  },
];

export const clothingProducts: Product[] = [
  {
    id: 5,
    name: "Classic Oxford Shirt",
    description: "A timeless oxford shirt made from premium cotton for comfort and durability.",
    price: 49.99,
    category: "Clothing",
    imageUrl: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400&q=80",
    rating: 4.0,
    numReviews: 42,
    isNew: false,
    isSale: false,
  },
  {
    id: 6,
    name: "Denim Jacket",
    description: "A classic denim jacket that never goes out of style, perfect for any casual outfit.",
    price: 89.99,
    category: "Clothing",
    imageUrl: "https://images.unsplash.com/photo-1552902865-b72c031ac5ea?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400&q=80",
    rating: 4.2,
    numReviews: 36,
    isNew: false,
    isSale: false,
  },
  {
    id: 7,
    name: "Running Sneakers",
    description: "Lightweight and comfortable running shoes with advanced cushioning technology.",
    price: 129.99,
    category: "Footwear",
    imageUrl: "https://images.unsplash.com/photo-1591369822096-ffd140ec948f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400&q=80",
    rating: 4.7,
    numReviews: 89,
    isNew: true,
    isSale: false,
  },
  {
    id: 8,
    name: "Classic Watch",
    description: "A timeless wristwatch with premium materials and precise movement.",
    price: 199.99,
    category: "Accessories",
    imageUrl: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400&q=80",
    rating: 4.5,
    numReviews: 52,
    isNew: false,
    isSale: false,
  },
  {
    id: 9,
    name: "Stylish Sunglasses",
    description: "Protect your eyes in style with these fashionable sunglasses with UV protection.",
    price: 79.99,
    category: "Accessories",
    imageUrl: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400&q=80",
    rating: 4.0,
    numReviews: 28,
    isNew: false,
    isSale: false,
  },
];

export const moreElectronics: Product[] = [
  {
    id: 10,
    name: "Smart Watch Series 7",
    description: "A powerful smartwatch with health tracking features and seamless connectivity.",
    price: 399.99,
    category: "Electronics",
    imageUrl: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=500&q=80",
    rating: 4.0,
    numReviews: 52,
    isNew: false,
    isSale: false,
  },
  {
    id: 11,
    name: "Portable Bluetooth Speaker",
    description: "A powerful portable speaker with deep bass and long battery life.",
    price: 129.99,
    oldPrice: 159.99,
    category: "Electronics",
    imageUrl: "https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=500&q=80",
    rating: 4.5,
    numReviews: 87,
    isNew: false,
    isSale: true,
  },
];

export const allProducts: Product[] = [
  ...featuredProducts,
  ...clothingProducts,
  ...moreElectronics,
];

export const featuredCategories: Category[] = [
  {
    id: 1,
    name: "Smartphones",
    imageUrl: "https://images.unsplash.com/photo-1546027658-7aa750153465?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300&q=80",
  },
  {
    id: 2,
    name: "Laptops",
    imageUrl: "https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300&q=80",
  },
  {
    id: 3,
    name: "Clothing",
    imageUrl: "https://images.unsplash.com/photo-1617817546276-1b6e2ec189c0?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300&q=80",
  },
  {
    id: 4,
    name: "Accessories",
    imageUrl: "https://images.unsplash.com/photo-1541643600914-78b084683601?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300&q=80",
  },
];

export const allCategories = [
  "Electronics",
  "Smartphones",
  "Computers",
  "Clothing",
  "Accessories",
  "Home & Kitchen",
  "Sports",
  "Beauty",
  "Toys",
];

export const productImages = {
  1: [
    "https://images.unsplash.com/photo-1585060544812-6b45742d762f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=800&q=80",
    "https://images.unsplash.com/photo-1605236453806-6ff36851218e?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=200&q=80",
    "https://images.unsplash.com/photo-1591337676887-a217a6970a8a?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=200&q=80",
    "https://images.unsplash.com/photo-1565775017923-2a732fecaf64?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=200&q=80",
  ]
};

export const getProduct = (id: number): Product | undefined => {
  return allProducts.find(product => product.id === id);
};

export const getRelatedProducts = (product: Product, limit: number = 4): Product[] => {
  return allProducts
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, limit);
};

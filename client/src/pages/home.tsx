import React, { useState, useEffect } from "react";
import { useLocation } from "wouter";
import ProductGrid from "@/components/ui/product-grid";
import ProductCard from "@/components/ui/product-card";
import CategoryCard from "@/components/ui/category-card";
import { 
  getFeaturedProducts, 
  getClothingProducts, 
  getCategories,
  Product,
  Category
} from "@/lib/data";
import { useQuery } from "@tanstack/react-query";

const Home: React.FC = () => {
  const [_, setLocation] = useLocation();
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [clothingProducts, setClothingProducts] = useState<Product[]>([]);
  const [featuredCategories, setFeaturedCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true);
        const [featured, clothing, categories] = await Promise.all([
          getFeaturedProducts(4),
          getClothingProducts(5),
          getCategories()
        ]);
        
        setFeaturedProducts(featured);
        setClothingProducts(clothing);
        setFeaturedCategories(categories.slice(0, 4));
      } catch (error) {
        console.error("Error loading home page data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  const handleShopNow = () => {
    setLocation("/products");
    window.scrollTo(0, 0);
  };

  return (
    <>
      {/* Hero Banner */}
      <div className="bg-primary text-white py-12 md:py-24">
        <div className="container mx-auto px-4">
          <div className="md:flex md:justify-between md:items-center">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <h1 className="text-3xl md:text-4xl font-bold mb-4">Summer Sale Starts Now</h1>
              <p className="text-lg mb-6">Up to 50% off on electronics, fashion, and more. Limited time only!</p>
              <button 
                onClick={handleShopNow}
                className="bg-white text-primary px-6 py-3 rounded-md font-medium hover:bg-gray-100 transition-colors"
              >
                Shop Now
              </button>
            </div>
            <div className="md:w-1/2 flex justify-center">
              <img 
                src="https://images.unsplash.com/photo-1546868871-7041f2a55e12?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                alt="Electronics on display" 
                className="rounded-lg shadow-lg max-w-full h-auto" 
              />
            </div>
          </div>
        </div>
      </div>

      {/* Featured Categories */}
      <div className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-8">Featured Categories</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {featuredCategories.map(category => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </div>
        </div>
      </div>

      {/* Featured Products */}
      <div className="py-12 bg-neutral-100">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold">Featured Products</h2>
            <button 
              onClick={() => setLocation("/products")}
              className="text-primary hover:underline"
            >
              View All
            </button>
          </div>
          
          <ProductGrid products={featuredProducts} />
        </div>
      </div>

      {/* Clothing Section */}
      <div className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold">Clothing Collection</h2>
            <button 
              onClick={() => setLocation("/products")}
              className="text-primary hover:underline"
            >
              View All
            </button>
          </div>
          
          <div className="flex overflow-x-auto space-x-4 pb-4 -mx-4 px-4">
            {clothingProducts.map(product => (
              <div key={product.id} className="min-w-[200px]">
                <ProductCard product={product} size="sm" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Newsletter */}
      <div className="py-12 bg-neutral-100">
        <div className="container mx-auto px-4 max-w-xl text-center">
          <h2 className="text-2xl font-bold mb-4">Sign up for our newsletter</h2>
          <p className="mb-6 text-text-secondary">Get the latest updates, deals and exclusive offers straight to your inbox.</p>
          <form className="flex">
            <input 
              type="email" 
              placeholder="Your email address" 
              className="flex-grow px-4 py-3 border border-neutral-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
            <button 
              type="submit"
              className="bg-primary text-white px-6 py-3 rounded-r-md hover:bg-blue-700 transition-colors"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Home;

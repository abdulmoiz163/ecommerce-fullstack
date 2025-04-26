import React, { useState } from "react";
import { useLocation } from "wouter";
import { useCart } from "@/providers/cart-provider";
import MobileMenu from "./mobile-menu";
import CategoriesBar from "./categories-bar";

const Header: React.FC = () => {
  const [location, setLocation] = useLocation();
  const { cartOpen, setCartOpen, getTotalItems } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const navigateTo = (path: string) => {
    setLocation(path);
    setMobileMenuOpen(false);
    setCartOpen(false);
    window.scrollTo(0, 0);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigateTo("/products");
    }
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center">
            <button onClick={() => navigateTo("/")} className="text-primary font-bold text-xl flex items-center">
              <i className="fas fa-shopping-bag mr-2"></i>
              TechShop
            </button>
          </div>

          {/* Search Bar (Desktop) */}
          <div className="hidden md:flex flex-1 max-w-xl mx-4">
            <form className="relative w-full" onSubmit={handleSearchSubmit}>
              <input 
                type="text" 
                placeholder="Search for products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 border border-neutral-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
              <button 
                type="submit"
                className="absolute right-0 top-0 px-4 py-2 bg-primary text-white rounded-r-md h-full"
              >
                <i className="fas fa-search"></i>
              </button>
            </form>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center space-x-6">
            <button 
              onClick={() => navigateTo("/products")} 
              className={`hover:text-primary transition-colors ${location === "/products" ? "text-primary" : ""}`}
            >
              Products
            </button>
            <button onClick={() => navigateTo("/products")} className="hover:text-primary transition-colors">
              Categories
            </button>
            <button onClick={() => navigateTo("/products")} className="hover:text-primary transition-colors">
              Deals
            </button>
            <button 
              onClick={() => setCartOpen(!cartOpen)} 
              className="relative"
              aria-label="Shopping Cart"
            >
              <i className="fas fa-shopping-cart text-xl"></i>
              {getTotalItems() > 0 && (
                <span className="absolute -top-2 -right-2 bg-accent text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {getTotalItems()}
                </span>
              )}
            </button>
            <button className="bg-primary text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors">
              Sign In
            </button>
          </nav>

          {/* Mobile Menu Buttons */}
          <div className="flex md:hidden items-center space-x-4">
            <button 
              onClick={() => setCartOpen(!cartOpen)} 
              className="relative"
              aria-label="Shopping Cart"
            >
              <i className="fas fa-shopping-cart text-xl"></i>
              {getTotalItems() > 0 && (
                <span className="absolute -top-2 -right-2 bg-accent text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {getTotalItems()}
                </span>
              )}
            </button>
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Menu"
            >
              <i className="fas fa-bars text-xl"></i>
            </button>
          </div>
        </div>
        
        {/* Search Bar (Mobile) */}
        <div className="mt-3 md:hidden">
          <form className="relative w-full" onSubmit={handleSearchSubmit}>
            <input 
              type="text" 
              placeholder="Search for products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2 border border-neutral-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
            <button 
              type="submit"
              className="absolute right-0 top-0 px-4 py-2 bg-primary text-white rounded-r-md h-full"
            >
              <i className="fas fa-search"></i>
            </button>
          </form>
        </div>
      </div>
      
      {/* Mobile Menu */}
      <MobileMenu isOpen={mobileMenuOpen} navigateTo={navigateTo} />
      
      {/* Categories Bar */}
      <CategoriesBar />
    </header>
  );
};

export default Header;

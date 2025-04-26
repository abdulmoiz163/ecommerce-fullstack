import React, { useState } from "react";
import ProductGrid from "@/components/ui/product-grid";
import { allProducts } from "@/lib/data";

const Products: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("Electronics");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 2000]);
  const [sortOption, setSortOption] = useState<string>("Featured");
  const [showFilters, setShowFilters] = useState<boolean>(false);

  // Filter products by selected category
  const filteredProducts = allProducts.filter(
    product => product.category === selectedCategory || selectedCategory === "All Products"
  );

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
  };

  const handlePriceRangeChange = (min: number, max: number) => {
    setPriceRange([min, max]);
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortOption(e.target.value);
  };

  const handleToggleFilters = () => {
    setShowFilters(!showFilters);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row">
        {/* Filters Sidebar */}
        <div className={`md:w-1/4 pr-0 md:pr-8 ${showFilters ? 'block' : 'hidden md:block'}`}>
          <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
            <h3 className="font-semibold mb-3">Categories</h3>
            <ul className="space-y-2">
              <li className="flex items-center">
                <input 
                  type="checkbox" 
                  id="cat-all" 
                  className="mr-2"
                  checked={selectedCategory === "All Products"}
                  onChange={() => handleCategoryChange("All Products")}
                />
                <label htmlFor="cat-all">All Products</label>
              </li>
              <li className="flex items-center">
                <input 
                  type="checkbox" 
                  id="cat-electronics" 
                  className="mr-2"
                  checked={selectedCategory === "Electronics"}
                  onChange={() => handleCategoryChange("Electronics")}
                />
                <label htmlFor="cat-electronics">Electronics</label>
              </li>
              <li className="flex items-center">
                <input 
                  type="checkbox" 
                  id="cat-smartphones" 
                  className="mr-2"
                  checked={selectedCategory === "Smartphones"}
                  onChange={() => handleCategoryChange("Smartphones")}
                />
                <label htmlFor="cat-smartphones">Smartphones</label>
              </li>
              <li className="flex items-center">
                <input 
                  type="checkbox" 
                  id="cat-laptops" 
                  className="mr-2"
                  checked={selectedCategory === "Laptops & Computers"}
                  onChange={() => handleCategoryChange("Laptops & Computers")}
                />
                <label htmlFor="cat-laptops">Laptops & Computers</label>
              </li>
              <li className="flex items-center">
                <input 
                  type="checkbox" 
                  id="cat-clothing" 
                  className="mr-2"
                  checked={selectedCategory === "Clothing"}
                  onChange={() => handleCategoryChange("Clothing")}
                />
                <label htmlFor="cat-clothing">Clothing</label>
              </li>
              <li className="flex items-center">
                <input 
                  type="checkbox" 
                  id="cat-accessories" 
                  className="mr-2"
                  checked={selectedCategory === "Accessories"}
                  onChange={() => handleCategoryChange("Accessories")}
                />
                <label htmlFor="cat-accessories">Accessories</label>
              </li>
            </ul>
          </div>
          
          <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
            <h3 className="font-semibold mb-3">Price Range</h3>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span>${priceRange[0]}</span>
                <span>${priceRange[1]}</span>
              </div>
              <input 
                type="range" 
                min="0" 
                max="2000" 
                value={priceRange[1]}
                onChange={(e) => handlePriceRangeChange(priceRange[0], parseInt(e.target.value))}
                className="w-full"
              />
              <div className="flex space-x-2">
                <input 
                  type="number" 
                  placeholder="Min" 
                  value={priceRange[0]}
                  onChange={(e) => handlePriceRangeChange(parseInt(e.target.value), priceRange[1])}
                  className="w-1/2 px-2 py-1 border border-neutral-300 rounded"
                />
                <input 
                  type="number" 
                  placeholder="Max" 
                  value={priceRange[1]}
                  onChange={(e) => handlePriceRangeChange(priceRange[0], parseInt(e.target.value))}
                  className="w-1/2 px-2 py-1 border border-neutral-300 rounded"
                />
              </div>
            </div>
          </div>
          
          <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
            <h3 className="font-semibold mb-3">Brands</h3>
            <ul className="space-y-2">
              <li className="flex items-center">
                <input type="checkbox" id="brand-apple" className="mr-2" />
                <label htmlFor="brand-apple">Apple</label>
              </li>
              <li className="flex items-center">
                <input type="checkbox" id="brand-samsung" className="mr-2" />
                <label htmlFor="brand-samsung">Samsung</label>
              </li>
              <li className="flex items-center">
                <input type="checkbox" id="brand-sony" className="mr-2" />
                <label htmlFor="brand-sony">Sony</label>
              </li>
              <li className="flex items-center">
                <input type="checkbox" id="brand-lg" className="mr-2" />
                <label htmlFor="brand-lg">LG</label>
              </li>
              <li className="flex items-center">
                <input type="checkbox" id="brand-lenovo" className="mr-2" />
                <label htmlFor="brand-lenovo">Lenovo</label>
              </li>
            </ul>
          </div>
          
          <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
            <h3 className="font-semibold mb-3">Customer Ratings</h3>
            <ul className="space-y-2">
              <li className="flex items-center">
                <input type="radio" name="rating" id="rating-4" className="mr-2" />
                <label htmlFor="rating-4" className="flex items-center">
                  <div className="flex text-yellow-400">
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="far fa-star"></i>
                  </div>
                  <span className="ml-1">& Up</span>
                </label>
              </li>
              <li className="flex items-center">
                <input type="radio" name="rating" id="rating-3" className="mr-2" />
                <label htmlFor="rating-3" className="flex items-center">
                  <div className="flex text-yellow-400">
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="far fa-star"></i>
                    <i className="far fa-star"></i>
                  </div>
                  <span className="ml-1">& Up</span>
                </label>
              </li>
              <li className="flex items-center">
                <input type="radio" name="rating" id="rating-2" className="mr-2" />
                <label htmlFor="rating-2" className="flex items-center">
                  <div className="flex text-yellow-400">
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="far fa-star"></i>
                    <i className="far fa-star"></i>
                    <i className="far fa-star"></i>
                  </div>
                  <span className="ml-1">& Up</span>
                </label>
              </li>
            </ul>
          </div>
          
          <div className="hidden md:block">
            <button className="w-full bg-primary text-white py-2 rounded-md hover:bg-blue-700 mb-2">
              Apply Filters
            </button>
            <button className="w-full bg-neutral-100 text-text-primary py-2 rounded-md hover:bg-neutral-200">
              Clear All
            </button>
          </div>
        </div>
        
        {/* Products Grid */}
        <div className="md:w-3/4 mt-6 md:mt-0">
          {/* Sort & Filter Controls */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
            <div className="text-lg font-medium mb-2 sm:mb-0">
              <span>{selectedCategory}</span>
              <span className="text-text-secondary"> ({filteredProducts.length} products)</span>
            </div>
            <div className="flex space-x-2">
              <select 
                className="px-3 py-2 border border-neutral-300 rounded-md"
                value={sortOption}
                onChange={handleSortChange}
              >
                <option>Sort by: Featured</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
                <option>Customer Rating</option>
                <option>Newest First</option>
              </select>
              <button 
                className="md:hidden bg-primary text-white px-3 py-2 rounded-md"
                onClick={handleToggleFilters}
              >
                <i className="fas fa-filter"></i>
              </button>
            </div>
          </div>
          
          {/* Product Grid */}
          <ProductGrid products={filteredProducts} />
          
          {/* Pagination */}
          <div className="mt-8 flex justify-center">
            <nav className="inline-flex rounded-md shadow">
              <a href="#" className="px-3 py-2 rounded-l-md border border-neutral-300 bg-white text-sm font-medium text-text-primary hover:bg-neutral-100">
                Previous
              </a>
              <a href="#" className="px-3 py-2 border-t border-b border-neutral-300 bg-primary text-sm font-medium text-white">
                1
              </a>
              <a href="#" className="px-3 py-2 border-t border-b border-neutral-300 bg-white text-sm font-medium text-text-primary hover:bg-neutral-100">
                2
              </a>
              <a href="#" className="px-3 py-2 border-t border-b border-neutral-300 bg-white text-sm font-medium text-text-primary hover:bg-neutral-100">
                3
              </a>
              <a href="#" className="px-3 py-2 rounded-r-md border border-neutral-300 bg-white text-sm font-medium text-text-primary hover:bg-neutral-100">
                Next
              </a>
            </nav>
          </div>
          
          {/* Mobile Filter Button */}
          <div className="md:hidden fixed bottom-4 inset-x-0 flex justify-center">
            <button 
              className="bg-primary text-white px-6 py-3 rounded-full shadow-lg"
              onClick={handleToggleFilters}
            >
              <i className="fas fa-filter mr-2"></i> Filter Products
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;

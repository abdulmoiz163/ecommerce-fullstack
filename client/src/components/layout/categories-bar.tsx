import React from "react";
import { useLocation } from "wouter";
import { allCategories } from "@/lib/data";

const CategoriesBar: React.FC = () => {
  const [_, setLocation] = useLocation();

  const handleCategoryClick = () => {
    setLocation("/products");
    window.scrollTo(0, 0);
  };

  return (
    <div className="bg-neutral-100 border-y border-neutral-200">
      <div className="container mx-auto px-4">
        <div className="flex overflow-x-auto py-2 space-x-6 no-scrollbar">
          {allCategories.map((category, index) => (
            <button 
              key={index}
              onClick={handleCategoryClick}
              className="whitespace-nowrap text-sm hover:text-primary transition-colors flex-shrink-0"
            >
              {category}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoriesBar;

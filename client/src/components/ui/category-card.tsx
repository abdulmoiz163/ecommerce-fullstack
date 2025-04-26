import React from "react";
import { Category } from "@shared/schema";
import { useLocation } from "wouter";

interface CategoryCardProps {
  category: Category;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ category }) => {
  const [_, setLocation] = useLocation();

  const handleClick = () => {
    setLocation("/products");
  };

  return (
    <div 
      className="bg-neutral-100 rounded-lg p-6 text-center hover:shadow-md transition-shadow cursor-pointer"
      onClick={handleClick}
    >
      <img 
        src={category.imageUrl} 
        alt={category.name} 
        className="mx-auto mb-4 h-32 object-contain" 
      />
      <h3 className="font-medium">{category.name}</h3>
    </div>
  );
};

export default CategoryCard;

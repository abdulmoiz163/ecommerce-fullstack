import React from "react";
import { Product } from "@shared/schema";
import StarRating from "./star-rating";
import { useLocation } from "wouter";
import { useCart } from "@/providers/cart-provider";

interface ProductCardProps {
  product: Product;
  size?: "sm" | "md" | "lg";
}

const ProductCard: React.FC<ProductCardProps> = ({ product, size = "md" }) => {
  const { addToCart } = useCart();
  const [_, setLocation] = useLocation();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product, 1);
  };

  const goToProductDetail = () => {
    setLocation(`/product/${product.id}`);
    window.scrollTo(0, 0);
  };

  const isSmall = size === "sm";

  return (
    <div 
      className={`bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow ${isSmall ? "p-2" : ""}`}
      onClick={goToProductDetail}
    >
      <div className={`relative ${isSmall ? "" : ""}`}>
        <img 
          src={product.imageUrl} 
          alt={product.name} 
          className={`w-full ${isSmall ? "h-48 object-cover rounded-lg mb-2" : "h-48 object-contain pt-4"}`} 
        />
        {product.isNew && (
          <span className="absolute top-2 right-2 bg-accent text-white text-xs px-2 py-1 rounded">New</span>
        )}
        {product.isSale && (
          <span className="absolute top-2 right-2 bg-success text-white text-xs px-2 py-1 rounded">Sale</span>
        )}
      </div>
      <div className={isSmall ? "p-2" : "p-4"}>
        <h3 className={`font-medium ${isSmall ? "text-sm mb-1" : "mb-1"}`}>{product.name}</h3>
        {!isSmall && (
          <div className="flex items-center mb-2">
            <StarRating rating={product.rating} reviews={product.numReviews} size={size} />
          </div>
        )}
        <div className="flex justify-between items-center">
          <div>
            <span className={`font-bold text-error ${isSmall ? "text-sm" : ""}`}>${product.price.toFixed(2)}</span>
            {product.oldPrice && (
              <span className="text-text-secondary text-sm line-through ml-2">${product.oldPrice.toFixed(2)}</span>
            )}
          </div>
          <button 
            onClick={handleAddToCart}
            className={`bg-primary text-white hover:bg-blue-700 rounded-md ${isSmall ? "p-1 text-xs" : "px-3 py-1 text-sm"}`}
          >
            {isSmall ? "Add" : "Add to Cart"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;

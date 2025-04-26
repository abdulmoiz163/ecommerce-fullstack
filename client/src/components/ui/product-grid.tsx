import React from "react";
import { Product } from "@shared/schema";
import ProductCard from "./product-card";

interface ProductGridProps {
  products: Product[];
  size?: "sm" | "md" | "lg";
}

const ProductGrid: React.FC<ProductGridProps> = ({ products, size = "md" }) => {
  return (
    <div className="product-grid">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} size={size} />
      ))}
    </div>
  );
};

export default ProductGrid;

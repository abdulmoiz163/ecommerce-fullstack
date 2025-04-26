import React from "react";

interface MobileMenuProps {
  isOpen: boolean;
  navigateTo: (path: string) => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, navigateTo }) => {
  if (!isOpen) return null;

  return (
    <div className="md:hidden bg-white border-t border-neutral-200">
      <div className="container mx-auto py-3 px-4">
        <nav className="flex flex-col space-y-3">
          <button 
            onClick={() => navigateTo("/products")} 
            className="py-2 hover:text-primary transition-colors"
          >
            Products
          </button>
          <button 
            onClick={() => navigateTo("/products")} 
            className="py-2 hover:text-primary transition-colors"
          >
            Categories
          </button>
          <button 
            onClick={() => navigateTo("/products")} 
            className="py-2 hover:text-primary transition-colors"
          >
            Deals
          </button>
          <button className="bg-primary text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors">
            Sign In
          </button>
        </nav>
      </div>
    </div>
  );
};

export default MobileMenu;

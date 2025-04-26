import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-neutral-800 text-white mt-12">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">TechShop</h3>
            <p className="text-neutral-400 mb-4">Your one-stop shop for the latest in technology, fashion, and lifestyle products.</p>
            <div className="flex space-x-4">
              <a href="#" className="text-neutral-400 hover:text-white transition-colors">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="text-neutral-400 hover:text-white transition-colors">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className="text-neutral-400 hover:text-white transition-colors">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="#" className="text-neutral-400 hover:text-white transition-colors">
                <i className="fab fa-youtube"></i>
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Shop</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-neutral-400 hover:text-white transition-colors">Electronics</a></li>
              <li><a href="#" className="text-neutral-400 hover:text-white transition-colors">Clothing</a></li>
              <li><a href="#" className="text-neutral-400 hover:text-white transition-colors">Accessories</a></li>
              <li><a href="#" className="text-neutral-400 hover:text-white transition-colors">New Arrivals</a></li>
              <li><a href="#" className="text-neutral-400 hover:text-white transition-colors">Sale</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Support</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-neutral-400 hover:text-white transition-colors">Help Center</a></li>
              <li><a href="#" className="text-neutral-400 hover:text-white transition-colors">Order Status</a></li>
              <li><a href="#" className="text-neutral-400 hover:text-white transition-colors">Returns & Exchanges</a></li>
              <li><a href="#" className="text-neutral-400 hover:text-white transition-colors">Contact Us</a></li>
              <li><a href="#" className="text-neutral-400 hover:text-white transition-colors">Warranty</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Join Our Newsletter</h3>
            <p className="text-neutral-400 mb-4">Stay updated on new arrivals, special offers, and promotions.</p>
            <div className="flex">
              <input 
                type="email" 
                placeholder="Your email" 
                className="px-4 py-2 bg-neutral-700 text-white rounded-l-md focus:outline-none flex-grow"
              />
              <button className="bg-primary text-white px-4 py-2 rounded-r-md hover:bg-blue-700 transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>
        
        <div className="border-t border-neutral-700 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="text-neutral-400 mb-4 md:mb-0">
            © 2023 TechShop. All rights reserved.
          </div>
          <div className="flex space-x-4">
            <a href="#" className="text-neutral-400 hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="text-neutral-400 hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="text-neutral-400 hover:text-white transition-colors">Accessibility</a>
            <a href="#" className="text-neutral-400 hover:text-white transition-colors">Sitemap</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

import React, { useState } from "react";
import { useLocation } from "wouter";
import { useCart } from "@/providers/cart-provider";
import { Button } from "@/components/ui/button";

const Checkout: React.FC = () => {
  const [_, setLocation] = useLocation();
  const { cartItems, removeFromCart, updateQuantity, getTotalPrice, getTotalItems } = useCart();
  const [couponCode, setCouponCode] = useState("");

  const handleContinueShopping = () => {
    setLocation("/products");
  };

  const taxAmount = (parseFloat(getTotalPrice()) * 0.1).toFixed(2);
  const totalAmount = (parseFloat(getTotalPrice()) + parseFloat(taxAmount)).toFixed(2);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    // This would typically validate the coupon code with the backend
    if (couponCode) {
      alert(`Coupon ${couponCode} applied!`);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-8">Shopping Cart</h1>
      
      <div className="lg:flex lg:space-x-8">
        {/* Cart Items */}
        <div className="lg:w-2/3">
          <div className="bg-white rounded-lg shadow-sm p-4 md:p-6 mb-6">
            {cartItems.length > 0 ? (
              <div>
                {/* Items Table Header (Desktop) */}
                <div className="hidden md:grid md:grid-cols-12 text-text-secondary text-sm font-medium pb-4 border-b">
                  <div className="md:col-span-6">Product</div>
                  <div className="md:col-span-2 text-center">Price</div>
                  <div className="md:col-span-2 text-center">Quantity</div>
                  <div className="md:col-span-2 text-right">Total</div>
                </div>
                
                {/* Cart Items */}
                <div className="divide-y">
                  {cartItems.map(item => (
                    <div key={item.id} className="py-4 md:py-6 md:grid md:grid-cols-12 md:gap-4 md:items-center">
                      {/* Product */}
                      <div className="md:col-span-6 flex">
                        <div className="w-20 h-20 md:w-24 md:h-24 flex-shrink-0 bg-neutral-100 rounded-md overflow-hidden">
                          <img src={item.imageUrl} alt={item.name} className="w-full h-full object-contain p-2" />
                        </div>
                        <div className="ml-4 flex flex-col justify-center">
                          <h3 className="text-base font-medium">{item.name}</h3>
                          <p className="text-sm text-text-secondary mt-1">{item.category}</p>
                          <div className="md:hidden mt-2">
                            <span className="text-sm text-text-secondary">Price: </span>
                            <span className="font-medium text-error">${item.price.toFixed(2)}</span>
                          </div>
                        </div>
                      </div>
                      
                      {/* Price (Desktop) */}
                      <div className="hidden md:block md:col-span-2 text-center">
                        <span className="font-medium text-error">${item.price.toFixed(2)}</span>
                      </div>
                      
                      {/* Quantity */}
                      <div className="md:col-span-2 flex md:justify-center mt-4 md:mt-0">
                        <div className="flex items-center">
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="w-8 h-8 flex items-center justify-center border border-neutral-300 rounded-l-md bg-neutral-100"
                          >
                            <i className="fas fa-minus"></i>
                          </button>
                          <input 
                            type="number"
                            value={item.quantity}
                            min="1"
                            onChange={(e) => updateQuantity(item.id, parseInt(e.target.value) || 1)}
                            className="w-12 h-8 border-y border-neutral-300 text-center"
                          />
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="w-8 h-8 flex items-center justify-center border border-neutral-300 rounded-r-md bg-neutral-100"
                          >
                            <i className="fas fa-plus"></i>
                          </button>
                        </div>
                      </div>
                      
                      {/* Total */}
                      <div className="md:col-span-2 md:text-right flex items-center justify-between mt-4 md:mt-0">
                        <span className="md:hidden text-sm text-text-secondary">Total:</span>
                        <span className="font-medium text-text-primary">${(item.price * item.quantity).toFixed(2)}</span>
                      </div>
                      
                      {/* Remove Button */}
                      <button 
                        onClick={() => removeFromCart(item.id)}
                        className="mt-4 md:mt-0 text-sm text-red-600 hover:text-red-800 inline-flex items-center"
                      >
                        <i className="fas fa-trash mr-1"></i>
                        <span>Remove</span>
                      </button>
                    </div>
                  ))}
                </div>
                
                {/* Cart Actions */}
                <div className="flex flex-col sm:flex-row justify-between items-center mt-6 pt-6 border-t">
                  <form onSubmit={handleApplyCoupon} className="flex space-x-2 mb-4 sm:mb-0">
                    <input 
                      type="text" 
                      placeholder="Coupon code" 
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      className="px-4 py-2 border border-neutral-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                    <Button 
                      type="submit"
                      variant="secondary"
                      className="rounded-r-md"
                    >
                      Apply
                    </Button>
                  </form>
                  <button 
                    onClick={handleContinueShopping}
                    className="text-primary hover:text-blue-700 inline-flex items-center"
                  >
                    <i className="fas fa-arrow-left mr-2"></i>
                    Continue Shopping
                  </button>
                </div>
              </div>
            ) : (
              <div className="py-12 text-center">
                <div className="text-6xl text-neutral-300 mb-4">
                  <i className="fas fa-shopping-cart"></i>
                </div>
                <h2 className="text-xl font-medium mb-4">Your cart is empty</h2>
                <p className="text-text-secondary mb-6">Looks like you haven't added anything to your cart yet.</p>
                <button 
                  onClick={handleContinueShopping}
                  className="bg-primary text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors"
                >
                  Start Shopping
                </button>
              </div>
            )}
          </div>
        </div>
        
        {/* Order Summary */}
        <div className="lg:w-1/3">
          <div className="bg-white rounded-lg shadow-sm p-4 md:p-6 sticky top-24">
            <h2 className="text-lg font-bold mb-4">Order Summary</h2>
            
            <div className="space-y-3 mb-6">
              <div className="flex justify-between">
                <span className="text-text-secondary">Subtotal</span>
                <span>${getTotalPrice()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-secondary">Shipping</span>
                <span>Free</span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-secondary">Tax</span>
                <span>${taxAmount}</span>
              </div>
              <div className="border-t pt-3 flex justify-between font-bold">
                <span>Total</span>
                <span className="text-error">${totalAmount}</span>
              </div>
            </div>
            
            <button 
              disabled={cartItems.length === 0}
              className={`w-full bg-primary text-white py-3 rounded-md hover:bg-blue-700 transition-colors mb-4 ${cartItems.length === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              Proceed to Checkout
            </button>
            
            <div className="flex justify-center space-x-4 mb-4">
              <img src="https://img.icons8.com/color/48/000000/visa.png" alt="Visa" className="h-8" />
              <img src="https://img.icons8.com/color/48/000000/mastercard.png" alt="Mastercard" className="h-8" />
              <img src="https://img.icons8.com/color/48/000000/amex.png" alt="American Express" className="h-8" />
              <img src="https://img.icons8.com/color/48/000000/paypal.png" alt="PayPal" className="h-8" />
            </div>
            
            <div className="text-center text-sm text-text-secondary">
              <p>We process payments securely with end-to-end encryption.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;

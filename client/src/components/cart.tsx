import React from "react";
import { useCart } from "@/providers/cart-provider";
import { useLocation } from "wouter";

const Cart: React.FC = () => {
  const { cartOpen, setCartOpen, cartItems, removeFromCart, updateQuantity, getTotalPrice } = useCart();
  const [_, setLocation] = useLocation();

  const handleCheckout = () => {
    setCartOpen(false);
    setLocation("/checkout");
  };

  const handleContinueShopping = () => {
    setCartOpen(false);
    setLocation("/products");
  };

  if (!cartOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black bg-opacity-50 transition-opacity"
        onClick={() => setCartOpen(false)}
      ></div>
      
      {/* Cart Drawer */}
      <div className="absolute inset-y-0 right-0 max-w-full flex">
        <div className="w-screen max-w-md transform transition-transform">
          <div className="h-full flex flex-col bg-white shadow-xl">
            <div className="flex-1 overflow-y-auto py-6 px-4 sm:px-6">
              <div className="flex items-start justify-between">
                <h2 className="text-lg font-medium text-text-primary">Shopping Cart</h2>
                <button 
                  onClick={() => setCartOpen(false)}
                  className="ml-3 h-7 flex items-center"
                >
                  <i className="fas fa-times text-gray-400 hover:text-gray-500"></i>
                </button>
              </div>

              <div className="mt-8">
                <div className="flow-root">
                  <ul className="-my-6 divide-y divide-gray-200">
                    {cartItems.length > 0 ? (
                      cartItems.map(item => (
                        <li key={item.id} className="py-6 flex">
                          <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                            <img src={item.imageUrl} alt={item.name} className="h-full w-full object-contain object-center" />
                          </div>

                          <div className="ml-4 flex flex-1 flex-col">
                            <div>
                              <div className="flex justify-between text-base font-medium text-text-primary">
                                <h3>{item.name}</h3>
                                <p className="ml-4 text-error">${(item.price * item.quantity).toFixed(2)}</p>
                              </div>
                              <p className="mt-1 text-sm text-text-secondary">{item.category}</p>
                            </div>
                            
                            <div className="flex flex-1 items-end justify-between text-sm">
                              <div className="flex items-center">
                                <button 
                                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                  className="w-6 h-6 flex items-center justify-center border border-gray-300 rounded-md"
                                >-</button>
                                <span className="mx-2">{item.quantity}</span>
                                <button 
                                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                  className="w-6 h-6 flex items-center justify-center border border-gray-300 rounded-md"
                                >+</button>
                              </div>

                              <div className="flex">
                                <button 
                                  onClick={() => removeFromCart(item.id)}
                                  className="font-medium text-primary hover:text-blue-800"
                                >
                                  Remove
                                </button>
                              </div>
                            </div>
                          </div>
                        </li>
                      ))
                    ) : (
                      <li className="py-6 text-center">
                        <p className="text-text-secondary">Your cart is empty</p>
                      </li>
                    )}
                  </ul>
                </div>
              </div>
            </div>

            <div className="border-t border-gray-200 py-6 px-4 sm:px-6">
              <div className="flex justify-between text-base font-medium text-text-primary">
                <p>Subtotal</p>
                <p>${getTotalPrice()}</p>
              </div>
              <p className="mt-0.5 text-sm text-text-secondary">Shipping and taxes calculated at checkout.</p>
              
              <div className="mt-6">
                <button
                  onClick={handleCheckout}
                  disabled={cartItems.length === 0}
                  className={`w-full flex justify-center items-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-primary hover:bg-blue-700 ${cartItems.length === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  Checkout
                </button>
              </div>
              
              <div className="mt-6 flex justify-center text-sm text-center text-text-secondary">
                <p>
                  or
                  <button 
                    onClick={handleContinueShopping}
                    className="text-primary font-medium hover:text-blue-800 ml-1"
                  >
                    Continue Shopping
                    <span aria-hidden="true"> &rarr;</span>
                  </button>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;

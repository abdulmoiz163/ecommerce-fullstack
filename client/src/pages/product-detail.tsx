import React, { useState } from "react";
import { useParams, useLocation } from "wouter";
import { useCart } from "@/providers/cart-provider";
import StarRating from "@/components/ui/star-rating";
import ProductCard from "@/components/ui/product-card";
import { getProduct, getRelatedProducts, productImages } from "@/lib/data";

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [_, setLocation] = useLocation();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("description");
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState("black");
  const [selectedStorage, setSelectedStorage] = useState("256GB");

  const product = getProduct(parseInt(id));
  
  if (!product) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-sm p-6 text-center">
          <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
          <p className="mb-6">Sorry, the product you are looking for does not exist.</p>
          <button 
            onClick={() => setLocation("/products")}
            className="bg-primary text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors"
          >
            Back to Products
          </button>
        </div>
      </div>
    );
  }

  const relatedProducts = getRelatedProducts(product);
  
  const handleAddToCart = () => {
    addToCart(product, quantity);
  };

  const incrementQuantity = () => {
    setQuantity(prev => prev + 1);
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value >= 1) {
      setQuantity(value);
    }
  };

  // Get product images or fallback to single image
  const images = productImages[parseInt(id) as keyof typeof productImages] || [product.imageUrl];

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumbs */}
      <div className="text-sm mb-6">
        <span className="text-text-secondary">Home</span>
        <span className="mx-2">/</span>
        <span className="text-text-secondary">Electronics</span>
        <span className="mx-2">/</span>
        <span className="text-text-secondary">Smartphones</span>
        <span className="mx-2">/</span>
        <span>{product.name}</span>
      </div>
      
      {/* Product Info */}
      <div className="bg-white rounded-lg shadow-sm p-4 md:p-6 mb-8">
        <div className="md:flex">
          {/* Product Image Gallery */}
          <div className="md:w-1/2 md:pr-8 mb-6 md:mb-0">
            <div className="relative mb-4 bg-neutral-100 rounded-lg overflow-hidden">
              {product.isNew && (
                <span className="absolute top-2 right-2 bg-accent text-white text-xs px-2 py-1 rounded">New</span>
              )}
              {product.isSale && (
                <span className="absolute top-2 right-2 bg-success text-white text-xs px-2 py-1 rounded">Sale</span>
              )}
              <img
                src={images[selectedImage]}
                alt={product.name}
                className="w-full h-auto object-contain p-8"
              />
            </div>
            <div className="grid grid-cols-4 gap-2">
              {images.map((image, index) => (
                <div 
                  key={index}
                  className={`cursor-pointer border ${selectedImage === index ? 'border-2 border-primary' : 'border-neutral-200'} rounded-lg overflow-hidden`}
                  onClick={() => setSelectedImage(index)}
                >
                  <img
                    src={image}
                    alt={`${product.name} - view ${index + 1}`}
                    className="w-full h-auto object-contain p-2"
                  />
                </div>
              ))}
            </div>
          </div>
          
          {/* Product Details */}
          <div className="md:w-1/2">
            <h1 className="text-2xl font-bold mb-2">{product.name}</h1>
            <div className="flex items-center mb-2">
              <StarRating rating={product.rating} reviews={product.numReviews} size="lg" />
              <span className="text-text-secondary ml-2">{product.rating} ({product.numReviews} reviews)</span>
            </div>
            
            <div className="mb-4">
              <span className="text-3xl font-bold text-error">${product.price.toFixed(2)}</span>
              {product.oldPrice && (
                <span className="text-text-secondary text-xl line-through ml-2">${product.oldPrice.toFixed(2)}</span>
              )}
            </div>
            
            {/* Availability */}
            <div className="flex items-center text-success mb-4">
              <i className="fas fa-check-circle mr-2"></i>
              <span>In Stock</span>
            </div>
            
            {/* Color Options */}
            <div className="mb-4">
              <h3 className="font-medium mb-2">Color</h3>
              <div className="flex space-x-2">
                <button 
                  className={`w-8 h-8 rounded-full bg-gray-800 ${selectedColor === 'black' ? 'border-2 border-primary' : 'border border-neutral-300'}`}
                  onClick={() => setSelectedColor('black')}
                ></button>
                <button 
                  className={`w-8 h-8 rounded-full bg-white ${selectedColor === 'white' ? 'border-2 border-primary' : 'border border-neutral-300'}`}
                  onClick={() => setSelectedColor('white')}
                ></button>
                <button 
                  className={`w-8 h-8 rounded-full bg-blue-700 ${selectedColor === 'blue' ? 'border-2 border-primary' : 'border border-neutral-300'}`}
                  onClick={() => setSelectedColor('blue')}
                ></button>
                <button 
                  className={`w-8 h-8 rounded-full bg-green-700 ${selectedColor === 'green' ? 'border-2 border-primary' : 'border border-neutral-300'}`}
                  onClick={() => setSelectedColor('green')}
                ></button>
              </div>
            </div>
            
            {/* Storage Options */}
            <div className="mb-4">
              <h3 className="font-medium mb-2">Storage</h3>
              <div className="flex flex-wrap gap-2">
                <button 
                  className={`px-4 py-2 ${selectedStorage === '128GB' ? 'border-2 border-primary bg-blue-50' : 'border border-neutral-300 hover:border-primary'} rounded-md`}
                  onClick={() => setSelectedStorage('128GB')}
                >
                  128GB
                </button>
                <button 
                  className={`px-4 py-2 ${selectedStorage === '256GB' ? 'border-2 border-primary bg-blue-50' : 'border border-neutral-300 hover:border-primary'} rounded-md`}
                  onClick={() => setSelectedStorage('256GB')}
                >
                  256GB
                </button>
                <button 
                  className={`px-4 py-2 ${selectedStorage === '512GB' ? 'border-2 border-primary bg-blue-50' : 'border border-neutral-300 hover:border-primary'} rounded-md`}
                  onClick={() => setSelectedStorage('512GB')}
                >
                  512GB
                </button>
                <button 
                  className={`px-4 py-2 ${selectedStorage === '1TB' ? 'border-2 border-primary bg-blue-50' : 'border border-neutral-300 hover:border-primary'} rounded-md`}
                  onClick={() => setSelectedStorage('1TB')}
                >
                  1TB
                </button>
              </div>
            </div>
            
            {/* Quantity */}
            <div className="mb-6">
              <h3 className="font-medium mb-2">Quantity</h3>
              <div className="flex items-center">
                <button 
                  className="w-10 h-10 flex items-center justify-center border border-neutral-300 rounded-l-md bg-neutral-100"
                  onClick={decrementQuantity}
                >
                  <i className="fas fa-minus"></i>
                </button>
                <input 
                  type="number" 
                  min="1" 
                  value={quantity} 
                  onChange={handleQuantityChange}
                  className="w-16 h-10 border-y border-neutral-300 text-center"
                />
                <button 
                  className="w-10 h-10 flex items-center justify-center border border-neutral-300 rounded-r-md bg-neutral-100"
                  onClick={incrementQuantity}
                >
                  <i className="fas fa-plus"></i>
                </button>
              </div>
            </div>
            
            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 mb-6">
              <button 
                onClick={handleAddToCart}
                className="flex-1 bg-primary text-white py-3 px-6 rounded-md hover:bg-blue-700 transition-colors"
              >
                Add to Cart
              </button>
              <button className="flex-1 border border-primary text-primary py-3 px-6 rounded-md hover:bg-blue-50 transition-colors">
                Buy Now
              </button>
            </div>
            
            {/* Short Description */}
            <div>
              <h3 className="font-medium mb-2">Highlights</h3>
              <ul className="list-disc list-inside text-text-secondary space-y-1">
                <li>6.1-inch Super Retina XDR display with ProMotion</li>
                <li>A15 Bionic chip for lightning-fast performance</li>
                <li>Pro camera system with 12MP telephoto, wide, and ultra wide</li>
                <li>Up to 28 hours of video playback</li>
                <li>5G capable for ultra-fast downloads and streaming</li>
                <li>Face ID for secure authentication</li>
                <li>iOS 15 with new features for FaceTime, Messages, and more</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      
      {/* Product Details Tabs */}
      <div className="bg-white rounded-lg shadow-sm p-4 md:p-6 mb-8">
        <div className="border-b border-neutral-200 mb-6">
          <div className="flex overflow-x-auto -mb-px">
            <button 
              className={`px-4 py-2 border-b-2 ${activeTab === 'description' ? 'border-primary text-primary' : 'border-transparent text-text-secondary hover:text-primary'} font-medium`}
              onClick={() => setActiveTab('description')}
            >
              Description
            </button>
            <button 
              className={`px-4 py-2 border-b-2 ${activeTab === 'specifications' ? 'border-primary text-primary' : 'border-transparent text-text-secondary hover:text-primary'} font-medium`}
              onClick={() => setActiveTab('specifications')}
            >
              Specifications
            </button>
            <button 
              className={`px-4 py-2 border-b-2 ${activeTab === 'reviews' ? 'border-primary text-primary' : 'border-transparent text-text-secondary hover:text-primary'} font-medium`}
              onClick={() => setActiveTab('reviews')}
            >
              Reviews ({product.numReviews})
            </button>
            <button 
              className={`px-4 py-2 border-b-2 ${activeTab === 'faqs' ? 'border-primary text-primary' : 'border-transparent text-text-secondary hover:text-primary'} font-medium`}
              onClick={() => setActiveTab('faqs')}
            >
              FAQs
            </button>
          </div>
        </div>
        
        <div>
          {activeTab === 'description' && (
            <>
              <h3 className="text-lg font-medium mb-4">Product Description</h3>
              <div className="text-text-secondary space-y-4">
                <p>{product.description}</p>
                <p>
                  The Super Retina XDR display with ProMotion delivers a stunning viewing experience with a refresh rate that dynamically adjusts up to 120Hz. This means everything from scrolling through webpages to gaming looks incredibly fluid.
                </p>
                <p>
                  The pro camera system features three 12MP cameras - telephoto, wide, and ultra wide - that capture stunning photos and videos in any lighting condition. With features like Night mode, Deep Fusion, and Photographic Styles, you can customize your photography experience like never before.
                </p>
                <p>
                  The A15 Bionic chip is the fastest chip ever in a smartphone, delivering powerful performance and efficiency for demanding tasks and all-day battery life.
                </p>
                <p>
                  With 5G capability, you'll get ultra-fast downloads and high-quality streaming. And with iOS 15, you get new FaceTime features, redesigned notifications, and more ways to stay connected.
                </p>
              </div>
            </>
          )}
          
          {activeTab === 'specifications' && (
            <>
              <h3 className="text-lg font-medium mb-4">Technical Specifications</h3>
              <div className="text-text-secondary">
                <div className="border-b border-neutral-200 py-2 grid grid-cols-3">
                  <span className="font-medium col-span-1">Display</span>
                  <span className="col-span-2">6.1-inch Super Retina XDR with ProMotion</span>
                </div>
                <div className="border-b border-neutral-200 py-2 grid grid-cols-3">
                  <span className="font-medium col-span-1">Processor</span>
                  <span className="col-span-2">A15 Bionic chip</span>
                </div>
                <div className="border-b border-neutral-200 py-2 grid grid-cols-3">
                  <span className="font-medium col-span-1">Camera</span>
                  <span className="col-span-2">Pro 12MP camera system: Telephoto, Wide, Ultra Wide</span>
                </div>
                <div className="border-b border-neutral-200 py-2 grid grid-cols-3">
                  <span className="font-medium col-span-1">Front Camera</span>
                  <span className="col-span-2">12MP TrueDepth front camera</span>
                </div>
                <div className="border-b border-neutral-200 py-2 grid grid-cols-3">
                  <span className="font-medium col-span-1">Storage</span>
                  <span className="col-span-2">128GB, 256GB, 512GB, 1TB</span>
                </div>
                <div className="border-b border-neutral-200 py-2 grid grid-cols-3">
                  <span className="font-medium col-span-1">Battery</span>
                  <span className="col-span-2">Up to 28 hours video playback</span>
                </div>
                <div className="border-b border-neutral-200 py-2 grid grid-cols-3">
                  <span className="font-medium col-span-1">OS</span>
                  <span className="col-span-2">iOS 15</span>
                </div>
                <div className="border-b border-neutral-200 py-2 grid grid-cols-3">
                  <span className="font-medium col-span-1">Connectivity</span>
                  <span className="col-span-2">5G, Wi-Fi 6, Bluetooth 5.0</span>
                </div>
              </div>
            </>
          )}
          
          {activeTab === 'reviews' && (
            <>
              <h3 className="text-lg font-medium mb-4">Customer Reviews</h3>
              <div className="space-y-6">
                <div className="flex items-start border-b border-neutral-200 pb-6">
                  <div className="flex-shrink-0 mr-4">
                    <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center">
                      <span>JD</span>
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center mb-1">
                      <StarRating rating={5} size="sm" />
                      <span className="text-sm font-medium ml-2">John Doe</span>
                    </div>
                    <p className="text-text-secondary mb-2">Purchased 2 months ago</p>
                    <h4 className="font-medium mb-1">Absolutely love this phone!</h4>
                    <p className="text-text-secondary">
                      The camera quality is amazing, battery life is great, and it's super fast. Definitely worth the upgrade from my previous phone.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start border-b border-neutral-200 pb-6">
                  <div className="flex-shrink-0 mr-4">
                    <div className="w-10 h-10 rounded-full bg-accent text-white flex items-center justify-center">
                      <span>AS</span>
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center mb-1">
                      <StarRating rating={4} size="sm" />
                      <span className="text-sm font-medium ml-2">Alice Smith</span>
                    </div>
                    <p className="text-text-secondary mb-2">Purchased 1 month ago</p>
                    <h4 className="font-medium mb-1">Great phone, but expensive</h4>
                    <p className="text-text-secondary">
                      This is a fantastic device with excellent performance and features. The only downside is the price tag, which is quite steep.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="mt-6">
                <button className="text-primary hover:underline flex items-center">
                  See all {product.numReviews} reviews
                  <i className="fas fa-chevron-right ml-1 text-xs"></i>
                </button>
              </div>
            </>
          )}
          
          {activeTab === 'faqs' && (
            <>
              <h3 className="text-lg font-medium mb-4">Frequently Asked Questions</h3>
              <div className="space-y-4">
                <div className="border-b border-neutral-200 pb-4">
                  <h4 className="font-medium mb-2">Is this phone water resistant?</h4>
                  <p className="text-text-secondary">
                    Yes, it has an IP68 rating, which means it can withstand submersion in water up to 6 meters for up to 30 minutes.
                  </p>
                </div>
                
                <div className="border-b border-neutral-200 pb-4">
                  <h4 className="font-medium mb-2">Does it come with a charger?</h4>
                  <p className="text-text-secondary">
                    No, the phone does not include a charger in the box. It comes with a USB-C to Lightning cable, but you'll need to purchase a charging adapter separately.
                  </p>
                </div>
                
                <div className="border-b border-neutral-200 pb-4">
                  <h4 className="font-medium mb-2">Can I use my existing SIM card?</h4>
                  <p className="text-text-secondary">
                    The phone uses a Nano-SIM and can also support an eSIM. If your current SIM is a different size, you'll need to get a new one from your carrier.
                  </p>
                </div>
                
                <div className="border-b border-neutral-200 pb-4">
                  <h4 className="font-medium mb-2">What's the warranty period?</h4>
                  <p className="text-text-secondary">
                    The product comes with a standard 1-year limited warranty that covers manufacturing defects. You can purchase AppleCare+ for extended coverage.
                  </p>
                </div>
              </div>
              
              <div className="mt-6">
                <button className="text-primary hover:underline flex items-center">
                  See more FAQs
                  <i className="fas fa-chevron-right ml-1 text-xs"></i>
                </button>
              </div>
            </>
          )}
        </div>
      </div>
      
      {/* Related Products */}
      <div className="bg-white rounded-lg shadow-sm p-4 md:p-6 mb-8">
        <h3 className="text-lg font-medium mb-6">You Might Also Like</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {relatedProducts.map(product => (
            <ProductCard key={product.id} product={product} size="sm" />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;

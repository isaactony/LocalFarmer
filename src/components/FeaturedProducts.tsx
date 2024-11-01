import React, { useRef, useEffect } from 'react';
import { Star, Heart } from 'lucide-react';
import { useCart } from '../store/CartContext';
import { useProducts } from '../store/ProductsContext';

export default function FeaturedProducts() {
  const { getFeaturedProducts } = useProducts();
  const { state, dispatch } = useCart();
  const products = getFeaturedProducts();
  const sliderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;

    const scroll = () => {
      if (slider.scrollLeft + slider.clientWidth >= slider.scrollWidth) {
        slider.scrollLeft = 0;
      } else {
        slider.scrollLeft += 1;
      }
    };

    const interval = setInterval(scroll, 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">Featured Products</h2>
        <div 
          ref={sliderRef}
          className="flex overflow-x-hidden space-x-6"
          style={{ scrollBehavior: 'smooth' }}
        >
          {products.map((product) => (
            <div 
              key={product.id} 
              className="flex-none w-72 bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              <div className="relative h-48">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
                <button 
                  onClick={() => dispatch({ type: 'TOGGLE_WISHLIST', payload: product.id })}
                  className={`absolute top-2 right-2 p-2 rounded-full shadow hover:bg-gray-100 ${
                    state.wishlist.includes(product.id) 
                      ? 'bg-red-50' 
                      : 'bg-white'
                  }`}
                >
                  <Heart 
                    className={`w-5 h-5 ${
                      state.wishlist.includes(product.id)
                        ? 'text-red-500 fill-current'
                        : 'text-gray-600'
                    }`} 
                  />
                </button>
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-lg mb-1">{product.name}</h3>
                <p className="text-sm text-gray-600 mb-2">{product.farm.name}</p>
                <div className="flex items-center mb-3">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span className="ml-1 text-sm text-gray-600">4.8</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold text-green-600">${product.price}</span>
                  <button 
                    onClick={() => dispatch({ type: 'ADD_TO_CART', payload: product })}
                    className="bg-green-600 text-white px-4 py-2 rounded-full text-sm hover:bg-green-700 transition-colors"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
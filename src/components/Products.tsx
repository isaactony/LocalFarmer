import React, { useState, useEffect } from 'react';
import { ArrowLeft, Star, Heart, Filter } from 'lucide-react';
import { useCart } from '../store/CartContext';
import { useProducts } from '../store/ProductsContext';
import { useSearchParams } from 'react-router-dom';

export default function Products({ onBack }) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const { state, dispatch } = useCart();
  const { products, getProductsByFarm } = useProducts();
  const [searchParams] = useSearchParams();
  const farmId = searchParams.get('farm');

  const categories = ['All', 'Vegetables', 'Fruits', 'Eggs & Dairy', 'Honey & Preserves'];
  const farmProducts = farmId ? getProductsByFarm(Number(farmId)) : products;

  const filteredProducts = farmProducts.filter(product => 
    (selectedCategory === 'All' || product.category === selectedCategory) &&
    (searchTerm === '' || 
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.farm.name.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center mb-8">
          <button
            onClick={onBack}
            className="mr-4 p-2 hover:bg-gray-100 rounded-full"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-3xl font-bold">
            {farmId 
              ? `Products from ${farmProducts[0]?.farm.name}`
              : 'All Products'
            }
          </h1>
        </div>

        <div className="flex flex-col md:flex-row gap-8 mb-8">
          <div className="w-full md:w-64 space-y-4">
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <div className="flex items-center mb-4">
                <Filter className="w-5 h-5 mr-2" />
                <h2 className="font-semibold">Categories</h2>
              </div>
              <div className="space-y-2">
                {categories.map(category => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`block w-full text-left px-3 py-2 rounded ${
                      selectedCategory === category
                        ? 'bg-green-50 text-green-600'
                        : 'hover:bg-gray-50'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="flex-1">
            <div className="mb-6">
              <input
                type="text"
                placeholder="Search products or farms..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <div key={product.id} className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow">
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
        </div>
      </div>
    </div>
  );
}
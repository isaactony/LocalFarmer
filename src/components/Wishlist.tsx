import React, { useState } from 'react';
import { X, Heart } from 'lucide-react';
import { useCart } from '../store/CartContext';
import { useProducts } from '../store/ProductsContext';

export default function Wishlist({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const { state, dispatch } = useCart();
  const { products } = useProducts();
  const [addedItems, setAddedItems] = useState<number[]>([]);
  
  const wishlistItems = products.filter(product => 
    state.wishlist.includes(product.id)
  );

  const handleAddToCart = (item) => {
    dispatch({ type: 'ADD_TO_CART', payload: item });
    setAddedItems([...addedItems, item.id]);
    
    // Reset the button state after 2 seconds
    setTimeout(() => {
      setAddedItems(addedItems.filter(id => id !== item.id));
    }, 2000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      
      <div className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-xl">
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-between border-b px-4 py-3">
            <h2 className="text-lg font-semibold">Wishlist</h2>
            <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
              <X className="w-5 h-5" />
            </button>
          </div>

          {wishlistItems.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center p-4">
              <Heart className="w-16 h-16 text-gray-400 mb-4" />
              <p className="text-gray-500">Your wishlist is empty</p>
            </div>
          ) : (
            <div className="flex-1 overflow-y-auto p-4">
              {wishlistItems.map((item) => (
                <div key={item.id} className="flex gap-4 py-4 border-b">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold">{item.name}</h3>
                    <p className="text-sm text-gray-600">{item.farm.name}</p>
                    <p className="font-semibold mt-1">${item.price}</p>
                  </div>
                  <div className="flex flex-col gap-2">
                    <button
                      onClick={() => handleAddToCart(item)}
                      className={`px-4 py-2 rounded-full text-sm transition-all duration-300 ${
                        addedItems.includes(item.id)
                          ? 'bg-green-100 text-green-800 cursor-default'
                          : 'bg-green-600 text-white hover:bg-green-700'
                      }`}
                      disabled={addedItems.includes(item.id)}
                    >
                      {addedItems.includes(item.id) ? 'Added to Cart' : 'Add to Cart'}
                    </button>
                    <button
                      onClick={() => dispatch({ type: 'TOGGLE_WISHLIST', payload: item.id })}
                      className="text-sm text-red-600 hover:text-red-700"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
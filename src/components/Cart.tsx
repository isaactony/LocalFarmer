import React, { useState } from 'react';
import { X, Minus, Plus, ShoppingBag, CreditCard } from 'lucide-react';
import { useCart } from '../store/CartContext';

type CheckoutStep = 'cart' | 'shipping' | 'payment' | 'confirmation';

export default function Cart({ isOpen, onClose }) {
  const { state, dispatch } = useCart();
  const [checkoutStep, setCheckoutStep] = useState<CheckoutStep>('cart');
  const [shippingInfo, setShippingInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    phone: ''
  });
  
  const total = state.items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const updateQuantity = (id: number, quantity: number) => {
    if (quantity < 1) {
      dispatch({ type: 'REMOVE_FROM_CART', payload: id });
    } else {
      dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } });
    }
  };

  const handleShippingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCheckoutStep('payment');
  };

  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCheckoutStep('confirmation');
    setTimeout(() => {
      dispatch({ type: 'CLEAR_CART' });
      onClose();
    }, 3000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      
      <div className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-xl">
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-between border-b px-4 py-3">
            <h2 className="text-lg font-semibold">
              {checkoutStep === 'cart' && 'Shopping Cart'}
              {checkoutStep === 'shipping' && 'Shipping Information'}
              {checkoutStep === 'payment' && 'Payment Details'}
              {checkoutStep === 'confirmation' && 'Order Confirmed'}
            </h2>
            <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
              <X className="w-5 h-5" />
            </button>
          </div>

          {state.items.length === 0 && checkoutStep === 'cart' ? (
            <div className="flex-1 flex flex-col items-center justify-center p-4">
              <ShoppingBag className="w-16 h-16 text-gray-400 mb-4" />
              <p className="text-gray-500">Your cart is empty</p>
            </div>
          ) : (
            <>
              {checkoutStep === 'cart' && (
                <>
                  <div className="flex-1 overflow-y-auto p-4">
                    {state.items.map((item) => (
                      <div key={item.id} className="flex gap-4 py-4 border-b">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-20 h-20 object-cover rounded"
                        />
                        <div className="flex-1">
                          <h3 className="font-semibold">{item.name}</h3>
                          <p className="text-sm text-gray-600">{item.farm.name}</p>
                          <div className="flex items-center gap-2 mt-2">
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="p-1 hover:bg-gray-100 rounded"
                            >
                              <Minus className="w-4 h-4" />
                            </button>
                            <span>{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="p-1 hover:bg-gray-100 rounded"
                            >
                              <Plus className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold">${(item.price * item.quantity).toFixed(2)}</p>
                          <button
                            onClick={() => dispatch({ type: 'REMOVE_FROM_CART', payload: item.id })}
                            className="text-sm text-red-600 hover:text-red-700"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="border-t p-4">
                    <div className="flex justify-between mb-4">
                      <span className="font-semibold">Total</span>
                      <span className="font-semibold">${total.toFixed(2)}</span>
                    </div>
                    <button
                      onClick={() => setCheckoutStep('shipping')}
                      className="w-full bg-green-600 text-white py-3 rounded-full font-semibold hover:bg-green-700 transition-colors"
                    >
                      Proceed to Checkout
                    </button>
                  </div>
                </>
              )}

              {checkoutStep === 'shipping' && (
                <form onSubmit={handleShippingSubmit} className="flex-1 overflow-y-auto p-4">
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">First Name</label>
                        <input
                          type="text"
                          required
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                          value={shippingInfo.firstName}
                          onChange={(e) => setShippingInfo({ ...shippingInfo, firstName: e.target.value })}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Last Name</label>
                        <input
                          type="text"
                          required
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                          value={shippingInfo.lastName}
                          onChange={(e) => setShippingInfo({ ...shippingInfo, lastName: e.target.value })}
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Email</label>
                      <input
                        type="email"
                        required
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                        value={shippingInfo.email}
                        onChange={(e) => setShippingInfo({ ...shippingInfo, email: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Address</label>
                      <input
                        type="text"
                        required
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                        value={shippingInfo.address}
                        onChange={(e) => setShippingInfo({ ...shippingInfo, address: e.target.value })}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">City</label>
                        <input
                          type="text"
                          required
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                          value={shippingInfo.city}
                          onChange={(e) => setShippingInfo({ ...shippingInfo, city: e.target.value })}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">State</label>
                        <input
                          type="text"
                          required
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                          value={shippingInfo.state}
                          onChange={(e) => setShippingInfo({ ...shippingInfo, state: e.target.value })}
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">ZIP Code</label>
                        <input
                          type="text"
                          required
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                          value={shippingInfo.zipCode}
                          onChange={(e) => setShippingInfo({ ...shippingInfo, zipCode: e.target.value })}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Phone</label>
                        <input
                          type="tel"
                          required
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                          value={shippingInfo.phone}
                          onChange={(e) => setShippingInfo({ ...shippingInfo, phone: e.target.value })}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="mt-6">
                    <button
                      type="submit"
                      className="w-full bg-green-600 text-white py-3 rounded-full font-semibold hover:bg-green-700 transition-colors"
                    >
                      Continue to Payment
                    </button>
                  </div>
                </form>
              )}

              {checkoutStep === 'payment' && (
                <form onSubmit={handlePaymentSubmit} className="flex-1 overflow-y-auto p-4">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Card Number</label>
                      <div className="mt-1 relative">
                        <input
                          type="text"
                          required
                          placeholder="1234 5678 9012 3456"
                          className="block w-full rounded-md border-gray-300 pl-10 focus:border-green-500 focus:ring-green-500"
                        />
                        <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Expiry Date</label>
                        <input
                          type="text"
                          required
                          placeholder="MM/YY"
                          className="mt-1 block w-full rounded-md border-gray-300 focus:border-green-500 focus:ring-green-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">CVC</label>
                        <input
                          type="text"
                          required
                          placeholder="123"
                          className="mt-1 block w-full rounded-md border-gray-300 focus:border-green-500 focus:ring-green-500"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="mt-6">
                    <div className="bg-gray-50 p-4 rounded-lg mb-4">
                      <div className="flex justify-between mb-2">
                        <span className="text-gray-600">Subtotal</span>
                        <span>${total.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between mb-2">
                        <span className="text-gray-600">Shipping</span>
                        <span>$5.00</span>
                      </div>
                      <div className="flex justify-between font-semibold">
                        <span>Total</span>
                        <span>${(total + 5).toFixed(2)}</span>
                      </div>
                    </div>
                    <button
                      type="submit"
                      className="w-full bg-green-600 text-white py-3 rounded-full font-semibold hover:bg-green-700 transition-colors"
                    >
                      Pay ${(total + 5).toFixed(2)}
                    </button>
                  </div>
                </form>
              )}

              {checkoutStep === 'confirmation' && (
                <div className="flex-1 flex flex-col items-center justify-center p-4">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                    <svg className="w-8 h-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Order Confirmed!</h3>
                  <p className="text-gray-600 text-center mb-4">
                    Thank you for your order. You will receive a confirmation email shortly.
                  </p>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
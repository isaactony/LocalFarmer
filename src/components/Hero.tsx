import React from 'react';
import { ArrowRight, Leaf, ShieldCheck, Truck } from 'lucide-react';

export default function Hero({ onShopNow, onMeetFarmers }) {
  return (
    <div className="relative min-h-screen flex items-center">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1550989460-0adf9ea622e2?auto=format&fit=crop&q=80"
          alt="Fresh produce background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/40" />
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 py-32 grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Hero Content */}
        <div className="space-y-8">
          <div className="space-y-4">
            <h1 className="text-5xl lg:text-6xl font-bold text-white leading-tight">
              Fresh from Local Farms to Your Table
            </h1>
            <p className="text-xl text-gray-200 leading-relaxed">
              Support local farmers and enjoy the freshest produce delivered straight to your door. 
              Reduce food miles and support sustainable agriculture.
            </p>
          </div>

          <div className="flex flex-wrap gap-4">
            <button 
              onClick={onShopNow}
              className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 flex items-center group"
            >
              Shop Now
              <ArrowRight className="ml-2 w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
            </button>
            <button 
              onClick={onMeetFarmers}
              className="bg-white/10 backdrop-blur-md hover:bg-white/20 text-white border border-white/20 px-8 py-4 rounded-full font-semibold transition-all duration-300"
            >
              Meet Our Farmers
            </button>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:mt-12">
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
            <div className="w-12 h-12 bg-green-600/20 rounded-full flex items-center justify-center mb-4">
              <Leaf className="w-6 h-6 text-green-400" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">100% Organic</h3>
            <p className="text-gray-200">
              All our products are certified organic and grown without harmful pesticides
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
            <div className="w-12 h-12 bg-green-600/20 rounded-full flex items-center justify-center mb-4">
              <Truck className="w-6 h-6 text-green-400" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Fast Delivery</h3>
            <p className="text-gray-200">
              Same-day delivery for orders placed before 2 PM in your local area
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
            <div className="w-12 h-12 bg-green-600/20 rounded-full flex items-center justify-center mb-4">
              <ShieldCheck className="w-6 h-6 text-green-400" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Quality Assured</h3>
            <p className="text-gray-200">
              Rigorous quality control ensures only the best produce reaches you
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
            <div className="w-12 h-12 bg-green-600/20 rounded-full flex items-center justify-center mb-4">
              <Leaf className="w-6 h-6 text-green-400" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Eco-Friendly</h3>
            <p className="text-gray-200">
              Sustainable packaging and reduced carbon footprint in all operations
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
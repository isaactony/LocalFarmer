import React, { useState, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import FeaturedProducts from './components/FeaturedProducts';
import FarmStories from './components/FarmStories';
import Products from './components/Products';
import Cart from './components/Cart';
import Wishlist from './components/Wishlist';
import FarmerDashboard from './components/dashboard/FarmerDashboard';
import Farms from './components/pages/Farms';
import About from './components/pages/About';

function AppContent() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const farmersRef = useRef(null);

  const scrollToFarmers = () => {
    farmersRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar 
        onCartClick={() => setIsCartOpen(true)}
        onWishlistClick={() => setIsWishlistOpen(true)}
      />
      <main className="pt-16">
        <Routes>
          <Route path="/" element={
            <>
              <Hero onMeetFarmers={scrollToFarmers} />
              <FeaturedProducts />
              <div ref={farmersRef}>
                <FarmStories />
              </div>
              
              {/* Sustainability Section */}
              <section className="py-16 bg-green-50">
                <div className="max-w-7xl mx-auto px-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                    <div className="p-6">
                      <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <img
                          src="https://images.unsplash.com/photo-1596239896077-5c5f15ee2743?auto=format&fit=crop&q=80"
                          alt="Local farming"
                          className="w-8 h-8 object-cover rounded-full"
                        />
                      </div>
                      <h3 className="text-xl font-semibold mb-2">Support Local Farmers</h3>
                      <p className="text-gray-600">Direct connection to local farms ensures fair prices and fresh produce.</p>
                    </div>
                    <div className="p-6">
                      <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <img
                          src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80"
                          alt="Organic produce"
                          className="w-8 h-8 object-cover rounded-full"
                        />
                      </div>
                      <h3 className="text-xl font-semibold mb-2">100% Organic</h3>
                      <p className="text-gray-600">All our products are certified organic and pesticide-free.</p>
                    </div>
                    <div className="p-6">
                      <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <img
                          src="https://images.unsplash.com/photo-1530541930197-ff16ac917b0e?auto=format&fit=crop&q=80"
                          alt="Sustainable packaging"
                          className="w-8 h-8 object-cover rounded-full"
                        />
                      </div>
                      <h3 className="text-xl font-semibold mb-2">Eco-Friendly</h3>
                      <p className="text-gray-600">Sustainable packaging and reduced carbon footprint.</p>
                    </div>
                  </div>
                </div>
              </section>

              {/* Newsletter Section */}
              <section className="py-16 bg-gray-900 text-white">
                <div className="max-w-7xl mx-auto px-4 text-center">
                  <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
                  <p className="mb-8 text-gray-300">Get notified about seasonal produce and special offers.</p>
                  <div className="max-w-md mx-auto flex gap-4">
                    <input
                      type="email"
                      placeholder="Enter your email"
                      className="flex-1 px-4 py-3 rounded-full text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                    <button className="bg-green-600 hover:bg-green-700 px-8 py-3 rounded-full font-semibold transition-colors">
                      Subscribe
                    </button>
                  </div>
                </div>
              </section>

              {/* Footer */}
              <footer className="bg-gray-50 py-12">
                <div className="max-w-7xl mx-auto px-4">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div>
                      <h3 className="text-lg font-semibold mb-4">About Us</h3>
                      <ul className="space-y-2 text-gray-600">
                        <li><button className="hover:text-green-600">Our Story</button></li>
                        <li><button className="hover:text-green-600">Blog</button></li>
                        <li><button className="hover:text-green-600">Careers</button></li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-4">Support</h3>
                      <ul className="space-y-2 text-gray-600">
                        <li><button className="hover:text-green-600">FAQ</button></li>
                        <li><button className="hover:text-green-600">Contact Us</button></li>
                        <li><button className="hover:text-green-600">Shipping Info</button></li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-4">Legal</h3>
                      <ul className="space-y-2 text-gray-600">
                        <li><button className="hover:text-green-600">Privacy Policy</button></li>
                        <li><button className="hover:text-green-600">Terms of Service</button></li>
                        <li><button className="hover:text-green-600">Returns Policy</button></li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-4">Connect</h3>
                      <ul className="space-y-2 text-gray-600">
                        <li><button className="hover:text-green-600">Instagram</button></li>
                        <li><button className="hover:text-green-600">Facebook</button></li>
                        <li><button className="hover:text-green-600">Twitter</button></li>
                      </ul>
                    </div>
                  </div>
                  <div className="mt-12 pt-8 border-t border-gray-200 text-center text-gray-600">
                    <p>&copy; 2024 FreshLocal. All rights reserved.</p>
                  </div>
                </div>
              </footer>
            </>
          } />
          <Route path="/products" element={<Products />} />
          <Route path="/farms" element={<Farms />} />
          <Route path="/dashboard" element={<FarmerDashboard />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </main>

      <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
      <Wishlist isOpen={isWishlistOpen} onClose={() => setIsWishlistOpen(false)} />
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
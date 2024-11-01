{/* Previous imports remain the same */}
import React, { useState } from 'react';
import { ShoppingCart, Heart, Search, Menu, User, ChevronDown, X, Tractor } from 'lucide-react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { useCart } from '../store/CartContext';
import CustomerSignIn from './auth/CustomerSignIn';
import FarmerSignIn from './auth/FarmerSignIn';
import CreateAccount from './auth/CreateAccount';

export default function Navbar({ onCartClick, onWishlistClick }) {
  const { state } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [showCustomerSignIn, setShowCustomerSignIn] = useState(false);
  const [showFarmerSignIn, setShowFarmerSignIn] = useState(false);
  const [showCreateAccount, setShowCreateAccount] = useState(false);
  const cartItemCount = state.items.reduce((sum, item) => sum + item.quantity, 0);
  const wishlistCount = state.wishlist.length;
  const navigate = useNavigate();
  const location = useLocation();

  // Check if we're on the dashboard
  const isDashboard = location.pathname === '/dashboard';

  const handleCustomerSignIn = () => {
    setIsAuthOpen(false);
    setShowCustomerSignIn(true);
  };

  const handleFarmerSignIn = () => {
    setIsAuthOpen(false);
    setShowFarmerSignIn(true);
  };

  const handleCreateAccount = () => {
    setIsAuthOpen(false);
    setShowCreateAccount(true);
  };

  const handleFarmerDashboard = () => {
    setIsAuthOpen(false);
    setShowFarmerSignIn(true);
  };

  return (
    <>
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center">
              <span className="text-2xl font-bold bg-gradient-to-r from-green-600 to-green-400 bg-clip-text text-transparent">
                FreshLocal
              </span>
            </Link>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <Link to="/farms" className="text-gray-700 hover:text-green-600 font-medium">
                Farms
              </Link>
              <Link to="/products" className="text-gray-700 hover:text-green-600 font-medium">
                Products
              </Link>
              {!isDashboard && (
                <button 
                  onClick={handleFarmerDashboard}
                  className="text-gray-700 hover:text-green-600 font-medium flex items-center"
                >
                  <Tractor className="w-4 h-4 mr-1" />
                  Farmer Dashboard
                </button>
              )}
              <Link to="/about" className="text-gray-700 hover:text-green-600 font-medium">
                About
              </Link>
            </div>

            {/* Right Side Icons */}
            <div className="flex items-center space-x-4">
              <button className="p-2 hover:bg-gray-100 rounded-full">
                <Search className="w-5 h-5 text-gray-600" />
              </button>
              
              {!isDashboard && (
                <>
                  <button 
                    onClick={onWishlistClick}
                    className="p-2 hover:bg-gray-100 rounded-full relative"
                  >
                    <Heart className="w-5 h-5 text-gray-600" />
                    {wishlistCount > 0 && (
                      <span className="absolute -top-1 -right-1 bg-green-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                        {wishlistCount}
                      </span>
                    )}
                  </button>
                  <button 
                    onClick={onCartClick}
                    className="p-2 hover:bg-gray-100 rounded-full relative"
                  >
                    <ShoppingCart className="w-5 h-5 text-gray-600" />
                    {cartItemCount > 0 && (
                      <span className="absolute -top-1 -right-1 bg-green-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                        {cartItemCount}
                      </span>
                    )}
                  </button>
                  
                  {/* Auth Button - Only show for non-dashboard */}
                  <div className="relative">
                    <button
                      onClick={() => setIsAuthOpen(!isAuthOpen)}
                      className="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded-full"
                    >
                      <User className="w-5 h-5 text-gray-600" />
                      <ChevronDown className={`w-4 h-4 text-gray-600 transition-transform ${isAuthOpen ? 'rotate-180' : ''}`} />
                    </button>

                    {/* Auth Dropdown */}
                    {isAuthOpen && (
                      <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg py-2 border border-gray-100">
                        <div className="px-4 py-2 border-b border-gray-100">
                          <h3 className="text-sm font-semibold text-gray-900">Welcome to FreshLocal</h3>
                          <p className="text-xs text-gray-500">Sign in to access your account</p>
                        </div>
                        <div className="py-2">
                          <button 
                            onClick={handleCustomerSignIn}
                            className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 flex items-center"
                          >
                            <User className="w-4 h-4 mr-2" />
                            Sign in as Customer
                          </button>
                          <button 
                            onClick={handleFarmerSignIn}
                            className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 flex items-center"
                          >
                            <Tractor className="w-4 h-4 mr-2" />
                            Sign in as Farmer
                          </button>
                        </div>
                        <div className="px-4 py-2 border-t border-gray-100">
                          <button 
                            onClick={handleCreateAccount}
                            className="w-full px-4 py-2 bg-green-600 text-white rounded-full text-sm hover:bg-green-700 transition-colors"
                          >
                            Create Account
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </>
              )}

              {/* Mobile Menu Button */}
              <button 
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden p-2 hover:bg-gray-100 rounded-full"
              >
                {isMenuOpen ? (
                  <X className="w-5 h-5 text-gray-600" />
                ) : (
                  <Menu className="w-5 h-5 text-gray-600" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-100">
            <div className="px-4 py-2 space-y-1">
              <Link
                to="/farms"
                className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-lg"
                onClick={() => setIsMenuOpen(false)}
              >
                Farms
              </Link>
              <Link
                to="/products"
                className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-lg"
                onClick={() => setIsMenuOpen(false)}
              >
                Products
              </Link>
              {!isDashboard && (
                <button 
                  onClick={() => {
                    handleFarmerDashboard();
                    setIsMenuOpen(false);
                  }}
                  className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-lg flex items-center"
                >
                  <Tractor className="w-4 h-4 mr-2" />
                  Farmer Dashboard
                </button>
              )}
              <Link
                to="/about"
                className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-lg"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>
            </div>
          </div>
        )}
      </nav>

      {/* Auth Modals */}
      {showCustomerSignIn && (
        <CustomerSignIn onClose={() => setShowCustomerSignIn(false)} />
      )}
      {showFarmerSignIn && (
        <FarmerSignIn onClose={() => setShowFarmerSignIn(false)} />
      )}
      {showCreateAccount && (
        <CreateAccount onClose={() => setShowCreateAccount(false)} />
      )}
    </>
  );
}
import React, { useState } from 'react';
import { Mail, Lock, User, Phone, ArrowRight } from 'lucide-react';

export default function CreateAccount({ onClose }) {
  const [isLoading, setIsLoading] = useState(false);
  const [accountType, setAccountType] = useState<'customer' | 'farmer'>('customer');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsLoading(false);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="min-h-screen px-4 text-center">
        <div className="fixed inset-0 bg-black/50 transition-opacity" onClick={onClose} />
        
        <div className="inline-block w-full max-w-md my-8 text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
          <div className="relative p-6">
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-500"
            >
              ×
            </button>

            <div className="w-full flex flex-col items-center justify-center">
              <div className="mb-8 text-center">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Create Account</h2>
                <p className="text-gray-600">Join our community today</p>
              </div>

              <div className="w-full mb-6">
                <div className="flex rounded-lg bg-gray-100 p-1">
                  <button
                    onClick={() => setAccountType('customer')}
                    className={`flex-1 py-2 rounded-md text-sm font-medium transition-colors ${
                      accountType === 'customer'
                        ? 'bg-white text-gray-900 shadow'
                        : 'text-gray-500 hover:text-gray-900'
                    }`}
                  >
                    Customer
                  </button>
                  <button
                    onClick={() => setAccountType('farmer')}
                    className={`flex-1 py-2 rounded-md text-sm font-medium transition-colors ${
                      accountType === 'farmer'
                        ? 'bg-white text-gray-900 shadow'
                        : 'text-gray-500 hover:text-gray-900'
                    }`}
                  >
                    Farmer
                  </button>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="w-full space-y-6">
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="relative">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        First Name
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          required
                          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                          placeholder="John"
                        />
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      </div>
                    </div>
                    <div className="relative">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Last Name
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          required
                          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                          placeholder="Doe"
                        />
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      </div>
                    </div>
                  </div>

                  <div className="relative">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email Address
                    </label>
                    <div className="relative">
                      <input
                        type="email"
                        required
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        placeholder="john@example.com"
                      />
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    </div>
                  </div>

                  <div className="relative">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Phone Number
                    </label>
                    <div className="relative">
                      <input
                        type="tel"
                        required
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        placeholder="+1 (555) 000-0000"
                      />
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    </div>
                  </div>

                  <div className="relative">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Password
                    </label>
                    <div className="relative">
                      <input
                        type="password"
                        required
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        placeholder="Create a strong password"
                      />
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    </div>
                  </div>

                  {accountType === 'farmer' && (
                    <div className="relative">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Farm Name
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          required
                          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                          placeholder="Your farm's name"
                        />
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    required
                    className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                  />
                  <label className="ml-2 block text-sm text-gray-700">
                    I agree to the{' '}
                    <button type="button" className="text-green-600 hover:text-green-500">
                      Terms of Service
                    </button>{' '}
                    and{' '}
                    <button type="button" className="text-green-600 hover:text-green-500">
                      Privacy Policy
                    </button>
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-lg shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors"
                >
                  {isLoading ? (
                    <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      Create Account
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </>
                  )}
                </button>
              </form>

              <p className="mt-4 text-center text-sm text-gray-600">
                Already have an account?{' '}
                <button className="text-green-600 hover:text-green-500 font-medium">
                  Sign In
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
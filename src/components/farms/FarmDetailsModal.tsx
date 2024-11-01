import React, { useState } from 'react';
import { X, MapPin, Star, MessageCircle, Calendar, Leaf, Award } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function FarmDetailsModal({ farm, onClose }) {
  const [activeTab, setActiveTab] = useState('about');
  const navigate = useNavigate();

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 bg-black/50 transition-opacity" onClick={onClose} />

        <div className="inline-block w-full max-w-4xl my-8 text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl overflow-hidden">
          {/* Header Image */}
          <div className="relative h-64">
            <img
              src={farm.image}
              alt={farm.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="absolute bottom-4 left-6 right-6">
              <h2 className="text-3xl font-bold text-white mb-2">{farm.name}</h2>
              <div className="flex items-center space-x-4 text-white">
                <div className="flex items-center">
                  <MapPin className="w-4 h-4 mr-1" />
                  <span>{farm.location}</span>
                </div>
                <div className="flex items-center bg-white/20 backdrop-blur-sm px-2 py-1 rounded-full">
                  <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
                  <span>{farm.rating}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6" aria-label="Tabs">
              <button
                onClick={() => setActiveTab('about')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'about'
                    ? 'border-green-500 text-green-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                About
              </button>
              <button
                onClick={() => setActiveTab('products')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'products'
                    ? 'border-green-500 text-green-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Products & Availability
              </button>
              <button
                onClick={() => setActiveTab('sustainability')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'sustainability'
                    ? 'border-green-500 text-green-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Sustainability
              </button>
            </nav>
          </div>

          {/* Content */}
          <div className="p-6">
            {activeTab === 'about' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-2">About the Farm</h3>
                  <p className="text-gray-600">{farm.description}</p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-2">Certifications</h3>
                  <div className="flex flex-wrap gap-2">
                    {farm.certifications.map((cert) => (
                      <div
                        key={cert}
                        className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm flex items-center"
                      >
                        <Award className="w-4 h-4 mr-1" />
                        {cert.charAt(0).toUpperCase() + cert.slice(1)}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <button
                    onClick={() => {
                      navigate(`/products?farm=${farm.id}`);
                      onClose();
                    }}
                    className="flex items-center px-4 py-2 bg-green-600 text-white rounded-full hover:bg-green-700 transition-colors"
                  >
                    Shop from Farm
                  </button>
                  <button
                    className="flex items-center px-4 py-2 border border-gray-300 rounded-full hover:bg-gray-50 transition-colors"
                  >
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Contact Farmer
                  </button>
                </div>
              </div>
            )}

            {activeTab === 'products' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-4">Available Products</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                      { name: 'Organic Tomatoes', season: 'June - September', price: '$4.99/lb' },
                      { name: 'Fresh Eggs', season: 'Year-round', price: '$6.99/dozen' },
                      { name: 'Raw Honey', season: 'August - October', price: '$12.99/jar' }
                    ].map((product) => (
                      <div
                        key={product.name}
                        className="bg-white border border-gray-200 rounded-lg p-4 hover:border-green-500 transition-colors"
                      >
                        <h4 className="font-medium text-gray-900">{product.name}</h4>
                        <div className="mt-2 flex items-center justify-between text-sm">
                          <div className="flex items-center text-gray-600">
                            <Calendar className="w-4 h-4 mr-1" />
                            {product.season}
                          </div>
                          <span className="font-semibold text-green-600">{product.price}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'sustainability' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-4">Sustainable Practices</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                      {
                        title: 'Water Conservation',
                        description: 'Drip irrigation systems and rainwater harvesting'
                      },
                      {
                        title: 'Soil Health',
                        description: 'Cover cropping and crop rotation'
                      },
                      {
                        title: 'Renewable Energy',
                        description: 'Solar-powered farm operations'
                      },
                      {
                        title: 'Biodiversity',
                        description: 'Native plant corridors and beneficial insect habitats'
                      }
                    ].map((practice) => (
                      <div
                        key={practice.title}
                        className="bg-green-50 p-4 rounded-lg flex items-start space-x-3"
                      >
                        <div className="mt-1">
                          <Leaf className="w-5 h-5 text-green-600" />
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900">{practice.title}</h4>
                          <p className="text-sm text-gray-600">{practice.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
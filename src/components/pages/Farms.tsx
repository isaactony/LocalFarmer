import React, { useState } from 'react';
import { Search, Filter, MapPin, Award, MessageCircle, Calendar } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import FarmDetailsModal from '../farms/FarmDetailsModal';
import { useFarms } from '../../store/FarmsContext';

export default function Farms() {
  const { farms } = useFarms();
  const [selectedFarm, setSelectedFarm] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const filteredFarms = farms.filter(farm =>
    farm.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    farm.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleShopFromFarm = (farmId) => {
    navigate(`/products?farm=${farmId}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Our Local Farms</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover and support local farmers committed to sustainable agriculture and quality produce.
          </p>
        </div>

        {/* Search and Filter */}
        <div className="mb-8">
          <div className="flex gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search farms by name or location..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            <button className="px-4 py-2 border border-gray-200 rounded-lg flex items-center gap-2 hover:bg-gray-50">
              <Filter className="w-5 h-5" />
              <span>Filter</span>
            </button>
          </div>
        </div>

        {/* Farms Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredFarms.map((farm) => (
            <div
              key={farm.id}
              className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-300"
            >
              <div className="relative aspect-video">
                <img
                  src={farm.image}
                  alt={farm.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="flex items-center justify-between text-white">
                    <div className="flex items-center space-x-2">
                      <MapPin className="w-4 h-4" />
                      <span className="text-sm">{farm.location}</span>
                    </div>
                    <div className="flex items-center space-x-1 bg-white/20 backdrop-blur-sm px-2 py-1 rounded-full">
                      <span>★</span>
                      <span>{farm.rating}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">{farm.name}</h3>
                    <p className="text-sm text-gray-600">{farm.specialty}</p>
                  </div>
                  {farm.certifications.includes('organic') && (
                    <div className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full flex items-center">
                      <Award className="w-3 h-3 mr-1" />
                      Organic
                    </div>
                  )}
                </div>

                <p className="text-gray-600 text-sm mb-6 line-clamp-2">
                  {farm.description}
                </p>

                <div className="flex items-center justify-between">
                  <button
                    onClick={() => setSelectedFarm(farm)}
                    className="text-green-600 hover:text-green-700 font-medium text-sm flex items-center"
                  >
                    View Details
                  </button>
                  <button
                    onClick={() => handleShopFromFarm(farm.id)}
                    className="bg-green-600 text-white px-4 py-2 rounded-full text-sm hover:bg-green-700 transition-colors"
                  >
                    Shop from Farm
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Farm Details Modal */}
        {selectedFarm && (
          <FarmDetailsModal
            farm={selectedFarm}
            onClose={() => setSelectedFarm(null)}
          />
        )}
      </div>
    </div>
  );
}
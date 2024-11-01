import React, { useState } from 'react';
import { Search, Filter, MapPin, Award, MessageCircle, Calendar } from 'lucide-react';
import FarmCard from '../farms/FarmCard';
import FarmDetailsModal from '../farms/FarmDetailsModal';
import { farms } from '../../data/farms';

type SortOption = 'rating' | 'name' | 'distance';
type FilterOption = 'organic' | 'local' | 'sustainable' | 'all';

export default function FarmsPage() {
  const [selectedFarm, setSelectedFarm] = useState(null);
  const [sortBy, setSortBy] = useState<SortOption>('rating');
  const [filterBy, setFilterBy] = useState<FilterOption>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredFarms = farms.filter(farm => {
    if (filterBy === 'all') return true;
    return farm.certifications.includes(filterBy);
  }).filter(farm =>
    farm.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    farm.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sortedFarms = [...filteredFarms].sort((a, b) => {
    switch (sortBy) {
      case 'rating':
        return parseFloat(b.rating) - parseFloat(a.rating);
      case 'name':
        return a.name.localeCompare(b.name);
      case 'distance':
        return a.distance - b.distance;
      default:
        return 0;
    }
  });

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      {/* Hero Section */}
      <div className="bg-green-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">Our Local Farm Partners</h1>
          <p className="text-lg text-green-100 max-w-2xl">
            Discover and connect with local farmers committed to sustainable agriculture 
            and bringing you the freshest produce directly from their farms.
          </p>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-white rounded-xl shadow-sm p-4 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search farms by name or location..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              <option value="rating">Sort by Rating</option>
              <option value="name">Sort by Name</option>
              <option value="distance">Sort by Distance</option>
            </select>

            <select
              value={filterBy}
              onChange={(e) => setFilterBy(e.target.value as FilterOption)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              <option value="all">All Farms</option>
              <option value="organic">Organic Certified</option>
              <option value="local">Local (within 50 miles)</option>
              <option value="sustainable">Sustainable Practices</option>
            </select>
          </div>
        </div>

        {/* Farms Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedFarms.map((farm) => (
            <FarmCard
              key={farm.id}
              farm={farm}
              onViewDetails={() => setSelectedFarm(farm)}
            />
          ))}
        </div>
      </div>

      {/* Farm Details Modal */}
      {selectedFarm && (
        <FarmDetailsModal
          farm={selectedFarm}
          onClose={() => setSelectedFarm(null)}
        />
      )}
    </div>
  );
}
import React from 'react';
import { MapPin, Star, Award, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function FarmCard({ farm, onViewDetails }) {
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-300">
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
              <Star className="w-4 h-4 text-yellow-400 fill-current" />
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
            onClick={onViewDetails}
            className="text-green-600 hover:text-green-700 font-medium text-sm flex items-center"
          >
            View Details
            <ArrowRight className="w-4 h-4 ml-1" />
          </button>
          <button
            onClick={() => navigate(`/products?farm=${farm.id}`)}
            className="bg-green-600 text-white px-4 py-2 rounded-full text-sm hover:bg-green-700 transition-colors"
          >
            Shop from Farm
          </button>
        </div>
      </div>
    </div>
  );
}
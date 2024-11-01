import React from 'react';
import { Calendar, Clock } from 'lucide-react';

export default function ProductAvailability({ farmId }) {
  // This would typically fetch from an API
  const products = [
    {
      id: 1,
      name: "Organic Tomatoes",
      category: "Vegetables",
      harvestPeriod: "June - September",
      status: "in-season",
      nextHarvest: "June 15, 2024",
      price: "$4.99/lb"
    },
    {
      id: 2,
      name: "Fresh Eggs",
      category: "Dairy & Eggs",
      harvestPeriod: "Year-round",
      status: "available",
      nextHarvest: "Daily",
      price: "$6.99/dozen"
    },
    // Add more products...
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Product Availability</h3>
        <button className="text-sm text-green-600 hover:text-green-700">
          Subscribe to Updates
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white border border-gray-200 rounded-lg p-4 hover:border-green-500 transition-colors"
          >
            <div className="flex items-start justify-between">
              <div>
                <h4 className="font-medium text-gray-900">{product.name}</h4>
                <p className="text-sm text-gray-600">{product.category}</p>
              </div>
              <div className="text-right">
                <span className="font-semibold text-green-600">{product.price}</span>
              </div>
            </div>

            <div className="mt-4 flex items-center space-x-4 text-sm">
              <div className="flex items-center text-gray-600">
                <Calendar className="w-4 h-4 mr-1" />
                {product.harvestPeriod}
              </div>
              <div className="flex items-center text-gray-600">
                <Clock className="w-4 h-4 mr-1" />
                Next: {product.nextHarvest}
              </div>
            </div>

            <div className="mt-4">
              <span
                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  product.status === 'in-season'
                    ? 'bg-green-100 text-green-800'
                    : product.status === 'available'
                    ? 'bg-blue-100 text-blue-800'
                    : 'bg-gray-100 text-gray-800'
                }`}
              >
                {product.status === 'in-season'
                  ? 'In Season'
                  : product.status === 'available'
                  ? 'Available'
                  : 'Coming Soon'}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
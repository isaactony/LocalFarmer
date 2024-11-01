import React from 'react';
import { TrendingUp, TrendingDown, DollarSign, ShoppingBag } from 'lucide-react';

export default function SalesInsights() {
  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Total Sales</h3>
            <DollarSign className="w-5 h-5 text-green-500" />
          </div>
          <p className="text-3xl font-bold">$12,345</p>
          <div className="flex items-center mt-2 text-sm">
            <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
            <span className="text-green-500">+15%</span>
            <span className="text-gray-500 ml-1">vs last month</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Orders</h3>
            <ShoppingBag className="w-5 h-5 text-blue-500" />
          </div>
          <p className="text-3xl font-bold">256</p>
          <div className="flex items-center mt-2 text-sm">
            <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
            <span className="text-green-500">+8%</span>
            <span className="text-gray-500 ml-1">vs last month</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Average Order</h3>
            <DollarSign className="w-5 h-5 text-purple-500" />
          </div>
          <p className="text-3xl font-bold">$48.25</p>
          <div className="flex items-center mt-2 text-sm">
            <TrendingDown className="w-4 h-4 text-red-500 mr-1" />
            <span className="text-red-500">-3%</span>
            <span className="text-gray-500 ml-1">vs last month</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Customers</h3>
            <ShoppingBag className="w-5 h-5 text-orange-500" />
          </div>
          <p className="text-3xl font-bold">1,234</p>
          <div className="flex items-center mt-2 text-sm">
            <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
            <span className="text-green-500">+12%</span>
            <span className="text-gray-500 ml-1">vs last month</span>
          </div>
        </div>
      </div>

      {/* Sales Chart */}
      <div className="bg-white p-6 rounded-xl shadow-sm">
        <h3 className="text-lg font-semibold mb-4">Sales Overview</h3>
        <div className="h-64 flex items-end justify-between space-x-2">
          {/* Placeholder for chart - in a real app, use a charting library */}
          {Array.from({ length: 12 }).map((_, i) => (
            <div
              key={i}
              className="bg-green-100 hover:bg-green-200 transition-colors rounded-t w-full"
              style={{
                height: `${Math.random() * 100}%`,
              }}
            />
          ))}
        </div>
        <div className="flex justify-between mt-4 text-sm text-gray-600">
          <span>Jan</span>
          <span>Feb</span>
          <span>Mar</span>
          <span>Apr</span>
          <span>May</span>
          <span>Jun</span>
          <span>Jul</span>
          <span>Aug</span>
          <span>Sep</span>
          <span>Oct</span>
          <span>Nov</span>
          <span>Dec</span>
        </div>
      </div>

      {/* Top Products */}
      <div className="bg-white p-6 rounded-xl shadow-sm">
        <h3 className="text-lg font-semibold mb-4">Top Products</h3>
        <div className="space-y-4">
          {[
            { name: 'Organic Tomatoes', sales: 234, revenue: 1168 },
            { name: 'Fresh Eggs', sales: 187, revenue: 1308 },
            { name: 'Raw Honey', sales: 156, revenue: 2027 },
          ].map((product, index) => (
            <div key={index} className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900">{product.name}</p>
                <p className="text-sm text-gray-500">{product.sales} sales</p>
              </div>
              <div className="text-right">
                <p className="font-medium text-gray-900">${product.revenue}</p>
                <div className="w-32 h-2 bg-gray-100 rounded-full mt-1">
                  <div
                    className="h-full bg-green-500 rounded-full"
                    style={{ width: `${(product.sales / 234) * 100}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
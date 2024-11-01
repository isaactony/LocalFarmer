import React, { useState } from 'react';
import { BarChart3, Package, MessageCircle, Bell, Settings, Users, TrendingUp, Calendar, Store, Tractor } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import InventoryManagement from './InventoryManagement';
import SalesInsights from './SalesInsights';
import CustomerMessages from './CustomerMessages';
import OrderManagement from './OrderManagement';
import SettingsPanel from './Settings';

type TabType = 'overview' | 'inventory' | 'orders' | 'messages' | 'insights' | 'settings';

export default function FarmerDashboard() {
  const [activeTab, setActiveTab] = useState<TabType>('overview');
  const navigate = useNavigate();

  const renderContent = () => {
    switch (activeTab) {
      case 'inventory':
        return <InventoryManagement />;
      case 'insights':
        return <SalesInsights />;
      case 'messages':
        return <CustomerMessages />;
      case 'orders':
        return <OrderManagement />;
      case 'settings':
        return <SettingsPanel />;
      default:
        return (
          <div className="space-y-6">
            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">Today's Sales</h3>
                  <TrendingUp className="w-5 h-5 text-green-500" />
                </div>
                <p className="text-3xl font-bold">$1,234</p>
                <div className="flex items-center mt-2 text-sm">
                  <span className="text-green-500">+15%</span>
                  <span className="text-gray-500 ml-1">vs yesterday</span>
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">New Orders</h3>
                  <Package className="w-5 h-5 text-blue-500" />
                </div>
                <p className="text-3xl font-bold">12</p>
                <div className="flex items-center mt-2 text-sm">
                  <span className="text-green-500">+5</span>
                  <span className="text-gray-500 ml-1">since last hour</span>
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">Active Customers</h3>
                  <Users className="w-5 h-5 text-purple-500" />
                </div>
                <p className="text-3xl font-bold">48</p>
                <div className="flex items-center mt-2 text-sm">
                  <span className="text-green-500">+12%</span>
                  <span className="text-gray-500 ml-1">this week</span>
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">Messages</h3>
                  <MessageCircle className="w-5 h-5 text-orange-500" />
                </div>
                <p className="text-3xl font-bold">5</p>
                <div className="flex items-center mt-2 text-sm">
                  <span className="text-yellow-500">3 unread</span>
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
              <div className="space-y-4">
                {[
                  {
                    type: 'order',
                    message: 'New order #1234 received',
                    time: '5 minutes ago',
                    icon: <Package className="w-5 h-5 text-blue-500" />
                  },
                  {
                    type: 'message',
                    message: 'Customer inquiry about organic tomatoes',
                    time: '15 minutes ago',
                    icon: <MessageCircle className="w-5 h-5 text-green-500" />
                  },
                  {
                    type: 'inventory',
                    message: 'Low stock alert: Fresh Eggs',
                    time: '1 hour ago',
                    icon: <Bell className="w-5 h-5 text-red-500" />
                  }
                ].map((activity, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="p-2 bg-gray-50 rounded-lg">
                      {activity.icon}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-900">{activity.message}</p>
                      <p className="text-xs text-gray-500">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <button
                onClick={() => setActiveTab('inventory')}
                className="p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow"
              >
                <Store className="w-8 h-8 text-green-500 mb-4" />
                <h3 className="text-lg font-semibold mb-2">Manage Inventory</h3>
                <p className="text-sm text-gray-600">Update products and stock levels</p>
              </button>

              <button
                onClick={() => setActiveTab('orders')}
                className="p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow"
              >
                <Package className="w-8 h-8 text-blue-500 mb-4" />
                <h3 className="text-lg font-semibold mb-2">Process Orders</h3>
                <p className="text-sm text-gray-600">View and manage customer orders</p>
              </button>

              <button
                onClick={() => setActiveTab('messages')}
                className="p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow"
              >
                <MessageCircle className="w-8 h-8 text-purple-500 mb-4" />
                <h3 className="text-lg font-semibold mb-2">Customer Messages</h3>
                <p className="text-sm text-gray-600">Respond to customer inquiries</p>
              </button>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      {/* Sidebar */}
      <div className="fixed left-0 top-16 h-full w-64 bg-white border-r border-gray-200 p-4">
        <div className="space-y-1">
          <button
            onClick={() => setActiveTab('overview')}
            className={`w-full flex items-center space-x-3 px-4 py-2 rounded-lg ${
              activeTab === 'overview'
                ? 'bg-green-50 text-green-600'
                : 'text-gray-700 hover:bg-gray-50'
            }`}
          >
            <BarChart3 className="w-5 h-5" />
            <span>Overview</span>
          </button>

          <button
            onClick={() => setActiveTab('inventory')}
            className={`w-full flex items-center space-x-3 px-4 py-2 rounded-lg ${
              activeTab === 'inventory'
                ? 'bg-green-50 text-green-600'
                : 'text-gray-700 hover:bg-gray-50'
            }`}
          >
            <Store className="w-5 h-5" />
            <span>Inventory</span>
          </button>

          <button
            onClick={() => setActiveTab('orders')}
            className={`w-full flex items-center space-x-3 px-4 py-2 rounded-lg ${
              activeTab === 'orders'
                ? 'bg-green-50 text-green-600'
                : 'text-gray-700 hover:bg-gray-50'
            }`}
          >
            <Package className="w-5 h-5" />
            <span>Orders</span>
          </button>

          <button
            onClick={() => setActiveTab('messages')}
            className={`w-full flex items-center space-x-3 px-4 py-2 rounded-lg ${
              activeTab === 'messages'
                ? 'bg-green-50 text-green-600'
                : 'text-gray-700 hover:bg-gray-50'
            }`}
          >
            <MessageCircle className="w-5 h-5" />
            <span>Messages</span>
          </button>

          <button
            onClick={() => setActiveTab('insights')}
            className={`w-full flex items-center space-x-3 px-4 py-2 rounded-lg ${
              activeTab === 'insights'
                ? 'bg-green-50 text-green-600'
                : 'text-gray-700 hover:bg-gray-50'
            }`}
          >
            <TrendingUp className="w-5 h-5" />
            <span>Insights</span>
          </button>

          <button
            onClick={() => setActiveTab('settings')}
            className={`w-full flex items-center space-x-3 px-4 py-2 rounded-lg ${
              activeTab === 'settings'
                ? 'bg-green-50 text-green-600'
                : 'text-gray-700 hover:bg-gray-50'
            }`}
          >
            <Settings className="w-5 h-5" />
            <span>Settings</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="ml-64 p-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">
            {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
          </h1>
        </div>
        {renderContent()}
      </div>
    </div>
  );
}
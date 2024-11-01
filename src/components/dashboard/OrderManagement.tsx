import React, { useState } from 'react';
import { X, Package, Clock, TrendingUp } from 'lucide-react';

type OrderDetails = {
  id: string;
  customer: string;
  items: Array<{ name: string; quantity: number; price: number }>;
  total: number;
  status: string;
  date: string;
  shippingAddress: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  customerEmail: string;
  customerPhone: string;
  paymentMethod: string;
  notes?: string;
};

export default function OrderManagement() {
  const [selectedOrder, setSelectedOrder] = useState<OrderDetails | null>(null);
  const [showOrderDetails, setShowOrderDetails] = useState(false);
  const [showUpdateStatus, setShowUpdateStatus] = useState(false);

  // Expanded orders data with more details
  const orders: OrderDetails[] = [
    {
      id: '#ORD-001',
      customer: 'John Doe',
      items: [
        { name: 'Organic Tomatoes', quantity: 2, price: 4.99 },
        { name: 'Fresh Eggs', quantity: 1, price: 6.99 }
      ],
      total: 16.97,
      status: 'pending',
      date: '2024-03-10',
      shippingAddress: {
        street: '123 Main St',
        city: 'Springfield',
        state: 'IL',
        zipCode: '62701',
        country: 'USA'
      },
      customerEmail: 'john.doe@example.com',
      customerPhone: '(555) 123-4567',
      paymentMethod: 'Credit Card',
      notes: 'Please leave at front door'
    }
  ];

  const handleViewOrder = (order: OrderDetails) => {
    setSelectedOrder(order);
    setShowOrderDetails(true);
  };

  const handleUpdateOrder = (order: OrderDetails) => {
    setSelectedOrder(order);
    setShowUpdateStatus(true);
  };

  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">New Orders</h3>
            <Package className="w-5 h-5 text-blue-500" />
          </div>
          <p className="text-3xl font-bold">12</p>
          <p className="text-sm text-gray-500">Today</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Processing</h3>
            <Clock className="w-5 h-5 text-yellow-500" />
          </div>
          <p className="text-3xl font-bold">8</p>
          <p className="text-sm text-gray-500">Orders in progress</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Completed</h3>
            <TrendingUp className="w-5 h-5 text-green-500" />
          </div>
          <p className="text-3xl font-bold">45</p>
          <p className="text-sm text-gray-500">This week</p>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold">Recent Orders</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Order ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Customer</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Total</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {orders.map((order) => (
                <tr key={order.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{order.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{order.customer}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.date}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      order.status === 'pending'
                        ? 'bg-yellow-100 text-yellow-800'
                        : order.status === 'processing'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-green-100 text-green-800'
                    }`}>
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${order.total.toFixed(2)}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <button 
                      onClick={() => handleViewOrder(order)}
                      className="text-green-600 hover:text-green-700 mr-3"
                    >
                      View
                    </button>
                    <button 
                      onClick={() => handleUpdateOrder(order)}
                      className="text-blue-600 hover:text-blue-700"
                    >
                      Update
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Order Details Modal */}
      {showOrderDetails && selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Order Details {selectedOrder.id}</h3>
              <button onClick={() => setShowOrderDetails(false)}>
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium mb-2">Customer Information</h4>
                  <p className="text-sm text-gray-600">{selectedOrder.customer}</p>
                  <p className="text-sm text-gray-600">{selectedOrder.customerEmail}</p>
                  <p className="text-sm text-gray-600">{selectedOrder.customerPhone}</p>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Shipping Address</h4>
                  <p className="text-sm text-gray-600">{selectedOrder.shippingAddress.street}</p>
                  <p className="text-sm text-gray-600">
                    {selectedOrder.shippingAddress.city}, {selectedOrder.shippingAddress.state} {selectedOrder.shippingAddress.zipCode}
                  </p>
                  <p className="text-sm text-gray-600">{selectedOrder.shippingAddress.country}</p>
                </div>
              </div>

              <div>
                <h4 className="font-medium mb-2">Order Items</h4>
                <table className="min-w-full divide-y divide-gray-200">
                  <thead>
                    <tr>
                      <th className="text-left text-xs font-medium text-gray-500 uppercase">Item</th>
                      <th className="text-left text-xs font-medium text-gray-500 uppercase">Quantity</th>
                      <th className="text-left text-xs font-medium text-gray-500 uppercase">Price</th>
                      <th className="text-left text-xs font-medium text-gray-500 uppercase">Total</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {selectedOrder.items.map((item, index) => (
                      <tr key={index}>
                        <td className="py-2">{item.name}</td>
                        <td className="py-2">{item.quantity}</td>
                        <td className="py-2">${item.price.toFixed(2)}</td>
                        <td className="py-2">${(item.quantity * item.price).toFixed(2)}</td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr>
                      <td colSpan={3} className="text-right font-medium py-2">Total:</td>
                      <td className="py-2">${selectedOrder.total.toFixed(2)}</td>
                    </tr>
                  </tfoot>
                </table>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium mb-2">Payment Information</h4>
                  <p className="text-sm text-gray-600">Method: {selectedOrder.paymentMethod}</p>
                  <p className="text-sm text-gray-600">Status: Paid</p>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Additional Notes</h4>
                  <p className="text-sm text-gray-600">{selectedOrder.notes || 'No notes provided'}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Update Status Modal */}
      {showUpdateStatus && selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Update Order Status</h3>
              <button onClick={() => setShowUpdateStatus(false)}>
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Order Status
                </label>
                <select
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  defaultValue={selectedOrder.status}
                >
                  <option value="pending">Pending</option>
                  <option value="processing">Processing</option>
                  <option value="shipped">Shipped</option>
                  <option value="delivered">Delivered</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Update Notes
                </label>
                <textarea
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  rows={3}
                  placeholder="Add any notes about this status update..."
                />
              </div>

              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => setShowUpdateStatus(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    // Handle status update logic here
                    setShowUpdateStatus(false);
                  }}
                  className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                >
                  Update Status
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
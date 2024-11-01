import React, { useState } from 'react';
import { MessageCircle, User, Clock, X, Send, Search } from 'lucide-react';

const messages = [
  {
    id: 1,
    customer: 'John Doe',
    message: 'Hi, I was wondering if you have any organic tomatoes available this week?',
    timestamp: '10 minutes ago',
    unread: true,
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80'
  },
  {
    id: 2,
    customer: 'Jane Smith',
    message: 'When will the next batch of honey be available?',
    timestamp: '1 hour ago',
    unread: true,
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80'
  },
  {
    id: 3,
    customer: 'Mike Johnson',
    message: 'Thank you for the fresh eggs! They were delicious.',
    timestamp: '2 hours ago',
    unread: false,
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80'
  }
];

export default function CustomerMessages() {
  const [showComposeModal, setShowComposeModal] = useState(false);
  const [showReplyModal, setShowReplyModal] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [newMessage, setNewMessage] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState('');

  const templates = {
    availability: "Thank you for your interest. The product will be available on [DATE]. Would you like me to notify you when it's in stock?",
    orderConfirmation: "Your order has been confirmed and will be delivered on [DATE]. Thank you for choosing our farm!",
    thankYou: "Thank you for your feedback! We're glad you enjoyed our products. Your support means a lot to us.",
    outOfStock: "I apologize, but the item you're interested in is currently out of stock. We expect to have more available by [DATE]."
  };

  const handleCompose = () => {
    setShowComposeModal(true);
  };

  const handleReply = (message) => {
    setSelectedMessage(message);
    setShowReplyModal(true);
  };

  const handleSendMessage = () => {
    // Here you would typically send the message to your backend
    console.log('Sending message:', newMessage);
    setNewMessage('');
    setShowComposeModal(false);
    setShowReplyModal(false);
    setSelectedMessage(null);
  };

  const filteredMessages = messages.filter(message =>
    message.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
    message.message.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header with Search */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-semibold">Customer Messages</h2>
          <p className="text-sm text-gray-500">You have {messages.filter(m => m.unread).length} unread messages</p>
        </div>
        <div className="flex gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search messages..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>
          <button
            onClick={handleCompose}
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2"
          >
            <MessageCircle className="w-5 h-5" />
            Compose Message
          </button>
        </div>
      </div>

      {/* Messages List */}
      <div className="bg-white rounded-xl shadow-sm divide-y divide-gray-200">
        {filteredMessages.map((message) => (
          <div
            key={message.id}
            className={`p-4 hover:bg-gray-50 transition-colors ${
              message.unread ? 'bg-green-50' : ''
            }`}
          >
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <img
                  src={message.avatar}
                  alt={message.customer}
                  className="w-10 h-10 rounded-full object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-gray-900">
                    {message.customer}
                  </p>
                  <div className="flex items-center text-sm text-gray-500">
                    <Clock className="w-4 h-4 mr-1" />
                    {message.timestamp}
                  </div>
                </div>
                <p className="mt-1 text-sm text-gray-600">{message.message}</p>
                <div className="mt-2 flex space-x-2">
                  <button
                    onClick={() => handleReply(message)}
                    className="text-sm text-green-600 hover:text-green-700 font-medium flex items-center gap-1"
                  >
                    <Send className="w-4 h-4" />
                    Reply
                  </button>
                  <button className="text-sm text-gray-600 hover:text-gray-700">
                    Mark as {message.unread ? 'Read' : 'Unread'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Reply Templates */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h3 className="text-lg font-semibold mb-4">Quick Reply Templates</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Object.entries(templates).map(([key, template]) => (
            <button
              key={key}
              onClick={() => {
                setSelectedTemplate(template);
                setNewMessage(template);
                setShowComposeModal(true);
              }}
              className="text-left p-4 rounded-lg hover:bg-gray-50 transition-colors border border-gray-200 hover:border-green-500"
            >
              <p className="font-medium text-gray-900 mb-1">
                {key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')}
              </p>
              <p className="text-sm text-gray-500 line-clamp-2">{template}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Compose/Reply Modal */}
      {(showComposeModal || showReplyModal) && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">
                {showReplyModal ? `Reply to ${selectedMessage.customer}` : 'New Message'}
              </h3>
              <button
                onClick={() => {
                  setShowComposeModal(false);
                  setShowReplyModal(false);
                  setSelectedMessage(null);
                  setNewMessage('');
                }}
                className="text-gray-400 hover:text-gray-500"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {showComposeModal && (
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  To
                </label>
                <input
                  type="text"
                  placeholder="Customer email or name"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
            )}

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Message
              </label>
              <textarea
                rows={6}
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type your message here..."
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>

            <div className="flex justify-end space-x-3">
              <button
                onClick={() => {
                  setShowComposeModal(false);
                  setShowReplyModal(false);
                  setSelectedMessage(null);
                  setNewMessage('');
                }}
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleSendMessage}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center gap-2"
              >
                <Send className="w-4 h-4" />
                Send Message
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
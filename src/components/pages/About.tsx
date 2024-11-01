import React from 'react';
import { Leaf, Users, Truck, Shield } from 'lucide-react';

export default function About() {
  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-green-600 to-green-500 text-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">About FreshLocal</h1>
          <p className="text-lg text-green-100 max-w-2xl">
            Connecting local farmers with conscious consumers for a sustainable food future.
          </p>
        </div>
      </div>

      {/* Mission Section */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
            <p className="text-gray-600 text-lg leading-relaxed mb-6">
              At FreshLocal, we're on a mission to revolutionize the way people access fresh, local produce. 
              By connecting farmers directly with consumers, we're creating a more sustainable and 
              transparent food system that benefits everyone.
            </p>
            <p className="text-gray-600 text-lg leading-relaxed">
              We believe in supporting local agriculture, reducing food miles, and ensuring 
              fair prices for both farmers and consumers.
            </p>
          </div>
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80"
              alt="Local farming"
              className="rounded-lg shadow-lg"
            />
          </div>
        </div>
      </div>

      {/* Values Section */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Leaf className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Sustainability</h3>
              <p className="text-gray-600">
                Promoting eco-friendly farming practices and reducing environmental impact.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Community</h3>
              <p className="text-gray-600">
                Building strong connections between farmers and consumers.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Truck className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Local Focus</h3>
              <p className="text-gray-600">
                Supporting local agriculture and reducing food miles.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Quality</h3>
              <p className="text-gray-600">
                Ensuring the highest standards for all products.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold mb-12 text-center">Our Team</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[1, 2, 3].map((member) => (
            <div key={member} className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="aspect-w-1 aspect-h-1">
                <img
                  src={`https://images.unsplash.com/photo-${1500382017468 + member}-9049fed747ef?auto=format&fit=crop&q=80`}
                  alt="Team member"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-1">Team Member {member}</h3>
                <p className="text-gray-600 mb-4">Position</p>
                <p className="text-gray-600 text-sm">
                  Brief description about the team member and their role in the company.
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
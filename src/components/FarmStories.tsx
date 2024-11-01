import React, { useState, useRef } from 'react';
import { ChevronLeft, ChevronRight, MapPin, Star } from 'lucide-react';

const farms = [
  {
    id: 1,
    name: "Miller's Family Farm",
    description: "Three generations of sustainable farming practices, specializing in heirloom vegetables and fruits.",
    image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80",
    location: "Vermont, USA",
    specialty: "Heirloom Vegetables",
    rating: "4.9"
  },
  {
    id: 2,
    name: "Green Valley Organics",
    description: "Certified organic farm focusing on regenerative agriculture and biodiversity.",
    image: "https://images.unsplash.com/photo-1500076656116-558758c991c1?auto=format&fit=crop&q=80",
    location: "California, USA",
    specialty: "Organic Produce",
    rating: "4.8"
  },
  {
    id: 3,
    name: "Sunny Bee Apiaries",
    description: "Family-owned apiary producing pure, raw honey through sustainable beekeeping practices.",
    image: "https://images.unsplash.com/photo-1587049352847-81a56d773cae?auto=format&fit=crop&q=80",
    location: "Oregon, USA",
    specialty: "Raw Honey",
    rating: "4.9"
  },
  {
    id: 4,
    name: "Happy Hens Farm",
    description: "Free-range poultry farm committed to animal welfare and producing the highest quality eggs.",
    image: "https://images.unsplash.com/photo-1516467508483-a7212febe31a?auto=format&fit=crop&q=80",
    location: "Texas, USA",
    specialty: "Free-Range Eggs",
    rating: "4.7"
  }
];

export default function FarmStories({ onVisitFarm }: { onVisitFarm: (id: number) => void }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const sliderRef = useRef<HTMLDivElement>(null);

  const scrollToFarm = (index: number) => {
    setCurrentIndex(index);
    sliderRef.current?.children[index]?.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
      inline: 'start'
    });
  };

  const nextFarm = () => {
    scrollToFarm((currentIndex + 1) % farms.length);
  };

  const prevFarm = () => {
    scrollToFarm((currentIndex - 1 + farms.length) % farms.length);
  };

  return (
    <section id="farmers" className="py-24 bg-gradient-to-b from-white to-gray-50 relative overflow-hidden">
      {/* Background blur circles for glass morphism effect */}
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-green-200 rounded-full filter blur-3xl opacity-20" />
      <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-blue-200 rounded-full filter blur-3xl opacity-20" />
      
      <div className="max-w-7xl mx-auto px-4 relative">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Meet Our Local Farmers</h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Get to know the passionate individuals behind your fresh, local produce
          </p>
        </div>
        
        <div className="relative">
          <button
            onClick={prevFarm}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-white/80 backdrop-blur-md shadow-lg hover:bg-white/90 transition-all duration-300 border border-white/20"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          
          <button
            onClick={nextFarm}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-white/80 backdrop-blur-md shadow-lg hover:bg-white/90 transition-all duration-300 border border-white/20"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          <div 
            ref={sliderRef}
            className="flex overflow-x-hidden snap-x snap-mandatory"
          >
            {farms.map((farm, index) => (
              <div
                key={farm.id}
                className="min-w-full snap-start px-4"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                  <div className="relative aspect-w-16 aspect-h-9 rounded-2xl overflow-hidden group">
                    <img
                      src={farm.image}
                      alt={farm.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4 p-4 bg-white/10 backdrop-blur-md rounded-xl border border-white/20">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <MapPin className="w-4 h-4 text-white" />
                          <span className="text-white font-medium">{farm.location}</span>
                        </div>
                        <div className="flex items-center bg-white/20 backdrop-blur px-3 py-1 rounded-full">
                          <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
                          <span className="text-white font-medium">{farm.rating}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-6 bg-white/50 backdrop-blur-md p-8 rounded-2xl border border-white/20 shadow-xl">
                    <div>
                      <h3 className="text-3xl font-bold text-gray-900 mb-2">{farm.name}</h3>
                      <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                        {farm.specialty}
                      </div>
                    </div>
                    <p className="text-gray-600 text-lg leading-relaxed">{farm.description}</p>
                    <div className="flex space-x-4">
                      <button 
                        onClick={() => onVisitFarm(farm.id)}
                        className="bg-green-600/90 backdrop-blur-md text-white px-6 py-3 rounded-full font-semibold hover:bg-green-600 transition-colors shadow-lg hover:shadow-green-500/25"
                      >
                        Visit Farm
                      </button>
                      <button className="bg-white/80 backdrop-blur-md text-gray-700 px-6 py-3 rounded-full font-semibold hover:bg-white transition-colors shadow-lg border border-gray-200">
                        Learn More
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="flex justify-center mt-8 space-x-2">
            {farms.map((_, index) => (
              <button
                key={index}
                onClick={() => scrollToFarm(index)}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                  currentIndex === index 
                    ? 'bg-green-600 w-8' 
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
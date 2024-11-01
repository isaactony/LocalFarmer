import React, { createContext, useContext } from 'react';

export type Farm = {
  id: number;
  name: string;
  description: string;
  image: string;
  location: string;
  specialty: string;
  rating: number;
  certifications: string[];
};

const farms: Farm[] = [
  {
    id: 1,
    name: "Miller's Family Farm",
    description: "Three generations of sustainable farming practices, specializing in heirloom vegetables and fruits.",
    image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80",
    location: "Vermont",
    specialty: "Heirloom Vegetables",
    rating: 4.8,
    certifications: ["organic", "sustainable"]
  },
  {
    id: 2,
    name: "Green Valley Organics",
    description: "Certified organic farm focusing on regenerative agriculture and biodiversity.",
    image: "https://images.unsplash.com/photo-1500076656116-558758c991c1?auto=format&fit=crop&q=80",
    location: "California",
    specialty: "Organic Produce",
    rating: 4.9,
    certifications: ["organic", "biodynamic"]
  },
  {
    id: 3,
    name: "Sunny Bee Apiaries",
    description: "Family-owned apiary producing pure, raw honey through sustainable beekeeping practices.",
    image: "https://images.unsplash.com/photo-1587049352847-81a56d773cae?auto=format&fit=crop&q=80",
    location: "Oregon",
    specialty: "Raw Honey",
    rating: 4.7,
    certifications: ["organic"]
  },
  {
    id: 4,
    name: "Happy Hens Farm",
    description: "Free-range poultry farm committed to animal welfare and producing the highest quality eggs.",
    image: "https://images.unsplash.com/photo-1516467508483-a7212febe31a?auto=format&fit=crop&q=80",
    location: "Washington",
    specialty: "Free-Range Eggs",
    rating: 4.9,
    certifications: ["humane", "organic"]
  }
];

const FarmsContext = createContext<{
  farms: Farm[];
  getFarmById: (id: number) => Farm | undefined;
} | undefined>(undefined);

export function FarmsProvider({ children }: { children: React.ReactNode }) {
  const getFarmById = (id: number) => {
    return farms.find(farm => farm.id === id);
  };

  return (
    <FarmsContext.Provider value={{ farms, getFarmById }}>
      {children}
    </FarmsContext.Provider>
  );
}

export function useFarms() {
  const context = useContext(FarmsContext);
  if (context === undefined) {
    throw new Error('useFarms must be used within a FarmsProvider');
  }
  return context;
}
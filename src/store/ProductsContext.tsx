import React, { createContext, useContext } from 'react';

export type Product = {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
  farm: {
    id: number;
    name: string;
  };
  category: string;
  organic: boolean;
  inStock: boolean;
};

const products: Product[] = [
  {
    id: 1,
    name: "Fresh Organic Tomatoes",
    price: 4.99,
    image: "https://images.unsplash.com/photo-1592924357228-91a4daadcfca?auto=format&fit=crop&q=80",
    description: "Locally grown organic tomatoes, perfect for salads and cooking.",
    farm: {
      id: 1,
      name: "Miller's Family Farm"
    },
    category: "Vegetables",
    organic: true,
    inStock: true
  },
  {
    id: 2,
    name: "Farm Fresh Eggs",
    price: 6.99,
    image: "https://images.unsplash.com/photo-1506976785307-8732e854ad03?auto=format&fit=crop&q=80",
    description: "Free-range eggs from happy hens.",
    farm: {
      id: 4,
      name: "Happy Hens Farm"
    },
    category: "Dairy & Eggs",
    organic: true,
    inStock: true
  },
  {
    id: 3,
    name: "Raw Honey",
    price: 12.99,
    image: "https://images.unsplash.com/photo-1587049352847-81a56d773cae?auto=format&fit=crop&q=80",
    description: "Pure, unfiltered honey from local wildflowers.",
    farm: {
      id: 3,
      name: "Sunny Bee Apiaries"
    },
    category: "Honey",
    organic: true,
    inStock: true
  },
  {
    id: 4,
    name: "Organic Spinach",
    price: 3.99,
    image: "https://images.unsplash.com/photo-1576045057995-568f588f82fb?auto=format&fit=crop&q=80",
    description: "Fresh organic spinach leaves.",
    farm: {
      id: 2,
      name: "Green Valley Organics"
    },
    category: "Vegetables",
    organic: true,
    inStock: true
  },
  {
    id: 5,
    name: "Heirloom Carrots",
    price: 4.49,
    image: "https://images.unsplash.com/photo-1447175008436-054170c2e979?auto=format&fit=crop&q=80",
    description: "Multi-colored organic heirloom carrots.",
    farm: {
      id: 1,
      name: "Miller's Family Farm"
    },
    category: "Vegetables",
    organic: true,
    inStock: true
  },
  {
    id: 6,
    name: "Fresh Strawberries",
    price: 5.99,
    image: "https://images.unsplash.com/photo-1464965911861-746a04b4bca6?auto=format&fit=crop&q=80",
    description: "Sweet and juicy organic strawberries.",
    farm: {
      id: 2,
      name: "Green Valley Organics"
    },
    category: "Fruits",
    organic: true,
    inStock: true
  }
];

const ProductsContext = createContext<{
  products: Product[];
  getProductsByFarm: (farmId: number | null) => Product[];
  getFeaturedProducts: () => Product[];
} | undefined>(undefined);

export function ProductsProvider({ children }: { children: React.ReactNode }) {
  const getProductsByFarm = (farmId: number | null) => {
    if (!farmId) return products;
    return products.filter(product => product.farm.id === farmId);
  };

  const getFeaturedProducts = () => {
    return products.slice(0, 4);
  };

  return (
    <ProductsContext.Provider value={{ products, getProductsByFarm, getFeaturedProducts }}>
      {children}
    </ProductsContext.Provider>
  );
}

export function useProducts() {
  const context = useContext(ProductsContext);
  if (context === undefined) {
    throw new Error('useProducts must be used within a ProductsProvider');
  }
  return context;
}
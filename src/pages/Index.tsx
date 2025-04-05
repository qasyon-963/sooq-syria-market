
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import ProductCard from '@/components/ProductCard';
import CategoryFilter from '@/components/CategoryFilter';
import { Button } from '@/components/ui/button';
import { Filter } from 'lucide-react';

// Mock data
const categories = [
  { id: 'electronics', name: 'Electronics' },
  { id: 'furniture', name: 'Furniture' },
  { id: 'clothing', name: 'Clothing' },
  { id: 'vehicles', name: 'Vehicles' },
  { id: 'toys', name: 'Toys' },
  { id: 'books', name: 'Books' },
];

const products = [
  {
    id: '1',
    name: 'Apple MacBook Pro',
    price: 1299,
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
    condition: 'used' as const,
    location: 'Damascus, Syria',
    category: 'electronics',
  },
  {
    id: '2',
    name: 'Samsung Galaxy S21',
    price: 799,
    image: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
    condition: 'new' as const,
    location: 'Aleppo, Syria',
    category: 'electronics',
  },
  {
    id: '3',
    name: 'Wooden Dining Table',
    price: 350,
    image: 'https://images.unsplash.com/photo-1530018607912-eff2daa1bac4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
    condition: 'used' as const,
    location: 'Homs, Syria',
    category: 'furniture',
  },
  {
    id: '4',
    name: 'Leather Jacket',
    price: 120,
    image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
    condition: 'new' as const,
    location: 'Latakia, Syria',
    category: 'clothing',
  },
  {
    id: '5',
    name: 'Honda Civic 2018',
    price: 15000,
    image: 'https://images.unsplash.com/photo-1533106418989-88406c7cc8ca?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
    condition: 'used' as const,
    location: 'Damascus, Syria',
    category: 'vehicles',
  },
  {
    id: '6',
    name: 'LEGO Star Wars Set',
    price: 79.99,
    image: 'https://images.unsplash.com/photo-1563901935883-cb9fb1be74b4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
    condition: 'new' as const,
    location: 'Aleppo, Syria',
    category: 'toys',
  },
  {
    id: '7',
    name: 'Harry Potter Book Collection',
    price: 89.99,
    image: 'https://images.unsplash.com/photo-1551269901-5c5e14c25df7?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
    condition: 'used' as const,
    location: 'Homs, Syria',
    category: 'books',
  },
  {
    id: '8',
    name: 'Wireless Headphones',
    price: 129.99,
    image: 'https://images.unsplash.com/photo-1578319439584-104c94d37305?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
    condition: 'new' as const,
    location: 'Latakia, Syria',
    category: 'electronics',
  },
];

const Index = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  
  const filteredProducts = selectedCategory 
    ? products.filter(product => product.category === selectedCategory)
    : products;
  
  return (
    <Layout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">Browse Products</h1>
        <p className="text-gray-600">Find great deals on products in Syria</p>
      </div>
      
      <div className="flex justify-between items-center mb-4">
        <CategoryFilter 
          categories={categories}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />
        
        <Button variant="outline" size="sm" className="flex items-center gap-1">
          <Filter size={16} />
          <span className="hidden sm:inline">Filter</span>
        </Button>
      </div>
      
      <div className="product-grid">
        {filteredProducts.map((product) => (
          <ProductCard
            key={product.id}
            id={product.id}
            name={product.name}
            price={product.price}
            image={product.image}
            condition={product.condition}
            location={product.location}
          />
        ))}
      </div>
    </Layout>
  );
};

export default Index;

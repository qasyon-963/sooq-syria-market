
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import ProductCard from '@/components/ProductCard';
import CategoryFilter from '@/components/CategoryFilter';
import { Button } from '@/components/ui/button';
import { Filter } from 'lucide-react';

// Mock data
const categories = [
  { id: 'electronics', name: 'إلكترونيات' },
  { id: 'furniture', name: 'أثاث' },
  { id: 'clothing', name: 'ملابس' },
  { id: 'vehicles', name: 'مركبات' },
  { id: 'toys', name: 'ألعاب' },
  { id: 'books', name: 'كتب' },
];

const products = [
  {
    id: '1',
    name: 'ماك بوك برو',
    price: 1299,
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
    condition: 'used' as const,
    location: 'دمشق، سوريا',
    category: 'electronics',
  },
  {
    id: '2',
    name: 'سامسونج جالاكسي S21',
    price: 799,
    image: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
    condition: 'new' as const,
    location: 'حلب، سوريا',
    category: 'electronics',
  },
  {
    id: '3',
    name: 'طاولة طعام خشبية',
    price: 350,
    image: 'https://images.unsplash.com/photo-1530018607912-eff2daa1bac4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
    condition: 'used' as const,
    location: 'حمص، سوريا',
    category: 'furniture',
  },
  {
    id: '4',
    name: 'سترة جلدية',
    price: 120,
    image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
    condition: 'new' as const,
    location: 'اللاذقية، سوريا',
    category: 'clothing',
  },
  {
    id: '5',
    name: 'هوندا سيفيك 2018',
    price: 15000,
    image: 'https://images.unsplash.com/photo-1533106418989-88406c7cc8ca?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
    condition: 'used' as const,
    location: 'دمشق، سوريا',
    category: 'vehicles',
  },
  {
    id: '6',
    name: 'مجموعة ليغو حرب النجوم',
    price: 79.99,
    image: 'https://images.unsplash.com/photo-1563901935883-cb9fb1be74b4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
    condition: 'new' as const,
    location: 'حلب، سوريا',
    category: 'toys',
  },
  {
    id: '7',
    name: 'مجموعة كتب هاري بوتر',
    price: 89.99,
    image: 'https://images.unsplash.com/photo-1551269901-5c5e14c25df7?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
    condition: 'used' as const,
    location: 'حمص، سوريا',
    category: 'books',
  },
  {
    id: '8',
    name: 'سماعات لاسلكية',
    price: 129.99,
    image: 'https://images.unsplash.com/photo-1578319439584-104c94d37305?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
    condition: 'new' as const,
    location: 'اللاذقية، سوريا',
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
        <h1 className="text-2xl font-bold mb-2">تصفح المنتجات</h1>
        <p className="text-gray-600">ابحث عن أفضل العروض على المنتجات في سوريا</p>
      </div>
      
      <div className="flex justify-between items-center mb-4">
        <CategoryFilter 
          categories={categories}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />
        
        <Button variant="outline" size="sm" className="flex items-center gap-1">
          <Filter size={16} />
          <span className="hidden sm:inline">تصفية</span>
        </Button>
      </div>
      
      <div className="product-grid w-full">
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


import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search as SearchIcon } from 'lucide-react';
import ProductCard from '@/components/ProductCard';

// Mock product data - in a real app, this would come from an API
const allProducts = [
  {
    id: '1',
    name: 'ماك بوك برو',
    price: 1299,
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
    condition: 'used' as const,
    location: 'دمشق، سوريا',
  },
  {
    id: '2',
    name: 'سامسونج جالاكسي S21',
    price: 799,
    image: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
    condition: 'new' as const,
    location: 'حلب، سوريا',
  },
  {
    id: '3',
    name: 'سماعات آبل إيربودز برو',
    price: 249,
    image: 'https://images.unsplash.com/photo-1606741965509-ca2bf4b1d430?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
    condition: 'new' as const,
    location: 'اللاذقية، سوريا',
  },
  {
    id: '4',
    name: 'بلاي ستيشن 5',
    price: 499,
    image: 'https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
    condition: 'new' as const,
    location: 'حمص، سوريا',
  },
];

const Search = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState(allProducts);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim() === '') {
      setSearchResults(allProducts);
      return;
    }
    
    const filtered = allProducts.filter(product => 
      product.name.includes(searchTerm) || 
      product.location.includes(searchTerm)
    );
    setSearchResults(filtered);
  };

  return (
    <Layout hideSearch>
      <h1 className="text-2xl font-bold mb-6">البحث</h1>
      
      <form onSubmit={handleSearch} className="mb-6">
        <div className="relative">
          <Input 
            type="text" 
            placeholder="ابحث عن المنتجات أو المواقع..." 
            className="w-full pr-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Button 
            type="submit"
            size="sm"
            className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-sooq-green hover:bg-sooq-green-light"
          >
            <SearchIcon className="h-4 w-4" />
          </Button>
        </div>
      </form>
      
      {searchResults.length > 0 ? (
        <div className="product-grid w-full">
          {searchResults.map(product => (
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
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-500">لم يتم العثور على منتجات تطابق بحثك</p>
        </div>
      )}
    </Layout>
  );
};

export default Search;

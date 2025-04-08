
import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin } from 'lucide-react';
import { Card } from '@/components/ui/card';

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  image: string;
  condition: 'new' | 'used';
  location: string;
}

const ProductCard: React.FC<ProductCardProps> = ({
  id,
  name,
  price,
  image,
  condition,
  location,
}) => {
  return (
    <Link to={`/product/${id}`} className="block w-full h-full">
      <Card className="product-card overflow-hidden h-full flex flex-col border-0 shadow-md">
        <div className="relative w-full">
          <img 
            src={image} 
            alt={name} 
            className="w-full h-40 object-cover"
          />
          <div className="absolute top-2 right-2">
            <span className={`text-xs font-medium px-2 py-1 rounded-full ${
              condition === 'new' ? 'bg-sooq-green text-white' : 'bg-gray-500 text-white'
            }`}>
              {condition === 'new' ? 'جديد' : 'مستعمل'}
            </span>
          </div>
        </div>
        <div className="p-3 flex-1 flex flex-col justify-between">
          <h3 className="font-medium text-base leading-tight line-clamp-2 text-right mb-2">{name}</h3>
          <div className="mt-auto">
            <p className="text-sooq-green font-bold text-lg text-right">{price.toFixed(2)} $</p>
            <div className="flex items-center justify-end text-gray-500 text-xs mt-2">
              <span className="truncate max-w-[120px]">{location}</span>
              <MapPin size={14} className="mr-1 shrink-0" />
            </div>
          </div>
        </div>
      </Card>
    </Link>
  );
};

export default ProductCard;

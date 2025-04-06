
import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin } from 'lucide-react';

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
    <Link to={`/product/${id}`} className="block w-full h-full bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow">
      <div className="relative w-full">
        <img 
          src={image} 
          alt={name} 
          className="w-full h-32 sm:h-40 object-cover"
        />
        <div className="absolute top-2 left-2">
          <span className={`text-xs font-medium px-2 py-1 rounded-full ${
            condition === 'new' ? 'bg-sooq-green text-white' : 'bg-gray-500 text-white'
          }`}>
            {condition === 'new' ? 'جديد' : 'مستعمل'}
          </span>
        </div>
      </div>
      <div className="p-3 flex-1 flex flex-col">
        <h3 className="font-medium text-sm sm:text-base leading-tight truncate">{name}</h3>
        <p className="text-sooq-green font-bold text-base sm:text-lg mt-1">{price.toFixed(2)} $</p>
        <div className="flex items-center text-gray-500 text-xs sm:text-sm mt-auto pt-2">
          <MapPin size={14} className="ml-1 shrink-0" />
          <span className="truncate">{location}</span>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;

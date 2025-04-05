
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
    <Link to={`/product/${id}`} className="product-card">
      <div className="relative">
        <img 
          src={image} 
          alt={name} 
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-2 right-2">
          <span className={condition === 'new' ? 'badge-new' : 'badge-used'}>
            {condition === 'new' ? 'New' : 'Used'}
          </span>
        </div>
      </div>
      <div className="p-3">
        <h3 className="font-medium text-lg leading-tight truncate">{name}</h3>
        <p className="text-sooq-green font-bold text-xl mt-1">${price.toFixed(2)}</p>
        <div className="flex items-center text-gray-500 text-sm mt-2">
          <MapPin size={14} className="mr-1" />
          <span className="truncate">{location}</span>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;

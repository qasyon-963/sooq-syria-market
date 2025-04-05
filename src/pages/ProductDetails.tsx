import React from 'react';
import { useParams, Link } from 'react-router-dom';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { MapPin, Phone, MessageSquare, ArrowLeft } from 'lucide-react';

// Mock product data - in a real app, this would come from an API
const products = [
  {
    id: '1',
    name: 'ماك بوك برو',
    price: 1299,
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
    condition: 'used' as const,
    location: 'دمشق، سوريا',
    category: 'electronics',
    description: 'ماك بوك برو 13 بوصة مع شريحة M1. ذاكرة وصول عشوائي 8 جيجابايت، تخزين SSD 256 جيجابايت. في حالة ممتازة، بالكاد تم استخدامه. يتضمن العلبة الأصلية.',
    sellerName: 'أحمد خالد',
    sellerPhone: '+963 934 567 890',
    postedDate: 'منذ يومين',
  },
  {
    id: '2',
    name: 'سامسونج جالاكسي S21',
    price: 799,
    image: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
    condition: 'new' as const,
    location: 'حلب، سوريا',
    category: 'electronics',
    description: 'هاتف سامسونج جالاكسي S21 جديد، لا يزال مختوماً في العلبة. سعة تخزين 128 جيجابايت، لون رمادي فانتوم. كفالة كاملة.',
    sellerName: 'ليلى إبراهيم',
    sellerPhone: '+963 955 123 456',
    postedDate: 'منذ أسبوع',
  },
  // ... other products would be here
];

const ProductDetails = () => {
  const { id } = useParams<{ id: string }>();
  const product = products.find(p => p.id === id);
  
  if (!product) {
    return (
      <Layout>
        <div className="text-center py-12">
          <h2 className="text-xl font-medium">المنتج غير موجود</h2>
          <Link to="/" className="text-sooq-green hover:underline mt-4 inline-block">
            العودة إلى الرئيسية
          </Link>
        </div>
      </Layout>
    );
  }
  
  return (
    <Layout hideSearch>
      <div className="mb-4">
        <Link to="/" className="inline-flex items-center text-gray-600 hover:text-sooq-green mb-4">
          <ArrowLeft size={16} className="mr-1" />
          العودة إلى القائمة
        </Link>
      </div>
      
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="md:flex">
          {/* Product Image */}
          <div className="md:w-1/2">
            <img 
              src={product.image} 
              alt={product.name} 
              className="w-full h-64 md:h-full object-cover"
            />
          </div>
          
          {/* Product Details */}
          <div className="md:w-1/2 p-6">
            <div className="flex justify-between items-start">
              <h1 className="text-2xl font-bold">{product.name}</h1>
              <span className={product.condition === 'new' ? 'badge-new' : 'badge-used'}>
                {product.condition === 'new' ? 'جديد' : 'مستعمل'}
              </span>
            </div>
            
            <p className="text-sooq-green text-3xl font-bold mt-2">${product.price.toFixed(2)}</p>
            
            <div className="flex items-center text-gray-600 mt-4">
              <MapPin size={18} className="mr-2" />
              <span>{product.location}</span>
            </div>
            
            <div className="text-gray-500 text-sm mt-1">
              نُشر {product.postedDate}
            </div>
            
            <Separator className="my-4" />
            
            <h2 className="font-medium text-lg mb-2">الوصف</h2>
            <p className="text-gray-700 mb-6">{product.description}</p>
            
            <Separator className="my-4" />
            
            <h2 className="font-medium text-lg mb-3">معلومات البائع</h2>
            <div className="mb-6">
              <p className="font-medium">{product.sellerName}</p>
            </div>
            
            <div className="flex flex-col space-y-3 sm:flex-row sm:space-y-0 sm:space-x-3">
              <Button className="bg-sooq-green hover:bg-sooq-green-light w-full sm:w-auto flex items-center justify-center gap-2">
                <Phone size={18} />
                <span>{product.sellerPhone}</span>
              </Button>
              
              <Button variant="outline" className="w-full sm:w-auto flex items-center justify-center gap-2">
                <MessageSquare size={18} />
                <span>مراسلة</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetails;

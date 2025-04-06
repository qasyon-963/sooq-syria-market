
import React from 'react';
import Layout from '@/components/Layout';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { PlusCircle, Pencil, Trash } from 'lucide-react';
import { Button } from '@/components/ui/button';

// Mock user products data
const userProducts = [
  {
    id: '1',
    name: 'ماك بوك برو',
    price: 1299,
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
    status: 'available' as const,
    views: 24,
    createdAt: '2023-05-15',
  },
  {
    id: '3',
    name: 'سماعات آبل إيربودز برو',
    price: 249,
    image: 'https://images.unsplash.com/photo-1606741965509-ca2bf4b1d430?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
    status: 'sold' as const,
    views: 56,
    createdAt: '2023-04-20',
  },
];

const MyProducts = () => {
  return (
    <Layout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">منتجاتي</h1>
        <Link to="/add-product">
          <Button className="bg-sooq-green hover:bg-sooq-green-light flex items-center gap-2">
            <PlusCircle size={18} />
            <span>إضافة منتج</span>
          </Button>
        </Link>
      </div>
      
      {userProducts.length > 0 ? (
        <div className="space-y-4">
          {userProducts.map(product => (
            <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden flex">
              <img 
                src={product.image} 
                alt={product.name} 
                className="w-24 h-24 sm:w-32 sm:h-32 object-cover"
              />
              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between">
                    <h3 className="font-medium">{product.name}</h3>
                    <Badge 
                      variant={product.status === 'available' ? 'default' : 'secondary'}
                      className={product.status === 'available' ? 'bg-sooq-green' : 'bg-gray-500'}
                    >
                      {product.status === 'available' ? 'متاح' : 'تم البيع'}
                    </Badge>
                  </div>
                  <p className="text-sooq-green font-bold mt-1">{product.price.toFixed(2)} $</p>
                  <p className="text-sm text-gray-500 mt-1">
                    {product.views} مشاهدة • نُشر {product.createdAt}
                  </p>
                </div>
                <div className="flex space-x-2 mt-2">
                  <Button variant="outline" size="sm" className="ml-2">
                    <Pencil size={16} className="ml-1" />
                    تعديل
                  </Button>
                  <Button variant="outline" size="sm" className="text-red-500 border-red-500 hover:bg-red-50">
                    <Trash size={16} className="ml-1" />
                    حذف
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-500 mb-4">ليس لديك منتجات معروضة للبيع</p>
          <Link to="/add-product">
            <Button className="bg-sooq-green hover:bg-sooq-green-light">
              إضافة منتج جديد
            </Button>
          </Link>
        </div>
      )}
    </Layout>
  );
};

export default MyProducts;

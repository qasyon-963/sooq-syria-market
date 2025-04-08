
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { MapPin, Phone, MessageSquare, ArrowLeft } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

// Define product interface
interface Product {
  id: string;
  name: string;
  price: number;
  image_url: string | null;
  condition: 'new' | 'used';
  location: string;
  category: string | null;
  description: string | null;
  seller_id: string;
  seller_phone: string | null;
  created_at: string;
}

const ProductDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  
  useEffect(() => {
    const fetchProductDetails = async () => {
      if (!id) return;
      
      try {
        const { data, error } = await supabase
          .from('products')
          .select('*')
          .eq('id', id)
          .single();
          
        if (error) throw error;
        
        setProduct(data as Product);
        
        // Update view count
        await supabase
          .from('products')
          .update({ views: (data.views || 0) + 1 })
          .eq('id', id);
          
      } catch (error: any) {
        console.error('Error fetching product details:', error);
        toast({
          title: "خطأ في تحميل تفاصيل المنتج",
          description: "لم نتمكن من تحميل تفاصيل المنتج. يرجى المحاولة مرة أخرى.",
          variant: "destructive"
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchProductDetails();
  }, [id, toast]);
  
  if (isLoading) {
    return (
      <Layout>
        <div className="text-center py-12">
          <p className="text-gray-500">جاري تحميل تفاصيل المنتج...</p>
        </div>
      </Layout>
    );
  }
  
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
  
  // Format the date
  const postedDate = new Date(product.created_at);
  const timeAgo = getTimeAgo(postedDate);
  
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
              src={product.image_url || '/placeholder.svg'} 
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
              نُشر {timeAgo}
            </div>
            
            <Separator className="my-4" />
            
            <h2 className="font-medium text-lg mb-2">الوصف</h2>
            <p className="text-gray-700 mb-6">{product.description || 'لا يوجد وصف للمنتج'}</p>
            
            <Separator className="my-4" />
            
            <h2 className="font-medium text-lg mb-3">معلومات البائع</h2>
            <div className="mb-6">
              <p className="font-medium">البائع</p>
            </div>
            
            <div className="flex flex-col space-y-3 sm:flex-row sm:space-y-0 sm:space-x-3">
              {product.seller_phone && (
                <Button className="bg-sooq-green hover:bg-sooq-green-light w-full sm:w-auto flex items-center justify-center gap-2">
                  <Phone size={18} />
                  <span>{product.seller_phone}</span>
                </Button>
              )}
              
              <Link to={`/chat/${product.seller_id}/${product.id}`}>
                <Button variant="outline" className="w-full sm:w-auto flex items-center justify-center gap-2">
                  <MessageSquare size={18} />
                  <span>مراسلة</span>
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

// Helper function to format time ago
const getTimeAgo = (date: Date) => {
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  
  if (diffInSeconds < 60) {
    return 'منذ لحظات';
  }
  
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) {
    return `منذ ${diffInMinutes} دقيقة`;
  }
  
  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) {
    return `منذ ${diffInHours} ساعة`;
  }
  
  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 30) {
    return `منذ ${diffInDays} يوم`;
  }
  
  const diffInMonths = Math.floor(diffInDays / 30);
  if (diffInMonths < 12) {
    return `منذ ${diffInMonths} شهر`;
  }
  
  const diffInYears = Math.floor(diffInMonths / 12);
  return `منذ ${diffInYears} سنة`;
};

export default ProductDetails;

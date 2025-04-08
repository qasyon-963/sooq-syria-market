
import React, { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import { Badge } from '@/components/ui/badge';
import { Link, useNavigate } from 'react-router-dom';
import { PlusCircle, Pencil, Trash } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from '@/components/ui/alert-dialog';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/context/AuthContext';
import { supabase } from '@/integrations/supabase/client';

interface Product {
  id: string;
  name: string;
  price: number;
  image_url: string;
  status: 'available' | 'sold' | 'deleted';
  views: number;
  created_at: string;
}

const MyProducts = () => {
  const [userProducts, setUserProducts] = useState<Product[]>([]);
  const [productToDelete, setProductToDelete] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  const { user } = useAuth();
  const navigate = useNavigate();
  
  useEffect(() => {
    // Redirect to login if not authenticated
    if (!user) {
      toast({
        title: "يجب تسجيل الدخول",
        description: "يرجى تسجيل الدخول لعرض منتجاتك",
        variant: "destructive"
      });
      navigate('/login');
      return;
    }
    
    const fetchUserProducts = async () => {
      try {
        const { data, error } = await supabase
          .from('products')
          .select('*')
          .eq('seller_id', user.id)
          .order('created_at', { ascending: false });
          
        if (error) throw error;
        
        setUserProducts(data || []);
      } catch (error) {
        console.error('Error fetching products:', error);
        toast({
          title: "خطأ في تحميل المنتجات",
          description: "لم نتمكن من تحميل منتجاتك. يرجى المحاولة مرة أخرى.",
          variant: "destructive"
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchUserProducts();
  }, [user, navigate, toast]);
  
  const handleDeleteProduct = async (id: string) => {
    try {
      const { error } = await supabase
        .from('products')
        .update({ status: 'deleted' })
        .eq('id', id)
        .eq('seller_id', user?.id);
        
      if (error) throw error;
      
      // Update the UI
      setUserProducts(prev => prev.filter(product => product.id !== id));
      
      toast({
        title: "تم حذف المنتج",
        description: "تم حذف المنتج بنجاح من قائمة منتجاتك",
      });
    } catch (error) {
      console.error('Error deleting product:', error);
      toast({
        title: "خطأ في حذف المنتج",
        description: "لم نتمكن من حذف المنتج. يرجى المحاولة مرة أخرى.",
        variant: "destructive"
      });
    }
    
    setProductToDelete(null);
  };

  if (!user) {
    return null; // Don't render anything if not authenticated (will redirect)
  }

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
      
      {isLoading ? (
        <div className="text-center py-12">
          <p className="text-gray-500">جاري تحميل المنتجات...</p>
        </div>
      ) : userProducts.length > 0 ? (
        <div className="space-y-4">
          {userProducts.map(product => (
            <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden flex">
              <img 
                src={product.image_url} 
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
                    {product.views} مشاهدة • نُشر {new Date(product.created_at).toLocaleDateString('ar-SA')}
                  </p>
                </div>
                <div className="flex space-x-2 mt-2">
                  <Button variant="outline" size="sm" className="ml-2">
                    <Pencil size={16} className="ml-1" />
                    تعديل
                  </Button>
                  <AlertDialog open={productToDelete === product.id} onOpenChange={(open) => !open && setProductToDelete(null)}>
                    <AlertDialogTrigger asChild>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="text-red-500 border-red-500 hover:bg-red-50"
                        onClick={() => setProductToDelete(product.id)}
                      >
                        <Trash size={16} className="ml-1" />
                        حذف
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>هل أنت متأكد من حذف هذا المنتج؟</AlertDialogTitle>
                        <AlertDialogDescription>
                          لا يمكن التراجع عن هذا الإجراء بعد تنفيذه.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>إلغاء</AlertDialogCancel>
                        <AlertDialogAction 
                          onClick={() => handleDeleteProduct(product.id)}
                          className="bg-red-500 hover:bg-red-600 text-white"
                        >
                          حذف
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
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

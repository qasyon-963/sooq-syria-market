
import React, { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import ProductCard from '@/components/ProductCard';
import CategoryFilter from '@/components/CategoryFilter';
import { Button } from '@/components/ui/button';
import { Filter } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

// Define types for our data
interface Product {
  id: string;
  name: string;
  price: number;
  image_url: string | null;
  condition: 'new' | 'used';
  location: string;
  category: string | null;
  created_at: string;
}

// Local category definitions
const categories = [
  { id: 'electronics', name: 'إلكترونيات' },
  { id: 'furniture', name: 'أثاث' },
  { id: 'clothing', name: 'ملابس' },
  { id: 'vehicles', name: 'مركبات' },
  { id: 'toys', name: 'ألعاب' },
  { id: 'books', name: 'كتب' },
];

const Index = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  
  // Fetch products from Supabase
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        let query = supabase
          .from('products')
          .select('*')
          .eq('status', 'available')
          .order('created_at', { ascending: false });
        
        if (selectedCategory) {
          query = query.eq('category', selectedCategory);
        }
        
        const { data, error } = await query;
        
        if (error) throw error;
        
        // Convert data to our Product interface
        const typedProducts: Product[] = data?.map((item: any) => ({
          id: item.id,
          name: item.name,
          price: item.price,
          image_url: item.image_url,
          condition: item.condition as 'new' | 'used',
          location: item.location,
          category: item.category,
          created_at: item.created_at
        })) || [];
        
        setProducts(typedProducts);
      } catch (error: any) {
        console.error('Error fetching products:', error);
        toast({
          title: "خطأ في تحميل المنتجات",
          description: "لم نتمكن من تحميل المنتجات. يرجى المحاولة مرة أخرى.",
          variant: "destructive"
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchProducts();
    
    // Set up real-time subscription for new products
    const channel = supabase
      .channel('products-channel')
      .on('postgres_changes', { 
        event: 'INSERT', 
        schema: 'public', 
        table: 'products',
        filter: selectedCategory ? `category=eq.${selectedCategory}` : undefined
      }, (payload) => {
        const newProduct = payload.new as any;
        // Only add the product if it matches our filter criteria
        if (newProduct.status === 'available' && (!selectedCategory || newProduct.category === selectedCategory)) {
          // Add the new product to the list
          setProducts(prev => [{
            id: newProduct.id,
            name: newProduct.name,
            price: newProduct.price,
            image_url: newProduct.image_url,
            condition: newProduct.condition as 'new' | 'used',
            location: newProduct.location,
            category: newProduct.category,
            created_at: newProduct.created_at
          }, ...prev]);
          
          // Show a toast notification
          toast({
            title: "منتج جديد",
            description: `تم إضافة منتج جديد: ${newProduct.name}`,
          });
        }
      })
      .subscribe();
    
    // Cleanup subscription on unmount
    return () => {
      supabase.removeChannel(channel);
    };
  }, [selectedCategory, toast]);
  
  return (
    <Layout>
      <div className="mb-6 text-right">
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
      
      {isLoading ? (
        <div className="text-center py-12">
          <p className="text-gray-500">جاري تحميل المنتجات...</p>
        </div>
      ) : products.length > 0 ? (
        <div className="product-grid">
          {products.map((product) => (
            <div key={product.id} className="w-full product-item">
              <ProductCard
                id={product.id}
                name={product.name}
                price={product.price}
                image={product.image_url || '/placeholder.svg'}
                condition={product.condition}
                location={product.location}
              />
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-500">لا توجد منتجات متاحة في هذه الفئة</p>
        </div>
      )}
    </Layout>
  );
};

export default Index;

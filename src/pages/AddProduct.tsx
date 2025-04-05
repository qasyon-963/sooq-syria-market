
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Upload, XCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const AddProduct = () => {
  const [images, setImages] = useState<string[]>([]);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const { toast } = useToast();
  
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      
      reader.onload = function(e) {
        const result = e.target?.result as string;
        setImagePreview(result);
      };
      
      reader.readAsDataURL(e.target.files[0]);
    }
  };
  
  const handleRemoveImage = () => {
    setImagePreview(null);
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "تمت إضافة المنتج بنجاح",
      description: "تم إدراج منتجك في سوق سوريا!",
    });
    // In a real app, this would handle the product submission logic
  };
  
  const categories = [
    { id: 'electronics', name: 'إلكترونيات' },
    { id: 'furniture', name: 'أثاث' },
    { id: 'clothing', name: 'ملابس' },
    { id: 'vehicles', name: 'مركبات' },
    { id: 'toys', name: 'ألعاب' },
    { id: 'books', name: 'كتب' },
  ];
  
  return (
    <Layout hideSearch>
      <div className="max-w-2xl mx-auto pb-16">
        <h1 className="text-2xl font-bold mb-6">إضافة منتج جديد</h1>
        
        <Card>
          <form onSubmit={handleSubmit}>
            <CardHeader>
              <CardTitle>تفاصيل المنتج</CardTitle>
              <CardDescription>
                املأ تفاصيل العنصر الذي ترغب في بيعه.
              </CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-6">
              {/* Image Upload */}
              <div className="space-y-2">
                <Label htmlFor="image">صور المنتج</Label>
                <div className="border-2 border-dashed rounded-lg p-6 text-center">
                  {imagePreview ? (
                    <div className="relative inline-block">
                      <img 
                        src={imagePreview} 
                        alt="معاينة المنتج" 
                        className="max-h-48 rounded-lg mx-auto"
                      />
                      <button 
                        type="button" 
                        onClick={handleRemoveImage} 
                        className="absolute top-1 right-1 text-white bg-black bg-opacity-50 rounded-full p-1 hover:bg-opacity-70"
                      >
                        <XCircle size={20} />
                      </button>
                    </div>
                  ) : (
                    <div className="py-8">
                      <Upload className="mx-auto h-12 w-12 text-gray-300" />
                      <p className="mt-2 text-sm text-gray-500">
                        انقر للتحميل أو اسحب وأفلت
                      </p>
                      <input
                        id="image"
                        type="file"
                        accept="image/*"
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        onChange={handleImageChange}
                      />
                    </div>
                  )}
                </div>
              </div>
              
              {/* Product Name */}
              <div className="space-y-2">
                <Label htmlFor="name">اسم المنتج</Label>
                <Input id="name" placeholder="مثال: آيفون 12 برو" required />
              </div>
              
              {/* Description */}
              <div className="space-y-2">
                <Label htmlFor="description">الوصف</Label>
                <Textarea 
                  id="description" 
                  placeholder="صف منتجك بالتفصيل..." 
                  rows={5}
                  required
                />
              </div>
              
              {/* Price */}
              <div className="space-y-2">
                <Label htmlFor="price">السعر (دولار أمريكي)</Label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">$</span>
                  <Input 
                    id="price" 
                    type="number" 
                    min="0" 
                    step="0.01" 
                    placeholder="0.00" 
                    className="pl-7"
                    required
                  />
                </div>
              </div>
              
              {/* Condition */}
              <div className="space-y-2">
                <Label>الحالة</Label>
                <RadioGroup defaultValue="new">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="new" id="condition-new" />
                    <Label htmlFor="condition-new" className="cursor-pointer">جديد</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="used" id="condition-used" />
                    <Label htmlFor="condition-used" className="cursor-pointer">مستعمل</Label>
                  </div>
                </RadioGroup>
              </div>
              
              {/* Category */}
              <div className="space-y-2">
                <Label htmlFor="category">الفئة</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="اختر فئة" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category.id} value={category.id}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              {/* Location */}
              <div className="space-y-2">
                <Label htmlFor="location">الموقع</Label>
                <Input id="location" placeholder="مثال: دمشق، سوريا" required />
              </div>
            </CardContent>
            
            <CardFooter>
              <Button type="submit" className="w-full bg-sooq-green hover:bg-sooq-green-light">
                نشر المنتج
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </Layout>
  );
};

export default AddProduct;

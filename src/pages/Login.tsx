
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

const Login = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "تم تسجيل الدخول بنجاح",
      description: "مرحباً بك مجدداً في سوق سوريا!",
    });
    // In a real app, this would handle the login logic
    // For now we just show a toast notification and redirect
    navigate('/');
  };
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-6">
          <Link to="/" className="inline-block">
            <h1 className="text-3xl font-bold text-sooq-green">سوق سوريا</h1>
          </Link>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">تسجيل الدخول</CardTitle>
            <CardDescription>
              أدخل بريدك الإلكتروني وكلمة المرور للوصول إلى حسابك
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">البريد الإلكتروني</Label>
                <Input id="email" type="email" placeholder="your@email.com" required />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">كلمة المرور</Label>
                  <Link to="/forgot-password" className="text-xs text-sooq-green hover:underline">
                    نسيت كلمة المرور؟
                  </Link>
                </div>
                <Input id="password" type="password" required />
              </div>
            </CardContent>
            <CardFooter className="flex flex-col">
              <Button type="submit" className="w-full bg-sooq-green hover:bg-sooq-green-light">
                تسجيل الدخول
              </Button>
              <p className="mt-4 text-center text-sm text-gray-600">
                ليس لديك حساب؟{' '}
                <Link to="/register" className="text-sooq-green hover:underline">
                  إنشاء حساب
                </Link>
              </p>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default Login;

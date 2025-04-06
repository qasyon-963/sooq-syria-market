
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import Layout from '@/components/Layout';

// Mock user database - in a real app, this would be on a server
const mockUsers = [
  {
    email: 'user@example.com',
    password: 'password123'
  },
  {
    email: 'demo@sooq.com',
    password: 'demo1234'
  }
];

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const validateLogin = (email: string, password: string) => {
    return mockUsers.some(user => user.email === email && user.password === password);
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!email || !password) {
      setError('يرجى ملء جميع الحقول المطلوبة');
      return;
    }
    
    if (validateLogin(email, password)) {
      toast({
        title: "تم تسجيل الدخول بنجاح",
        description: "مرحباً بك مجدداً في سوق سوريا!",
      });
      navigate('/');
    } else {
      setError('البريد الإلكتروني أو كلمة المرور غير صحيحة');
    }
  };
  
  return (
    <Layout hideSearch={true}>
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
                {error && (
                  <div className="bg-red-50 text-red-500 p-3 rounded-md text-sm">
                    {error}
                  </div>
                )}
                <div className="space-y-2">
                  <Label htmlFor="email">البريد الإلكتروني</Label>
                  <Input 
                    id="email" 
                    type="email" 
                    placeholder="your@email.com" 
                    required 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password">كلمة المرور</Label>
                    <Link to="/forgot-password" className="text-xs text-sooq-green hover:underline">
                      نسيت كلمة المرور؟
                    </Link>
                  </div>
                  <Input 
                    id="password" 
                    type="password" 
                    required 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div className="text-sm text-gray-600">
                  للتجربة، استخدم: demo@sooq.com / demo1234
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
    </Layout>
  );
};

export default Login;

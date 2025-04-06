
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, Home, PlusCircle, User, ShoppingBag, LogIn } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useIsMobile } from '@/hooks/use-mobile';

interface LayoutProps {
  children: React.ReactNode;
  hideSearch?: boolean;
}

const Layout: React.FC<LayoutProps> = ({ children, hideSearch = false }) => {
  const location = useLocation();
  const isMobile = useIsMobile();
  
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <Link to="/" className="flex items-center">
            <h1 className="text-2xl font-bold text-sooq-green">سوق سوريا</h1>
          </Link>
          
          {!hideSearch && (
            <div className="hidden md:flex relative flex-1 max-w-md mx-4">
              <Input 
                type="text" 
                placeholder="ابحث عن المنتجات..." 
                className="w-full pr-10"
              />
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            </div>
          )}
          
          <div className="flex items-center space-x-2">
            <Link to="/login" className="md:hidden">
              <Button size="sm" variant="ghost">
                <LogIn className="h-5 w-5 text-sooq-green" />
              </Button>
            </Link>
            <Link to="/login">
              <Button variant="outline" size="sm" className="hidden md:flex">
                تسجيل الدخول
              </Button>
            </Link>
            <Link to="/register">
              <Button size="sm" className="hidden md:flex bg-sooq-green hover:bg-sooq-green-light mr-2">
                إنشاء حساب
              </Button>
            </Link>
          </div>
        </div>
        
        {/* Mobile Search */}
        {!hideSearch && (
          <div className="md:hidden px-4 pb-3">
            <div className="relative">
              <Input 
                type="text" 
                placeholder="ابحث عن المنتجات..." 
                className="w-full pr-10"
              />
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            </div>
          </div>
        )}
      </header>
      
      {/* Main Content */}
      <main className="flex-1 container mx-auto px-4 py-6 pb-20 md:pb-6">
        {children}
      </main>
      
      {/* Footer Navigation (Mobile) */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-10 bg-white border-t border-gray-200 shadow-md">
        <div className="flex items-center justify-center w-full">
          <Link to="/" className={`flex flex-col items-center justify-center py-3 flex-1 ${location.pathname === '/' ? 'text-sooq-green' : 'text-gray-500'}`}>
            <Home size={20} />
            <span className="text-xs mt-1">الرئيسية</span>
          </Link>
          <Link to="/search" className={`flex flex-col items-center justify-center py-3 flex-1 ${location.pathname === '/search' ? 'text-sooq-green' : 'text-gray-500'}`}>
            <Search size={20} />
            <span className="text-xs mt-1">البحث</span>
          </Link>
          <Link to="/add-product" className={`flex flex-col items-center justify-center py-3 flex-1 ${location.pathname === '/add-product' ? 'text-sooq-green' : 'text-gray-500'}`}>
            <PlusCircle size={20} />
            <span className="text-xs mt-1">بيع</span>
          </Link>
          <Link to="/my-products" className={`flex flex-col items-center justify-center py-3 flex-1 ${location.pathname === '/my-products' ? 'text-sooq-green' : 'text-gray-500'}`}>
            <ShoppingBag size={20} />
            <span className="text-xs mt-1">منتجاتي</span>
          </Link>
          <Link to="/profile" className={`flex flex-col items-center justify-center py-3 flex-1 ${location.pathname === '/profile' ? 'text-sooq-green' : 'text-gray-500'}`}>
            <User size={20} />
            <span className="text-xs mt-1">الملف</span>
          </Link>
        </div>
      </nav>
    </div>
  );
};

export default Layout;

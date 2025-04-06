
import React from 'react';
import Layout from '@/components/Layout';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { MapPin, Phone, Mail, LogOut, Camera } from 'lucide-react';
import { Link } from 'react-router-dom';

// Mock user data
const user = {
  name: 'محمد أحمد',
  email: 'mohamed@example.com',
  phone: '+963 934 567 890',
  location: 'دمشق، سوريا',
  joinDate: 'مارس 2023',
  avatar: null, // No avatar yet
};

const Profile = () => {
  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-6">الملف الشخصي</h1>
      
      <Card className="overflow-hidden">
        <div className="bg-gradient-to-r from-sooq-green to-green-700 h-32 relative">
          <div className="absolute -bottom-16 right-4 sm:right-6">
            <div className="relative">
              <Avatar className="h-32 w-32 border-4 border-white">
                {user.avatar ? (
                  <AvatarImage src={user.avatar} alt={user.name} />
                ) : (
                  <AvatarFallback className="text-2xl bg-gray-200">
                    {user.name.charAt(0)}
                  </AvatarFallback>
                )}
              </Avatar>
              <Button 
                size="icon"
                className="absolute bottom-0 left-0 rounded-full bg-sooq-green hover:bg-sooq-green-light h-8 w-8"
              >
                <Camera size={16} />
              </Button>
            </div>
          </div>
        </div>
        
        <CardContent className="pt-20 pb-6">
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-bold">{user.name}</h2>
              <p className="text-gray-500 text-sm">عضو منذ {user.joinDate}</p>
            </div>
            
            <Separator />
            
            <div className="space-y-4">
              <div className="flex items-center">
                <Mail className="ml-2 text-gray-500" size={18} />
                <span>{user.email}</span>
              </div>
              <div className="flex items-center">
                <Phone className="ml-2 text-gray-500" size={18} />
                <span>{user.phone}</span>
              </div>
              <div className="flex items-center">
                <MapPin className="ml-2 text-gray-500" size={18} />
                <span>{user.location}</span>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-2 mt-6">
              <Link to="/my-products">
                <Button className="bg-sooq-green hover:bg-sooq-green-light">
                  منتجاتي
                </Button>
              </Link>
              <Button variant="outline">
                تعديل الملف الشخصي
              </Button>
              <Button variant="outline" className="text-red-500 border-red-500 hover:bg-red-50">
                <LogOut size={16} className="ml-1" />
                تسجيل الخروج
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </Layout>
  );
};

export default Profile;

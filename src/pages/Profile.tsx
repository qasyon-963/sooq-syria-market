
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { MapPin, Phone, Mail, LogOut, Camera, Save, X } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { useToast } from '@/hooks/use-toast';

// Mock user data - will be replaced with actual database data
const userInitialData = {
  name: 'محمد أحمد',
  email: 'mohamed@example.com',
  phone: '+963 934 567 890',
  location: 'دمشق، سوريا',
  joinDate: 'مارس 2023',
  avatar: null, // No avatar yet
};

const Profile = () => {
  const [user, setUser] = useState(userInitialData);
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState(userInitialData);
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleEditToggle = () => {
    if (isEditing) {
      // Cancel editing - reset data
      setEditedUser(user);
      setAvatarPreview(user.avatar);
    }
    setIsEditing(!isEditing);
  };

  const handleSaveChanges = () => {
    // In a real app, this would make an API call
    const updatedUser = {...editedUser};
    if (avatarPreview) {
      updatedUser.avatar = avatarPreview;
    }
    setUser(updatedUser);
    setIsEditing(false);
    toast({
      title: "تم تحديث الملف الشخصي",
      description: "تم حفظ التغييرات بنجاح",
    });
  };

  const handleLogout = () => {
    // In a real app, this would handle the logout logic
    toast({
      title: "تم تسجيل الخروج",
      description: "نتمنى رؤيتك مرة أخرى قريباً",
    });
    // Redirect to homepage after logout
    navigate('/');
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      
      reader.onload = function(e) {
        const result = e.target?.result as string;
        setAvatarPreview(result);
      };
      
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditedUser(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-6">الملف الشخصي</h1>
      
      <Card className="overflow-hidden">
        <div className="bg-gradient-to-r from-sooq-green to-green-700 h-32 relative">
          <div className="absolute -bottom-16 right-4 sm:right-6">
            <div className="relative">
              <Avatar className="h-32 w-32 border-4 border-white">
                {(avatarPreview || user.avatar) ? (
                  <AvatarImage src={avatarPreview || user.avatar as string} alt={user.name} />
                ) : (
                  <AvatarFallback className="text-2xl bg-gray-200">
                    {user.name.charAt(0)}
                  </AvatarFallback>
                )}
              </Avatar>
              <label htmlFor="avatar-upload">
                <Button 
                  size="icon"
                  className="absolute bottom-0 left-0 rounded-full bg-sooq-green hover:bg-sooq-green-light h-8 w-8 cursor-pointer"
                  type="button"
                  aria-label="Change profile picture"
                >
                  <Camera size={16} />
                </Button>
                <input 
                  id="avatar-upload" 
                  type="file" 
                  accept="image/*" 
                  className="hidden" 
                  onChange={handleAvatarChange}
                />
              </label>
            </div>
          </div>
        </div>
        
        <CardContent className="pt-20 pb-6">
          <div className="space-y-6">
            {isEditing ? (
              // Edit mode
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">الاسم</label>
                  <Input 
                    name="name"
                    value={editedUser.name} 
                    onChange={handleInputChange} 
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">البريد الإلكتروني</label>
                  <Input 
                    name="email"
                    value={editedUser.email} 
                    onChange={handleInputChange} 
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">رقم الهاتف</label>
                  <Input 
                    name="phone"
                    value={editedUser.phone} 
                    onChange={handleInputChange} 
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">الموقع</label>
                  <Input 
                    name="location"
                    value={editedUser.location} 
                    onChange={handleInputChange} 
                  />
                </div>
              </div>
            ) : (
              // View mode
              <>
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
              </>
            )}
            
            <div className="flex flex-wrap gap-2 mt-6">
              <Link to="/my-products">
                <Button className="bg-sooq-green hover:bg-sooq-green-light">
                  منتجاتي
                </Button>
              </Link>
              
              {isEditing ? (
                <>
                  <Button 
                    variant="default" 
                    className="bg-sooq-green hover:bg-sooq-green-light"
                    onClick={handleSaveChanges}
                  >
                    <Save size={16} className="ml-1" />
                    حفظ التغييرات
                  </Button>
                  <Button 
                    variant="outline"
                    onClick={handleEditToggle}
                  >
                    <X size={16} className="ml-1" />
                    إلغاء
                  </Button>
                </>
              ) : (
                <Button 
                  variant="outline"
                  onClick={handleEditToggle}
                >
                  تعديل الملف الشخصي
                </Button>
              )}
              
              <Button 
                variant="outline" 
                className="text-red-500 border-red-500 hover:bg-red-50"
                onClick={() => setShowLogoutDialog(true)}
              >
                <LogOut size={16} className="ml-1" />
                تسجيل الخروج
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Logout Confirmation Dialog */}
      <AlertDialog open={showLogoutDialog} onOpenChange={setShowLogoutDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>تأكيد تسجيل الخروج</AlertDialogTitle>
            <AlertDialogDescription>
              هل أنت متأكد من رغبتك في تسجيل الخروج من حسابك؟
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>إلغاء</AlertDialogCancel>
            <AlertDialogAction onClick={handleLogout} className="bg-red-500 hover:bg-red-600">
              تسجيل الخروج
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Layout>
  );
};

export default Profile;

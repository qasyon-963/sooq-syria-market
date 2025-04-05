
import React from "react";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
      <h1 className="text-6xl font-bold text-sooq-green mb-4">404</h1>
      <p className="text-xl text-gray-600 mb-6">عذراً! الصفحة غير موجودة</p>
      <p className="text-gray-500 mb-8 text-center max-w-md">
        الصفحة التي تبحث عنها قد تكون تمت إزالتها، أو تم تغيير اسمها، أو أنها غير متوفرة مؤقتاً.
      </p>
      <Link to="/">
        <Button className="bg-sooq-green hover:bg-sooq-green-light">
          العودة إلى الرئيسية
        </Button>
      </Link>
    </div>
  );
};

export default NotFound;

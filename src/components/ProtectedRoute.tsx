
import { ReactNode, useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useUserInfo } from '@/hooks/use-user-info';

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { userInfo, isLoading } = useUserInfo();
  const [directCheck, setDirectCheck] = useState<any>(null);
  const [checkLoading, setCheckLoading] = useState(true);
  
  // Add direct localStorage check to handle cases where useUserInfo might be lagging
  useEffect(() => {
    try {
      const storedUserInfo = localStorage.getItem('userInfo');
      if (storedUserInfo) {
        setDirectCheck(JSON.parse(storedUserInfo));
      }
      setCheckLoading(false);
    } catch (error) {
      console.error("Error checking direct localStorage:", error);
      setCheckLoading(false);
    }
  }, []);
  
  // While checking authentication status, show a loading spinner
  if (isLoading || checkLoading) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-background">
        <div className="w-10 h-10 rounded-full border-2 border-primary border-t-transparent animate-spin"></div>
      </div>
    );
  }
  
  // If not authenticated, redirect to home page
  if (!userInfo && !directCheck) {
    return <Navigate to="/" replace />;
  }
  
  // If authenticated, render the protected component
  return <>{children}</>;
};

export default ProtectedRoute;

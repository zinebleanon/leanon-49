
import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useUserInfo } from '@/hooks/use-user-info';

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { userInfo, isLoading } = useUserInfo();
  
  // While checking authentication status, show nothing or a loading spinner
  if (isLoading) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-background">
        <div className="w-10 h-10 rounded-full border-2 border-primary border-t-transparent animate-spin"></div>
      </div>
    );
  }
  
  // If not authenticated, redirect to home page
  if (!userInfo) {
    return <Navigate to="/" replace />;
  }
  
  // If authenticated, render the protected component
  return <>{children}</>;
};

export default ProtectedRoute;

import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useAuth } from "./hooks/use-auth";
import { useAnalytics } from "./hooks/use-analytics";
import { useNotificationInit } from "./hooks/use-notification-init";
import Index from "./pages/Index";
import MumzAlly from "./pages/MumzAlly";
import MumzAsk from "./pages/MumzAsk";
import MumzBrands from "./pages/MumzBrands";
import MumzMarketplace from "./pages/MumzMarketplace";
import MumzMarketplaceSell from "./pages/MumzMarketplaceSell";
import MumzMarketplaceFind from "./pages/MumzMarketplaceFind";
import MumzAllySubscribe from "./pages/MumzAllySubscribe";
import MumzShoppingHub from "./pages/MumzShoppingHub";
import MumzSelect from "./pages/MumzSelect";
import MumzDeals from "./pages/MumzDeals";
import SignIn from "./pages/SignIn";
import NotFound from "./pages/NotFound";
import AdminNotifications from "./pages/AdminNotifications";
import ProtectedRoute from "./components/ProtectedRoute";
import Connections from "./pages/Connections";
import Notifications from "./pages/Notifications";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import Inbox from "./pages/Inbox";
import Terms from "./pages/Terms";

const AppContent = () => {
  const { loading } = useAuth();
  useNotificationInit();
  useAnalytics();
  
  if (loading) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-background">
        <div className="w-10 h-10 rounded-full border-2 border-primary border-t-transparent animate-spin"></div>
      </div>
    );
  }

  return (
    <Routes>
      <Route path="/" element={<Index />} />
      {/* Both sign-in and sign-up routes use the same component with appropriate default tabs */}
      <Route path="/sign-in" element={<SignIn defaultTab="signin" />} />
      <Route path="/sign-up" element={<SignIn defaultTab="signup" />} />
      
      {/* Terms & Conditions Page */}
      <Route path="/terms" element={<Terms />} />
      
      {/* Admin Routes */}
      <Route path="/admin/notifications" element={<AdminNotifications />} />
      
      {/* Protected Routes */}
      <Route path="/ally" element={<ProtectedRoute><MumzAlly /></ProtectedRoute>} />
      <Route path="/ally/subscribe" element={<ProtectedRoute><MumzAllySubscribe /></ProtectedRoute>} />
      <Route path="/ask" element={<ProtectedRoute><MumzAsk /></ProtectedRoute>} />
      <Route path="/connections" element={<ProtectedRoute><Connections /></ProtectedRoute>} />
      <Route path="/notifications" element={<ProtectedRoute><Notifications /></ProtectedRoute>} />
      <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
      <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
      <Route path="/inbox" element={<ProtectedRoute><Inbox /></ProtectedRoute>} />
      
      {/* LeanOn Routes - All Protected */}
      <Route path="/" element={<ProtectedRoute><MumzShoppingHub /></ProtectedRoute>}>
        <Route path="save" element={<Navigate to="/brands" replace />} />
        <Route path="marketplace" element={<MumzMarketplace />} />
        <Route path="select" element={<MumzSelect />} />
      </Route>
      <Route path="/marketplace/sell" element={<ProtectedRoute><MumzMarketplaceSell /></ProtectedRoute>} />
      <Route path="/marketplace/find" element={<ProtectedRoute><MumzMarketplaceFind /></ProtectedRoute>} />
      <Route path="/deals" element={<ProtectedRoute><MumzDeals /></ProtectedRoute>} />
      <Route path="/brands" element={<ProtectedRoute><MumzBrands /></ProtectedRoute>} />
      
      {/* Catch-all Route */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppContent;

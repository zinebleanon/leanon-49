
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import MumzAlly from "./pages/MumzAlly";
import MumzAsk from "./pages/MumzAsk";
import MumzSave from "./pages/MumzSave";
import MumzMarketplace from "./pages/MumzMarketplace";
import MumzMarketplaceSell from "./pages/MumzMarketplaceSell";
import MumzMarketplaceFind from "./pages/MumzMarketplaceFind";
import MumzAllySubscribe from "./pages/MumzAllySubscribe";
import MumzShoppingHub from "./pages/MumzShoppingHub";
import MumzSelect from "./pages/MumzSelect";
import MumzDeals from "./pages/MumzDeals";
import MumzBrands from "./pages/MumzBrands";
import SignIn from "./pages/SignIn";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignIn />} />
          <Route path="/ally" element={<MumzAlly />} />
          <Route path="/ally/subscribe" element={<MumzAllySubscribe />} />
          <Route path="/ask" element={<MumzAsk />} />
          
          {/* LeanOn Routes */}
          <Route path="/" element={<MumzShoppingHub />}>
            <Route path="save" element={<MumzSave />} />
            <Route path="marketplace" element={<MumzMarketplace />} />
            <Route path="select" element={<MumzSelect />} />
          </Route>
          <Route path="/marketplace/sell" element={<MumzMarketplaceSell />} />
          <Route path="/marketplace/find" element={<MumzMarketplaceFind />} />
          <Route path="/deals" element={<MumzDeals />} />
          <Route path="/brands" element={<MumzBrands />} />
          
          {/* Catch-all Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

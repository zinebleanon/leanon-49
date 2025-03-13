
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
import MumzAllySubscribe from "./pages/MumzAllySubscribe";
import MumzShoppingHub from "./pages/MumzShoppingHub";
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
          <Route path="/ally" element={<MumzAlly />} />
          <Route path="/ally/subscribe" element={<MumzAllySubscribe />} />
          <Route path="/ask" element={<MumzAsk />} />
          
          {/* MumzSave Routes */}
          <Route path="/" element={<MumzShoppingHub />}>
            <Route path="save" element={<MumzSave />} />
            <Route path="marketplace" element={<MumzMarketplace />} />
          </Route>
          <Route path="/marketplace/sell" element={<MumzMarketplaceSell />} />
          
          {/* Catch-all Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

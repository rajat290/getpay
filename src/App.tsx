
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Fees from "./pages/Fees";
import History from "./pages/History";
import Profile from "./pages/Profile";
import AdminIndex from "./pages/AdminIndex";
import AdminStudents from "./pages/AdminStudents";
import AdminPayments from "./pages/AdminPayments";
import AdminReports from "./pages/AdminReports";
import AdminSettings from "./pages/AdminSettings";
import NotFound from "./pages/NotFound";
import React from "react";

const App = () => {
  // Initialize QueryClient inside the component function
  const [queryClient] = React.useState(() => new QueryClient());
  
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/fees" element={<Fees />} />
            <Route path="/history" element={<History />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/admin" element={<AdminIndex />} />
            <Route path="/admin/students" element={<AdminStudents />} />
            <Route path="/admin/payments" element={<AdminPayments />} />
            <Route path="/admin/reports" element={<AdminReports />} />
            <Route path="/admin/settings" element={<AdminSettings />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;

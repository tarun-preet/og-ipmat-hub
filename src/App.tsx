import { Toaster } from "sonner";
import { Analytics } from "@vercel/analytics/react";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { CommandPalette } from "@/components/CommandPalette";
import Dashboard from "./pages/Dashboard";
import EnterSite from "./pages/EnterSite";
import QuantVaultPage from "./pages/QuantVaultPage";
import VocabHubPage from "./pages/VocabHubPage";
import ProgressPage from "./pages/ProgressPage";
import MockScoresPage from "./pages/MockScoresPage";
import DailyLogPage from "./pages/DailyLogPage";
import FreeResourcesPage from "./pages/FreeResourcesPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

  // Protected Route wrapper
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/enter" replace />;
  }

  return <>{children}</>;
};

  // Public Route wrapper (redirect to dashboard if already logged in)
const PublicRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/enter" element={<PublicRoute><EnterSite /></PublicRoute>} />

      {/* Protected routes */}
      <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
      <Route path="/quant-vault" element={<ProtectedRoute><QuantVaultPage /></ProtectedRoute>} />
      <Route path="/vocab-hub" element={<ProtectedRoute><VocabHubPage /></ProtectedRoute>} />
      <Route path="/progress" element={<ProtectedRoute><ProgressPage /></ProtectedRoute>} />
      <Route path="/mock-scores" element={<ProtectedRoute><MockScoresPage /></ProtectedRoute>} />
      <Route path="/daily-log" element={<ProtectedRoute><DailyLogPage /></ProtectedRoute>} />
      <Route path="/free-resources" element={<ProtectedRoute><FreeResourcesPage /></ProtectedRoute>} />

      {/* Catch-all */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <TooltipProvider>
        <Toaster />
        <BrowserRouter>
          <CommandPalette />
          <AuthProvider>
            <AppRoutes />
          </AuthProvider>
        </BrowserRouter>
        <Analytics />
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;

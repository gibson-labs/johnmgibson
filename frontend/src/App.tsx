import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AllProjects from "./pages/AllProjects";
import ContactPage from "./pages/ContactPage";
import NotFound from "./pages/NotFound";
import ConceptsIndex from "./concepts/ConceptsIndex";
import Bento from "./concepts/bento/Bento";
import BentoNight from "./concepts/bento-night/BentoNight";
import Trace from "./concepts/trace/Trace";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Bento />} />
          <Route path="/projects" element={<AllProjects />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/concepts" element={<ConceptsIndex />} />
          <Route path="/concepts/bento" element={<Bento />} />
          <Route path="/concepts/bento-night" element={<BentoNight />} />
          <Route path="/concepts/trace" element={<Trace />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

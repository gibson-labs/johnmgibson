import { lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NotFound from "./pages/NotFound";
import Bento from "./concepts/bento/Bento";

const AllProjects = lazy(() => import("./pages/AllProjects"));
const ContactPage = lazy(() => import("./pages/ContactPage"));
const ConceptsIndex = lazy(() => import("./concepts/ConceptsIndex"));
const BentoNight = lazy(() => import("./concepts/bento-night/BentoNight"));
const Trace = lazy(() => import("./concepts/trace/Trace"));

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Suspense fallback={<div role="status" className="p-8">Loading page…</div>}>
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
        </Suspense>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

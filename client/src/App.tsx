import { useEffect } from "react";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch, useLocation } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import WhatsAppButton from "./components/WhatsAppButton";
import FloatingDock from "./components/FloatingDock";
import Home from "./pages/Home";
import SymptomAtlas from "./pages/SymptomAtlas";
import Library from "./pages/Library";
import Article from "./pages/Article";
import Consultations from "./pages/Consultations";
import Contact from "./pages/Contact";
import About from "./pages/About";
import SymptomChecker from "./pages/SymptomChecker";

function Router() {
  const [location] = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/atlas-sintomas" component={SymptomAtlas} />
      <Route path="/biblioteca" component={Library} />
      <Route path="/artigo/:slug" component={Article} />
      <Route path="/consultas" component={Consultations} />
      <Route path="/contato" component={Contact} />
      <Route path="/sobre" component={About} />
      <Route path="/diagnostico" component={SymptomChecker} />
      <Route path="/404" component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <Toaster />
          <div className="flex flex-col min-h-screen bg-background text-foreground">
            <Navigation />
            <main className="flex-1">
              <Router />
            </main>
            <Footer />
            <WhatsAppButton />
            <FloatingDock />
          </div>
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;

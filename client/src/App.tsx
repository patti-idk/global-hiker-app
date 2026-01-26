import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Navigation } from "@/components/Navigation";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import RouteList from "@/pages/RouteList";
import GlobalMap from "@/pages/GlobalMap";
import Companions from "@/pages/Companions";

function Router() {
  return (
    <div className="md:pl-20 min-h-screen">
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/routes" component={RouteList} />
        <Route path="/map" component={GlobalMap} />
        <Route path="/companions" component={Companions} />
        <Route component={NotFound} />
      </Switch>
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <div className="antialiased text-foreground bg-background min-h-screen font-sans selection:bg-accent selection:text-white">
          <Navigation />
          <Router />
          <Toaster />
        </div>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;

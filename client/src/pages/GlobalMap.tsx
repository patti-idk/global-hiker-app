import { MapComponent } from "@/components/MapComponent";
import { useRoutes } from "@/hooks/use-routes";
import { RouteCard } from "@/components/RouteCard";
import { useState } from "react";
import { Route } from "@shared/schema";
import { X, Maximize2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function GlobalMap() {
  const { data: routes } = useRoutes();
  const [selectedRoute, setSelectedRoute] = useState<Route | null>(null);

  return (
    <div className="h-screen w-full relative bg-background">
      <MapComponent 
        className="w-full h-full" 
        routes={routes}
        onMarkerClick={setSelectedRoute}
      />
      
      {/* Header Overlay */}
      <div className="absolute top-0 left-0 w-full p-6 md:p-8 pointer-events-none z-10 flex justify-between items-start">
        <div className="bg-white/90 backdrop-blur-md px-6 py-4 rounded-2xl shadow-lg pointer-events-auto border border-white/20">
          <h1 className="text-2xl font-display text-primary">全球規劃地圖</h1>
          <p className="text-xs text-muted-foreground uppercase tracking-wider font-bold">
            已標記 {routes?.length || 0} 條遠征路線
          </p>
        </div>
        
        <button className="bg-white/90 backdrop-blur-md p-3 rounded-xl shadow-lg pointer-events-auto hover:bg-white text-primary border border-white/20">
          <Maximize2 size={24} />
        </button>
      </div>

      {/* Selected Route Detail Sidebar/Drawer */}
      <AnimatePresence>
        {selectedRoute && (
          <motion.div 
            initial={{ x: "100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "100%", opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="absolute top-0 right-0 h-full w-full md:w-[480px] bg-background shadow-2xl z-20 overflow-y-auto border-l border-border"
          >
            <div className="relative h-full flex flex-col">
              <button 
                onClick={() => setSelectedRoute(null)}
                className="absolute top-4 right-4 z-30 p-2 bg-black/20 hover:bg-black/40 backdrop-blur-sm rounded-full text-white transition-colors"
              >
                <X size={20} />
              </button>
              
              <div className="h-72 relative shrink-0">
                <img 
                  src={selectedRoute.imageUrl} 
                  alt={selectedRoute.name} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <span className="bg-accent px-3 py-1 rounded-full text-white text-xs font-bold uppercase tracking-wider mb-2 inline-block">
                    {selectedRoute.difficulty}
                  </span>
                  <h2 className="text-4xl font-display text-primary leading-tight">{selectedRoute.name}</h2>
                  <p className="text-muted-foreground font-medium flex items-center gap-2">
                    {selectedRoute.locationName}
                  </p>
                </div>
              </div>
              
              <div className="p-8 flex-1">
                <div className="grid grid-cols-2 gap-4 mb-8">
                  <div className="bg-secondary p-4 rounded-2xl">
                    <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">距離</p>
                    <p className="text-2xl font-display text-primary">{selectedRoute.lengthKm} 公里</p>
                  </div>
                  <div className="bg-secondary p-4 rounded-2xl">
                    <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">海拔</p>
                    <p className="text-2xl font-display text-primary">{selectedRoute.altitudeM} 公尺</p>
                  </div>
                </div>
                
                <h3 className="text-xl font-display text-primary mb-4">關於此步道</h3>
                <p className="text-muted-foreground leading-relaxed mb-8">
                  {selectedRoute.description}
                </p>
                
                <div className="space-y-4">
                  <button className="w-full py-4 bg-primary text-white rounded-xl font-bold uppercase tracking-widest hover:bg-primary/90 transition-colors shadow-lg shadow-primary/25">
                    規劃遠征
                  </button>
                  <button className="w-full py-4 bg-white border border-border text-primary rounded-xl font-bold uppercase tracking-widest hover:bg-secondary transition-colors">
                    下載 GPX
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

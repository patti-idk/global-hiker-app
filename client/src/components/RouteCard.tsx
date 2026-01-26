import { ArrowRight, Mountain, Ruler, TrendingUp, CheckCircle, MapPin } from "lucide-react";
import type { Route } from "@shared/schema";
import { motion } from "framer-motion";

interface RouteCardProps {
  route: Route;
  compact?: boolean;
}

export function RouteCard({ route, compact = false }: RouteCardProps) {
  const difficultyMap: Record<string, string> = {
    "Easy": "簡單",
    "Moderate": "中等",
    "Hard": "困難"
  };
  
  const statusMap: Record<string, { label: string; color: string; icon: typeof CheckCircle }> = {
    "visited": { label: "已去過", color: "bg-green-500", icon: CheckCircle },
    "planned": { label: "計劃前往", color: "bg-accent", icon: MapPin },
    "wishlist": { label: "願望清單", color: "bg-purple-500", icon: MapPin },
  };
  
  const displayDifficulty = difficultyMap[route.difficulty] || route.difficulty;
  const statusInfo = statusMap[route.status || "planned"];
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="group relative overflow-hidden rounded-3xl bg-white shadow-lg hover:shadow-2xl transition-all duration-300 border border-border/50 h-full flex flex-col"
      data-testid={`card-route-${route.id}`}
    >
      {/* Image container with parallax-like hover effect */}
      <div className={`relative overflow-hidden ${compact ? 'h-48' : 'h-64 md:h-80'}`}>
        <img 
          src={route.imageUrl} 
          alt={route.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-90" />
        
        {/* Status Badge */}
        {statusInfo && (
          <div className={`absolute top-4 left-4 ${statusInfo.color} px-3 py-1 rounded-full text-white text-xs font-bold uppercase tracking-wider flex items-center gap-1`}>
            <statusInfo.icon size={12} />
            {statusInfo.label}
          </div>
        )}
        
        {/* Difficulty Badge */}
        <div className="absolute top-4 right-4 bg-white/10 backdrop-blur-md border border-white/20 px-3 py-1 rounded-full text-white text-xs font-bold uppercase tracking-wider">
          {displayDifficulty}
        </div>
        
        <div className="absolute bottom-0 left-0 p-6 w-full">
          <p className="text-accent text-sm font-bold uppercase tracking-widest mb-1">{route.locationName}</p>
          <h3 className="text-white text-2xl md:text-3xl leading-none font-display mb-2">{route.name}</h3>
          {route.region && (
            <span className="inline-block bg-white/20 backdrop-blur-sm px-2 py-0.5 rounded text-white/80 text-xs">
              {route.region}
            </span>
          )}
        </div>
      </div>

      <div className="p-6 flex-1 flex flex-col">
        {!compact && (
          <p className="text-muted-foreground text-sm line-clamp-3 mb-6">
            {route.description}
          </p>
        )}

        <div className="mt-auto grid grid-cols-3 gap-2 border-t border-border/50 pt-4">
          <div className="flex flex-col items-center text-center">
            <Ruler className="w-5 h-5 text-accent mb-1" />
            <span className="text-xs text-muted-foreground font-medium uppercase">長度</span>
            <span className="text-lg font-bold text-primary font-display">{route.lengthKm} <span className="text-sm text-muted-foreground">公里</span></span>
          </div>
          <div className="flex flex-col items-center text-center border-l border-border/50">
            <Mountain className="w-5 h-5 text-accent mb-1" />
            <span className="text-xs text-muted-foreground font-medium uppercase">海拔</span>
            <span className="text-lg font-bold text-primary font-display">{route.altitudeM} <span className="text-sm text-muted-foreground">公尺</span></span>
          </div>
          <div className="flex flex-col items-center text-center border-l border-border/50">
            <TrendingUp className="w-5 h-5 text-accent mb-1" />
            <span className="text-xs text-muted-foreground font-medium uppercase">難度</span>
            <span className="text-lg font-bold text-primary font-display">{displayDifficulty}</span>
          </div>
        </div>
        
        {!compact && (
          <button 
            className="w-full mt-6 bg-primary text-white py-3 rounded-xl font-bold uppercase tracking-widest text-sm flex items-center justify-center gap-2 hover:bg-primary/90 transition-colors group-hover:bg-accent group-hover:text-white"
            data-testid={`button-view-${route.id}`}
          >
            查看詳情 <ArrowRight size={16} />
          </button>
        )}
      </div>
    </motion.div>
  );
}

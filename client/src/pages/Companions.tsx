import { useCompanions, useVotes, useCastVote } from "@/hooks/use-companions";
import { useRoutes } from "@/hooks/use-routes";
import { motion } from "framer-motion";
import { ThumbsUp, MapPin, Trophy } from "lucide-react";
import { useState } from "react";
import { clsx } from "clsx";

export default function Companions() {
  const { data: companions } = useCompanions();
  const { data: routes } = useRoutes();
  const { data: votes } = useVotes();
  const castVoteMutation = useCastVote();

  const [selectedRouteId, setSelectedRouteId] = useState<number | null>(null);

  const CURRENT_USER_ID = 1; 

  const voteCounts = votes?.reduce((acc, vote) => {
    acc[vote.routeId] = (acc[vote.routeId] || 0) + 1;
    return acc;
  }, {} as Record<number, number>);

  const handleVote = (routeId: number) => {
    if (castVoteMutation.isPending) return;
    
    castVoteMutation.mutate({
      routeId,
      companionId: CURRENT_USER_ID
    });
  };

  return (
    <div className="min-h-screen bg-background pb-24 md:pb-12 pt-24 px-4 md:px-8 max-w-7xl mx-auto">
      <div className="text-center max-w-2xl mx-auto mb-16">
        <h1 className="text-4xl md:text-6xl text-primary font-display mb-4">旅伴協作區</h1>
        <p className="text-lg text-muted-foreground">
          與夥伴們協調行程，一起投票決定下一個目的地。
        </p>
      </div>

      {/* Companions Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 mb-20">
        {companions?.map((companion, index) => (
          <motion.div
            key={companion.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            className="flex flex-col items-center group"
          >
            <div className="relative w-24 h-24 md:w-32 md:h-32 mb-4">
              <div className="absolute inset-0 rounded-full border-2 border-dashed border-accent/30 animate-[spin_10s_linear_infinite] group-hover:border-accent transition-colors" />
              <img 
                src={companion.avatarUrl} 
                alt={companion.name}
                className="w-full h-full rounded-full object-cover p-1.5 bg-background"
              />
              <div className="absolute bottom-0 right-0 w-8 h-8 bg-green-500 rounded-full border-4 border-background flex items-center justify-center">
                <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
              </div>
            </div>
            <h3 className="font-bold text-primary text-lg">{companion.name}</h3>
            <span className="text-xs text-muted-foreground uppercase tracking-widest font-bold">探險家</span>
          </motion.div>
        ))}
        
        {/* Add Companion Button */}
        <div className="flex flex-col items-center justify-center cursor-pointer group">
           <div className="w-24 h-24 md:w-32 md:h-32 mb-4 rounded-full border-2 border-dashed border-border flex items-center justify-center bg-secondary/50 group-hover:bg-accent/10 group-hover:border-accent transition-all">
             <span className="text-4xl text-muted-foreground group-hover:text-accent font-light">+</span>
           </div>
           <h3 className="font-bold text-muted-foreground group-hover:text-accent">邀請</h3>
        </div>
      </div>

      {/* Voting Section */}
      <div className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-xl shadow-black/5 border border-border/50 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-accent/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
        
        <div className="flex items-center gap-4 mb-8 relative z-10">
          <div className="p-3 bg-accent/10 rounded-xl text-accent">
            <Trophy size={24} />
          </div>
          <div>
            <h2 className="text-3xl font-display text-primary">路線投票</h2>
            <p className="text-muted-foreground">為 2025 年遠征計畫投下你的一票。</p>
          </div>
        </div>

        <div className="space-y-4 relative z-10">
          {routes?.slice(0, 3).map((route) => {
            const votesForRoute = voteCounts?.[route.id] || 0;
            const isTop = votesForRoute > 0 && votesForRoute === Math.max(...Object.values(voteCounts || {}));

            return (
              <div 
                key={route.id}
                className={clsx(
                  "relative overflow-hidden rounded-2xl border transition-all duration-300 group",
                  selectedRouteId === route.id 
                    ? "border-accent bg-accent/5" 
                    : "border-border hover:border-primary/20 bg-background"
                )}
              >
                {/* Progress Bar Background */}
                <div 
                  className="absolute top-0 left-0 h-full bg-secondary transition-all duration-1000 ease-out -z-10"
                  style={{ width: `${Math.min((votesForRoute / (companions?.length || 1)) * 100, 100)}%` }}
                />

                <div className="p-4 md:p-6 flex items-center gap-4 md:gap-8">
                  <img 
                    src={route.imageUrl} 
                    alt={route.name}
                    className="w-16 h-16 md:w-24 md:h-24 rounded-xl object-cover shadow-sm"
                  />
                  
                  <div className="flex-1">
                    <h3 className="text-xl font-display text-primary flex items-center gap-2">
                      {route.name}
                      {isTop && <span className="text-xs bg-accent text-white px-2 py-0.5 rounded-full">領先</span>}
                    </h3>
                    <div className="flex items-center gap-1 text-muted-foreground text-sm">
                      <MapPin size={14} /> {route.locationName}
                    </div>
                  </div>

                  <div className="flex flex-col items-end gap-2">
                    <div className="text-2xl font-bold font-display text-primary">
                      {votesForRoute} <span className="text-xs font-sans text-muted-foreground font-normal">票</span>
                    </div>
                    <button
                      onClick={() => handleVote(route.id)}
                      disabled={castVoteMutation.isPending}
                      className="px-4 py-2 bg-white border border-border rounded-lg text-sm font-bold uppercase tracking-wider hover:bg-primary hover:text-white hover:border-primary transition-colors flex items-center gap-2"
                    >
                      <ThumbsUp size={14} /> 投票
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

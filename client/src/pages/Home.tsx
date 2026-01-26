import { useRoutes } from "@/hooks/use-routes";
import { RouteCard } from "@/components/RouteCard";
import { ArrowRight, Globe, Mountain } from "lucide-react";
import { Link } from "wouter";
import { motion } from "framer-motion";

export default function Home() {
  const { data: routes, isLoading } = useRoutes();

  const featuredRoute = routes?.[0];
  const otherRoutes = routes?.slice(1, 3);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-pulse flex flex-col items-center">
          <div className="h-16 w-16 bg-muted rounded-full mb-4"></div>
          <div className="h-4 w-48 bg-muted rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-24 md:pb-12 bg-background">
      {/* Hero Section */}
      <section className="relative h-[85vh] w-full overflow-hidden rounded-b-[3rem] shadow-2xl">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1551632811-561732d1e306?q=80&w=2070&auto=format&fit=crop" 
            alt="健行英雄圖" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/30 to-transparent" />
        </div>

        <div className="relative h-full flex flex-col justify-end p-6 md:p-16 max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="max-w-3xl"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent/90 backdrop-blur-sm text-white text-xs font-bold uppercase tracking-widest mb-6 border border-white/10">
              <Globe size={14} /> 全球探險 2024
            </div>
            
            <h1 className="text-5xl md:text-8xl text-white font-display mb-6 leading-[0.9] text-shadow-lg">
              探索<br/>
              <span className="text-accent italic font-serif normal-case pr-4">未知</span> 
              的道路
            </h1>
            
            <p className="text-lg md:text-xl text-white/80 max-w-xl mb-10 leading-relaxed">
              加入全球探險家社群，記錄步道、規劃遠征，並發現世界上最令人驚嘆的路線。
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/map" className="px-8 py-4 bg-accent text-white rounded-xl font-bold uppercase tracking-widest hover:bg-white hover:text-accent transition-all duration-300 shadow-lg shadow-accent/25 flex items-center justify-center gap-2">
                開始探索 <Globe size={18} />
              </Link>
              <Link href="/routes" className="px-8 py-4 bg-white/10 backdrop-blur-md border border-white/20 text-white rounded-xl font-bold uppercase tracking-widest hover:bg-white hover:text-primary transition-all duration-300 flex items-center justify-center gap-2">
                瀏覽路線 <Mountain size={18} />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Routes Wall */}
      <section className="max-w-7xl mx-auto px-4 py-20">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12">
          <div>
            <h2 className="text-primary text-4xl md:text-5xl font-display mb-2">經典步道</h2>
            <p className="text-muted-foreground text-lg">為冒險家精選的路線。</p>
          </div>
          <Link href="/routes" className="hidden md:flex items-center gap-2 text-accent font-bold uppercase tracking-widest hover:text-primary transition-colors mt-4 md:mt-0">
            查看所有路線 <ArrowRight size={16} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {featuredRoute && (
            <div className="md:col-span-8 h-full">
               <RouteCard route={featuredRoute} />
            </div>
          )}
          
          <div className="md:col-span-4 flex flex-col gap-8">
            {otherRoutes?.map(route => (
              <div key={route.id} className="h-64 md:h-full">
                <RouteCard route={route} compact={true} />
              </div>
            ))}
            
            <Link href="/routes" className="p-8 rounded-3xl bg-secondary border border-border hover:border-accent group transition-all duration-300 flex flex-col items-center justify-center text-center cursor-pointer h-full min-h-[200px]">
              <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-sm">
                <ArrowRight className="text-primary" size={24} />
              </div>
              <h3 className="text-xl text-primary font-display">探索更多</h3>
              <p className="text-sm text-muted-foreground mt-2">瀏覽 50+ 條全球步道</p>
            </Link>
          </div>
        </div>
      </section>
      
      {/* Decorative Text */}
      <div className="overflow-hidden py-10 bg-primary/5">
        <div className="whitespace-nowrap opacity-10 text-9xl font-display text-primary uppercase select-none">
          冒險 • 探索 • 記錄 • 旅行 • 冒險 • 探索 • 記錄 • 旅行
        </div>
      </div>
    </div>
  );
}

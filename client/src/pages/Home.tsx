import { useRoutes } from "@/hooks/use-routes";
import { RouteCard } from "@/components/RouteCard";
import { ArrowRight, Globe, Mountain, Compass, Trees, HeartPulse, Sparkles } from "lucide-react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { useRef } from "react";
import type { Route } from "@shared/schema";

export default function Home() {
  const { data: routes, isLoading } = useRoutes();
  const routesRef = useRef<HTMLElement | null>(null);

  const featuredRoute = routes?.[0];
  const otherRoutes = routes?.slice(1, 4);
  const totalRoutes = routes?.length ?? 0;
  const regionsCount = new Set((routes ?? []).map((r: Route) => r.region).filter(Boolean)).size;

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
      {/* Hero Section (全球健行 Landing 風格) */}
      <section className="relative min-h-[90vh] w-full overflow-hidden rounded-b-[3rem] shadow-2xl">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1551632811-561732d1e306?q=80&w=2070&auto=format&fit=crop" 
            alt="健行英雄圖" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-primary/40 to-transparent" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(34,197,94,0.25),transparent_55%),radial-gradient(circle_at_80%_70%,rgba(56,189,248,0.20),transparent_55%)]" />
          <div className="absolute inset-0 opacity-20 [background-image:repeating-linear-gradient(45deg,transparent,transparent_10px,rgba(255,255,255,0.08)_10px,rgba(255,255,255,0.08)_20px)]" />
        </div>

        <div className="relative h-full min-h-[90vh] flex flex-col justify-end p-6 md:p-16 max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="max-w-3xl"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent/90 backdrop-blur-sm text-white text-xs font-bold uppercase tracking-widest mb-6 border border-white/10">
              <Globe size={14} /> 全球健行 2026 及未來
            </div>
            
            <h1 className="text-5xl md:text-8xl text-white font-display mb-6 leading-[0.9] text-shadow-lg">
              踏上你的<br />
              <span className="text-accent italic font-serif normal-case pr-4">全球健行</span>
              冒險
            </h1>
            
            <p className="text-lg md:text-xl text-white/80 max-w-xl mb-10 leading-relaxed">
              從高山到海岸，從雨林到極地。用一張地圖、一份路線清單，把世界走成你的故事。
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => routesRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })}
                className="px-8 py-4 bg-accent text-white rounded-xl font-bold uppercase tracking-widest hover:bg-white hover:text-accent transition-all duration-300 shadow-lg shadow-accent/25 flex items-center justify-center gap-2"
                data-testid="button-scroll-routes"
              >
                開始探索 <Compass size={18} />
              </button>
              <Link href="/routes" className="px-8 py-4 bg-white/10 backdrop-blur-md border border-white/20 text-white rounded-xl font-bold uppercase tracking-widest hover:bg-white hover:text-primary transition-all duration-300 flex items-center justify-center gap-2">
                前往路線牆 <Mountain size={18} />
              </Link>
            </div>

            <div className="mt-10 grid grid-cols-3 gap-3 max-w-xl">
              <div className="rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 px-4 py-3">
                <div className="text-2xl font-display font-bold text-white">{totalRoutes}</div>
                <div className="text-[11px] uppercase tracking-widest font-bold text-white/70">精選路線</div>
              </div>
              <div className="rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 px-4 py-3">
                <div className="text-2xl font-display font-bold text-white">{regionsCount || 6}</div>
                <div className="text-[11px] uppercase tracking-widest font-bold text-white/70">地區/洲</div>
              </div>
              <div className="rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 px-4 py-3">
                <div className="text-2xl font-display font-bold text-white">∞</div>
                <div className="text-[11px] uppercase tracking-widest font-bold text-white/70">冒險可能</div>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="absolute bottom-6 left-1/2 -translate-x-1/2">
          <div className="h-8 w-8 rotate-45 border-r-2 border-b-2 border-white/70 animate-bounce" />
        </div>
      </section>

      {/* Features */}
      <section className="max-w-7xl mx-auto px-4 py-20">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent text-white text-xs font-bold uppercase tracking-widest mb-4 shadow-lg shadow-accent/25">
            為什麼健行？
          </div>
          <h2 className="text-primary text-4xl md:text-5xl font-display mb-3">踏上冒險的理由</h2>
          <p className="text-muted-foreground text-lg">把身體交給道路，把心交給風景。</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { icon: Trees, title: "親近自然", desc: "遠離城市喧囂，回到森林與山稜的節奏。" },
            { icon: HeartPulse, title: "強健體魄", desc: "累積耐力與肌力，讓每次上坡都更從容。" },
            { icon: Sparkles, title: "心靈放鬆", desc: "在長距離行走中，重新整理思緒與情緒。" },
            { icon: Globe, title: "探索世界", desc: "跨越地形與文化，走進你從未到過的地方。" },
          ].map((f) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.45 }}
              className="rounded-3xl bg-white border border-border/50 shadow-lg shadow-black/5 p-6 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
            >
              <div className="w-12 h-12 rounded-2xl bg-accent/10 text-accent flex items-center justify-center mb-4">
                <f.icon size={22} />
              </div>
              <h3 className="text-primary font-display text-2xl mb-2">{f.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Featured Routes Wall */}
      <section ref={(el: HTMLElement | null) => { routesRef.current = el; }} className="max-w-7xl mx-auto px-4 py-20">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary text-white text-xs font-bold uppercase tracking-widest mb-4 shadow-lg shadow-primary/25">
              精選路線
            </div>
            <h2 className="text-primary text-4xl md:text-5xl font-display mb-2">全球精選健行路線</h2>
            <p className="text-muted-foreground text-lg">從入門到挑戰級，找到適合你的下一段遠征。</p>
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
            {otherRoutes?.map((route: Route) => (
              <div key={route.id} className="h-64 md:h-full">
                <RouteCard route={route} compact={true} />
              </div>
            ))}
            
            <Link href="/routes" className="p-8 rounded-3xl bg-secondary border border-border hover:border-accent group transition-all duration-300 flex flex-col items-center justify-center text-center cursor-pointer h-full min-h-[200px]">
              <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-sm">
                <ArrowRight className="text-primary" size={24} />
              </div>
              <h3 className="text-xl text-primary font-display">探索更多</h3>
              <p className="text-sm text-muted-foreground mt-2">瀏覽全部 {totalRoutes} 條全球步道</p>
            </Link>
          </div>
        </div>
      </section>

      {/* About */}
      <section className="max-w-7xl mx-auto px-4 pb-20">
        <div className="rounded-[3rem] bg-white border border-border/50 shadow-xl shadow-black/5 p-8 md:p-12 relative overflow-hidden">
          <div className="absolute -top-24 -right-24 w-80 h-80 rounded-full bg-accent/10 blur-3xl" />
          <div className="absolute -bottom-24 -left-24 w-80 h-80 rounded-full bg-primary/10 blur-3xl" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent text-white text-xs font-bold uppercase tracking-widest mb-4 shadow-lg shadow-accent/25">
                關於我們
              </div>
              <h2 className="text-primary text-4xl md:text-5xl font-display mb-4">全球健行探索</h2>
              <p className="text-muted-foreground text-lg leading-relaxed mb-4">
                我們把世界各地的健行路線整理成一個可視化的冒險資料庫：你可以用地圖探索、用路線牆收藏，並為下一次遠征做準備。
              </p>
              <p className="text-muted-foreground leading-relaxed">
                不論你偏好週末輕健行、長距離縱走、或高海拔挑戰，這裡都會是你的出發點。
              </p>
            </div>
            <div className="lg:col-span-5">
              <div className="rounded-3xl bg-secondary border border-border p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-2xl bg-primary text-white flex items-center justify-center font-display font-bold">
                    GH
                  </div>
                  <div>
                    <div className="font-bold text-primary">Global Hiker</div>
                    <div className="text-xs text-muted-foreground uppercase tracking-widest font-bold">2026 及未來</div>
                  </div>
                </div>
                <ul className="space-y-3 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="mt-0.5 text-accent">•</span>
                    路線資料來源：本地 `data.json`（Vercel 可直接顯示）
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-0.5 text-accent">•</span>
                    以地區/難度/狀態（已去過/計畫/願望）管理你的冒險清單
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-0.5 text-accent">•</span>
                    下一步可加入：GPX 上傳、行程規劃、旅伴協作
                  </li>
                </ul>
                <div className="mt-6 flex flex-col sm:flex-row gap-3">
                  <Link
                    href="/routes"
                    className="flex-1 px-5 py-3 bg-primary text-white rounded-xl font-bold uppercase tracking-widest text-sm flex items-center justify-center gap-2 hover:bg-primary/90 transition-colors"
                  >
                    立即瀏覽 <ArrowRight size={16} />
                  </Link>
                  <Link
                    href="/map"
                    className="flex-1 px-5 py-3 bg-white border border-border text-primary rounded-xl font-bold uppercase tracking-widest text-sm flex items-center justify-center gap-2 hover:bg-secondary transition-colors"
                  >
                    打開地圖 <Globe size={16} />
                  </Link>
                </div>
              </div>
            </div>
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

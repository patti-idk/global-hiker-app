import { Link, useLocation } from "wouter";
import { Map, Users, Compass, Tent } from "lucide-react";
import { clsx } from "clsx";

export function Navigation() {
  const [location] = useLocation();

  const navItems = [
    { href: "/", label: "首頁", icon: Compass },
    { href: "/routes", label: "路線", icon: Tent },
    { href: "/map", label: "地圖", icon: Map },
    { href: "/companions", label: "旅伴", icon: Users },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-t border-border/50 pb-safe md:top-0 md:left-0 md:bottom-auto md:w-20 md:h-screen md:border-r md:border-t-0 md:flex md:flex-col md:items-center md:py-8 shadow-2xl shadow-black/5">
      <div className="hidden md:block mb-8">
        <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-white font-bold text-xl font-display">
          M
        </div>
      </div>
      
      <div className="flex md:flex-col justify-around md:justify-start w-full md:gap-8 px-4 py-2 md:p-0">
        {navItems.map((item) => {
          const isActive = location === item.href;
          return (
            <Link key={item.href} href={item.href} className="group flex flex-col items-center gap-1 cursor-pointer">
              <div 
                className={clsx(
                  "p-3 rounded-2xl transition-all duration-300",
                  isActive 
                    ? "bg-primary text-white shadow-lg shadow-primary/30 scale-105" 
                    : "text-muted-foreground hover:bg-muted hover:text-primary"
                )}
              >
                <item.icon size={24} strokeWidth={isActive ? 2.5 : 2} />
              </div>
              <span className={clsx(
                "text-[10px] uppercase font-bold tracking-wider hidden md:block transition-colors",
                isActive ? "text-primary" : "text-muted-foreground"
              )}>
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

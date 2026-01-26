import { useRoutes } from "@/hooks/use-routes";
import { RouteCard } from "@/components/RouteCard";
import { Search, Filter, MapPin, CheckCircle, Compass } from "lucide-react";
import { useState } from "react";

const regions = ["全部", "亞洲", "歐洲", "美洲", "大洋洲", "非洲"];
const statuses = [
  { value: "all", label: "全部狀態", icon: Compass },
  { value: "visited", label: "已去過", icon: CheckCircle },
  { value: "planned", label: "計劃前往", icon: MapPin },
  { value: "wishlist", label: "願望清單", icon: Filter },
];

export default function RouteList() {
  const { data: routes, isLoading } = useRoutes();
  const [search, setSearch] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("全部");
  const [selectedStatus, setSelectedStatus] = useState("all");

  const filteredRoutes = routes?.filter(r => {
    const matchesSearch = r.name.toLowerCase().includes(search.toLowerCase()) || 
      r.locationName.toLowerCase().includes(search.toLowerCase());
    const matchesRegion = selectedRegion === "全部" || r.region === selectedRegion;
    const matchesStatus = selectedStatus === "all" || r.status === selectedStatus;
    return matchesSearch && matchesRegion && matchesStatus;
  });

  const routeCountByStatus = {
    all: routes?.length || 0,
    visited: routes?.filter(r => r.status === "visited").length || 0,
    planned: routes?.filter(r => r.status === "planned").length || 0,
    wishlist: routes?.filter(r => r.status === "wishlist").length || 0,
  };

  return (
    <div className="min-h-screen pb-24 md:pb-12 bg-background pt-24 px-4 md:px-8 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start mb-8 gap-6">
        <div>
          <h1 className="text-4xl md:text-6xl text-primary font-display mb-2">路線紀錄牆</h1>
          <p className="text-muted-foreground">探索我們收藏的 {routes?.length || 0} 條世界級健行步道。</p>
        </div>
        
        <div className="relative w-full md:w-80">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5" />
          <input 
            type="text" 
            placeholder="搜尋步道..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-12 pr-4 py-3 rounded-xl bg-white border border-border focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none transition-all"
            data-testid="input-search"
          />
        </div>
      </div>

      {/* Status Filter Tabs */}
      <div className="flex flex-wrap gap-3 mb-6">
        {statuses.map(status => (
          <button
            key={status.value}
            onClick={() => setSelectedStatus(status.value)}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold uppercase tracking-wider transition-all ${
              selectedStatus === status.value 
                ? "bg-primary text-white shadow-lg shadow-primary/25" 
                : "bg-white border border-border text-muted-foreground hover:border-primary hover:text-primary"
            }`}
            data-testid={`button-status-${status.value}`}
          >
            <status.icon size={16} />
            {status.label}
            <span className={`ml-1 px-2 py-0.5 rounded-full text-xs ${
              selectedStatus === status.value ? "bg-white/20" : "bg-muted"
            }`}>
              {routeCountByStatus[status.value as keyof typeof routeCountByStatus]}
            </span>
          </button>
        ))}
      </div>

      {/* Region Filter */}
      <div className="flex flex-wrap gap-2 mb-10">
        {regions.map(region => (
          <button
            key={region}
            onClick={() => setSelectedRegion(region)}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
              selectedRegion === region 
                ? "bg-accent text-white" 
                : "bg-secondary text-muted-foreground hover:bg-accent/10 hover:text-accent"
            }`}
            data-testid={`button-region-${region}`}
          >
            {region}
          </button>
        ))}
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3, 4, 5, 6].map(i => (
            <div key={i} className="h-96 rounded-3xl bg-gray-100 animate-pulse" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredRoutes?.map(route => (
            <div key={route.id} className="h-full">
              <RouteCard route={route} />
            </div>
          ))}
          
          {filteredRoutes?.length === 0 && (
            <div className="col-span-full py-24 text-center">
              <p className="text-xl text-muted-foreground">找不到符合條件的路線。</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

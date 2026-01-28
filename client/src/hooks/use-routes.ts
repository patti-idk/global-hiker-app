import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type { Route } from "@shared/schema";
import type { InsertRoute } from "@shared/schema";

type RoutesJson = {
  routes: Route[];
};

async function fetchLocalRoutes(): Promise<Route[]> {
  const res = await fetch("/data.json", { cache: "no-cache" });
  if (!res.ok) throw new Error("Failed to fetch local data.json");
  const json = (await res.json()) as RoutesJson;
  if (!json || !Array.isArray(json.routes)) return [];
  return json.routes;
}

// GET /data.json (local, for Vercel/static)
export function useRoutes() {
  return useQuery({
    queryKey: ["local-routes"],
    queryFn: fetchLocalRoutes,
  });
}

// GET /data.json then find by id
export function useRoute(id: number) {
  return useQuery({
    queryKey: ["local-route", id],
    queryFn: async () => {
      const routes = await fetchLocalRoutes();
      return routes.find((r) => r.id === id) ?? null;
    },
    enabled: !!id,
  });
}

// 本地 JSON 模式下不支援新增（Vercel 靜態部署無法寫入）
export function useCreateRoute() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (_data: InsertRoute) => {
      throw new Error("目前為靜態模式：無法新增路線（僅讀取 /data.json）");
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["local-routes"] }),
  });
}

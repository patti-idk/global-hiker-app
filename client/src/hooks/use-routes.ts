import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api, buildUrl, type InsertRoute } from "@shared/routes";

// GET /api/routes
export function useRoutes() {
  return useQuery({
    queryKey: [api.routes.list.path],
    queryFn: async () => {
      const res = await fetch(api.routes.list.path, { credentials: "include" });
      if (!res.ok) throw new Error('Failed to fetch routes');
      return api.routes.list.responses[200].parse(await res.json());
    },
  });
}

// GET /api/routes/:id
export function useRoute(id: number) {
  return useQuery({
    queryKey: [api.routes.get.path, id],
    queryFn: async () => {
      const url = buildUrl(api.routes.get.path, { id });
      const res = await fetch(url, { credentials: "include" });
      if (res.status === 404) return null;
      if (!res.ok) throw new Error('Failed to fetch route');
      return api.routes.get.responses[200].parse(await res.json());
    },
    enabled: !!id,
  });
}

// POST /api/routes
export function useCreateRoute() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: InsertRoute) => {
      const res = await fetch(api.routes.create.path, {
        method: api.routes.create.method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
        credentials: "include",
      });
      if (!res.ok) {
        if (res.status === 400) {
          const error = api.routes.create.responses[400].parse(await res.json());
          throw new Error(error.message);
        }
        throw new Error('Failed to create route');
      }
      return api.routes.create.responses[201].parse(await res.json());
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [api.routes.list.path] }),
  });
}

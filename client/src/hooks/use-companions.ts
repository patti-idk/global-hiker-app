import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api, type InsertVote } from "@shared/routes";

// GET /api/companions
export function useCompanions() {
  return useQuery({
    queryKey: [api.companions.list.path],
    queryFn: async () => {
      const res = await fetch(api.companions.list.path, { credentials: "include" });
      if (!res.ok) throw new Error('Failed to fetch companions');
      return api.companions.list.responses[200].parse(await res.json());
    },
  });
}

// GET /api/votes
export function useVotes() {
  return useQuery({
    queryKey: [api.votes.list.path],
    queryFn: async () => {
      const res = await fetch(api.votes.list.path, { credentials: "include" });
      if (!res.ok) throw new Error('Failed to fetch votes');
      return api.votes.list.responses[200].parse(await res.json());
    },
  });
}

// POST /api/votes
export function useCastVote() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: InsertVote) => {
      const res = await fetch(api.votes.create.path, {
        method: api.votes.create.method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
        credentials: "include",
      });
      if (!res.ok) {
        if (res.status === 400) {
          const error = api.votes.create.responses[400].parse(await res.json());
          throw new Error(error.message);
        }
        throw new Error('Failed to cast vote');
      }
      return api.votes.create.responses[201].parse(await res.json());
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [api.votes.list.path] }),
  });
}

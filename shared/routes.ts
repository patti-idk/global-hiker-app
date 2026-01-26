
import { z } from 'zod';
import { insertRouteSchema, insertCompanionSchema, insertVoteSchema, routes, companions, votes } from './schema';

// ============================================
// SHARED ERROR SCHEMAS
// ============================================
export const errorSchemas = {
  validation: z.object({
    message: z.string(),
    field: z.string().optional(),
  }),
  notFound: z.object({
    message: z.string(),
  }),
  internal: z.object({
    message: z.string(),
  }),
};

// ============================================
// API CONTRACT
// ============================================
export const api = {
  routes: {
    list: {
      method: 'GET' as const,
      path: '/api/routes',
      responses: {
        200: z.array(z.custom<typeof routes.$inferSelect>()),
      },
    },
    get: {
      method: 'GET' as const,
      path: '/api/routes/:id',
      responses: {
        200: z.custom<typeof routes.$inferSelect>(),
        404: errorSchemas.notFound,
      },
    },
    // For seeding or manual entry if needed later
    create: {
      method: 'POST' as const,
      path: '/api/routes',
      input: insertRouteSchema,
      responses: {
        201: z.custom<typeof routes.$inferSelect>(),
        400: errorSchemas.validation,
      },
    },
  },
  companions: {
    list: {
      method: 'GET' as const,
      path: '/api/companions',
      responses: {
        200: z.array(z.custom<typeof companions.$inferSelect>()),
      },
    },
  },
  votes: {
    create: {
      method: 'POST' as const,
      path: '/api/votes',
      input: insertVoteSchema,
      responses: {
        201: z.custom<typeof votes.$inferSelect>(),
        400: errorSchemas.validation,
      },
    },
    list: {
      method: 'GET' as const,
      path: '/api/votes',
      responses: {
        200: z.array(z.custom<typeof votes.$inferSelect>()),
      },
    },
  },
};

// ============================================
// HELPER
// ============================================
export function buildUrl(path: string, params?: Record<string, string | number>): string {
  let url = path;
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (url.includes(`:${key}`)) {
        url = url.replace(`:${key}`, String(value));
      }
    });
  }
  return url;
}

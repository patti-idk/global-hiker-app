
import { pgTable, text, serial, integer, boolean, doublePrecision } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// === TABLE DEFINITIONS ===

export const routes = pgTable("routes", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  locationName: text("location_name").notNull(),
  lat: doublePrecision("lat").notNull(),
  lng: doublePrecision("lng").notNull(),
  lengthKm: doublePrecision("length_km").notNull(),
  altitudeM: integer("altitude_m").notNull(),
  difficulty: text("difficulty").notNull(), // "Easy", "Moderate", "Hard"
  imageUrl: text("image_url").notNull(),
  isFavorite: boolean("is_favorite").default(false),
  status: text("status").default("planned"), // "visited" (已去過), "planned" (計劃前往), "wishlist" (願望清單)
  region: text("region").notNull().default("亞洲"), // 地理區域: 美洲, 歐洲, 亞洲, 大洋洲, 非洲
});

export const companions = pgTable("companions", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  avatarUrl: text("avatar_url").notNull(),
});

export const votes = pgTable("votes", {
  id: serial("id").primaryKey(),
  routeId: integer("route_id").notNull(),
  companionId: integer("companion_id").notNull(),
});

// === SCHEMAS ===

export const insertRouteSchema = createInsertSchema(routes).omit({ id: true });
export const insertCompanionSchema = createInsertSchema(companions).omit({ id: true });
export const insertVoteSchema = createInsertSchema(votes).omit({ id: true });

// === TYPES ===

export type Route = typeof routes.$inferSelect;
export type InsertRoute = z.infer<typeof insertRouteSchema>;

export type Companion = typeof companions.$inferSelect;
export type InsertCompanion = z.infer<typeof insertCompanionSchema>;

export type Vote = typeof votes.$inferSelect;
export type InsertVote = z.infer<typeof insertVoteSchema>;


import { db } from "./db";
import {
  routes, companions, votes,
  type Route, type InsertRoute,
  type Companion, type InsertCompanion,
  type Vote, type InsertVote
} from "@shared/schema";
import { eq, desc } from "drizzle-orm";

export interface IStorage {
  // Routes
  getRoutes(): Promise<Route[]>;
  getRoute(id: number): Promise<Route | undefined>;
  createRoute(route: InsertRoute): Promise<Route>;

  // Companions
  getCompanions(): Promise<Companion[]>;
  createCompanion(companion: InsertCompanion): Promise<Companion>;

  // Votes
  getVotes(): Promise<Vote[]>;
  createVote(vote: InsertVote): Promise<Vote>;
}

export class DatabaseStorage implements IStorage {
  // Routes
  async getRoutes(): Promise<Route[]> {
    return await db.select().from(routes);
  }

  async getRoute(id: number): Promise<Route | undefined> {
    const [route] = await db.select().from(routes).where(eq(routes.id, id));
    return route;
  }

  async createRoute(insertRoute: InsertRoute): Promise<Route> {
    const [route] = await db.insert(routes).values(insertRoute).returning();
    return route;
  }

  // Companions
  async getCompanions(): Promise<Companion[]> {
    return await db.select().from(companions);
  }

  async createCompanion(insertCompanion: InsertCompanion): Promise<Companion> {
    const [companion] = await db.insert(companions).values(insertCompanion).returning();
    return companion;
  }

  // Votes
  async getVotes(): Promise<Vote[]> {
    return await db.select().from(votes);
  }

  async createVote(insertVote: InsertVote): Promise<Vote> {
    const [vote] = await db.insert(votes).values(insertVote).returning();
    return vote;
  }
}

export const storage = new DatabaseStorage();

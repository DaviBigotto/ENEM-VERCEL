import { type User, type InsertUser, type QuizResponse, type InsertQuizResponse } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  createQuizResponse(response: InsertQuizResponse): Promise<QuizResponse>;
  getQuizResponse(sessionId: string): Promise<QuizResponse | undefined>;
  updateQuizResponse(id: string, updates: Partial<QuizResponse>): Promise<QuizResponse | undefined>;
  getQuizStats(): Promise<{ totalResponses: number; completionRate: number }>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private quizResponses: Map<string, QuizResponse>;

  constructor() {
    this.users = new Map();
    this.quizResponses = new Map();
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async createQuizResponse(insertResponse: InsertQuizResponse): Promise<QuizResponse> {
    const id = randomUUID();
    const response: QuizResponse = {
      ...insertResponse,
      id,
      personalizedMessage: insertResponse.personalizedMessage || null,
      completedAt: new Date(),
      purchaseInitiated: null,
    };
    this.quizResponses.set(id, response);
    return response;
  }

  async getQuizResponse(sessionId: string): Promise<QuizResponse | undefined> {
    return Array.from(this.quizResponses.values()).find(
      (response) => response.sessionId === sessionId,
    );
  }

  async updateQuizResponse(id: string, updates: Partial<QuizResponse>): Promise<QuizResponse | undefined> {
    const existing = this.quizResponses.get(id);
    if (!existing) return undefined;
    
    const updated = { ...existing, ...updates };
    this.quizResponses.set(id, updated);
    return updated;
  }

  async getQuizStats(): Promise<{ totalResponses: number; completionRate: number }> {
    const responses = Array.from(this.quizResponses.values());
    const completedResponses = responses.filter(r => r.completedAt);
    
    return {
      totalResponses: responses.length,
      completionRate: responses.length > 0 ? (completedResponses.length / responses.length) * 100 : 0,
    };
  }
}

export const storage = new MemStorage();

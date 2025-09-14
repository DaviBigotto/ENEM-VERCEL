import { sql } from "drizzle-orm";
import { pgTable, text, varchar, jsonb, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const quizResponses = pgTable("quiz_responses", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  sessionId: text("session_id").notNull(),
  answers: jsonb("answers").notNull(),
  personalizedMessage: text("personalized_message"),
  completedAt: timestamp("completed_at").defaultNow(),
  purchaseInitiated: timestamp("purchase_initiated"),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertQuizResponseSchema = createInsertSchema(quizResponses).pick({
  sessionId: true,
  answers: true,
  personalizedMessage: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type QuizResponse = typeof quizResponses.$inferSelect;
export type InsertQuizResponse = z.infer<typeof insertQuizResponseSchema>;

export const QuizAnswers = z.object({
  question1: z.enum(['organizacao', 'argumentacao', 'gramatica', 'coesao', 'repertorio']),
  question2: z.enum(['sempre', 'as-vezes', 'nunca']),
  question3: z.enum(['mais-3h', '1-3h', 'menos-1h']),
  question4: z.enum(['sempre-inseguro', 'algumas-vezes', 'nunca-inseguro']),
  question5: z.enum(['aumentar-nota', 'ter-confianca', 'tecnicas', 'economizar-tempo'])
});

export type QuizAnswersType = z.infer<typeof QuizAnswers>;

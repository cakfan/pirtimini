import {
  pgTable,
  boolean,
  text,
  timestamp,
  integer,
  pgEnum,
} from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
import { user } from "./user";
import { relations } from "drizzle-orm";

export const Type = pgEnum("type", ["in", "out"]);

export const transaction = pgTable("transaction", {
  id: text("id").primaryKey(),
  description: text("description").notNull(),
  amount: integer("amount").notNull(),
  isPaid: boolean("isPaid").default(false),
  type: Type("type").default("in"),
  date: timestamp("date").notNull(),
  updatedAt: timestamp("updatedAt").notNull(),
  userId: text("userId")
    .notNull()
    .references(() => user.id),
});

export const transcationRelations = relations(transaction, ({ one }) => ({
  author: one(user, {
    fields: [transaction.userId],
    references: [user.id],
  }),
}));

export type TransactionType = typeof transaction.$inferSelect;

export const transactionSchema = createInsertSchema(transaction, {
  amount: z.coerce.number().min(1, { message: "Amount is required" }),
  description: z.string().min(1, { message: "Description is required" }),
}).pick({
  isPaid: true,
  amount: true,
  date: true,
  type: true,
  description: true,
});

export type TransactionValues = z.infer<typeof transactionSchema>;

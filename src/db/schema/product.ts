import { pgTable, text, timestamp, integer } from "drizzle-orm/pg-core";
import { z } from "zod";

export const product = pgTable("product", {
  id: text("id").primaryKey(),
  slug: text("slug").unique().notNull(),
  name: text("name").notNull(),
  price: integer("price").notNull(),
  description: text("description").notNull(),
  createdAt: timestamp("createdAt").notNull(),
  updatedAt: timestamp("updatedAt").notNull(),
});

export type ProductType = typeof product.$inferSelect;

export const productSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  slug: z.string().min(1, { message: "Slug is required" }),
  description: z.string().min(1, { message: "Description is required" }),
  price: z.coerce.number().min(1, { message: "Price is required" }),
});

export type ProductValues = z.infer<typeof productSchema>;

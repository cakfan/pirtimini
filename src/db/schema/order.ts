import {
  pgTable,
  boolean,
  text,
  timestamp,
  integer,
  pgEnum,
} from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { product } from "./product";
import { z } from "zod";
import { user } from "./user";
import { relations } from "drizzle-orm";

export const orderType = pgEnum("type", ["in", "out"]);

export const order = pgTable("order", {
  id: text("id").primaryKey(),
  productId: text("productId")
    .notNull()
    .references(() => product.id),
  qty: integer("qty").notNull(),
  description: text("description"),
  totalPrice: integer("totalPrice").notNull(),
  isPaid: boolean("isPaid").default(false),
  type: orderType("type").default("in"),
  createdAt: timestamp("createdAt").notNull(),
  updatedAt: timestamp("updatedAt").notNull(),
});

export const orderAuthor = pgTable("order_author", {
  id: text("id").primaryKey(),
  userId: text("userId")
    .notNull()
    .references(() => user.id),
  orderId: text("orderId")
    .notNull()
    .references(() => order.id),
});

export const orderRelations = relations(order, ({ one }) => ({
  product: one(product, {
    fields: [order.productId],
    references: [product.id],
  }),
}));

export type OrderType = typeof order.$inferSelect;
export type OrderAuthorType = typeof orderAuthor.$inferSelect;

export const orderSchema = createInsertSchema(order, {
  productId: z.string().min(1, { message: "Product is required" }),
  qty: z.coerce.number().min(1, { message: "Qty is required" }),
}).pick({
  productId: true,
  qty: true,
  isPaid: true,
  createdAt: true,
  type: true,
  description: true,
});

export type OrderValues = z.infer<typeof orderSchema>;

import { boolean, pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { gender, role } from ".";
import { z } from "zod";

export const user = pgTable("user", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  username: text("username").unique(),
  email: text("email").notNull().unique(),
  emailVerified: boolean("emailVerified").notNull(),
  image: text("image"),
  role: role("role").default("member").notNull(),
  gender: gender("gender"),
  createdAt: timestamp("createdAt").notNull(),
  updatedAt: timestamp("updatedAt").notNull(),
});

export type UserType = typeof user.$inferSelect;

export const signInSchema = z.object({
  username: z.string().min(4, { message: "Username is required" }),
  password: z
    .string()
    .min(6, { message: "Password lenght at least 6 characters" }),
});

export type SignInValues = z.infer<typeof signInSchema>;

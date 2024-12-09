"use server";

import { db } from "@/db";
import { user } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function getUser(username: string) {
  try {
    const data = await db.query.user.findFirst({
      where: eq(user?.username, username),
    });
    return data;
  } catch (error) {
    console.error("GET_USER:", error);
    return null;
  }
}

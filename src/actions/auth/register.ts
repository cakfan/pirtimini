"use server";

"use server";

import { db } from "@/db";
import { user } from "@/db/schema";
import { signUp } from "@/lib/auth/client";
import { eq } from "drizzle-orm";

export async function registerUser(name: string) {
  const ridho = {
    email: "ridho@gmail.com",
    name: "Ridho",
    password: "mantapkuy",
    username: "ridho",
  };

  const cakfan = {
    email: "withcakfan@gmail.com",
    name: "Taufan Fatahillah",
    password: "mantapkuy1",
    username: "withcakfan",
  };

  const dataUser = name === "ridho" ? ridho : cakfan;

  const { data } = await signUp.email(dataUser);

  if (data?.session) {
    await db
      .update(user)
      .set({ gender: "male" })
      .where(eq(user.id, data.session.userId));
  }

  console.log("data:", data);
}

"use server";

import { db } from "@/db";
import { transaction, TransactionType } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function getTransaction(
  id: string,
): Promise<TransactionType | null | undefined> {
  try {
    const checkTransaction = await db.query.transaction.findFirst({
      where: eq(transaction.id, id),
    });

    return checkTransaction;
  } catch (error) {
    console.error("GET_TRANSACTION:", error);
    return null;
  }
}

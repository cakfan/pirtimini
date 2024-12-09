"use server";

import { db } from "@/db";
import { transaction, TransactionType } from "@/db/schema";
import { desc } from "drizzle-orm";

export async function getTransactionList(): Promise<
  TransactionType[] | null | undefined
> {
  try {
    const transactions = await db.query.transaction.findMany({
      orderBy: [desc(transaction.updatedAt)],
    });

    return transactions;
  } catch (error) {
    console.error("PRODUCT_LIST:", error);
    return null;
  }
}

"use server";

import { transaction, TransactionType, TransactionValues } from "@/db/schema";
import { getTransaction } from "./get";
import { db } from "@/db";
import { checkUserPersmission } from "../user";
import { eq } from "drizzle-orm";

export async function updateTransaction(
  data: Partial<TransactionValues> & { id: string },
): Promise<{
  error?: string;
  success?: string;
  data?: TransactionType;
}> {
  try {
    const isTransactionExist = await getTransaction(data.id);

    if (!isTransactionExist) {
      return { error: "Transaction not found" };
    }

    const isHavePermission = await checkUserPersmission(["admin"]);

    if (!isHavePermission) {
      return { error: "Access denied" };
    }

    const [update] = await db
      .update(transaction)
      .set(data)
      .where(eq(transaction.id, data.id))
      .returning();

    return { success: "Transaction successfully updated", data: update };
  } catch (error) {
    console.error("UPDATE_TRANSACTION:", error);
    return { error: "Something went wrong" };
  }
}

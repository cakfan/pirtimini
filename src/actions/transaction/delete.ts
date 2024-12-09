"use server";

import { db } from "@/db";
import { transaction } from "@/db/schema";
import { eq } from "drizzle-orm";
import { getTransaction } from "./get";
import { checkUserPersmission } from "../user";

export async function deleteTransaction(
  id: string,
): Promise<{ error?: string; success?: string }> {
  try {
    const isTransactionExist = await getTransaction(id);

    if (!isTransactionExist) {
      return { error: "Transaction not found" };
    }

    const isHavePermission = await checkUserPersmission(["admin"]);

    if (!isHavePermission) {
      return { error: "Access denied" };
    }

    await db.delete(transaction).where(eq(transaction.id, id));

    return { success: "Transaction deleted" };
  } catch (error) {
    console.error("DELETE_TRANSACTION:", error);
    return { error: "Something went wrong" };
  }
}

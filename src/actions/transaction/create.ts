"use server";

import { TransactionValues, transaction, TransactionType } from "@/db/schema";
import { createId } from "@paralleldrive/cuid2";
import { checkUserPersmission, getMe } from "../user";
import { db } from "@/db";

export async function createTransaction(data: TransactionValues): Promise<{
  error?: string;
  success?: string;
  data?: TransactionType;
}> {
  try {
    const isHavePermission = await checkUserPersmission(["admin"]);

    if (!isHavePermission) {
      return { error: "Access denied" };
    }

    const me = await getMe();

    const transactionId = createId();
    const [createdTransaction] = await db
      .insert(transaction)
      .values({
        ...data,
        id: transactionId,
        userId: me!.id,
        updatedAt: new Date(),
      })
      .returning();

    return {
      success: "Transaction successfully created",
      data: createdTransaction,
    };
  } catch (error) {
    console.error("CREATE_TRANSACTION:", error);
    return { error: "Something went wrong" };
  }
}

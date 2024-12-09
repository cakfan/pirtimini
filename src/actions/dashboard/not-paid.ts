import { db } from "@/db";
import { transaction, TransactionType } from "@/db/schema";
import { and, eq } from "drizzle-orm";

export async function getTodayUnpaid() {
  const transactions = await db.query.transaction.findMany({
    where: and(eq(transaction.isPaid, false)),
  });

  const notPaid = calculateNotPaid(transactions);

  return { data: transactions, ...notPaid };
}

export const calculateNotPaid = (
  transactions: TransactionType[],
): { unpaidIncome: number; unpaidOutcome: number } => {
  const unpaidIncome = transactions.reduce((income, transaction) => {
    if (transaction.type === "in" && !transaction.isPaid) {
      return income + transaction.amount;
    }
    return income;
  }, 0);

  const unpaidOutcome = transactions.reduce((outcome, transaction) => {
    if (transaction.type === "out" && !transaction.isPaid) {
      return outcome + transaction.amount;
    }
    return outcome;
  }, 0);

  return { unpaidIncome, unpaidOutcome };
};

import { db } from "@/db";
import { transaction, TransactionType } from "@/db/schema";
import { and, eq, gte, lt } from "drizzle-orm";

export async function getTodayUnpaid() {
  // Set the start date to today at 00:00:00
  const start = new Date();
  start.setHours(0, 0, 0, 0); // Set hours, minutes, seconds, and milliseconds to 0

  // Set the end date to the next day at 00:00:00
  const end = new Date(start);
  end.setDate(start.getDate() + 1);

  const transactions = await db.query.transaction.findMany({
    where: and(
      eq(transaction.isPaid, false),
      gte(transaction.date, start),
      lt(transaction.date, end),
    ),
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

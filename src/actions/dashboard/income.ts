import { db } from "@/db";
import { transaction, TransactionType } from "@/db/schema";
import { and, eq, gte, lt } from "drizzle-orm";

export async function getTodayIncome() {
  // Set the start date to today at 00:00:00
  const start = new Date();
  start.setHours(0, 0, 0, 0); // Set hours, minutes, seconds, and milliseconds to 0

  // Set the end date to the next day at 00:00:00
  const end = new Date(start);
  end.setDate(start.getDate() + 1);

  const transactions = await db.query.transaction.findMany({
    where: and(
      eq(transaction.type, "in"),
      gte(transaction.date, start),
      lt(transaction.date, end),
    ),
  });

  const income = transactions.reduce((inc, transaction) => {
    if (transaction.isPaid) {
      return inc + transaction.amount;
    }
    return inc;
  }, 0);

  return { data: transactions, income };
}

export const calculateIncome = (transactions: TransactionType[]): number => {
  return transactions.reduce((income, transaction) => {
    if (transaction.isPaid) {
      if (transaction.type === "in") {
        return income + transaction.amount;
      } else if (transaction.type === "out") {
        return income - transaction.amount;
      }
    }
    return income;
  }, 0);
};

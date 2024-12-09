import { db } from "@/db";
import { transaction, TransactionType } from "@/db/schema";
import { and, eq, gte, lt } from "drizzle-orm";

export async function getTodayOutcome() {
  // Set the start date to today at 00:00:00
  const start = new Date();
  start.setHours(0, 0, 0, 0); // Set hours, minutes, seconds, and milliseconds to 0

  // Set the end date to the next day at 00:00:00
  const end = new Date(start);
  end.setDate(start.getDate() + 1);

  const transactions = await db.query.transaction.findMany({
    where: and(
      eq(transaction.type, "out"),
      gte(transaction.date, start),
      lt(transaction.date, end),
    ),
  });

  const outcome = transactions.reduce((out, transaction) => {
    if (transaction.isPaid) {
      return out + transaction.amount;
    }
    return out;
  }, 0);

  return { data: transactions, outcome };
}

export const calculateOutcome = (transactions: TransactionType[]): number => {
  return transactions.reduce((outcome, transaction) => {
    if (transaction.type === "out" && transaction.isPaid) {
      return outcome + transaction.amount;
    }
    return outcome;
  }, 0);
};

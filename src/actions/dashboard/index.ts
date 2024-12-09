import { and, gte, lt } from "drizzle-orm";
import { transaction } from "@/db/schema";
import { db } from "@/db";

export async function getTransactionListByDate(year: number) {
  // Build the start and end timestamps for filtering
  const start = new Date(year, 0, 1); // January 1st
  const end = new Date(year + 1, 0, 1); // January 1st of the next year

  const transactions = await db.query.transaction.findMany({
    where: and(gte(transaction.date, start), lt(transaction.date, end)),
  });

  const monthlyTransactions = Array.from({ length: 12 }, (_, i) => ({
    month: new Date(0, i).toLocaleString("default", { month: "long" }),
    income: 0,
    outcome: 0,
    unPaid: { income: 0, outcome: 0 },
  }));

  transactions.forEach((trx) => {
    const monthIndex = new Date(trx.date).getMonth(); // Get month as 0-11 index

    if (trx.type === "in") {
      if (trx.isPaid) {
        monthlyTransactions[monthIndex].income += trx.amount;
      } else {
        monthlyTransactions[monthIndex].unPaid.income += trx.amount;
      }
    } else if (trx.type === "out") {
      if (trx.isPaid) {
        monthlyTransactions[monthIndex].outcome += trx.amount;
      } else {
        monthlyTransactions[monthIndex].unPaid.outcome += trx.amount;
      }
    }
  });

  return monthlyTransactions;
}

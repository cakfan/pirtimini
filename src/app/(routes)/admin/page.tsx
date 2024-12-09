import { type Metadata } from "next";
import { getTransactionListByDate } from "@/actions/dashboard";
import Header from "@/components/header";
import Breadcrumbs from "@/components/header/breadcrumb";
import NumberFlow from "@number-flow/react";
import { ChartArea } from "@/components/chart/area";
import { getTodayIncome } from "@/actions/dashboard/income";
import { getTodayOutcome } from "@/actions/dashboard/outcome";
import { getTodayUnpaid } from "@/actions/dashboard/not-paid";

export const metadata: Metadata = {
  title: "Dashboard",
};

export default async function Page() {
  // Fetch orders for December 3, 2024
  const transaction = await getTransactionListByDate(2024);
  const todayIncome = await getTodayIncome();
  const todayOutcome = await getTodayOutcome();
  const todayUnpaid = await getTodayUnpaid();
  return (
    <div className="flex min-h-screen w-full flex-col">
      <Header>
        <Breadcrumbs title="Admin" currentPath="Dashboard" />
      </Header>
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <div className="grid auto-rows-min gap-4 md:grid-cols-3">
          <div className="flex aspect-video flex-col items-center justify-between rounded-xl bg-muted/50 p-4">
            <span className="text-lead w-fit">Income</span>
            <h3 className="w-fit text-4xl text-emerald-500">
              <NumberFlow
                value={todayIncome.income}
                format={{
                  style: "currency",
                  currency: "IDR",
                  trailingZeroDisplay: "stripIfInteger",
                }}
              />
            </h3>
            <small>{todayIncome.data.length} transactions</small>
          </div>
          <div className="flex aspect-video flex-col items-center justify-between rounded-xl bg-muted/50 p-4">
            <span className="text-lead w-fit">Outcome</span>
            <h3 className="w-fit text-4xl text-red-500">
              <NumberFlow
                value={todayOutcome.outcome}
                format={{
                  style: "currency",
                  currency: "IDR",
                  trailingZeroDisplay: "stripIfInteger",
                }}
              />
            </h3>
            <small>{todayOutcome.data.length} transactions</small>
          </div>
          <div className="flex aspect-video flex-col items-center justify-between rounded-xl bg-muted/50 p-4">
            <span className="text-lead w-fit">Unpaid</span>
            <div className="flex flex-wrap gap-2">
              <h3 className="text-large w-fit text-emerald-500">
                <NumberFlow
                  value={todayUnpaid.unpaidIncome}
                  format={{
                    style: "currency",
                    currency: "IDR",
                    trailingZeroDisplay: "stripIfInteger",
                  }}
                />
              </h3>
              <h3 className="text-large w-fit text-red-500">
                <NumberFlow
                  value={todayUnpaid.unpaidOutcome}
                  format={{
                    style: "currency",
                    currency: "IDR",
                    trailingZeroDisplay: "stripIfInteger",
                  }}
                />
              </h3>
            </div>
            <small>{todayUnpaid.data.length} transactions</small>
          </div>
        </div>
        <div className="min-h-[100vh] flex-1 md:min-h-min">
          <ChartArea data={transaction ?? []} />
        </div>
      </div>
    </div>
  );
}

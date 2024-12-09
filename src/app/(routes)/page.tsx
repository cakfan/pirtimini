import { getTodayIncome } from "@/actions/dashboard/income";
import { getMe } from "@/actions/user";
import { ModeToggle } from "@/components/btn/ModeToggle";
import SignOutButton from "@/components/btn/SignOutButton";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import NumberFlow from "@number-flow/react";
import Link from "next/link";

export default async function Home() {
  const me = await getMe();
  const todayIncome = await getTodayIncome();
  return (
    <div className="grid min-h-screen grid-rows-[20px_1fr_20px] items-center justify-items-center gap-16 p-8 pb-20 font-[family-name:var(--font-geist-sans)] sm:p-20">
      <main className="row-start-2 flex flex-col items-center gap-8 sm:items-start">
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
      </main>
      <footer className="row-start-3 flex flex-wrap items-center justify-center gap-6">
        <ModeToggle />
        <Link
          href={"/admin"}
          className={cn(buttonVariants({ variant: "default" }))}
        >
          Dashboard
        </Link>
        {me ? (
          <SignOutButton />
        ) : (
          <Link
            href={"/signin"}
            className={cn(buttonVariants({ variant: "default" }))}
          >
            Sign In
          </Link>
        )}
      </footer>
    </div>
  );
}

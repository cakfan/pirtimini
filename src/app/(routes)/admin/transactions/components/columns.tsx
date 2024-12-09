"use client";

import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./cell-action";
import { cn } from "@/lib/utils";
import CellPaid from "./cell-paid";

export type ClientColumn = {
  id: string;
  description: string | null;
  date: string;
  amount: string;
  isPaid: boolean;
  type: "in" | "out" | null;
};

export const Columns: ColumnDef<unknown>[] = [
  {
    accessorKey: "description",
    header: "Description",
  },
  {
    accessorKey: "date",
    header: "Date",
  },
  {
    accessorKey: "amount",
    header: "Amount",
    cell: ({ row }) => (
      <span
        className={cn(
          (row.original as ClientColumn).type === "out"
            ? "text-red-500"
            : "text-emerald-500",
        )}
      >
        {(row.original as ClientColumn).amount}
      </span>
    ),
  },
  {
    accessorKey: "isPaid",
    header: "Is Paid",
    cell: ({ row }) => <CellPaid data={row.original} />,
  },
  {
    accessorKey: "Actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];

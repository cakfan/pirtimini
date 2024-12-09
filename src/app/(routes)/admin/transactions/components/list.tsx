"use client";

import { useOptimistic } from "@/providers/optimistic";
import { Columns } from "./columns";
import { DataTable } from "@/components/ui/data-table";

export default function ItemDataTable() {
  const { optimisticItems } = useOptimistic();

  return (
    <div className="px-10">
      <DataTable
        searchKey="description"
        columns={Columns}
        data={optimisticItems}
      />
    </div>
  );
}

"use client";

import { useTransition } from "react";
import { useOptimistic } from "@/providers/optimistic";
import { Checkbox } from "@/components/ui/checkbox";
import { ClientColumn } from "./columns";
import { updateTransaction } from "@/actions/transaction";
import { toast } from "sonner";

export default function CellPaid({ data }: { data: unknown }) {
  const [, startTransition] = useTransition();

  const { optimisticItems, updateOptimisticItems } = useOptimistic();

  const initialData = data as ClientColumn;

  const handleChange = (isPaid: boolean) => {
    updateOptimisticItems(
      {
        ...initialData,
        isPaid,
      },
      optimisticItems.indexOf(initialData),
    );
    startTransition(async () => {
      const { error } = await updateTransaction({
        id: initialData.id,
        isPaid,
      });

      if (error) {
        toast.error(error);
        updateOptimisticItems(
          {
            ...initialData,
            isPaid: !isPaid,
          },
          optimisticItems.indexOf(initialData),
        );
        return;
      }
    });
  };

  return (
    <div className="flex items-center justify-center gap-2">
      <Checkbox
        id="paid"
        // disabled={isPending}
        checked={initialData.isPaid ?? false}
        onCheckedChange={(value) => {
          if (value === "indeterminate") {
            // Handle indeterminate state if needed
            return;
          }
          // Ensure `value` is a boolean
          handleChange(value === true);
        }}
      />
      <label
        htmlFor="paid"
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        Paid
      </label>
    </div>
  );
}

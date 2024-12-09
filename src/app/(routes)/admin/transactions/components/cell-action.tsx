"use client";

import { Trash } from "lucide-react";
import { toast } from "sonner";
import { useState, useTransition } from "react";

import { ClientColumn } from "./columns";

import { AlertModal } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { deleteTransaction } from "@/actions/transaction";
import { useOptimistic } from "@/providers/optimistic";

interface CellActionProps {
  data: unknown;
}

export const CellAction: React.FC<CellActionProps> = ({ data }) => {
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const { removeOptimisticItems } = useOptimistic();
  const orderItem = data as ClientColumn;

  const onDelete = async () => {
    startTransition(async () => {
      const { error, success } = await deleteTransaction(orderItem.id);
      if (error) {
        toast.error(error);
      }
      if (success) {
        setOpen(false);
        removeOptimisticItems(orderItem);
        toast.success(success);
      }
    });
  };

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
        loading={isPending}
      />

      <div className="flex items-center justify-center">
        <Button
          className="rounded-full text-destructive hover:text-destructive"
          onClick={() => setOpen(true)}
          variant="ghost"
          size="icon"
          title="Delete"
        >
          <Trash className="h-4 w-4" />
        </Button>
      </div>
    </>
  );
};

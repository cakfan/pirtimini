"use client";

import { useState } from "react";
import { Modal } from "@/components/ui/modal";
import { Edit, Plus } from "lucide-react";
import { DialogTrigger } from "@/components/ui/dialog";
import { buttonVariants } from "@/components/ui/button";
import ItemForm from "./form";
import { TransactionType } from "@/db/schema";

type ItemModalProps = {
  initialData?: TransactionType | null | undefined;
};

export default function ItemModal({ initialData }: ItemModalProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <Modal
      title="Add Transaction"
      description="Add new transaction to this store"
      className="h-full min-w-full"
      isOpen={isOpen}
      onClose={() => {
        setIsOpen(false);
      }}
      trigger={
        <DialogTrigger
          className={buttonVariants(
            initialData
              ? { variant: "ghost", size: "icon" }
              : { variant: "default" },
          )}
          onClick={() => setIsOpen(true)}
        >
          {initialData ? (
            <Edit />
          ) : (
            <>
              <Plus />
              Add New
            </>
          )}
        </DialogTrigger>
      }
    >
      <ItemForm initialData={initialData} setIsOpen={setIsOpen} />
    </Modal>
  );
}

"use client";

import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useOptimistic } from "@/providers/optimistic";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import SubmitButton from "@/components/btn/SubmitButton";
import {
  transactionSchema,
  TransactionType,
  TransactionValues,
} from "@/db/schema";
import { createTransaction, updateTransaction } from "@/actions/transaction";
import { cn } from "@/lib/utils";
import { DialogFooter } from "@/components/ui/dialog";
import { CalendarIcon, Send } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { format } from "date-fns/format";
import { formatter } from "@/lib/utils";
import { id } from "date-fns/locale";
import { Calendar } from "@/components/ui/calendar";
import OrderTypeRadio from "./order-type";
import { Textarea } from "@/components/ui/textarea";
import InputNumber from "@/components/ui/input-number";

type OrderFormProps = {
  initialData?: TransactionType | null | undefined;
  setIsOpen: (isOpen: boolean) => void;
};

export default function ItemForm({ initialData, setIsOpen }: OrderFormProps) {
  const [isPending, startTransition] = useTransition();

  const { optimisticItems, addOptimisticItems, updateOptimisticItems } =
    useOptimistic();

  const form = useForm<TransactionValues>({
    resolver: zodResolver(transactionSchema),
    defaultValues: initialData
      ? { ...initialData, amount: initialData.amount / 1000 }
      : {
          amount: 12,
          description: "",
          isPaid: false,
          type: "in",
          date: new Date(),
        },
  });

  const onSubmit = async (values: TransactionValues) => {
    const newData = { ...values, amount: values.amount * 1000 };
    setIsOpen(true);
    startTransition(async () => {
      const { error, success, data } = initialData
        ? await updateTransaction({ id: initialData.id, ...newData })
        : await createTransaction(newData);
      if (error) {
        toast.error(error);
      }

      if (success && data) {
        console.log("optimistic:", data);
        if (initialData) {
          updateOptimisticItems(data, optimisticItems.indexOf(initialData));
        } else {
          addOptimisticItems({
            ...data,
            description: data.description,
            date: format(data.date, "PPP", { locale: id }),
            amount: formatter.format(data.amount),
          });
        }
        initialData = null;
        form.reset();
        toast.success(success);
        setIsOpen(false);
      }
    });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="relative flex h-full flex-col gap-5 py-5"
      >
        <div className="flex flex-wrap gap-5">
          <div className="flex w-full flex-col gap-10 md:w-1/2">
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Description here"
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex flex-1 flex-col gap-10">
            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Date</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-[240px] pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground",
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) =>
                          date > new Date() || date < new Date("1900-01-01")
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem className="w-fit">
                  <FormLabel>Amount</FormLabel>
                  <FormControl>
                    <InputNumber
                      value={field.value}
                      onChange={field.onChange}
                    />
                    {/* <div className="relative flex rounded-lg shadow-sm shadow-black/5">
                      <Input
                        className="-me-px rounded-e-none shadow-none"
                        placeholder="12"
                        {...field}
                        type="number"
                      />
                      <span className="-z-10 inline-flex items-center rounded-e-lg border border-input bg-background px-3 text-sm text-muted-foreground">
                        000
                      </span>
                    </div> */}
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="isPaid"
              render={({ field }) => (
                <FormItem className="flex w-fit flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow">
                  <FormControl>
                    <Checkbox
                      checked={field.value ?? false}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>Paid</FormLabel>
                  </div>
                </FormItem>
              )}
            />
            <div className="flex items-center gap-4">
              <OrderTypeRadio form={form} />
            </div>
          </div>
        </div>
        <DialogFooter className="sticky bottom-0 right-0 w-full px-2 py-5">
          <SubmitButton isPending={isPending} className="ml-auto w-fit">
            <Send />
            {initialData ? "Update" : "Submit"}
          </SubmitButton>
        </DialogFooter>
      </form>
    </Form>
  );
}

import { FormControl, FormField, FormItem } from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { TransactionValues } from "@/db/schema";
import { UseFormReturn } from "react-hook-form";

const items = [
  { id: "radio-in", value: "in", label: "IN" },
  { id: "radio-out", value: "out", label: "OUT" },
];

export default function OrderTypeRadio({
  form,
}: {
  form: UseFormReturn<TransactionValues>;
}) {
  return (
    <FormField
      control={form.control}
      name="type"
      render={({ field }) => (
        <FormItem>
          <fieldset className="space-y-4">
            <legend className="text-sm font-medium leading-none text-foreground">
              Type
            </legend>
            <FormControl>
              <RadioGroup
                className="grid grid-cols-3 gap-2"
                onValueChange={field.onChange}
              >
                {items.map((item) => (
                  <FormItem key={item.id}>
                    <label className="relative flex cursor-pointer flex-col items-center gap-3 rounded-lg border border-input px-2 py-3 text-center shadow-sm shadow-black/5 outline-offset-2 transition-colors has-[[data-disabled]]:cursor-not-allowed has-[[data-state=checked]]:border-ring has-[[data-state=checked]]:bg-accent has-[[data-disabled]]:opacity-50 has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-ring/70">
                      <FormControl>
                        <RadioGroupItem
                          id={item.id}
                          value={item.value}
                          className="sr-only after:absolute after:inset-0"
                        />
                      </FormControl>
                      <p className="text-sm font-medium leading-none text-foreground">
                        {item.label}
                      </p>
                    </label>
                  </FormItem>
                ))}
              </RadioGroup>
            </FormControl>
          </fieldset>
        </FormItem>
      )}
    />
  );
}

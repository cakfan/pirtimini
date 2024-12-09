"use client";

import { Loader2 } from "lucide-react";
import { Button, ButtonProps } from "../ui/button";

const SubmitButton = ({
  children,
  isPending,
  textPending = "Loading",
  ...props
}: {
  children: React.ReactNode;
  isPending: boolean;
  textPending?: string;
} & ButtonProps) => {
  return (
    <Button
      aria-disabled={isPending}
      disabled={isPending}
      type="submit"
      {...props}
    >
      {isPending ? (
        <>
          <Loader2 className="h-4 w-4 animate-spin" /> {textPending}
        </>
      ) : (
        children
      )}
    </Button>
  );
};

export default SubmitButton;

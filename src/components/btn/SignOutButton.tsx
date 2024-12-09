"use client";

import { useState } from "react";
import SubmitButton from "./SubmitButton";
import { signOut } from "@/lib/auth/client";
import { redirect } from "next/navigation";

export default function SignOutButton() {
  const [isPending, setIsPending] = useState(false);

  const onSignOut = async () => {
    setIsPending(true);
    await signOut({
      fetchOptions: {
        onSuccess: () => {
          setIsPending(false);
          redirect("/");
        },
      },
    });
  };

  return (
    <SubmitButton
      isPending={isPending}
      onClick={onSignOut}
      variant={"destructive"}
    >
      Logout
    </SubmitButton>
  );
}

"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { signInSchema, SignInValues } from "@/db/schema";
import { signIn } from "@/lib/auth/client";
import { redirect } from "next/navigation";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export default function SignInForm() {
  const [isPending, startTransition] = useTransition();
  const form = useForm<SignInValues>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  function onSubmit(data: SignInValues) {
    startTransition(async () => {
      const response = await signIn.username(data);

      if (response.error) {
        console.error("SIGN_IN:", response.error.status);
        toast.error(response.error.message);
      } else {
        redirect("/admin");
      }
    });
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="z-50 w-full space-y-10 md:w-1/4"
      >
        <h1 className="text-center">Sign In</h1>
        <FormField
          control={form.control}
          name="username"
          disabled={isPending}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="username" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          disabled={isPending}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input placeholder="password" type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isPending} className="w-full">
          Submit
        </Button>
      </form>
    </Form>
  );
}

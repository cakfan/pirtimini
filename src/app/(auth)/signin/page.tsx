import { type Metadata } from "next";
import SignInForm from "./form";
import { getMe } from "@/actions/user";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Sign In",
};

export default async function Page() {
  const me = await getMe();

  if (me) redirect("/admin");

  return (
    <div className="flex min-h-screen w-full items-center justify-center">
      <SignInForm />
    </div>
  );
}

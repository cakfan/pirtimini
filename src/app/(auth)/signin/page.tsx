import { type Metadata } from "next";
import SignInForm from "./form";

export const metadata: Metadata = {
  title: "Sign In",
};

export default async function Page() {
  return (
    <div className="flex min-h-screen w-full items-center justify-center">
      <SignInForm />
    </div>
  );
}

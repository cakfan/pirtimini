import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "./theme";
import NextTopLoader from "nextjs-toploader";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <NextTopLoader
        easing="ease"
        showSpinner={false}
        color="hsl(var(--primary))"
      />
      {children}
      <Toaster position="top-center" />
    </ThemeProvider>
  );
}

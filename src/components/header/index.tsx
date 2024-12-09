export default function Header({ children }: { children: React.ReactNode }) {
  return (
    <header className="flex h-auto w-full shrink-0 flex-col items-center gap-2 py-5 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-auto">
      {children}
    </header>
  );
}

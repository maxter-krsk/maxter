import ThemeToggler from "@/lib/ui/ThemeToggler";

export default function Header() {
  return (
    <header>
      <div className="container flex items-center justify-between py-20">
        <ThemeToggler
          variant="ghost"
          size="sm"
          direction="ltr"
          system={false}
        />
      </div>
    </header>
  );
}

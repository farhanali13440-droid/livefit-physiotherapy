import { useEffect, useState } from "react";
import { Menu, X, Phone, ClipboardList } from "lucide-react";
import logo from "@/assets/livefit-logo.jpg.asset.json";
import { trackPhoneConversion } from "@/lib/conversion";
import { NAV, PHONE_DISPLAY, PHONE_TEL } from "./data";

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`sticky top-0 z-50 border-b transition-colors duration-300 ${scrolled ? "border-border bg-background/90 backdrop-blur-md" : "border-transparent bg-background"}`}>
      <div className="mx-auto grid max-w-7xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-5 py-3.5 sm:px-8 lg:grid-cols-[auto_1fr_auto]">
        <a href="#top" className="flex min-w-0 items-center gap-3">
          <img src={logo.url} alt="LiveFit Physiotherapy logo" width={44} height={44} className="h-10 w-10 shrink-0 rounded-sm object-cover mix-blend-multiply sm:h-11 sm:w-11" />
          <span className="min-w-0 truncate"><span className="block font-display text-lg leading-none tracking-tight sm:text-xl">LiveFit</span><span className="block eyebrow mt-1 text-[0.6rem] text-muted-foreground">Physiotherapy</span></span>
        </a>

        <nav className="hidden justify-center gap-8 lg:flex">
          {NAV.map((item) => <a key={item.href} href={item.href} className="text-sm text-muted-foreground transition-colors hover:text-foreground">{item.label}</a>)}
        </nav>

        <div className="flex shrink-0 items-center gap-2">
          <a href="#assessment" className="hidden items-center gap-2 rounded-full border border-charcoal/20 bg-card px-4 py-2.5 text-sm font-semibold text-charcoal transition-colors hover:border-charcoal hover:bg-charcoal hover:text-background sm:inline-flex">
            <ClipboardList className="h-3.5 w-3.5" strokeWidth={2} />
            <span>Book Assessment</span>
          </a>
          <a href={PHONE_TEL} onClick={trackPhoneConversion} className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-charcoal hover:text-background sm:px-6">
            <Phone className="h-3.5 w-3.5" strokeWidth={2} />
            <span className="hidden sm:inline">Call Now — {PHONE_DISPLAY}</span>
            <span className="sm:hidden">Call</span>
          </a>
          <button type="button" aria-label={open ? "Close menu" : "Open menu"} onClick={() => setOpen((v) => !v)} className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-border text-foreground lg:hidden">
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {open && (
        <nav className="border-t border-border bg-background lg:hidden">
          <div className="mx-auto flex max-w-7xl flex-col px-5 py-2 sm:px-8">
            <a href="#assessment" onClick={() => setOpen(false)} className="border-b border-border/60 py-3.5 text-sm font-semibold text-primary">Book Assessment — PKR 1,499</a>
            {NAV.map((item) => <a key={item.href} href={item.href} onClick={() => setOpen(false)} className="border-b border-border/60 py-3.5 text-sm text-foreground last:border-0">{item.label}</a>)}
          </div>
        </nav>
      )}
    </header>
  );
}

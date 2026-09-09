import { useState } from "react";
import { X } from "lucide-react";
import { BookingForm } from "./Site";
import { supabaseConfigured } from "@/lib/supabase";

export function LeadCaptureWidget() {
  const [open, setOpen] = useState(false);
  if (!supabaseConfigured) return null;
  return <>
    <button type="button" onClick={() => setOpen(true)} className="fixed bottom-24 right-4 z-40 rounded-full border border-border bg-card px-5 py-3 text-sm font-semibold text-charcoal shadow-xl transition hover:-translate-y-0.5 lg:bottom-6">Book Your Assessment</button>
    {open && <div className="fixed inset-0 z-[60] flex items-end justify-center overflow-y-auto bg-charcoal/50 p-4 sm:items-center" onMouseDown={(e) => { if (e.target === e.currentTarget) setOpen(false); }}>
      <div className="relative w-full max-w-xl py-4 sm:py-8">
        <button type="button" onClick={() => setOpen(false)} aria-label="Close" className="absolute right-2 top-5 z-10 rounded-full bg-card p-2 text-muted-foreground shadow hover:bg-muted"><X className="h-5 w-5"/></button>
        <BookingForm />
      </div>
    </div>}
  </>;
}

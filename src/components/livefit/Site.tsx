import { useEffect, useState } from "react";
import type { FormEvent, MouseEvent } from "react";
import { CheckCircle2, Clock, MapPin, MessageCircle, Navigation, Phone, Star } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { ADDRESS, MAPS_URL, PHONE_DISPLAY, PHONE_TEL, WHATSAPP } from "./data";
import { createLead, trackLeadEvent, updateLeadContactMethod } from "@/lib/leadTracking";
import { trackPhoneConversion } from "@/lib/conversion";
import doctorAsset from "@/assets/doctor-livefit.png.asset.json";

export const PRICE = "PKR 1,499";

export const REVIEWS = [
["Ifrah Babar","a month ago","It was good clean environment and satisfactory assessment, my father session is going great with them","1 review · 6 photos"],
["Abdul Ghaffar","2 months ago","Visited the clinic and very satisfied with the services provided by dr Soma. She is very professional and kind she heard me with patience. She is very competent I would recommend her.","2 reviews"],
["Laiba Siddiqui","2 months ago","I highly recommend LiveFit Physio! I came in with severe shoulder, neck, and back pain, and the experience has been amazing. The doctor is incredibly well-qualified, professional, and took the time to guide me through everything thoroughly.","1 review"],
["Junaid Nadeem","5 months ago","I had a great experience, Dr.Saad did my complete and detailed examination. I was happy with the session he provided me with and how he guided me with my treatment protocol.","2 reviews"],
["Namra Kainat","2 months ago","Had a great experience. I had Cervical stiffness and neck muscle tightness for almost a year and had no idea about about aftr the proper consultation the doctor diagnosed it","4 reviews · 1 photo"],
["Md Ali","5 months ago","Extremely professional and trustworthy having a good knowledge and skill in filed. I would recommend livefit physiotherapy the physio to every one","8 reviews"],
["Usama Muhammad Nadeem","5 months ago","Dr. Saad is a really passionate physiotherapist. Everyone coming here will be in good hands! ✨","Local Guide · 15 reviews · 4 photos"],
["Maryam Nazakat","4 months ago","I came for back stiffness, they recommended dry cupping. My experience was great and I highly recommend this clinic","4 reviews · 6 photos"],
["ameer Mukhtar","3 months ago","Dr Saad ko back pain k liye visit kya tha and in 6 session now I'm feeling very much better","1 review"],
["Laiba Gul","a month ago","I visited for a consultation and was impressed with a care and the treatment I received.","1 review"]
] as const;

const button = "inline-flex items-center justify-center gap-2.5 rounded-full bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground transition hover:-translate-y-0.5 hover:bg-charcoal";
const outline = "inline-flex items-center justify-center gap-2.5 rounded-full border border-charcoal/20 bg-card px-6 py-3.5 text-sm font-semibold text-charcoal transition hover:bg-charcoal hover:text-background";
export function Eyebrow({ children }: { children: string }) { return <p className="eyebrow text-primary">{children}</p>; }

export function WhatsAppCTA({ label = "WhatsApp", page = "unknown", location = "cta" }: { label?: string; page?: string; location?: string }) {
  const click = async (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    await trackLeadEvent("whatsapp_click_direct", page, location);
    window.location.href = WHATSAPP;
  };
  return <a href={WHATSAPP} onClick={click} className={button}><MessageCircle className="h-4 w-4" />{label}</a>;
}

export function CallCTA({ label = `Call ${PHONE_DISPLAY}`, page = "unknown", location = "cta" }: { label?: string; page?: string; location?: string }) {
  const click = async (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    await trackLeadEvent("call_click_direct", page, location);
    trackPhoneConversion();
    window.location.href = PHONE_TEL;
  };
  return <a href={PHONE_TEL} onClick={click} className={outline}><Phone className="h-4 w-4" />{label}</a>;
}

export function BookingCTA({ page, location = "booking_cta" }: { page: string; location?: string }) {
  const click = async (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    await trackLeadEvent("assessment_cta_click", page, location);
    window.location.href = "/book-assessment";
  };
  return <a href="/book-assessment" onClick={click} className={button}>Book Your Assessment — {PRICE}</a>;
}

export function ReviewCard({ review }: { review: readonly [string,string,string,string] }) {
  const [expanded, setExpanded] = useState(false); const [name,time,text,meta] = review;
  return <article className="min-w-0 border border-border bg-card p-6"><div className="flex items-start justify-between gap-4"><div><p className="font-semibold">{name}</p><p className="mt-1 text-xs text-muted-foreground">{time}</p></div><Star className="h-5 w-5 fill-primary text-primary" /></div><div className="mt-4 text-sm tracking-wide text-primary">★★★★★</div><p className={`mt-4 text-[15px] leading-7 text-charcoal-soft ${expanded ? "" : "line-clamp-5"}`}>&quot;{text}&quot;</p>{text.length > 210 && <button onClick={() => setExpanded(v => !v)} className="mt-2 text-sm font-semibold text-primary">{expanded ? "Show less" : "Read more"}</button>}<p className="mt-5 text-xs text-muted-foreground">{meta}</p><p className="mt-3 text-[11px] font-medium text-muted-foreground">Google review</p></article>;
}

export function ReviewsSection({ compact = false }: { compact?: boolean }) {
 return <section id="reviews" className="border-y border-border bg-sand"><div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:py-24"><div className="max-w-2xl"><Eyebrow>Real Google Reviews</Eyebrow><h2 className="mt-4 font-display text-5xl sm:text-6xl">What Our Patients Say</h2><p className="mt-5 text-base leading-7 text-muted-foreground">Real experiences from patients who have visited LiveFit Physiotherapy.</p></div><div className={`mt-10 grid gap-5 md:grid-cols-2 ${compact ? "lg:grid-cols-3" : "lg:grid-cols-3"}`}>{REVIEWS.slice(0, compact ? 3 : 10).map((r) => <ReviewCard key={r[0]} review={r} />)}</div><div className="mt-10 flex flex-col gap-3 sm:flex-row"><BookingCTA page="/reviews" location="reviews_booking_cta" /><CallCTA page="/reviews" location="reviews_call" label="Call Now" /></div></div></section>;
}

function ContactChoice({ leadId, name }: { leadId: string; name: string }) {
  const [busy, setBusy] = useState<"call" | "whatsapp" | null>(null);
  const [error, setError] = useState("");
  const choose = async (method: "call" | "whatsapp") => {
    setBusy(method);
    setError("");
    try {
      await updateLeadContactMethod(leadId, method === "call" ? "Call" : "WhatsApp");
      await trackLeadEvent("contact_method_selected", "/book-assessment", "contact_choice", { leadId, contactMethod: method });
      if (method === "call") {
        await trackLeadEvent("call_click", "/book-assessment", "contact_choice_call", { leadId, contactMethod: "call" });
        trackPhoneConversion();
        window.location.href = PHONE_TEL;
      } else {
        await trackLeadEvent("whatsapp_click", "/book-assessment", "contact_choice_whatsapp", { leadId, contactMethod: "whatsapp" });
        const message = `Hello LiveFit Physiotherapy, I would like to book a physiotherapy appointment. My name is ${name}. Please share the available appointment times.`;
        window.location.href = `https://wa.me/923323337337?text=${encodeURIComponent(message)}`;
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "We could not save your contact preference. Please try again.");
      setBusy(null);
    }
  };
  return <div className="border border-primary/30 bg-accent p-6 sm:p-8" aria-live="polite"><CheckCircle2 className="h-8 w-8 text-primary"/><Eyebrow>You’re Almost Done</Eyebrow><h3 className="mt-3 font-display text-3xl">How Would You Like to Continue?</h3><p className="mt-2 text-sm leading-6 text-muted-foreground">Your details have been received. Choose your preferred way to contact LiveFit Physiotherapy.</p><div className="mt-5 border border-border bg-card p-4"><p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Physiotherapy Assessment</p><p className="mt-1 font-display text-3xl font-bold">{PRICE}</p></div><div className="mt-5 grid gap-3 sm:grid-cols-2"><button type="button" disabled={!!busy} onClick={() => choose("call")} className="flex min-h-24 flex-col items-center justify-center gap-2 rounded-xl bg-primary px-5 py-4 text-center font-semibold text-primary-foreground disabled:opacity-60"><Phone className="h-6 w-6"/><span>CALL LIVEFIT</span><span className="text-sm font-normal opacity-90">{busy === "call" ? "Opening…" : "0332 3337337"}</span></button><button type="button" disabled={!!busy} onClick={() => choose("whatsapp")} className="flex min-h-24 flex-col items-center justify-center gap-2 rounded-xl border border-charcoal/20 bg-card px-5 py-4 text-center font-semibold text-charcoal disabled:opacity-60"><MessageCircle className="h-6 w-6"/><span>WHATSAPP LIVEFIT</span><span className="text-sm font-normal text-muted-foreground">{busy === "whatsapp" ? "Opening…" : "WhatsApp Now"}</span></button></div>{error&&<p className="mt-4 text-sm text-destructive">{error}</p>}</div>;
}

export function BookingForm() {
 const [status,setStatus]=useState<"idle"|"saving"|"success"|"error">("idle"); const [message,setMessage]=useState(""); const [leadId,setLeadId]=useState<string|null>(null); const [leadName,setLeadName]=useState("");
 useEffect(()=>{void trackLeadEvent("assessment_form_view",window.location.pathname,"assessment_form")},[]);
 async function submit(e:FormEvent<HTMLFormElement>){e.preventDefault();setStatus("saving");setMessage("");const f=new FormData(e.currentTarget);const name=String(f.get("name")||"");try{const lead=await createLead({name,phone:String(f.get("phone")||""),email:String(f.get("email")||"")});setLeadId(lead.id);setLeadName(name);await trackLeadEvent("assessment_form_submit","/book-assessment","assessment_form",{leadId:lead.id});setStatus("success");e.currentTarget.reset();}catch(err){setStatus("error");setMessage(err instanceof Error ? err.message : "Something went wrong. Please try again.");}}
 if(status==="success"&&leadId) return <ContactChoice leadId={leadId} name={leadName}/>;
 return <form onSubmit={submit} className="border border-border bg-card p-6 shadow-[0_24px_70px_-45px_oklch(0.24_0.006_150_/_0.45)] sm:p-8"><div><p className="eyebrow text-primary">Physiotherapy Assessment</p><h2 className="mt-2 font-display text-3xl">Book Your Physiotherapy Assessment</h2><p className="mt-2 text-sm leading-6 text-muted-foreground">Get started with a personalized physiotherapy assessment with Dr. Saad Sarfraz.</p><div className="mt-5 border border-border bg-sand p-4"><p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Assessment</p><p className="mt-1 font-display text-3xl font-bold">{PRICE}</p></div></div><div className="mt-6 grid gap-5"><label className="block"><span className="mb-2 block text-sm font-semibold">Name</span><input required name="name" autoComplete="name" className="w-full border border-border bg-background px-4 py-3.5 outline-none focus:border-primary" placeholder="Your name" /></label><label className="block"><span className="mb-2 block text-sm font-semibold">Phone Number</span><input required name="phone" type="tel" inputMode="tel" autoComplete="tel" className="w-full border border-border bg-background px-4 py-3.5 outline-none focus:border-primary" placeholder="0332 3337337" /></label><label className="block"><span className="mb-2 block text-sm font-semibold">Email Address <span className="font-normal text-muted-foreground">(Optional)</span></span><input name="email" type="email" autoComplete="email" className="w-full border border-border bg-background px-4 py-3.5 outline-none focus:border-primary" placeholder="you@example.com" /></label></div>{status==="error"&&<p className="mt-4 text-sm text-destructive" role="alert">{message}</p>}<button disabled={status==="saving"} type="submit" className={`${button} mt-6 w-full disabled:opacity-60`}>{status==="saving" ? "Saving…" : "CONTINUE"}</button><p className="mt-3 text-center text-xs text-muted-foreground">Your details are kept private and used to help arrange your assessment.</p></form>;
}

export function SiteFooter(){return <footer className="bg-charcoal text-background"><div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 sm:px-8 md:grid-cols-2 lg:grid-cols-4"><div><p className="font-display text-2xl">LiveFit Physiotherapy</p><p className="mt-3 text-sm leading-6 text-background/65">Specialized Spine & Sports Physiotherapy</p><p className="mt-4 text-sm text-background/65">{ADDRESS}</p></div><div><p className="eyebrow text-primary">Navigation</p><div className="mt-4 grid gap-3 text-sm"><Link to="/">Home</Link><Link to="/other-services">Other Services</Link><Link to="/about-dr-saad">Dr. Saad</Link><Link to="/reviews">Reviews</Link><Link to="/book-assessment">Contact / Book</Link></div></div><div><p className="eyebrow text-primary">Contact</p><p className="mt-4 text-sm">{PHONE_DISPLAY}</p><p className="mt-2 text-sm text-background/65">Mon–Sat · 12 PM–8 PM<br/>Sunday · Closed</p></div><div><BookingCTA page="footer" location="footer_cta"/><div className="mt-3"><CallCTA page="footer" location="footer_call" label="Call Now"/></div></div></div></footer>}
export function LocationBlock(){return <section className="border-t border-border"><div className="mx-auto grid max-w-7xl gap-10 px-5 py-20 sm:px-8 lg:grid-cols-[.8fr_1.2fr] lg:py-24"><div><Eyebrow>Visit LiveFit Physiotherapy</Eyebrow><h2 className="mt-4 font-display text-5xl">F-7 Markaz, Islamabad</h2><div className="mt-7 space-y-4 text-sm text-muted-foreground"><p className="flex gap-3"><MapPin className="mt-0.5 h-5 w-5 shrink-0 text-primary"/>{ADDRESS}</p><p className="flex gap-3"><Phone className="h-5 w-5 shrink-0 text-primary"/>{PHONE_DISPLAY}</p><p className="flex gap-3"><Clock className="h-5 w-5 shrink-0 text-primary"/>Monday–Saturday · 12 PM–8 PM<br/>Sunday · Closed</p></div><div className="mt-7 flex flex-col gap-3 sm:flex-row"><a href={MAPS_URL} target="_blank" rel="noreferrer" className={outline}><Navigation className="h-4 w-4"/>Get Directions</a><WhatsAppCTA page="/contact" location="location_whatsapp" label="WhatsApp"/><CallCTA page="/contact" location="location_call" label="Call Now"/></div></div><iframe title="LiveFit Physiotherapy location" src="https://www.google.com/maps?q=Suite%23%20LG-04%2C%20Pakland%20Trade%20Centre%2C%20F7%20Markaz%2C%20Islamabad&output=embed" className="min-h-[360px] w-full border-0" loading="lazy" /></div></section>}
export { doctorAsset };

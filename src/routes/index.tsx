import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Phone, MapPin, Clock, ClipboardList, ArrowRight, HeartPulse, Navigation, Star } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Header } from "@/components/livefit/Header";
import { trackPhoneConversion } from "@/lib/conversion";
import { FAQS, MAPS_URL, PHONE_DISPLAY, PHONE_TEL, SERVICES, STEPS } from "@/components/livefit/data";
import logo from "@/assets/livefit-logo.jpg.asset.json";
import doctorAsset from "@/assets/doctor-livefit.png.asset.json";
import assessmentAsset from "@/assets/clinic-assessment.png.asset.json";
import consultAsset from "@/assets/clinic-consult.png.asset.json";
import treatmentAsset from "@/assets/clinic-treatment.png.asset.json";
import mobilityAsset from "@/assets/clinic-mobility.png.asset.json";
import frontAsset from "@/assets/clinic-signboard.webp.asset.json";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Spine Physiotherapy in Islamabad | LiveFit Physiotherapy" },
      { name: "description", content: "LiveFit Physiotherapy in F-7 Markaz, Islamabad, led by Dr. Saad Sarfraz. Focused physiotherapy for back pain, sciatica and disc bulge. Assessment PKR 1,499." },
      { property: "og:title", content: "Spine Physiotherapy in Islamabad | LiveFit Physiotherapy" },
      { property: "og:description", content: "Dr. Saad Sarfraz provides spine-focused physiotherapy for back pain, sciatica and disc-related problems at LiveFit, Islamabad." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://livefitphysiotherapy.com/" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://livefitphysiotherapy.com/" }],
    scripts: [{ type: "application/ld+json", children: JSON.stringify({ "@context": "https://schema.org", "@type": "MedicalClinic", name: "LiveFit Physiotherapy", description: "Physiotherapy clinic in Islamabad focused on back pain, spine problems, sciatica, disc bulge and sports injury rehabilitation.", telephone: "+92 332 3337337", url: "https://livefitphysiotherapy.com/", medicalSpecialty: "Physiotherapy", address: { "@type": "PostalAddress", streetAddress: "Suite # LG-04, Pakland Trade Centre, F-7 Markaz", addressLocality: "Islamabad", addressCountry: "PK" } }) }],
  }),
  component: Index,
});

const PRIMARY = "inline-flex items-center justify-center gap-2.5 rounded-full bg-primary px-7 py-4 text-sm font-semibold text-primary-foreground shadow-sm transition-all hover:bg-charcoal hover:text-background hover:-translate-y-0.5";
const SECONDARY = "inline-flex items-center justify-center gap-2.5 rounded-full border border-charcoal/20 bg-card px-7 py-4 text-sm font-semibold text-charcoal transition-all hover:border-charcoal hover:bg-charcoal hover:text-background";
const PRICE = "PKR 1,499";

function Eyebrow({ children }: { children: string }) {
  return <p className="eyebrow inline-flex rounded-full bg-accent px-4 py-2 text-accent-foreground">{children}</p>;
}

function Book({ className = "" }: { className?: string }) {
  return <a href="#assessment" className={`${PRIMARY} ${className}`}><ClipboardList className="h-4 w-4" /> BOOK YOUR ASSESSMENT</a>;
}

function Call({ className = "" }: { className?: string }) {
  return <a href={PHONE_TEL} onClick={trackPhoneConversion} className={`${SECONDARY} ${className}`}><Phone className="h-4 w-4" /> CALL {PHONE_DISPLAY}</a>;
}

function FlipCard({ title, body, index }: { title: string; body: string; index: number }) {
  const [flipped, setFlipped] = useState(false);
  return <button type="button" onClick={() => setFlipped(v => !v)} className="group relative h-56 w-full [perspective:1000px] text-left" aria-label={`${flipped ? "Hide details for" : "Show details for"} ${title}`}>
    <span className={`absolute inset-0 block rounded-3xl transition-transform duration-500 [transform-style:preserve-3d] ${flipped ? "[transform:rotateY(180deg)]" : ""}`}>
      <span className="absolute inset-0 flex flex-col justify-between rounded-3xl border border-border bg-card p-7 [backface-visibility:hidden]">
        <span className="flex justify-between"><span className="font-display text-4xl text-primary">0{index}</span><ArrowRight className="h-5 w-5 text-muted-foreground" /></span>
        <span><span className="block text-lg font-semibold text-charcoal">{title}</span><span className="mt-2 block text-xs text-muted-foreground">Tap to learn more</span></span>
      </span>
      <span className="absolute inset-0 flex flex-col justify-between rounded-3xl bg-charcoal p-7 text-background [backface-visibility:hidden] [transform:rotateY(180deg)]">
        <span className="font-display text-3xl text-primary">0{index}</span>
        <span><span className="block text-lg font-semibold">{title}</span><span className="mt-3 block text-sm leading-relaxed text-background/70">{body}</span><span className="mt-5 block text-xs font-semibold text-primary">BOOK AN ASSESSMENT →</span></span>
      </span>
    </span>
  </button>;
}

function Index() {
  return <div id="top" className="min-h-screen overflow-x-hidden bg-background">
    <Header />
    <main className="pb-20 lg:pb-0">
      <section className="relative overflow-hidden bg-background">
        <div aria-hidden className="pointer-events-none absolute -right-40 -top-32 h-[600px] w-[600px] rounded-full bg-accent/70 blur-3xl" />
        <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-5 py-8 sm:px-8 sm:py-12 lg:grid-cols-[1fr_.92fr] lg:gap-16 lg:py-14">
          <div className="order-2 lg:order-1">
            <Eyebrow>SPINE &amp; SPORTS PHYSIOTHERAPY • ISLAMABAD</Eyebrow>
            <h1 className="mt-6 max-w-3xl font-display text-[3.35rem] leading-[.88] tracking-tight sm:text-6xl lg:text-[5.2rem]">BACK PAIN.<br />SCIATICA.<br />DISC BULGE.<br /><span className="text-primary">GET THE RIGHT APPROACH.</span></h1>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">Personalized physiotherapy assessment and rehabilitation with Dr. Saad Sarfraz, Chief Physiotherapist at LiveFit.</p>
            <div className="mt-7 max-w-md border border-border bg-card p-6 shadow-[0_24px_60px_-35px_oklch(0.24_0.006_150_/_0.45)] sm:p-7">
              <p className="eyebrow text-primary">PHYSIOTHERAPY ASSESSMENT</p>
              <p className="mt-2 font-display text-5xl text-charcoal sm:text-6xl">{PRICE}</p>
              <div className="mt-4 grid gap-2 text-sm text-muted-foreground"><span>✓ Personalized Assessment</span><span>✓ Treatment Guidance</span><span>✓ Next-Step Plan</span></div>
              <div className="mt-5 flex flex-col gap-3 sm:flex-row"><Book className="flex-1" /><Call className="flex-1" /></div>
              <p className="mt-4 text-xs font-medium text-muted-foreground">F-7 Markaz, Islamabad</p>
            </div>
          </div>
          <div className="relative order-1 lg:order-2 lg:pl-4">
            <div aria-hidden className="absolute -inset-3 -z-10 rounded-[2.5rem] bg-accent/60 blur-xl" />
            <img src={doctorAsset.url} alt="Dr. Saad Sarfraz, Chief Physiotherapist at LiveFit Physiotherapy" width={1080} height={1440} className="aspect-[3/4] w-full rounded-[2rem] object-cover object-top shadow-[0_30px_70px_-28px_oklch(0.24_0.006_150_/_0.45)]" />
            <div className="absolute bottom-5 left-5 right-5 border border-border/70 bg-card/95 p-5 shadow-xl backdrop-blur sm:left-auto sm:w-[340px]">
              <p className="text-base font-semibold text-charcoal">DR. SAAD SARFRAZ</p><p className="mt-1 text-xs text-primary">Chief Physiotherapist</p>
              <p className="mt-2 text-[11px] leading-relaxed text-muted-foreground">DPT (STMU) • MSPH (QAU)<br />COMT (UK) • CSMT (UK) • CKTP (USA)</p>
              <p className="mt-3 eyebrow text-charcoal">SPINE &amp; SPORTS PHYSIOTHERAPY</p>
            </div>
          </div>
        </div>
      </section>

      <section id="about" className="border-y border-border bg-sand">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 py-20 sm:px-8 lg:grid-cols-[.7fr_1.3fr] lg:py-24">
          <div className="relative"><img src={consultAsset.url} alt="Consultation at LiveFit Physiotherapy" loading="lazy" className="aspect-[4/3] w-full object-cover" /><div className="absolute -bottom-4 -right-3 bg-charcoal px-5 py-4 text-background shadow-xl sm:-right-6"><p className="eyebrow text-primary">SPINE &amp; SPORTS</p><p className="mt-1 text-sm font-semibold">Focused Physiotherapy</p></div></div>
          <div><Eyebrow>MEET YOUR PHYSIOTHERAPIST</Eyebrow><h2 className="mt-5 font-display text-5xl leading-none sm:text-7xl">Dr. Saad Sarfraz</h2><p className="mt-3 text-lg font-semibold text-primary">Chief Physiotherapist</p><p className="mt-5 max-w-2xl font-display text-2xl leading-tight text-charcoal sm:text-3xl">SPINE &amp; SPORTS<br />PHYSIOTHERAPY</p><div className="mt-6 grid gap-2 text-sm text-charcoal-soft sm:grid-cols-2"><span>DPT (STMU)</span><span>MSPH (QAU)</span><span>COMT (UK)</span><span>CSMT (UK)</span><span>CKTP (USA)</span></div><p className="mt-7 eyebrow text-primary">FOCUS AREAS: BACK PAIN • SCIATICA • DISC BULGE</p><p className="mt-5 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">Dr. Saad Sarfraz provides personalized physiotherapy and rehabilitation for patients dealing with back pain, sciatica, disc-related problems and movement limitations.</p><Book className="mt-8" /></div>
        </div>
      </section>

      <section id="conditions" className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:py-28">
        <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-end"><div><Eyebrow>THE BIG THREE</Eyebrow><h2 className="mt-5 max-w-3xl font-display text-5xl leading-[.95] sm:text-6xl">THE PROBLEMS<br />WE FOCUS ON</h2></div><p className="max-w-lg text-sm leading-relaxed text-muted-foreground sm:text-base">Focused assessment and rehabilitation for the problems most closely associated with LiveFit's spine-focused approach.</p></div>
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {[{n:"01",t:"BACK PAIN",b:"Personalized physiotherapy for persistent back pain, stiffness and movement limitations.",img:assessmentAsset.url},{n:"02",t:"SCIATICA",b:"Assessment and rehabilitation for back and leg symptoms associated with sciatica.",img:treatmentAsset.url},{n:"03",t:"DISC BULGE / SLIP DISC",b:"Individualized physiotherapy and rehabilitation for disc-related conditions.",img:mobilityAsset.url}].map(x=><article key={x.n} className="group relative min-h-[430px] overflow-hidden bg-charcoal text-background"><img src={x.img} alt={x.t} loading="lazy" className="absolute inset-0 h-full w-full object-cover opacity-40 transition-transform duration-700 group-hover:scale-105" /><div className="absolute inset-0 bg-charcoal/55" /><div className="relative flex min-h-[430px] flex-col justify-between p-7 sm:p-8"><span className="font-display text-6xl text-primary">{x.n}</span><div><h3 className="font-display text-3xl sm:text-4xl">{x.t}</h3><p className="mt-3 max-w-sm text-sm leading-relaxed text-background/75">{x.b}</p><a href="#assessment" className="mt-6 inline-flex items-center gap-2 text-xs font-semibold text-primary">LEARN MORE <ArrowRight className="h-4 w-4" /></a></div></div></article>)}
        </div>
      </section>

      <section className="bg-charcoal text-background">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 py-20 sm:px-8 lg:grid-cols-[1fr_.8fr] lg:items-center lg:py-28">
          <div><Eyebrow>SPINE SPECIALIST FOCUS</Eyebrow><h2 className="mt-6 max-w-3xl font-display text-5xl leading-[.9] sm:text-7xl">SPINE-FOCUSED<br /><span className="text-primary">PHYSIOTHERAPY.</span></h2><p className="mt-6 max-w-xl text-base leading-relaxed text-background/65 sm:text-lg">Focused care for people dealing with back pain, sciatica and disc-related problems.</p><div className="mt-9 grid grid-cols-2 gap-x-6 gap-y-4 text-sm font-semibold sm:grid-cols-4"><span>BACK</span><span>SPINE</span><span>MOVEMENT</span><span>REHABILITATION</span></div></div>
          <div className="border-l border-background/15 pl-7 sm:pl-10"><p className="font-display text-3xl">Dr. Saad Sarfraz</p><p className="mt-2 text-sm text-background/60">Chief Physiotherapist</p><a href="#assessment" className="mt-8 inline-flex items-center justify-center gap-2 rounded-full bg-primary px-7 py-4 text-sm font-semibold text-primary-foreground">BOOK YOUR ASSESSMENT — {PRICE}</a></div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:py-28">
        <div className="grid gap-12 lg:grid-cols-[.7fr_1.3fr] lg:items-end"><div><Eyebrow>WHY DR. SAAD?</Eyebrow><h2 className="mt-5 font-display text-5xl leading-none sm:text-6xl">THE DOCTOR<br /><span className="text-primary">IS THE DIFFERENCE.</span></h2></div><div className="grid gap-7 md:grid-cols-3">{[["01","SPINE & SPORTS FOCUS","A clear clinical focus on spine-related problems and sports rehabilitation."],["02","PERSONALIZED ASSESSMENT","Start by understanding your symptoms, movement and functional limitations."],["03","INDIVIDUALIZED REHABILITATION","Treatment guidance is shaped around your condition and functional goals."]].map(([n,t,b])=><div key={n} className="border-t border-border pt-5"><p className="font-display text-4xl text-primary">{n}</p><h3 className="mt-5 text-base font-semibold text-charcoal">{t}</h3><p className="mt-3 text-sm leading-relaxed text-muted-foreground">{b}</p></div>)}</div></div>
      </section>

      <section id="assessment" className="mx-auto max-w-7xl px-5 py-4 sm:px-8 lg:py-8">
        <div className="relative overflow-hidden bg-charcoal px-7 py-12 text-background sm:px-12 lg:px-16 lg:py-16"><div aria-hidden className="absolute -right-28 -top-28 h-80 w-80 rounded-full bg-primary/15 blur-3xl" /><div className="relative grid gap-10 lg:grid-cols-[1fr_auto] lg:items-center"><div><Eyebrow>YOUR FIRST STEP STARTS HERE</Eyebrow><h2 className="mt-5 max-w-3xl font-display text-5xl leading-[.92] sm:text-7xl">START WITH A<br /><span className="text-primary">PROFESSIONAL ASSESSMENT.</span></h2><p className="mt-5 max-w-xl text-sm leading-relaxed text-background/65 sm:text-base">Understand your symptoms, movement and functional limitations, then get clear next-step guidance.</p></div><div className="lg:min-w-[300px]"><p className="eyebrow text-primary">PHYSIOTHERAPY ASSESSMENT</p><p className="mt-1 font-display text-7xl text-primary">{PRICE}</p><div className="mt-6 flex flex-col gap-3"><a href={PHONE_TEL} onClick={trackPhoneConversion} className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-7 py-4 text-sm font-semibold text-primary-foreground"><ClipboardList className="h-4 w-4" /> BOOK YOUR ASSESSMENT</a><a href={PHONE_TEL} onClick={trackPhoneConversion} className="inline-flex items-center justify-center gap-2 rounded-full border border-background/25 px-7 py-4 text-sm font-semibold text-background"><Phone className="h-4 w-4" /> CALL {PHONE_DISPLAY}</a></div></div></div></div>
      </section>

      <section id="services" className="border-y border-border bg-sand"><div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:py-28"><div className="max-w-2xl"><Eyebrow>SECONDARY SERVICES</Eyebrow><h2 className="mt-5 font-display text-4xl sm:text-5xl">MORE THAN BACK &amp; SPINE</h2><p className="mt-4 text-sm leading-relaxed text-muted-foreground sm:text-base">Specialized physiotherapy and rehabilitation for other movement, injury and recovery needs.</p></div><div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">{SERVICES.map((s,i)=><FlipCard key={s.title} title={s.title} body={s.body} index={i+1} />)}</div></div></section>

      <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:py-28"><div className="flex flex-col justify-between gap-5 md:flex-row md:items-end"><div><Eyebrow>REAL CARE. REAL PATIENTS.</Eyebrow><h2 className="mt-5 font-display text-4xl sm:text-5xl">Inside the LiveFit approach.</h2></div><p className="max-w-md text-sm leading-relaxed text-muted-foreground">Genuine clinic photography showing assessment, treatment, rehabilitation and the LiveFit environment.</p></div><div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4"><div className="lg:pt-10"><img src={assessmentAsset.url} alt="Physiotherapy assessment at LiveFit" loading="lazy" className="aspect-[4/5] w-full object-cover" /></div><div><img src={treatmentAsset.url} alt="Physiotherapy treatment at LiveFit" loading="lazy" className="aspect-[4/5] w-full object-cover" /></div><div className="lg:pt-20"><img src={mobilityAsset.url} alt="Movement and rehabilitation at LiveFit" loading="lazy" className="aspect-[4/5] w-full object-cover" /></div><div><img src={frontAsset.url} alt="LiveFit Physiotherapy clinic in Islamabad" loading="lazy" className="aspect-[4/5] w-full object-cover" /></div></div></section>

      <section id="reviews" className="border-y border-border bg-sand"><div className="mx-auto max-w-5xl px-5 py-20 text-center sm:px-8 lg:py-24"><Eyebrow>TRUSTED BY OUR PATIENTS</Eyebrow><h2 className="mt-5 font-display text-5xl sm:text-6xl">WHAT OUR PATIENTS SAY</h2><p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">Read genuine patient feedback on the clinic's Google profile. No fabricated testimonials, names, ratings or outcomes are displayed here.</p><div className="mx-auto mt-10 max-w-2xl border border-border bg-card p-8"><div className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-accent"><HeartPulse className="h-5 w-5 text-primary" /></div><p className="mt-5 text-sm text-muted-foreground">Google review content can be surfaced here when an authenticated/live review integration is configured.</p><a href={MAPS_URL} target="_blank" rel="noreferrer" className={`${SECONDARY} mt-7`}><Star className="h-4 w-4" /> SEE OUR GOOGLE REVIEWS</a></div></div></section>

      <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:py-28"><div className="text-center"><Eyebrow>YOUR JOURNEY</Eyebrow><h2 className="mt-5 font-display text-5xl sm:text-6xl">FROM ASSESSMENT<br />TO REHABILITATION.</h2></div><div className="mt-14 grid gap-8 md:grid-cols-4">{STEPS.map(s=><div key={s.n} className="border-t border-border pt-6"><p className="font-display text-5xl text-primary">{s.n}</p><h3 className="mt-5 text-lg font-semibold text-charcoal">{s.title}</h3><p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.body}</p></div>)}</div><div className="mt-10 flex justify-center"><Book /></div></section>

      <section id="contact" className="border-y border-border bg-sand"><div className="mx-auto grid max-w-7xl gap-10 px-5 py-20 sm:px-8 lg:grid-cols-[.8fr_1.2fr] lg:py-24"><div><Eyebrow>VISIT LIVEFIT PHYSIOTHERAPY</Eyebrow><h2 className="mt-5 font-display text-5xl leading-none">F-7 MARKAZ<br /><span className="text-primary">ISLAMABAD</span></h2><div className="mt-8 space-y-5"><p className="flex gap-3 text-sm text-charcoal"><MapPin className="h-5 w-5 shrink-0 text-primary" />Suite # LG-04, Pakland Trade Centre,<br />F-7 Markaz, Islamabad</p><p className="flex gap-3 text-sm font-semibold text-charcoal"><Phone className="h-5 w-5 shrink-0 text-primary" /><a href={PHONE_TEL} onClick={trackPhoneConversion}>{PHONE_DISPLAY}</a></p><p className="flex gap-3 text-sm text-charcoal"><Clock className="h-5 w-5 shrink-0 text-primary" />Monday–Saturday: 12 PM–8 PM<br /><span className="text-muted-foreground">Sunday: Closed</span></p></div><div className="mt-8 flex flex-col gap-3 sm:flex-row"><Call className="flex-1" /><a href={MAPS_URL} target="_blank" rel="noreferrer" className={`${SECONDARY} flex-1`}><Navigation className="h-4 w-4" /> GET DIRECTIONS</a></div></div><div className="min-h-[400px] overflow-hidden border border-border bg-card"><iframe title="LiveFit Physiotherapy location map" src="https://www.google.com/maps?q=Suite%23%20LG-04%2C%20Pakland%20Trade%20Centre%2C%20F7%20Markaz%2C%20Islamabad&output=embed" loading="lazy" className="h-full min-h-[400px] w-full" style={{border:0}} referrerPolicy="no-referrer-when-downgrade" /></div></div></section>

      <section className="mx-auto max-w-4xl px-5 py-20 sm:px-8 lg:py-24"><Eyebrow>FREQUENTLY ASKED QUESTIONS</Eyebrow><h2 className="mt-5 font-display text-4xl sm:text-5xl">Questions Before You Book?</h2><Accordion type="single" collapsible className="mt-8 border-t border-border">{FAQS.map(f=><AccordionItem key={f.q} value={f.q}><AccordionTrigger className="py-5 text-left text-base text-charcoal hover:no-underline sm:text-lg">{f.q}</AccordionTrigger><AccordionContent className="pb-6 text-sm leading-relaxed text-muted-foreground">{f.a}</AccordionContent></AccordionItem>)}</Accordion></section>

      <section className="bg-charcoal"><div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:py-24"><div className="grid gap-10 lg:grid-cols-[1fr_auto] lg:items-center"><div><Eyebrow>TAKE THE NEXT STEP</Eyebrow><h2 className="mt-5 max-w-3xl font-display text-5xl leading-[.9] text-background sm:text-7xl">BACK PAIN SHOULDN'T<br /><span className="text-primary">CONTROL YOUR DAY.</span></h2><p className="mt-5 max-w-xl text-sm leading-relaxed text-background/65 sm:text-base">Start with a professional physiotherapy assessment at LiveFit.</p></div><div><p className="font-display text-7xl text-primary">{PRICE}</p><p className="eyebrow mt-2 text-background/60">PHYSIOTHERAPY ASSESSMENT</p><div className="mt-6 flex flex-col gap-3"><a href={PHONE_TEL} onClick={trackPhoneConversion} className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-7 py-4 text-sm font-semibold text-primary-foreground"><ClipboardList className="h-4 w-4" /> BOOK YOUR ASSESSMENT</a><a href={PHONE_TEL} onClick={trackPhoneConversion} className="inline-flex items-center justify-center gap-2 rounded-full border border-background/25 px-7 py-4 text-sm font-semibold text-background"><Phone className="h-4 w-4" /> CALL {PHONE_DISPLAY}</a></div></div></div></div></section>

      <footer className="border-t border-border bg-sand"><div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 sm:px-8 md:grid-cols-2 lg:grid-cols-4"><div><div className="flex items-center gap-3"><img src={logo.url} alt="LiveFit Physiotherapy logo" width={44} height={44} className="h-11 w-11 rounded-sm object-cover mix-blend-multiply" /><div><p className="font-display text-xl">LiveFit</p><p className="eyebrow text-muted-foreground">Physiotherapy</p></div></div><p className="mt-5 text-sm leading-relaxed text-muted-foreground">Spine &amp; Sports Physiotherapy<br />F-7 Markaz, Islamabad</p></div><div><p className="eyebrow text-charcoal">QUICK LINKS</p><ul className="mt-5 space-y-3 text-sm text-muted-foreground"><li><a href="#top">Home</a></li><li><a href="#about">About Dr. Saad</a></li><li><a href="#conditions">Conditions</a></li><li><a href="#services">Services</a></li><li><a href="#reviews">Reviews</a></li><li><a href="#contact">Contact</a></li></ul></div><div><p className="eyebrow text-charcoal">FOCUS</p><ul className="mt-5 space-y-3 text-sm text-muted-foreground"><li>Back Pain</li><li>Sciatica</li><li>Disc Bulge / Slip Disc</li><li>Spine Physiotherapy</li><li>Sports Rehabilitation</li></ul></div><div><p className="eyebrow text-charcoal">CONTACT</p><a href={PHONE_TEL} onClick={trackPhoneConversion} className="mt-5 block text-lg font-semibold text-charcoal">{PHONE_DISPLAY}</a><p className="mt-3 text-sm text-muted-foreground">Monday–Saturday: 12 PM–8 PM<br />Sunday: Closed</p><Call className="mt-5" /></div></div><div className="mx-auto max-w-7xl border-t border-border px-5 py-5 text-xs text-muted-foreground">© 2026 LiveFit Physiotherapy. All Rights Reserved.</div></footer>
    </main>
    <div className="fixed inset-x-0 bottom-0 z-50 grid grid-cols-2 border-t border-border bg-card p-2 shadow-[0_-8px_24px_-16px_oklch(0.24_0.006_150_/_0.4)] lg:hidden"><a href={PHONE_TEL} onClick={trackPhoneConversion} className="flex items-center justify-center gap-2 rounded-full py-3.5 text-sm font-semibold text-charcoal"><Phone className="h-4 w-4" /> CALL NOW</a><a href="#assessment" className="flex items-center justify-center gap-2 rounded-full bg-primary py-3.5 text-sm font-semibold text-primary-foreground"><ClipboardList className="h-4 w-4" /> BOOK ASSESSMENT</a></div>
  </div>;
}

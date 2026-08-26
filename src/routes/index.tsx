import { createFileRoute } from "@tanstack/react-router";
import { Phone, MessageCircle, MapPin, Clock, Star, ArrowUpRight, Check } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Header } from "@/components/livefit/Header";
import {
  CONDITIONS,
  DIRECTIONS,
  FAQS,
  GOOGLE_REVIEWS,
  PHONE_DISPLAY,
  PHONE_TEL,
  SERVICE_GROUPS,
  WHATSAPP,
  WHY,
} from "@/components/livefit/data";
import heroImg from "@/assets/hero-physio.jpg";
import rehabWide from "@/assets/rehab-wide.jpg";
import sportsImg from "@/assets/sports-rehab.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "LiveFit Physiotherapy F-7 Islamabad | Move Better. Live Stronger." },
      {
        name: "description",
        content:
          "Personalized physiotherapy in F-7 Markaz, Islamabad for pain relief, injury recovery and mobility. 4.9★ Google rating. Call 0332 3337337.",
      },
      {
        property: "og:title",
        content: "LiveFit Physiotherapy — F-7 Markaz, Islamabad",
      },
      {
        property: "og:description",
        content:
          "Personalized physiotherapy for pain relief, recovery and better mobility in F-7 Markaz, Islamabad.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Stars({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-0.5 text-primary ${className}`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} className="h-3.5 w-3.5 fill-current" strokeWidth={0} />
      ))}
    </span>
  );
}

function SectionLabel({ children }: { children: string }) {
  return (
    <p className="eyebrow flex items-center gap-3 text-muted-foreground">
      <span className="h-px w-8 bg-primary" />
      {children}
    </p>
  );
}

function Index() {
  return (
    <div id="top" className="min-h-screen bg-background">
      <Header />

      <main className="pb-24 lg:pb-0">
        {/* HERO */}
        <section className="mx-auto max-w-7xl px-5 pt-12 pb-16 sm:px-8 lg:pt-20 lg:pb-24">
          <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_1fr] lg:gap-16">
            <div className="reveal">
              <p className="eyebrow text-muted-foreground">
                Personalized Physiotherapy • F-7 Islamabad
              </p>
              <h1 className="mt-6 font-display text-5xl leading-[0.98] sm:text-6xl lg:text-7xl">
                Move Better.
                <br />
                <span className="text-primary">Live Stronger.</span>
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-snug text-charcoal-soft sm:text-xl">
                Personalized Physiotherapy for Pain Relief, Recovery &amp; Better Mobility
              </p>
              <p className="mt-5 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">
                LiveFit Physiotherapy provides personalized physiotherapy care in F-7 Markaz,
                Islamabad — helping patients manage pain, recover from injuries, improve mobility
                and return to the activities they value.
              </p>

              <div className="mt-7 flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-charcoal-soft">
                <Stars />
                <span className="font-medium">4.9 Google Rating</span>
                <span className="text-border">·</span>
                <span className="text-muted-foreground">18 Google Reviews</span>
              </div>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a
                  href={PHONE_TEL}
                  className="inline-flex items-center justify-center gap-2.5 bg-primary px-8 py-4 text-xs font-medium tracking-[0.18em] text-primary-foreground uppercase transition-colors hover:bg-charcoal hover:text-background"
                >
                  <Phone className="h-4 w-4" strokeWidth={1.75} />
                  Call Now
                </a>
                <a
                  href={WHATSAPP}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-2.5 border border-charcoal px-8 py-4 text-xs font-medium tracking-[0.18em] text-charcoal uppercase transition-colors hover:bg-charcoal hover:text-background"
                >
                  <MessageCircle className="h-4 w-4" strokeWidth={1.75} />
                  WhatsApp Us
                </a>
              </div>

              <div className="mt-8 flex flex-wrap gap-x-8 gap-y-2 text-xs text-muted-foreground">
                <span className="inline-flex items-center gap-2">
                  <Clock className="h-3.5 w-3.5" strokeWidth={1.5} />
                  Monday–Saturday • 12 PM–8 PM
                </span>
                <span className="inline-flex items-center gap-2">
                  <MapPin className="h-3.5 w-3.5" strokeWidth={1.5} />
                  F-7 Markaz, Islamabad
                </span>
              </div>
            </div>

            <div className="relative">
              <img
                src={heroImg}
                alt="Physiotherapist assessing a patient's shoulder mobility at LiveFit Physiotherapy"
                width={1200}
                height={1504}
                className="aspect-[4/5] w-full rounded-lg object-cover"
              />
              <div className="absolute -bottom-5 -left-5 hidden bg-background px-6 py-5 sm:block">
                <p className="font-display text-3xl leading-none">1-to-1</p>
                <p className="eyebrow mt-2 text-muted-foreground">Personalized Care</p>
              </div>
            </div>
          </div>
        </section>

        {/* TRUST BAR */}
        <section className="border-y border-border bg-sand">
          <div className="mx-auto grid max-w-7xl grid-cols-2 divide-x divide-border px-5 sm:px-8 lg:grid-cols-4">
            {[
              { value: "4.9★", label: "Google Rating" },
              { value: "18", label: "Google Reviews" },
              { value: "F-7", label: "Markaz Islamabad" },
              { value: "1-to-1", label: "Personalized Care" },
            ].map((stat, i) => (
              <div
                key={stat.label}
                className={`px-4 py-8 text-center sm:py-10 ${i === 2 ? "border-t border-border lg:border-t-0" : ""} ${i === 3 ? "border-t border-border lg:border-t-0" : ""}`}
              >
                <p className="font-display text-4xl leading-none text-charcoal sm:text-5xl">
                  {stat.value}
                </p>
                <p className="eyebrow mt-3 text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CONDITIONS */}
        <section id="conditions" className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:py-28">
          <SectionLabel>Conditions we treat</SectionLabel>
          <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_1fr] lg:items-end">
            <h2 className="font-display text-4xl leading-tight sm:text-5xl">
              What brings you to LiveFit?
            </h2>
            <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
              Whether you're dealing with persistent pain, an injury or a mobility challenge, our
              team can help assess your condition and guide your recovery.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-2 gap-px border border-border bg-border sm:grid-cols-3 lg:grid-cols-4">
            {CONDITIONS.map((c) => (
              <a
                key={c}
                href={PHONE_TEL}
                className="group flex items-center justify-between gap-3 bg-card px-5 py-7 transition-colors hover:bg-sand sm:px-7"
              >
                <span className="text-sm text-charcoal sm:text-base">{c}</span>
                <ArrowUpRight
                  className="h-4 w-4 shrink-0 text-border transition-colors group-hover:text-primary"
                  strokeWidth={1.5}
                />
              </a>
            ))}
          </div>

          <div className="mt-10 flex flex-col items-start gap-5 border-l-2 border-primary pl-6 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-charcoal-soft sm:text-base">
              Not sure what you need? Call our team and we'll guide you.
            </p>
            <a
              href={PHONE_TEL}
              className="inline-flex shrink-0 items-center gap-2.5 bg-charcoal px-7 py-3.5 text-[0.7rem] font-medium tracking-[0.18em] text-background uppercase transition-colors hover:bg-primary hover:text-primary-foreground"
            >
              <Phone className="h-3.5 w-3.5" strokeWidth={1.75} />
              Call a Physiotherapist
            </a>
          </div>
        </section>

        {/* WHY LIVEFIT */}
        <section id="why" className="border-y border-border bg-sand">
          <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:py-28">
            <div className="grid gap-6 lg:grid-cols-[1fr_1fr] lg:items-end">
              <div>
                <SectionLabel>Why LiveFit</SectionLabel>
                <h2 className="mt-6 font-display text-4xl leading-tight sm:text-5xl">
                  Physiotherapy Built Around You
                </h2>
              </div>
              <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
                At LiveFit, treatment isn't approached as a one-size-fits-all routine. Your care is
                shaped around your condition, movement, goals and recovery needs.
              </p>
            </div>

            <div className="mt-14 grid gap-x-12 gap-y-12 sm:grid-cols-2">
              {WHY.map((item, i) => (
                <div key={item.title} className="border-t border-border pt-7">
                  <p className="eyebrow text-primary">{String(i + 1).padStart(2, "0")}</p>
                  <h3 className="mt-4 text-xl text-charcoal sm:text-2xl">{item.title}</h3>
                  <p className="mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">
                    {item.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* PREMIUM IMAGE */}
        <section className="relative">
          <img
            src={rehabWide}
            alt="Rehabilitation exercise session in a modern physiotherapy studio"
            width={1920}
            height={1088}
            loading="lazy"
            className="h-[55vh] min-h-[340px] w-full object-cover lg:h-[70vh]"
          />
          <div className="absolute inset-0 bg-charcoal/45" />
          <div className="absolute inset-0 flex items-center justify-center px-6">
            <p className="text-center font-display text-4xl text-background sm:text-6xl lg:text-7xl">
              Move Better. Live Stronger.
            </p>
          </div>
        </section>

        {/* SERVICES */}
        <section id="services" className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:py-28">
          <SectionLabel>Services</SectionLabel>
          <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_1fr] lg:items-end">
            <h2 className="font-display text-4xl leading-tight sm:text-5xl">
              Specialized Physiotherapy Services
            </h2>
            <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
              Personalized care for pain, injury, rehabilitation and movement.
            </p>
          </div>

          <div className="mt-14 grid gap-x-12 gap-y-14 sm:grid-cols-2 lg:grid-cols-4">
            {SERVICE_GROUPS.map((group) => (
              <div key={group.title} className="border-t border-charcoal pt-6">
                <h3 className="text-lg text-charcoal">{group.title}</h3>
                <ul className="mt-5 space-y-2.5">
                  {group.items.map((item) => (
                    <li
                      key={item}
                      className="flex gap-2.5 text-sm leading-relaxed text-muted-foreground"
                    >
                      <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-primary" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <p className="mt-14 border-t border-border pt-6 text-sm text-charcoal-soft">
            Also available:{" "}
            <span className="text-muted-foreground">
              Dry Needling · Dry Cupping · IASTM · Graston Tool Therapy
            </span>
          </p>
        </section>

        {/* SPORTS REHAB */}
        <section className="border-y border-border bg-sand">
          <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 py-20 sm:px-8 lg:grid-cols-2 lg:gap-20 lg:py-28">
            <img
              src={sportsImg}
              alt="Physiotherapist taping an athlete's ankle during sports rehabilitation"
              width={1200}
              height={1408}
              loading="lazy"
              className="aspect-[4/5] w-full rounded-lg object-cover"
            />
            <div>
              <SectionLabel>Sports Rehabilitation</SectionLabel>
              <h2 className="mt-6 font-display text-4xl leading-tight sm:text-5xl">
                Recover Stronger. Return With Confidence.
              </h2>
              <p className="mt-5 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">
                From gym injuries and sports strains to ACL and ankle rehabilitation, LiveFit
                provides structured physiotherapy designed to support recovery, restore movement and
                help you safely return to activity.
              </p>

              <ul className="mt-9 grid gap-px border border-border bg-border sm:grid-cols-2">
                {[
                  "Injury Assessment",
                  "Strength & Mobility",
                  "Rehabilitation",
                  "Return-to-Sport Planning",
                ].map((p) => (
                  <li key={p} className="flex items-center gap-3 bg-card px-5 py-5 text-sm">
                    <Check className="h-4 w-4 shrink-0 text-primary" strokeWidth={2} />
                    {p}
                  </li>
                ))}
              </ul>

              <a
                href={PHONE_TEL}
                className="mt-9 inline-flex items-center gap-2.5 bg-charcoal px-7 py-4 text-[0.7rem] font-medium tracking-[0.18em] text-background uppercase transition-colors hover:bg-primary hover:text-primary-foreground"
              >
                <Phone className="h-3.5 w-3.5" strokeWidth={1.75} />
                Call About Sports Rehabilitation
              </a>
            </div>
          </div>
        </section>

        {/* REVIEWS */}
        <section id="reviews" className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:py-28">
          <SectionLabel>Reviews</SectionLabel>
          <div className="mt-6 grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end">
            <h2 className="font-display text-4xl leading-tight sm:text-5xl">
              Trusted by Patients in Islamabad
            </h2>
            <div className="flex items-end gap-5">
              <p className="font-display text-6xl leading-none text-charcoal sm:text-7xl">4.9</p>
              <div className="pb-2">
                <Stars />
                <p className="mt-2 text-xs text-muted-foreground">18 Google Reviews</p>
              </div>
            </div>
          </div>

          {/* NOTE: Placeholder review cards. Replace with verified Google reviews only. */}
          <div className="mt-12 grid gap-px border border-border bg-border lg:grid-cols-3">
            {[1, 2, 3].map((n) => (
              <div key={n} className="flex flex-col justify-between gap-8 bg-card p-8">
                <div>
                  <Stars />
                  <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
                    Verified Google review pending. Actual patient reviews from our Google Business
                    Profile will be published here.
                  </p>
                </div>
                <div className="border-t border-border pt-5">
                  <p className="text-sm text-charcoal">[GOOGLE REVIEWER NAME]</p>
                  <p className="eyebrow mt-1.5 text-muted-foreground">Google Review</p>
                </div>
              </div>
            ))}
          </div>

          <a
            href={GOOGLE_REVIEWS}
            target="_blank"
            rel="noreferrer"
            className="mt-10 inline-flex items-center gap-2.5 border border-charcoal px-7 py-3.5 text-[0.7rem] font-medium tracking-[0.18em] text-charcoal uppercase transition-colors hover:bg-charcoal hover:text-background"
          >
            View Google Reviews
            <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={1.75} />
          </a>
        </section>

        {/* HOW IT WORKS */}
        <section className="border-y border-border bg-sand">
          <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:py-28">
            <SectionLabel>How it works</SectionLabel>
            <h2 className="mt-6 font-display text-4xl leading-tight sm:text-5xl">
              Three simple steps
            </h2>
            <div className="mt-14 grid gap-x-12 gap-y-12 lg:grid-cols-3">
              {[
                {
                  n: "01",
                  t: "Call Us",
                  b: "Tell our team what you're experiencing and check appointment availability.",
                },
                {
                  n: "02",
                  t: "Assessment",
                  b: "Your physiotherapist assesses your symptoms, movement and functional needs.",
                },
                {
                  n: "03",
                  t: "Personalized Care",
                  b: "Receive a treatment and rehabilitation approach tailored to your condition and goals.",
                },
              ].map((s) => (
                <div key={s.n} className="border-t border-charcoal pt-7">
                  <p className="font-display text-4xl leading-none text-primary">{s.n}</p>
                  <h3 className="mt-5 text-xl text-charcoal sm:text-2xl">{s.t}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{s.b}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* TEAM */}
        <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:py-28">
          <SectionLabel>Our team</SectionLabel>
          <h2 className="mt-6 font-display text-4xl leading-tight sm:text-5xl">
            Meet Your Physiotherapy Team
          </h2>
          <p className="mt-5 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
            Verified physiotherapist names, qualifications and specializations will be published
            here once confirmed by the clinic.
          </p>

          {/* NOTE: Placeholder team cards — insert verified team information only. */}
          <div className="mt-12 grid gap-px border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((n) => (
              <div key={n} className="bg-card p-8">
                <div className="aspect-[4/5] w-full bg-sand" />
                <p className="mt-6 text-lg text-charcoal">[PHYSIOTHERAPIST NAME]</p>
                <p className="mt-2 text-sm text-muted-foreground">[QUALIFICATION]</p>
                <p className="eyebrow mt-3 text-primary">[SPECIALIZATION]</p>
              </div>
            ))}
          </div>
        </section>

        {/* LOCATION */}
        <section id="location" className="border-y border-border bg-sand">
          <div className="mx-auto grid max-w-7xl gap-12 px-5 py-20 sm:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16 lg:py-28">
            <div>
              <SectionLabel>Location</SectionLabel>
              <h2 className="mt-6 font-display text-4xl leading-tight sm:text-5xl">
                Visit LiveFit Physiotherapy
              </h2>

              <div className="mt-10 space-y-6 border-t border-border pt-8">
                <div className="flex gap-4">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" strokeWidth={1.75} />
                  <p className="text-sm text-charcoal">F-7 Markaz F-7, Islamabad, 44210</p>
                </div>
                <div className="flex gap-4">
                  <Phone className="mt-0.5 h-4 w-4 shrink-0 text-primary" strokeWidth={1.75} />
                  <a href={PHONE_TEL} className="text-sm text-charcoal hover:text-primary">
                    {PHONE_DISPLAY}
                  </a>
                </div>
                <div className="flex gap-4">
                  <Clock className="mt-0.5 h-4 w-4 shrink-0 text-primary" strokeWidth={1.75} />
                  <p className="text-sm text-charcoal">
                    Monday–Saturday: 12 PM–8 PM
                    <span className="mt-1 block text-muted-foreground">Sunday: Closed</span>
                  </p>
                </div>
              </div>

              <ul className="mt-8 space-y-2.5 border-t border-border pt-8">
                {["Appointment required", "Free parking available", "Wheelchair-accessible entrance"].map(
                  (item) => (
                    <li key={item} className="flex items-center gap-3 text-sm text-muted-foreground">
                      <Check className="h-4 w-4 shrink-0 text-primary" strokeWidth={2} />
                      {item}
                    </li>
                  ),
                )}
              </ul>

              <div className="mt-10 flex flex-col gap-3 sm:flex-row">
                <a
                  href={DIRECTIONS}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-2.5 border border-charcoal px-7 py-3.5 text-[0.7rem] font-medium tracking-[0.18em] text-charcoal uppercase transition-colors hover:bg-charcoal hover:text-background"
                >
                  Get Directions
                </a>
                <a
                  href={PHONE_TEL}
                  className="inline-flex items-center justify-center gap-2.5 bg-primary px-7 py-3.5 text-[0.7rem] font-medium tracking-[0.18em] text-primary-foreground uppercase transition-colors hover:bg-charcoal hover:text-background"
                >
                  <Phone className="h-3.5 w-3.5" strokeWidth={1.75} />
                  Call Now
                </a>
              </div>
            </div>

            <div className="overflow-hidden rounded-lg border border-border bg-card">
              <iframe
                title="LiveFit Physiotherapy location map — F-7 Markaz, Islamabad"
                src="https://www.google.com/maps?q=F-7%20Markaz%2C%20Islamabad%2044210&output=embed"
                loading="lazy"
                className="h-[380px] w-full lg:h-full lg:min-h-[520px]"
                style={{ border: 0 }}
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section id="faqs" className="mx-auto max-w-4xl px-5 py-20 sm:px-8 lg:py-28">
          <SectionLabel>FAQs</SectionLabel>
          <h2 className="mt-6 font-display text-4xl leading-tight sm:text-5xl">
            Frequently asked questions
          </h2>
          <Accordion type="single" collapsible className="mt-10 border-t border-border">
            {FAQS.map((faq) => (
              <AccordionItem key={faq.q} value={faq.q} className="border-b border-border">
                <AccordionTrigger className="py-5 text-left text-base text-charcoal hover:no-underline sm:text-lg">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="pb-6 text-sm leading-relaxed text-muted-foreground">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </section>

        {/* FINAL CTA */}
        <section className="bg-charcoal">
          <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:py-28">
            <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
              <div>
                <p className="eyebrow flex items-center gap-3 text-background/60">
                  <span className="h-px w-8 bg-primary" />
                  Get started
                </p>
                <h2 className="mt-6 font-display text-4xl leading-tight text-background sm:text-6xl">
                  Ready to <span className="text-primary">Move Better?</span>
                </h2>
                <p className="mt-5 max-w-xl text-sm leading-relaxed text-background/70 sm:text-base">
                  Take the first step toward better movement and recovery. Speak with the LiveFit
                  team about your physiotherapy needs.
                </p>
              </div>

              <div className="lg:justify-self-end">
                <a
                  href={PHONE_TEL}
                  className="flex flex-col items-start gap-1 bg-primary px-9 py-7 transition-colors hover:bg-background"
                >
                  <span className="eyebrow text-primary-foreground/70">Call Now</span>
                  <span className="font-display text-4xl leading-none text-primary-foreground sm:text-5xl">
                    {PHONE_DISPLAY}
                  </span>
                </a>
                <a
                  href={WHATSAPP}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-3 inline-flex w-full items-center justify-center gap-2.5 border border-background/30 px-9 py-4 text-[0.7rem] font-medium tracking-[0.18em] text-background uppercase transition-colors hover:bg-background hover:text-charcoal"
                >
                  <MessageCircle className="h-4 w-4" strokeWidth={1.75} />
                  WhatsApp Us
                </a>
                <div className="mt-6 space-y-1.5 text-xs text-background/60">
                  <p>F-7 Markaz, Islamabad</p>
                  <p>Monday–Saturday • 12 PM–8 PM</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <footer className="bg-charcoal">
          <div className="mx-auto max-w-7xl border-t border-background/15 px-5 py-8 text-xs text-background/50 sm:px-8">
            <p>LiveFit Physiotherapy · F-7 Markaz, Islamabad · Move Better. Live Stronger.</p>
          </div>
        </footer>
      </main>

      {/* MOBILE STICKY CTA */}
      <div className="fixed inset-x-0 bottom-0 z-50 grid grid-cols-2 border-t border-background/15 bg-charcoal lg:hidden">
        <a
          href={PHONE_TEL}
          className="flex items-center justify-center gap-2 py-4 text-[0.7rem] font-medium tracking-[0.18em] text-background uppercase"
        >
          <Phone className="h-4 w-4" strokeWidth={1.75} />
          Call Now
        </a>
        <a
          href={WHATSAPP}
          target="_blank"
          rel="noreferrer"
          className="flex items-center justify-center gap-2 bg-primary py-4 text-[0.7rem] font-medium tracking-[0.18em] text-primary-foreground uppercase"
        >
          <MessageCircle className="h-4 w-4" strokeWidth={1.75} />
          WhatsApp
        </a>
      </div>
    </div>
  );
}

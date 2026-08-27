import { createFileRoute } from "@tanstack/react-router";
import {
  Phone,
  MapPin,
  Clock,
  Check,
  Stethoscope,
  ClipboardList,
  Activity,
  Navigation,
  ArrowRight,
  HeartPulse,
  Bone,
  Dumbbell,
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Header } from "@/components/livefit/Header";
import { trackPhoneConversion } from "@/lib/conversion";
import {
  ADDRESS,
  FAQS,
  MAPS_URL,
  PHONE_DISPLAY,
  PHONE_TEL,
  PROBLEMS,
  SERVICES,
  STEPS,
  TRUST_STRIP,
  WHY,
} from "@/components/livefit/data";
import logo from "@/assets/livefit-logo.jpg.asset.json";
/* Doctor / physiotherapist portrait — replace this file to swap the photo. */
import doctorAsset from "@/assets/doctor-livefit.png.asset.json";
import assessmentAsset from "@/assets/clinic-assessment.png.asset.json";
import consultAsset from "@/assets/clinic-consult.png.asset.json";
import treatmentAsset from "@/assets/clinic-treatment.png.asset.json";
import mobilityAsset from "@/assets/clinic-mobility.png.asset.json";
import frontAsset from "@/assets/clinic-signboard.webp.asset.json";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "LiveFit Physiotherapy Islamabad | Expert Physiotherapy Care" },
      {
        name: "description",
        content:
          "LiveFit Physiotherapy in F-7 Markaz Islamabad. Personalized physiotherapy for pain relief, rehabilitation, sports injuries and better movement. Call 0332 3337337.",
      },
      {
        property: "og:title",
        content: "LiveFit Physiotherapy Islamabad | Expert Physiotherapy Care",
      },
      {
        property: "og:description",
        content:
          "Personalized physiotherapy in F-7 Markaz, Islamabad for pain relief, rehabilitation and better movement. Call 0332 3337337.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://livefit-premium-landing.lovable.app/" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://livefit-premium-landing.lovable.app/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Physiotherapy",
          name: "LiveFit Physiotherapy",
          description:
            "Physiotherapy clinic in F-7 Markaz, Islamabad offering personalized physiotherapy for pain relief, rehabilitation and better movement.",
          telephone: "+92 332 3337337",
          url: "https://livefit-premium-landing.lovable.app/",
          address: {
            "@type": "PostalAddress",
            streetAddress: "F-7 Markaz",
            addressLocality: "Islamabad",
            postalCode: "44210",
            addressCountry: "PK",
          },
        }),
      },
    ],
  }),
  component: Index,
});

const CALL_PRIMARY =
  "inline-flex items-center justify-center gap-2.5 rounded-full bg-primary px-7 py-4 text-sm font-semibold text-primary-foreground shadow-sm transition-colors hover:bg-charcoal hover:text-background";
const CALL_SECONDARY =
  "inline-flex items-center justify-center gap-2.5 rounded-full border border-charcoal/20 bg-card px-7 py-4 text-sm font-semibold text-charcoal transition-colors hover:border-charcoal hover:bg-charcoal hover:text-background";

function Eyebrow({ children }: { children: string }) {
  return (
    <p className="eyebrow inline-flex items-center gap-2.5 rounded-full bg-accent px-4 py-2 text-accent-foreground">
      {children}
    </p>
  );
}

function Index() {
  return (
    <div id="top" className="min-h-screen bg-background">
      <Header />

      <main className="pb-20 lg:pb-0">
        {/* HERO */}
        <section className="relative overflow-hidden">
          <div
            aria-hidden
            className="pointer-events-none absolute -top-40 -right-32 h-[520px] w-[520px] rounded-full bg-accent/60 blur-3xl"
          />
          <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-5 pt-12 pb-16 sm:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16 lg:pt-20 lg:pb-24">
            <div>
              <Eyebrow>LiveFit Physiotherapy — Islamabad</Eyebrow>
              <p className="mt-3 text-lg font-medium text-primary">Move Better. Live Stronger.</p>
              <h1 className="mt-4 font-display text-5xl leading-[1.02] sm:text-6xl lg:text-[4.25rem]">
                Expert Physiotherapy Care in Islamabad
              </h1>
              <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
                Personalized physiotherapy for pain relief, rehabilitation and better movement.
              </p>

              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <a href={PHONE_TEL} onClick={trackPhoneConversion} className={CALL_PRIMARY}>
                  <Phone className="h-4 w-4" strokeWidth={2} />
                  Call Now — {PHONE_DISPLAY}
                </a>
                <a href={PHONE_TEL} onClick={trackPhoneConversion} className={CALL_SECONDARY}>
                  Book an Appointment
                </a>
              </div>

              <div className="mt-8 flex flex-wrap gap-x-8 gap-y-2 text-xs text-muted-foreground">
                <span className="inline-flex items-center gap-2">
                  <MapPin className="h-3.5 w-3.5 text-primary" strokeWidth={1.75} />
                  F-7 Markaz, Islamabad
                </span>
                <span className="inline-flex items-center gap-2">
                  <Clock className="h-3.5 w-3.5 text-primary" strokeWidth={1.75} />
                  Monday–Saturday • 12 PM–8 PM
                </span>
              </div>
            </div>

            <div className="relative">
              <img
                src={doctorAsset.url}
                alt="Physiotherapist at LiveFit Physiotherapy, F-7 Markaz Islamabad"
                width={1080}
                height={1440}
                className="aspect-[3/4] w-full rounded-[2rem] object-cover object-top shadow-[0_24px_60px_-24px_oklch(0.24_0.006_150_/_0.35)]"
              />
              <div className="absolute -bottom-6 left-4 rounded-2xl border border-border bg-card p-5 shadow-[0_18px_40px_-20px_oklch(0.24_0.006_150_/_0.35)] sm:left-auto sm:-left-8">
                <div className="flex items-center gap-3">
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-accent">
                    <HeartPulse className="h-4 w-4 text-primary" strokeWidth={2} />
                  </span>

                  <div>
                    <p className="text-sm font-semibold text-charcoal">Personalized Care</p>
                    <p className="mt-0.5 text-xs text-muted-foreground">
                      Evidence-Based Treatment
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* TRUST STRIP */}
        <section className="border-y border-border bg-sand">
          <div className="mx-auto grid max-w-7xl gap-x-8 gap-y-6 px-5 py-8 sm:grid-cols-2 sm:px-8 lg:grid-cols-4 lg:py-10">
            {TRUST_STRIP.map((item) => {
              const Icon =
                item.icon === "stethoscope"
                  ? Stethoscope
                  : item.icon === "clipboard"
                    ? ClipboardList
                    : item.icon === "activity"
                      ? Activity
                      : MapPin;
              return (
                <div key={item.title} className="flex items-center gap-3.5">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-card shadow-sm">
                    <Icon className="h-5 w-5 text-primary" strokeWidth={1.75} />
                  </span>
                  <p className="min-w-0 text-sm font-medium text-charcoal">{item.title}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* ABOUT */}
        <section id="about" className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:py-28">
          <div className="grid items-center gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16">
            <img
              src={consultAsset.url}
              alt="Consultation with the physiotherapist at LiveFit Physiotherapy, Islamabad"
              width={1200}
              height={1200}
              loading="lazy"
              className="aspect-square w-full rounded-[2rem] object-cover"
            />
            <div>
              <Eyebrow>About LiveFit</Eyebrow>
              <h2 className="mt-6 font-display text-4xl leading-tight sm:text-5xl">
                Physiotherapy That Focuses on You
              </h2>
              <p className="mt-6 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">
                At LiveFit Physiotherapy, we believe effective physiotherapy starts with
                understanding the person behind the pain. Every patient receives a personalized
                assessment and treatment approach designed around their condition, goals and
                movement needs.
              </p>
              <p className="mt-5 max-w-xl border-l-2 border-primary pl-5 text-sm leading-relaxed font-medium text-charcoal-soft sm:text-base">
                Our goal is simple: help you move with less pain, greater confidence and better
                function.
              </p>
              <a href={PHONE_TEL} onClick={trackPhoneConversion} className={`${CALL_PRIMARY} mt-9`}>
                <Phone className="h-4 w-4" strokeWidth={2} />
                Talk to a Physiotherapist
              </a>
            </div>
          </div>
        </section>

        {/* INSIDE THE CLINIC — real photographs */}
        <section className="border-t border-border bg-sand">
          <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:py-24">
            <div className="max-w-2xl">
              <Eyebrow>Inside the Clinic</Eyebrow>
              <h2 className="mt-6 font-display text-4xl leading-tight sm:text-5xl">
                Real Care, Real Patients
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
                Photographs from our F-7 Markaz clinic in Islamabad.
              </p>
            </div>
            <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {[
                { src: assessmentAsset.url, alt: "Physiotherapy assessment at LiveFit Physiotherapy, Islamabad" },
                { src: treatmentAsset.url, alt: "Electrotherapy and heat therapy treatment session at LiveFit" },
                { src: mobilityAsset.url, alt: "Shoulder mobility session with a patient at LiveFit" },
                { src: frontAsset.url, alt: "LiveFit Physiotherapy clinic signboard in F-7 Markaz, Islamabad" },
              ].map((img) => (
                <img
                  key={img.src}
                  src={img.src}
                  alt={img.alt}
                  loading="lazy"
                  className="aspect-[3/4] w-full rounded-[1.5rem] object-cover shadow-[0_18px_40px_-24px_oklch(0.24_0.006_150_/_0.35)]"
                />
              ))}
            </div>
          </div>
        </section>



        {/* SERVICES */}
        <section id="services" className="border-y border-border bg-sand">
          <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:py-28">
            <div className="max-w-2xl">
              <Eyebrow>Services</Eyebrow>
              <h2 className="mt-6 font-display text-4xl leading-tight sm:text-5xl">
                How We Can Help
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
                Personalized physiotherapy for pain relief, rehabilitation and better movement.
              </p>
            </div>

            <div className="mt-12 grid gap-6 lg:grid-cols-3">
              {SERVICES.map((s) => {
                const Icon = s.icon === "spine" ? Bone : s.icon === "sports" ? Dumbbell : Activity;
                return (
                  <article
                    key={s.title}
                    className="group flex flex-col rounded-3xl border border-border bg-card p-8 transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-[0_20px_44px_-24px_oklch(0.24_0.006_150_/_0.35)]"
                  >
                    <span className="grid h-12 w-12 place-items-center rounded-2xl bg-accent transition-colors group-hover:bg-primary">
                      <Icon
                        className="h-5 w-5 text-primary transition-colors group-hover:text-primary-foreground"
                        strokeWidth={1.75}
                      />
                    </span>
                    <h3 className="mt-6 text-xl text-charcoal">{s.title}</h3>
                    <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
                      {s.body}
                    </p>
                    <a
                      href={PHONE_TEL}
                      onClick={trackPhoneConversion}
                      className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-primary transition-colors hover:text-charcoal"
                    >
                      {s.cta}
                      <ArrowRight className="h-4 w-4" strokeWidth={2} />
                    </a>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        {/* PROBLEM */}
        <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:py-28">
          <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:gap-16">
            <div>
              <Eyebrow>Common concerns</Eyebrow>
              <h2 className="mt-6 font-display text-4xl leading-tight sm:text-5xl">
                Pain Shouldn't Control Your Day.
              </h2>
              <p className="mt-6 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">
                Instead of simply treating the symptoms, our approach focuses on understanding the
                underlying movement limitations and creating a treatment plan around your needs.
              </p>
              <a href={PHONE_TEL} onClick={trackPhoneConversion} className={`${CALL_PRIMARY} mt-9`}>
                <Phone className="h-4 w-4" strokeWidth={2} />
                Speak With LiveFit Today
              </a>
            </div>
            <ul className="grid gap-3 sm:grid-cols-2 lg:content-start">
              {PROBLEMS.map((p) => (
                <li
                  key={p}
                  className="flex items-center gap-3 rounded-2xl border border-border bg-card px-5 py-4 text-sm text-charcoal"
                >
                  <Check className="h-4 w-4 shrink-0 text-primary" strokeWidth={2.25} />
                  {p}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section className="border-y border-border bg-sand">
          <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:py-28">
            <div className="max-w-2xl">
              <Eyebrow>How it works</Eyebrow>
              <h2 className="mt-6 font-display text-4xl leading-tight sm:text-5xl">
                A Clear Path to Recovery
              </h2>
            </div>
            <div className="mt-12 grid gap-6 lg:grid-cols-3">
              {STEPS.map((s) => (
                <div key={s.n} className="rounded-3xl border border-border bg-card p-8">
                  <p className="font-display text-4xl leading-none text-primary">{s.n}</p>
                  <h3 className="mt-5 text-xl text-charcoal">{s.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{s.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* WHY LIVEFIT */}
        <section id="why" className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:py-28">
          <div className="max-w-2xl">
            <Eyebrow>Why LiveFit</Eyebrow>
            <h2 className="mt-6 font-display text-4xl leading-tight sm:text-5xl">
              Why Choose LiveFit Physiotherapy?
            </h2>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2">
            {WHY.map((item) => (
              <div
                key={item.title}
                className="rounded-3xl border border-border bg-card p-8 transition-colors hover:border-primary/40"
              >
                <span className="grid h-11 w-11 place-items-center rounded-full bg-accent">
                  <Check className="h-5 w-5 text-primary" strokeWidth={2} />
                </span>
                <h3 className="mt-6 text-xl text-charcoal">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{item.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* LOCATION */}
        <section id="contact" className="border-y border-border bg-sand">
          <div className="mx-auto grid max-w-7xl gap-12 px-5 py-20 sm:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16 lg:py-28">
            <div>
              <Eyebrow>Location</Eyebrow>
              <h2 className="mt-6 font-display text-4xl leading-tight sm:text-5xl">
                Visit LiveFit Physiotherapy in Islamabad
              </h2>

              <div className="mt-10 space-y-6 rounded-3xl border border-border bg-card p-8">
                <div className="flex gap-4">
                  <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-primary" strokeWidth={1.75} />
                  <p className="text-sm text-charcoal">{ADDRESS}</p>
                </div>
                <div className="flex gap-4">
                  <Phone className="mt-0.5 h-5 w-5 shrink-0 text-primary" strokeWidth={1.75} />
                  <a
                    href={PHONE_TEL}
                    onClick={trackPhoneConversion}
                    className="text-sm font-semibold text-charcoal hover:text-primary"
                  >
                    {PHONE_DISPLAY}
                  </a>
                </div>
                <div className="flex gap-4">
                  <Clock className="mt-0.5 h-5 w-5 shrink-0 text-primary" strokeWidth={1.75} />
                  <p className="text-sm text-charcoal">
                    Monday–Saturday: 12 PM–8 PM
                    <span className="mt-1 block text-muted-foreground">Sunday: Closed</span>
                  </p>
                </div>

                <div className="flex flex-col gap-3 border-t border-border pt-6 sm:flex-row">
                  {/* TODO: swap MAPS_URL in data.ts for the clinic's Google Business Profile link. */}
                  <a
                    href={MAPS_URL}
                    target="_blank"
                    rel="noreferrer"
                    className={`${CALL_SECONDARY} flex-1`}
                  >
                    <Navigation className="h-4 w-4" strokeWidth={2} />
                    Get Directions
                  </a>
                  <a href={PHONE_TEL} onClick={trackPhoneConversion} className={`${CALL_PRIMARY} flex-1`}>
                    <Phone className="h-4 w-4" strokeWidth={2} />
                    Call Now
                  </a>
                </div>
              </div>
            </div>

            <div className="overflow-hidden rounded-[2rem] border border-border bg-card">
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

        {/* MAIN CTA */}
        <section className="bg-charcoal">
          <div className="mx-auto grid max-w-7xl gap-10 px-5 py-20 sm:px-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:py-24">
            <div>
              <h2 className="font-display text-4xl leading-tight text-background sm:text-5xl">
                Ready to <span className="text-primary">Move Better?</span>
              </h2>
              <p className="mt-5 max-w-xl text-sm leading-relaxed text-background/70 sm:text-base">
                Speak with LiveFit Physiotherapy and take the first step toward better movement and
                recovery.
              </p>
            </div>
            <div className="lg:justify-self-end">
              <a
                href={PHONE_TEL}
                onClick={trackPhoneConversion}
                className="flex flex-col items-start gap-1 rounded-3xl bg-primary px-9 py-7 transition-colors hover:bg-background"
              >
                <span className="eyebrow text-primary-foreground/70">Call Now</span>
                <span className="font-display text-4xl leading-none text-primary-foreground sm:text-5xl">
                  {PHONE_DISPLAY}
                </span>
              </a>
              <a
                href={PHONE_TEL}
                onClick={trackPhoneConversion}
                className="mt-3 inline-flex w-full items-center justify-center gap-2.5 rounded-full border border-background/30 px-9 py-4 text-sm font-semibold text-background transition-colors hover:bg-background hover:text-charcoal"
              >
                Book Your Appointment
              </a>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="mx-auto max-w-4xl px-5 py-20 sm:px-8 lg:py-28">
          <Eyebrow>FAQs</Eyebrow>
          <h2 className="mt-6 font-display text-4xl leading-tight sm:text-5xl">
            Frequently Asked Questions
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

        {/* FOOTER */}
        <footer className="border-t border-border bg-sand">
          <div className="mx-auto grid max-w-7xl gap-12 px-5 py-16 sm:px-8 lg:grid-cols-[1.3fr_0.8fr_1fr]">
            <div>
              <div className="flex items-center gap-3">
                <img
                  src={logo.url}
                  alt="LiveFit Physiotherapy logo"
                  width={44}
                  height={44}
                  loading="lazy"
                  className="h-11 w-11 rounded-sm object-cover mix-blend-multiply"
                />
                <span>
                  <span className="block font-display text-xl leading-none">LiveFit</span>
                  <span className="eyebrow mt-1 block text-[0.6rem] text-muted-foreground">
                    Physiotherapy
                  </span>
                </span>
              </div>
              <p className="mt-6 max-w-sm text-sm leading-relaxed text-muted-foreground">
                Professional physiotherapy care focused on pain relief, rehabilitation and better
                movement.
              </p>
            </div>

            <div>
              <p className="eyebrow text-charcoal">Quick Links</p>
              <ul className="mt-5 space-y-3 text-sm text-muted-foreground">
                {[
                  { label: "Home", href: "#top" },
                  { label: "About", href: "#about" },
                  { label: "Services", href: "#services" },
                  { label: "Why LiveFit", href: "#why" },
                  { label: "Contact", href: "#contact" },
                ].map((l) => (
                  <li key={l.href}>
                    <a href={l.href} className="transition-colors hover:text-primary">
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="eyebrow text-charcoal">Contact</p>
              <ul className="mt-5 space-y-3 text-sm text-muted-foreground">
                <li>F-7 Markaz, Islamabad</li>
                <li>
                  <a
                    href={PHONE_TEL}
                    onClick={trackPhoneConversion}
                    className="font-semibold text-charcoal hover:text-primary"
                  >
                    {PHONE_DISPLAY}
                  </a>
                </li>
                <li>Monday–Saturday • 12 PM–8 PM</li>
              </ul>
              <a href={PHONE_TEL} onClick={trackPhoneConversion} className={`${CALL_PRIMARY} mt-6`}>
                <Phone className="h-4 w-4" strokeWidth={2} />
                Call Now
              </a>
            </div>
          </div>
          <div className="mx-auto max-w-7xl border-t border-border px-5 py-6 text-xs text-muted-foreground sm:px-8">
            <p>© 2026 LiveFit Physiotherapy. All Rights Reserved.</p>
          </div>
        </footer>
      </main>

      {/* MOBILE STICKY CALL CTA */}
        <div className="fixed inset-x-0 bottom-0 z-50 border-t border-border bg-card p-3 shadow-[0_-8px_24px_-16px_oklch(0.24_0.006_150_/_0.4)] lg:hidden">
        <a
          href={PHONE_TEL}
          onClick={trackPhoneConversion}
          className="flex w-full items-center justify-center gap-2.5 rounded-full bg-primary py-3.5 text-sm font-semibold text-primary-foreground"
        >
          <Phone className="h-4 w-4" strokeWidth={2} />
          Call Now — {PHONE_DISPLAY}
        </a>
      </div>
    </div>
  );
}

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
import doctorAsset from "@/assets/doctor-livefit.png.asset.json";
import assessmentAsset from "@/assets/clinic-assessment.png.asset.json";
import consultAsset from "@/assets/clinic-consult.png.asset.json";
import treatmentAsset from "@/assets/clinic-treatment.png.asset.json";
import mobilityAsset from "@/assets/clinic-mobility.png.asset.json";
import frontAsset from "@/assets/clinic-signboard.webp.asset.json";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Physiotherapy in Islamabad | LiveFit Physiotherapy" },
      {
        name: "description",
        content:
          "Expert physiotherapy in Islamabad for back pain, sciatica, disc bulge, spine problems and sports injuries. Book your assessment at LiveFit.",
      },
      {
        property: "og:title",
        content: "Physiotherapy in Islamabad | LiveFit Physiotherapy",
      },
      {
        property: "og:description",
        content:
          "Expert physiotherapy in Islamabad for back pain, sciatica, disc bulge, spine problems and sports injuries. Book your assessment at LiveFit.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://livefitphysiotherapy.com/" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://livefitphysiotherapy.com/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "MedicalClinic",
          name: "LiveFit Physiotherapy",
          description:
            "Physiotherapy clinic in Islamabad focused on back pain, spine problems, sciatica, disc bulge and sports injury rehabilitation.",
          telephone: "+92 332 3337337",
          url: "https://livefitphysiotherapy.com/",
          medicalSpecialty: "Physiotherapy",
          address: {
            "@type": "PostalAddress",
            streetAddress: "Suite # LG-04, Pakland Trade Centre, F-7 Markaz",
            addressLocality: "Islamabad",
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
const ASSESSMENT_PRICE = "PKR 1,499";

function Eyebrow({ children }: { children: string }) {
  return (
    <p className="eyebrow inline-flex items-center gap-2.5 rounded-full bg-accent px-4 py-2 text-accent-foreground">
      {children}
    </p>
  );
}

function Index() {
  const bookAssessmentHref = "#assessment";

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
              <Eyebrow>BACK &amp; SPINE PHYSIOTHERAPY — ISLAMABAD</Eyebrow>
              <h1 className="mt-5 max-w-3xl font-display text-5xl leading-[1.02] sm:text-6xl lg:text-[4.25rem]">
                Expert Physiotherapy for Back &amp; Spine Problems
              </h1>
              <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
                Get professionally assessed by Dr. Saad Sarfraz, Chief Physiotherapist, with a focus on Spine &amp; Sports Physiotherapy.
              </p>

              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <a href={bookAssessmentHref} className={CALL_PRIMARY}>
                  <ClipboardList className="h-4 w-4" strokeWidth={2} />
                  BOOK YOUR ASSESSMENT — {ASSESSMENT_PRICE}
                </a>
                <a href={PHONE_TEL} onClick={trackPhoneConversion} className={CALL_SECONDARY}>
                  <Phone className="h-4 w-4" strokeWidth={2} />
                  CALL {PHONE_DISPLAY}
                </a>
              </div>

              <p className="mt-7 text-xs font-medium text-muted-foreground">
                Personalized Assessment • Spine-Focused Care • F-7 Markaz
              </p>
            </div>

            <div className="relative">
              <img
                src={doctorAsset.url}
                alt="Dr. Saad Sarfraz, Chief Physiotherapist at LiveFit Physiotherapy, Islamabad"
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
                    <p className="text-sm font-semibold text-charcoal">Spine &amp; Sports Focus</p>
                    <p className="mt-0.5 text-xs text-muted-foreground">Professional Assessment</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* DOCTOR AUTHORITY */}
        <section id="doctor" className="border-y border-border bg-sand">
          <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:py-24">
            <div className="grid items-center gap-12 lg:grid-cols-[0.75fr_1.25fr] lg:gap-16">
              <img
                src={doctorAsset.url}
                alt="Dr. Saad Sarfraz, Chief Physiotherapist"
                width={1080}
                height={1440}
                loading="lazy"
                className="mx-auto aspect-[3/4] w-full max-w-md rounded-[2rem] object-cover object-top lg:mx-0"
              />
              <div>
                <Eyebrow>Meet Dr. Saad Sarfraz</Eyebrow>
                <h2 className="mt-6 font-display text-4xl leading-tight sm:text-5xl">Dr. Saad Sarfraz</h2>
                <p className="mt-3 text-base font-semibold text-primary">Chief Physiotherapist</p>
                <p className="mt-2 text-sm text-charcoal-soft">DPT (STMU) • MSPH (QAU) • COMT (UK) • CSMT (UK) • CKTP (USA)</p>
                <div className="mt-7 grid gap-5 sm:grid-cols-2">
                  <div className="rounded-2xl border border-border bg-card p-5">
                    <p className="eyebrow text-primary">Specialization</p>
                    <p className="mt-2 font-semibold text-charcoal">Spine &amp; Sports Physiotherapy</p>
                  </div>
                  <div className="rounded-2xl border border-border bg-card p-5">
                    <p className="eyebrow text-primary">Focus Areas</p>
                    <p className="mt-2 font-semibold text-charcoal">Disc Bulge • Sciatica • Chronic Back Pain</p>
                  </div>
                </div>
                <p className="mt-7 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
                  LiveFit starts with a professional assessment to understand your symptoms, movement and functional needs before treatment guidance is planned around you.
                </p>
                <a href={bookAssessmentHref} className={`${CALL_PRIMARY} mt-8`}>
                  <ClipboardList className="h-4 w-4" strokeWidth={2} />
                  BOOK WITH DR. SAAD
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* PATIENT PROBLEM */}
        <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:py-28">
          <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:gap-16">
            <div>
              <Eyebrow>Common back &amp; spine concerns</Eyebrow>
              <h2 className="mt-6 font-display text-4xl leading-tight sm:text-5xl">
                Is Back Pain Affecting Your Daily Life?
              </h2>
              <p className="mt-6 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">
                Persistent or recurring back and leg symptoms can make everyday movement harder. A professional assessment can help clarify what you are experiencing and guide the next step.
              </p>
              <a href={bookAssessmentHref} className={`${CALL_PRIMARY} mt-9`}>
                <ClipboardList className="h-4 w-4" strokeWidth={2} />
                GET YOUR ASSESSMENT
              </a>
            </div>
            <ul className="grid gap-3 sm:grid-cols-2 lg:content-start">
              {PROBLEMS.map((p) => (
                <li key={p} className="flex items-center gap-3 rounded-2xl border border-border bg-card px-5 py-4 text-sm text-charcoal">
                  <Check className="h-4 w-4 shrink-0 text-primary" strokeWidth={2.25} />
                  {p}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* SERVICES */}
        <section id="services" className="border-y border-border bg-sand">
          <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:py-28">
            <div className="max-w-2xl">
              <Eyebrow>Back, Spine &amp; Sports Services</Eyebrow>
              <h2 className="mt-6 font-display text-4xl leading-tight sm:text-5xl">Physiotherapy for the Problems You’re Facing</h2>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
                Start with an assessment so treatment guidance can be matched to your symptoms, movement and goals.
              </p>
            </div>

            <div className="mt-12 grid gap-6 lg:grid-cols-3">
              {SERVICES.map((s) => {
                const Icon = s.icon === "spine" ? Bone : s.icon === "sports" ? Dumbbell : Activity;
                return (
                  <article key={s.title} className="group flex flex-col rounded-3xl border border-border bg-card p-8 transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-[0_20px_44px_-24px_oklch(0.24_0.006_150_/_0.35)]">
                    <span className="grid h-12 w-12 place-items-center rounded-2xl bg-accent transition-colors group-hover:bg-primary">
                      <Icon className="h-5 w-5 text-primary transition-colors group-hover:text-primary-foreground" strokeWidth={1.75} />
                    </span>
                    <h3 className="mt-6 text-xl text-charcoal">{s.title}</h3>
                    <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">{s.body}</p>
                    <a href={bookAssessmentHref} className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-primary transition-colors hover:text-charcoal">
                      {s.cta}
                      <ArrowRight className="h-4 w-4" strokeWidth={2} />
                    </a>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        {/* ASSESSMENT OFFER */}
        <section id="assessment" className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:py-28">
          <div className="overflow-hidden rounded-[2rem] border border-border bg-card shadow-[0_24px_60px_-34px_oklch(0.24_0.006_150_/_0.35)]">
            <div className="grid gap-10 p-8 sm:p-10 lg:grid-cols-[1fr_auto] lg:items-center lg:p-14">
              <div>
                <Eyebrow>PHYSIOTHERAPY ASSESSMENT</Eyebrow>
                <h2 className="mt-6 max-w-3xl font-display text-4xl leading-tight sm:text-5xl">Start With a Professional Physiotherapy Assessment</h2>
                <ul className="mt-8 grid gap-3 sm:grid-cols-2">
                  {[
                    "Initial assessment",
                    "Understanding your symptoms",
                    "Movement/function evaluation",
                    "Personalized treatment guidance",
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-3 text-sm text-charcoal">
                      <Check className="h-4 w-4 shrink-0 text-primary" strokeWidth={2.25} />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-3xl border border-border bg-sand p-7 text-center sm:p-9 lg:min-w-[260px]">
                <p className="eyebrow text-primary">ASSESSMENT FEE</p>
                <p className="mt-3 font-display text-5xl leading-none text-charcoal sm:text-6xl">{ASSESSMENT_PRICE}</p>
                <a href={PHONE_TEL} onClick={trackPhoneConversion} className={`${CALL_PRIMARY} mt-7 w-full`}>
                  <Phone className="h-4 w-4" strokeWidth={2} />
                  BOOK MY ASSESSMENT
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ABOUT / CLINIC */}
        <section id="about" className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:py-28">
          <div className="grid items-center gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16">
            <img src={consultAsset.url} alt="Consultation with the physiotherapist at LiveFit Physiotherapy, Islamabad" width={1200} height={1200} loading="lazy" className="aspect-square w-full rounded-[2rem] object-cover" />
            <div>
              <Eyebrow>About LiveFit</Eyebrow>
              <h2 className="mt-6 font-display text-4xl leading-tight sm:text-5xl">Physiotherapy That Focuses on You</h2>
              <p className="mt-6 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">
                LiveFit Physiotherapy combines professional assessment with individualized treatment guidance focused on symptoms, function and movement goals.
              </p>
              <a href={bookAssessmentHref} className={`${CALL_PRIMARY} mt-9`}>
                <ClipboardList className="h-4 w-4" strokeWidth={2} />
                BOOK YOUR ASSESSMENT
              </a>
            </div>
          </div>
        </section>

        {/* INSIDE THE CLINIC */}
        <section className="border-t border-border bg-sand">
          <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:py-24">
            <div className="max-w-2xl">
              <Eyebrow>Inside the Clinic</Eyebrow>
              <h2 className="mt-6 font-display text-4xl leading-tight sm:text-5xl">A Professional Clinical Environment</h2>
            </div>
            <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {[
                { src: assessmentAsset.url, alt: "Physiotherapy assessment at LiveFit Physiotherapy, Islamabad" },
                { src: treatmentAsset.url, alt: "Physiotherapy treatment session at LiveFit Physiotherapy" },
                { src: mobilityAsset.url, alt: "Mobility session at LiveFit Physiotherapy" },
                { src: frontAsset.url, alt: "LiveFit Physiotherapy clinic signboard in Islamabad" },
              ].map((img) => (
                <img key={img.src} src={img.src} alt={img.alt} loading="lazy" className="aspect-[3/4] w-full rounded-[1.5rem] object-cover shadow-[0_18px_40px_-24px_oklch(0.24_0.006_150_/_0.35)]" />
              ))}
            </div>
          </div>
        </section>

        {/* WHY LIVEFIT */}
        <section id="why" className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:py-28">
          <div className="max-w-2xl">
            <Eyebrow>Why LiveFit</Eyebrow>
            <h2 className="mt-6 font-display text-4xl leading-tight sm:text-5xl">Why Choose LiveFit Physiotherapy?</h2>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {WHY.map((item) => (
              <div key={item.title} className="rounded-3xl border border-border bg-card p-8 transition-colors hover:border-primary/40">
                <span className="grid h-11 w-11 place-items-center rounded-full bg-accent">
                  <Check className="h-5 w-5 text-primary" strokeWidth={2} />
                </span>
                <h3 className="mt-6 text-xl text-charcoal">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{item.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section className="border-y border-border bg-sand">
          <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:py-28">
            <div className="max-w-2xl">
              <Eyebrow>How it works</Eyebrow>
              <h2 className="mt-6 font-display text-4xl leading-tight sm:text-5xl">Your Treatment Starts With 3 Simple Steps</h2>
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

        {/* LOCATION */}
        <section id="contact" className="border-y border-border bg-sand">
          <div className="mx-auto grid max-w-7xl gap-12 px-5 py-20 sm:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16 lg:py-28">
            <div>
              <Eyebrow>Location</Eyebrow>
              <h2 className="mt-6 font-display text-4xl leading-tight sm:text-5xl">Visit LiveFit Physiotherapy in Islamabad</h2>
              <div className="mt-10 space-y-6 rounded-3xl border border-border bg-card p-8">
                <div className="flex gap-4"><MapPin className="mt-0.5 h-5 w-5 shrink-0 text-primary" strokeWidth={1.75} /><p className="text-sm text-charcoal">{ADDRESS}</p></div>
                <div className="flex gap-4"><Phone className="mt-0.5 h-5 w-5 shrink-0 text-primary" strokeWidth={1.75} /><a href={PHONE_TEL} onClick={trackPhoneConversion} className="text-sm font-semibold text-charcoal hover:text-primary">{PHONE_DISPLAY}</a></div>
                <div className="flex gap-4"><Clock className="mt-0.5 h-5 w-5 shrink-0 text-primary" strokeWidth={1.75} /><p className="text-sm text-charcoal">Monday–Saturday: 12 PM–8 PM<span className="mt-1 block text-muted-foreground">Sunday: Closed</span></p></div>
                <div className="flex flex-col gap-3 border-t border-border pt-6 sm:flex-row">
                  <a href={PHONE_TEL} onClick={trackPhoneConversion} className={`${CALL_PRIMARY} flex-1`}><Phone className="h-4 w-4" strokeWidth={2} />Call Now</a>
                  <a href={MAPS_URL} target="_blank" rel="noreferrer" className={`${CALL_SECONDARY} flex-1`}><Navigation className="h-4 w-4" strokeWidth={2} />Get Directions</a>
                </div>
              </div>
            </div>
            <div className="overflow-hidden rounded-[2rem] border border-border bg-card">
              <iframe
                title="LiveFit Physiotherapy location map — Suite # LG-04, Pakland Trade Centre, F-7 Markaz, Islamabad"
                src="https://www.google.com/maps?q=Suite%23%20LG-04%2C%20Pakland%20Trade%20Centre%2C%20F7%20Markaz%2C%20Islamabad&output=embed"
                loading="lazy"
                className="h-[380px] w-full lg:h-full lg:min-h-[520px]"
                style={{ border: 0 }}
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </section>

        {/* FINAL CTA */}
        <section className="bg-charcoal">
          <div className="mx-auto grid max-w-7xl gap-10 px-5 py-20 sm:px-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:py-24">
            <div>
              <h2 className="font-display text-4xl leading-tight text-background sm:text-5xl">Ready to Take the Next Step?</h2>
              <p className="mt-5 max-w-xl text-sm leading-relaxed text-background/70 sm:text-base">Start with a professional physiotherapy assessment at LiveFit.</p>
            </div>
            <div className="lg:justify-self-end">
              <a href={bookAssessmentHref} className="flex w-full items-center justify-center gap-2.5 rounded-full bg-primary px-8 py-5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-background hover:text-charcoal sm:w-auto">
                <ClipboardList className="h-4 w-4" strokeWidth={2} />
                BOOK YOUR ASSESSMENT — {ASSESSMENT_PRICE}
              </a>
              <a href={PHONE_TEL} onClick={trackPhoneConversion} className="mt-3 inline-flex w-full items-center justify-center gap-2.5 rounded-full border border-background/30 px-8 py-4 text-sm font-semibold text-background transition-colors hover:bg-background hover:text-charcoal sm:w-auto">
                <Phone className="h-4 w-4" strokeWidth={2} />
                CALL {PHONE_DISPLAY}
              </a>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="mx-auto max-w-4xl px-5 py-20 sm:px-8 lg:py-28">
          <Eyebrow>FAQs</Eyebrow>
          <h2 className="mt-6 font-display text-4xl leading-tight sm:text-5xl">Frequently Asked Questions</h2>
          <Accordion type="single" collapsible className="mt-10 border-t border-border">
            {FAQS.map((faq) => (
              <AccordionItem key={faq.q} value={faq.q} className="border-b border-border">
                <AccordionTrigger className="py-5 text-left text-base text-charcoal hover:no-underline sm:text-lg">{faq.q}</AccordionTrigger>
                <AccordionContent className="pb-6 text-sm leading-relaxed text-muted-foreground">{faq.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </section>

        {/* FOOTER */}
        <footer className="border-t border-border bg-sand">
          <div className="mx-auto grid max-w-7xl gap-12 px-5 py-16 sm:px-8 lg:grid-cols-[1.3fr_0.8fr_1fr]">
            <div>
              <div className="flex items-center gap-3">
                <img src={logo.url} alt="LiveFit Physiotherapy logo" width={44} height={44} loading="lazy" className="h-11 w-11 rounded-sm object-cover mix-blend-multiply" />
                <span><span className="block font-display text-xl leading-none">LiveFit</span><span className="eyebrow mt-1 block text-[0.6rem] text-muted-foreground">Physiotherapy</span></span>
              </div>
              <p className="mt-6 max-w-sm text-sm leading-relaxed text-muted-foreground">Spine-focused physiotherapy in Islamabad for back pain, sciatica, disc-related symptoms, rehabilitation and sports injuries.</p>
            </div>
            <div>
              <p className="eyebrow text-charcoal">Quick Links</p>
              <ul className="mt-5 space-y-3 text-sm text-muted-foreground">
                {[{ label: "Home", href: "#top" }, { label: "Dr. Saad", href: "#doctor" }, { label: "Services", href: "#services" }, { label: "Assessment", href: "#assessment" }, { label: "Why LiveFit", href: "#why" }, { label: "Contact", href: "#contact" }].map((l) => <li key={l.href}><a href={l.href} className="transition-colors hover:text-primary">{l.label}</a></li>)}
              </ul>
            </div>
            <div>
              <p className="eyebrow text-charcoal">Contact</p>
              <ul className="mt-5 space-y-3 text-sm text-muted-foreground">
                <li>{ADDRESS}</li>
                <li><a href={PHONE_TEL} onClick={trackPhoneConversion} className="font-semibold text-charcoal hover:text-primary">{PHONE_DISPLAY}</a></li>
                <li>Monday–Saturday • 12 PM–8 PM</li>
              </ul>
              <a href={PHONE_TEL} onClick={trackPhoneConversion} className={`${CALL_PRIMARY} mt-6`}><Phone className="h-4 w-4" strokeWidth={2} />Call Now</a>
            </div>
          </div>
          <div className="mx-auto max-w-7xl border-t border-border px-5 py-6 text-xs text-muted-foreground sm:px-8"><p>© 2026 LiveFit Physiotherapy. All Rights Reserved.</p></div>
        </footer>
      </main>

      {/* MOBILE STICKY CTA */}
      <div className="fixed inset-x-0 bottom-0 z-50 grid grid-cols-2 gap-2 border-t border-border bg-card p-3 shadow-[0_-8px_24px_-16px_oklch(0.24_0.006_150_/_0.4)] lg:hidden">
        <a href={PHONE_TEL} onClick={trackPhoneConversion} className="flex items-center justify-center gap-2 rounded-full border border-charcoal/20 bg-background py-3.5 text-sm font-semibold text-charcoal"><Phone className="h-4 w-4" strokeWidth={2} />CALL NOW</a>
        <a href={bookAssessmentHref} className="flex items-center justify-center gap-2 rounded-full bg-primary py-3.5 text-sm font-semibold text-primary-foreground"><ClipboardList className="h-4 w-4" strokeWidth={2} />BOOK ASSESSMENT</a>
      </div>
    </div>
  );
}

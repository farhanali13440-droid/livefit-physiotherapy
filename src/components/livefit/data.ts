export const PHONE_DISPLAY = "0332 3337337";
export const PHONE_TEL = "tel:+923323337337";
export const WHATSAPP_BASE = "https://wa.me/923323337337?text=";
export const WHATSAPP =
  WHATSAPP_BASE + encodeURIComponent("I want an appointment for physiotherapy WB.");
export const ADDRESS = "Suite# LG-04, Pakland Trade Centre, F-7 Markaz, Islamabad";
export const CONSULT_PRICE = "PKR 1,499";
export const SITE_URL = "https://livefitphysiotherapy.com";

export const DOCTOR = {
  name: "Dr. Saad Sarfraz",
  role: "Chief Physiotherapist",
  quals: ["DPT (STMU)", "MSPH (QAU)", "COMT (UK)", "CSMT (UK)", "CKTP (USA)"],
  focus: "Specialized in Spine & Sports Physiotherapy",
  conditions: "Disc Bulge • Sciatica • Chronic Back Pain",
};

/**
 * TODO: replace with the clinic's official Google Business Profile / Maps URL.
 */
export const MAPS_URL =
  "https://www.google.com/maps/search/?api=1&query=Suite%23+LG-04%2C+Pakland+Trade+Centre%2C+F7+Markaz%2C+Islamabad";
export const DIRECTIONS = MAPS_URL;
export const GOOGLE_REVIEWS = MAPS_URL;

export const NAV = [
  { label: "Home", href: "#top" },
  { label: "Your Physiotherapist", href: "#doctor" },
  { label: "Conditions", href: "#conditions" },
  { label: "Consultation", href: "#offer" },
  { label: "Location", href: "#contact" },
];

export const HERO_TRUST = [
  "Personalized Assessment",
  "Spine & Sports Physiotherapy",
  "F-7 Markaz, Islamabad",
];

export const PROBLEMS = [
  "Pain from the lower back into the leg",
  "Difficulty sitting, standing or walking",
  "Back stiffness or restricted movement",
  "Recurring pain affecting daily activities",
];

export const CONDITIONS_TREATED = [
  {
    title: "Sciatica",
    body: "Assessment and physiotherapy for nerve-related pain travelling from the lower back into the leg.",
    icon: "spine",
  },
  {
    title: "Disc Bulge",
    body: "Movement-based rehabilitation and manual therapy planned around your assessment findings.",
    icon: "activity",
  },
  {
    title: "Chronic Back Pain",
    body: "A structured plan to reduce pain, restore mobility and rebuild strength over time.",
    icon: "heart",
  },
  {
    title: "Neck & Spine Problems",
    body: "Care for neck pain, stiffness and posture-related spine complaints.",
    icon: "bone",
  },
] as const;

export const WHY = [
  {
    title: "Experienced Physiotherapist",
    body: "You are assessed by Dr. Saad Sarfraz, Chief Physiotherapist, with advanced manual and sports therapy training.",
  },
  {
    title: "Personalized Treatment",
    body: "Your plan is built around your assessment, your condition and your daily movement goals.",
  },
  {
    title: "Spine & Sports Focus",
    body: "Focused experience in sciatica, disc-related pain, back pain and sports rehabilitation.",
  },
  {
    title: "Convenient Islamabad Location",
    body: "Suite# LG-04, Pakland Trade Centre, F-7 Markaz — easy to reach from across Islamabad.",
  },
];

export const CONSULT_INCLUDES = [
  "Initial assessment",
  "Understanding your condition",
  "Movement / function evaluation",
  "Personalized treatment guidance",
];

export const STEPS = [
  {
    n: "01",
    title: "Book Your Assessment",
    body: "Call or send a booking request and we confirm a time that works for you.",
  },
  {
    n: "02",
    title: "Get Assessed",
    body: "Dr. Saad reviews your history, movement and pain to understand what is driving your symptoms.",
  },
  {
    n: "03",
    title: "Get Your Treatment Plan",
    body: "You leave with a clear, personalized physiotherapy plan and next steps for your recovery.",
  },
];

export const FAQS = [
  {
    q: "Do I need an appointment?",
    a: "Yes, appointments are recommended so your assessment time is reserved. Call 0332 3337337 or send a booking request and our team will confirm availability.",
  },
  {
    q: "Do you treat sciatica?",
    a: "Yes. Sciatica is one of our main focus areas. Treatment begins with an assessment to understand your symptoms and movement limitations, followed by a personalized physiotherapy plan.",
  },
  {
    q: "Do you treat disc bulge?",
    a: "Yes. Physiotherapy for disc-related pain is a core part of our spine care. Your plan is based on your assessment findings, any imaging you already have and your day-to-day goals.",
  },
  {
    q: "Who will assess me?",
    a: "Dr. Saad Sarfraz, Chief Physiotherapist at LiveFit — DPT (STMU), MSPH (QAU), COMT (UK), CSMT (UK), CKTP (USA), specialized in spine and sports physiotherapy.",
  },
  {
    q: "Where is LiveFit located?",
    a: "Suite# LG-04, Pakland Trade Centre, F-7 Markaz, Islamabad. Parking and public transport access are available nearby.",
  },
  {
    q: "How much is the consultation?",
    a: "The physiotherapy consultation is PKR 1,499. It includes your initial assessment, movement evaluation and personalized treatment guidance.",
  },
];

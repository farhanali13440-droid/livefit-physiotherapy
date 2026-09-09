export const PHONE_DISPLAY = "0332 3337337";
export const PHONE_TEL = "tel:+923323337337";
export const WHATSAPP = "https://wa.me/923323337337?text=" + encodeURIComponent("I want an appointment for physiotherapy WB.");
export const ADDRESS = "Suite# LG-04, Pakland Trade Centre, F7 Markaz, Islamabad";
export const MAPS_URL = "https://www.google.com/maps/search/?api=1&query=Suite%23+LG-04%2C+Pakland+Trade+Centre%2C+F7+Markaz%2C+Islamabad";
export const DIRECTIONS = MAPS_URL;
export const GOOGLE_REVIEWS = MAPS_URL;

export const NAV = [
  { label: "Home", href: "#top" },
  { label: "About Dr. Saad", href: "#about" },
  { label: "Conditions", href: "#conditions" },
  { label: "Services", href: "#services" },
  { label: "Reviews", href: "#reviews" },
  { label: "Contact", href: "#contact" },
];

export const TRUST_STRIP = [
  { title: "Spine-Focused Physiotherapy", icon: "stethoscope" },
  { title: "Personalized Assessment", icon: "clipboard" },
  { title: "Professional Care", icon: "activity" },
  { title: "Convenient Islamabad Location", icon: "pin" },
] as const;

export const SERVICES = [
  { title: "Neck Pain & Stiffness", body: "Personalized physiotherapy for neck pain, stiffness and movement limitations.", cta: "Learn More", icon: "spine" },
  { title: "Sports Injury Rehabilitation", body: "Structured rehabilitation to support recovery, restore function and return to activity safely.", cta: "Learn More", icon: "sports" },
  { title: "Joint Pain & Mobility", body: "Assessment-led care to support joint mobility, strength and everyday movement.", cta: "Learn More", icon: "joint" },
  { title: "Muscle & Soft Tissue Injuries", body: "Individualized treatment and rehabilitation for muscle and soft tissue problems.", cta: "Learn More", icon: "spine" },
  { title: "Post-Injury Rehabilitation", body: "Progressive rehabilitation designed around your injury, movement and functional goals.", cta: "Learn More", icon: "activity" },
  { title: "Movement & Functional Rehabilitation", body: "Focused physiotherapy to improve movement, strength and confidence with everyday activity.", cta: "Learn More", icon: "activity" },
] as const;

export const PROBLEMS = ["Lower back pain", "Pain affecting movement", "Back & leg symptoms", "Recurring back problems", "Mobility limitations"];

export const STEPS = [
  { n: "01", title: "BOOK", body: "Choose your appointment time." },
  { n: "02", title: "ASSESS", body: "Dr. Saad evaluates your symptoms, movement and functional limitations." },
  { n: "03", title: "PLAN", body: "Get personalized treatment and rehabilitation guidance." },
];

export const WHY = [
  { title: "Personalised Care", body: "Your assessment and treatment guidance are built around your symptoms, movement and goals." },
  { title: "Spine & Sports Focus", body: "LiveFit focuses on spine-related concerns and sports injury rehabilitation." },
  { title: "Professional Assessment", body: "Your first step is a structured assessment before treatment is planned." },
  { title: "Convenient Location", body: "Located in F-7 Markaz, Islamabad at Pakland Trade Centre." },
];

export const CONDITIONS = ["Back Pain", "Sciatica", "Disc Bulge", "Slip Disc", "Spine Problems", "Sports Injuries"];

export const FAQS = [
  { q: "Do you provide physiotherapy for back pain?", a: "Yes. LiveFit provides assessment and physiotherapy for back pain, including lower back pain, stiffness and movement limitations." },
  { q: "Do you treat sciatica?", a: "Yes. Sciatica-related symptoms can be assessed and managed with a treatment plan based on your symptoms and movement findings." },
  { q: "Do you provide physiotherapy for disc bulge?", a: "Yes. LiveFit provides physiotherapy for people experiencing symptoms associated with a disc bulge, following an individual assessment." },
  { q: "Do you treat slip disc problems?", a: "Yes. Treatment is planned around your symptoms, mobility and functional limitations after assessment." },
  { q: "Who will assess me?", a: "Your assessment is with Dr. Saad Sarfraz, Chief Physiotherapist, with a focus on Spine & Sports Physiotherapy." },
  { q: "How much does the assessment cost?", a: "The physiotherapy assessment is PKR 1,499." },
  { q: "Where is LiveFit located?", a: "LiveFit Physiotherapy is located at Suite # LG-04, Pakland Trade Centre, F-7 Markaz, Islamabad." },
  { q: "Do I need an appointment?", a: "Yes. Please call 0332 3337337 to confirm availability and book your assessment." },
];

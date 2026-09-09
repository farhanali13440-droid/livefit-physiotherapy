export const PHONE_DISPLAY = "0332 3337337";
export const PHONE_TEL = "tel:+923323337337";
export const WHATSAPP_MESSAGE = "Hello LiveFit Physiotherapy, I would like to book a physiotherapy appointment. Please share the available appointment times.";
export const WHATSAPP = "https://wa.me/923323337337?text=" + encodeURIComponent(WHATSAPP_MESSAGE);
export const ADDRESS = "Suite # LG-04, Pakland Trade Centre, F-7 Markaz, Islamabad";
export const MAPS_URL = "https://www.google.com/maps/search/?api=1&query=Suite%23+LG-04%2C+Pakland+Trade+Centre%2C+F-7+Markaz%2C+Islamabad";
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
  { title: "Neck Pain", body: "Personalized physiotherapy for neck pain, stiffness and movement limitations.", cta: "Learn More", icon: "spine" },
  { title: "Sports Injuries", body: "Structured rehabilitation to support recovery, restore function and return to activity safely.", cta: "Learn More", icon: "sports" },
  { title: "Joint Pain", body: "Assessment-led care to support joint mobility, strength and everyday movement.", cta: "Learn More", icon: "joint" },
  { title: "Muscle Injuries", body: "Individualized treatment and rehabilitation for muscle and soft tissue problems.", cta: "Learn More", icon: "spine" },
  { title: "Post-Injury Rehabilitation", body: "Progressive rehabilitation designed around your injury, movement and functional goals.", cta: "Learn More", icon: "activity" },
  { title: "Mobility & Function", body: "Focused physiotherapy to improve movement, strength and confidence with everyday activity.", cta: "Learn More", icon: "activity" },
] as const;
export const PROBLEMS = ["Lower back pain", "Pain affecting movement", "Back & leg symptoms", "Recurring back problems", "Mobility limitations"];
export const STEPS = [
  { n: "01", title: "Book", body: "Choose your appointment time." },
  { n: "02", title: "Assess", body: "Dr. Saad evaluates your symptoms, movement and functional limitations." },
  { n: "03", title: "Plan", body: "Get personalized treatment and rehabilitation guidance." },
  { n: "04", title: "Rehabilitate", body: "Follow a progressive plan built around your goals and recovery." },
];
export const WHY = [
  { title: "Personalized Assessment", body: "Your assessment starts with understanding your symptoms, movement and needs." },
  { title: "Spine & Sports Focus", body: "A focused clinical approach for spine-related problems and sports rehabilitation." },
  { title: "Individualized Rehabilitation", body: "Treatment guidance is shaped around your condition and functional goals." },
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
  { q: "Do I need an appointment?", a: "Yes. Please call 0332 3337337 or message LiveFit on WhatsApp to confirm availability and book your assessment." },
];

export const PHONE_DISPLAY = "0332 3337337";
export const PHONE_TEL = "tel:+923323337337";
export const WHATSAPP_MESSAGE = "Hello LiveFit Physiotherapy, I would like to book a physiotherapy appointment. Please share the available appointment times.";
export const WHATSAPP = "https://wa.me/923323337337?text=" + encodeURIComponent(WHATSAPP_MESSAGE);
export const ADDRESS = "Suite # LG-04, Pakland Trade Centre, F-7 Markaz, Islamabad";
export const MAPS_URL = "https://www.google.com/maps/search/?api=1&query=Suite%23+LG-04%2C+Pakland+Trade+Centre%2C+F-7+Markaz%2C+Islamabad";
export const DIRECTIONS = MAPS_URL;
export const GOOGLE_REVIEWS = MAPS_URL;
export const NAV = [
  { label: "Home", href: "/" },
  { label: "Other Services", href: "/other-services" },
  { label: "Dr. Saad", href: "/about-dr-saad" },
  { label: "Reviews", href: "/reviews" },
  { label: "Contact / Book", href: "/book-assessment" },
] as const;
export const SERVICES = [
  { title: "Sports Physiotherapy", body: "Assessment-led rehabilitation for sports injuries, movement limitations and return to activity.", cta: "Learn More", icon: "sports" },
  { title: "Sports Injury Rehabilitation", body: "Structured rehabilitation built around the injury, movement and functional goals.", cta: "Learn More", icon: "sports" },
  { title: "Neck Pain", body: "Personalized physiotherapy for neck pain, stiffness and movement limitations.", cta: "Learn More", icon: "spine" },
  { title: "Joint Pain", body: "Assessment-led care to support joint mobility, strength and everyday movement.", cta: "Learn More", icon: "joint" },
  { title: "Mobility Rehabilitation", body: "Focused physiotherapy to improve movement, strength and everyday function.", cta: "Learn More", icon: "activity" },
  { title: "Musculoskeletal Physiotherapy", body: "Individualized assessment and rehabilitation for muscles, joints and movement-related problems.", cta: "Learn More", icon: "activity" },
] as const;
export const PROBLEMS = ["Back Pain", "Sciatica", "Disc Bulge / Slip Disc"];
export const STEPS = [
  { n: "01", title: "Understand Your Symptoms", body: "Start by discussing your symptoms, history and functional concerns." },
  { n: "02", title: "Assess Movement & Function", body: "Dr. Saad assesses relevant movement and functional findings." },
  { n: "03", title: "Identify Relevant Clinical Findings", body: "Understand the findings that may be relevant to your symptoms." },
  { n: "04", title: "Build a Personalized Treatment Plan", body: "Receive treatment and rehabilitation guidance based on your assessment." },
];
export const WHY = [
  { title: "Personalized Assessment", body: "Start with your symptoms, movement and individual needs." },
  { title: "Spine-Focused Physiotherapy", body: "A focused approach for back and spine-related problems." },
  { title: "Patient-Centered Care", body: "Clear communication and care built around the individual patient." },
  { title: "Evidence-Informed Approach", body: "Clinical decisions are informed by assessment and relevant evidence." },
];
export const CONDITIONS = ["Back Pain", "Sciatica", "Disc Bulge / Slip Disc"];
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

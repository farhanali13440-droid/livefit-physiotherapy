export const PHONE_DISPLAY = "0332 3337337";
export const PHONE_TEL = "tel:+923323337337";
export const WHATSAPP =
  "https://wa.me/923323337337?text=" +
  encodeURIComponent("I want an appointment for physiotherapy WB.");
export const ADDRESS = "Suite# LG-04, Pakland Trade Centre, F7 Markaz, Islamabad";
export const MAPS_URL =
  "https://www.google.com/maps/search/?api=1&query=Suite%23+LG-04%2C+Pakland+Trade+Centre%2C+F7+Markaz%2C+Islamabad";
export const DIRECTIONS = MAPS_URL;
export const GOOGLE_REVIEWS = MAPS_URL;

export const NAV = [
  { label: "Home", href: "#top" },
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Why LiveFit", href: "#why" },
  { label: "Contact", href: "#contact" },
];

export const TRUST_STRIP = [
  { title: "Spine-Focused Physiotherapy", icon: "stethoscope" },
  { title: "Personalized Assessment", icon: "clipboard" },
  { title: "Professional Care", icon: "activity" },
  { title: "Convenient Islamabad Location", icon: "pin" },
] as const;

export const SERVICES = [
  {
    title: "Back Pain Physiotherapy",
    body: "Assessment and treatment to help manage lower back pain, stiffness and movement limitations.",
    cta: "Book an Assessment",
    icon: "spine",
  },
  {
    title: "Sciatica Physiotherapy",
    body: "Physiotherapy focused on symptoms affecting the lower back, hip and leg, based on your assessment.",
    cta: "Book an Assessment",
    icon: "spine",
  },
  {
    title: "Disc Bulge Physiotherapy",
    body: "A structured approach to pain, mobility and function for people experiencing symptoms associated with a disc bulge.",
    cta: "Book an Assessment",
    icon: "spine",
  },
  {
    title: "Slip Disc Physiotherapy",
    body: "Personalized rehabilitation based on your symptoms, movement and functional limitations.",
    cta: "Book an Assessment",
    icon: "spine",
  },
  {
    title: "Spine Rehabilitation",
    body: "Progressive physiotherapy to improve movement, strength and confidence with everyday activity.",
    cta: "Book an Assessment",
    icon: "spine",
  },
  {
    title: "Sports Injury Rehabilitation",
    body: "Structured rehabilitation to support recovery, restore function and help you return to activity safely.",
    cta: "Book an Assessment",
    icon: "sports",
  },
] as const;

export const PROBLEMS = [
  "Lower back pain",
  "Pain affecting movement",
  "Back & leg symptoms",
  "Recurring back problems",
  "Mobility limitations",
];

export const STEPS = [
  {
    n: "01",
    title: "BOOK YOUR ASSESSMENT",
    body: "Choose your assessment at LiveFit and arrange a convenient appointment time.",
  },
  {
    n: "02",
    title: "GET PROFESSIONALLY ASSESSED",
    body: "Dr. Saad Sarfraz reviews your symptoms, movement and functional needs.",
  },
  {
    n: "03",
    title: "RECEIVE YOUR PERSONALIZED PLAN",
    body: "Get clear treatment guidance based on your assessment and goals.",
  },
];

export const WHY = [
  {
    title: "Personalised Care",
    body: "Your assessment and treatment guidance are built around your symptoms, movement and goals.",
  },
  {
    title: "Spine & Sports Focus",
    body: "LiveFit focuses on spine-related concerns and sports injury rehabilitation.",
  },
  {
    title: "Professional Assessment",
    body: "Your first step is a structured assessment before treatment is planned.",
  },
  {
    title: "Convenient Location",
    body: "Located in F-7 Markaz, Islamabad at Pakland Trade Centre.",
  },
];

export const CONDITIONS = [
  "Back Pain",
  "Sciatica",
  "Disc Bulge",
  "Slip Disc",
  "Spine Problems",
  "Sports Injuries",
];

export const FAQS = [
  {
    q: "Do you provide physiotherapy for back pain?",
    a: "Yes. LiveFit provides assessment and physiotherapy for back pain, including lower back pain, stiffness and movement limitations.",
  },
  {
    q: "Do you treat sciatica?",
    a: "Yes. Sciatica-related symptoms can be assessed and managed with a treatment plan based on your symptoms and movement findings.",
  },
  {
    q: "Do you provide physiotherapy for disc bulge?",
    a: "Yes. LiveFit provides physiotherapy for people experiencing symptoms associated with a disc bulge, following an individual assessment.",
  },
  {
    q: "Do you treat slip disc problems?",
    a: "Yes. Treatment is planned around your symptoms, mobility and functional limitations after assessment.",
  },
  {
    q: "Who will assess me at LiveFit?",
    a: "Your assessment is with Dr. Saad Sarfraz, Chief Physiotherapist, with a focus on Spine & Sports Physiotherapy.",
  },
  {
    q: "How much is the physiotherapy assessment?",
    a: "The physiotherapy assessment is PKR 1,499.",
  },
  {
    q: "Where is LiveFit Physiotherapy located?",
    a: "LiveFit Physiotherapy is located at Suite # LG-04, Pakland Trade Centre, F-7 Markaz, Islamabad.",
  },
  {
    q: "Do I need an appointment?",
    a: "Yes. Please call 0332 3337337 to confirm availability and book your assessment.",
  },
];

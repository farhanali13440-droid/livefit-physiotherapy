export const PHONE_DISPLAY = "0332 3337337";
export const PHONE_TEL = "tel:+923323337337";
export const WHATSAPP =
  "https://wa.me/923323337337?text=" +
  encodeURIComponent("I want an appointment for physiotherapy WB.");
export const ADDRESS = "F-7 Markaz, F-7 Markaz, Islamabad, 44210";

/**
 * TODO: replace with the clinic's official Google Business Profile / Maps URL.
 * Currently a generic Maps search for the clinic address.
 */
export const MAPS_URL =
  "https://www.google.com/maps/search/?api=1&query=LiveFit+Physiotherapy+F-7+Markaz+Islamabad";
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
  { title: "Expert Physiotherapy Care", icon: "stethoscope" },
  { title: "Personalized Treatment Plans", icon: "clipboard" },
  { title: "Evidence-Based Techniques", icon: "activity" },
  { title: "Convenient Islamabad Location", icon: "pin" },
] as const;

export const SERVICES = [
  {
    title: "Back & Neck Pain Treatment",
    body: "Targeted physiotherapy to help manage back pain, neck pain, stiffness and movement limitations.",
    cta: "Call About Back & Neck Pain",
    icon: "spine",
  },
  {
    title: "Sports Injury Rehabilitation",
    body: "Structured rehabilitation to help you recover from sports injuries and safely return to activity.",
    cta: "Call About Sports Rehabilitation",
    icon: "sports",
  },
  {
    title: "Joint Pain & Mobility Rehabilitation",
    body: "Personalized treatment to improve joint mobility, strength and everyday movement.",
    cta: "Call About Joint Pain",
    icon: "joint",
  },
] as const;

export const PROBLEMS = [
  "Back pain",
  "Neck pain",
  "Joint stiffness",
  "Sports injuries",
  "Muscle tightness",
  "Limited mobility",
  "Movement difficulties",
];

export const STEPS = [
  {
    n: "01",
    title: "Initial Assessment",
    body: "We assess your movement, pain, mobility and physical limitations to understand what is contributing to your problem.",
  },
  {
    n: "02",
    title: "Personalized Treatment Plan",
    body: "Based on your assessment, we create a treatment approach tailored to your specific condition and goals.",
  },
  {
    n: "03",
    title: "Recovery & Better Movement",
    body: "We work with you to improve mobility, strength and function so you can move with greater confidence.",
  },
];

export const WHY = [
  {
    title: "Personalized Care",
    body: "Your treatment is built around your individual condition and goals.",
  },
  {
    title: "Professional Approach",
    body: "Focused physiotherapy care using structured assessment and treatment techniques.",
  },
  {
    title: "Patient-Centered Treatment",
    body: "We take time to understand your concerns and explain your treatment approach.",
  },
  {
    title: "Convenient Islamabad Location",
    body: "Located in F-7 Markaz, Islamabad, making professional physiotherapy easy to access.",
  },
];

export const CONDITIONS = [
  "Back Pain",
  "Neck Pain",
  "Knee Pain",
  "Shoulder Pain",
  "Sciatica",
  "Joint Pain",
  "Sports Injuries",
  "Post-Surgical Recovery",
  "Stroke Rehabilitation",
  "Posture Problems",
  "Frozen Shoulder",
  "Muscle Tightness",
];

export const FAQS = [
  {
    q: "What conditions can physiotherapy help with?",
    a: "Physiotherapy is commonly used for back pain, neck pain, joint pain, sports injuries, post-surgical recovery, posture problems, muscle tightness and general mobility difficulties. During your assessment we discuss whether physiotherapy is suitable for your condition.",
  },
  {
    q: "Do I need an assessment before treatment?",
    a: "Yes. An initial assessment helps us understand your symptoms, movement and physical limitations so treatment can be planned around your specific needs rather than a general routine.",
  },
  {
    q: "How does a physiotherapy treatment plan work?",
    a: "After your assessment, we outline a treatment approach based on your condition and goals. This can include hands-on physiotherapy techniques, therapeutic exercise and progressive rehabilitation, reviewed as you improve.",
  },
  {
    q: "Can physiotherapy help with back and neck pain?",
    a: "Back and neck pain physiotherapy is one of our core services. Treatment focuses on your assessment findings, movement limitations and day-to-day functional goals.",
  },
  {
    q: "Can physiotherapy help with sports injuries?",
    a: "Yes. We provide sports injury rehabilitation, including strength and mobility work and structured return-to-activity planning appropriate to your injury and sport.",
  },
  {
    q: "How do I book an appointment at LiveFit?",
    a: "Call 0332 3337337 and our team will confirm availability and guide you through booking your appointment.",
  },
];

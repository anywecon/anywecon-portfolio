import type { Locale } from "./projects";

export const dict = {
  el: {
    nav: { work: "Έργα", contact: "Επικοινωνία" },
    hero: {
      role: "Freelance Developer · Πάτρα",
      line1: "Από την ιδέα στο",
      lineRotate: ["web apps", "mobile apps", "desktop apps"],
      line2: "έτοιμο για χρήση.",
      sub: "Custom websites & εφαρμογές για επιχειρήσεις. Offline-first, αδειοδοτημένες, παραδοτέες.",
      cta: "Δες τα έργα",
    },
    work: { eyebrow: "Επιλεγμένα έργα", title: "Τι έχω φτιάξει" },
    project: {
      problem: "Πρόβλημα",
      solution: "Λύση",
      role: "Ο ρόλος μου",
      stack: "Stack",
      live: "Live demo",
      spec: "Specs",
    },
    contact: {
      eyebrow: "Επικοινωνία",
      title: "Έχεις ένα project;",
      sub: "Στείλε μου τι χρειάζεσαι. Απαντάω γρήγορα.",
      email: "Στείλε email",
    },
    footer: "Φτιαγμένο με Next.js.",
  },
  en: {
    nav: { work: "Work", contact: "Contact" },
    hero: {
      role: "Freelance Developer · Patras, GR",
      line1: "From idea to",
      lineRotate: ["web apps", "mobile apps", "desktop apps"],
      line2: "ready to ship.",
      sub: "Custom websites & apps for businesses. Offline-first, licensed, delivered.",
      cta: "View work",
    },
    work: { eyebrow: "Selected work", title: "What I've built" },
    project: {
      problem: "Problem",
      solution: "Solution",
      role: "My role",
      stack: "Stack",
      live: "Live demo",
      spec: "Specs",
    },
    contact: {
      eyebrow: "Contact",
      title: "Got a project?",
      sub: "Tell me what you need. I reply fast.",
      email: "Send email",
    },
    footer: "Built with Next.js.",
  },
} as const;

export type Dict = (typeof dict)[Locale];

import type { Locale } from "./projects";

export const dict = {
  el: {
    nav: { work: "Έργα", oss: "Open source", contact: "Επικοινωνία" },
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
      store: "Google Play",
      spec: "Specs",
    },
    oss: {
      eyebrow: "Open source",
      title: "Ανοιχτός κώδικας",
      sub: "Δωρεάν εργαλεία που φτιάχνω και συντηρώ δημόσια. Offline-first, χωρίς λογαριασμούς και tracking.",
      source: "Κώδικας",
      site: "Ιστοσελίδα",
      updated: "Ενημέρωση",
      stars: "αστέρια",
      months: ["Ιαν", "Φεβ", "Μαρ", "Απρ", "Μάι", "Ιουν", "Ιουλ", "Αυγ", "Σεπ", "Οκτ", "Νοε", "Δεκ"],
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
    nav: { work: "Work", oss: "Open source", contact: "Contact" },
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
      store: "Google Play",
      spec: "Specs",
    },
    oss: {
      eyebrow: "Open source",
      title: "Built in the open",
      sub: "Free tools I build and maintain publicly. Offline-first, no accounts, no tracking.",
      source: "Source",
      site: "Website",
      updated: "Updated",
      stars: "stars",
      months: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
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

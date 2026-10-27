export type Locale = "el" | "en";

export interface ProjectSpec {
  label: { el: string; en: string };
  value: string;
}

export interface Project {
  slug: string;
  name: string;
  year: string;
  // number of screenshots expected in /public/shots/<slug>/01.png ...
  shots: number;
  // native screenshot ratio when it differs from the default 9:19.5 phone ratio
  shotAspect?: string;
  tagline: { el: string; en: string };
  problem: { el: string; en: string };
  solution: { el: string; en: string };
  role: { el: string; en: string };
  stack: string[];
  specs: ProjectSpec[];
  liveUrl?: string;
}

export const projects: Project[] = [
  {
    slug: "myshift",
    name: "MyShift",
    year: "2026",
    shots: 8,
    shotAspect: "9 / 16",
    tagline: {
      el: "Διαχείριση βαρδιών & μισθοδοσίας για την ελληνική αγορά.",
      en: "Shift & payroll management built for the Greek market.",
    },
    problem: {
      el: "Οι εργαζόμενοι και οι μικρές επιχειρήσεις δυσκολεύονται να υπολογίσουν βάρδιες, υπερωρίες και αμοιβές με βάση την ελληνική εργατική νομοθεσία.",
      en: "Workers and small businesses struggle to track shifts, overtime and pay under Greek labour rules.",
    },
    solution: {
      el: "Offline-first mobile app με τοπική βάση SQLite, υπολογισμό αμοιβών, δίγλωσσο UI και προαιρετικό cloud sync. 14 οθόνες, πλήρες test coverage.",
      en: "Offline-first mobile app with local SQLite, pay calculation, bilingual UI and optional cloud sync. 14 screens, full test coverage.",
    },
    role: {
      el: "Πλήρης σχεδιασμός, ανάπτυξη, testing και δημοσίευση στο Google Play.",
      en: "End-to-end design, development, testing and Google Play release.",
    },
    stack: ["Expo SDK 54", "React Native 0.81", "TypeScript", "Zustand", "SQLite", "Supabase", "i18next"],
    specs: [
      { label: { el: "Πλατφόρμα", en: "Platform" }, value: "Android" },
      { label: { el: "Build", en: "Build" }, value: "Local Gradle AAB" },
      { label: { el: "Tests", en: "Tests" }, value: "106 passing" },
      { label: { el: "Κατάσταση", en: "Status" }, value: "Play testing" },
    ],
  },
  {
    slug: "parousio",
    name: "Parousio",
    year: "2026",
    shots: 4,
    tagline: {
      el: "Offline kiosk για παρουσίες & βάρδιες προσωπικού.",
      en: "Offline kiosk for staff attendance & shifts.",
    },
    problem: {
      el: "Επιχειρήσεις χρειάζονται αξιόπιστη καταγραφή παρουσιών χωρίς εξάρτηση από internet ή ακριβά συστήματα.",
      en: "Businesses need reliable attendance tracking without relying on internet or costly systems.",
    },
    solution: {
      el: "Android kiosk app, 100% offline, με SQLite, PIN ανά εργαζόμενο και offline αδειοδότηση Ed25519. Καθαρό ασπρόμαυρο θέμα για ταμπλέτα.",
      en: "Android kiosk app, fully offline, with SQLite, per-employee PIN and Ed25519 offline licensing. Clean black/white tablet theme.",
    },
    role: {
      el: "Πλήρης ανάπτυξη, επίλυση production bugs, παράδοση v1.0.2.",
      en: "Full development, production bug fixing, shipped v1.0.2.",
    },
    stack: ["Expo SDK 55", "React Native", "TypeScript", "SQLite", "Ed25519"],
    specs: [
      { label: { el: "Πλατφόρμα", en: "Platform" }, value: "Android kiosk" },
      { label: { el: "Δίκτυο", en: "Network" }, value: "100% offline" },
      { label: { el: "Άδεια", en: "Licensing" }, value: "Ed25519 offline" },
      { label: { el: "Έκδοση", en: "Version" }, value: "v1.0.2" },
    ],
  },
  {
    slug: "kratiseis",
    name: "Κρατήσεις",
    year: "2026",
    shots: 13,
    tagline: {
      el: "Σύστημα κρατήσεων για ελληνικά εστιατόρια.",
      en: "Reservation system for Greek restaurants.",
    },
    problem: {
      el: "Μικρά εστιατόρια διαχειρίζονται κρατήσεις με τετράδια ή πρόχειρα εργαλεία, χωρίς δικό τους σύστημα.",
      en: "Small restaurants manage bookings on paper or ad-hoc tools, with no system of their own.",
    },
    solution: {
      el: "Per-customer Android app με build-time κλείδωμα πελάτη και offline αδειοδότηση Ed25519. Παραδόθηκε ως ξεχωριστά APK ανά εστιατόριο.",
      en: "Per-customer Android app with build-time customer lock and Ed25519 offline licensing. Delivered as separate APKs per restaurant.",
    },
    role: {
      el: "Σχεδιασμός αρχιτεκτονικής per-customer, ανάπτυξη, παράδοση v1.0.0.",
      en: "Per-customer architecture design, development, shipped v1.0.0.",
    },
    stack: ["Expo", "React Native", "TypeScript", "SQLite", "Ed25519"],
    specs: [
      { label: { el: "Πλατφόρμα", en: "Platform" }, value: "Android kiosk" },
      { label: { el: "Μοντέλο", en: "Model" }, value: "Per-customer APK" },
      { label: { el: "Άδεια", en: "Licensing" }, value: "Ed25519 offline" },
      { label: { el: "Έκδοση", en: "Version" }, value: "v1.0.0" },
    ],
  },
  {
    slug: "pame-parea",
    name: "Πάμε Παρέα",
    year: "2026",
    shots: 7,
    tagline: {
      el: "Party game στα ελληνικά — παίξε από το κινητό σου.",
      en: "A Greek party game — play from your phone.",
    },
    problem: {
      el: "Ελληνικές παρέες θέλουν party games τύπου Jackbox, αλλά σχεδόν όλα είναι μόνο στα αγγλικά και απαιτούν κονσόλα ή PC.",
      en: "Greek groups want Jackbox-style party games, but almost all are English-only and need a console or PC.",
    },
    solution: {
      el: "Web party game: ένας host ανοίγει δωμάτιο, οι παίκτες μπαίνουν με κωδικό από το κινητό. Realtime συγχρονισμός, ανώνυμη σύνδεση.",
      en: "Web party game: a host opens a room, players join by code from their phones. Realtime sync, anonymous auth.",
    },
    role: {
      el: "Σχεδιασμός game flow, realtime αρχιτεκτονική, ανάπτυξη (σε εξέλιξη).",
      en: "Game flow design, realtime architecture, development (in progress).",
    },
    stack: ["Next.js 14", "Supabase Realtime", "TypeScript", "Tailwind", "Vercel"],
    specs: [
      { label: { el: "Πλατφόρμα", en: "Platform" }, value: "Web" },
      { label: { el: "Realtime", en: "Realtime" }, value: "Supabase channels" },
      { label: { el: "Auth", en: "Auth" }, value: "Anonymous" },
      { label: { el: "Κατάσταση", en: "Status" }, value: "Beta" },
    ],
    liveUrl: "https://pameparea.vercel.app",
  },
];

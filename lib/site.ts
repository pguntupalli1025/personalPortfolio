export const SITE = {
  name: "Pranav",
  fullName: "Pranav Guntupalli",
  email: "pranavguntupalli10@gmail.com",
  secondaryEmail: "guntupalli.pr@northeastern.edu",
  githubUsername: "pguntupalli1025",
  githubUrl: "https://github.com/pguntupalli1025",
  linkedinUrl: "https://linkedin.com/in/pranav-guntupalli-pg1205",
  resumePath: "/resume.pdf",
} as const;

/** Tiny home splash quote — edit here */
export const HOME_QUOTE = "ship it, then make it better.";

export const ABOUT_BIO = `i'm pranav guntupalli, a third-year cs + ai student at northeastern university building intelligent systems that turn messy real-world problems into useful software. originally from new jersey, i'll be joining IBM as a forward deployed engineer co-op in fall 2026.`;

export interface InterestItem {
  id: string;
  title: string;
  body: string;
  imageSrc?: string;
  imageAlt?: string;
}

export const INTERESTS: InterestItem[] = [
  {
    id: "soccer",
    title: "soccer",
    body: "i've been in love with soccer since i was a kid. VISCA BARCA. messi is my GOAT.",
    imageSrc: "/interests/soccer.jpg",
    imageAlt: "pranav playing soccer",
  },
  {
    id: "snowboarding",
    title: "snowboarding",
    body: "new to it. spend most runs trying not to eat shit. somehow still want another day on the mountain.",
    imageSrc: "/interests/snowboarding.jpg",
    imageAlt: "snowboard on the mountain",
  },
  {
    id: "technology",
    title: "technology",
    body: "always testing new tools, upgrading the setup, and digging into how things actually work under the hood. hardware, software, whatever's next.",
    imageSrc: "/interests/technology.jpg",
    imageAlt: "desk setup with monitors and keyboard",
  },
];

export interface ExperienceEntry {
  role: string;
  company: string;
  dates: string;
  location?: string;
  notes: string[];
}

export const EXPERIENCE: ExperienceEntry[] = [
  {
    role: "incoming forward deployed engineer co-op",
    company: "IBM",
    dates: "fall 2026",
    location: "san jose, ca · hybrid",
    notes: ["incoming fall 2026."],
  },
  {
    role: "software engineering intern",
    company: "Raval Consulting Services",
    dates: "jun 2024 - jul 2025",
    location: "remote",
    notes: [
      "developed and maintained 5+ financial software features using rest apis and sql to improve data accuracy.",
      "engineered backend data pipelines to automate financial processing, reducing manual handling by ~30%.",
      "integrated third-party financial apis with relational databases and server-side business logic across systems.",
    ],
  },
  {
    role: "website management board",
    company: "Northeastern University SGA",
    dates: "sep 2024 - apr 2025",
    location: "boston, ma",
    notes: [
      "oversaw design, development, and maintenance of student government's official website serving 1,000+ students.",
      "architected a redesigned template across 10+ pages using html/css and javascript, improving ui consistency.",
      "enforced wcag accessibility standards and optimized site navigation to increase student engagement.",
      "coordinated with sga officers to deliver iterative updates, reducing content update turnaround by 40%.",
    ],
  },
  {
    role: "programming intern",
    company: "WINGS for Growth",
    dates: "apr 2023 - aug 2023",
    location: "remote",
    notes: [
      "refactored 3-5 core modules applying oop design patterns, improving code maintainability by 25%.",
      "collaborated with developers to redesign software architecture workflows, reducing debt and improving readability.",
      "integrated 3+ third-party apis into existing system architecture, extending platform functionality and data flow.",
    ],
  },
  {
    role: "delegate",
    company: "American Legion Jersey Boys State",
    dates: "jun 2023",
    location: "lawrence, nj · on-site",
    notes: [
      "chosen as a delegate to a statewide leadership conference simulating state-level government.",
      "elected to 4 leadership positions, notably county commissioner.",
    ],
  },
  {
    role: "mathematics tutor",
    company: "Doane Academy",
    dates: "oct 2021 - may 2022",
    location: "on-site · part-time",
    notes: [
      "taught students mathematics, logical basics, and puzzles.",
      "helped students from underserved communities build technology awareness and soft skills.",
    ],
  },
  {
    role: "student",
    company: "QubitxQubit",
    dates: "sep 2021 - apr 2022",
    location: "remote",
    notes: [
      "studied intro quantum computing: quantum mechanics, qiskit, protocols, algorithms, and applications.",
    ],
  },
];

export interface SkillGroup {
  id: string;
  label: string;
  short: string;
  items: string[];
}

export const SKILL_GROUPS: SkillGroup[] = [
  {
    id: "languages",
    label: "languages",
    short: "LANG",
    items: ["Python", "Java", "JavaScript", "HTML/CSS", "Racket"],
  },
  {
    id: "frameworks",
    label: "frameworks & runtimes",
    short: "FRAME",
    items: ["React", "Next.js", "REST APIs", "API Integration"],
  },
  {
    id: "tools",
    label: "tools & platforms",
    short: "TOOLS",
    items: ["Git", "Linux", "VSCode", "MySQL", "DrRacket", "Eclipse", "IntelliJ"],
  },
  {
    id: "libraries",
    label: "libraries and data",
    short: "DATA",
    items: ["NumPy", "pandas"],
  },
];

export interface EducationEntry {
  school: string;
  degree: string;
  dates: string;
  location?: string;
  detail?: string;
  gpa?: string;
  highlights: string[];
  coursework: string[];
  imageSrc: string;
  imageAlt: string;
}

export const EDUCATION: EducationEntry[] = [
  {
    school: "Northeastern University",
    degree: "B.S. Computer Science (AI Concentration)",
    dates: "sep 2024 – may 2028",
    location: "boston, ma",
    detail: "khoury college of computer science",
    gpa: "3.53",
    highlights: [
      "khoury college spring 2025 and fall 2025 dean's list",
      "member of pi kappa phi fraternity, ai club, intramural soccer",
    ],
    coursework: [
      "Data Structures and Algorithms",
      "Object-Oriented Design",
      "Computer Systems",
      "Databases",
    ],
    imageSrc: "/education/northeastern.png",
    imageAlt: "Northeastern University campus at sunset",
  },
  {
    school: "Doane Academy",
    degree: "High School Diploma",
    dates: "sep 2020 – jun 2024",
    highlights: [
      "elected student body president",
      "founder and president of chess club",
      "2 year varsity soccer captain · all-county player",
      "student ambassador",
    ],
    coursework: ["Multivariable Calculus", "AP Computer Science A"],
    imageSrc: "/education/doane.png",
    imageAlt: "Doane Academy campus aerial view",
  },
];

export interface NavLink {
  href: string;
  label: string;
  external?: boolean;
}

export const NAV_LINKS: NavLink[] = [
  { href: "/about", label: "about" },
  { href: "/projects", label: "projects" },
  { href: "/experience", label: "experience" },
  { href: "/skills", label: "skills" },
  { href: "/education", label: "education" },
  { href: "/resume", label: "resume" },
  { href: "/contact", label: "contact" },
];

export interface ContactChannel {
  id: string;
  label: string;
  value: string;
  href: string;
  external?: boolean;
}

export const CONTACT_CHANNELS: ContactChannel[] = [
  {
    id: "email",
    label: "email",
    value: SITE.email,
    href: `mailto:${SITE.email}`,
  },
  {
    id: "email-secondary",
    label: "email (school)",
    value: SITE.secondaryEmail,
    href: `mailto:${SITE.secondaryEmail}`,
  },
  {
    id: "github",
    label: "github",
    value: `@${SITE.githubUsername}`,
    href: SITE.githubUrl,
    external: true,
  },
  {
    id: "linkedin",
    label: "linkedin",
    value: "in/pranav-guntupalli-pg1205",
    href: SITE.linkedinUrl,
    external: true,
  },
];

/** Home footer status line — edit here */
export const HOME_FOOTER = {
  status: "open to work",
  place: "building in public",
  mark: "est. 2006",
} as const;

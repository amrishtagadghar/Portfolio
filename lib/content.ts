import { Article, CaseStudy, PlayItem } from "@/lib/types";

export const caseStudies: CaseStudy[] = [
  {
    title: "Rebuilding a B2B Brand System for Scale",
    slug: "b2b-brand-system-scale",
    featured: true,
    excerpt: "Unified a fragmented B2B visual system into a reusable brand toolkit across sales and marketing.",
    disciplines: ["Brand", "Marketing", "Presentation"],
    industry: "SaaS",
    year: 2025,
    role: "Lead Visual Designer",
    timeline: "12 weeks",
    tools: ["Figma", "After Effects", "Notion"],
    coverImage: "https://images.unsplash.com/photo-1460925895917-afdab827c52f",
    thumbnail: "https://images.unsplash.com/photo-1551434678-e076c223a692",
    problem:
      "Teams were shipping decks, ads, and landing pages with inconsistent visuals and duplicated effort.",
    goals: [
      "Create one flexible design language for campaign and product storytelling.",
      "Reduce design turnaround for recurring assets.",
      "Improve brand consistency across web and sales collateral."
    ],
    process: [
      "Audited 180+ assets and mapped repeated design patterns.",
      "Built a modular type and spacing system.",
      "Partnered with marketing and RevOps to pilot high-impact templates."
    ],
    highlights: [
      "New visual identity kit adopted by 4 business units.",
      "Motion principles added for product launch storytelling.",
      "Template library shipped with governance guidelines."
    ],
    deliverables: ["Brand guidelines", "Campaign templates", "Sales deck system", "Motion snippets"],
    results: [
      "Template adoption exceeded 85% in two months.",
      "Brand QA revisions dropped significantly.",
      "Launch assets shipped faster across channels."
    ],
    learnings: [
      "Strong governance matters as much as components.",
      "Design review rituals prevent style drift."
    ],
    metrics: [
      { label: "Time saved", value: "40%" },
      { label: "Asset consistency", value: "+31%" }
    ]
  },
  {
    title: "Editorial Landing Pages for Campaign Velocity",
    slug: "editorial-landing-pages-campaign-velocity",
    featured: true,
    excerpt: "Designed a high-contrast landing page framework balancing premium aesthetic and conversion clarity.",
    disciplines: ["Web", "Marketing", "Motion"],
    industry: "Fintech",
    year: 2024,
    role: "Product Designer",
    timeline: "8 weeks",
    tools: ["Figma", "Framer", "GA4"],
    coverImage: "https://images.unsplash.com/photo-1460925895917-afdab827c52f",
    thumbnail: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d",
    problem: "Landing pages looked generic, loaded slowly, and underperformed on key campaign conversions.",
    goals: [
      "Improve conversion without sacrificing visual quality.",
      "Make landing page creation repeatable for growth teams."
    ],
    process: [
      "Analyzed heatmaps and drop-off points.",
      "Redesigned page hierarchy around message clarity and proof.",
      "Built reusable section blocks and production specs."
    ],
    highlights: [
      "Story-driven hero structures with concise CTAs.",
      "Proof sections with client outcomes and testimonial cards."
    ],
    deliverables: ["Landing page kit", "Performance guidelines", "Experiment backlog"],
    results: ["Improved campaign launch speed and cross-team handoff quality."],
    learnings: ["Template constraints increase quality under tight deadlines."],
    metrics: [
      { label: "CVR lift", value: "+18%" },
      { label: "Build time", value: "-35%" }
    ]
  },
  {
    title: "Presentation System for Executive Storytelling",
    slug: "presentation-system-executive-storytelling",
    featured: false,
    excerpt: "Turned ad-hoc executive decks into a consistent presentation system for investor and customer narratives.",
    disciplines: ["Presentation", "Brand"],
    industry: "Healthcare",
    year: 2023,
    role: "Design Consultant",
    timeline: "6 weeks",
    tools: ["PowerPoint", "Figma"],
    coverImage: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40",
    thumbnail: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40",
    problem: "Executive decks were inconsistent and hard to update across teams.",
    goals: ["Standardize narrative arcs and visual language.", "Improve reuse across functions."],
    process: ["Interviewed stakeholders.", "Created modular deck structures.", "Trained internal champions."],
    highlights: ["100+ slide patterns with clear usage notes."],
    deliverables: ["Deck template", "Slide pattern library", "Quick-start playbook"],
    results: ["Internal confidence increased in high-stakes presentations."],
    learnings: ["Simple rules beat heavy documentation."],
    metrics: [{ label: "Prep time", value: "-50%" }]
  }
];

export const articles: Article[] = [
  {
    title: "Design Systems for Campaign Teams",
    slug: "design-systems-for-campaign-teams",
    excerpt: "How to create design systems that move fast without losing visual quality.",
    category: "Systems",
    tags: ["systems", "campaigns"],
    publishedAt: "2026-01-12",
    readingTime: "6 min read",
    coverImage: "https://images.unsplash.com/photo-1519389950473-47ba0277781c",
    content: [
      "Campaign design fails when systems are either too rigid or too vague.",
      "The practical middle ground is a set of repeatable patterns with explicit boundaries.",
      "Start with the highest-frequency assets and build from real workflows, not theory."
    ]
  },
  {
    title: "Typography Choices That Improve Clarity",
    slug: "typography-choices-that-improve-clarity",
    excerpt: "Type hierarchy decisions that make dense content easier to scan and trust.",
    category: "Typography",
    tags: ["type", "editorial"],
    publishedAt: "2025-11-08",
    readingTime: "4 min read",
    coverImage: "https://images.unsplash.com/photo-1505685296765-3a2736de412f",
    content: [
      "The best typography systems make hierarchy obvious before the first sentence is read.",
      "Use rhythm and spacing as structure, not decoration.",
      "A strong serif-sans pairing can increase perceived authority in editorial contexts."
    ]
  },
  {
    title: "How I Scope Portfolio Case Studies",
    slug: "how-i-scope-portfolio-case-studies",
    excerpt: "A practical framework for writing case studies that are concise and credible.",
    category: "Process",
    tags: ["portfolio", "case-studies"],
    publishedAt: "2025-09-20",
    readingTime: "5 min read",
    coverImage: "https://images.unsplash.com/photo-1456324504439-367cee3b3c32",
    content: [
      "Strong case studies do not need every detail, only the right details.",
      "Show decisions, tradeoffs, and measured outcomes.",
      "End each story with what changed and what you would improve next."
    ]
  }
];

export const playItems: PlayItem[] = [
  {
    title: "Generative Poster Grid",
    slug: "generative-poster-grid",
    shortDescription: "A typography poster system generated from a simple token set.",
    status: "WIP",
    tags: ["Generative", "Type", "Code"],
    date: "2026-02-05",
    coverMedia: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97",
    content: ["Testing constrained randomness for headline rhythm and composition balance."]
  },
  {
    title: "Micro-motion Hero Experiments",
    slug: "micro-motion-hero-experiments",
    shortDescription: "Small page-load motion studies for premium portfolio intros.",
    status: "Shipped",
    tags: ["Motion", "Code"],
    date: "2025-12-18",
    coverMedia: "https://images.unsplash.com/photo-1498050108023-c5249f4df085"
  }
];

export const disciplines = ["Brand", "Marketing", "Product", "Presentation", "Web", "Motion"];
export const articleCategories = ["Brand", "Systems", "Typography", "Process", "Career"];

export function getCaseStudy(slug: string) {
  return caseStudies.find((item) => item.slug === slug);
}

export function getArticle(slug: string) {
  return articles.find((item) => item.slug === slug);
}

export function getPlayItem(slug: string) {
  return playItems.find((item) => item.slug === slug);
}

// lib/data.ts

export interface Project {
  id: string;
  title: string;
  category: string;
  role?: string;
  description?: string;
  coverImage?: string;
  tags: string[];
  type: 'visual' | 'audit' | 'other',
  assets: {
    pdfUrl?: string;
    gallery?: string[];
    image?: string;
  },
  metrics?: string[];
}
export const projects: Project[] =[
  {
    id: "intuitive-thinking-skills",
    title: 'Intuitive Thinking Skills',
    category: 'UX Audit & Accessibility',
    role: 'Volunteer Accessibility Specialist',
    description: 'A comprehensive 21-page WCAG 2.2 AA accessibility audit on an online learning platform utilizing heuristic evaluation and user personas.',
    coverImage: '/images/intuitive-cover.jpg',
    tags:['WCAG 2.2', 'UX Research', 'Audit', 'A11y'],
    type: 'audit', 
    assets: {
      pdfUrl: '/pdfs/intuitive-audit.pdf',
    },
    metrics:['5 major findings', 'Prioritised implementations', 'Leadership buy-in']
  },
  {
    id: "indigo-projects",
    title: 'Indigo Projects / Amber\'s Garden',
    category: 'Digital Strategy & UX Planning',
    role: 'Digital Strategist',
    description: 'End-to-end brand identity and website strategy, including user personas, journey mapping, and comprehensive volunteer onboarding documentation.',
    coverImage: '/images/indigo-cover.jpg',
    tags: ['Brand Strategy', 'Wireframing', 'UX Planning'],
    type: 'visual', 
    assets: {
      pdfUrl: '/pdfs/indigo-guidelines.pdf',
      gallery:['/images/indigo-1.jpg', '/images/indigo-2.jpg', '/images/indigo-3.jpg']
    }
  },
  {
    id: "mcnasty-studios",
    title: 'McNasty Studios',
    category: 'E-commerce & Digital Publishing',
    role: 'Founder & Creative Director',
    description: 'Founded an LGBTQIA+ lifestyle platform. Developed comprehensive brand strategy, built a Shopify platform, and managed multi-channel marketing.',
    coverImage: '/images/mcnasty-cover.jpg',
    tags:['Shopify', 'SEO', 'Brand Strategy', 'Digital Marketing'],
    type: 'visual',
    assets: {
      pdfUrl: '/pdfs/mcnasty-case-study.pdf',
      gallery:['/images/mc-1.jpg', '/images/mc-2.jpg'],
      image: '/images/mcnasty-hero.jpg'
    },
    metrics: ['103k monthly Pinterest views', 'Verified merchant status']
  },
  {
    id: "northern-lights",
    title: 'Northern Lights Counselling',
    category: 'Video & Communications',
    role: 'Video & Communications Lead',
    description: 'Developed testimonial video strategy shifting messaging to impact storytelling, directly supporting successful fundraising efforts.',
    coverImage: '/images/northern-lights.jpg',
    tags: ['Video Production', 'Content Strategy', 'Storytelling'],
    type: 'visual',
    assets: {
      gallery:['/images/nl-1.jpg', '/images/nl-2.jpg']
    }
  }
];
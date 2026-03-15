// lib/skillsData.ts
"use client";
import { Palette, Code2, Sparkles, Globe, FileCheck2 } from 'lucide-react';  
import type { LucideIcon } from 'lucide-react';
import figmaIcon from '@/public/icons/figmaIcon.svg';

export interface SkillCategory {
  title: string;
  icon: LucideIcon;
  skills: string[];
}

export const skillCategories: SkillCategory[] =[
  {
    title: 'Digital Strategy',
    icon: Globe,
    skills:['Content Strategy', 'SEO Optimization', 'Analytics', 'Campaign Planning', 'E-commerce (Shopify)'],
  },
  {
    title: 'Accessibility & UX',
    icon: FileCheck2,
    skills:['WCAG 2.2 AA Compliance', 'Heuristic Evaluation', 'User Personas', 'Screen Reader Testing', 'UX Audits'],
  },
  {
    title: 'Development',
    icon: Code2,
    skills:['React & Next.js', 'JavaScript/TypeScript', 'Tailwind CSS', 'HTML5/Semantic Markup', 'Git & Vercel'],
  },
  {
    title: 'Design & Visual',
    icon: Palette,
    skills:['Brand Identity', 'UI/UX Design', 'Wireframing', 'Art Direction', 'Typography'],
  },
  {
    title: 'Motion & Media',
    icon: Sparkles,
    skills:['GSAP Animation', 'Video Production', 'Video Editing', 'Storytelling', 'Micro-interactions'],
  },
  {
    title: 'Tools',
    icon: figmaIcon,
    skills:['Figma', 'Adobe Creative Suite', 'VS Code', 'Google Workspace', 'Notion'],
  },
];
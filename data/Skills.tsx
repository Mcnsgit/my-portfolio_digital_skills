import type { LucideIcon } from 'lucide-react';
import {
  Palette,
  Code2,
  Sparkles,
  Smartphone,
  Globe,
  Figma,
} from 'lucide-react';

export interface SkillCategory {
  title: string;
  icon: LucideIcon;
  skills: string[];
}

const skillCategories: SkillCategory[] = [
  {
    title: 'Design',
    icon: Palette,
    skills: ['UI/UX Design', 'Brand Identity', 'Art Direction', 'Visual Design', 'Design Systems'],
  },
  {
    title: 'Development',
    icon: Code2,
    skills: ['React & Next.js', 'TypeScript', 'Node.js', 'WebGL & Three.js', 'REST APIs'],
  },
  {
    title: 'Motion',
    icon: Sparkles,
    skills: ['GSAP Animation', 'Framer Motion', 'After Effects', 'Lottie', 'Micro-interactions'],
  },
  {
    title: 'Tools',
    icon: Figma,
    skills: ['Figma', 'Adobe Creative Suite', 'VS Code', 'Git & GitHub', 'Vercel'],
  },
  {
    title: 'Responsive',
    icon: Smartphone,
    skills: ['Mobile-First Design', 'Cross-Browser', 'Performance', 'Accessibility', 'PWA'],
  },
  {
    title: 'Strategy',
    icon: Globe,
    skills: ['User Research', 'A/B Testing', 'Analytics', 'SEO', 'Content Strategy'],
  },
];

export default skillCategories;
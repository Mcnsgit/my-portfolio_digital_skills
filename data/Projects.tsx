interface Project {
    id: number;
    title: string;
    category: string;
    description: string;
    image: string;
    tags: string[];
}

const projects: Project[] = [
    {
      id: 1,
      title: 'Indigo Projects',
      category: 'Digital Strategy & Web Development',
      description: 'A comprehensive digital transformation for a leading creative agency, featuring a custom CMS and immersive storytelling.',
      image: '/project-indigo.jpg',
      tags: ['React', 'GSAP', 'CMS']
    },
    {
      id: 2,
      title: 'McNasty Studios',
      category: 'Brand Identity & Motion Design',
      description: 'Complete brand overhaul including visual identity, motion graphics, and digital presence for a bold creative studio.',
      image: '/project-mcnasty.jpg',
      tags: ['Branding', 'Motion', 'Web']
    },
    {
      id: 3,
      title: 'Submission Journal',
      category: 'Editorial Web Design',
      description: 'An elegant digital publication platform designed for literary content with focus on readability and aesthetics.',
      image: '/project-submission.jpg',
      tags: ['Editorial', 'Typography', 'UX']
    },
    {
      id: 4,
      title: 'Skills Tu Life',
      category: 'E-Learning Platform UI',
      description: 'Mobile-first learning platform interface designed to make skill acquisition engaging and accessible.',
      image: '/project-skills.jpg',
      tags: ['Mobile', 'UI/UX', 'EdTech']
    }
  ];

  export default projects;
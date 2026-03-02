import { notFound } from 'next/navigation';
import ProjectClient from './ProjectClient';
import { projects } from '@/lib/data';

// 1. Tell Next.js which routes to pre-build during static export
export function generateStaticParams() {
    return projects.map((project) => ({
        slug: project.id,
    }));
}

// 2. Server Component fetches the data and passes it to the Client Component
export default function ProjectPage({ params }: { params: { slug: string } }) {
    const project = projects.find((p) => p.id === params.slug);

    if (!project) {
        notFound();
    }

    return <ProjectClient slug={params.slug} />;
}
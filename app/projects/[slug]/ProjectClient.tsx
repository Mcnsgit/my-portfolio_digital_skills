// app/projects/[slug]/ProjectClient.tsx
'use client';
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import gsap from 'gsap';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import PDFViewer from '@/components/pdf/PDFViewer';
import { projects, Project } from '@/lib/data';
import { notFound } from 'next/navigation';

export default function ProjectClient({ slug }: { slug: string }) {
    const project: Project | undefined = projects.find((p) => p.id === slug);
    if (!project) {
        notFound();
    }
  const [showPDF, setShowPDF] = useState(false);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    // MatchMedia for Accessibility
    let mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.fromTo(titleRef.current,
        { y: 100, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: 'power3.out' }
      );
    });
    return () => mm.revert();
  },[]);

  return (
    <main className="min-h-screen bg-zinc-950 text-white selection:bg-white selection:text-zinc-900">
      <nav className="p-6">
        <Link href="/" className="inline-flex items-center gap-2 text-zinc-400 hover:text-white transition-colors uppercase tracking-widest text-sm">
          <ArrowLeft size={16} /> Back to Work
        </Link>
      </nav>

      <div className="pt-12 px-6 md:px-16 lg:px-24 max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-24">
          <p className="text-zinc-500 mb-4 uppercase tracking-widest text-sm">{project.category} / {project.role}</p>
          <div className="overflow-hidden">
            <h1 ref={titleRef} className="text-5xl md:text-[8vw] leading-[0.9] font-bold tracking-tighter uppercase mb-8">
              {project.title}
            </h1>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 border-t border-zinc-800 pt-8">
            <p className="md:col-span-2 text-xl md:text-2xl text-zinc-400 leading-relaxed">{project.description}</p>
            <div className="flex flex-wrap gap-2 h-fit">
              {project.tags.map(tag => (
                <span key={tag} className="px-3 py-1 border border-zinc-800 rounded-full text-sm text-zinc-300">{tag}</span>
              ))}
            </div>
          </div>
        </div>

        {/* LAYOUT A: The Bento Grid (Visual) */}
        {project.type === 'visual' && project.assets.gallery && (
          <section className="space-y-6 pb-24">
            <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-zinc-900">
              <Image src={project.assets.gallery[0]} alt="Feature" fill className="object-cover" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="relative aspect-square rounded-xl overflow-hidden bg-zinc-900">
                {project.assets.gallery[1] && <Image src={project.assets.gallery[1]} alt="Detail" fill className="object-cover" />}
              </div>
              {project.assets.pdfUrl && (
                <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-8 flex flex-col justify-between hover:bg-zinc-800 transition-colors">
                  <div>
                    <h3 className="text-3xl font-bold mb-2">Strategy Documentation</h3>
                    <p className="text-zinc-400">View the full interactive PDF guidelines.</p>
                  </div>
                  <button onClick={() => setShowPDF(!showPDF)} className="self-end mt-8 flex items-center gap-2 text-white bg-zinc-800 px-6 py-3 rounded-full hover:bg-zinc-700 transition">
                    {showPDF ? 'Close Viewer' : 'Open Document'} <ArrowUpRight size={20} />
                  </button>
                </div>
              )}
            </div>
            {/* Inline PDF Viewer expansion */}
            {showPDF && project.assets.pdfUrl && (
              <div className="animate-in fade-in slide-in-from-bottom-10 duration-500">
                <PDFViewer fileUrl={project.assets?.pdfUrl || ''} />
              </div>
            )}
          </section>
        )}

        {/* LAYOUT B: The Audit/Report (Accessibility Focus) */}
        {project.type === 'audit' && (
          <section className="pb-24">
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8 md:p-12">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-12">
                <div>
                  <h2 className="text-4xl font-bold mb-6">The Findings</h2>
                  <ul className="space-y-6 mb-8">
                    {project.metrics?.map((metric, i) => (
                      <li key={i} className="flex items-start gap-4">
                        <span className="text-zinc-500 font-mono">0{i+1}</span>
                        <p className="text-lg text-zinc-300">{metric}</p>
                      </li>
                    ))}
                  </ul>
                  <button onClick={() => setShowPDF(!showPDF)} className="px-8 py-4 bg-white text-zinc-950 font-bold tracking-wide hover:bg-zinc-300 transition-colors flex items-center gap-3 rounded-full">
                    {showPDF ? 'CLOSE AUDIT' : 'READ FULL AUDIT'} <ArrowUpRight size={18} />
                  </button>
                </div>
                <div className="relative h-[400px] w-full rounded-xl overflow-hidden border border-zinc-800">
                   <Image src={project.coverImage || ''} alt="Report Cover" fill className="object-cover" />
                </div>
              </div>
              
              {/* Conditional PDF Render */}
              {showPDF && project.assets.pdfUrl && (
                <div className="border-t border-zinc-800 pt-12 animate-in fade-in duration-700">
                   <PDFViewer fileUrl={project.assets?.pdfUrl || ''} />
                </div>
              )}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
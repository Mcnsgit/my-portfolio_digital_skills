// components/pdf/CaseStudyModal.tsx
'use client';
import { useEffect } from 'react';
import FocusLock from 'react-focus-lock';
import { X } from 'lucide-react';
import PDFViewer from './PDFViewer';
import { projects } from '@/lib/data';


export default function CaseStudyModal({ project, onClose }: { project: (typeof projects)[number], onClose: () => void }) {
  // Close on Escape key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  },[onClose]);

  if (!project) return null;

  return (
    <FocusLock>
      <div 
        role="dialog" 
        aria-modal="true" 
        aria-labelledby="modal-title"
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 md:p-8"
      >
        <div className="w-full h-full max-w-7xl bg-card rounded-2xl flex flex-col md:flex-row overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-300 border border-border">
          {/* Left: HTML Content */}
          <div className="w-full md:w-2/5 p-8 overflow-y-auto border-r border-border">
            <button onClick={onClose} aria-label="Close modal" className="mb-6 p-2 min-w-[44px] min-h-[44px] flex items-center justify-center bg-muted rounded-full hover:bg-muted/80 transition">
              <X size={20} />
            </button>
            <h2 id="modal-title" className="text-3xl font-bold mb-4 text-foreground">{project.title}</h2>
            <div className="flex flex-wrap gap-2 mb-6">
              {project.tags.map((tag: string) => (
                <span key={tag} className="text-xs px-2 py-1 bg-primary/15 text-primary rounded-full">{tag}</span>
              ))}
            </div>
            <div className="prose prose-neutral dark:prose-invert" dangerouslySetInnerHTML={{ __html: project.description || '' }} />
          </div>
          {/* Right: PDF */}
          <div className="w-full md:w-3/5 p-4 bg-muted/30">
            <PDFViewer fileUrl={project.assets?.pdfUrl || ''} />
          </div>

        </div>
      </div>
    </FocusLock>
  );
}
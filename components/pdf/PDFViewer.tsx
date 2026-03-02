"use client";
import  {useState} from 'react';
import { Document, Page, pdfjs } from 'react-pdf';

import { ZoomIn, ZoomOut, ChevronLeft, ChevronRight, Download } from 'lucide-react';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

// Crucial Worker Setup
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

export default function PDFViewer({ fileUrl }: { fileUrl: string }) {
  const [numPages, setNumPages] = useState<number>(0);
  const [pageNumber, setPageNumber] = useState(1);
  const[scale, setScale] = useState(1.0);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages);
  }

  return (
    <div className="flex flex-col h-full bg-zinc-900 text-white rounded-lg overflow-hidden shadow-xl">
      {/* Custom Toolbar (Hides default browser download, keeps intent in-browser) */}
      <div className="flex items-center justify-between p-3 border-b border-zinc-700 bg-zinc-800">
        <div className="flex items-center gap-2">
          <button 
            onClick={() => setPageNumber(p => Math.max(1, p - 1))}
            disabled={pageNumber <= 1}
            aria-label="Previous Page"
            className="p-1 hover:bg-zinc-700 rounded disabled:opacity-50"
          ><ChevronLeft size={20} /></button>
          <span aria-live="polite" className="text-sm font-mono">
            {pageNumber} / {numPages || '--'}
          </span>
          <button 
            onClick={() => setPageNumber(p => Math.min(numPages, p + 1))}
            disabled={pageNumber >= numPages}
            aria-label="Next Page"
            className="p-1 hover:bg-zinc-700 rounded disabled:opacity-50"
          ><ChevronRight size={20} /></button>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={() => setScale(scale + 0.2)} aria-label="Zoom In"><ZoomIn size={18} /></button>
          <button onClick={() => setScale(Math.max(0.6, scale - 0.2))} aria-label="Zoom Out"><ZoomOut size={18} /></button>
          {/* Fallback A11y Download Link */}
          <a href={fileUrl} download aria-label="Download PDF for offline reading" className="ml-2 text-zinc-400 hover:text-white transition-colors">
            <Download size={18} />
          </a>
        </div>
      </div>

      {/* PDF Canvas */}
      <div className="flex-1 overflow-auto flex justify-center p-4 bg-zinc-900/50 relative">
        <Document
          file={fileUrl}
          onLoadSuccess={onDocumentLoadSuccess}
          loading={<div className="animate-pulse text-sm">Loading Case Study...</div>}
        >
          <Page 
            pageNumber={pageNumber} 
            scale={scale} 
            renderTextLayer={true} // Essential for screen readers to parse PDF text
            renderAnnotationLayer={true}
          />
        </Document>
      </div>
    </div>
  );
}
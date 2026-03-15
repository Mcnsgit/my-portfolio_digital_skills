import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

interface BentoProps {
    images: string[];
    pdfUrl: string;
}

export default function BentoGallery({ images, pdfUrl }: BentoProps) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 grid-rows-2 gap-4 min-h-[400px] md:min-h-[500px] lg:min-h-[600px] w-full my-12">
          {/* Main Feature Image (Left - Spans 2 rows) */}
          <div className="relative md:col-span-2 md:row-span-2 rounded-xl overflow-hidden border border-border group">
            <Image
              src={images[0]}
              alt="Brand Guideline Cover"
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-foreground/10 group-hover:bg-transparent transition-colors" />
          </div>

          {/* Secondary Image (Top Right) */}
          <div className="relative rounded-xl overflow-hidden border border-border min-h-[200px]">
            <Image
              src={images[1]}
              alt="Brand Detail"
              fill
              className="object-cover"
            />
          </div>

          {/* CTA Block (Bottom Right) */}
          <a
            href={pdfUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="relative bg-foreground text-background p-6 rounded-xl flex flex-col justify-between hover:opacity-90 transition-opacity group cursor-pointer"
          >
            <div>
              <h3 className="text-2xl font-bold">Full Guidelines</h3>
              <p className="text-background/80 mt-2 text-sm">View the complete 24-page PDF documentation.</p>
            </div>
            <div className="self-end p-3 bg-background/20 rounded-full group-hover:bg-background/30 transition-all">
              <ArrowUpRight className="w-6 h-6" />
            </div>
          </a>
        </div>
      );
}
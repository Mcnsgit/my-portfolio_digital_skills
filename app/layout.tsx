import type { Metadata } from "next";
import "./globals.css";
import { DM_Sans, Syne } from "next/font/google";
import SmoothScroll from "@/components/layout/SmoothScroll";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

export const metadata: Metadata = {
  title: 'Miguel Cardiga | Creative Technologist',
  description: 'Creative Technologist combining technical skills in web design, branding, and video with a passion for accessibility and social impact.',
  openGraph: {
    title: 'Miguel Cardiga | Creative Technologist',
    description: 'Combining technical skills with a passion for accessibility and social impact.',
    url: 'https://creativetechnologist.vercel.app',
    siteName: 'Miguel Cardiga Portfolio',
    images:[
      {
        url: '/images/og-image.jpg', // Make sure to add this image to your /public/images folder later!
        width: 1200,
        height: 630,
      },
    ],
    locale: 'en_GB',
    type: 'website',
  },
};



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${dmSans.variable} ${syne.variable} font-sans bg-background text-foreground antialiased`}>
        
        {/* A11y Skip Link - Bulletproof focus states added */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-9999 focus:px-6 focus:py-3 focus:bg-background focus:text-foreground focus:font-bold focus:rounded-md outline-none focus-visible:ring-4 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          Skip to main content
        </a>
        
        {/* Lenis Smooth Scroll Wrapper */}
        <SmoothScroll>
          {/* 
            Changed from <main> to <div> to prevent nested <main> tags, 
            which breaks semantic HTML rules since page.tsx already uses <main> 
          */}
          <div id="main-content" className="flex flex-col min-h-screen">
            {children}
          </div>
        </SmoothScroll>

      </body>
    </html>
  );
}
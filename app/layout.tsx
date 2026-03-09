import type { Metadata } from "next";
// import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Inter } from "next/font/google";
// import CustomCursor from "@/components/ui/CustomCursor";
import SmoothScroll from "@/components/layout/SmoothScroll";
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

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
      <body className={`${inter.className} bg-background text-foreground antialiased`}>
        
        {/* A11y Skip Link - Bulletproof focus states added */}
        <a 
          href="#main-content" 
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-9999 focus:px-6 focus:py-3 focus:bg-white focus:text-black focus:font-bold focus:rounded-md outline-none focus-visible:ring-4 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
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
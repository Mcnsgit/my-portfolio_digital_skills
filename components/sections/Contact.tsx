"use client";

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Mail, Linkedin, Github, Twitter, ArrowUpRight, Send } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLButtonElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=100%',
          pin: true,
          scrub: 0.5,
        }
      });

      // Background slides up
      scrollTl.fromTo(bgRef.current,
        { y: '100%' },
        { y: '0%', ease: 'none' },
        0
      );

      // Heading text fill effect
      scrollTl.fromTo(headingRef.current,
        { 
          backgroundSize: '0% 100%',
        },
        { 
          backgroundSize: '100% 100%',
          ease: 'none',
        },
        0.2
      );

      // Content fades in
      scrollTl.fromTo(contentRef.current,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, ease: 'none' },
        0.4
      );

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    setTimeout(() => {
      setDialogOpen(false);
      setFormSubmitted(false);
    }, 2000);
  };

  const socialLinks = [
    { name: 'LinkedIn', icon: <Linkedin className="w-5 h-5" />, href: '' },
    { name: 'GitHub', icon: <Github className="w-5 h-5" />, href: '' },
    { name: 'Twitter', icon: <Twitter className="w-5 h-5" />, href: '' },
  ];

  const handleComingSoonKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
    }
  };

  return (
    <section 
      ref={sectionRef}
      className="relative w-full h-screen overflow-hidden z-50"
    >
      {/* Background */}
      <div 
        ref={bgRef}
        className="absolute inset-0 bg-light will-change-transform"
      />
      
      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center px-6">
        {/* Main Heading: button for keyboard access (WCAG 2.1.1) */}
        <button
          type="button"
          ref={headingRef}
          className="text-[12vw] md:text-[10vw] font-bold tracking-tighter text-center leading-none cursor-pointer hover:scale-105 transition-transform duration-500 bg-transparent border-0 p-0 text-foreground underline decoration-2 underline-offset-4 hover:decoration-foreground/60"
          onClick={() => setDialogOpen(true)}
          aria-label="Open contact form dialog"
        >
          LET&apos;S TALK
        </button>
        
        {/* Sub Content */}
        <div 
          ref={contentRef}
          className="mt-12 md:mt-16 text-center will-change-transform"
        >
          <p className="text-surface-foreground-muted text-lg md:text-xl mb-8 max-w-md mx-auto">
            Have a project in mind? Let&apos;s create something amazing together.
          </p>

          {/* Email */}
          <a
            href="mailto:hello@miguelcardiga.com"
            className="inline-flex items-center gap-3 text-foreground hover:text-steel transition-colors group mb-12"
          >
            <Mail className="w-5 h-5" />
            <span className="text-lg md:text-xl font-medium">hello@miguelcardiga.com</span>
            <ArrowUpRight className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity" />
          </a>
          
          {/* Social Links — use span when URL not set (avoids useless href="#") */}
          <div className="flex items-center justify-center gap-6">
            {socialLinks.map((link) =>
              link.href ? (
                <a
                  key={link.name}
                  href={link.href}
                  className="p-3 border border-border rounded-full text-foreground hover:bg-foreground hover:text-background transition-all duration-300"
                  aria-label={link.name}
                >
                  {link.icon}
                </a>
              ) : (
                <span
                  key={link.name}
                  role="link"
                  tabIndex={0}
                  aria-label={`${link.name} (coming soon)`}
                  className="p-3 border border-border rounded-full text-foreground cursor-default inline-flex items-center justify-center"
                  onKeyDown={handleComingSoonKeyDown}
                >
                  {link.icon}
                </span>
              )
            )}
          </div>
        </div>
        
        {/* Footer */}
        <div className="absolute bottom-8 left-0 right-0 px-6 md:px-16">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-surface-foreground-muted text-sm">
            <p>© 2026 Miguel Cardiga. All rights reserved.</p>
            <p>Designed & Built with passion</p>
          </div>
        </div>
      </div>

      {/* Contact Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-lg bg-background border-border">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-foreground">Get in Touch</DialogTitle>
            <DialogDescription className="text-muted-foreground">
              Fill out the form below and I&apos;ll get back to you as soon as possible.
            </DialogDescription>
          </DialogHeader>

          {formSubmitted ? (
            <div className="py-12 text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Send className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">Message Sent!</h3>
              <p className="text-muted-foreground">Thank you for reaching out. I&apos;ll be in touch soon.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 mt-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="contact-name" className="text-sm font-medium text-foreground mb-2 block">Name</label>
                  <Input
                    id="contact-name"
                    placeholder="Your name"
                    required
                    className="border-border focus:border-foreground"
                  />
                </div>
                <div>
                  <label htmlFor="contact-email" className="text-sm font-medium text-foreground mb-2 block">Email</label>
                  <Input
                    id="contact-email"
                    type="email"
                    placeholder="your@email.com"
                    required
                    className="border-border focus:border-foreground"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="contact-subject" className="text-sm font-medium text-foreground mb-2 block">Subject</label>
                <Input
                  id="contact-subject"
                  placeholder="Project inquiry"
                  required
                  className="border-border focus:border-foreground"
                />
              </div>
              <div>
                <label htmlFor="contact-message" className="text-sm font-medium text-foreground mb-2 block">Message</label>
                <Textarea
                  id="contact-message"
                  placeholder="Tell me about your project..."
                  rows={4}
                  required
                  className="border-border focus:border-foreground resize-none"
                />
              </div>
              <Button
                type="submit"
                className="w-full bg-foreground text-background hover:opacity-90"
              >
                <Send className="w-4 h-4 mr-2" />
                Send Message
              </Button>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}

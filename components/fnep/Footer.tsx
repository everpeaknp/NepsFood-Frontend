'use client';

import React, { useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import { Mail, Phone, MapPin, Instagram, Facebook, Linkedin } from 'lucide-react';
import { Boxes } from './ui/background-boxes';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const footerLinks = {
  quickLinks: [
    { name: 'Home', href: '#' },
    { name: 'About Us', href: '#about' },
    { name: 'Factory', href: '#factory' },
    { name: 'Products', href: '#products' },
    { name: 'Catering', href: '#catering' },
  ],
  legal: [
    { name: 'Privacy Policy', href: '#' },
    { name: 'Terms of Service', href: '#' },
    { name: 'Compliance', href: '#' },
    { name: 'Quality Standards', href: '#' },
  ]
};

const MotionLink: React.FC<{ children: React.ReactNode; href: string }> = ({ children, href }) => (
  <motion.li>
    <motion.a
      href={href}
      className="text-slate-400 hover:text-neps-gold transition-colors inline-block"
      whileHover={{ x: 5, color: '#CC9A34' }}
    >
      {children}
    </motion.a>
  </motion.li>
);

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const redLineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (redLineRef.current && footerRef.current) {
        gsap.fromTo(redLineRef.current,
          { scaleX: 0, transformOrigin: 'left center' },
          {
            scaleX: 1,
            ease: "none",
            scrollTrigger: {
              trigger: footerRef.current,
              start: "top bottom",
              end: "top center",
              scrub: true,
            }
          }
        );
      }
    }, footerRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer ref={footerRef} className="relative bg-neps-dark-blue text-white pt-20 pb-10 overflow-hidden">
      {/* Animated Red Line */}
      <div 
        ref={redLineRef}
        className="absolute top-0 left-0 w-full h-1 bg-neps-red"
        style={{ transformOrigin: 'left center' }}
      />
      
      {/* Background Boxes Animation */}
      <div className="absolute inset-0 w-full h-full bg-neps-dark-blue z-0 [mask-image:radial-gradient(transparent,white)] pointer-events-none opacity-20" />
      <div className="absolute inset-0 w-full h-full z-0">
        <Boxes />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Company Info */}
          <div>
            <div className="flex items-center gap-2 mb-6">
              <img 
                src="/Untitled-1.png" 
                alt="NEPS FOODS Logo" 
                className="h-16 w-auto"
              />
            </div>
            <p className="text-slate-400 font-medium leading-relaxed mb-6">
              Engineering authentic Nepalese food at scale. Operating across Australia and our premium facility in Nepal.
            </p>
            <div className="flex gap-4">
              {[Instagram, Facebook, Linkedin].map((Icon, i) => (
                <motion.a
                  key={i}
                  href="#"
                  whileHover={{ y: -3, color: '#CC9A34' }}
                  className="text-slate-400 transition-colors"
                >
                  <Icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold mb-6 text-white uppercase tracking-wider">Quick Links</h4>
            <ul className="space-y-4 font-medium">
              {footerLinks.quickLinks.map((link) => (
                <MotionLink key={link.name} href={link.href}>{link.name}</MotionLink>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-bold mb-6 text-white uppercase tracking-wider">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 group translate-x-0 transition-transform hover:translate-x-1">
                <Mail className="w-5 h-5 text-neps-gold mt-1 shrink-0" />
                <a href="mailto:info@nepsfoods.com" className="text-slate-400 hover:text-white transition-colors">info@nepsfoods.com</a>
              </li>
              <li className="flex items-start gap-3 group translate-x-0 transition-transform hover:translate-x-1">
                <Phone className="w-5 h-5 text-neps-gold mt-1 shrink-0" />
                <span className="text-slate-400">+61 123 456 789 (AU)</span>
              </li>
              <li className="flex items-start gap-3 group translate-x-0 transition-transform hover:translate-x-1">
                <Phone className="w-5 h-5 text-neps-gold mt-1 shrink-0" />
                <span className="text-slate-400">+977 1 4567890 (NP)</span>
              </li>
            </ul>
          </div>

          {/* Dual Addresses */}
          <div>
            <h4 className="text-lg font-bold mb-6 text-white uppercase tracking-wider">Our Locations</h4>
            <div className="space-y-6">
              <div className="flex gap-3">
                <MapPin className="w-5 h-5 text-neps-red mt-1 shrink-0" />
                <div>
                  <p className="text-sm font-bold text-white mb-1">Australia HQ</p>
                  <p className="text-xs text-slate-400 leading-relaxed font-medium">
                    123 Business Way, Melbourne,<br />Victoria 3000, Australia
                  </p>
                </div>
              </div>
              <div className="flex gap-3">
                <MapPin className="w-5 h-5 text-neps-red mt-1 shrink-0" />
                <div>
                  <p className="text-sm font-bold text-white mb-1">Nepal Facility</p>
                  <p className="text-xs text-slate-400 leading-relaxed font-medium">
                    11-Ropani Complex, Biratnagar Highway,<br />Kathmandu, Nepal
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-10 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-xs text-slate-500 font-bold uppercase tracking-widest">
            © 2024 Neps Foods. All Rights Reserved.
          </p>
          <div className="flex gap-8 text-xs font-bold uppercase tracking-widest text-slate-500">
            {footerLinks.legal.map((item) => (
              <a key={item.name} href={item.href} className="hover:text-neps-gold transition-colors">{item.name}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

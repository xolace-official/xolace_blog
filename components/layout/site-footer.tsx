'use client';

import Link from 'next/link';
import { motion, useInView } from 'motion/react';
import { useRef, useState } from 'react';
import { XolaceLogo } from '@/components/shared/xolace-logo';
import { DownloadButtons } from '@/components/shared/download-buttons';
import { Button } from '@/components/ui/button';
import {SocialLinks} from "@/components/shared/social-links";
import {ArrowUp} from "lucide-react";

const EASE = [0.16, 1, 0.3, 1] as const;

const footerLinks = [
  { label: 'Why this exists', href: 'https://xolaceinc.com' },
  { label: 'About', href: 'https://xolaceinc.com/about' },
  { label: 'Press', href: 'https://xolaceinc.com/press' },
  { label: 'Contact', href: 'mailto:hello@xolaceinc.com' },
];

export function SiteFooter() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });
  const [hovered, setHovered] = useState(false);

  return (
      <motion.footer
          ref={ref}
          className="relative bg-primary overflow-hidden flex flex-col w-full"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          initial={{ paddingLeft: '0rem', paddingRight: '0rem', paddingBottom: '0rem', marginTop: '0rem' }}
          animate={{
            paddingLeft: hovered ? '0.75rem' : '0rem',
            paddingRight: hovered ? '0.75rem' : '0rem',
            paddingBottom: hovered ? '4rem' : '0rem',
            marginTop: hovered ? '-2rem' : '0rem',
          }}
          transition={{ duration: 0.8, ease: EASE }}
      >
        {/* Back to top — revealed in the gap below the card */}
        <div className="absolute bottom-0 left-0 w-full h-12 flex items-center justify-center z-0">
          <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="flex flex-row items-center justify-center gap-2  font-bold uppercase tracking-widest text-background hover:text-foreground transition-colors duration-200"
          >
            <ArrowUp/> Back to top
          </button>
        </div>

        <motion.div
            className="relative z-10 w-full bg-muted px-4 pt-4 pb-8 md:px-8 md:pt-8 md:pb-8"
            initial={{ borderBottomLeftRadius: '0px', borderBottomRightRadius: '0px' }}
            animate={{
              borderBottomLeftRadius: hovered ? '2rem' : '0px',
              borderBottomRightRadius: hovered ? '2rem' : '0px',
            }}
            transition={{ duration: 0.8, ease: EASE }}
        >
          <div className="flex flex-col gap-8">

            {/* CTA section */}
            <section className="text-center">
              <h2 className="font-serif text-3xl font-bold text-muted-foreground md:text-4xl">
                A quiet place to be human.
              </h2>
              <p className="mx-auto mt-4 text-sm md:text-base max-w-xl text-muted-foreground/90">
                This reading layer is just one room. Step into the main space to explore the full vision for Xolace, or join the ambassadors moving it forward.
              </p>
              <div className="mt-8 flex items-center justify-center gap-4 flex-row">
                <Button asChild className="h-10 font-semibold" variant={"outline"}>
                  <Link href="https://xolaceinc.com" target="_blank" rel="noopener noreferrer">
                    Explore Xolace
                  </Link>
                </Button>
                <Button asChild className="h-10 bg-accent text-foreground hover:bg-accent/80 transition-colors duration-200">
                  <Link href="https://xolaceinc.com/ambassadors" target="_blank" rel="noopener noreferrer">
                    Become an Ambassador
                  </Link>
                </Button>
              </div>
            </section>

            <div className="border-t border-muted-foreground/10 my-4" />

            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">

                {/* Logo + links */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.7, ease: EASE }}
                    className="space-y-4"
                >
                  <Link href="/" className="group shrink-0">
                    <XolaceLogo size="lg" />
                  </Link>
                  <nav className="mt-4 flex flex-wrap gap-x-4 gap-y-2">
                    {footerLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className="text-[15px] font-medium text-muted-foreground/90 transition-colors hover:text-muted-foreground"
                        >
                          {link.label}
                        </Link>
                    ))}
                  </nav>
                </motion.div>

                {/* Download buttons */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.7, delay: 0.1, ease: EASE }}
                    className="hidden flex-col items-end gap-3 md:flex"
                >
                                <span className="text-[14px] font-medium text-muted-foreground/90">
                                    Get the app
                                </span>
                  <div className="flex gap-2">
                    <DownloadButtons />
                  </div>
                </motion.div>
              </div>

              {/* Bottom bar */}
              <motion.div
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: 1 } : {}}
                  transition={{ duration: 0.6, delay: 0.2, ease: EASE }}
                  className="border-muted-foreground/20 pt-4"
              >
                <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
                  <p className="text-[15px] text-muted-foreground/70">
                    {`© ${new Date().getFullYear()} Xolace Inc. All rights reserved.`}
                  </p>
                  <div className="flex items-center gap-4 flex-wrap justify-end">
                    <SocialLinks/>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </motion.footer>
  );
}
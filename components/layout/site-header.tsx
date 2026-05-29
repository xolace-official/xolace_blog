'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Menu, X } from 'lucide-react';
import {XolaceLogo} from "@/components/shared/xolace-logo";

const navLinks = [
  { label: 'Menu1', href: '/menu1' },
  { label: 'Menu2', href: '/menu2' },
  { label: 'Menu3', href: '/mene3' },
];

export function SiteHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === '/';

  useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    // Trigger initially
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full bg-primary text-primary-foreground transition-shadow duration-300 shadow-sm">
      <div className="py-4">
        <div className="mx-auto flex max-w-300 items-center justify-between px-6 md:px-10">
          <Link href="https://xolaceinc.com" className="group shrink-0">
            <XolaceLogo size="sm" priority/>
          </Link>

          <nav className="hidden items-center gap-8 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-[15px] font-medium text-primary-foreground/90 transition-colors hover:text-primary-foreground"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <button
            type="button"
            className="text-primary-foreground md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {mobileMenuOpen && (
          <nav className="border-t border-primary-foreground/20 bg-primary px-6 py-4 md:hidden">
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-[15px] font-medium text-primary-foreground/90 transition-colors hover:text-primary-foreground"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </nav>
        )}
      </div>

      {isHome && (
        <div
          className={`overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            isScrolled ? 'max-h-0 opacity-0' : 'max-h-[500px] opacity-100'
          }`}
        >
          <section className="mx-auto max-w-300 px-6 pb-16 pt-2 md:px-10 md:pb-20 md:pt-4">
            <div className="mt-4 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
              <div className="max-w-xl">
                <h1 className="font-serif text-3xl leading-tight text-primary-foreground md:text-[42px] md:leading-[1.15]">
                  Essays and words for what&apos;s hard to carry.
                </h1>
              </div>
              <p className="max-w-sm text-[15px] leading-relaxed text-primary-foreground/80 md:text-right">
                A quiet place to read. Words for the feelings that don&apos;t have names yet.
              </p>
            </div>

            <div className="mt-10 flex max-w-md flex-col gap-3 sm:flex-row bg-background p-1 rounded-md">
              <Input
                type="email"
                placeholder="Enter your email here to subscribe"
                className="flex-1 bg-background text-foreground placeholder:text-foreground/60 focus-visible:ring-foreground/50 border"
              />
              <Button
                type="button"
              >
                Subscribe
              </Button>
            </div>
          </section>
        </div>
      )}
    </header>
  );
}

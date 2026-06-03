'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect, useRef, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Menu, X } from 'lucide-react';
import { XolaceLogo } from '@/components/shared/xolace-logo';

const navLinks: { label: string; href: string }[] = [];

export function SiteHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [heroHeight, setHeroHeight] = useState<number>(0);
  const heroInnerRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const isHome = pathname === '/';

  // Measure hero height — runs after paint so value is always accurate
  const measureHero = useCallback(() => {
    if (heroInnerRef.current) {
      setHeroHeight(heroInnerRef.current.scrollHeight);
    }
  }, []);

  useEffect(() => {
    if (!isHome) return;

    measureHero();

    // Re-measure on resize so height stays accurate
    window.addEventListener('resize', measureHero);
    return () => window.removeEventListener('resize', measureHero);
  }, [isHome, measureHero]);



  return (
      <header className="top-0 z-[99] w-full bg-muted shadow-sm px-4 md:px-8">

        {/* ── Nav bar ── */}
        <div className="py-4">
          <div className="mx-auto flex items-center justify-between">
            <Link href="/" className="group shrink-0">
              <XolaceLogo size="sm" priority />
            </Link>

            <nav className="hidden items-center gap-8 md:flex">
              {navLinks.map((link) => (
                  <Link
                      key={link.href}
                      href={link.href}
                      className="text-[15px] font-medium text-muted-foreground/90 transition-colors hover:text-muted-foreground"
                  >
                    {link.label}
                  </Link>
              ))}
            </nav>

            {navLinks.length > 0 && (
                <button
                    type="button"
                    className="text-muted-foreground md:hidden"
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    aria-label="Toggle menu"
                >
                  {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            )}
          </div>

          {mobileMenuOpen && navLinks.length > 0 && (
              <nav className="bg-muted px-6 py-4 md:hidden">
                <div className="flex flex-col gap-4">
                  {navLinks.map((link) => (
                      <Link
                          key={link.href}
                          href={link.href}
                          className="text-[15px] font-medium text-muted-foreground/90 transition-colors hover:text-muted-foreground"
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
                style={{
                  height:  heroHeight ,
                  opacity: 1,
                  overflow: 'hidden',
                  pointerEvents: 'none',
                  transition: heroHeight
                      ? 'height 500ms cubic-bezier(0.16,1,0.3,1), opacity 400ms cubic-bezier(0.16,1,0.3,1)'
                      : 'none',
                }}
            >
              <div
                  ref={heroInnerRef}
              >
                <section className="mx-auto py-4">
                  <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                    <div className="max-w-xl">
                      <h1 className="font-serif text-3xl leading-tight text-muted-foreground md:text-[42px] md:leading-[1.15]">
                        Essays and words for what&apos;s hard to carry.
                      </h1>
                    </div>
                    <p className="max-w-sm text-[15px] leading-relaxed text-muted-foreground/80 md:text-right">
                      A quiet place to read. Words for the feelings that don&apos;t have names yet.
                    </p>
                  </div>

                  <div className="mt-8 flex max-w-md flex-col gap-3 sm:flex-row bg-white p-1 rounded-md">
                    <Input
                        type="email"
                        placeholder="Enter your email here to subscribe"
                        className="flex-1 bg-background text-foreground placeholder:text-foreground/60 focus-visible:ring-primary/50"
                    />
                    <Button type="button">
                      Subscribe
                    </Button>
                  </div>
                </section>
              </div>
            </div>
        )}
      </header>
  );
}
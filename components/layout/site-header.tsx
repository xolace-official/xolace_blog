'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Menu, X } from 'lucide-react';
import { XolaceLogo } from '@/components/shared/xolace-logo';

const navLinks = [
  // { label: 'Stories', href: '/stories' },
  // { label: 'About', href: '/about' },
  // { label: 'Topics', href: '/topics' },
];

export function SiteHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [heroHeight, setHeroHeight] = useState<number>(0);
  const heroInnerRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const isHome = pathname === '/';

  // Measure real hero height once mounted
  useEffect(() => {
    if (heroInnerRef.current) {
      setHeroHeight(heroInnerRef.current.scrollHeight);
    }
  }, [isHome]);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
      <header className="sticky top-0 z-99 w-full bg-muted shadow-sm px-4 md:px-24 ">

        {/* ── Nav bar — always visible ── */}
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

            <button
                type="button"
                className="text-muted-foreground md:hidden"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {mobileMenuOpen && (
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

        {/* ── Hero — animates height + opacity + translateY in/out ── */}
        {isHome && (
            <div
                style={{
                  height: isScrolled ? 0 : heroHeight,
                  opacity: isScrolled ? 0 : 1,
                  overflow: 'hidden',
                  transition: 'height 500ms cubic-bezier(0.16,1,0.3,1), opacity 400ms cubic-bezier(0.16,1,0.3,1)',
                }}
            >
              <div
                  ref={heroInnerRef}
                  style={{
                    transform: isScrolled ? 'translateY(-16px)' : 'translateY(0)',
                    transition: 'transform 500ms cubic-bezier(0.16,1,0.3,1)',
                  }}
              >
                <section className="mx-auto pb-16 pt-2 md:pb-20 md:pt-4">
                  <div className="mt-4 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
                    <div className="max-w-xl">
                      <h1 className="font-serif text-3xl leading-tight text-muted-foreground md:text-[42px] md:leading-[1.15]">
                        Essays and words for what&apos;s hard to carry.
                      </h1>
                    </div>
                    <p className="max-w-sm text-[15px] leading-relaxed text-muted-foreground/80 md:text-right">
                      A quiet place to read. Words for the feelings that don&apos;t have names yet.
                    </p>
                  </div>

                  <div className="mt-10 flex max-w-md flex-col gap-3 sm:flex-row bg-white p-1 rounded-md">
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
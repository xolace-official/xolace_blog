import type { Metadata } from 'next';
import { PT_Serif, Nunito, Geist } from 'next/font/google';
import './globals.css';
import {SiteHeader} from "@/components/layout/site-header";
import {SiteFooter} from "@/components/layout/site-footer";
import { cn } from "@/lib/utils";
import {Toaster} from "sonner";
import {ThemeProvider} from "next-themes";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const ptSerif = PT_Serif({
  variable: '--font-pt-serif',
  subsets: ['latin'],
  weight: ['400', '700'],
  display: 'swap',
});

const nunito = Nunito({
  variable: '--font-nunito',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'Xolace - Read',
    template: '%s - Xolace',
  },
  description: "Essays and words for what's hard to carry.",
  openGraph: {
    siteName: 'Xolace',
    type: 'website',
    locale: 'en_US',
  },
  twitter: { card: 'summary_large_image' },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn("h-full", "antialiased", ptSerif.variable, nunito.variable, "font-sans", geist.variable)}
      suppressHydrationWarning
    >
      <body className="min-h-full">
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <>
            <SiteHeader />
            {children}
            <Toaster position="top-center" richColors />
            <SiteFooter />
          </>
      </ThemeProvider>
      </body>
    </html>
  );
}

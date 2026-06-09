"use client"

import Image from "next/image"
import Link from "next/link"
import { motion } from "motion/react"
import { ArrowLeft } from "lucide-react"

export default function NotFound() {
    return (
        <div className="relative flex min-h-[calc(100dvh-4rem)] items-center justify-center overflow-hidden px-6 py-12">

            {/* Atmosphere */}
            <div aria-hidden className="absolute inset-0 pointer-events-none">
                <div className="absolute w-175 h-175 rounded-full bg-primary/[0.07] blur-[160px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-gentle-pulse" />
                <div className="absolute w-87.5 h-87.5 rounded-full bg-accent/4 blur-[110px] top-1/4 right-1/4 animate-gentle-pulse [animation-delay:3s]" />
            </div>

            {/* Ghost text */}
            <span
                aria-hidden
                className="pointer-events-none select-none absolute font-serif italic text-foreground/15"
                style={{
                    fontSize: "clamp(48px, 12vw, 170px)",
                    opacity: 0.18,
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    lineHeight: 1,
                    whiteSpace: "nowrap",
                }}
            >
        NOT FOUND
      </span>

            {/* Content wrapper */}
            <motion.div
                initial={{ opacity: 0, y: 32 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                className="relative z-10 flex flex-col items-center"
            >

                {/* Mascot (no negative margin hack) */}
                <div className="relative z-20 translate-y-6">
                    <Image
                        src="/flux-images/ChatGPT_Image_Oct_20__2025__10_36_52_PM-removebg-preview.png"
                        alt=""
                        width={280}
                        height={280}
                        className="w-36 md:w-44 h-auto object-contain drop-shadow-2xl"
                        priority
                        aria-hidden
                    />
                </div>

                {/* Circle card */}
                <div className="relative size-85 md:size-100 rounded-full border border-border/20 bg-card/70 flex flex-col items-center justify-center text-center px-8 pt-8 pb-10">

                    {/* glow */}
                    <div aria-hidden className="absolute inset-0 pointer-events-none">
                        <div className="absolute w-48 h-48 rounded-full bg-primary/6 blur-[50px] -top-8 left-1/2 -translate-x-1/2" />
                    </div>

                    <div className="relative z-10 flex flex-col items-center gap-4">
                        <p className="text-[10px] font-mono uppercase tracking-[0.28em] text-muted-foreground/30">
                            Not found
                        </p>

                        <h1 className="font-serif italic font-light text-2xl md:text-3xl text-foreground leading-[1.15]">
                            Lost in the quiet.
                        </h1>

                        <div className="w-6 h-px bg-border/30" />

                        <Link
                            href="/"
                            className="group inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/8 px-6 py-2.5 text-xs font-light text-foreground/80 transition-all duration-300 hover:border-primary/50 hover:bg-primary/15 hover:text-foreground"
                        >
                            <ArrowLeft
                                className="size-3 transition-transform duration-300 group-hover:-translate-x-1"
                                strokeWidth={1.5}
                            />
                            Back home
                        </Link>
                    </div>
                </div>

            </motion.div>

            {/* float animation stays */}
            <style>{`
        .not-found-float {
          animation: notFoundFloat 4s ease-in-out infinite;
        }
        @keyframes notFoundFloat {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-14px); }
        }
      `}</style>
        </div>
    )
}
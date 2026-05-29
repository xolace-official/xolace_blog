export function HeroSection() {
  return (
    <section className="bg-primary px-6 pb-16 pt-12 md:px-10 md:pb-20 md:pt-16">
      <div className="mx-auto max-w-300">
        <span className="text-sm font-medium text-primary-foreground/70">
          Blog
        </span>

        <div className="mt-4 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div className="max-w-xl">
            <h1 className="font-serif text-3xl leading-tight text-primary-foreground md:text-[42px] md:leading-[1.15]">
              Essays and words for what&apos;s hard to carry.
            </h1>
          </div>

          <p className="max-w-sm text-[15px] leading-relaxed text-primary-foreground/80 md:text-right">
            A quiet place to read. Words for the feelings that don&apos;t have
            names yet.
          </p>
        </div>

        <div className="mt-10 flex max-w-md flex-col gap-3 sm:flex-row">
          <input
            type="email"
            placeholder="your@email.com"
            className="flex-1 rounded-lg bg-primary-foreground px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          />
          <button
            type="button"
            className="rounded-lg bg-foreground px-6 py-3 text-sm font-semibold text-background transition-opacity duration-150 hover:opacity-90"
          >
            Keep me here
          </button>
        </div>
      </div>
    </section>
  );
}

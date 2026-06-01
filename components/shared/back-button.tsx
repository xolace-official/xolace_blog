import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

type BackButtonProps = {
    href: string;
    label?: string;
    className?: string;
};

export function BackButton({ href, label = 'All Posts', className }: BackButtonProps) {
    return (
        <>
            {/* Mobile */}
            <div className="md:hidden">
                <Button
                    asChild
                    variant="outline"
                    size="sm"
                    className={cn(
                        'rounded-full border-foreground/20 uppercase tracking-widest text-[11px] font-semibold gap-2 text-muted-foreground hover:text-foreground',
                        className
                    )}
                >
                    <Link href={href}>
                        <ArrowLeft size={14} />
                        {label}
                    </Link>
                </Button>
            </div>

            {/* Desktop — floats left of the centered column */}
            <div className="hidden md:block">
                <div className="mx-auto max-w-3xl relative">
                    <Button
                        asChild
                        variant="outline"
                        size="sm"
                        className={cn(
                            'absolute right-full top-0 mr-8 rounded-full border-foreground/20 uppercase tracking-widest text-[11px] font-semibold gap-2 text-muted-foreground hover:text-foreground whitespace-nowrap',
                            className
                        )}
                    >
                        <Link href={href}>
                            <ArrowLeft size={14} />
                            {label}
                        </Link>
                    </Button>
                </div>
            </div>
        </>
    );
}
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

type ReadMoreButtonProps = {
    href: string;
    label?: 'READ MORE' | 'FULL STORY';
    className?: string;
};

export function ReadMoreButton({ href, label = 'READ MORE', className }: ReadMoreButtonProps) {
    return (
        <Button
            asChild
            variant="default"
            size="sm"
            className={cn(
                'rounded-full border-foreground uppercase tracking-widest text-[11px] font-semibold gap-1.5 transition-all duration-200',
                className
            )}
        >
            <Link href={href}>
                {label}
                <ArrowRight size={13} className="transition-transform duration-200 group-hover:translate-x-0.5" />
            </Link>
        </Button>
    );
}
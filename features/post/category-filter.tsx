'use client';

import {useEffect, useRef, useState} from 'react';
import { Search, SlidersHorizontal } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import type { PostCategory } from '@/types/post';
import {cn} from "@/lib/utils";

const categories: { value: PostCategory | 'all'; label: string }[] = [
    { value: 'all', label: 'All Categories' },
    { value: 'vocabulary', label: 'Vocabulary' },
    { value: 'founders', label: 'Founders' },
    { value: 'mirror-voice', label: 'Mirror Voice' },
    { value: 'territory', label: 'Territory' },
    { value: 'people', label: 'People' },
];

type CategoryFilterProps = {
    active: PostCategory | 'all';
    onCategoryChange: (category: PostCategory | 'all') => void;
    search: string;
    onSearchChange: (value: string) => void;
};

export function CategoryFilter({ active, onCategoryChange, search, onSearchChange }: CategoryFilterProps) {
    const [mobileView, setMobileView] = useState<'search' | 'category'>('search');
    const [isSticky, setIsSticky] = useState(false);
    const filterRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleScroll = () => {
            if (!filterRef.current) return;

            const { top } = filterRef.current.getBoundingClientRect();
            setIsSticky(top <= 0);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll();

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div
            ref={filterRef}
            className={`sticky top-0 z-40 transition-all mt-4 md:mt-8 px-4 md:px-8 duration-300 ${
                isSticky
                    ? 'bg-muted py-3 shadow-sm border-b'
                    : ''
            }`}
        >

            {/* ── MOBILE ── */}
            <div className="flex items-center gap-2 sm:hidden">
                {mobileView === 'search' ? (
                    <>
                        <div className="relative flex-1">
                            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
                            <Input
                                type="text"
                                placeholder="Search stories..."
                                value={search}
                                onChange={(e) => onSearchChange(e.target.value)}
                                className={cn(
                                    'pl-9 rounded-md border-border text-sm transition-colors',
                                    isSticky && 'bg-background border-border shadow-sm'
                                )}
                            />
                        </div>
                        <Button
                            variant="outline"
                            size="icon"
                            className="shrink-0 rounded-md border-border"
                            onClick={() => setMobileView('category')}
                            aria-label="Show category filter"
                        >
                            <SlidersHorizontal size={15} />
                        </Button>
                    </>
                ) : (
                    <>
                        <Select
                            value={active}
                            onValueChange={(val) => onCategoryChange(val as PostCategory | 'all')}
                        >
                            <SelectTrigger
                                className={cn(
                                    'flex-1 rounded-md border-border text-sm transition-colors',
                                    isSticky && 'bg-background border-border shadow-sm'
                                )}
                            >
                                <SelectValue placeholder="Filter by category" />
                            </SelectTrigger>
                            <SelectContent>
                                {categories.map(({ value, label }) => (
                                    <SelectItem key={value} value={value} className="text-sm">
                                        {label}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        <Button
                            variant="outline"
                            size="icon"
                            className="shrink-0 rounded-md border-border"
                            onClick={() => setMobileView('search')}
                            aria-label="Show search"
                        >
                            <Search size={15} />
                        </Button>
                    </>
                )}
            </div>

            {/* ── DESKTOP ── */}
            <div className="hidden sm:flex items-center gap-3 justify-end">
                <div className="relative max-w-sm w-full">
                    <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
                    <Input
                        type="text"
                        placeholder="Search stories..."
                        value={search}
                        onChange={(e) => onSearchChange(e.target.value)}
                        className={cn(
                            'pl-9 rounded-md border-border text-sm transition-colors',
                            isSticky && 'bg-background border-border shadow-sm'
                        )}
                    />
                </div>
                <Select
                    value={active}
                    onValueChange={(val) => onCategoryChange(val as PostCategory | 'all')}
                >
                    <SelectTrigger
                        className={cn(
                            'w-48 rounded-md border-border text-sm transition-colors',
                            isSticky && 'bg-background border-border shadow-sm'
                        )}
                    >
                        <SelectValue placeholder="Filter by category" />
                    </SelectTrigger>
                    <SelectContent>
                        {categories.map(({ value, label }) => (
                            <SelectItem key={value} value={value} className="text-sm">
                                {label}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>

        </div>
    );
}
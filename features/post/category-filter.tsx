'use client';

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import type { PostCategory } from '@/types/post';

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
    onChange: (category: PostCategory | 'all') => void;
};

export function CategoryFilter({ active, onChange }: CategoryFilterProps) {
    return (
        <div className="mb-4 md:mb-8">
            <Select
                value={active}
                onValueChange={(val) => onChange(val as PostCategory | 'all')}
            >
                <SelectTrigger className="w-48 rounded-md border-border text-sm">
                    <SelectValue placeholder="Filter by category" />
                </SelectTrigger>
                <SelectContent>
                    {categories.map(({ value, label }) => (
                        <SelectItem
                            key={value}
                            value={value}
                            className="text-sm"
                        >
                            {label}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
    );
}
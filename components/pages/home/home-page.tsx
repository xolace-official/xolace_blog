'use client';

import { useState, useMemo } from 'react';
import { PostList } from '@/features/post/post-list';
import { Pagination } from '@/features/home/pagination';
import { dummyPosts } from '@/features/post/dummy';
import type { PostCategory } from '@/types/post';
import { CategoryFilter } from '@/features/post/category-filter';

const POSTS_PER_PAGE = 9;

export function HomePage() {
    const [currentPage, setCurrentPage] = useState(1);
    const [activeCategory, setActiveCategory] = useState<PostCategory | 'all'>('all');
    const [search, setSearch] = useState('');

    const publishedPosts = useMemo(
        () => dummyPosts.filter((post) => post.isPublished),
        []
    );

    const filteredPosts = useMemo(() => {
        let posts = publishedPosts;

        if (activeCategory !== 'all') {
            posts = posts.filter((post) => post.category === activeCategory);
        }

        if (search.trim()) {
            const q = search.toLowerCase();
            posts = posts.filter((post) =>
                post.title.toLowerCase().includes(q) ||
                post.subtitle?.toLowerCase().includes(q) ||
                post.authors.some((a) => a.name.toLowerCase().includes(q))
            );
        }

        return posts;
    }, [publishedPosts, activeCategory, search]);

    const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);

    const paginatedPosts = useMemo(() => {
        const start = (currentPage - 1) * POSTS_PER_PAGE;
        return filteredPosts.slice(start, start + POSTS_PER_PAGE);
    }, [filteredPosts, currentPage]);

    function handlePageChange(page: number) {
        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    function handleCategoryChange(category: PostCategory | 'all') {
        setActiveCategory(category);
        setCurrentPage(1);
    }

    function handleSearchChange(value: string) {
        setSearch(value);
        setCurrentPage(1);
    }

    return (
        <main>
            <CategoryFilter
                active={activeCategory}
                onCategoryChange={handleCategoryChange}
                search={search}
                onSearchChange={handleSearchChange}
            />
            <PostList posts={paginatedPosts} />
            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
            />
        </main>
    );
}
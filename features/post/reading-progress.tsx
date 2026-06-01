'use client';
import { useEffect } from 'react';

export function ReadingProgress() {
    useEffect(() => {
        const bar = document.getElementById('reading-progress');
        const body = document.getElementById('post-body');
        if (!bar || !body) return;

        const update = () => {
            const rect = body.getBoundingClientRect();
            const scrolled = Math.max(0, -rect.top);
            const pct = Math.min(100, (scrolled / body.offsetHeight) * 100);
            bar.style.width = pct + '%';
        };

        window.addEventListener('scroll', update, { passive: true });
        return () => window.removeEventListener('scroll', update);
    }, []);

    return null;
}
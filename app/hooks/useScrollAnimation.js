'use client';

import { useEffect, useRef, useCallback } from 'react';

export function useScrollAnimation(options = {}) {
    const ref = useRef(null);

    useEffect(() => {
        const element = ref.current;
        if (!element) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                    }
                });
            },
            {
                threshold: options.threshold || 0.1,
                rootMargin: options.rootMargin || '0px 0px -50px 0px',
            }
        );

        // Observe the element itself and all its animated children
        const animatedElements = element.querySelectorAll(
            '.animate-on-scroll, .slide-in-left, .slide-in-right, .zoom-in'
        );

        animatedElements.forEach((el) => observer.observe(el));

        // Also observe the element itself if it has an animation class
        if (
            element.classList.contains('animate-on-scroll') ||
            element.classList.contains('slide-in-left') ||
            element.classList.contains('slide-in-right') ||
            element.classList.contains('zoom-in')
        ) {
            observer.observe(element);
        }

        return () => observer.disconnect();
    }, [options.threshold, options.rootMargin]);

    return ref;
}

export function useParallax() {
    const handleScroll = useCallback(() => {
        const elements = document.querySelectorAll('.parallax-img');
        elements.forEach((el) => {
            const rect = el.getBoundingClientRect();
            const scrollPercent = (rect.top - window.innerHeight) / (rect.height + window.innerHeight);
            const translateY = scrollPercent * 60;
            el.style.transform = `translateY(${translateY}px)`;
        });
    }, []);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll();
        return () => window.removeEventListener('scroll', handleScroll);
    }, [handleScroll]);
}

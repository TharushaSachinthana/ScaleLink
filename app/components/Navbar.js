'use client';

import { useState, useEffect } from 'react';
import { useContent } from '../contexts/ContentContext';
import styles from './Navbar.module.css';

export default function Navbar() {
    const { content } = useContent();
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollTo = (id) => {
        setMobileOpen(false);
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
    };

    const links = [
        { label: 'Home', id: 'hero' },
        { label: 'About', id: 'about' },
        { label: 'Services', id: 'services' },
        { label: 'Portfolio', id: 'portfolio' },
        { label: 'Contact', id: 'contact' },
    ];

    return (
        <nav className={`${styles.navbar} ${scrolled ? styles.scrolled : ''}`}>
            <div className={`container ${styles.inner}`}>
                <button className={styles.logo} onClick={() => scrollTo('hero')}>
                    <img src="/LOGO.png" alt="ScaleLink Technologies" />
                </button>

                <div className={`${styles.links} ${mobileOpen ? styles.open : ''}`}>
                    {links.map((link) => (
                        <button
                            key={link.id}
                            className={styles.navLink}
                            onClick={() => scrollTo(link.id)}
                        >
                            {link.label}
                        </button>
                    ))}
                    <button
                        className={`btn btn-primary ${styles.ctaBtn}`}
                        onClick={() => scrollTo('contact')}
                    >
                        Get In Touch
                    </button>
                </div>

                <button
                    className={`${styles.hamburger} ${mobileOpen ? styles.active : ''}`}
                    onClick={() => setMobileOpen(!mobileOpen)}
                    aria-label="Toggle menu"
                >
                    <span></span>
                    <span></span>
                    <span></span>
                </button>
            </div>

            {mobileOpen && (
                <div className={styles.overlay} onClick={() => setMobileOpen(false)} />
            )}
        </nav>
    );
}

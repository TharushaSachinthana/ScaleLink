'use client';

import { useState } from 'react';
import { useContent } from '../contexts/ContentContext';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import styles from './Portfolio.module.css';

export default function Portfolio() {
    const { content } = useContent();
    const ref = useScrollAnimation();
    const [activeFilter, setActiveFilter] = useState('All');

    const categories = ['All', ...new Set(content.portfolio.map(p => p.category))];

    const filtered = activeFilter === 'All'
        ? content.portfolio
        : content.portfolio.filter(p => p.category === activeFilter);

    const colors = [
        'linear-gradient(135deg, #0F1B2D, #1A2E4A)',
        'linear-gradient(135deg, #1A2E4A, #2a4a6b)',
        'linear-gradient(135deg, #B8862D, #D4A94A)',
        'linear-gradient(135deg, #2a4a6b, #0F1B2D)',
        'linear-gradient(135deg, #D4A94A, #B8862D)',
        'linear-gradient(135deg, #0F1B2D, #B8862D)',
    ];

    return (
        <section id="portfolio" className={styles.portfolio} ref={ref}>
            <div className="container">
                <div className={`${styles.header} animate-on-scroll`}>
                    <span className="section-label">Portfolio</span>
                    <h2 className="section-title">Our Latest Work</h2>
                </div>

                <div className={`${styles.filters} animate-on-scroll delay-1`}>
                    <span className={styles.filterLabel}>Filter</span>
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            className={`${styles.filterBtn} ${activeFilter === cat ? styles.active : ''}`}
                            onClick={() => setActiveFilter(cat)}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                <div className={styles.grid}>
                    {filtered.map((project, i) => (
                        <div key={project.id} className={`${styles.card} animate-on-scroll delay-${(i % 3) + 1}`}>
                            <div className={styles.cardImage} style={{ background: colors[i % colors.length] }}>
                                <div className={styles.cardOverlay}>
                                    <h3>{project.title}</h3>
                                    <span className={styles.cardCat}>{project.category}</span>
                                </div>
                                <div className={styles.cardPlaceholder}>
                                    {project.category === 'Websites' && '🌐'}
                                    {project.category === 'Mobile Apps' && '📱'}
                                    {project.category === 'POS' && '🖥️'}
                                    {project.category === 'CRM' && '🔗'}
                                </div>
                            </div>
                            <div className={styles.cardInfo}>
                                <h4>{project.title}</h4>
                                <p>{project.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

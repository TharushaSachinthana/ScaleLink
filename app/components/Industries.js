'use client';

import { useContent } from '../contexts/ContentContext';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import styles from './Industries.module.css';

export default function Industries() {
    const { content } = useContent();
    const ref = useScrollAnimation();

    return (
        <section className={styles.industries} ref={ref}>
            <div className="container">
                <div className={`${styles.header} animate-on-scroll`}>
                    <span className="section-label">Industries</span>
                    <h2 className="section-title centered">Industries We Serve</h2>
                    <p className="section-subtitle centered">
                        Currently focused on salons & beauty, with exciting expansions ahead
                    </p>
                </div>

                <div className={styles.grid}>
                    {content.industries.map((ind, i) => (
                        <div
                            key={ind.id}
                            className={`${styles.card} ${ind.active ? styles.active : styles.comingSoon} animate-on-scroll delay-${i + 1}`}
                        >
                            <span className={styles.icon}>{ind.icon}</span>
                            <h3 className={styles.name}>{ind.name}</h3>
                            {!ind.active && (
                                <span className={styles.badge}>Coming Soon</span>
                            )}
                            {ind.active && (
                                <span className={styles.activeBadge}>Active</span>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

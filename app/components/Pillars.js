'use client';

import { useContent } from '../contexts/ContentContext';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import styles from './Pillars.module.css';

export default function Pillars() {
    const { content } = useContent();
    const ref = useScrollAnimation();

    return (
        <section className={styles.pillars} ref={ref}>
            <div className="container">
                <div className={styles.header}>
                    <span className="section-label">Our Approach</span>
                    <h2 className="section-title centered">Our Recipe for Success</h2>
                    <p className="section-subtitle centered">
                        Three core pillars that drive every solution we build for our clients
                    </p>
                </div>

                <div className={styles.grid}>
                    {content.pillars.map((pillar, i) => (
                        <div key={pillar.id} className={`${styles.card} animate-on-scroll delay-${i + 1}`}>
                            <div className={styles.cardIcon}>{pillar.icon}</div>
                            <div className={styles.cardContent}>
                                <span className={styles.cardSubtitle}>{pillar.subtitle}</span>
                                <h3 className={styles.cardTitle}>{pillar.title}</h3>
                                <p className={styles.cardText}>{pillar.description}</p>
                            </div>
                            <div className={styles.cardNumber}>0{i + 1}</div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

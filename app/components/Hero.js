'use client';

import { useContent } from '../contexts/ContentContext';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import styles from './Hero.module.css';

export default function Hero() {
    const { content } = useContent();
    const ref = useScrollAnimation();

    return (
        <section id="hero" className={styles.hero} ref={ref}>
            <div className={`container ${styles.inner}`}>
                <div className={`${styles.left} slide-in-left`}>
                    <span className="section-label">ScaleLink Technologies</span>
                    <h1 className={styles.title}>{content.company.tagline}</h1>
                    <p className={styles.subtitle}>{content.company.heroSubtitle}</p>
                    <div className={styles.buttons}>
                        <button className="btn btn-primary" onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}>
                            Get a Quote
                        </button>
                        <button className="btn btn-outline" onClick={() => document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' })}>
                            Our Portfolio
                        </button>
                    </div>
                    <div className={styles.stats}>
                        <div className={styles.stat}>
                            <span className={styles.statNum}>50+</span>
                            <span className={styles.statLabel}>Projects Delivered</span>
                        </div>
                        <div className={styles.statDivider}></div>
                        <div className={styles.stat}>
                            <span className={styles.statNum}>30+</span>
                            <span className={styles.statLabel}>Happy Clients</span>
                        </div>
                        <div className={styles.statDivider}></div>
                        <div className={styles.stat}>
                            <span className={styles.statNum}>99%</span>
                            <span className={styles.statLabel}>Satisfaction</span>
                        </div>
                    </div>
                </div>

                <div className={`${styles.right} slide-in-right`}>
                    <div className={styles.heroVisual}>
                        <div className={styles.circuitPattern}>
                            <div className={styles.floatingCard} style={{ animationDelay: '0s' }}>
                                <span>🌐</span>
                                <span>Websites</span>
                            </div>
                            <div className={styles.floatingCard} style={{ animationDelay: '0.5s' }}>
                                <span>📱</span>
                                <span>Apps</span>
                            </div>
                            <div className={styles.floatingCard} style={{ animationDelay: '1s' }}>
                                <span>⭐</span>
                                <span>ScanReview</span>
                            </div>
                            <div className={styles.floatingCard} style={{ animationDelay: '1.5s' }}>
                                <span>🖥️</span>
                                <span>POS</span>
                            </div>
                            <div className={styles.floatingCard} style={{ animationDelay: '2s' }}>
                                <span>🔗</span>
                                <span>CRM</span>
                            </div>
                            <div className={styles.centerLogo}>
                                <img src="/LOGO.png" alt="ScaleLink" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className={styles.scrollIndicator}>
                <span>scroll</span>
                <div className={styles.scrollLine}></div>
            </div>
        </section>
    );
}

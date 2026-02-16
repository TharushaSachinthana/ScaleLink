'use client';

import { useContent } from '../contexts/ContentContext';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import styles from './About.module.css';

export default function About() {
    const { content } = useContent();
    const ref = useScrollAnimation();

    return (
        <section id="about" className={styles.about} ref={ref}>
            <div className={`container ${styles.inner}`}>
                <div className={`${styles.imageGrid} zoom-in`}>
                    <div className={`${styles.imgWrapper} ${styles.img1}`}>
                        <div className={styles.imgPlaceholder}>
                            <span>💇‍♀️</span>
                        </div>
                    </div>
                    <div className={`${styles.imgWrapper} ${styles.img2}`}>
                        <div className={styles.imgPlaceholder}>
                            <span>💻</span>
                        </div>
                    </div>
                    <div className={`${styles.imgWrapper} ${styles.img3}`}>
                        <div className={styles.imgPlaceholder}>
                            <span>📊</span>
                        </div>
                    </div>
                    <div className={styles.overlayText}>
                        <h2>{content.company.aboutTitle}</h2>
                    </div>
                </div>

                <div className={`${styles.textContent} animate-on-scroll delay-2`}>
                    <span className="section-label">About Us</span>
                    <h2 className="section-title">{content.company.aboutTitle}</h2>
                    <p className={styles.aboutP}>{content.company.aboutText}</p>
                    <p className={styles.aboutP}>{content.company.aboutText2}</p>
                    <button className="btn btn-gold" onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}>
                        Explore Our Services
                    </button>
                </div>
            </div>
        </section>
    );
}

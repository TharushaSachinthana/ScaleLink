'use client';

import { useContent } from '../contexts/ContentContext';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import styles from './Services.module.css';

export default function Services() {
    const { content } = useContent();
    const ref = useScrollAnimation();

    return (
        <section id="services" className={styles.services} ref={ref}>
            <div className="container">
                <div className={`${styles.header} animate-on-scroll`}>
                    <span className="section-label">What We Offer</span>
                    <h2 className="section-title centered">Our Services</h2>
                    <p className="section-subtitle centered">
                        Comprehensive technology solutions designed to transform your salon business
                    </p>
                </div>

                <div className={styles.grid}>
                    {content.services.map((service, i) => (
                        <div key={service.id} className={`${styles.card} animate-on-scroll delay-${i + 1}`}>
                            <div className={styles.iconWrap}>
                                <span className={styles.icon}>{service.icon}</span>
                            </div>
                            <h3 className={styles.cardTitle}>{service.title}</h3>
                            <p className={styles.cardDesc}>{service.description}</p>
                            <div className={styles.cardArrow}>→</div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

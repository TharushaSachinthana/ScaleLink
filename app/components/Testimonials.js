'use client';

import { useState, useEffect, useCallback } from 'react';
import { useContent } from '../contexts/ContentContext';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import styles from './Testimonials.module.css';

export default function Testimonials() {
    const { content } = useContent();
    const ref = useScrollAnimation();
    const [current, setCurrent] = useState(0);

    const next = useCallback(() => {
        setCurrent(prev => (prev + 1) % content.testimonials.length);
    }, [content.testimonials.length]);

    const prev = useCallback(() => {
        setCurrent(prev => (prev - 1 + content.testimonials.length) % content.testimonials.length);
    }, [content.testimonials.length]);

    useEffect(() => {
        const timer = setInterval(next, 5000);
        return () => clearInterval(timer);
    }, [next]);

    const testimonial = content.testimonials[current];

    return (
        <section className={styles.testimonials} ref={ref}>
            <div className={`container ${styles.inner}`}>
                <div className={`${styles.left} animate-on-scroll`}>
                    <span className="section-label">Testimonials</span>
                    <h2 className="section-title" style={{ color: 'var(--white)' }}>
                        Our Clients Praise Us for Great Results
                    </h2>
                    <div className="section-title" style={{ display: 'none' }}></div>
                </div>

                <div className={`${styles.right} animate-on-scroll delay-2`}>
                    <div className={styles.quoteIcon}>"</div>
                    <div className={styles.slider}>
                        <p className={styles.quote}>{testimonial.quote}</p>
                        <div className={styles.author}>
                            <div className={styles.avatar}>
                                {testimonial.name.charAt(0)}
                            </div>
                            <div>
                                <strong className={styles.name}>{testimonial.name}</strong>
                                <span className={styles.role}>
                                    {testimonial.title}, {testimonial.company}
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className={styles.controls}>
                        <button className={styles.arrow} onClick={prev}>←</button>
                        <div className={styles.dots}>
                            {content.testimonials.map((_, i) => (
                                <button
                                    key={i}
                                    className={`${styles.dot} ${i === current ? styles.activeDot : ''}`}
                                    onClick={() => setCurrent(i)}
                                />
                            ))}
                        </div>
                        <button className={styles.arrow} onClick={next}>→</button>
                    </div>
                </div>
            </div>
        </section>
    );
}

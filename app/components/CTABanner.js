'use client';

import { useScrollAnimation } from '../hooks/useScrollAnimation';
import styles from './CTABanner.module.css';

export default function CTABanner() {
    const ref = useScrollAnimation();

    return (
        <section id="contact" className={styles.cta} ref={ref}>
            <div className={`container ${styles.inner}`}>
                <div className="animate-on-scroll">
                    <h2 className={styles.title}>Your Digital Presence Matters!</h2>
                    <p className={styles.subtitle}>
                        Ready to scale your salon with cutting-edge technology? Let&apos;s make it happen together.
                    </p>
                    <div className={styles.buttons}>
                        <a href="#" className="btn btn-gold" style={{ fontSize: '1rem', padding: '16px 40px' }}>
                            Contact Us on WhatsApp
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
}

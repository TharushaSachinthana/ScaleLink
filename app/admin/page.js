'use client';

import { useState, useEffect } from 'react';
import { useContent, defaultContent } from '../contexts/ContentContext';
import styles from './admin.module.css';

const ADMIN_PASSWORD = 'scalelink2026';

export default function AdminPage() {
    const { content, updateContent, resetContent, isLoaded } = useContent();
    const [authenticated, setAuthenticated] = useState(false);
    const [password, setPassword] = useState('');
    const [activeTab, setActiveTab] = useState('company');
    const [editData, setEditData] = useState({});
    const [saveMsg, setSaveMsg] = useState('');

    useEffect(() => {
        if (isLoaded) {
            setEditData({ ...content });
        }
    }, [isLoaded, content]);

    const handleLogin = (e) => {
        e.preventDefault();
        if (password === ADMIN_PASSWORD) {
            setAuthenticated(true);
        } else {
            alert('Incorrect password');
        }
    };

    const save = (section) => {
        updateContent(section, editData[section]);
        setSaveMsg(`${section} saved!`);
        setTimeout(() => setSaveMsg(''), 2000);
    };

    const updateField = (section, field, value) => {
        setEditData(prev => ({
            ...prev,
            [section]: { ...prev[section], [field]: value }
        }));
    };

    const updateArrayItem = (section, index, field, value) => {
        setEditData(prev => {
            const arr = [...prev[section]];
            arr[index] = { ...arr[index], [field]: value };
            return { ...prev, [section]: arr };
        });
    };

    const addItem = (section, template) => {
        setEditData(prev => ({
            ...prev,
            [section]: [...prev[section], { ...template, id: Date.now() }]
        }));
    };

    const removeItem = (section, index) => {
        if (!confirm('Remove this item?')) return;
        setEditData(prev => ({
            ...prev,
            [section]: prev[section].filter((_, i) => i !== index)
        }));
    };

    if (!isLoaded) return <div className={styles.loading}>Loading...</div>;

    if (!authenticated) {
        return (
            <div className={styles.loginPage}>
                <form onSubmit={handleLogin} className={styles.loginForm}>
                    <img src="/LOGO.png" alt="ScaleLink" className={styles.loginLogo} />
                    <h1>Admin Panel</h1>
                    <p>Enter password to access the admin dashboard</p>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                        className={styles.input}
                    />
                    <button type="submit" className={styles.loginBtn}>Login</button>
                </form>
            </div>
        );
    }

    const tabs = [
        { key: 'company', label: 'Company Info', icon: '🏢' },
        { key: 'services', label: 'Services', icon: '⚙️' },
        { key: 'portfolio', label: 'Portfolio', icon: '📁' },
        { key: 'testimonials', label: 'Testimonials', icon: '💬' },
        { key: 'pillars', label: 'Pillars', icon: '🏛️' },
    ];

    return (
        <div className={styles.admin}>
            <aside className={styles.sidebar}>
                <div className={styles.sidebarHeader}>
                    <img src="/LOGO.png" alt="ScaleLink" className={styles.sidebarLogo} />
                    <span>Admin</span>
                </div>
                <nav className={styles.sidebarNav}>
                    {tabs.map(tab => (
                        <button
                            key={tab.key}
                            className={`${styles.tabBtn} ${activeTab === tab.key ? styles.activeTab : ''}`}
                            onClick={() => setActiveTab(tab.key)}
                        >
                            <span>{tab.icon}</span>
                            {tab.label}
                        </button>
                    ))}
                </nav>
                <div className={styles.sidebarBottom}>
                    <button className={styles.resetBtn} onClick={() => { if (confirm('Reset all content to defaults?')) resetContent(); }}>
                        Reset All
                    </button>
                    <a href="/" className={styles.viewSite}>← View Site</a>
                </div>
            </aside>

            <main className={styles.content}>
                <div className={styles.topBar}>
                    <h2>{tabs.find(t => t.key === activeTab)?.label}</h2>
                    {saveMsg && <span className={styles.saveMsg}>✓ {saveMsg}</span>}
                </div>

                <div className={styles.panel}>
                    {/* Company Info */}
                    {activeTab === 'company' && editData.company && (
                        <div className={styles.form}>
                            {[
                                ['tagline', 'Tagline / Hero Title'],
                                ['heroSubtitle', 'Hero Subtitle'],
                                ['aboutTitle', 'About Title'],
                                ['phone', 'Phone Number'],
                                ['location', 'Location'],
                                ['facebook', 'Facebook URL'],
                                ['linkedin', 'LinkedIn URL'],
                                ['tiktok', 'TikTok URL'],
                                ['whatsapp', 'WhatsApp Link'],
                            ].map(([field, label]) => (
                                <div key={field} className={styles.field}>
                                    <label>{label}</label>
                                    <input
                                        type="text"
                                        value={editData.company[field] || ''}
                                        onChange={(e) => updateField('company', field, e.target.value)}
                                        className={styles.input}
                                    />
                                </div>
                            ))}
                            {['aboutText', 'aboutText2'].map((field) => (
                                <div key={field} className={styles.field}>
                                    <label>{field === 'aboutText' ? 'About Text (Paragraph 1)' : 'About Text (Paragraph 2)'}</label>
                                    <textarea
                                        value={editData.company[field] || ''}
                                        onChange={(e) => updateField('company', field, e.target.value)}
                                        className={styles.textarea}
                                        rows={4}
                                    />
                                </div>
                            ))}
                            <button className={styles.saveBtn} onClick={() => save('company')}>Save Company Info</button>
                        </div>
                    )}

                    {/* Services */}
                    {activeTab === 'services' && editData.services && (
                        <div className={styles.form}>
                            {editData.services.map((service, i) => (
                                <div key={service.id} className={styles.card}>
                                    <div className={styles.cardHeader}>
                                        <h4>{service.icon} {service.title || 'New Service'}</h4>
                                        <button className={styles.removeBtn} onClick={() => removeItem('services', i)}>✕</button>
                                    </div>
                                    <div className={styles.fieldRow}>
                                        <div className={styles.field}>
                                            <label>Icon (emoji)</label>
                                            <input value={service.icon} onChange={(e) => updateArrayItem('services', i, 'icon', e.target.value)} className={styles.input} />
                                        </div>
                                        <div className={styles.field}>
                                            <label>Title</label>
                                            <input value={service.title} onChange={(e) => updateArrayItem('services', i, 'title', e.target.value)} className={styles.input} />
                                        </div>
                                    </div>
                                    <div className={styles.field}>
                                        <label>Description</label>
                                        <textarea value={service.description} onChange={(e) => updateArrayItem('services', i, 'description', e.target.value)} className={styles.textarea} rows={2} />
                                    </div>
                                </div>
                            ))}
                            <button className={styles.addBtn} onClick={() => addItem('services', { icon: '🆕', title: '', description: '' })}>+ Add Service</button>
                            <button className={styles.saveBtn} onClick={() => save('services')}>Save Services</button>
                        </div>
                    )}

                    {/* Portfolio */}
                    {activeTab === 'portfolio' && editData.portfolio && (
                        <div className={styles.form}>
                            {editData.portfolio.map((project, i) => (
                                <div key={project.id} className={styles.card}>
                                    <div className={styles.cardHeader}>
                                        <h4>{project.title || 'New Project'}</h4>
                                        <button className={styles.removeBtn} onClick={() => removeItem('portfolio', i)}>✕</button>
                                    </div>
                                    <div className={styles.fieldRow}>
                                        <div className={styles.field}>
                                            <label>Title</label>
                                            <input value={project.title} onChange={(e) => updateArrayItem('portfolio', i, 'title', e.target.value)} className={styles.input} />
                                        </div>
                                        <div className={styles.field}>
                                            <label>Category</label>
                                            <select value={project.category} onChange={(e) => updateArrayItem('portfolio', i, 'category', e.target.value)} className={styles.input}>
                                                <option>Websites</option>
                                                <option>Mobile Apps</option>
                                                <option>POS</option>
                                                <option>CRM</option>
                                                <option>Social Media</option>
                                                <option>ScanReview</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className={styles.field}>
                                        <label>Description</label>
                                        <input value={project.description} onChange={(e) => updateArrayItem('portfolio', i, 'description', e.target.value)} className={styles.input} />
                                    </div>
                                    <div className={styles.field}>
                                        <label>Image URL</label>
                                        <input value={project.image} onChange={(e) => updateArrayItem('portfolio', i, 'image', e.target.value)} className={styles.input} placeholder="https://..." />
                                    </div>
                                </div>
                            ))}
                            <button className={styles.addBtn} onClick={() => addItem('portfolio', { title: '', category: 'Websites', description: '', image: '' })}>+ Add Project</button>
                            <button className={styles.saveBtn} onClick={() => save('portfolio')}>Save Portfolio</button>
                        </div>
                    )}

                    {/* Testimonials */}
                    {activeTab === 'testimonials' && editData.testimonials && (
                        <div className={styles.form}>
                            {editData.testimonials.map((test, i) => (
                                <div key={test.id} className={styles.card}>
                                    <div className={styles.cardHeader}>
                                        <h4>{test.name || 'New Testimonial'}</h4>
                                        <button className={styles.removeBtn} onClick={() => removeItem('testimonials', i)}>✕</button>
                                    </div>
                                    <div className={styles.field}>
                                        <label>Quote</label>
                                        <textarea value={test.quote} onChange={(e) => updateArrayItem('testimonials', i, 'quote', e.target.value)} className={styles.textarea} rows={3} />
                                    </div>
                                    <div className={styles.fieldRow}>
                                        <div className={styles.field}>
                                            <label>Name</label>
                                            <input value={test.name} onChange={(e) => updateArrayItem('testimonials', i, 'name', e.target.value)} className={styles.input} />
                                        </div>
                                        <div className={styles.field}>
                                            <label>Title/Role</label>
                                            <input value={test.title} onChange={(e) => updateArrayItem('testimonials', i, 'title', e.target.value)} className={styles.input} />
                                        </div>
                                        <div className={styles.field}>
                                            <label>Company</label>
                                            <input value={test.company} onChange={(e) => updateArrayItem('testimonials', i, 'company', e.target.value)} className={styles.input} />
                                        </div>
                                    </div>
                                </div>
                            ))}
                            <button className={styles.addBtn} onClick={() => addItem('testimonials', { quote: '', name: '', title: '', company: '' })}>+ Add Testimonial</button>
                            <button className={styles.saveBtn} onClick={() => save('testimonials')}>Save Testimonials</button>
                        </div>
                    )}

                    {/* Pillars */}
                    {activeTab === 'pillars' && editData.pillars && (
                        <div className={styles.form}>
                            {editData.pillars.map((pillar, i) => (
                                <div key={pillar.id} className={styles.card}>
                                    <div className={styles.cardHeader}>
                                        <h4>{pillar.icon} {pillar.title || 'New Pillar'}</h4>
                                        <button className={styles.removeBtn} onClick={() => removeItem('pillars', i)}>✕</button>
                                    </div>
                                    <div className={styles.fieldRow}>
                                        <div className={styles.field}>
                                            <label>Icon (emoji)</label>
                                            <input value={pillar.icon} onChange={(e) => updateArrayItem('pillars', i, 'icon', e.target.value)} className={styles.input} />
                                        </div>
                                        <div className={styles.field}>
                                            <label>Title</label>
                                            <input value={pillar.title} onChange={(e) => updateArrayItem('pillars', i, 'title', e.target.value)} className={styles.input} />
                                        </div>
                                        <div className={styles.field}>
                                            <label>Subtitle</label>
                                            <input value={pillar.subtitle} onChange={(e) => updateArrayItem('pillars', i, 'subtitle', e.target.value)} className={styles.input} />
                                        </div>
                                    </div>
                                    <div className={styles.field}>
                                        <label>Description</label>
                                        <textarea value={pillar.description} onChange={(e) => updateArrayItem('pillars', i, 'description', e.target.value)} className={styles.textarea} rows={2} />
                                    </div>
                                </div>
                            ))}
                            <button className={styles.saveBtn} onClick={() => save('pillars')}>Save Pillars</button>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}

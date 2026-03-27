import React, { useEffect, useState } from 'react';
import { Award, Users, Sparkles, Bell, Calendar, ChevronRight } from 'lucide-react';
import './Home.css';

const Home = () => {
    const [notices, setNotices] = useState([]);

    useEffect(() => {
        setNotices([
            { id: 1, title: 'Semester Exams Scheduled for Next Month', date: 'Apr 10, 2026' },
            { id: 2, title: 'Guest Lecture by Industry Experts on AI/ML', date: 'Mar 28, 2026' },
            { id: 3, title: 'Holiday Notice: Republic Day Celebrations', date: 'Jan 26, 2026' },
            { id: 4, title: 'Annual Sports Week Registration Open', date: 'Mar 15, 2026' }
        ]);
    }, []);

    return (
        <div className="home">
            <header className="hero">
                <div className="hero-content">
                    <h1>Welcome to Loyola Institute of Technology and Management</h1>
                    <p>Empowering minds, shaping futures. Excellence in education with state-of-the-art facilities and industry-ready programs.</p>
                    <button className="cta-button">
                        Explore Courses
                        <ChevronRight size={20} style={{ marginLeft: 8, display: 'inline' }} />
                    </button>
                </div>
            </header>

            <section className="highlights">
                <div className="container">
                    <h2>Why Choose LITAM?</h2>
                    <div className="highlight-grid">
                        <div className="highlight-card">
                            <div style={{ marginBottom: 20 }}>
                                <Award size={48} style={{ color: '#667eea' }} />
                            </div>
                            <h3>Academic Excellence</h3>
                            <p>State-of-the-art laboratories, experienced faculty, and industry-aligned curriculum designed for the future.</p>
                        </div>
                        <div className="highlight-card">
                            <div style={{ marginBottom: 20 }}>
                                <Users size={48} style={{ color: '#10b981' }} />
                            </div>
                            <h3>Strong Placements</h3>
                            <p>95%+ placement rate with top-tier companies. Dedicated training and career development programs.</p>
                        </div>
                        <div className="highlight-card">
                            <div style={{ marginBottom: 20 }}>
                                <Sparkles size={48} style={{ color: '#f59e0b' }} />
                            </div>
                            <h3>Vibrant Campus</h3>
                            <p>Inclusive community with cultural events, sports facilities, and a supportive learning environment.</p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="latest-notices">
                <div className="container">
                    <h2>
                        <Bell size={28} style={{ marginRight: 12 }} />
                        Latest Announcements
                    </h2>
                    <div className="notice-list">
                        {notices.map(notice => (
                            <div key={notice.id} className="notice-item">
                                <span className="notice-date">
                                    <Calendar size={14} style={{ marginRight: 6 }} />
                                    {notice.date}
                                </span>
                                <p className="notice-title">{notice.title}</p>
                            </div>
                        ))}
                        {notices.length === 0 && <p style={{ color: 'rgba(255,255,255,0.5)', textAlign: 'center' }}>No recent announcements.</p>}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
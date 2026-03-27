import React, { useEffect, useState } from 'react';
import { getNotices } from '../services/api';
import { Bell, Calendar, ChevronRight, Megaphone, Info, AlertTriangle, Clock } from 'lucide-react';
import './Notices.css';

const Notices = () => {
    const [notices, setNotices] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchNotices = async () => {
            try {
                const response = await getNotices();
                setNotices(response.data);
            } catch (error) {
                console.error('Error fetching notices:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchNotices();
    }, []);

    const localNotices = [
        { id: 'n1', title: 'Winter Semester Registration Open', description: 'Students can now register for the upcoming winter semester through the portal. Deadline: Dec 15th.', date: '2025-11-20', type: 'urgent' },
        { id: 'n2', title: 'Campus Placement Drive - Tech Mahindra', description: 'A recruitment drive for final year B.Tech students will be held on Campus from Dec 5th.', date: '2025-11-18', type: 'event' },
        { id: 'n3', title: 'Library Renovation Period', description: 'The central library will be partially closed for digital upgrade between Nov 25-30.', date: '2025-11-15', type: 'info' }
    ];

    const displayNotices = notices.length > 0 ? notices : localNotices;

    if (loading) return (
        <div className="loader-container">
            <div className="spinner"></div>
            <p>Fetching latest announcements...</p>
        </div>
    );

    return (
        <div className="notices-page">
            <div className="hero-section">
                <div className="container">
                    <div className="icon-badge">
                        <Bell size={18} />
                        <span>Live Updates</span>
                    </div>
                    <h1>Announcements</h1>
                    <p>Stay informed with the latest news, academic updates, and campus events from LITAM.</p>
                </div>
            </div>

            <div className="container">
                <div className="notices-timeline">
                    {displayNotices.map((notice, index) => (
                        <div key={notice.id} className="notice-item shadow-glow" style={{ animationDelay: `${index * 0.1}s` }}>
                            <div className="notice-date-side">
                                <div className="date-box">
                                    <span className="day">{new Date(notice.date).getDate()}</span>
                                    <span className="month">{new Date(notice.date).toLocaleDateString('default', { month: 'short' })}</span>
                                </div>
                                <div className="timeline-line"></div>
                            </div>
                            <div className="notice-content-card glass-card">
                                <div className="notice-type-tag">
                                    {notice.type === 'urgent' ? <AlertTriangle size={14} /> : <Megaphone size={14} />}
                                    <span>{notice.type || 'Notice'}</span>
                                </div>
                                <h3 className="notice-title">{notice.title}</h3>
                                <p className="notice-desc">{notice.description}</p>
                                <div className="notice-footer">
                                    <div className="post-time">
                                        <Clock size={14} />
                                        <span>Posted {new Date(notice.date).toLocaleDateString()}</span>
                                    </div>
                                    <button className="read-more-link">
                                        <span>Attached Documents</span>
                                        <ChevronRight size={16} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                    {displayNotices.length === 0 && (
                        <div className="no-data-v2">
                            <Info size={48} color="rgba(255,255,255,0.1)" />
                            <p>All caught up! No new announcements today.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Notices;

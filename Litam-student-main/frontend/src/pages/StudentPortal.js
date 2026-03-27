import React, { useEffect, useState } from 'react';
import { getStudentResources } from '../services/api';
import { 
    Download, FileText, Calendar, Clock, 
    ArrowRight, BookOpen, Layout, Search,
    FileSpreadsheet, FileCheck, ExternalLink
} from 'lucide-react';
import './StudentPortal.css';

const StudentPortal = () => {
    const [resources, setResources] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchResources = async () => {
            try {
                const response = await getStudentResources();
                setResources(response.data);
            } catch (error) {
                console.error('Error fetching resources:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchResources();
    }, []);

    const filterResources = (type) => resources.filter(res => res.type === type);

    const localResources = [
        { id: 't1', title: 'Semester 4 Time Table - CSE', type: 'timetable', file: '#' },
        { id: 'n1', title: 'Advanced Data Structures - Unit 1 Notes', type: 'notes', file: '#' },
        { id: 'r1', title: 'Mid-term Results - Nov 2025', type: 'results', file: '#' }
    ];

    const allResources = resources.length > 0 ? resources : localResources;

    if (loading) return (
        <div className="loader-container">
            <div className="spinner"></div>
            <p>Accessing Student Resources...</p>
        </div>
    );

    const ResourceSection = ({ title, icon: Icon, type, colorClass }) => {
        const items = allResources.filter(res => res.type === type);
        return (
            <div className="resource-section">
                <div className="section-header">
                    <div className={`section-icon ${colorClass}`}>
                        <Icon size={24} />
                    </div>
                    <h2>{title}</h2>
                </div>
                <div className="resource-grid">
                    {items.length > 0 ? (
                        items.map(res => (
                            <div key={res.id} className="resource-card glass-card">
                                <div className="card-inner">
                                    <FileText size={40} className="file-icon" />
                                    <div className="res-details">
                                        <h3>{res.title}</h3>
                                        <div className="res-meta">
                                            <span>PDF Document</span>
                                            <span className="dot"></span>
                                            <span>2.4 MB</span>
                                        </div>
                                    </div>
                                    <a href={res.file} target="_blank" rel="noopener noreferrer" className="download-action shadow-glow">
                                        {type === 'results' ? <ExternalLink size={18} /> : <Download size={18} />}
                                    </a>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="empty-section">
                            <Search size={32} />
                            <p>No {title.toLowerCase()} available.</p>
                        </div>
                    )}
                </div>
            </div>
        );
    };

    return (
        <div className="student-portal">
            <div className="hero-section">
                <div className="container">
                    <div className="icon-badge">
                        <Layout size={18} />
                        <span>Centralized Hub</span>
                    </div>
                    <h1>Student Portal</h1>
                    <p>Access your study materials, academic schedules, and performance records in one secure location.</p>
                </div>
            </div>

            <div className="container">
                <ResourceSection title="Academic Notes" icon={BookOpen} type="notes" colorClass="blue" />
                <ResourceSection title="Exam Timetables" icon={Calendar} type="timetable" colorClass="green" />
                <ResourceSection title="Result Archive" icon={FileCheck} type="results" colorClass="yellow" />
            </div>
        </div>
    );
};

export default StudentPortal;

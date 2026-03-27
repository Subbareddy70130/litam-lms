import React, { useEffect, useState } from 'react';
import { getFaculty } from '../services/api';
import { Users, Mail, GraduationCap, Award, ChevronRight, User } from 'lucide-react';
import './Faculty.css';

const Faculty = () => {
    const [facultyList, setFacultyList] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchFaculty = async () => {
            try {
                const response = await getFaculty();
                setFacultyList(response.data);
            } catch (error) {
                console.error('Error fetching faculty:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchFaculty();
    }, []);

    const localFaculty = [
        { id: 'f1', name: 'Dr. John Doe', department: 'Computer Science', qualification: 'Ph.D in AI/ML', image: '/images/processed-38ec4f37-6aaa-4337-bb5e-dcb51e50613f_FEUqdgnj-300x300.jpeg' },
        { id: 'f2', name: 'Prof. Sarah Smith', department: 'Electronics', qualification: 'M.Tech, (Ph.D)', image: '/images/A4-1.jpg' },
        { id: 'f3', name: 'Dr. Michael Chen', department: 'Management', qualification: 'MBA, Ph.D', image: '/images/college.jpg' }
    ];

    const displayFaculty = facultyList.length > 0 ? facultyList : localFaculty;

    if (loading) return (
        <div className="loader-container">
            <div className="spinner"></div>
            <p>Loading Faculty Profiles...</p>
        </div>
    );

    return (
        <div className="faculty-page">
            <div className="hero-section">
                <div className="container">
                    <div className="icon-badge">
                        <Users size={20} />
                        <span>Academic Mentors</span>
                    </div>
                    <h1>Our Faculty</h1>
                    <p>Learn from high-achieving professionals and researchers dedicated to your academic and professional growth.</p>
                </div>
            </div>

            <div className="container">
                <div className="faculty-grid">
                    {displayFaculty.map((faculty, index) => (
                        <div key={faculty.id} className="faculty-card glass-card shadow-glow" style={{ animationDelay: `${index * 0.1}s` }}>
                            <div className="faculty-image-container">
                                <img src={faculty.image} alt={faculty.name} className="faculty-img" />
                                <div className="faculty-overlay">
                                    <button className="contact-icon-btn"><Mail size={18} /></button>
                                </div>
                            </div>
                            <div className="faculty-details">
                                <h3 className="faculty-name">{faculty.name}</h3>
                                <div className="faculty-tag blue">{faculty.department}</div>
                                <div className="faculty-meta">
                                    <GraduationCap size={14} />
                                    <span>{faculty.qualification}</span>
                                </div>
                                <div className="faculty-meta">
                                    <Award size={14} />
                                    <span>Senior Professor</span>
                                </div>
                            </div>
                            <div className="card-footer">
                                <button className="view-profile-btn">
                                    <span>View Profile</span>
                                    <ChevronRight size={16} />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
                {displayFaculty.length === 0 && (
                    <div className="no-data">
                        <User size={48} color="rgba(255,255,255,0.2)" />
                        <p>No faculty profiles listed at the moment.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Faculty;

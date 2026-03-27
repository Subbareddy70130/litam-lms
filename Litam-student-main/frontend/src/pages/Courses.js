import React, { useEffect, useState } from 'react';
import { getCourses } from '../services/api';
import { BookOpen, Clock, Award, GraduationCap, ChevronRight, Search } from 'lucide-react';
import './Courses.css';

const Courses = () => {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await getCourses();
                setCourses(response.data);
            } catch (error) {
                console.error('Error fetching courses:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchCourses();
    }, []);

    const localCourses = [
        { id: 'l1', title: 'B.Tech in Computer Science & Engineering', duration: '4 Years', eligibility: '10+2 with PCM', icon: <BookOpen size={24} /> },
        { id: 'l2', title: 'B.Tech in Electronics & Communication', duration: '4 Years', eligibility: '10+2 with PCM', icon: <CpuIcon /> },
        { id: 'l3', title: 'MBA - Business Administration', duration: '2 Years', eligibility: 'Any Graduation', icon: <GraduationCap size={24} /> },
        { id: 'l4', title: 'M.Tech in Structural Engineering', duration: '2 Years', eligibility: 'B.Tech in Civil', icon: <Award size={24} /> }
    ];

    const displayCourses = courses.length > 0 ? courses : localCourses;

    if (loading) return (
        <div className="loader-container">
            <div className="spinner"></div>
            <p>Loading Academic Programs...</p>
        </div>
    );

    return (
        <div className="courses-page">
            <div className="hero-section">
                <div className="container">
                    <div className="icon-badge">
                        <GraduationCap size={20} />
                        <span>Academic Excellence</span>
                    </div>
                    <h1>Our Programs</h1>
                    <p>Discover industry-aligned engineering and management programs designed to shape your future career.</p>
                </div>
            </div>

            <div className="container">
                <div className="courses-grid">
                    {displayCourses.map((course, index) => (
                        <div key={course.id} className="course-card glass-card shadow-glow" style={{ animationDelay: `${index * 0.1}s` }}>
                            <div className="card-top">
                                <div className="course-icon">{course.icon || <BookOpen size={24} />}</div>
                                <h3>{course.title}</h3>
                            </div>
                            <div className="course-info">
                                <div className="info-row">
                                    <Clock size={16} className="icon-blue" />
                                    <span><strong>Duration:</strong> {course.duration}</span>
                                </div>
                                <div className="info-row">
                                    <Award size={16} className="icon-green" />
                                    <span><strong>Eligibility:</strong> {course.eligibility}</span>
                                </div>
                            </div>
                            <button className="learn-more-btn">
                                <span>Explore Curriculum</span>
                                <ChevronRight size={18} />
                            </button>
                        </div>
                    ))}
                    {displayCourses.length === 0 && (
                        <div className="no-data">
                            <Search size={48} color="rgba(255,255,255,0.2)" />
                            <p>No courses listed at the moment.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

const CpuIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="4" y="4" width="16" height="16" rx="2" ry="2" />
        <rect x="9" y="9" width="6" height="6" />
        <line x1="9" y1="1" x2="9" y2="4" />
        <line x1="15" y1="1" x2="15" y2="4" />
        <line x1="9" y1="20" x2="9" y2="23" />
        <line x1="15" y1="20" x2="15" y2="23" />
        <line x1="20" y1="9" x2="23" y2="9" />
        <line x1="20" y1="15" x2="23" y2="15" />
        <line x1="1" y1="9" x2="4" y2="9" />
        <line x1="1" y1="15" x2="4" y2="15" />
    </svg>
);

export default Courses;

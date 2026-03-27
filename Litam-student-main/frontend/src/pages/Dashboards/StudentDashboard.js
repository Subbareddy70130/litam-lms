import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getStudentDashboard } from '../../services/api';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import {
    LogOut, User, BookOpen, Award, TrendingUp, Calendar,
    Target, CheckCircle, XCircle, BarChart3, Clock, CalendarDays,
    ClipboardCheck, Search, MessageSquare, Home, Library,
    GraduationCap, BookMarked, LayoutDashboard, Clock3, ChevronRight, X, FileText
} from 'lucide-react';
import Sidebar, { studentMenuItems } from '../../components/Sidebar';

ChartJS.register(ArcElement, Tooltip, Legend);

const StudentDashboard = () => {
    const navigate = useNavigate();
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('overview');

    useEffect(() => {
        const fetchDashboard = async () => {
            try {
                const res = await getStudentDashboard();
                setData(res.data);
            } catch (err) {
                console.error("Failed to load dashboard", err);
            } finally {
                setLoading(false);
            }
        };
        fetchDashboard();
    }, []);

    const handleLogout = () => {
        localStorage.clear();
        navigate('/login');
    };

    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
    
    if (loading) return <LoadingScreen />;
    if (!data) return <ErrorScreen />;

    const { profile, academic_stats, marks } = data;

    return (
        <div style={styles.container}>
            {/* Animated Background */}
            <div style={styles.bgOrb1} />
            <div style={styles.bgOrb2} />

            {/* Sidebar */}
            <Sidebar
                menuItems={studentMenuItems}
                activeTab={activeTab}
                onTabChange={setActiveTab}
                sidebarCollapsed={sidebarCollapsed}
                setSidebarCollapsed={setSidebarCollapsed}
                onLogout={handleLogout}
                title="Student Portal"
                subtitle="Dashboard"
            />

            {/* Main Content */}
            <main style={styles.main}>
                {/* Header */}
                <header style={styles.header}>
                    <div>
                        <h1 style={styles.heading}>
                            Welcome back, <span style={styles.highlight}>{profile.roll_number}</span>
                        </h1>
                        <p style={styles.subheading}>
                            {getSubheading(activeTab)}
                        </p>
                    </div>
                    <div style={styles.headerRight}>
                        <div style={styles.dateCard}>
                            <Calendar size={18} />
                            <span>{new Date().toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}</span>
                        </div>
                    </div>
                </header>

                {/* Tab Content */}
                {renderTabContent(activeTab, { profile, academic_stats, marks })}
            </main>
        </div>
    );
};

// Component for stat cards
const StatCard = ({ icon: Icon, label, value, gradient }) => (
    <div style={{ ...styles.statCard, background: gradient }}>
        <div style={styles.statIcon}>
            <Icon size={24} color="white" />
        </div>
        <div>
            <p style={styles.statLabel}>{label}</p>
            <h4 style={styles.statValue}>{value}</h4>
        </div>
    </div>
);

const LoadingScreen = () => (
    <div style={styles.loadingContainer}>
        <div style={styles.spinner} />
        <p style={styles.loadingText}>Loading Dashboard...</p>
    </div>
);

const ErrorScreen = () => (
    <div style={styles.loadingContainer}>
        <XCircle size={48} style={{ color: '#ef4444' }} />
        <p style={{ ...styles.loadingText, color: '#ef4444' }}>Failed to load profile</p>
    </div>
);

const GraduationIcon = () => (
    <div style={styles.logoIcon}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
            <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
            <path d="M6 12v5c3 3 9 3 12 0v-5" />
        </svg>
    </div>
);

// Helper to get subheading based on active tab
const getSubheading = (tab) => {
    const subheadings = {
        'overview': "Here's your academic progress at a glance",
        'profile': 'Manage your personal information and settings',
        'academic-calendar': 'View important academic dates and events',
        'attendance': 'Track your attendance across all subjects',
        'book-search': 'Search for books in the college library',
        'library-books': 'View your borrowed and reserved books',
        'marks': 'Check your academic performance and grades',
        'my-subjects': 'View your enrolled subjects and courses',
        'time-table': 'Access your class schedule and timings',
        'day-schedule': 'View your daily routine and activities',
        'resources': 'Download study materials and resources',
        'student-forms': 'Access and submit academic forms',
        'hostel-biometric': 'View your hostel attendance records',
        'feedback': 'Submit feedback for courses and faculty',
    };
    return subheadings[tab] || 'Welcome to your student dashboard';
};

// Content components for each tab
const OverviewContent = ({ profile, academic_stats, marks }) => (
    <>
        {/* Stats Cards */}
        <div style={contentStyles.statsGrid}>
            <StatCard
                icon={User}
                label="Roll Number"
                value={profile.roll_number}
                gradient="linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
            />
            <StatCard
                icon={BookOpen}
                label="Department"
                value={profile.department}
                gradient="linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)"
            />
            <StatCard
                icon={TrendingUp}
                label="Attendance"
                value={`${academic_stats.attendance_percentage}%`}
                gradient="linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)"
            />
            <StatCard
                icon={Target}
                label="Year"
                value={`Year ${profile.year}`}
                gradient="linear-gradient(135deg, #fa709a 0%, #fee140 100%)"
            />
        </div>

        {/* Charts Row */}
        <div style={contentStyles.chartsGrid}>
            <div style={contentStyles.chartCard}>
                <div style={contentStyles.cardHeader}>
                    <CheckCircle size={20} style={{ color: '#10b981' }} />
                    <h3 style={contentStyles.cardTitle}>Attendance Overview</h3>
                </div>
                <div style={contentStyles.chartContainer}>
                    <div style={contentStyles.attendanceCircle}>
                        <svg width="160" height="160" viewBox="0 0 160 160">
                            <circle cx="80" cy="80" r="70" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="12" />
                            <circle
                                cx="80" cy="80" r="70"
                                fill="none"
                                stroke="url(#gradient1)"
                                strokeWidth="12"
                                strokeLinecap="round"
                                strokeDasharray={`${academic_stats.attendance_percentage * 4.4} 440`}
                                transform="rotate(-90 80 80)"
                            />
                            <defs>
                                <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="0%">
                                    <stop offset="0%" stopColor="#4facfe" />
                                    <stop offset="100%" stopColor="#00f2fe" />
                                </linearGradient>
                            </defs>
                        </svg>
                        <div style={contentStyles.attendanceValue}>
                            <span style={contentStyles.attendancePercent}>{academic_stats.attendance_percentage}</span>
                            <span style={contentStyles.attendanceLabel}>%</span>
                        </div>
                    </div>
                    <div style={contentStyles.attendanceStatus}>
                        <span style={{
                            ...contentStyles.statusBadge,
                            background: academic_stats.attendance_percentage >= 75 ? 'rgba(16, 185, 129, 0.2)' : 'rgba(239, 68, 68, 0.2)',
                            color: academic_stats.attendance_percentage >= 75 ? '#10b981' : '#ef4444'
                        }}>
                            {academic_stats.attendance_percentage >= 75 ? 'Good Standing' : 'Needs Improvement'}
                        </span>
                    </div>
                </div>
            </div>

            <div style={contentStyles.chartCard}>
                <div style={contentStyles.cardHeader}>
                    <Award size={20} style={{ color: '#f59e0b' }} />
                    <h3 style={contentStyles.cardTitle}>Subject Performance</h3>
                </div>
                <div style={contentStyles.chartContainer}>
                    <Doughnut
                        data={{
                            labels: ['Passed', 'Failed'],
                            datasets: [{
                                data: [academic_stats.passed_subjects, academic_stats.failed_subjects],
                                backgroundColor: ['#10b981', '#ef4444'],
                                borderWidth: 0,
                                cutout: '70%'
                            }]
                        }}
                        options={{
                            responsive: true,
                            maintainAspectRatio: true,
                            plugins: {
                                legend: {
                                    position: 'bottom',
                                    labels: { color: 'rgba(255,255,255,0.7)', padding: 20, font: { size: 12 } }
                                }
                            }
                        }}
                    />
                </div>
            </div>
        </div>

        {/* Results Table */}
        <div style={contentStyles.tableCard}>
            <div style={contentStyles.cardHeader}>
                <Award size={20} style={{ color: '#667eea' }} />
                <h3 style={contentStyles.cardTitle}>Exam Results</h3>
            </div>
            {marks.length === 0 ? (
                <div style={contentStyles.emptyState}>
                    <Clock size={48} style={{ color: 'rgba(255,255,255,0.3)' }} />
                    <p style={contentStyles.emptyText}>No results uploaded yet</p>
                </div>
            ) : (
                <div style={contentStyles.tableWrapper}>
                    <table style={contentStyles.table}>
                        <thead>
                            <tr style={contentStyles.tableHeaderRow}>
                                <th style={contentStyles.tableHeader}>Subject</th>
                                <th style={contentStyles.tableHeader}>Score</th>
                                <th style={contentStyles.tableHeader}>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {marks.map((m, i) => (
                                <tr key={i} style={contentStyles.tableRow}>
                                    <td style={contentStyles.tableCell}>{m.course_title}</td>
                                    <td style={contentStyles.tableCell}>{m.marks_obtained}/{m.total_marks}</td>
                                    <td style={contentStyles.tableCell}>
                                        <span style={{
                                            ...contentStyles.statusBadge,
                                            background: m.is_pass === 'PASS' ? 'rgba(16, 185, 129, 0.2)' : 'rgba(239, 68, 68, 0.2)',
                                            color: m.is_pass === 'PASS' ? '#10b981' : '#ef4444'
                                        }}>
                                            {m.is_pass === 'PASS' ? <CheckCircle size={14} /> : <XCircle size={14} />}
                                            {m.is_pass}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    </>
);

const PlaceholderContent = ({ title, icon: Icon, description }) => (
    <div style={contentStyles.placeholderCard}>
        <div style={contentStyles.placeholderIcon}>
            <Icon size={64} style={{ color: '#4facfe' }} />
        </div>
        <h2 style={contentStyles.placeholderTitle}>{title}</h2>
        <p style={contentStyles.placeholderText}>{description}</p>
        <div style={contentStyles.comingSoon}>
            <span style={contentStyles.comingSoonBadge}>Coming Soon</span>
        </div>
    </div>
);

// Main content renderer
const renderTabContent = (activeTab, data) => {
    const { profile, academic_stats, marks } = data;

    switch (activeTab) {
        case 'overview':
            return <OverviewContent profile={profile} academic_stats={academic_stats} marks={marks} />;
        case 'profile':
            return <ProfileContent profile={profile} />;
        case 'academic-calendar':
            return (
                <PlaceholderContent
                    title="Academic Calendar"
                    icon={CalendarDays}
                    description="View important academic dates, holidays, exam schedules, and college events throughout the year."
                />
            );
        case 'attendance':
            return <AttendanceContent attendance={academic_stats.attendance_percentage} />;
        case 'book-search':
            return (
                <PlaceholderContent
                    title="Book Search"
                    icon={Search}
                    description="Search the college library catalog to find books, journals, and other academic resources."
                />
            );
        case 'library-books':
            return (
                <PlaceholderContent
                    title="Library Books"
                    icon={Library}
                    description="View your borrowed books, due dates, and reservation status."
                />
            );
        case 'marks':
            return <MarksContent marks={marks} />;
        case 'my-subjects':
            return (
                <PlaceholderContent
                    title="My Subjects"
                    icon={BookMarked}
                    description="View all your enrolled subjects, credits, and faculty information."
                />
            );
        case 'time-table':
            return (
                <PlaceholderContent
                    title="Time Table"
                    icon={Calendar}
                    description="Access your complete class schedule with room numbers and faculty details."
                />
            );
        case 'day-schedule':
            return (
                <PlaceholderContent
                    title="Day Schedule"
                    icon={Clock3}
                    description="View your daily routine and upcoming activities for today."
                />
            );
        case 'resources':
            return (
                <PlaceholderContent
                    title="Resources"
                    icon={BookOpen}
                    description="Access study materials, lecture notes, assignments, and other academic resources."
                />
            );
        case 'student-forms':
            return (
                <PlaceholderContent
                    title="Student Forms"
                    icon={FileText}
                    description="Download and submit various academic forms like leave applications, certificates, etc."
                />
            );
        case 'hostel-biometric':
            return (
                <PlaceholderContent
                    title="Hostel Biometric"
                    icon={Home}
                    description="View your hostel attendance records and biometric entry/exit logs."
                />
            );
        case 'feedback':
            return (
                <PlaceholderContent
                    title="Feedback"
                    icon={MessageSquare}
                    description="Submit anonymous feedback about courses, faculty, and college facilities."
                />
            );
        default:
            return <OverviewContent profile={profile} academic_stats={academic_stats} marks={marks} />;
    }
};

// Additional content components
const ProfileContent = ({ profile }) => (
    <div style={contentStyles.card}>
        <div style={contentStyles.cardHeader}>
            <User size={24} style={{ color: '#4facfe' }} />
            <h2 style={contentStyles.cardTitle}>Personal Information</h2>
        </div>
        <div style={contentStyles.profileGrid}>
            {Object.entries(profile).map(([key, value]) => (
                <div key={key} style={contentStyles.profileItem}>
                    <label style={contentStyles.profileLabel}>{key.replace(/_/g, ' ').toUpperCase()}</label>
                    <div style={contentStyles.profileValue}>{value || 'N/A'}</div>
                </div>
            ))}
        </div>
    </div>
);

const AttendanceContent = ({ attendance }) => (
    <div style={contentStyles.card}>
        <div style={contentStyles.cardHeader}>
            <ClipboardCheck size={24} style={{ color: '#10b981' }} />
            <h2 style={contentStyles.cardTitle}>Attendance Record</h2>
        </div>
        <div style={contentStyles.attendanceSummary}>
            <div style={contentStyles.attendanceStat}>
                <span style={contentStyles.attendanceNumber}>{attendance}%</span>
                <span style={contentStyles.attendanceLabel}>Overall Attendance</span>
            </div>
            <div style={contentStyles.attendanceProgress}>
                <div style={{
                    ...contentStyles.progressBar,
                    width: `${attendance}%`,
                    background: attendance >= 75 ? '#10b981' : '#ef4444'
                }} />
            </div>
            <p style={contentStyles.attendanceNote}>
                {attendance >= 75
                    ? '✅ Your attendance is above the required 75% threshold. Keep it up!'
                    : '⚠️ Your attendance is below 75%. Please attend more classes to meet the requirement.'}
            </p>
        </div>
    </div>
);

const MarksContent = ({ marks }) => (
    <div style={contentStyles.card}>
        <div style={contentStyles.cardHeader}>
            <GraduationCap size={24} style={{ color: '#f59e0b' }} />
            <h2 style={contentStyles.cardTitle}>Academic Marks</h2>
        </div>
        {marks.length === 0 ? (
            <div style={contentStyles.emptyState}>
                <Clock size={48} style={{ color: 'rgba(255,255,255,0.3)' }} />
                <p style={contentStyles.emptyText}>No marks uploaded yet</p>
            </div>
        ) : (
            <div style={contentStyles.tableWrapper}>
                <table style={contentStyles.table}>
                    <thead>
                        <tr style={contentStyles.tableHeaderRow}>
                            <th style={contentStyles.tableHeader}>Subject</th>
                            <th style={contentStyles.tableHeader}>Score</th>
                            <th style={contentStyles.tableHeader}>Percentage</th>
                            <th style={contentStyles.tableHeader}>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {marks.map((m, i) => (
                            <tr key={i} style={contentStyles.tableRow}>
                                <td style={contentStyles.tableCell}>{m.course_title}</td>
                                <td style={contentStyles.tableCell}>{m.marks_obtained}/{m.total_marks}</td>
                                <td style={contentStyles.tableCell}>
                                    {Math.round((m.marks_obtained / m.total_marks) * 100)}%
                                </td>
                                <td style={contentStyles.tableCell}>
                                    <span style={{
                                        ...contentStyles.statusBadge,
                                        background: m.is_pass === 'PASS' ? 'rgba(16, 185, 129, 0.2)' : 'rgba(239, 68, 68, 0.2)',
                                        color: m.is_pass === 'PASS' ? '#10b981' : '#ef4444'
                                    }}>
                                        {m.is_pass === 'PASS' ? <CheckCircle size={14} /> : <XCircle size={14} />}
                                        {m.is_pass}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        )}
    </div>
);

// Content styles
const contentStyles = {
    statsGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        gap: '20px',
        marginBottom: '24px',
    },
    chartsGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '24px',
        marginBottom: '24px',
    },
    chartCard: {
        background: 'rgba(30, 41, 59, 0.6)',
        backdropFilter: 'blur(20px)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        borderRadius: '20px',
        padding: '24px',
    },
    tableCard: {
        background: 'rgba(30, 41, 59, 0.6)',
        backdropFilter: 'blur(20px)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        borderRadius: '20px',
        padding: '24px',
    },
    cardHeader: {
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        marginBottom: '20px',
    },
    cardTitle: {
        color: 'white',
        fontSize: '1.1rem',
        fontWeight: 600,
        margin: 0,
    },
    chartContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
    },
    attendanceCircle: {
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    attendanceValue: {
        position: 'absolute',
        display: 'flex',
        alignItems: 'baseline',
        gap: '2px',
    },
    attendancePercent: {
        fontSize: '2.5rem',
        fontWeight: 700,
        color: 'white',
    },
    attendanceLabel: {
        fontSize: '1rem',
        color: 'rgba(255, 255, 255, 0.5)',
    },
    attendanceStatus: {
        marginTop: '16px',
    },
    statusBadge: {
        display: 'inline-flex',
        alignItems: 'center',
        gap: '6px',
        padding: '6px 14px',
        borderRadius: '20px',
        fontSize: '0.85rem',
        fontWeight: 600,
    },
    tableWrapper: {
        overflowX: 'auto',
    },
    table: {
        width: '100%',
        borderCollapse: 'collapse',
    },
    tableHeaderRow: {
        background: 'rgba(255, 255, 255, 0.05)',
    },
    tableHeader: {
        padding: '16px',
        textAlign: 'left',
        color: 'rgba(255, 255, 255, 0.7)',
        fontSize: '0.85rem',
        fontWeight: 600,
        textTransform: 'uppercase',
        letterSpacing: '0.05em',
    },
    tableRow: {
        borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
        transition: 'background 0.2s ease',
    },
    tableCell: {
        padding: '16px',
        color: 'rgba(255, 255, 255, 0.9)',
        fontSize: '0.95rem',
    },
    emptyState: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '48px',
        gap: '16px',
    },
    emptyText: {
        color: 'rgba(255, 255, 255, 0.5)',
        fontSize: '1rem',
    },
    // Placeholder styles
    placeholderCard: {
        background: 'rgba(30, 41, 59, 0.6)',
        backdropFilter: 'blur(20px)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        borderRadius: '20px',
        padding: '60px 40px',
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '24px',
    },
    placeholderIcon: {
        width: '120px',
        height: '120px',
        background: 'rgba(79, 172, 254, 0.1)',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        border: '2px solid rgba(79, 172, 254, 0.3)',
    },
    placeholderTitle: {
        color: 'white',
        fontSize: '1.8rem',
        fontWeight: 700,
        margin: 0,
    },
    placeholderText: {
        color: 'rgba(255, 255, 255, 0.6)',
        fontSize: '1rem',
        maxWidth: '400px',
        lineHeight: 1.6,
    },
    comingSoon: {
        marginTop: '16px',
    },
    comingSoonBadge: {
        padding: '8px 20px',
        background: 'linear-gradient(135deg, rgba(79, 172, 254, 0.2) 0%, rgba(0, 242, 254, 0.2) 100%)',
        border: '1px solid rgba(79, 172, 254, 0.5)',
        borderRadius: '20px',
        color: '#4facfe',
        fontSize: '0.9rem',
        fontWeight: 600,
    },
    // Card styles
    card: {
        background: 'rgba(30, 41, 59, 0.6)',
        backdropFilter: 'blur(20px)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        borderRadius: '20px',
        padding: '24px',
    },
    // Profile styles
    profileGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '24px',
    },
    profileItem: {
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
    },
    profileLabel: {
        color: 'rgba(255, 255, 255, 0.5)',
        fontSize: '0.75rem',
        fontWeight: 600,
        textTransform: 'uppercase',
        letterSpacing: '0.1em',
    },
    profileValue: {
        color: 'white',
        fontSize: '1.1rem',
        fontWeight: 500,
        padding: '12px 16px',
        background: 'rgba(255, 255, 255, 0.05)',
        borderRadius: '10px',
        border: '1px solid rgba(255, 255, 255, 0.1)',
    },
    // Attendance styles
    attendanceSummary: {
        textAlign: 'center',
        padding: '40px 20px',
    },
    attendanceStat: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '8px',
        marginBottom: '24px',
    },
    attendanceNumber: {
        fontSize: '4rem',
        fontWeight: 700,
        background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
    },
    attendanceProgress: {
        width: '100%',
        maxWidth: '400px',
        height: '12px',
        background: 'rgba(255, 255, 255, 0.1)',
        borderRadius: '6px',
        margin: '0 auto 24px',
        overflow: 'hidden',
    },
    progressBar: {
        height: '100%',
        borderRadius: '6px',
        transition: 'width 0.5s ease',
    },
    attendanceNote: {
        color: 'rgba(255, 255, 255, 0.7)',
        fontSize: '1rem',
        marginTop: '16px',
    },
};

const styles = {
    container: {
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
        display: 'flex',
        position: 'relative',
        overflow: 'hidden',
    },
    bgOrb1: {
        position: 'absolute',
        top: '-20%',
        right: '-10%',
        width: '600px',
        height: '600px',
        background: 'radial-gradient(circle, rgba(79, 172, 254, 0.15) 0%, transparent 70%)',
        borderRadius: '50%',
        pointerEvents: 'none',
    },
    bgOrb2: {
        position: 'absolute',
        bottom: '-20%',
        left: '-10%',
        width: '500px',
        height: '500px',
        background: 'radial-gradient(circle, rgba(16, 185, 129, 0.1) 0%, transparent 70%)',
        borderRadius: '50%',
        pointerEvents: 'none',
    },
    main: {
        flex: 1,
        padding: '32px',
        overflow: 'auto',
    },
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: '32px',
        flexWrap: 'wrap',
        gap: '16px',
    },
    heading: {
        color: 'white',
        fontSize: '2rem',
        fontWeight: 700,
        margin: 0,
    },
    highlight: {
        background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
    },
    subheading: {
        color: 'rgba(255, 255, 255, 0.6)',
        fontSize: '1rem',
        marginTop: '8px',
    },
    headerRight: {
        display: 'flex',
        gap: '12px',
    },
    dateCard: {
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        padding: '12px 20px',
        background: 'rgba(255, 255, 255, 0.05)',
        borderRadius: '12px',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        color: 'rgba(255, 255, 255, 0.8)',
        fontSize: '0.9rem',
    },
    statsGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        gap: '20px',
        marginBottom: '24px',
    },
    statCard: {
        display: 'flex',
        alignItems: 'center',
        gap: '16px',
        padding: '24px',
        borderRadius: '16px',
        transition: 'transform 0.3s ease',
        cursor: 'pointer',
    },
    statIcon: {
        width: '48px',
        height: '48px',
        background: 'rgba(255, 255, 255, 0.2)',
        borderRadius: '12px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    statLabel: {
        color: 'rgba(255, 255, 255, 0.8)',
        fontSize: '0.85rem',
        marginBottom: '4px',
    },
    statValue: {
        color: 'white',
        fontSize: '1.25rem',
        fontWeight: 700,
        margin: 0,
    },
    chartsGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '24px',
        marginBottom: '24px',
    },
    chartCard: {
        background: 'rgba(30, 41, 59, 0.6)',
        backdropFilter: 'blur(20px)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        borderRadius: '20px',
        padding: '24px',
    },
    cardHeader: {
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        marginBottom: '20px',
    },
    cardTitle: {
        color: 'white',
        fontSize: '1.1rem',
        fontWeight: 600,
        margin: 0,
    },
    chartContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
    },
    attendanceCircle: {
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    attendanceValue: {
        position: 'absolute',
        display: 'flex',
        alignItems: 'baseline',
        gap: '2px',
    },
    attendancePercent: {
        fontSize: '2.5rem',
        fontWeight: 700,
        color: 'white',
    },
    attendanceLabel: {
        fontSize: '1rem',
        color: 'rgba(255, 255, 255, 0.5)',
    },
    attendanceStatus: {
        marginTop: '16px',
    },
    statusBadge: {
        display: 'inline-flex',
        alignItems: 'center',
        gap: '6px',
        padding: '6px 14px',
        borderRadius: '20px',
        fontSize: '0.85rem',
        fontWeight: 600,
    },
    tableCard: {
        background: 'rgba(30, 41, 59, 0.6)',
        backdropFilter: 'blur(20px)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        borderRadius: '20px',
        padding: '24px',
    },
    tableWrapper: {
        overflowX: 'auto',
    },
    table: {
        width: '100%',
        borderCollapse: 'collapse',
    },
    tableHeaderRow: {
        background: 'rgba(255, 255, 255, 0.05)',
    },
    tableHeader: {
        padding: '16px',
        textAlign: 'left',
        color: 'rgba(255, 255, 255, 0.7)',
        fontSize: '0.85rem',
        fontWeight: 600,
        textTransform: 'uppercase',
        letterSpacing: '0.05em',
    },
    tableRow: {
        borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
        transition: 'background 0.2s ease',
    },
    tableCell: {
        padding: '16px',
        color: 'rgba(255, 255, 255, 0.9)',
        fontSize: '0.95rem',
    },
    emptyState: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '48px',
        gap: '16px',
    },
    emptyText: {
        color: 'rgba(255, 255, 255, 0.5)',
        fontSize: '1rem',
    },
    loadingContainer: {
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '16px',
    },
    spinner: {
        width: '48px',
        height: '48px',
        border: '4px solid rgba(255, 255, 255, 0.1)',
        borderTop: '4px solid #4facfe',
        borderRadius: '50%',
        animation: 'spin 1s linear infinite',
    },
    loadingText: {
        color: 'rgba(255, 255, 255, 0.7)',
        fontSize: '1.1rem',
    },
};

export default StudentDashboard;
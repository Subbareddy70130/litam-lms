import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getFacultyDashboard, uploadResults } from '../../services/api';
import Sidebar, { facultyMenuItems } from '../../components/Sidebar';
import {
    LogOut, User, Users, BookOpen, Upload, FileText,
    Calendar, TrendingUp, Plus, CheckCircle, Clock, Activity, Search, BookMarked, Bell, MessageSquare, GraduationCap, ClipboardCheck, LayoutDashboard
} from 'lucide-react';

const FacultyDashboard = () => {
    const navigate = useNavigate();
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('overview');
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

    useEffect(() => {
        const fetchDashboard = async () => {
            try {
                const res = await getFacultyDashboard();
                setData(res.data);
            } catch (err) {
                console.error("Failed", err);
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

    if (loading) return <LoadingScreen />;
    if (!data) return <ErrorScreen />;

    const { profile, total_assigned_students, total_assigned_courses, recent_students } = data;

    const menuItems = [
        { id: 'overview', label: 'Overview', icon: Activity },
        { id: 'students', label: 'Students', icon: Users },
        { id: 'courses', label: 'Courses', icon: BookOpen },
        { id: 'actions', label: 'Quick Actions', icon: Plus },
    ];

    const quickActions = [
        { icon: CheckCircle, label: 'Post Attendance', color: '#4facfe', tabId: 'actions' },
        { icon: FileText, label: 'Upload Results', color: '#10b981', tabId: 'actions' },
        { icon: Upload, label: 'Study Materials', color: '#f59e0b', tabId: 'actions' },
    ];

    return (
        <div style={styles.container}>
            {/* Animated Background */}
            <div style={styles.bgOrb1} />
            <div style={styles.bgOrb2} />

            <Sidebar 
                menuItems={facultyMenuItems}
                activeTab={activeTab}
                onTabChange={setActiveTab}
                sidebarCollapsed={sidebarCollapsed}
                setSidebarCollapsed={setSidebarCollapsed}
                onLogout={handleLogout}
                title="Faculty Portal"
                subtitle="RythuMitra"
                themeColor="#10b981"
            />

            {/* Main Content */}
            <main style={styles.main}>
                {/* Header */}
                <header style={styles.header}>
                    <div>
                        <h1 style={styles.heading}>
                            Welcome, <span style={{ ...styles.highlight, background: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)', WebkitBackgroundClip: 'text' }}>{profile.name}</span>
                        </h1>
                        <p style={styles.subheading}>
                            {profile.designation} • {profile.department || 'Department'}
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
                {renderTabContent(activeTab, { 
                    profile, total_assigned_students, total_assigned_courses, 
                    recent_students, quickActions, onTabChange: setActiveTab 
                })}
            </main>
        </div>
    );
};

// Main content renderer
const renderTabContent = (activeTab, data) => {
    switch (activeTab) {
        case 'overview': return <OverviewContent {...data} />;
        case 'profile': return <ProfileContent profile={data.profile} />;
        case 'courses': return <CoursesContent count={data.total_assigned_courses} />;
        case 'students': return <StudentsContent students={data.recent_students} />;
        case 'attendance': return <AttendanceContent />;
        case 'marks': return <MarksContent />;
        case 'timetable': return <TimetableContent />;
        case 'notices': return <NoticeContent />;
        case 'assignments': return <AssignmentContent />;
        case 'communication': return <CommunicationContent />;
        case 'analytics': return <AnalyticsContent />;
        default: return <OverviewContent {...data} />;
    }
};

const OverviewContent = ({ profile, total_assigned_students, total_assigned_courses, recent_students, quickActions, onTabChange }) => (
    <>
        <div style={styles.statsGrid}>
            <StatCard icon={Users} label="Total Students" value={total_assigned_students} gradient="linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)" subtitle="In your department" />
            <StatCard icon={BookOpen} label="Assigned Courses" value={total_assigned_courses} gradient="linear-gradient(135deg, #667eea 0%, #764ba2 100%)" subtitle="This semester" />
            <StatCard icon={Bell} label="New Notices" value="3" gradient="linear-gradient(135deg, #fa709a 0%, #fee140 100%)" subtitle="Since last login" />
            <StatCard icon={Clock} label="Next Class" value="10:00 AM" gradient="linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)" subtitle="Today" />
        </div>

        <div style={styles.contentGrid}>
            <div style={styles.actionCard}>
                <div style={styles.cardHeader}>
                    <Plus size={20} style={{ color: '#10b981' }} />
                    <h3 style={styles.cardTitle}>Quick Actions</h3>
                </div>
                <div style={styles.actionsList}>
                    {quickActions.map((action, index) => (
                        <button key={index} style={styles.actionBtn} onClick={() => onTabChange(action.tabId)}>
                            <div style={{ ...styles.actionIcon, background: action.color }}>
                                <action.icon size={20} color="white" />
                            </div>
                            <span>{action.label}</span>
                        </button>
                    ))}
                </div>
            </div>

            <div style={styles.studentsCard}>
                <div style={styles.cardHeader}>
                    <Users size={20} style={{ color: '#4facfe' }} />
                    <h3 style={styles.cardTitle}>Recent Students</h3>
                </div>
                <div style={styles.studentsList}>
                    {recent_students.map((student, index) => (
                        <div key={index} style={styles.studentItem}>
                            <div style={styles.studentAvatar}>{student.name?.charAt(0)}</div>
                            <div style={styles.studentInfo}>
                                <h4 style={styles.studentName}>{student.name}</h4>
                                <p style={styles.studentId}>#{student.roll_number}</p>
                            </div>
                            <span style={styles.studentBadge}>{student.year} Year</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    </>
);

const ProfileContent = ({ profile }) => (
    <div style={styles.placeholderCard}>
        <div style={styles.cardHeader}>
            <User size={24} style={{ color: '#667eea' }} />
            <h2 style={styles.cardTitle}>Profile & Account Settings</h2>
        </div>
        <div style={styles.profileEditGrid}>
            <div style={styles.profileField}>
                <label style={styles.fieldLabel}>Full Name</label>
                <input type="text" defaultValue={profile.name} style={styles.fieldInput} />
            </div>
            <div style={styles.profileField}>
                <label style={styles.fieldLabel}>Department</label>
                <input type="text" defaultValue={profile.department} style={styles.fieldInput} readOnly />
            </div>
            <div style={styles.profileField}>
                <label style={styles.fieldLabel}>Designation</label>
                <input type="text" defaultValue={profile.designation} style={styles.fieldInput} />
            </div>
            <div style={styles.profileField}>
                <label style={styles.fieldLabel}>Employee ID</label>
                <input type="text" defaultValue={profile.employee_id} style={styles.fieldInput} readOnly />
            </div>
        </div>
        <button style={styles.saveBtn}>Update Profile</button>
        <div style={{ marginTop: '32px', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '24px' }}>
            <h3>Security</h3>
            <button style={styles.actionBtnBlue}>Change Password</button>
        </div>
    </div>
);

const CoursesContent = ({ count }) => (
    <div style={styles.placeholderCard}>
        <div style={styles.cardHeader}>
            <BookOpen size={24} style={{ color: '#10b981' }} />
            <h2 style={styles.cardTitle}>Assigned Subjects</h2>
        </div>
        <div style={styles.coursesGrid}>
            {[...Array(count)].map((_, i) => (
                <div key={i} style={styles.courseCard}>
                    <div style={styles.courseHeader}>
                        <BookMarked size={24} color="#10b981" />
                        <span style={styles.courseTag}>Active</span>
                    </div>
                    <h3>Advanced Engineering {i + 1}</h3>
                    <p style={styles.courseCode}>CE-10{i + 1}</p>
                    <div style={styles.courseActions}>
                        <button style={styles.outlineBtn}><Upload size={16} /> Syllabus</button>
                        <button style={styles.outlineBtn}><Plus size={16} /> Materials</button>
                    </div>
                </div>
            ))}
        </div>
    </div>
);

const StudentsContent = ({ students }) => (
    <div style={styles.placeholderCard}>
        <div style={styles.cardHeader}>
            <Users size={24} style={{ color: '#4facfe' }} />
            <h2 style={styles.cardTitle}>Class Management</h2>
        </div>
        <div style={styles.searchBar}>
            <Search size={18} />
            <input type="text" placeholder="Search students by name or roll number..." style={styles.searchInput} />
        </div>
        <div style={styles.studentsList}>
            {students.map((student, index) => (
                <div key={index} style={styles.studentRow}>
                    <div style={styles.studentAvatar}>{student.name.charAt(0)}</div>
                    <div style={styles.studentInfo}>
                        <h4 style={styles.studentName}>{student.name}</h4>
                        <p style={styles.studentId}>#{student.roll_number}</p>
                    </div>
                    <button style={styles.viewBtn}>View Academic Record</button>
                    <button style={styles.viewBtn}>Send Message</button>
                </div>
            ))}
        </div>
    </div>
);

const AttendanceContent = () => (
    <div style={styles.placeholderCard}>
        <div style={styles.cardHeader}>
            <ClipboardCheck size={24} style={{ color: '#fa709a' }} />
            <h2 style={styles.cardTitle}>Daily Attendance</h2>
        </div>
        <div style={styles.attendanceSelector}>
            <select style={styles.selectInput}><option>Select Course</option></select>
            <input type="date" defaultValue={new Date().toISOString().split('T')[0]} style={styles.dateInput} />
            <button style={styles.actionBtnBlue}>Load Student List</button>
        </div>
        <div style={styles.emptyState}>
            <p>Select a course and date to start marking attendance.</p>
        </div>
    </div>
);

const MarksContent = () => (
    <div style={styles.placeholderCard}>
        <div style={styles.cardHeader}>
            <GraduationCap size={24} style={{ color: '#f59e0b' }} />
            <h2 style={styles.cardTitle}>Marks & Grade Entry</h2>
        </div>
        <div style={styles.marksGrid}>
            <div style={styles.markTypeCard}>
                <h3>Internal Marks</h3>
                <p>Enter marks for mid-terms and lab assessments.</p>
                <button style={styles.actionBtn}>Select Subject</button>
            </div>
            <div style={styles.markTypeCard}>
                <h3>PDF Upload</h3>
                <p>Bulk upload marks using scanned results PDF.</p>
                <label style={styles.uploadLabel}>Choose PDF File</label>
            </div>
        </div>
    </div>
);

const TimetableContent = () => (
    <div style={styles.placeholderCard}>
        <div style={styles.cardHeader}>
            <Calendar size={24} style={{ color: '#4facfe' }} />
            <h2 style={styles.cardTitle}>Personal Timetable</h2>
        </div>
        <div style={styles.timetableGrid}>
            <div style={styles.timetableHeader}>Time</div>
            <div style={styles.timetableHeader}>Mon</div>
            <div style={styles.timetableHeader}>Tue</div>
            <div style={styles.timetableHeader}>Wed</div>
            <div style={styles.timetableHeader}>Thu</div>
            <div style={styles.timetableHeader}>Fri</div>
            {/* Mock Timetable Rows */}
            <div style={styles.timeLabel}>10:00 AM</div>
            <div style={styles.classCell}>CS-101</div>
            <div style={styles.classCell}>-</div>
            <div style={styles.classCell}>CS-101</div>
            <div style={styles.classCell}>-</div>
            <div style={styles.classCell}>CS-202</div>
        </div>
    </div>
);

const NoticeContent = () => (
    <div style={styles.placeholderCard}>
        <div style={styles.cardHeader}>
            <Bell size={24} style={{ color: '#fee140' }} />
            <h2 style={styles.cardTitle}>Announcements & Notices</h2>
        </div>
        <div style={styles.noticeForm}>
            <input type="text" placeholder="Notice Title" style={styles.fieldInput} />
            <textarea placeholder="Notice Content..." style={styles.textArea} />
            <select style={styles.selectInput}><option>All Students</option><option>Specific Class</option></select>
            <button style={styles.saveBtn}>Post Announcement</button>
        </div>
    </div>
);

const AssignmentContent = () => (
    <div style={styles.placeholderCard}>
        <div style={styles.cardHeader}>
            <FileText size={24} style={{ color: '#00f2fe' }} />
            <h2 style={styles.cardTitle}>Assignment Management</h2>
        </div>
        <div style={styles.assignmentActions}>
            <button style={styles.actionBtnBlue}><Plus size={18} /> Create New Assignment</button>
        </div>
        <div style={styles.assignmentList}>
            <div style={styles.assignmentItem}>
                <h4>Lab Report 1</h4>
                <p>Deadline: 25 Oct 2023</p>
                <span>12 Submissions</span>
                <button style={styles.viewBtn}>Grade Now</button>
            </div>
        </div>
    </div>
);

const CommunicationContent = () => (
    <div style={styles.placeholderCard}>
        <div style={styles.cardHeader}>
            <MessageSquare size={24} style={{ color: '#43e97b' }} />
            <h2 style={styles.cardTitle}>Faculty Messages</h2>
        </div>
        <div style={styles.chatLayout}>
            <div style={styles.chatSidebar}>
                <div style={styles.chatUser}><span>Rahul S. (Student)</span></div>
                <div style={styles.chatUser}><span>Dr. Anita K. (HOD)</span></div>
            </div>
            <div style={styles.chatMain}>
                <p style={styles.emptyText}>Select a conversation to start messaging</p>
            </div>
        </div>
    </div>
);

const AnalyticsContent = () => (
    <div style={styles.placeholderCard}>
        <div style={styles.cardHeader}>
            <TrendingUp size={24} style={{ color: '#f59e0b' }} />
            <h2 style={styles.cardTitle}>Reports & Analytics</h2>
        </div>
        <div style={styles.analyticsGrid}>
            <div style={styles.chartBlock}>
                <h3>Average Performance</h3>
                <div style={styles.barChart}>
                    <div style={{ ...styles.bar, height: '80%', background: '#43e97b' }}><span>80%</span></div>
                    <div style={{ ...styles.bar, height: '65%', background: '#4facfe' }}><span>65%</span></div>
                    <div style={{ ...styles.bar, height: '90%', background: '#fa709a' }}><span>90%</span></div>
                </div>
            </div>
            <div style={styles.reportButtons}>
                <button style={styles.saveBtn}><FileText size={18} /> Export PDF Report</button>
                <button style={styles.actionBtnBlue}><FileText size={18} /> Export Excel Data</button>
            </div>
        </div>
    </div>
);


// Component for stat cards
const StatCard = ({ icon: Icon, label, value, gradient, subtitle }) => (
    <div style={{ ...styles.statCard, background: gradient }}>
        <div style={styles.statIcon}>
            <Icon size={24} color="white" />
        </div>
        <div>
            <p style={styles.statLabel}>{label}</p>
            <h4 style={styles.statValue}>{value}</h4>
            <span style={styles.statSubtitle}>{subtitle}</span>
        </div>
    </div>
);

const LoadingScreen = () => (
    <div style={styles.loadingContainer}>
        <div style={styles.spinner} />
        <p style={styles.loadingText}>Loading Faculty Portal...</p>
    </div>
);

const ErrorScreen = () => (
    <div style={styles.loadingContainer}>
        <Activity size={48} style={{ color: '#ef4444' }} />
        <p style={{ ...styles.loadingText, color: '#ef4444' }}>Failed to load dashboard</p>
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
        background: 'radial-gradient(circle, rgba(67, 233, 123, 0.15) 0%, transparent 70%)',
        borderRadius: '50%',
        pointerEvents: 'none',
    },
    bgOrb2: {
        position: 'absolute',
        bottom: '-20%',
        left: '-10%',
        width: '500px',
        height: '500px',
        background: 'radial-gradient(circle, rgba(56, 249, 215, 0.1) 0%, transparent 70%)',
        borderRadius: '50%',
        pointerEvents: 'none',
    },
    sidebar: {
        width: '280px',
        background: 'rgba(30, 41, 59, 0.8)',
        backdropFilter: 'blur(20px)',
        borderRight: '1px solid rgba(255, 255, 255, 0.1)',
        padding: '24px 16px',
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
    },
    sidebarHeader: {
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        marginBottom: '32px',
        padding: '0 8px',
    },
    logo: {
        width: '48px',
        height: '48px',
        borderRadius: '12px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    logoIcon: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    sidebarTitle: {
        color: 'white',
        fontSize: '1.1rem',
        fontWeight: 700,
        margin: 0,
    },
    sidebarSubtitle: {
        color: 'rgba(255, 255, 255, 0.5)',
        fontSize: '0.85rem',
        margin: 0,
    },
    nav: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
    },
    navItem: {
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        padding: '14px 16px',
        background: 'transparent',
        border: 'none',
        borderRadius: '12px',
        color: 'rgba(255, 255, 255, 0.6)',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        fontSize: '0.95rem',
        fontWeight: 500,
        width: '100%',
        textAlign: 'left',
    },
    navItemActive: {
        background: 'linear-gradient(135deg, rgba(67, 233, 123, 0.2) 0%, rgba(56, 249, 215, 0.1) 100%)',
        color: '#43e97b',
        borderLeft: '3px solid #43e97b',
    },
    sidebarFooter: {
        marginTop: 'auto',
        paddingTop: '16px',
        borderTop: '1px solid rgba(255, 255, 255, 0.1)',
    },
    logoutBtn: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '10px',
        width: '100%',
        padding: '14px',
        background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
        border: 'none',
        borderRadius: '12px',
        color: 'white',
        fontWeight: 600,
        cursor: 'pointer',
        transition: 'all 0.3s ease',
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
        fontSize: '1.5rem',
        fontWeight: 700,
        margin: 0,
    },
    statSubtitle: {
        color: 'rgba(255, 255, 255, 0.6)',
        fontSize: '0.8rem',
    },
    contentGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '24px',
        marginBottom: '24px',
    },
    actionCard: {
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
    actionsList: {
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
    },
    actionBtn: {
        display: 'flex',
        alignItems: 'center',
        gap: '16px',
        padding: '16px',
        background: 'rgba(255, 255, 255, 0.05)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        borderRadius: '12px',
        color: 'white',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        fontWeight: 500,
    },
    actionIcon: {
        width: '44px',
        height: '44px',
        borderRadius: '10px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    studentsCard: {
        background: 'rgba(30, 41, 59, 0.6)',
        backdropFilter: 'blur(20px)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        borderRadius: '20px',
        padding: '24px',
    },
    studentsList: {
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
    },
    studentItem: {
        display: 'flex',
        alignItems: 'center',
        gap: '16px',
        padding: '14px',
        background: 'rgba(255, 255, 255, 0.03)',
        borderRadius: '12px',
        border: '1px solid rgba(255, 255, 255, 0.05)',
        transition: 'all 0.3s ease',
    },
    studentAvatar: {
        width: '44px',
        height: '44px',
        background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
        borderRadius: '10px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        fontWeight: 700,
        fontSize: '1.1rem',
    },
    studentInfo: {
        flex: 1,
    },
    studentName: {
        color: 'white',
        fontSize: '0.95rem',
        fontWeight: 600,
        margin: 0,
    },
    studentId: {
        color: 'rgba(255, 255, 255, 0.5)',
        fontSize: '0.85rem',
        margin: 0,
    },
    studentBadge: {
        padding: '6px 12px',
        background: 'rgba(67, 233, 123, 0.15)',
        color: '#43e97b',
        borderRadius: '6px',
        fontSize: '0.8rem',
        fontWeight: 600,
    },
    profileCard: {
        background: 'rgba(30, 41, 59, 0.6)',
        backdropFilter: 'blur(20px)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        borderRadius: '20px',
        padding: '24px',
    },
    profileGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '20px',
    },
    profileItem: {
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
    },
    profileLabel: {
        color: 'rgba(255, 255, 255, 0.5)',
        fontSize: '0.85rem',
    },
    profileValue: {
        color: 'white',
        fontSize: '1.1rem',
        fontWeight: 600,
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
        borderTop: '4px solid #43e97b',
        borderRadius: '50%',
        animation: 'spin 1s linear infinite',
    },
    loadingText: {
        color: 'rgba(255, 255, 255, 0.7)',
        fontSize: '1.1rem',
    },
    // New styles for sub-components
    placeholderCard: {
        background: 'rgba(30, 41, 59, 0.6)',
        backdropFilter: 'blur(20px)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        borderRadius: '20px',
        padding: '32px',
        color: 'white',
    },
    searchBar: {
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        background: 'rgba(255, 255, 255, 0.05)',
        padding: '12px 20px',
        borderRadius: '12px',
        marginBottom: '24px',
        border: '1px solid rgba(255, 255, 255, 0.1)',
    },
    searchInput: {
        background: 'transparent',
        border: 'none',
        color: 'white',
        flex: 1,
        outline: 'none',
    },
    viewBtn: {
        padding: '8px 16px',
        background: 'rgba(79, 172, 254, 0.2)',
        border: '1px solid #4facfe',
        borderRadius: '8px',
        color: '#4facfe',
        cursor: 'pointer',
        fontSize: '0.85rem',
        fontWeight: 600,
        transition: 'all 0.3s ease',
    },
    profileEditGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '24px',
        marginBottom: '32px',
    },
    profileField: { display: 'flex', flexDirection: 'column', gap: '8px' },
    fieldLabel: { color: 'rgba(255, 255, 255, 0.5)', fontSize: '0.9rem' },
    fieldInput: {
        padding: '12px 16px',
        background: 'rgba(255, 255, 255, 0.05)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        borderRadius: '10px',
        color: 'white',
        fontSize: '1rem',
        outline: 'none',
    },
    saveBtn: {
        padding: '14px 28px',
        background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
        border: 'none',
        borderRadius: '10px',
        color: 'white',
        fontWeight: 700,
        cursor: 'pointer',
        boxShadow: '0 4px 12px rgba(16, 185, 129, 0.3)',
    },
    coursesGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '24px',
    },
    courseCard: {
        background: 'rgba(255, 255, 255, 0.03)',
        padding: '24px',
        borderRadius: '16px',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        transition: 'all 0.3s ease',
    },
    courseHeader: { display: 'flex', justifyContent: 'space-between', marginBottom: '16px' },
    courseTag: {
        padding: '4px 10px',
        background: 'rgba(16, 185, 129, 0.1)',
        color: '#10b981',
        borderRadius: '6px',
        fontSize: '0.75rem',
        fontWeight: 600,
    },
    courseActions: { display: 'flex', gap: '12px', marginTop: '20px' },
    outlineBtn: {
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '8px',
        padding: '10px',
        background: 'transparent',
        border: '1px solid rgba(255, 255, 255, 0.2)',
        borderRadius: '8px',
        color: 'white',
        cursor: 'pointer',
        fontSize: '0.85rem',
    },
    studentRow: {
        display: 'flex',
        alignItems: 'center',
        gap: '16px',
        padding: '16px',
        background: 'rgba(255, 255, 255, 0.03)',
        borderRadius: '12px',
        marginBottom: '12px',
    },
    attendanceSelector: {
        display: 'flex',
        gap: '16px',
        marginBottom: '32px',
        flexWrap: 'wrap',
    },
    selectInput: {
        padding: '12px',
        background: 'rgba(25, 33, 53, 0.8)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        borderRadius: '10px',
        color: 'white',
        minWidth: '200px',
    },
    dateInput: {
        padding: '12px',
        background: 'rgba(25, 33, 53, 0.8)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        borderRadius: '10px',
        color: 'white',
    },
    marksGrid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' },
    markTypeCard: {
        padding: '32px',
        background: 'rgba(255, 255, 255, 0.03)',
        borderRadius: '20px',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        textAlign: 'center',
    },
    timetableGrid: {
        display: 'grid',
        gridTemplateColumns: '100px repeat(5, 1fr)',
        gap: '1px',
        background: 'rgba(255,255,255,0.1)',
        borderRadius: '12px',
        overflow: 'hidden',
    },
    timetableHeader: {
        padding: '16px',
        background: 'rgba(30, 41, 59, 0.9)',
        color: 'white',
        fontWeight: 600,
        textAlign: 'center',
    },
    timeLabel: {
        padding: '16px',
        background: 'rgba(30, 41, 59, 0.7)',
        color: 'rgba(255,255,255,0.5)',
        fontSize: '0.85rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    classCell: {
        padding: '16px',
        background: 'rgba(255,255,255,0.02)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
    },
    noticeForm: { display: 'flex', flexDirection: 'column', gap: '16px' },
    textArea: {
        padding: '16px',
        background: 'rgba(255, 255, 255, 0.05)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        borderRadius: '12px',
        color: 'white',
        minHeight: '150px',
        resize: 'vertical',
        outline: 'none',
    },
    assignmentActions: { marginBottom: '24px' },
    assignmentList: { display: 'flex', flexDirection: 'column', gap: '16px' },
    assignmentItem: {
        padding: '20px',
        background: 'rgba(255,255,255,0.03)',
        borderRadius: '16px',
        border: '1px solid rgba(255,255,255,0.1)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '16px',
    },
    chatLayout: {
        display: 'grid',
        gridTemplateColumns: '280px 1fr',
        gap: '24px',
        minHeight: '400px',
    },
    chatSidebar: {
        borderRight: '1px solid rgba(255,255,255,0.1)',
        paddingRight: '24px',
    },
    chatUser: {
        padding: '12px 16px',
        background: 'rgba(255,255,255,0.05)',
        borderRadius: '10px',
        marginBottom: '10px',
        cursor: 'pointer',
    },
    chatMain: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    analyticsGrid: { display: 'flex', flexDirection: 'column', gap: '32px' },
    chartBlock: {
        padding: '24px',
        background: 'rgba(255,255,255,0.02)',
        borderRadius: '16px',
    },
    barChart: {
        display: 'flex',
        alignItems: 'flex-end',
        gap: '20px',
        height: '200px',
        padding: '20px',
        borderBottom: '2px solid rgba(255,255,255,0.1)',
    },
    bar: {
        flex: 1,
        borderRadius: '8px 8px 0 0',
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'center',
        paddingBottom: '8px',
        fontSize: '0.8rem',
        fontWeight: 700,
    },
    reportButtons: { display: 'flex', gap: '16px' },
    actionBtnBlue: {
        padding: '12px 24px',
        background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
        border: 'none',
        borderRadius: '10px',
        color: 'white',
        fontWeight: 600,
        cursor: 'pointer',
        boxShadow: '0 4px 12px rgba(79, 172, 254, 0.3)',
    },
};

export default FacultyDashboard;
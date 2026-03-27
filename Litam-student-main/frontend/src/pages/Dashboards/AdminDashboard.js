import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAdminDashboard, uploadResults } from '../../services/api';
import Sidebar, { adminMenuItems } from '../../components/Sidebar';
import { 
    Users, BookOpen, GraduationCap, LayoutDashboard, 
    UploadCloud, History, LogOut, Calendar, 
    TrendingUp, FileText, AlertCircle, CheckCircle2,
    ChevronRight, Search, Building2, Shield, Settings, Bell, UserCog, Plus, Filter, Download
} from 'lucide-react';

const AdminDashboard = () => {
    const navigate = useNavigate();
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [file, setFile] = useState(null);
    const [uploadStatus, setUploadStatus] = useState('');
    const [activeTab, setActiveTab] = useState('overview');
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

    const handleFileChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0]);
            setUploadStatus('');
        }
    };

    const handleFileUpload = async () => {
        if (!file) return;
        setUploadStatus('Uploading & Parsing Document...');
        const formData = new FormData();
        formData.append('file', file);
        formData.append('course_id', 1); // Demo ID
        
        try {
            const res = await uploadResults(formData);
            setUploadStatus(res.data.message || 'Successfully processed.');
        } catch (err) {
            const errorMsg = err.response?.data?.error || 'Error connecting to server or processing file.';
            setUploadStatus(errorMsg);
        }
    };

    useEffect(() => {
        const fetchDashboard = async () => {
            try {
                const res = await getAdminDashboard();
                setData(res.data);
            } catch (err) {
                console.error("Failed to load admin data", err);
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

    return (
        <div style={styles.container}>
            <Sidebar 
                menuItems={adminMenuItems}
                activeTab={activeTab}
                onTabChange={setActiveTab}
                sidebarCollapsed={sidebarCollapsed}
                setSidebarCollapsed={setSidebarCollapsed}
                onLogout={handleLogout}
                title="Admin Portal"
                subtitle="Institution Control"
                themeColor="#667eea"
            />

            <main style={styles.main}>
                <header style={styles.header}>
                    <div>
                        <h1 style={styles.heading}>System Administration</h1>
                        <p style={styles.subheading}>Manage institution records and academic data</p>
                    </div>
                    <div style={styles.headerRight}>
                        <div style={styles.dateCard}>
                            <Calendar size={18} />
                            <span>{new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}</span>
                        </div>
                    </div>
                </header>

                {renderTabContent(activeTab, data)}
            </main>
        </div>
    );
};

const renderTabContent = (activeTab, data) => {
    switch (activeTab) {
        case 'overview': return <OverviewContent data={data} />;
        case 'students': return <StudentManagement />;
        case 'faculty': return <FacultyManagement />;
        case 'departments': return <DepartmentManagement />;
        case 'courses': return <CourseManagement />;
        case 'attendance': return <AttendanceOverview />;
        case 'marks': return <MarksResults />;
        case 'timetable': return <TimetableManagement />;
        case 'notices': return <NoticeManagement />;
        case 'users': return <UserManagement users={data.recent_users} />;
        case 'analytics': return <AnalyticsReports />;
        case 'settings': return <SystemSettings />;
        default: return <OverviewContent data={data} />;
    }
};

const OverviewContent = ({ data }) => (
    <>
        <div style={styles.statsGrid}>
            <StatCard icon={Users} label="Total Students" value={data.total_students} color="#667eea" trend="+12% this month" />
            <StatCard icon={UserCog} label="Faculty Members" value={data.total_faculty} color="#10b981" trend="All active" />
            <StatCard icon={Building2} label="Departments" value="8" color="#f59e0b" trend="Full staff" />
            <StatCard icon={BookOpen} label="Active Courses" value={data.total_courses} color="#4facfe" trend="Semester 2" />
        </div>
        <div style={styles.contentSections}>
            <section style={styles.card}>
                <div style={styles.cardHeader}>
                    <TrendingUp size={20} color="#667eea" />
                    <h3 style={styles.cardTitle}>Institutional Growth</h3>
                </div>
                <div style={styles.placeholderChart}>
                    <div style={{ ...styles.bar, height: '60%', background: '#667eea' }}>2021</div>
                    <div style={{ ...styles.bar, height: '75%', background: '#10b981' }}>2022</div>
                    <div style={{ ...styles.bar, height: '90%', background: '#f59e0b' }}>2023</div>
                </div>
            </section>
        </div>
    </>
);

const StudentManagement = () => (
    <div style={styles.card}>
        <div style={styles.cardHeader}>
            <Users size={24} color="#667eea" />
            <h2 style={styles.cardTitle}>Student Records</h2>
        </div>
        <div style={styles.toolBar}>
            <div style={styles.searchBox}>
                <Search size={18} />
                <input type="text" placeholder="Search by name, roll no..." style={styles.searchInput} />
            </div>
            <button style={styles.actionBtnBlue}><Plus size={18} /> Add Student</button>
            <button style={styles.outlineBtn}><Filter size={18} /> Filter</button>
        </div>
        <div style={styles.tableWrapper}>
            <table style={styles.table}>
                <thead>
                    <tr>
                        <th style={styles.th}>Name</th>
                        <th style={styles.th}>Roll No</th>
                        <th style={styles.th}>Department</th>
                        <th style={styles.th}>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {[1, 2, 3].map(i => (
                        <tr key={i} style={styles.tr}>
                            <td style={styles.td}>Student {i}</td>
                            <td style={styles.td}>R20CS00{i}</td>
                            <td style={styles.td}>Computer Science</td>
                            <td style={styles.td}>
                                <button style={styles.iconBtn}>Edit</button>
                                <button style={{ ...styles.iconBtn, color: '#ef4444' }}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </div>
);

const FacultyManagement = () => (
    <div style={styles.card}>
        <div style={styles.cardHeader}>
            <UserCog size={24} color="#10b981" />
            <h2 style={styles.cardTitle}>Faculty Directory</h2>
        </div>
        <div style={styles.toolBar}>
            <select style={styles.selectInput}><option>All Departments</option></select>
            <button style={styles.actionBtnBlue}><Plus size={18} /> New Faculty</button>
        </div>
        <div style={styles.facultyGrid}>
            {[1, 2, 3, 4].map(i => (
                <div key={i} style={styles.memberCard}>
                    <div style={styles.avatarLarge}>F</div>
                    <h3>Prof. Dr. Smith {i}</h3>
                    <p>HOD - Electronics</p>
                    <button style={styles.outlineBtn}>Assign Subjects</button>
                </div>
            ))}
        </div>
    </div>
);

const DepartmentManagement = () => (
    <div style={styles.card}>
        <div style={styles.cardHeader}>
            <Building2 size={24} color="#f59e0b" />
            <h2 style={styles.cardTitle}>Departments</h2>
        </div>
        <div style={styles.deptGrid}>
            {['CSE', 'ECE', 'MECH', 'CIVIL'].map(dept => (
                <div key={dept} style={styles.deptCard}>
                    <h3>{dept}</h3>
                    <p>HOD: Dr. Sharma</p>
                    <span>12 Faculty • 240 Students</span>
                    <button style={styles.viewBtn}>Manage Details</button>
                </div>
            ))}
        </div>
    </div>
);

const CourseManagement = () => (
    <div style={styles.card}>
        <div style={styles.cardHeader}>
            <BookOpen size={24} color="#4facfe" />
            <h2 style={styles.cardTitle}>Courses & Curriculum</h2>
        </div>
        <div style={styles.courseList}>
            {[1, 2, 3].map(i => (
                <div key={i} style={styles.courseItem}>
                    <div>
                        <h4>B.Tech Computer Science</h4>
                        <p>4 Years • 8 Semesters</p>
                    </div>
                    <button style={styles.outlineBtn}>Edit Map</button>
                </div>
            ))}
        </div>
    </div>
);

const AttendanceOverview = () => (
    <div style={styles.card}>
        <div style={styles.cardHeader}>
            <ClipboardCheck size={24} color="#fa709a" />
            <h2 style={styles.cardTitle}>Global Attendance Reports</h2>
        </div>
        <div style={styles.analyticsPlaceholder}>
            <p>Select Department and Date range to view attendance trends.</p>
            <button style={styles.actionBtnBlue}>Generate Report</button>
        </div>
    </div>
);

const MarksResults = () => (
    <div style={styles.card}>
        <div style={styles.cardHeader}>
            <GraduationCap size={24} color="#667eea" />
            <h2 style={styles.cardTitle}>Mark Management</h2>
        </div>
        <div style={styles.toolBar}>
            <button style={styles.actionBtnBlue}><Download size={18} /> Export Results</button>
        </div>
        <p>Manage student marks and generate official grade sheets.</p>
    </div>
);

const TimetableManagement = () => (
    <div style={styles.card}>
        <div style={styles.cardHeader}>
            <Calendar size={24} color="#4facfe" />
            <h2 style={styles.cardTitle}>Master Timetable</h2>
        </div>
        <button style={styles.actionBtnBlue}>Create Class Schedule</button>
    </div>
);

const NoticeManagement = () => (
    <div style={styles.card}>
        <div style={styles.cardHeader}>
            <Bell size={24} color="#fee140" />
            <h2 style={styles.cardTitle}>Post Announcement</h2>
        </div>
        <div style={styles.noticeForm}>
            <input type="text" placeholder="Title" style={styles.fieldInput} />
            <textarea placeholder="Message content..." style={styles.textArea} />
            <button style={styles.saveBtn}>Publish to All</button>
        </div>
    </div>
);

const UserManagement = ({ users }) => (
    <div style={styles.card}>
        <div style={styles.cardHeader}>
            <Shield size={24} color="#667eea" />
            <h2 style={styles.cardTitle}>System Users</h2>
        </div>
        <div style={styles.tableWrapper}>
            <table style={styles.table}>
                <thead>
                    <tr>
                        <th style={styles.th}>User</th>
                        <th style={styles.th}>Role</th>
                        <th style={styles.th}>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user, i) => (
                        <tr key={i} style={styles.tr}>
                            <td style={styles.td}>{user.username}</td>
                            <td style={styles.td}>{user.role}</td>
                            <td style={styles.td}><span style={{ color: '#10b981' }}>Active</span></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </div>
);

const AnalyticsReports = () => (
    <div style={styles.card}>
        <div style={styles.cardHeader}>
            <TrendingUp size={24} color="#10b981" />
            <h2 style={styles.cardTitle}>Institutional Analytics</h2>
        </div>
        <div style={styles.placeholderChart}>
            {/* Simple CSS bars */}
            <div style={{ ...styles.bar, height: '80%', background: '#667eea' }}>Academics</div>
            <div style={{ ...styles.bar, height: '70%', background: '#10b981' }}>Attendance</div>
            <div style={{ ...styles.bar, height: '50%', background: '#f59e0b' }}>Placement</div>
        </div>
    </div>
);

const SystemSettings = () => (
    <div style={styles.card}>
        <div style={styles.cardHeader}>
            <Settings size={24} color="gray" />
            <h2 style={styles.cardTitle}>System Settings</h2>
        </div>
        <div style={styles.settingsGrid}>
            <div style={styles.settingItem}>
                <label>Academic Year</label>
                <input type="text" defaultValue="2023-24" style={styles.fieldInput} />
            </div>
            <div style={styles.settingItem}>
                <label>Institution Name</label>
                <input type="text" defaultValue="RythuMitra College" style={styles.fieldInput} />
            </div>
        </div>
        <button style={styles.saveBtn}>Save Config</button>
    </div>
);

const StatCard = ({ icon: Icon, label, value, color, trend }) => (
    <div style={styles.statCard}>
        <div style={{...styles.statIconBox, background: `${color}15`}}>
            <Icon size={24} color={color} />
        </div>
        <div style={{flex: 1}}>
            <p style={styles.statLabel}>{label}</p>
            <h4 style={styles.statValue}>{value}</h4>
            <p style={{...styles.statTrend, color: color}}>{trend}</p>
        </div>
    </div>
);

const LoadingScreen = () => (
    <div style={styles.loaderContainer}>
        <div style={styles.spinner} />
        <p style={{color: 'white', marginTop: '16px', fontWeight: 500}}>Initializing Admin Portal...</p>
    </div>
);

const ErrorScreen = () => (
    <div style={styles.loaderContainer}>
        <AlertCircle size={48} color="#ef4444" />
        <p style={{color: 'white', marginTop: '16px', fontWeight: 500}}>Authentication Failed or Server Error</p>
    </div>
);

const styles = {
    container: {
        minHeight: '100vh',
        background: '#0f172a',
        display: 'flex',
        fontFamily: "'Inter', sans-serif"
    },
    main: {
        flex: 1,
        padding: '32px',
        overflowY: 'auto',
        background: 'radial-gradient(circle at top right, rgba(102, 126, 234, 0.05), transparent 400px)'
    },
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: '32px'
    },
    heading: {
        color: 'white',
        fontSize: '1.85rem',
        fontWeight: 700,
        margin: 0
    },
    subheading: {
        color: 'rgba(255, 255, 255, 0.5)',
        fontSize: '1rem',
        marginTop: '4px'
    },
    headerRight: {
        display: 'flex',
        gap: '12px'
    },
    dateCard: {
        background: 'rgba(255, 255, 255, 0.05)',
        padding: '10px 16px',
        borderRadius: '10px',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        color: 'rgba(255, 255, 255, 0.8)',
        fontSize: '0.9rem'
    },
    statsGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
        gap: '24px',
        marginBottom: '32px'
    },
    statCard: {
        background: 'rgba(30, 41, 59, 0.6)',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        borderRadius: '20px',
        padding: '24px',
        display: 'flex',
        alignItems: 'center',
        gap: '20px',
        transition: 'all 0.3s ease'
    },
    statIconBox: {
        width: '56px',
        height: '56px',
        borderRadius: '14px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    statLabel: {
        color: 'rgba(255, 255, 255, 0.4)',
        fontSize: '0.85rem',
        fontWeight: 600,
        textTransform: 'uppercase',
        letterSpacing: '0.05em',
        margin: 0
    },
    statValue: {
        color: 'white',
        fontSize: '1.75rem',
        fontWeight: 800,
        margin: '4px 0'
    },
    statTrend: {
        fontSize: '0.8rem',
        fontWeight: 500,
        margin: 0
    },
    card: {
        background: 'rgba(30, 41, 59, 0.6)',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        borderRadius: '24px',
        padding: '32px',
        marginBottom: '24px'
    },
    cardHeader: {
        display: 'flex',
        alignItems: 'center',
        gap: '16px',
        marginBottom: '24px'
    },
    cardTitle: {
        color: 'white',
        fontSize: '1.25rem',
        fontWeight: 600,
        margin: 0
    },
    toolBar: {
        display: 'flex',
        gap: '16px',
        marginBottom: '24px',
        flexWrap: 'wrap'
    },
    searchBox: {
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        background: 'rgba(255, 255, 255, 0.05)',
        padding: '10px 16px',
        borderRadius: '10px',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        color: 'rgba(255,255,255,0.4)'
    },
    searchInput: {
        background: 'transparent',
        border: 'none',
        color: 'white',
        outline: 'none',
        width: '100%'
    },
    actionBtnBlue: {
        padding: '10px 20px',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        border: 'none',
        borderRadius: '10px',
        fontWeight: 600,
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        boxShadow: '0 4px 12px rgba(102, 126, 234, 0.3)'
    },
    outlineBtn: {
        padding: '10px 20px',
        background: 'transparent',
        color: 'white',
        border: '1px solid rgba(255,255,255,0.2)',
        borderRadius: '10px',
        fontWeight: 600,
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        gap: '8px'
    },
    tableWrapper: {
        overflowX: 'auto'
    },
    table: {
        width: '100%',
        borderCollapse: 'separate',
        borderSpacing: '0 8px'
    },
    th: {
        textAlign: 'left',
        padding: '12px 20px',
        color: 'rgba(255, 255, 255, 0.4)',
        fontSize: '0.8rem',
        fontWeight: 600,
        textTransform: 'uppercase'
    },
    tr: {
        background: 'rgba(255, 255, 255, 0.03)',
        transition: 'all 0.2s ease'
    },
    td: {
        padding: '16px 20px',
        color: 'rgba(255, 255, 255, 0.8)',
        fontSize: '0.95rem'
    },
    iconBtn: {
        background: 'transparent',
        border: 'none',
        color: '#4facfe',
        cursor: 'pointer',
        marginRight: '12px',
        fontWeight: 600
    },
    facultyGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        gap: '20px'
    },
    memberCard: {
        background: 'rgba(255,255,255,0.03)',
        padding: '24px',
        borderRadius: '20px',
        textAlign: 'center',
        border: '1px solid rgba(255,255,255,0.05)'
    },
    avatarLarge: {
        width: '64px',
        height: '64px',
        background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '1.5rem',
        fontWeight: 700,
        color: 'white',
        margin: '0 auto 16px'
    },
    deptGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '20px'
    },
    deptCard: {
        padding: '24px',
        background: 'rgba(255,255,255,0.03)',
        borderRadius: '20px',
        border: '1px solid rgba(255,255,255,0.1)'
    },
    courseList: {
        display: 'flex',
        flexDirection: 'column',
        gap: '12px'
    },
    courseItem: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '20px',
        background: 'rgba(255,255,255,0.03)',
        borderRadius: '16px'
    },
    placeholderChart: {
        height: '200px',
        display: 'flex',
        alignItems: 'flex-end',
        gap: '20px',
        padding: '20px',
        background: 'rgba(255,255,255,0.02)',
        borderRadius: '16px'
    },
    bar: {
        flex: 1,
        borderRadius: '8px 8px 0 0',
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'center',
        paddingBottom: '8px',
        color: 'white',
        fontSize: '0.8rem',
        fontWeight: 700
    },
    noticeForm: { display: 'flex', flexDirection: 'column', gap: '16px' },
    fieldInput: {
        padding: '12px 16px',
        background: 'rgba(255, 255, 255, 0.05)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        borderRadius: '10px',
        color: 'white',
        outline: 'none'
    },
    textArea: {
        padding: '16px',
        background: 'rgba(255, 255, 255, 0.05)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        borderRadius: '12px',
        color: 'white',
        minHeight: '120px',
        resize: 'none',
        outline: 'none'
    },
    saveBtn: {
        padding: '14px',
        background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
        color: 'white',
        border: 'none',
        borderRadius: '10px',
        fontWeight: 700,
        cursor: 'pointer'
    },
    settingsGrid: {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '24px',
        marginBottom: '24px'
    },
    settingItem: { display: 'flex', flexDirection: 'column', gap: '8px' },
    selectInput: {
        padding: '10px',
        background: 'rgba(30, 41, 59, 0.8)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        borderRadius: '10px',
        color: 'white'
    },
    viewBtn: {
        marginTop: '16px',
        width: '100%',
        padding: '8px',
        background: 'rgba(79, 172, 254, 0.1)',
        border: '1px solid #4facfe',
        color: '#4facfe',
        borderRadius: '8px',
        cursor: 'pointer'
    },
    loaderContainer: {
        minHeight: '100vh',
        background: '#0f172a',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    },
    spinner: {
        width: '40px',
        height: '40px',
        border: '3px solid rgba(102, 126, 234, 0.1)',
        borderTopColor: '#667eea',
        borderRadius: '50%',
        animation: 'spin 1s linear infinite'
    }
};

export default AdminDashboard;

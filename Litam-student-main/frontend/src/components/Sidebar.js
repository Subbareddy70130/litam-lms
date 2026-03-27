import React from 'react';
import {
    LogOut, LayoutDashboard, User, CalendarDays, ClipboardCheck,
    Search, Library, GraduationCap, BookMarked, Calendar,
    Clock3, BookOpen, FileText, Home, MessageSquare, ChevronRight, X,
    Users, Bell, TrendingUp, Upload, Shield, Settings, Building2, UserCog
} from 'lucide-react';

// Menu items configuration for Student Dashboard
export const studentMenuItems = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'academic-calendar', label: 'Academic Calendar', icon: CalendarDays },
    { id: 'attendance', label: 'Attendance', icon: ClipboardCheck },
    { id: 'book-search', label: 'Book Search', icon: Search },
    { id: 'library-books', label: 'Library Books', icon: Library },
    { id: 'marks', label: 'Marks', icon: GraduationCap },
    { id: 'my-subjects', label: 'My Subjects', icon: BookMarked },
    { id: 'time-table', label: 'Time Table', icon: Calendar },
    { id: 'day-schedule', label: 'Day Schedule', icon: Clock3 },
    { id: 'resources', label: 'Resources', icon: BookOpen },
    { id: 'student-forms', label: 'Student Forms', icon: FileText },
    { id: 'hostel-biometric', label: 'Hostel Biometric', icon: Home },
    { id: 'feedback', label: 'Feedback', icon: MessageSquare },
];

// Menu items configuration for Faculty Dashboard
export const facultyMenuItems = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'profile', label: 'Profile & Account', icon: User },
    { id: 'courses', label: 'Course Management', icon: BookOpen },
    { id: 'students', label: 'Student Management', icon: Users },
    { id: 'attendance', label: 'Attendance', icon: ClipboardCheck },
    { id: 'marks', label: 'Marks & Grades', icon: GraduationCap },
    { id: 'timetable', label: 'Timetable', icon: Calendar },
    { id: 'notices', label: 'Announcements', icon: Bell },
    { id: 'assignments', label: 'Assignments', icon: FileText },
    { id: 'communication', label: 'Communication', icon: MessageSquare },
    { id: 'analytics', label: 'Reports & Analytics', icon: TrendingUp },
];

// Menu items configuration for Admin Dashboard
export const adminMenuItems = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'students', label: 'Student Management', icon: Users },
    { id: 'faculty', label: 'Faculty Management', icon: UserCog },
    { id: 'departments', label: 'Department Management', icon: Building2 },
    { id: 'courses', label: 'Course Management', icon: BookOpen },
    { id: 'attendance', label: 'Attendance Overview', icon: ClipboardCheck },
    { id: 'marks', label: 'Marks & Results', icon: GraduationCap },
    { id: 'timetable', label: 'Timetable Management', icon: Calendar },
    { id: 'notices', label: 'Announcements', icon: Bell },
    { id: 'users', label: 'User Management', icon: Shield },
    { id: 'analytics', label: 'Reports & Analytics', icon: TrendingUp },
    { id: 'settings', label: 'Settings', icon: Settings },
];

const Sidebar = ({
    menuItems,
    activeTab,
    onTabChange,
    sidebarCollapsed,
    setSidebarCollapsed,
    onLogout,
    title = "Dashboard",
    subtitle = "Portal",
    themeColor = "#4facfe"
}) => {
    const styles = {
        sidebar: {
            width: sidebarCollapsed ? '80px' : '280px',
            background: 'rgba(30, 41, 59, 0.8)',
            backdropFilter: 'blur(20px)',
            borderRight: '1px solid rgba(255, 255, 255, 0.1)',
            padding: '24px 16px',
            display: 'flex',
            flexDirection: 'column',
            minHeight: '100vh',
            transition: 'width 0.3s ease',
            position: 'relative',
        },
        sidebarHeader: {
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            marginBottom: '32px',
            padding: '0 8px',
            position: 'relative',
            justifyContent: sidebarCollapsed ? 'center' : 'flex-start',
        },
        logo: {
            width: '48px',
            height: '48px',
            background: `linear-gradient(135deg, ${themeColor} 0%, ${adjustColor(themeColor, 20)} 100%)`,
            borderRadius: '12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
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
        collapseBtn: {
            position: 'absolute',
            right: '-12px',
            top: '12px',
            width: '24px',
            height: '24px',
            background: `linear-gradient(135deg, ${themeColor} 0%, ${adjustColor(themeColor, 20)} 100%)`,
            border: 'none',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            color: 'white',
            fontSize: '12px',
            boxShadow: `0 2px 8px ${themeColor}66`,
            transition: 'all 0.3s ease',
            zIndex: 10,
        },
        nav: {
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
            overflowY: 'auto',
            maxHeight: 'calc(100vh - 200px)',
        },
        navItem: {
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            padding: sidebarCollapsed ? '14px' : '14px 16px',
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
            justifyContent: sidebarCollapsed ? 'center' : 'flex-start',
        },
        navItemActive: {
            background: `linear-gradient(135deg, ${themeColor}33 0%, ${adjustColor(themeColor, 20)}22 100%)`,
            color: themeColor,
            borderLeft: `3px solid ${themeColor}`,
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
    };

    return (
        <aside style={styles.sidebar}>
            <div style={styles.sidebarHeader}>
                <div style={styles.logo}>
                    <GraduationIcon color={themeColor} />
                </div>
                {!sidebarCollapsed && (
                    <div>
                        <h3 style={styles.sidebarTitle}>{title}</h3>
                        <p style={styles.sidebarSubtitle}>{subtitle}</p>
                    </div>
                )}
                <button
                    onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                    style={styles.collapseBtn}
                >
                    {sidebarCollapsed ? <ChevronRight size={18} /> : <X size={18} />}
                </button>
            </div>

            <nav style={styles.nav}>
                {menuItems.map((item) => (
                    <button
                        key={item.id}
                        onClick={() => onTabChange(item.id)}
                        style={{
                            ...styles.navItem,
                            ...(activeTab === item.id ? styles.navItemActive : {}),
                        }}
                        title={sidebarCollapsed ? item.label : ''}
                    >
                        <item.icon size={20} />
                        {!sidebarCollapsed && <span>{item.label}</span>}
                    </button>
                ))}
            </nav>

            <div style={styles.sidebarFooter}>
                <button
                    onClick={onLogout}
                    style={styles.logoutBtn}
                    title={sidebarCollapsed ? 'Logout' : ''}
                >
                    <LogOut size={20} />
                    {!sidebarCollapsed && <span>Logout</span>}
                </button>
            </div>
        </aside>
    );
};

// Helper function to lighten/darken color
function adjustColor(color, amount) {
    const usePound = color[0] === '#';
    const col = usePound ? color.slice(1) : color;
    const num = parseInt(col, 16);
    let r = (num >> 16) + amount;
    let g = ((num >> 8) & 0x00FF) + amount;
    let b = (num & 0x00FF) + amount;
    r = r > 255 ? 255 : r < 0 ? 0 : r;
    g = g > 255 ? 255 : g < 0 ? 0 : g;
    b = b > 255 ? 255 : b < 0 ? 0 : b;
    return (usePound ? '#' : '') + (g | (b << 8) | (r << 16)).toString(16).padStart(6, '0');
}

const GraduationIcon = ({ color }) => (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
            <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
            <path d="M6 12v5c3 3 9 3 12 0v-5" />
        </svg>
    </div>
);

export default Sidebar;

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, GraduationCap, LayoutDashboard, LogOut, LogIn } from 'lucide-react';
import './Navbar.css';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();

    const token = localStorage.getItem('access_token');
    const role = localStorage.getItem('role');

    const handleLogout = () => {
        localStorage.clear();
        setIsOpen(false);
        navigate('/login');
    };

    const handleDashboard = () => {
        setIsOpen(false);
        if (role === 'STUDENT') navigate('/dashboard/student');
        else if (role === 'FACULTY') navigate('/dashboard/faculty');
        else navigate('/dashboard/admin');
    };

    return (
        <nav className="navbar">
            <div className="navbar-container">
                <Link to="/" className="navbar-logo">
                    <div className="logo-icon">
                        <GraduationCap size={28} color="white" />
                    </div>
                    <span className="logo-text">LITAM CMS</span>
                </Link>

                <div className="menu-icon" onClick={() => setIsOpen(!isOpen)}>
                    {isOpen ? <X size={24} /> : <Menu size={24} />}
                </div>

                <ul className={isOpen ? 'nav-menu active' : 'nav-menu'}>
                    <li className="nav-item">
                        <Link to="/" className="nav-links" onClick={() => setIsOpen(false)}>Home</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/about" className="nav-links" onClick={() => setIsOpen(false)}>About</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/courses" className="nav-links" onClick={() => setIsOpen(false)}>Courses</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/gallery" className="nav-links" onClick={() => setIsOpen(false)}>Gallery</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/contact" className="nav-links" onClick={() => setIsOpen(false)}>Contact</Link>
                    </li>
                    {!token && (
                        <>
                            <li className="nav-item">
                                <Link to="/register/student" className="nav-links" onClick={() => setIsOpen(false)}>Student Register</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/register/faculty" className="nav-links" onClick={() => setIsOpen(false)}>Faculty Register</Link>
                            </li>
                        </>
                    )}

                    {token ? (
                        <>
                            <li className="nav-item">
                                <button className="btn-dashboard" onClick={handleDashboard}>
                                    <LayoutDashboard size={18} style={{ marginRight: 8 }} />
                                    Dashboard
                                </button>
                            </li>
                            <li className="nav-item">
                                <button className="btn-logout" onClick={handleLogout}>
                                    <LogOut size={18} style={{ marginRight: 8 }} />
                                    Logout
                                </button>
                            </li>
                        </>
                    ) : (
                        <li className="nav-item">
                            <button className="btn-login" onClick={() => { setIsOpen(false); navigate('/login'); }}>
                                <LogIn size={18} style={{ marginRight: 8 }} />
                                Login
                            </button>
                        </li>
                    )}
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
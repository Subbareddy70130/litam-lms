import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { loginUser } from '../../services/api';
import { LogIn, Mail, Lock, UserPlus, AlertCircle } from 'lucide-react';

const Login = () => {
    const [credentials, setCredentials] = useState({ username: '', password: '' });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => setCredentials({ ...credentials, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            const res = await loginUser(credentials);
            localStorage.setItem('access_token', res.data.access);
            localStorage.setItem('refresh_token', res.data.refresh);
            localStorage.setItem('role', res.data.role);
            localStorage.setItem('user', JSON.stringify(res.data.user));

            if (res.data.role === 'STUDENT') navigate('/dashboard/student');
            else if (res.data.role === 'FACULTY') navigate('/dashboard/faculty');
            else if (res.data.role === 'ADMIN') navigate('/dashboard/admin');
            else navigate('/');
        } catch (err) {
            console.error('Login Error:', err);
            if (err.code === 'ERR_NETWORK') {
                setError('Cannot connect to server. Please make sure the backend server is running on http://localhost:8000');
            } else if (err.response?.data?.error) {
                setError(err.response.data.error);
            } else if (err.response?.data) {
                // Handle validation errors from DRF
                const errors = Object.entries(err.response.data)
                    .map(([key, value]) => `${key}: ${Array.isArray(value) ? value.join(', ') : value}`)
                    .join('; ');
                setError(errors || 'Login failed. Please check your credentials.');
            } else {
                setError('Login failed. Please check your credentials.');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{
            minHeight: '100vh',
            background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '24px',
            position: 'relative',
            overflow: 'hidden'
        }}>
            {/* Background decoration */}
            <div style={{
                position: 'absolute',
                top: '-50%',
                right: '-20%',
                width: '800px',
                height: '800px',
                background: 'radial-gradient(circle, rgba(102, 126, 234, 0.15) 0%, transparent 70%)',
                borderRadius: '50%'
            }} />
            <div style={{
                position: 'absolute',
                bottom: '-50%',
                left: '-20%',
                width: '600px',
                height: '600px',
                background: 'radial-gradient(circle, rgba(240, 147, 251, 0.1) 0%, transparent 70%)',
                borderRadius: '50%'
            }} />

            <div style={{
                background: 'rgba(30, 41, 59, 0.8)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '24px',
                padding: '48px',
                width: '100%',
                maxWidth: '420px',
                boxShadow: '0 25px 50px rgba(0, 0, 0, 0.5)',
                animation: 'fadeIn 0.5s ease-out',
                position: 'relative',
                zIndex: 1
            }}>
                {/* Logo/Header */}
                <div style={{ textAlign: 'center', marginBottom: '32px' }}>
                    <div style={{
                        width: '64px',
                        height: '64px',
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        borderRadius: '16px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        margin: '0 auto 16px',
                        boxShadow: '0 10px 30px rgba(102, 126, 234, 0.4)'
                    }}>
                        <LogIn size={32} color="white" />
                    </div>
                    <h2 style={{
                        fontSize: '1.75rem',
                        fontWeight: 700,
                        color: 'white',
                        marginBottom: '8px'
                    }}>Welcome Back</h2>
                    <p style={{ color: 'rgba(255, 255, 255, 0.6)', fontSize: '0.95rem' }}>
                        Sign in to access your dashboard
                    </p>
                </div>

                {/* Error Message */}
                {error && (
                    <div style={{
                        background: 'rgba(239, 68, 68, 0.15)',
                        border: '1px solid rgba(239, 68, 68, 0.3)',
                        borderRadius: '12px',
                        padding: '12px 16px',
                        marginBottom: '20px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                        color: '#fca5a5'
                    }}>
                        <AlertCircle size={18} />
                        <span style={{ fontSize: '0.9rem' }}>{error}</span>
                    </div>
                )}

                {/* Login Form */}
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    <div>
                        <label style={{
                            display: 'block',
                            color: 'rgba(255, 255, 255, 0.8)',
                            fontWeight: 500,
                            marginBottom: '8px',
                            fontSize: '0.9rem'
                        }}>
                            Username
                        </label>
                        <div style={{ position: 'relative' }}>
                            <Mail size={18} style={{
                                position: 'absolute',
                                left: '16px',
                                top: '50%',
                                transform: 'translateY(-50%)',
                                color: 'rgba(255, 255, 255, 0.4)'
                            }} />
                            <input
                                type="text"
                                name="username"
                                value={credentials.username}
                                onChange={handleChange}
                                placeholder="Enter your username"
                                required
                                style={{
                                    width: '100%',
                                    padding: '14px 16px 14px 48px',
                                    background: 'rgba(15, 23, 42, 0.8)',
                                    border: '1px solid rgba(255, 255, 255, 0.1)',
                                    borderRadius: '12px',
                                    color: 'white',
                                    fontSize: '1rem',
                                    transition: 'all 0.3s ease',
                                    outline: 'none'
                                }}
                                onFocus={(e) => {
                                    e.target.style.borderColor = '#667eea';
                                    e.target.style.boxShadow = '0 0 0 3px rgba(102, 126, 234, 0.2)';
                                }}
                                onBlur={(e) => {
                                    e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                                    e.target.style.boxShadow = 'none';
                                }}
                            />
                        </div>
                    </div>

                    <div>
                        <label style={{
                            display: 'block',
                            color: 'rgba(255, 255, 255, 0.8)',
                            fontWeight: 500,
                            marginBottom: '8px',
                            fontSize: '0.9rem'
                        }}>
                            Password
                        </label>
                        <div style={{ position: 'relative' }}>
                            <Lock size={18} style={{
                                position: 'absolute',
                                left: '16px',
                                top: '50%',
                                transform: 'translateY(-50%)',
                                color: 'rgba(255, 255, 255, 0.4)'
                            }} />
                            <input
                                type="password"
                                name="password"
                                value={credentials.password}
                                onChange={handleChange}
                                placeholder="Enter your password"
                                required
                                style={{
                                    width: '100%',
                                    padding: '14px 16px 14px 48px',
                                    background: 'rgba(15, 23, 42, 0.8)',
                                    border: '1px solid rgba(255, 255, 255, 0.1)',
                                    borderRadius: '12px',
                                    color: 'white',
                                    fontSize: '1rem',
                                    transition: 'all 0.3s ease',
                                    outline: 'none'
                                }}
                                onFocus={(e) => {
                                    e.target.style.borderColor = '#667eea';
                                    e.target.style.boxShadow = '0 0 0 3px rgba(102, 126, 234, 0.2)';
                                }}
                                onBlur={(e) => {
                                    e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                                    e.target.style.boxShadow = 'none';
                                }}
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        style={{
                            width: '100%',
                            padding: '16px',
                            background: loading
                                ? 'linear-gradient(135deg, #475569 0%, #64748b 100%)'
                                : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                            color: 'white',
                            border: 'none',
                            borderRadius: '12px',
                            fontSize: '1rem',
                            fontWeight: 600,
                            cursor: loading ? 'not-allowed' : 'pointer',
                            transition: 'all 0.3s ease',
                            boxShadow: loading ? 'none' : '0 10px 30px rgba(102, 126, 234, 0.4)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '8px'
                        }}
                    >
                        {loading ? 'Signing In...' : 'Sign In'}
                        {!loading && <LogIn size={18} />}
                    </button>
                </form>

                {/* Divider */}
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    margin: '24px 0',
                    gap: '16px'
                }}>
                    <div style={{ flex: 1, height: '1px', background: 'rgba(255, 255, 255, 0.1)' }} />
                    <span style={{ color: 'rgba(255, 255, 255, 0.4)', fontSize: '0.85rem' }}>or</span>
                    <div style={{ flex: 1, height: '1px', background: 'rgba(255, 255, 255, 0.1)' }} />
                </div>

                {/* Register Links */}
                <div style={{ textAlign: 'center' }}>
                    <p style={{ color: 'rgba(255, 255, 255, 0.6)', marginBottom: '12px', fontSize: '0.9rem' }}>
                        Don't have an account?
                    </p>
                    <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
                        <Link
                            to="/register/student"
                            style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '6px',
                                padding: '10px 20px',
                                background: 'rgba(79, 172, 254, 0.1)',
                                border: '1px solid rgba(79, 172, 254, 0.3)',
                                borderRadius: '10px',
                                color: '#4facfe',
                                textDecoration: 'none',
                                fontWeight: 500,
                                fontSize: '0.9rem',
                                transition: 'all 0.3s ease'
                            }}
                        >
                            <UserPlus size={16} />
                            Student
                        </Link>
                        <Link
                            to="/register/faculty"
                            style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '6px',
                                padding: '10px 20px',
                                background: 'rgba(16, 185, 129, 0.1)',
                                border: '1px solid rgba(16, 185, 129, 0.3)',
                                borderRadius: '10px',
                                color: '#10b981',
                                textDecoration: 'none',
                                fontWeight: 500,
                                fontSize: '0.9rem',
                                transition: 'all 0.3s ease'
                            }}
                        >
                            <UserPlus size={16} />
                            Faculty
                        </Link>
                    </div>
                </div>
            </div>

            <style>{`
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                input::placeholder { color: rgba(255, 255, 255, 0.4); }
            `}</style>
        </div>
    );
};

export default Login;
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { registerFaculty } from '../../services/api';
import { 
    User, Mail, Lock, Briefcase, Building, 
    UserPlus, ArrowRight, AlertCircle, Sparkles 
} from 'lucide-react';

const RegisterFaculty = () => {
    const [data, setData] = useState({ 
        username: '', email: '', password: '', 
        first_name: '', last_name: '', 
        department: '', designation: '' 
    });
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => setData({ ...data, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');
        try {
            await registerFaculty(data);
            alert('Faculty Registration successful! You can now login.');
            navigate('/login');
        } catch (err) {
            console.error('Registration Error:', err.response?.data);
            setMessage('Registration failed. Username or Email might be already in use.');
        } finally {
            setLoading(false);
        }
    };

    const inputStyle = {
        width: '100%',
        padding: '12px 16px 12px 48px',
        background: 'rgba(15, 23, 42, 0.6)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        borderRadius: '12px',
        color: 'white',
        fontSize: '0.95rem',
        outline: 'none',
        transition: 'all 0.3s ease'
    };

    const labelStyle = {
        display: 'block',
        color: 'rgba(255, 255, 255, 0.7)',
        fontSize: '0.85rem',
        fontWeight: 500,
        marginBottom: '6px',
        marginLeft: '4px'
    };

    const iconStyle = {
        position: 'absolute',
        left: '16px',
        top: '50%',
        transform: 'translateY(-50%)',
        color: 'rgba(255, 255, 255, 0.4)'
    };

    return (
        <div style={{
            minHeight: '100vh',
            background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '40px 20px',
            position: 'relative',
            overflow: 'hidden'
        }}>
            <div style={{
                background: 'rgba(30, 41, 59, 0.7)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '24px',
                padding: '40px',
                width: '100%',
                maxWidth: '650px',
                boxShadow: '0 25px 50px rgba(0, 0, 0, 0.4)',
                position: 'relative',
                zIndex: 1
            }}>
                <div style={{ textAlign: 'center', marginBottom: '32px' }}>
                    <div style={{
                        width: '56px',
                        height: '56px',
                        background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                        borderRadius: '14px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        margin: '0 auto 16px',
                        boxShadow: '0 10px 25px rgba(16, 185, 129, 0.3)'
                    }}>
                        <UserPlus size={28} color="white" />
                    </div>
                    <h2 style={{ fontSize: '1.75rem', fontWeight: 700, color: 'white' }}>Faculty Registration</h2>
                    <p style={{ color: 'rgba(255, 255, 255, 0.5)', marginTop: '8px' }}>Join the LITAM distinguished faculty</p>
                </div>

                {message && (
                    <div style={{
                        background: 'rgba(239, 68, 68, 0.1)',
                        border: '1px solid rgba(239, 68, 68, 0.2)',
                        padding: '12px',
                        borderRadius: '10px',
                        color: '#fca5a5',
                        fontSize: '0.85rem',
                        marginBottom: '24px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px'
                    }}>
                        <AlertCircle size={18} />
                        {message}
                    </div>
                )}

                <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                    <div style={{ gridColumn: 'span 1' }}>
                        <label style={labelStyle}>Username</label>
                        <div style={{ position: 'relative' }}>
                            <User size={18} style={iconStyle} />
                            <input type="text" name="username" value={data.username} onChange={handleChange} placeholder="john_faculty" style={inputStyle} required />
                        </div>
                    </div>

                    <div style={{ gridColumn: 'span 1' }}>
                        <label style={labelStyle}>Password</label>
                        <div style={{ position: 'relative' }}>
                            <Lock size={18} style={iconStyle} />
                            <input type="password" name="password" value={data.password} onChange={handleChange} placeholder="••••••••" style={inputStyle} required />
                        </div>
                    </div>

                    <div style={{ gridColumn: 'span 2' }}>
                        <label style={labelStyle}>Official Email</label>
                        <div style={{ position: 'relative' }}>
                            <Mail size={18} style={iconStyle} />
                            <input type="email" name="email" value={data.email} onChange={handleChange} placeholder="faculty@college.edu" style={inputStyle} required />
                        </div>
                    </div>

                    <div style={{ gridColumn: 'span 1' }}>
                        <label style={labelStyle}>First Name</label>
                        <div style={{ position: 'relative' }}>
                            <Sparkles size={18} style={iconStyle} />
                            <input type="text" name="first_name" value={data.first_name} onChange={handleChange} placeholder="John" style={inputStyle} />
                        </div>
                    </div>

                    <div style={{ gridColumn: 'span 1' }}>
                        <label style={labelStyle}>Last Name</label>
                        <div style={{ position: 'relative' }}>
                            <Sparkles size={18} style={iconStyle} />
                            <input type="text" name="last_name" value={data.last_name} onChange={handleChange} placeholder="Doe" style={inputStyle} />
                        </div>
                    </div>

                    <div style={{ gridColumn: 'span 1' }}>
                        <label style={labelStyle}>Department</label>
                        <div style={{ position: 'relative' }}>
                            <Building size={18} style={iconStyle} />
                            <input type="text" name="department" value={data.department} onChange={handleChange} placeholder="CSE / ECE" style={inputStyle} required />
                        </div>
                    </div>

                    <div style={{ gridColumn: 'span 1' }}>
                        <label style={labelStyle}>Designation</label>
                        <div style={{ position: 'relative' }}>
                            <Briefcase size={18} style={iconStyle} />
                            <input type="text" name="designation" value={data.designation} onChange={handleChange} placeholder="Assistant Professor" style={inputStyle} required />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        style={{
                            gridColumn: 'span 2',
                            padding: '14px',
                            background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                            color: 'white',
                            border: 'none',
                            borderRadius: '12px',
                            fontWeight: 600,
                            fontSize: '1rem',
                            cursor: loading ? 'not-allowed' : 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '10px',
                            marginTop: '10px',
                            boxShadow: '0 10px 25px rgba(16, 185, 129, 0.3)'
                        }}
                    >
                        {loading ? 'Processing...' : 'Complete Registration'}
                        {!loading && <ArrowRight size={18} />}
                    </button>
                </form>

                <div style={{ textAlign: 'center', marginTop: '24px' }}>
                    <p style={{ color: 'rgba(255, 255, 255, 0.5)', fontSize: '0.9rem' }}>
                        Already have an account? <Link to="/login" style={{ color: '#10b981', textDecoration: 'none', fontWeight: 600 }}>Sign In</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default RegisterFaculty;

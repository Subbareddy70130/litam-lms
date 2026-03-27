import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, MessageSquare, User, Tag } from 'lucide-react';
import './Contact.css';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        alert('Thank you for contacting us! We will get back to you soon.');
        setFormData({ name: '', email: '', subject: '', message: '' });
    };

    return (
        <div className="contact-page">
            <div className="hero-section">
                <div className="container">
                    <h1>Get In Touch</h1>
                    <p>Have questions? We're here to help. Contact any of our departments or visit our campus.</p>
                </div>
            </div>

            <div className="container">
                <div className="contact-wrapper">
                    <div className="contact-info">
                        <div className="glass-card">
                            <h2 className="section-title">Contact Information</h2>
                            <div className="info-list">
                                <div className="info-item">
                                    <div className="icon-box blue">
                                        <MapPin size={24} />
                                    </div>
                                    <div>
                                        <h3>Campus Address</h3>
                                        <p>Dhulipalla, Sattenapalli (M), Guntur Dist, Andhra Pradesh - 522412</p>
                                    </div>
                                </div>
                                <div className="info-item">
                                    <div className="icon-box green">
                                        <Mail size={24} />
                                    </div>
                                    <div>
                                        <h3>Email Support</h3>
                                        <p>info@litam.in</p>
                                        <p>admissions@litam.in</p>
                                    </div>
                                </div>
                                <div className="info-item">
                                    <div className="icon-box yellow">
                                        <Phone size={24} />
                                    </div>
                                    <div>
                                        <h3>Phone Number</h3>
                                        <p>+91 99666 99666</p>
                                        <p>+91 08641 245XXX</p>
                                    </div>
                                </div>
                            </div>

                            <div className="map-wrapper">
                                <iframe
                                    title="Google Maps"
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3828.471676839352!2d80.08253191486221!3d16.347318788708316!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a4a7559e5f5f5f5%3A0x5f5f5f5f5f5f5f5f!2sLoyola%20Institute%20of%20Technology%20and%20Management!5e0!3m2!1sen!2sin!4v1600000000000!5m2!1sen!2sin"
                                    width="100%"
                                    height="200"
                                    style={{ border: 0, borderRadius: '16px' }}
                                    allowFullScreen=""
                                    loading="lazy">
                                </iframe>
                            </div>
                        </div>
                    </div>

                    <div className="contact-form-section">
                        <div className="glass-card">
                            <h2 className="section-title">Send a Message</h2>
                            <form onSubmit={handleSubmit} className="modern-form">
                                <div className="form-grid">
                                    <div className="form-group">
                                        <label><User size={14} /> Full Name</label>
                                        <input 
                                            type="text" 
                                            name="name" 
                                            placeholder="John Doe" 
                                            value={formData.name} 
                                            onChange={handleChange} 
                                            required 
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label><Mail size={14} /> Email Address</label>
                                        <input 
                                            type="email" 
                                            name="email" 
                                            placeholder="john@example.com" 
                                            value={formData.email} 
                                            onChange={handleChange} 
                                            required 
                                        />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label><Tag size={14} /> Subject</label>
                                    <input 
                                        type="text" 
                                        name="subject" 
                                        placeholder="How can we help?" 
                                        value={formData.subject} 
                                        onChange={handleChange} 
                                        required 
                                    />
                                </div>
                                <div className="form-group">
                                    <label><MessageSquare size={14} /> Message</label>
                                    <textarea 
                                        name="message" 
                                        placeholder="Type your message here..." 
                                        value={formData.message} 
                                        onChange={handleChange} 
                                        required 
                                        rows="5"
                                    ></textarea>
                                </div>
                                <button type="submit" className="submit-btn shadow-glow">
                                    <span>Send Message</span>
                                    <Send size={18} />
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;

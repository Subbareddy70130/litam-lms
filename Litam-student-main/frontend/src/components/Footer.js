import React from 'react';
import { 
    GraduationCap, Mail, Phone, MapPin, 
    Facebook, Twitter, Instagram, Linkedin,
    ChevronRight, Heart
} from 'lucide-react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer shadow-glow-top">
            <div className="container footer-grid">
                <div className="footer-brand">
                    <div className="footer-logo">
                        <GraduationCap size={32} />
                        <span>LITAM CMS</span>
                    </div>
                    <p className="brand-text">
                        Empowering students with quality education and state-of-the-art facilities since 2008. 
                        Dedicated to excellence in engineering and management.
                    </p>
                    <div className="social-links">
                        <a href="#" className="social-btn"><Facebook size={18} /></a>
                        <a href="#" className="social-btn"><Twitter size={18} /></a>
                        <a href="#" className="social-btn"><Instagram size={18} /></a>
                        <a href="#" className="social-btn"><Linkedin size={18} /></a>
                    </div>
                </div>

                <div className="footer-nav">
                    <h3>Explore</h3>
                    <ul>
                        <li><Link to="/about"><ChevronRight size={14} /> About Us</Link></li>
                        <li><Link to="/courses"><ChevronRight size={14} /> Academic Programs</Link></li>
                        <li><Link to="/faculty"><ChevronRight size={14} /> Expert Faculty</Link></li>
                        <li><Link to="/gallery"><ChevronRight size={14} /> Campus Gallery</Link></li>
                        <li><Link to="/notices"><ChevronRight size={14} /> Announcements</Link></li>
                    </ul>
                </div>

                <div className="footer-contact">
                    <h3>Contact Info</h3>
                    <div className="contact-info-list">
                        <div className="contact-item">
                            <MapPin size={18} className="icon-blue" />
                            <span>Dhulipalla, Sattenapalli (M), Guntur Dist, AP - 522412</span>
                        </div>
                        <div className="contact-item">
                            <Mail size={18} className="icon-green" />
                            <span>info@litam.in</span>
                        </div>
                        <div className="contact-item">
                            <Phone size={18} className="icon-yellow" />
                            <span>+91 99666 99666</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="footer-bottom">
                <div className="container bottom-content">
                    <p>&copy; {new Date().getFullYear()} LITAM. Designed with <Heart size={14} fill="#ef4444" color="#ef4444" /> for Excellence.</p>
                    <div className="legal-links">
                        <a href="#">Privacy Policy</a>
                        <span className="dot"></span>
                        <a href="#">Terms of Service</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;

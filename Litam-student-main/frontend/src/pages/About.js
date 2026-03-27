import React from 'react';
import { Target, Lightbulb, GraduationCap, Library, Cpu, Globe } from 'lucide-react';
import './About.css';

const About = () => {
    return (
        <div className="about-page">
            <div className="hero-section">
                <div className="container">
                    <h1>About LITAM</h1>
                    <p>Empowering the next generation of engineers and managers through excellence in education, innovation, and ethical values.</p>
                </div>
            </div>

            <div className="container">
                <section className="vision-mission">
                    <div className="glass-card vision">
                        <div className="card-header">
                            <Target size={32} className="icon-blue" />
                            <h2>Our Vision</h2>
                        </div>
                        <p>To be a premier institution in the field of technical and management education, fostering innovation and excellence to serve the society and nation.</p>
                    </div>

                    <div className="glass-card mission">
                        <div className="card-header">
                            <Lightbulb size={32} className="icon-green" />
                            <h2>Our Mission</h2>
                        </div>
                        <ul>
                            <li>
                                <div className="dot blue" />
                                <span>Provide high-quality education and training through state-of-the-art infrastructure.</span>
                            </li>
                            <li>
                                <div className="dot green" />
                                <span>Promote research and development in engineering and management.</span>
                            </li>
                            <li>
                                <div className="dot yellow" />
                                <span>Cultivate ethical values and professional competence in our students.</span>
                            </li>
                        </ul>
                    </div>
                </section>

                <section className="about-grid">
                    <div className="info-card">
                        <div className="icon-wrapper">
                            <Globe size={24} />
                        </div>
                        <h3>Global Campus</h3>
                        <p>Sprawling over a lush green campus with modern facilities and sustainable infrastructure.</p>
                    </div>
                    <div className="info-card">
                        <div className="icon-wrapper">
                            <Library size={24} />
                        </div>
                        <h3>Modern Library</h3>
                        <p>Well-stocked library with thousands of books, journals, and premium digital resources.</p>
                    </div>
                    <div className="info-card">
                        <div className="icon-wrapper">
                            <Cpu size={24} />
                        </div>
                        <h3>Advanced Labs</h3>
                        <p>Specialized laboratories equipped with industry-leading technology for hands-on learning.</p>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default About;

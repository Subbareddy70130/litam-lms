import React, { useEffect, useState } from 'react';
import { getGallery } from '../services/api';
import { Image, Maximize2, Camera, Sparkles } from 'lucide-react';
import './Gallery.css';

const Gallery = () => {
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchGallery = async () => {
            try {
                const response = await getGallery();
                setImages(response.data);
            } catch (error) {
                console.error('Error fetching gallery images:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchGallery();
    }, []);

    const localGalleryImages = [
        { id: 'local1', image: '/images/A4-1.jpg', title: 'Main Campus Entrance', category: 'Infrastructure' },
        { id: 'local2', image: '/images/college.jpg', title: 'Academic Block', category: 'Campus' },
        { id: 'local3', image: '/images/processed-38ec4f37-6aaa-4337-bb5e-dcb51e50613f_FEUqdgnj-300x300.jpeg', title: 'Cultural Fest 2025', category: 'Events' },
        { id: 'local5', image: '/images/NAAC-Logo-250x250-1.png', title: 'Quality Assurance', category: 'Awards' }
    ];

    const displayImages = [...localGalleryImages, ...images];

    if (loading) return (
        <div className="loader-container">
            <div className="spinner"></div>
            <p>Gathering campus memories...</p>
        </div>
    );

    return (
        <div className="gallery-page">
            <div className="hero-section">
                <div className="container">
                    <div className="icon-badge">
                        <Camera size={20} />
                        <span>Visual Journey</span>
                    </div>
                    <h1>Campus Gallery</h1>
                    <p>Capturing the vibrant life, architectural beauty, and academic spirit of LITAM.</p>
                </div>
            </div>

            <div className="container">
                <div className="gallery-grid">
                    {displayImages.map((img, index) => (
                        <div key={img.id} className="gallery-item shadow-glow" style={{ animationDelay: `${index * 0.1}s` }}>
                            <div className="image-wrapper">
                                <img src={img.image} alt={img.title} />
                                <div className="glass-overlay">
                                    <div className="overlay-content">
                                        <span className="category-tag">{img.category || 'Gallery'}</span>
                                        <h3>{img.title}</h3>
                                        <button className="expand-btn">
                                            <Maximize2 size={16} />
                                            View Full
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                    {displayImages.length === 0 && (
                        <div className="no-data">
                            <Image size={48} color="rgba(255,255,255,0.2)" />
                            <p>No memories have been added yet.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Gallery;

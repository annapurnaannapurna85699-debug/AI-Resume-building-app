import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const navigate = useNavigate();

    return (
        <div style={{
            height: 'calc(100vh - 64px)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            padding: '0 24px',
            background: 'radial-gradient(circle at center, #fff 0%, #f9f9f9 100%)'
        }}>
            <h1 style={{
                fontSize: 'clamp(48px, 8vw, 84px)',
                lineHeight: 1.1,
                marginBottom: '24px',
                maxWidth: '900px',
                fontWeight: 700
            }}>
                Build a Resume That <br /> Gets Read.
            </h1>

            <p style={{
                fontSize: '20px',
                color: '#666',
                marginBottom: '40px',
                maxWidth: '600px'
            }}>
                Premium intelligence for high-impact careers. Create a professional record that stands out in the modern market.
            </p>

            <button
                onClick={() => navigate('/builder')}
                className="button button--primary"
                style={{
                    width: 'auto',
                    padding: '20px 48px',
                    fontSize: '18px',
                    background: '#000',
                    color: '#fff',
                    borderRadius: '4px'
                }}
            >
                Start Building
            </button>

            <div style={{ marginTop: '80px', opacity: 0.3, fontSize: '12px', letterSpacing: '0.2em', textTransform: 'uppercase' }}>
                TRUSTED BY LEADERS AT TOP COMPANIES
            </div>
        </div>
    );
};

export default Home;

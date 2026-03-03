import React from 'react';
import { NavLink, Link, Outlet } from 'react-router-dom';

const AppLayout = () => {
    return (
        <div className="app-container" style={{ background: '#fff' }}>
            <nav className="top-bar" style={{
                background: '#fff',
                borderBottom: '1px solid #eee',
                padding: '0 24px',
                height: '64px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                position: 'sticky',
                top: 0,
                zIndex: 1000
            }}>
                <div className="top-bar__left">
                    <Link to="/" style={{
                        fontSize: '18px',
                        fontWeight: 700,
                        letterSpacing: '0.02em',
                        textDecoration: 'none',
                        color: 'inherit',
                        fontFamily: 'var(--font-heading)'
                    }}>
                        AI Resume Builder
                    </Link>
                </div>

                <div style={{ display: 'flex', gap: '32px' }}>
                    <NavLink
                        to="/builder"
                        style={({ isActive }) => ({
                            fontSize: '14px',
                            fontWeight: 600,
                            color: isActive ? '#000' : '#888',
                            textDecoration: 'none',
                            textTransform: 'uppercase',
                            letterSpacing: '0.05em',
                            transition: 'color 0.2s'
                        })}
                    >
                        Builder
                    </NavLink>
                    <NavLink
                        to="/preview"
                        style={({ isActive }) => ({
                            fontSize: '14px',
                            fontWeight: 600,
                            color: isActive ? '#000' : '#888',
                            textDecoration: 'none',
                            textTransform: 'uppercase',
                            letterSpacing: '0.05em',
                            transition: 'color 0.2s'
                        })}
                    >
                        Preview
                    </NavLink>
                    <NavLink
                        to="/proof"
                        style={({ isActive }) => ({
                            fontSize: '14px',
                            fontWeight: 600,
                            color: isActive ? '#000' : '#888',
                            textDecoration: 'none',
                            textTransform: 'uppercase',
                            letterSpacing: '0.05em',
                            transition: 'color 0.2s'
                        })}
                    >
                        Proof
                    </NavLink>
                </div>

                <div className="top-bar__right">
                    <button className="button button--secondary" style={{ width: 'auto', padding: '6px 16px', fontSize: '12px', fontWeight: 600 }}>
                        SIGN IN
                    </button>
                </div>
            </nav>

            <main style={{ minHeight: 'calc(100vh - 64px)' }}>
                <Outlet />
            </main>
        </div>
    );
};

export default AppLayout;

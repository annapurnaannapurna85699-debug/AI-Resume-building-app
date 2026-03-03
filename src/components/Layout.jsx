import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate, Outlet } from 'react-router-dom';
import { PROJECT_STEPS, getStepIndex } from '../ProjectData';
import { Copy, ExternalLink, Check, AlertCircle, Camera } from 'lucide-react';

const Layout = ({ children }) => {
    const location = useLocation();
    const navigate = useNavigate();
    const currentStepIndex = getStepIndex(location.pathname);
    const currentStep = PROJECT_STEPS[currentStepIndex];

    const [artifacts, setArtifacts] = useState(() => {
        const saved = localStorage.getItem('rb_artifacts');
        return saved ? JSON.parse(saved) : {};
    });

    const [screenshot, setScreenshot] = useState(null);

    useEffect(() => {
        localStorage.setItem('rb_artifacts', JSON.stringify(artifacts));
    }, [artifacts]);

    const isStepCompleted = (index) => {
        const step = PROJECT_STEPS[index];
        if (!step) return false;
        if (step.id === 'proof') return true; // Always allow proof view? Or not?
        return artifacts[`rb_step_${step.id}_artifact`] ? true : false;
    };

    const currentStepArtifact = artifacts[`rb_step_${currentStep?.id}_artifact`] || '';

    const handleArtifactChange = (e) => {
        setArtifacts(prev => ({
            ...prev,
            [`rb_step_${currentStep.id}_artifact`]: e.target.value
        }));
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(currentStepArtifact);
    };

    const nextEnabled = currentStepArtifact.trim().length > 0;

    const goToNext = () => {
        if (nextEnabled && currentStepIndex < PROJECT_STEPS.length - 1) {
            navigate(PROJECT_STEPS[currentStepIndex + 1].path);
        }
    };

    const goToPrev = () => {
        if (currentStepIndex > 0) {
            navigate(PROJECT_STEPS[currentStepIndex - 1].path);
        }
    };

    // Gating system: If trying to access a step beyond the first incomplete step, redirect to that incomplete step
    useEffect(() => {
        if (currentStepIndex > 0 && currentStep.id !== 'proof') {
            for (let i = 0; i < currentStepIndex; i++) {
                if (!isStepCompleted(i)) {
                    navigate(PROJECT_STEPS[i].path);
                    break;
                }
            }
        }
    }, [location.pathname, artifacts]);

    if (!currentStep) return <Outlet />;

    return (
        <div className="app-container">
            {/* Top Bar */}
            <nav className="top-bar">
                <div className="top-bar__left">AI Resume Builder</div>
                <div className="top-bar__center">
                    {currentStep.id === 'proof' ? 'Final Submission' : `Project 3 — Step ${currentStepIndex + 1} of 8`}
                </div>
                <div className="top-bar__right">
                    <span className="status-badge">Build Track</span>
                </div>
            </nav>

            {/* Context Header */}
            <header className="context-header">
                <h1>{currentStep.label}</h1>
                <p>Follow the build track to complete your AI Resume Builder.</p>
            </header>

            {/* Main Content Area */}
            <main className="main-layout">
                <div className="primary-workspace">
                    <div className="card" style={{ minHeight: '400px' }}>
                        <Outlet context={{ artifacts, setArtifacts }} />
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 'var(--space-3)' }}>
                        <button
                            className="button button--secondary"
                            style={{ width: 'auto' }}
                            onClick={goToPrev}
                            disabled={currentStepIndex === 0}
                        >
                            Back
                        </button>

                        {currentStep.id !== 'proof' && (
                            <button
                                className="button button--primary"
                                style={{ width: 'auto' }}
                                onClick={goToNext}
                                disabled={!nextEnabled}
                            >
                                Next Step
                            </button>
                        )}
                    </div>
                </div>

                {/* Secondary Build Panel */}
                <aside className="secondary-panel">
                    <div className="card">
                        <div className="stack-medium">
                            <div className="input-group">
                                <label>Copy This Into Lovable</label>
                                <textarea
                                    rows="10"
                                    placeholder="Artifact content will appear here..."
                                    value={currentStepArtifact}
                                    onChange={handleArtifactChange}
                                    className="font-mono text-sm"
                                />
                            </div>

                            <button className="button button--secondary" onClick={copyToClipboard}>
                                <Copy size={16} /> Copy Artifact
                            </button>

                            <a
                                href="https://lovable.dev"
                                target="_blank"
                                rel="noreferrer"
                                className="button button--primary"
                            >
                                <ExternalLink size={16} /> Build in Lovable
                            </a>

                            <div style={{ borderTop: '1px solid var(--color-border)', pt: 'var(--space-2)', marginTop: 'var(--space-2)' }}></div>

                            <div className="stack-small">
                                <label style={{ fontSize: '12px', fontWeight: '600', opacity: 0.6 }}>STATUS</label>
                                <div style={{ display: 'flex', gap: '8px' }}>
                                    <button className="button button--secondary" style={{ padding: '8px', flex: 1 }}>
                                        <Check size={14} color="var(--color-success)" /> It Worked
                                    </button>
                                    <button className="button button--secondary" style={{ padding: '8px', flex: 1 }}>
                                        <AlertCircle size={14} color="var(--color-accent)" /> Error
                                    </button>
                                </div>
                                <button className="button button--secondary">
                                    <Camera size={16} /> Add Screenshot
                                </button>
                            </div>
                        </div>
                    </div>
                </aside>
            </main>

            {/* Proof Footer */}
            <footer className="proof-footer">
                <ul className="checklist">
                    {PROJECT_STEPS.slice(0, 8).map((step, index) => (
                        <li
                            key={step.id}
                            className={`checklist-item ${currentStepIndex === index ? 'checklist-item--active' : ''} ${isStepCompleted(index) ? 'checklist-item--completed' : ''}`}
                        >
                            <span className="step-indicator">
                                {isStepCompleted(index) ? <Check size={10} /> : index + 1}
                            </span>
                            {step.label}
                        </li>
                    ))}
                </ul>
            </footer>
        </div>
    );
};

export default Layout;

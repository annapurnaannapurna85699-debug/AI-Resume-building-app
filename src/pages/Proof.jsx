import React, { useState } from 'react';
import { PROJECT_STEPS } from '../ProjectData';
import { Check, X, Link as LinkIcon, Github, Globe, Copy } from 'lucide-react';

const Proof = () => {
    const [links, setLinks] = useState({
        lovable: '',
        github: '',
        deploy: ''
    });

    const artifacts = JSON.parse(localStorage.getItem('rb_artifacts') || '{}');

    const isStepCompleted = (id) => {
        return artifacts[`rb_step_${id}_artifact`] ? true : false;
    };

    const handleLinkChange = (key, value) => {
        setLinks(prev => ({ ...prev, [key]: value }));
    };

    const copyFinalSubmission = () => {
        const summary = PROJECT_STEPS.slice(0, 8).map(step => {
            const completed = isStepCompleted(step.id);
            return `${step.label}: ${completed ? 'COMPLETED' : 'PENDING'}`;
        }).join('\n');

        const finalString = `FINAL SUBMISSION: AI RESUME BUILDER\n\n${summary}\n\nLinks:\n- Lovable: ${links.lovable}\n- GitHub: ${links.github}\n- Deploy: ${links.deploy}`;

        navigator.clipboard.writeText(finalString);
        alert('Final submission copied to clipboard!');
    };

    return (
        <div className="stack-large">
            <div className="stack-small">
                <h2 style={{ fontSize: '24px' }}>Final Proof</h2>
                <p style={{ opacity: 0.7 }}>Review your progress and submit your project links.</p>
            </div>

            <div className="grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 'var(--space-2)' }}>
                {PROJECT_STEPS.slice(0, 8).map((step) => (
                    <div key={step.id} className="card" style={{ padding: 'var(--space-2)', marginBottom: 0, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <span style={{ fontSize: '14px', fontWeight: '500' }}>{step.id}. {step.label}</span>
                        {isStepCompleted(step.id) ? (
                            <Check size={16} color="var(--color-success)" />
                        ) : (
                            <X size={16} color="var(--color-accent)" />
                        )}
                    </div>
                ))}
            </div>

            <div className="stack-medium">
                <h3 style={{ fontSize: '18px', fontWeight: '600' }}>Submission Links</h3>

                <div className="input-group">
                    <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <LinkIcon size={14} /> Lovable Project Link
                    </label>
                    <input
                        type="text"
                        placeholder="https://lovable.dev/projects/..."
                        value={links.lovable}
                        onChange={(e) => handleLinkChange('lovable', e.target.value)}
                    />
                </div>

                <div className="input-group">
                    <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <Github size={14} /> GitHub Repository
                    </label>
                    <input
                        type="text"
                        placeholder="https://github.com/username/repo"
                        value={links.github}
                        onChange={(e) => handleLinkChange('github', e.target.value)}
                    />
                </div>

                <div className="input-group">
                    <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <Globe size={14} /> Deployed Site Link
                    </label>
                    <input
                        type="text"
                        placeholder="https://your-app.vercel.app"
                        value={links.deploy}
                        onChange={(e) => handleLinkChange('deploy', e.target.value)}
                    />
                </div>
            </div>

            <button className="button button--primary" onClick={copyFinalSubmission}>
                <Copy size={16} /> Copy Final Submission
            </button>
        </div>
    );
};

export default Proof;

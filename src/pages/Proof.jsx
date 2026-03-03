import React from 'react';
import { FileText, Database, ShieldCheck } from 'lucide-react';

const Proof = () => {
    return (
        <div style={{ padding: '80px 24px', maxWidth: '1000px', margin: '0 auto' }}>
            <div className="stack-large">
                <div className="stack-small">
                    <h1 style={{ fontSize: '36px', fontWeight: 700 }}>Project Proof & Artifacts</h1>
                    <p style={{ fontSize: '18px', color: '#666' }}>Documenting the build process and system validation.</p>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px', marginTop: '40px' }}>
                    <div className="card" style={{ padding: '32px', textAlign: 'center' }}>
                        <div style={{ width: '48px', height: '48px', background: '#f0f0f0', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
                            <FileText size={24} />
                        </div>
                        <h3 style={{ fontWeight: 600, marginBottom: '8px' }}>Requirements</h3>
                        <p style={{ fontSize: '14px', color: '#888' }}>Software requirements specification and user stories.</p>
                    </div>

                    <div className="card" style={{ padding: '32px', textAlign: 'center' }}>
                        <div style={{ width: '48px', height: '48px', background: '#f0f0f0', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
                            <Database size={24} />
                        </div>
                        <h3 style={{ fontWeight: 600, marginBottom: '8px' }}>Architecture</h3>
                        <p style={{ fontSize: '14px', color: '#888' }}>System design, data models, and API interfaces.</p>
                    </div>

                    <div className="card" style={{ padding: '32px', textAlign: 'center' }}>
                        <div style={{ width: '48px', height: '48px', background: '#f0f0f0', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
                            <ShieldCheck size={24} />
                        </div>
                        <h3 style={{ fontWeight: 600, marginBottom: '8px' }}>Validation</h3>
                        <p style={{ fontSize: '14px', color: '#888' }}>Testing logs, ATS scoring logic, and export formats.</p>
                    </div>
                </div>

                <div className="card" style={{ marginTop: '40px', padding: '40px', background: '#fff' }}>
                    <h2 style={{ fontSize: '20px', fontWeight: 600, marginBottom: '16px' }}>Artifact Verification</h2>
                    <div style={{ padding: '24px', background: '#f9f9f9', borderRadius: '4px', border: '1px dashed #ddd', textAlign: 'center', color: '#888' }}>
                        No artifacts uploaded yet. Use the Build Track to generate project artifacts.
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Proof;

import React from 'react';
import { useResume } from '../context/ResumeContext';
import { Mail, Phone, MapPin, Github, Linkedin, Globe } from 'lucide-react';

const Preview = () => {
    const { resumeData, selectedTemplate, setSelectedTemplate } = useResume();

    const renderResume = () => {
        const Header = () => (
            <header style={{
                marginBottom: '32px',
                textAlign: selectedTemplate === 'Classic' ? 'center' : 'left',
                borderBottom: selectedTemplate === 'Classic' ? '2px solid #000' : 'none',
                paddingBottom: '16px'
            }}>
                <h1 style={{
                    fontSize: selectedTemplate === 'Modern' ? '40px' : '32px',
                    fontWeight: 900,
                    margin: 0,
                    textTransform: selectedTemplate === 'Modern' ? 'uppercase' : 'none',
                    letterSpacing: '-0.02em',
                    lineHeight: 1
                }}>
                    {resumeData.personal.name || 'Your Name'}
                </h1>
                <div style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '16px',
                    marginTop: '16px',
                    fontSize: '13px',
                    color: '#444',
                    justifyContent: selectedTemplate === 'Classic' ? 'center' : 'flex-start',
                    fontWeight: 500
                }}>
                    {resumeData.personal.email && <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><Mail size={14} /> {resumeData.personal.email}</span>}
                    {resumeData.personal.phone && <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><Phone size={14} /> {resumeData.personal.phone}</span>}
                    {resumeData.personal.location && <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><MapPin size={14} /> {resumeData.personal.location}</span>}
                </div>
                <div style={{
                    display: 'flex',
                    gap: '16px',
                    marginTop: '8px',
                    fontSize: '13px',
                    color: '#444',
                    justifyContent: selectedTemplate === 'Classic' ? 'center' : 'flex-start',
                    fontWeight: 500
                }}>
                    {resumeData.personal.links.github && <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><Github size={14} /> {resumeData.personal.links.github}</span>}
                    {resumeData.personal.links.linkedin && <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><Linkedin size={14} /> {resumeData.personal.links.linkedin}</span>}
                </div>
                {selectedTemplate === 'Modern' && <div style={{ height: '6px', width: '80px', background: '#000', marginTop: '24px' }} />}
            </header>
        );

        const SectionHeader = ({ title }) => (
            <h2 style={{
                fontSize: '13px',
                fontWeight: 900,
                borderBottom: selectedTemplate === 'Minimal' ? 'none' : '1.5px solid #000',
                paddingBottom: '4px',
                marginBottom: '16px',
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                color: selectedTemplate === 'Minimal' ? '#999' : '#000'
            }}>
                {title}
            </h2>
        );

        return (
            <div style={{
                maxWidth: '800px',
                margin: '0 auto',
                background: '#fff',
                padding: selectedTemplate === 'Minimal' ? '80px 100px' : '60px 80px',
                boxShadow: '0 4px 40px rgba(0,0,0,0.06)',
                fontFamily: selectedTemplate === 'Classic' ? "'Playfair Display', serif" : "'Inter', sans-serif",
                color: '#000',
                minHeight: '1050px' // A4 approx
            }}>
                <Header />

                {resumeData.summary && (
                    <section style={{ marginBottom: '32px' }}>
                        <SectionHeader title="Professional Summary" />
                        <p style={{ fontSize: '14px', lineHeight: 1.7, color: '#333' }}>{resumeData.summary}</p>
                    </section>
                )}

                {resumeData.experience.length > 0 && (
                    <section style={{ marginBottom: '32px' }}>
                        <SectionHeader title="Work Experience" />
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                            {resumeData.experience.map((exp, i) => (
                                <div key={i}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '6px' }}>
                                        <h3 style={{ fontSize: '15px', fontWeight: 800 }}>{exp.role}</h3>
                                        <span style={{ fontSize: '13px', fontWeight: 600 }}>{exp.date}</span>
                                    </div>
                                    <div style={{ fontSize: '14px', fontWeight: 600, color: '#666', marginBottom: '8px' }}>{exp.company}</div>
                                    <p style={{ fontSize: '14px', lineHeight: 1.6, color: '#444' }}>{exp.description}</p>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {resumeData.projects.length > 0 && (
                    <section style={{ marginBottom: '32px' }}>
                        <SectionHeader title="Key Projects" />
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                            {resumeData.projects.map((proj, i) => (
                                <div key={i}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '6px' }}>
                                        <h3 style={{ fontSize: '15px', fontWeight: 800 }}>{proj.name}</h3>
                                        {proj.link && <span style={{ fontSize: '12px', color: '#666', fontWeight: 500 }}>{proj.link}</span>}
                                    </div>
                                    <p style={{ fontSize: '14px', lineHeight: 1.6, color: '#444' }}>{proj.description}</p>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {resumeData.education.length > 0 && (
                    <section style={{ marginBottom: '32px' }}>
                        <SectionHeader title="Education" />
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                            {resumeData.education.map((edu, i) => (
                                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                                    <div>
                                        <h3 style={{ fontSize: '15px', fontWeight: 800 }}>{edu.school}</h3>
                                        <div style={{ fontSize: '14px', fontWeight: 500, color: '#444' }}>{edu.degree}</div>
                                    </div>
                                    <span style={{ fontSize: '13px', fontWeight: 600 }}>{edu.date}</span>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {resumeData.skills && (
                    <section>
                        <SectionHeader title="Technical Skills" />
                        <p style={{ fontSize: '14px', lineHeight: 1.7, fontWeight: 500, color: '#333' }}>{resumeData.skills}</p>
                    </section>
                )}
            </div>
        );
    };

    return (
        <div style={{ background: '#f4f4f4', minHeight: 'calc(100vh - 64px)', padding: '40px 24px 100px' }}>
            {/* Template Navigator */}
            <div style={{
                display: 'flex',
                maxWidth: 'fit-content',
                margin: '0 auto 40px',
                background: '#fff',
                padding: '4px',
                borderRadius: '8px',
                boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
                gap: '4px'
            }}>
                {['Classic', 'Modern', 'Minimal'].map(t => (
                    <button
                        key={t}
                        onClick={() => setSelectedTemplate(t)}
                        style={{
                            padding: '10px 32px',
                            border: 'none',
                            background: selectedTemplate === t ? '#000' : 'transparent',
                            color: selectedTemplate === t ? '#fff' : '#888',
                            borderRadius: '6px',
                            fontSize: '13px',
                            fontWeight: 700,
                            cursor: 'pointer',
                            transition: 'all 0.2s'
                        }}
                    >
                        {t}
                    </button>
                ))}
            </div>

            {renderResume()}
        </div>
    );
};

export default Preview;

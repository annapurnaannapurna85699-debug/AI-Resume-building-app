import React from 'react';
import { useResume } from '../context/ResumeContext';
import { Mail, Phone, MapPin, Github, Linkedin, Globe } from 'lucide-react';

const Preview = () => {
    const { resumeData } = useResume();

    return (
        <div style={{ background: '#f9f9f9', minHeight: 'calc(100vh - 64px)', padding: '60px 24px' }}>
            <div style={{
                maxWidth: '800px',
                margin: '0 auto',
                background: '#fff',
                padding: '60px 80px',
                boxShadow: '0 4px 20px rgba(0,0,0,0.03)',
                fontFamily: "'Inter', sans-serif",
                color: '#000'
            }}>
                {/* Header */}
                <header style={{ marginBottom: '40px' }}>
                    <h1 style={{ fontSize: '32px', fontWeight: 700, margin: 0, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                        {resumeData.personal.name || 'Your Name'}
                    </h1>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', marginTop: '12px', fontSize: '13px', color: '#444' }}>
                        {resumeData.personal.email && <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Mail size={12} /> {resumeData.personal.email}</span>}
                        {resumeData.personal.phone && <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Phone size={12} /> {resumeData.personal.phone}</span>}
                        {resumeData.personal.location && <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><MapPin size={12} /> {resumeData.personal.location}</span>}
                    </div>
                    <div style={{ display: 'flex', gap: '16px', marginTop: '8px', fontSize: '13px', color: '#444' }}>
                        {resumeData.personal.links.github && <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Github size={12} /> {resumeData.personal.links.github}</span>}
                        {resumeData.personal.links.linkedin && <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Linkedin size={12} /> {resumeData.personal.links.linkedin}</span>}
                    </div>
                </header>

                {/* Summary */}
                {resumeData.summary && (
                    <section style={{ marginBottom: '32px' }}>
                        <h2 style={{ fontSize: '14px', fontWeight: 800, borderBottom: '1px solid #000', paddingBottom: '4px', marginBottom: '12px', textTransform: 'uppercase' }}>Professional Summary</h2>
                        <p style={{ fontSize: '14px', lineHeight: 1.6 }}>{resumeData.summary}</p>
                    </section>
                )}

                {/* Experience */}
                {resumeData.experience.length > 0 && (
                    <section style={{ marginBottom: '32px' }}>
                        <h2 style={{ fontSize: '14px', fontWeight: 800, borderBottom: '1px solid #000', paddingBottom: '4px', marginBottom: '16px', textTransform: 'uppercase' }}>Work Experience</h2>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                            {resumeData.experience.map((exp, i) => (
                                <div key={i}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '4px' }}>
                                        <h3 style={{ fontSize: '15px', fontWeight: 700 }}>{exp.role}</h3>
                                        <span style={{ fontSize: '13px', fontWeight: 500 }}>{exp.date}</span>
                                    </div>
                                    <div style={{ fontSize: '14px', fontStyle: 'italic', marginBottom: '8px' }}>{exp.company}</div>
                                    <p style={{ fontSize: '14px', lineHeight: 1.5, color: '#333' }}>{exp.description}</p>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Projects */}
                {resumeData.projects.length > 0 && (
                    <section style={{ marginBottom: '32px' }}>
                        <h2 style={{ fontSize: '14px', fontWeight: 800, borderBottom: '1px solid #000', paddingBottom: '4px', marginBottom: '16px', textTransform: 'uppercase' }}>Key Projects</h2>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                            {resumeData.projects.map((proj, i) => (
                                <div key={i}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '4px' }}>
                                        <h3 style={{ fontSize: '14px', fontWeight: 700 }}>{proj.name}</h3>
                                        {proj.link && <span style={{ fontSize: '12px', color: '#666' }}>{proj.link}</span>}
                                    </div>
                                    <p style={{ fontSize: '13px', lineHeight: 1.5 }}>{proj.description}</p>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Education */}
                {resumeData.education.length > 0 && (
                    <section style={{ marginBottom: '32px' }}>
                        <h2 style={{ fontSize: '14px', fontWeight: 800, borderBottom: '1px solid #000', paddingBottom: '4px', marginBottom: '16px', textTransform: 'uppercase' }}>Education</h2>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                            {resumeData.education.map((edu, i) => (
                                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                                    <div>
                                        <h3 style={{ fontSize: '14px', fontWeight: 700 }}>{edu.school}</h3>
                                        <div style={{ fontSize: '13px' }}>{edu.degree}</div>
                                    </div>
                                    <span style={{ fontSize: '13px' }}>{edu.date}</span>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Skills */}
                {resumeData.skills && (
                    <section>
                        <h2 style={{ fontSize: '14px', fontWeight: 800, borderBottom: '1px solid #000', paddingBottom: '4px', marginBottom: '12px', textTransform: 'uppercase' }}>Technical Skills</h2>
                        <p style={{ fontSize: '13px', lineHeight: 1.6 }}>{resumeData.skills}</p>
                    </section>
                )}
            </div>
        </div>
    );
};

export default Preview;

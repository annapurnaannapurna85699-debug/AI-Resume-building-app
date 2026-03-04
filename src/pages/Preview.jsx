import React from 'react';
import { useResume } from '../context/ResumeContext';
import { Mail, Phone, MapPin, Github, Linkedin, Printer, FileText, AlertTriangle, Globe } from 'lucide-react';

const Preview = () => {
    const { resumeData, selectedTemplate, setSelectedTemplate } = useResume();

    const handlePrint = () => {
        window.print();
    };

    const copyAsPlainText = () => {
        let text = `${resumeData.personal.name || 'Your Name'}\n`;
        text += `${resumeData.personal.email} | ${resumeData.personal.phone} | ${resumeData.personal.location}\n`;
        if (resumeData.personal.links.github) text += `GitHub: ${resumeData.personal.links.github}\n`;
        if (resumeData.personal.links.linkedin) text += `LinkedIn: ${resumeData.personal.links.linkedin}\n`;

        if (resumeData.summary) {
            text += `\nPROFESSIONAL SUMMARY\n====================\n${resumeData.summary}\n`;
        }

        if (resumeData.experience.length > 0) {
            text += `\nWORK EXPERIENCE\n===============\n`;
            resumeData.experience.forEach(exp => {
                text += `${exp.role.toUpperCase()} | ${exp.company} | ${exp.date}\n${exp.description}\n\n`;
            });
        }

        if (resumeData.projects.length > 0) {
            text += `\nKEY PROJECTS\n============\n`;
            resumeData.projects.forEach(proj => {
                text += `${proj.name.toUpperCase()} | ${proj.githubUrl || proj.liveUrl || ''}\n`;
                text += `${proj.description}\n`;
                if (proj.techStack?.length > 0) text += `Stack: ${proj.techStack.join(', ')}\n`;
                text += `\n`;
            });
        }

        if (resumeData.education.length > 0) {
            text += `\nEDUCATION\n=========\n`;
            resumeData.education.forEach(edu => {
                text += `${edu.school} | ${edu.degree} | ${edu.date}\n`;
            });
        }

        if (resumeData.skills.technical.length > 0 || resumeData.skills.soft.length > 0 || resumeData.skills.tools.length > 0) {
            text += `\nSKILLS\n======\n`;
            if (resumeData.skills.technical.length > 0) text += `Technical: ${resumeData.skills.technical.join(', ')}\n`;
            if (resumeData.skills.soft.length > 0) text += `Soft Skills: ${resumeData.skills.soft.join(', ')}\n`;
            if (resumeData.skills.tools.length > 0) text += `Tools: ${resumeData.skills.tools.join(', ')}\n`;
        }

        navigator.clipboard.writeText(text);
        alert('Resume copied to clipboard!');
    };

    const isMissingRequirements = !resumeData.personal.name || (resumeData.experience.length === 0 && resumeData.projects.length === 0);

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
            <div className="resume-paper" style={{
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
                                <div key={i} style={{ pageBreakInside: 'avoid' }}>
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
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                            {resumeData.projects.map((proj, i) => (
                                <div key={i} style={{ pageBreakInside: 'avoid' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '6px' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                            <h3 style={{ fontSize: '15px', fontWeight: 800 }}>{proj.name}</h3>
                                            <div style={{ display: 'flex', gap: '8px', color: '#666' }}>
                                                {proj.githubUrl && <Github size={14} />}
                                                {proj.liveUrl && <Globe size={14} />}
                                            </div>
                                        </div>
                                    </div>
                                    <p style={{ fontSize: '14px', lineHeight: 1.6, color: '#444', marginBottom: '8px' }}>{proj.description}</p>
                                    {proj.techStack?.length > 0 && (
                                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                                            {proj.techStack.map((tech, ti) => (
                                                <span key={ti} style={{ background: '#f0f0f0', padding: '2px 8px', borderRadius: '4px', fontSize: '11px', fontWeight: 600, color: '#555' }}>
                                                    {tech}
                                                </span>
                                            ))}
                                        </div>
                                    )}
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
                                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', pageBreakInside: 'avoid' }}>
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

                {(resumeData.skills.technical.length > 0 || resumeData.skills.soft.length > 0 || resumeData.skills.tools.length > 0) && (
                    <section>
                        <SectionHeader title="Skills" />
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                            {resumeData.skills.technical.length > 0 && (
                                <div style={{ fontSize: '14px', lineHeight: 1.6 }}>
                                    <strong style={{ fontWeight: 800 }}>Technical:</strong>{' '}
                                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginTop: '4px' }}>
                                        {resumeData.skills.technical.map((s, i) => (
                                            <span key={i} style={{ background: '#f5f5f5', padding: '2px 10px', borderRadius: '4px', fontSize: '12px', fontWeight: 500 }}>{s}</span>
                                        ))}
                                    </div>
                                </div>
                            )}
                            {resumeData.skills.soft.length > 0 && (
                                <div style={{ fontSize: '14px', lineHeight: 1.6 }}>
                                    <strong style={{ fontWeight: 800 }}>Soft Skills:</strong>{' '}
                                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginTop: '4px' }}>
                                        {resumeData.skills.soft.map((s, i) => (
                                            <span key={i} style={{ background: '#f5f5f5', padding: '2px 10px', borderRadius: '4px', fontSize: '12px', fontWeight: 500 }}>{s}</span>
                                        ))}
                                    </div>
                                </div>
                            )}
                            {resumeData.skills.tools.length > 0 && (
                                <div style={{ fontSize: '14px', lineHeight: 1.6 }}>
                                    <strong style={{ fontWeight: 800 }}>Tools:</strong>{' '}
                                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginTop: '4px' }}>
                                        {resumeData.skills.tools.map((s, i) => (
                                            <span key={i} style={{ background: '#f5f5f5', padding: '2px 10px', borderRadius: '4px', fontSize: '12px', fontWeight: 500 }}>{s}</span>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </section>
                )}
            </div>
        );
    };

    return (
        <div className="preview-container" style={{ background: '#f4f4f4', minHeight: 'calc(100vh - 64px)', padding: '40px 24px 100px' }}>
            {/* Template Navigator */}
            <div className="template-navigator" style={{
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

            {/* Export Actions & Info */}
            <div className="export-actions" style={{ maxWidth: '800px', margin: '0 auto 32px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'flex', gap: '12px' }}>
                        <button
                            onClick={handlePrint}
                            style={{
                                padding: '10px 20px',
                                background: '#000',
                                color: '#fff',
                                border: 'none',
                                cursor: 'pointer',
                                borderRadius: '4px',
                                fontSize: '14px',
                                fontWeight: 600,
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px',
                                transition: 'opacity 0.2s'
                            }}
                            onMouseOver={(e) => e.target.style.opacity = '0.8'}
                            onMouseOut={(e) => e.target.style.opacity = '1'}
                        >
                            <Printer size={16} /> Print / Save as PDF
                        </button>
                        <button
                            onClick={copyAsPlainText}
                            style={{
                                padding: '10px 20px',
                                background: 'transparent',
                                border: '1px solid #ddd',
                                cursor: 'pointer',
                                borderRadius: '4px',
                                fontSize: '14px',
                                fontWeight: 600,
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px'
                            }}
                        >
                            <FileText size={16} /> Copy Resume as Text
                        </button>
                    </div>
                </div>

                {isMissingRequirements && (
                    <div className="validation-warning" style={{ background: '#FFF7E6', border: '1px solid #FFE7BA', padding: '12px 16px', borderRadius: '4px', display: 'flex', alignItems: 'center', gap: '12px', color: '#874D00', fontSize: '14px' }}>
                        <AlertTriangle size={18} color="#FAAD14" />
                        <span><strong>Incomplete Resume:</strong> Your resume may look sparse. We recommend adding your name and at least one experience or project for a professional look.</span>
                    </div>
                )}
            </div>

            {renderResume()}
        </div>
    );
};

export default Preview;

import React from 'react';
import { useResume } from '../context/ResumeContext';
import { Mail, Phone, MapPin, Github, Linkedin, Printer, FileText, AlertTriangle, Globe } from 'lucide-react';

const Preview = () => {
    const {
        resumeData, selectedTemplate, setSelectedTemplate,
        atsScore, atsSuggestions, selectedColor
    } = useResume();

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

    const getScoreInfo = () => {
        if (atsScore <= 40) return { label: 'Needs Work', color: '#ef4444' };
        if (atsScore <= 70) return { label: 'Getting There', color: '#f59e0b' };
        return { label: 'Strong Resume', color: '#10b981' };
    };

    const { label: scoreLabel, color: scoreColor } = getScoreInfo();

    const renderResume = () => {
        const Header = () => (
            <header style={{
                marginBottom: '32px',
                textAlign: selectedTemplate === 'Classic' ? 'center' : 'left',
                borderBottom: selectedTemplate === 'Classic' ? `2px solid ${selectedColor}` : 'none',
                paddingBottom: '16px'
            }}>
                <h1 style={{
                    fontSize: selectedTemplate === 'Modern' ? '40px' : '32px',
                    fontWeight: 900,
                    margin: 0,
                    textTransform: selectedTemplate === 'Modern' ? 'uppercase' : 'none',
                    letterSpacing: '-0.02em',
                    lineHeight: 1,
                    color: selectedTemplate === 'Minimal' ? selectedColor : '#000'
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
                {selectedTemplate === 'Modern' && <div style={{ height: '6px', width: '80px', background: selectedColor, marginTop: '24px' }} />}
            </header>
        );

        const SectionHeader = ({ title }) => (
            <h2 style={{
                fontSize: '13px',
                fontWeight: 900,
                borderBottom: selectedTemplate === 'Minimal' ? 'none' : `1.5px solid ${selectedColor}`,
                paddingBottom: '4px',
                marginBottom: '16px',
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                color: selectedTemplate === 'Minimal' ? selectedColor : '#000'
            }}>
                {title}
            </h2>
        );

        return (
            <div className="resume-paper" style={{
                maxWidth: '800px',
                width: '100%',
                background: '#fff',
                padding: selectedTemplate === 'Minimal' ? '80px 100px' : '60px 80px',
                boxShadow: '0 4px 40px rgba(0,0,0,0.06)',
                fontFamily: selectedTemplate === 'Classic' ? "'Playfair Display', serif" : "'Inter', sans-serif",
                color: '#000',
                minHeight: '1050px',
                position: 'relative'
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
                                        <span style={{ fontSize: '13px', fontWeight: 600, color: selectedColor }}>{exp.date}</span>
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
                                    <span style={{ fontSize: '13px', fontWeight: 600, color: selectedColor }}>{edu.date}</span>
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
        <div className="preview-container" style={{ background: '#f5f7f9', minHeight: 'calc(100vh - 64px)', padding: '40px 24px 100px' }}>
            <div style={{ display: 'flex', gap: '40px', maxWidth: '1240px', margin: '0 auto', alignItems: 'flex-start' }}>

                {/* Fixed Insights Sidebar */}
                <div style={{ flex: '0 0 320px', position: 'sticky', top: '40px' }}>
                    <div className="card" style={{ padding: '24px', background: '#fff', borderRadius: '16px', boxShadow: '0 10px 30px rgba(0,0,0,0.05)', display: 'flex', flexDirection: 'column', gap: '24px' }}>
                        <div style={{ textAlign: 'center' }}>
                            <h3 style={{ fontSize: '12px', fontWeight: 800, textTransform: 'uppercase', color: '#999', marginBottom: '20px', letterSpacing: '0.05em' }}>ATS RESUME SCORE</h3>

                            {/* Circular Progress */}
                            <div style={{ position: 'relative', width: '120px', height: '120px', margin: '0 auto' }}>
                                <svg style={{ width: '120px', height: '120px', transform: 'rotate(-90deg)' }}>
                                    <circle cx="60" cy="60" r="54" fill="none" stroke="#eee" strokeWidth="8" />
                                    <circle
                                        cx="60" cy="60" r="54"
                                        fill="none" stroke={scoreColor}
                                        strokeWidth="8"
                                        strokeDasharray={2 * Math.PI * 54}
                                        strokeDashoffset={2 * Math.PI * 54 * (1 - atsScore / 100)}
                                        strokeLinecap="round"
                                        style={{ transition: 'stroke-dashoffset 0.8s ease' }}
                                    />
                                </svg>
                                <div style={{
                                    position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    flexDirection: 'column'
                                }}>
                                    <span style={{ fontSize: '28px', fontWeight: 900, color: '#000' }}>{atsScore}</span>
                                    <span style={{ fontSize: '10px', fontWeight: 700, color: '#666' }}>/100</span>
                                </div>
                            </div>

                            <div style={{ fontSize: '14px', fontWeight: 800, marginTop: '16px', color: scoreColor }}>{scoreLabel}</div>
                        </div>

                        {atsSuggestions.length > 0 ? (
                            <div className="stack-medium">
                                <h4 style={{ fontSize: '11px', fontWeight: 800, color: '#999', textTransform: 'uppercase' }}>HOW TO IMPROVE:</h4>
                                <div className="stack-small">
                                    {atsSuggestions.map((s, i) => (
                                        <div key={i} style={{ fontSize: '12px', background: '#f8f9fa', padding: '10px', borderRadius: '8px', color: '#444', borderLeft: `3px solid ${scoreColor}` }}>
                                            {s.text}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ) : (
                            <div style={{ textAlign: 'center', padding: '16px', background: '#e6f4ea', borderRadius: '8px', color: '#1e7e34', fontSize: '12px', fontWeight: 600 }}>
                                Your resume is top-tier! Ready for submission.
                            </div>
                        )}

                        <div style={{ borderTop: '1px solid #eee', pt: '20px', mt: '10px' }}>
                            <h4 style={{ fontSize: '11px', fontWeight: 800, color: '#999', textTransform: 'uppercase', marginBottom: '16px' }}>Quick Actions</h4>
                            <div className="stack-small">
                                <button onClick={handlePrint} className="button" style={{ width: '100%', justifyContent: 'center', height: '40px', background: '#000', color: '#fff' }}>
                                    <Printer size={16} /> PDF Export
                                </button>
                                <button onClick={copyAsPlainText} className="button" style={{ width: '100%', justifyContent: 'center', height: '40px', background: 'transparent', border: '1px solid #ddd', color: '#555' }}>
                                    <FileText size={16} /> Copy Content
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Resume Workspace */}
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '32px' }}>
                    {/* Template Navigator */}
                    <div className="template-navigator" style={{
                        display: 'flex',
                        maxWidth: 'fit-content',
                        background: '#fff',
                        padding: '4px',
                        borderRadius: '12px',
                        boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
                        gap: '4px'
                    }}>
                        {['Classic', 'Modern', 'Minimal'].map(t => (
                            <button
                                key={t}
                                onClick={() => setSelectedTemplate(t)}
                                style={{
                                    padding: '8px 24px',
                                    border: 'none',
                                    background: selectedTemplate === t ? '#000' : 'transparent',
                                    color: selectedTemplate === t ? '#fff' : '#888',
                                    borderRadius: '8px',
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
            </div>
        </div>
    );
};

export default Preview;

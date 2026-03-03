import React from 'react';
import { useResume } from '../context/ResumeContext';
import { Plus, Trash2, ExternalLink, AlertCircle } from 'lucide-react';

const Builder = () => {
    const { resumeData, setResumeData, loadSampleData, selectedTemplate, setSelectedTemplate } = useResume();

    const ACTION_VERBS = ['Built', 'Developed', 'Designed', 'Implemented', 'Led', 'Improved', 'Created', 'Optimized', 'Automated'];

    const checkBulletGuidance = (text) => {
        if (!text) return null;
        const guidance = [];
        const startsWithActionVerb = ACTION_VERBS.some(verb => text.trim().startsWith(verb));
        const hasNumber = /[0-9]|%|k|X/i.test(text);

        if (!startsWithActionVerb) guidance.push("Start with a strong action verb.");
        if (!hasNumber) guidance.push("Add measurable impact (numbers).");
        return guidance;
    };

    const updatePersonal = (field, value) => {
        setResumeData(prev => ({
            ...prev,
            personal: { ...prev.personal, [field]: value }
        }));
    };

    const updateLinks = (field, value) => {
        setResumeData(prev => ({
            ...prev,
            personal: {
                ...prev.personal,
                links: { ...prev.personal.links, [field]: value }
            }
        }));
    };

    const addItem = (section) => {
        const newItem = section === 'education'
            ? { school: '', degree: '', date: '' }
            : section === 'experience'
                ? { company: '', role: '', date: '', description: '' }
                : { name: '', description: '', link: '' };

        setResumeData(prev => ({
            ...prev,
            [section]: [...prev[section], newItem]
        }));
    };

    const removeItem = (section, index) => {
        setResumeData(prev => ({
            ...prev,
            [section]: prev[section].filter((_, i) => i !== index)
        }));
    };

    const updateItem = (section, index, field, value) => {
        setResumeData(prev => {
            const newList = [...prev[section]];
            newList[index] = { ...newList[index], [field]: value };
            return { ...prev, [section]: newList };
        });
    };

    // ATS Scoring Logic
    const calculateATSScore = () => {
        let score = 0;
        const currentSuggestions = [];
        const topImprovements = [];

        // 1. Summary length (40-120 words)
        const summaryWords = resumeData.summary.trim().split(/\s+/).filter(w => w.length > 0);
        if (summaryWords.length >= 40 && summaryWords.length <= 120) {
            score += 15;
        } else {
            currentSuggestions.push("Write a stronger summary (40–120 words).");
            if (summaryWords.length < 40) topImprovements.push("Expand your summary (target 40-120 words).");
        }

        // 2. Projects (at least 2)
        if (resumeData.projects.length >= 2) {
            score += 10;
        } else {
            currentSuggestions.push("Add at least 2 projects.");
            topImprovements.push("Add at least 2 key projects.");
        }

        // 3. Experience (at least 1)
        if (resumeData.experience.length >= 1) {
            score += 10;
        } else {
            currentSuggestions.push("Add at least 1 experience entry.");
            topImprovements.push("Add internship or professional experience.");
        }

        // 4. Skills (at least 8)
        const skillsList = resumeData.skills.split(',').map(s => s.trim()).filter(s => s.length > 0);
        if (skillsList.length >= 8) {
            score += 10;
        } else {
            currentSuggestions.push("Add more skills (target 8+).");
            topImprovements.push("List at least 8 technical skills.");
        }

        // 5. Links exist
        if (resumeData.personal.links.github || resumeData.personal.links.linkedin) {
            score += 10;
        } else {
            currentSuggestions.push("Add GitHub or LinkedIn links.");
            topImprovements.push("Include GitHub or LinkedIn links.");
        }

        // 6. Measurable impact (numbers)
        const hasNumbers = [...resumeData.experience, ...resumeData.projects].some(item =>
            /[0-9]|%|k|X/i.test(item.description || '')
        );
        if (hasNumbers) {
            score += 15;
        } else {
            currentSuggestions.push("Add measurable impact (numbers) in bullets.");
            topImprovements.push("Add quantifiable results (%, $, #) to impact.");
        }

        // 7. Education complete
        const educationComplete = resumeData.education.length > 0 && resumeData.education.every(edu =>
            edu.school && edu.degree && edu.date
        );
        if (educationComplete) {
            score += 10;
        } else {
            currentSuggestions.push("Complete your education details.");
            topImprovements.push("Complete your education details.");
        }

        return {
            total: Math.min(score + 20, 100), // Base score of 20
            suggestions: currentSuggestions.slice(0, 3),
            improvements: topImprovements.slice(0, 3)
        };
    };

    const { total: atsScore, suggestions, improvements } = calculateATSScore();

    // Template Renderers
    const renderResumeContent = () => {
        const Header = () => (
            <div style={{ textAlign: selectedTemplate === 'Classic' ? 'center' : 'left', borderBottom: selectedTemplate === 'Classic' ? '2px solid #000' : 'none', paddingBottom: '16px', marginBottom: '8px' }}>
                <h1 style={{ fontSize: selectedTemplate === 'Modern' ? '32px' : '24px', fontWeight: 800, margin: 0, letterSpacing: '-0.02em', textTransform: selectedTemplate === 'Modern' ? 'uppercase' : 'none' }}>
                    {resumeData.personal.name || 'YOUR NAME'}
                </h1>
                <div style={{ fontSize: '10px', display: 'flex', justifyContent: selectedTemplate === 'Classic' ? 'center' : 'flex-start', gap: '12px', marginTop: '8px', color: '#555', fontWeight: 500 }}>
                    {resumeData.personal.email && <span>{resumeData.personal.email}</span>}
                    {resumeData.personal.phone && <span>{resumeData.personal.phone}</span>}
                    {resumeData.personal.location && <span>{resumeData.personal.location}</span>}
                </div>
                {selectedTemplate === 'Modern' && <div style={{ height: '4px', width: '60px', background: '#000', marginTop: '12px' }} />}
            </div>
        );

        const SectionHeader = ({ title }) => (
            <h4 style={{
                fontSize: '11px',
                fontWeight: 900,
                borderBottom: selectedTemplate === 'Minimal' ? 'none' : '1px solid #000',
                paddingBottom: '2px',
                marginBottom: '8px',
                marginTop: '16px',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                color: selectedTemplate === 'Minimal' ? '#888' : '#000'
            }}>
                {title}
            </h4>
        );

        return (
            <div style={{
                width: '100%',
                maxWidth: '595px',
                background: '#fff',
                boxShadow: '0 10px 30px rgba(0,0,0,0.05)',
                minHeight: '842px',
                padding: selectedTemplate === 'Minimal' ? '60px' : '40px',
                display: 'flex',
                flexDirection: 'column',
                gap: '4px',
                fontFamily: selectedTemplate === 'Classic' ? "'Playfair Display', serif" : "'Inter', sans-serif"
            }}>
                <Header />

                {resumeData.summary && (
                    <div className="stack-small">
                        <SectionHeader title="Summary" />
                        <p style={{ fontSize: '11px', lineHeight: 1.6, color: '#333' }}>{resumeData.summary}</p>
                    </div>
                )}

                {resumeData.experience.length > 0 && (
                    <div className="stack-small">
                        <SectionHeader title="Experience" />
                        {resumeData.experience.map((exp, i) => (
                            <div key={i} style={{ marginBottom: '12px' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', fontWeight: 800 }}>
                                    <span>{exp.role}</span>
                                    <span>{exp.date}</span>
                                </div>
                                <div style={{ fontSize: '10px', fontWeight: 600, color: '#666' }}>{exp.company}</div>
                                <p style={{ fontSize: '10px', marginTop: '4px', lineHeight: 1.5 }}>{exp.description}</p>
                            </div>
                        ))}
                    </div>
                )}

                {resumeData.projects.length > 0 && (
                    <div className="stack-small">
                        <SectionHeader title="Projects" />
                        {resumeData.projects.map((proj, i) => (
                            <div key={i} style={{ marginBottom: '12px' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', fontWeight: 800 }}>
                                    <span>{proj.name}</span>
                                    {proj.link && <span style={{ fontWeight: 500, fontSize: '9px', color: '#666' }}>{proj.link}</span>}
                                </div>
                                <p style={{ fontSize: '10px', marginTop: '2px', lineHeight: 1.5 }}>{proj.description}</p>
                            </div>
                        ))}
                    </div>
                )}

                {resumeData.education.length > 0 && (
                    <div className="stack-small">
                        <SectionHeader title="Education" />
                        {resumeData.education.map((edu, i) => (
                            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', marginBottom: '8px' }}>
                                <div>
                                    <div style={{ fontWeight: 800 }}>{edu.school}</div>
                                    <div style={{ fontSize: '10px', fontWeight: 500 }}>{edu.degree}</div>
                                </div>
                                <span style={{ fontWeight: 600 }}>{edu.date}</span>
                            </div>
                        ))}
                    </div>
                )}

                {resumeData.skills && (
                    <div className="stack-small">
                        <SectionHeader title="Skills" />
                        <p style={{ fontSize: '10px', lineHeight: 1.5, fontWeight: 500 }}>{resumeData.skills}</p>
                    </div>
                )}
            </div>
        );
    };

    return (
        <div style={{ display: 'flex', minHeight: 'calc(100vh - 64px)' }}>
            {/* Left: Form */}
            <div style={{
                flex: '0 0 50%',
                borderRight: '1px solid #eee',
                padding: '40px',
                overflowY: 'auto',
                maxHeight: 'calc(100vh - 64px)',
                background: '#fff'
            }}>
                {/* Header & ATS Score */}
                <div style={{ marginBottom: '40px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px' }}>
                        <div>
                            <h2 style={{ fontSize: '24px', fontWeight: 600, marginBottom: '4px' }}>Resume Information</h2>
                            <p style={{ fontSize: '14px', color: '#666' }}>All changes are autosaved locally.</p>
                        </div>
                        <button
                            onClick={loadSampleData}
                            style={{
                                background: 'none',
                                border: '1px solid #ddd',
                                padding: '8px 16px',
                                borderRadius: '4px',
                                fontSize: '12px',
                                cursor: 'pointer',
                                fontWeight: 600
                            }}
                        >
                            Load Sample Data
                        </button>
                    </div>

                    {/* ATS Score Meter & Improvements */}
                    <div className="card" style={{ padding: '24px', background: '#fafafa', border: '1px solid #eaeaea' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                            <span style={{ fontSize: '13px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#444' }}>
                                ATS Readiness Score
                            </span>
                            <span style={{ fontSize: '24px', fontWeight: 800, color: atsScore > 70 ? '#4A6741' : atsScore > 40 ? '#C18B3A' : '#8B0000' }}>
                                {atsScore}%
                            </span>
                        </div>
                        <div style={{ width: '100%', height: '6px', background: '#eee', borderRadius: '10px', overflow: 'hidden', marginBottom: '24px' }}>
                            <div style={{
                                width: `${atsScore}%`,
                                height: '100%',
                                background: atsScore > 70 ? '#4A6741' : atsScore > 40 ? '#C18B3A' : '#8B0000',
                                transition: 'width 0.4s ease-out'
                            }} />
                        </div>

                        {improvements.length > 0 && (
                            <div className="stack-small" style={{ paddingTop: '16px', borderTop: '1px solid #eee' }}>
                                <span style={{ fontSize: '11px', fontWeight: 800, color: '#333', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Top 3 Improvements</span>
                                {improvements.map((imp, i) => (
                                    <div key={i} style={{ fontSize: '13px', display: 'flex', alignItems: 'flex-start', gap: '8px', color: '#555', lineHeight: 1.4 }}>
                                        <div style={{ minWidth: '4px', height: '4px', borderRadius: '50%', background: '#C18B3A', marginTop: '6px' }} />
                                        {imp}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                <div className="stack-large">
                    {/* Personal Info */}
                    <section className="stack-medium">
                        <h3 style={{ fontSize: '13px', fontWeight: 800, textTransform: 'uppercase', color: '#999', letterSpacing: '0.05em' }}>Personal Info</h3>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                            <div className="input-group">
                                <label>Full Name</label>
                                <input type="text" value={resumeData.personal.name} onChange={(e) => updatePersonal('name', e.target.value)} placeholder="John Doe" />
                            </div>
                            <div className="input-group">
                                <label>Email</label>
                                <input type="text" value={resumeData.personal.email} onChange={(e) => updatePersonal('email', e.target.value)} placeholder="john@example.com" />
                            </div>
                            <div className="input-group">
                                <label>Phone</label>
                                <input type="text" value={resumeData.personal.phone} onChange={(e) => updatePersonal('phone', e.target.value)} placeholder="+1 234 567 890" />
                            </div>
                            <div className="input-group">
                                <label>Location</label>
                                <input type="text" value={resumeData.personal.location} onChange={(e) => updatePersonal('location', e.target.value)} placeholder="City, Country" />
                            </div>
                        </div>
                    </section>

                    {/* Links */}
                    <section className="stack-medium">
                        <h3 style={{ fontSize: '13px', fontWeight: 800, textTransform: 'uppercase', color: '#999', letterSpacing: '0.05em' }}>Links</h3>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                            <div className="input-group">
                                <label>GitHub</label>
                                <input type="text" value={resumeData.personal.links.github} onChange={(e) => updateLinks('github', e.target.value)} placeholder="github.com/username" />
                            </div>
                            <div className="input-group">
                                <label>LinkedIn</label>
                                <input type="text" value={resumeData.personal.links.linkedin} onChange={(e) => updateLinks('linkedin', e.target.value)} placeholder="linkedin.com/in/username" />
                            </div>
                        </div>
                    </section>

                    {/* Summary */}
                    <section className="stack-medium">
                        <h3 style={{ fontSize: '13px', fontWeight: 800, textTransform: 'uppercase', color: '#999', letterSpacing: '0.05em' }}>Professional Summary</h3>
                        <div className="input-group">
                            <textarea
                                rows="4"
                                value={resumeData.summary}
                                onChange={(e) => setResumeData(prev => ({ ...prev, summary: e.target.value }))}
                                placeholder="Briefly describe your professional background and key strengths..."
                            />
                        </div>
                    </section>

                    {/* Education */}
                    <section className="stack-medium">
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <h3 style={{ fontSize: '13px', fontWeight: 800, textTransform: 'uppercase', color: '#999', letterSpacing: '0.05em' }}>Education</h3>
                            <button onClick={() => addItem('education')} style={{ background: 'none', border: 'none', color: '#0066cc', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px', fontSize: '12px', fontWeight: 600 }}>
                                <Plus size={14} /> Add Education
                            </button>
                        </div>
                        {resumeData.education.map((item, index) => (
                            <div key={index} className="card" style={{ padding: '16px', position: 'relative' }}>
                                <button onClick={() => removeItem('education', index)} style={{ position: 'absolute', top: '16px', right: '16px', color: '#ff4444', border: 'none', background: 'none', cursor: 'pointer' }}>
                                    <Trash2 size={16} />
                                </button>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                                    <div className="input-group">
                                        <label>School</label>
                                        <input type="text" value={item.school} onChange={(e) => updateItem('education', index, 'school', e.target.value)} />
                                    </div>
                                    <div className="input-group">
                                        <label>Degree</label>
                                        <input type="text" value={item.degree} onChange={(e) => updateItem('education', index, 'degree', e.target.value)} />
                                    </div>
                                    <div className="input-group">
                                        <label>Date</label>
                                        <input type="text" value={item.date} onChange={(e) => updateItem('education', index, 'date', e.target.value)} />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </section>

                    {/* Experience */}
                    <section className="stack-medium">
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <h3 style={{ fontSize: '13px', fontWeight: 800, textTransform: 'uppercase', color: '#999', letterSpacing: '0.05em' }}>Experience</h3>
                            <button onClick={() => addItem('experience')} style={{ background: 'none', border: 'none', color: '#0066cc', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px', fontSize: '12px', fontWeight: 600 }}>
                                <Plus size={14} /> Add Experience
                            </button>
                        </div>
                        {resumeData.experience.map((item, index) => {
                            const bulletGuidance = checkBulletGuidance(item.description);
                            return (
                                <div key={index} className="card" style={{ padding: '16px', position: 'relative' }}>
                                    <button onClick={() => removeItem('experience', index)} style={{ position: 'absolute', top: '16px', right: '16px', color: '#ff4444', border: 'none', background: 'none', cursor: 'pointer' }}>
                                        <Trash2 size={16} />
                                    </button>
                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                                        <div className="input-group">
                                            <label>Company</label>
                                            <input type="text" value={item.company} onChange={(e) => updateItem('experience', index, 'company', e.target.value)} />
                                        </div>
                                        <div className="input-group">
                                            <label>Role</label>
                                            <input type="text" value={item.role} onChange={(e) => updateItem('experience', index, 'role', e.target.value)} />
                                        </div>
                                        <div className="input-group">
                                            <label>Date Range</label>
                                            <input type="text" value={item.date} onChange={(e) => updateItem('experience', index, 'date', e.target.value)} />
                                        </div>
                                    </div>
                                    <div className="input-group" style={{ marginTop: '12px' }}>
                                        <label>Description</label>
                                        <textarea rows="3" value={item.description} onChange={(e) => updateItem('experience', index, 'description', e.target.value)} />
                                        {bulletGuidance && bulletGuidance.map((g, i) => (
                                            <span key={i} style={{ fontSize: '11px', color: '#C18B3A', marginTop: '4px', fontWeight: 500, display: 'block' }}>{g}</span>
                                        ))}
                                    </div>
                                </div>
                            )
                        })}
                    </section>

                    {/* Projects */}
                    <section className="stack-medium">
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <h3 style={{ fontSize: '13px', fontWeight: 800, textTransform: 'uppercase', color: '#999', letterSpacing: '0.05em' }}>Projects</h3>
                            <button onClick={() => addItem('projects')} style={{ background: 'none', border: 'none', color: '#0066cc', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px', fontSize: '12px', fontWeight: 600 }}>
                                <Plus size={14} /> Add Project
                            </button>
                        </div>
                        {resumeData.projects.map((item, index) => {
                            const bulletGuidance = checkBulletGuidance(item.description);
                            return (
                                <div key={index} className="card" style={{ padding: '16px', position: 'relative' }}>
                                    <button onClick={() => removeItem('projects', index)} style={{ position: 'absolute', top: '16px', right: '16px', color: '#ff4444', border: 'none', background: 'none', cursor: 'pointer' }}>
                                        <Trash2 size={16} />
                                    </button>
                                    <div className="input-group">
                                        <label>Project Name</label>
                                        <input type="text" value={item.name} onChange={(e) => updateItem('projects', index, 'name', e.target.value)} />
                                    </div>
                                    <div className="input-group" style={{ marginTop: '12px' }}>
                                        <label>Description</label>
                                        <textarea rows="2" value={item.description} onChange={(e) => updateItem('projects', index, 'description', e.target.value)} />
                                        {bulletGuidance && bulletGuidance.map((g, i) => (
                                            <span key={i} style={{ fontSize: '11px', color: '#C18B3A', marginTop: '4px', fontWeight: 500, display: 'block' }}>{g}</span>
                                        ))}
                                    </div>
                                    <div className="input-group" style={{ marginTop: '12px' }}>
                                        <label>Link</label>
                                        <input type="text" value={item.link} onChange={(e) => updateItem('projects', index, 'link', e.target.value)} />
                                    </div>
                                </div>
                            )
                        })}
                    </section>

                    {/* Skills */}
                    <section className="stack-medium" style={{ paddingBottom: '80px' }}>
                        <h3 style={{ fontSize: '13px', fontWeight: 800, textTransform: 'uppercase', color: '#999', letterSpacing: '0.05em' }}>Skills</h3>
                        <div className="input-group">
                            <label>Technical Skills (comma-separated)</label>
                            <input
                                type="text"
                                value={resumeData.skills}
                                onChange={(e) => setResumeData(prev => ({ ...prev, skills: e.target.value }))}
                                placeholder="React, Node.js, Python..."
                            />
                        </div>
                    </section>
                </div>
            </div>

            {/* Right: Preview Panel with Template Tabs */}
            <div style={{
                flex: '0 0 50%',
                background: '#f4f4f4',
                padding: '40px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                overflowY: 'auto'
            }}>
                {/* Template Navigator */}
                <div style={{
                    display: 'flex',
                    background: '#fff',
                    padding: '4px',
                    borderRadius: '8px',
                    marginBottom: '32px',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
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
                                borderRadius: '6px',
                                fontSize: '12px',
                                fontWeight: 700,
                                cursor: 'pointer',
                                transition: 'all 0.2s'
                            }}
                        >
                            {t}
                        </button>
                    ))}
                </div>

                {renderResumeContent()}
            </div>
        </div>
    );
};

export default Builder;

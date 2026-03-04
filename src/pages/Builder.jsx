import React, { useState } from 'react';
import { useResume } from '../context/ResumeContext';
import { Plus, Trash2, ExternalLink, AlertCircle, Sparkles, ChevronDown, ChevronUp, Github, Globe, X, Check, Mail, Phone, MapPin, Linkedin } from 'lucide-react';

const TagInput = ({ tags, onAdd, onRemove, placeholder }) => {
    const [input, setInput] = useState('');

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && input.trim()) {
            e.preventDefault();
            onAdd(input.trim());
            setInput('');
        }
    };

    return (
        <div className="tag-input-container">
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '8px' }}>
                {tags.map((tag, i) => (
                    <span key={i} style={{
                        background: '#f0f0f0',
                        padding: '4px 10px',
                        borderRadius: '4px',
                        fontSize: '12px',
                        fontWeight: 600,
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px'
                    }}>
                        {tag}
                        <button onClick={() => onRemove(i)} style={{ border: 'none', background: 'none', cursor: 'pointer', padding: 0, display: 'flex', color: '#ff4444' }}>
                            <X size={12} />
                        </button>
                    </span>
                ))}
            </div>
            <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={placeholder}
                style={{ width: '100%' }}
            />
        </div>
    );
};

const Builder = () => {
    const {
        resumeData, setResumeData, loadSampleData,
        selectedTemplate, setSelectedTemplate,
        selectedColor, setSelectedColor,
        atsScore, atsSuggestions
    } = useResume();
    const [isSuggesting, setIsSuggesting] = useState(false);
    const [expandedProjects, setExpandedProjects] = useState({});
    const [showToast, setShowToast] = useState(false);

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
                : { name: '', description: '', techStack: [], liveUrl: '', githubUrl: '' };

        setResumeData(prev => ({
            ...prev,
            [section]: [...prev[section], newItem]
        }));

        if (section === 'projects') {
            const index = resumeData.projects.length;
            setExpandedProjects(prev => ({ ...prev, [index]: true }));
        }
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

    const updateSkills = (category, tags) => {
        setResumeData(prev => ({
            ...prev,
            skills: { ...prev.skills, [category]: tags }
        }));
    };

    const COLORS = [
        { name: 'Teal', value: 'hsl(168, 60%, 40%)' },
        { name: 'Navy', value: 'hsl(220, 60%, 35%)' },
        { name: 'Burgundy', value: 'hsl(345, 60%, 35%)' },
        { name: 'Forest', value: 'hsl(150, 50%, 30%)' },
        { name: 'Charcoal', value: 'hsl(0, 0%, 25%)' }
    ];

    const handleDownload = () => {
        setShowToast(true);
        setTimeout(() => setShowToast(false), 3000);
    };

    const suggestSkills = () => {
        setIsSuggesting(true);
        setTimeout(() => {
            setResumeData(prev => ({
                ...prev,
                skills: {
                    technical: [...new Set([...prev.skills.technical, "TypeScript", "React", "Node.js", "PostgreSQL", "GraphQL"])],
                    soft: [...new Set([...prev.skills.soft, "Team Leadership", "Problem Solving"])],
                    tools: [...new Set([...prev.skills.tools, "Git", "Docker", "AWS"])]
                }
            }));
            setIsSuggesting(false);
        }, 1000);
    };

    const toggleProject = (index) => {
        setExpandedProjects(prev => ({ ...prev, [index]: !prev[index] }));
    };



    // Template Renderers
    const renderResumeContent = () => {
        const SectionHeader = ({ title, style = {} }) => (
            <h4 style={{
                fontSize: '11px',
                fontWeight: 900,
                borderBottom: selectedTemplate === 'Minimal' ? 'none' : `1px solid ${selectedColor}`,
                paddingBottom: '2px',
                marginBottom: '8px',
                marginTop: '16px',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                color: selectedTemplate === 'Minimal' ? selectedColor : '#000',
                ...style
            }}>
                {title}
            </h4>
        );

        const SkillPill = ({ text, color = '#eee', textColor = '#000' }) => (
            <span style={{
                fontSize: '8px',
                background: color,
                color: textColor,
                padding: '2px 8px',
                borderRadius: '100px',
                fontWeight: 600
            }}>
                {text}
            </span>
        );

        if (selectedTemplate === 'Modern') {
            return (
                <div style={{
                    width: '100%',
                    maxWidth: '595px',
                    background: '#fff',
                    boxShadow: '0 10px 30px rgba(0,0,0,0.05)',
                    minHeight: '842px',
                    display: 'flex',
                    fontFamily: "'Inter', sans-serif",
                    color: '#333'
                }}>
                    {/* Left Sidebar */}
                    <div style={{
                        flex: '0 0 32%',
                        background: selectedColor,
                        color: '#fff',
                        padding: '40px 20px',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '24px'
                    }}>
                        <div>
                            <h1 style={{ fontSize: '24px', fontWeight: 900, margin: 0, lineHeight: 1.1, textTransform: 'uppercase' }}>
                                {resumeData.personal.name || 'YOUR NAME'}
                            </h1>
                        </div>

                        <div className="stack-small" style={{ fontSize: '10px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><Mail size={12} /> {resumeData.personal.email}</div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><Phone size={12} /> {resumeData.personal.phone}</div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><MapPin size={12} /> {resumeData.personal.location}</div>
                        </div>

                        <div className="stack-medium">
                            <h4 style={{ fontSize: '10px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.05em', borderBottom: '1px solid rgba(255,255,255,0.2)', paddingBottom: '4px' }}>Skills</h4>
                            <div className="stack-small">
                                {resumeData.skills.technical.length > 0 && (
                                    <div className="stack-small">
                                        <span style={{ fontSize: '8px', fontWeight: 800, opacity: 0.7 }}>TECHNICAL</span>
                                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                                            {resumeData.skills.technical.map((s, i) => <SkillPill key={i} text={s} color="rgba(255,255,255,0.15)" textColor="#fff" />)}
                                        </div>
                                    </div>
                                )}
                                {resumeData.skills.soft.length > 0 && (
                                    <div className="stack-small">
                                        <span style={{ fontSize: '8px', fontWeight: 800, opacity: 0.7 }}>SOFT SKILLS</span>
                                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                                            {resumeData.skills.soft.map((s, i) => <SkillPill key={i} text={s} color="rgba(255,255,255,0.15)" textColor="#fff" />)}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="stack-medium">
                            <h4 style={{ fontSize: '10px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.05em', borderBottom: '1px solid rgba(255,255,255,0.2)', paddingBottom: '4px' }}>Education</h4>
                            {resumeData.education.map((edu, i) => (
                                <div key={i} style={{ fontSize: '10px' }}>
                                    <div style={{ fontWeight: 800 }}>{edu.school}</div>
                                    <div style={{ opacity: 0.8 }}>{edu.degree}</div>
                                    <div style={{ fontSize: '9px', opacity: 0.6 }}>{edu.date}</div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Main Content */}
                    <div style={{ flex: '1', padding: '40px 32px' }}>
                        {resumeData.summary && (
                            <div style={{ marginBottom: '24px' }}>
                                <SectionHeader title="Profile" style={{ borderBottom: `2px solid ${selectedColor}`, paddingBottom: '4px' }} />
                                <p style={{ fontSize: '11px', lineHeight: 1.6 }}>{resumeData.summary}</p>
                            </div>
                        )}

                        <div style={{ marginBottom: '24px' }}>
                            <SectionHeader title="Experience" style={{ borderBottom: `2px solid ${selectedColor}`, paddingBottom: '4px' }} />
                            <div className="stack-medium">
                                {resumeData.experience.map((exp, i) => (
                                    <div key={i}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', fontWeight: 800 }}>
                                            <span>{exp.role}</span>
                                            <span style={{ color: selectedColor }}>{exp.date}</span>
                                        </div>
                                        <div style={{ fontSize: '10px', fontWeight: 600, color: '#666' }}>{exp.company}</div>
                                        <p style={{ fontSize: '10px', marginTop: '4px', lineHeight: 1.5 }}>{exp.description}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div>
                            <SectionHeader title="Projects" style={{ borderBottom: `2px solid ${selectedColor}`, paddingBottom: '4px' }} />
                            {resumeData.projects.map((proj, i) => (
                                <div key={i} style={{ marginBottom: '12px' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', fontWeight: 800 }}>
                                        <span>{proj.name}</span>
                                        <div style={{ display: 'flex', gap: '6px' }}>
                                            {proj.githubUrl && <Github size={10} />}
                                            {proj.liveUrl && <Globe size={10} />}
                                        </div>
                                    </div>
                                    <p style={{ fontSize: '10px', lineHeight: 1.4, color: '#555', margin: '4px 0' }}>{proj.description}</p>
                                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                                        {proj.techStack?.map((t, ti) => <SkillPill key={ti} text={t} color="#f0f0f0" />)}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )
        }

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
                gap: '12px',
                fontFamily: selectedTemplate === 'Classic' ? "'Playfair Display', serif" : "'Inter', sans-serif"
            }}>
                {/* Header */}
                <div style={{ textAlign: selectedTemplate === 'Classic' ? 'center' : 'left', borderBottom: selectedTemplate === 'Classic' ? `2px solid ${selectedColor}` : 'none', paddingBottom: '16px', marginBottom: '8px' }}>
                    <h1 style={{ fontSize: '28px', fontWeight: 900, margin: 0, color: selectedTemplate === 'Minimal' ? selectedColor : '#000' }}>
                        {resumeData.personal.name || 'YOUR NAME'}
                    </h1>
                    <div style={{ fontSize: '10px', display: 'flex', justifyContent: selectedTemplate === 'Classic' ? 'center' : 'flex-start', gap: '12px', marginTop: '8px', color: '#666', fontWeight: 500 }}>
                        {resumeData.personal.email && <span>{resumeData.personal.email}</span>}
                        {resumeData.personal.phone && <span>{resumeData.personal.phone}</span>}
                        {resumeData.personal.location && <span>{resumeData.personal.location}</span>}
                    </div>
                </div>

                {resumeData.summary && (
                    <div>
                        <SectionHeader title="Summary" />
                        <p style={{ fontSize: '11px', lineHeight: 1.6, color: '#333' }}>{resumeData.summary}</p>
                    </div>
                )}

                {resumeData.experience.length > 0 && (
                    <div>
                        <SectionHeader title="Experience" />
                        {resumeData.experience.map((exp, i) => (
                            <div key={i} style={{ marginBottom: '12px' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', fontWeight: 800 }}>
                                    <span>{exp.role}</span>
                                    <span style={{ color: selectedColor }}>{exp.date}</span>
                                </div>
                                <div style={{ fontSize: '10px', fontWeight: 600, color: '#666' }}>{exp.company}</div>
                                <p style={{ fontSize: '10px', marginTop: '4px', lineHeight: 1.5 }}>{exp.description}</p>
                            </div>
                        ))}
                    </div>
                )}

                {resumeData.projects.length > 0 && (
                    <div>
                        <SectionHeader title="Projects" />
                        {resumeData.projects.map((proj, i) => (
                            <div key={i} style={{ marginBottom: '12px' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', fontWeight: 800 }}>
                                    <span>{proj.name}</span>
                                    <div style={{ display: 'flex', gap: '8px' }}>
                                        {proj.githubUrl && <Github size={12} />}
                                        {proj.liveUrl && <Globe size={12} />}
                                    </div>
                                </div>
                                <p style={{ fontSize: '10px', lineHeight: 1.4, margin: '4px 0' }}>{proj.description}</p>
                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                                    {proj.techStack?.map((t, ti) => <SkillPill key={ti} text={t} color="#f5f5f5" />)}
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {resumeData.education.length > 0 && (
                    <div>
                        <SectionHeader title="Education" />
                        {resumeData.education.map((edu, i) => (
                            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', marginBottom: '4px' }}>
                                <span><span style={{ fontWeight: 800 }}>{edu.school}</span> — {edu.degree}</span>
                                <span style={{ fontWeight: 600 }}>{edu.date}</span>
                            </div>
                        ))}
                    </div>
                )}

                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    <SectionHeader title="Skills" />
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
                        {resumeData.skills.technical.length > 0 && (
                            <div style={{ fontSize: '9px' }}><span style={{ fontWeight: 800, color: selectedColor }}>TECH: </span>{resumeData.skills.technical.join(', ')}</div>
                        )}
                        {resumeData.skills.soft.length > 0 && (
                            <div style={{ fontSize: '9px' }}><span style={{ fontWeight: 800, color: selectedColor }}>SOFT: </span>{resumeData.skills.soft.join(', ')}</div>
                        )}
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div style={{ display: 'flex', minHeight: 'calc(100vh - 64px)' }}>
            {/* Left: Form */}
            <div style={{ flex: '0 0 50%', borderRight: '1px solid #eee', padding: '40px', overflowY: 'auto', maxHeight: 'calc(100vh - 64px)', background: '#fff' }}>
                {/* Header */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '40px' }}>
                    <div>
                        <h2 style={{ fontSize: '24px', fontWeight: 600, marginBottom: '4px' }}>Resume Information</h2>
                        <p style={{ fontSize: '14px', color: '#666' }}>All changes are autosaved locally.</p>
                    </div>
                    <button onClick={loadSampleData} style={{ background: 'none', border: '1px solid #ddd', padding: '8px 16px', borderRadius: '4px', fontSize: '12px', cursor: 'pointer', fontWeight: 600 }}>Load Sample Data</button>
                </div>

                {/* Score */}
                <div className="card" style={{ padding: '24px', background: '#fafafa', marginBottom: '40px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px', alignItems: 'center' }}>
                        <div>
                            <span style={{ fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', color: '#666' }}>ATS Optimizer</span>
                            <div style={{ fontSize: '24px', fontWeight: 800, color: '#000' }}>{atsScore}%</div>
                        </div>
                        <div style={{ textAlign: 'right' }}>
                            <div style={{
                                fontSize: '10px',
                                fontWeight: 800,
                                padding: '4px 12px',
                                borderRadius: '100px',
                                background: atsScore > 70 ? '#e6f4ea' : atsScore > 40 ? '#fff8e1' : '#fce8e6',
                                color: atsScore > 70 ? '#1e7e34' : atsScore > 40 ? '#b7791f' : '#d93025'
                            }}>
                                {atsScore > 70 ? 'STRONG' : atsScore > 40 ? 'AVERAGE' : 'NEEDS WORK'}
                            </div>
                        </div>
                    </div>

                    <div style={{ width: '100%', height: '8px', background: '#eee', borderRadius: '10px', overflow: 'hidden', marginBottom: '20px' }}>
                        <div style={{ width: `${atsScore}%`, height: '100%', background: selectedColor, transition: 'width 0.6s cubic-bezier(0.4, 0, 0.2, 1)' }} />
                    </div>

                    {atsSuggestions.length > 0 && (
                        <div className="stack-small">
                            <span style={{ fontSize: '11px', fontWeight: 700, color: '#666', textTransform: 'uppercase' }}>Next Improvements</span>
                            {atsSuggestions.map((s, i) => (
                                <div key={i} style={{ display: 'flex', gap: '8px', alignItems: 'center', fontSize: '12px', color: '#444' }}>
                                    <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: selectedColor }} />
                                    {s.text}
                                </div>
                            ))}
                        </div>
                    )}
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

                    {/* Projects Section */}
                    <section className="stack-medium">
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <h3 style={{ fontSize: '13px', fontWeight: 800, textTransform: 'uppercase', color: '#999', letterSpacing: '0.05em' }}>Projects</h3>
                            <button onClick={() => addItem('projects')} style={{ background: 'none', border: 'none', color: '#0066cc', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px', fontSize: '12px', fontWeight: 600 }}>
                                <Plus size={14} /> Add Project
                            </button>
                        </div>
                        <div className="stack-small">
                            {resumeData.projects.map((item, index) => {
                                const isExpanded = expandedProjects[index];
                                const charCount = item.description.length;
                                return (
                                    <div key={index} className="card" style={{ padding: 0, overflow: 'hidden' }}>
                                        <button
                                            onClick={() => toggleProject(index)}
                                            style={{ width: '100%', padding: '16px', border: 'none', background: '#fff', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', textAlign: 'left' }}
                                        >
                                            <span style={{ fontWeight: 700, fontSize: '14px' }}>{item.name || `Project ${index + 1}`}</span>
                                            {isExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                                        </button>

                                        {isExpanded && (
                                            <div style={{ padding: '0 16px 16px', borderTop: '1px solid #f0f0f0' }}>
                                                <div className="stack-medium" style={{ marginTop: '16px' }}>
                                                    <div className="input-group">
                                                        <label>Project Title</label>
                                                        <input type="text" value={item.name} onChange={(e) => updateItem('projects', index, 'name', e.target.value)} placeholder="e.g. AI Portfolio" />
                                                    </div>

                                                    <div className="input-group">
                                                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                                            <label>Description</label>
                                                            <span style={{ fontSize: '11px', color: charCount > 200 ? '#ff4444' : '#888' }}>{charCount}/200</span>
                                                        </div>
                                                        <textarea
                                                            rows="3"
                                                            value={item.description}
                                                            onChange={(e) => updateItem('projects', index, 'description', e.target.value.slice(0, 200))}
                                                            placeholder="Describe what you built and the impact..."
                                                        />
                                                    </div>

                                                    <div className="input-group">
                                                        <label>Tech Stack (Press Enter to add)</label>
                                                        <TagInput
                                                            tags={item.techStack || []}
                                                            onAdd={(tag) => updateItem('projects', index, 'techStack', [...(item.techStack || []), tag])}
                                                            onRemove={(ti) => updateItem('projects', index, 'techStack', item.techStack.filter((_, i) => i !== ti))}
                                                            placeholder="React, Firebase..."
                                                        />
                                                    </div>

                                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                                                        <div className="input-group">
                                                            <label>Live URL</label>
                                                            <input type="text" value={item.liveUrl} onChange={(e) => updateItem('projects', index, 'liveUrl', e.target.value)} placeholder="https://..." />
                                                        </div>
                                                        <div className="input-group">
                                                            <label>GitHub URL</label>
                                                            <input type="text" value={item.githubUrl} onChange={(e) => updateItem('projects', index, 'githubUrl', e.target.value)} placeholder="github.com/..." />
                                                        </div>
                                                    </div>

                                                    <button
                                                        onClick={() => removeItem('projects', index)}
                                                        style={{ color: '#ff4444', border: '1px solid #ff4444', background: 'none', padding: '8px', borderRadius: '4px', cursor: 'pointer', fontSize: '12px', fontWeight: 600, marginTop: '8px' }}
                                                    >
                                                        Delete Project
                                                    </button>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                )
                            })}
                        </div>
                    </section>


                    {/* Skills Section */}
                    <section className="stack-medium" style={{ paddingBottom: '80px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <h3 style={{ fontSize: '13px', fontWeight: 800, textTransform: 'uppercase', color: '#999', letterSpacing: '0.05em' }}>Skills</h3>
                            <button
                                onClick={suggestSkills}
                                disabled={isSuggesting}
                                style={{ background: '#000', color: '#fff', border: 'none', padding: '8px 12px', borderRadius: '4px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', fontWeight: 600, opacity: isSuggesting ? 0.7 : 1 }}
                            >
                                <Sparkles size={14} /> {isSuggesting ? 'Suggesting...' : '✨ Suggest Skills'}
                            </button>
                        </div>

                        <div className="stack-medium">
                            <div className="input-group">
                                <label>Technical Skills ({resumeData.skills.technical.length})</label>
                                <TagInput
                                    tags={resumeData.skills.technical}
                                    onAdd={(tag) => updateSkills('technical', [...resumeData.skills.technical, tag])}
                                    onRemove={(i) => updateSkills('technical', resumeData.skills.technical.filter((_, idx) => idx !== i))}
                                    placeholder="Add technical skill..."
                                />
                            </div>

                            <div className="input-group">
                                <label>Soft Skills ({resumeData.skills.soft.length})</label>
                                <TagInput
                                    tags={resumeData.skills.soft}
                                    onAdd={(tag) => updateSkills('soft', [...resumeData.skills.soft, tag])}
                                    onRemove={(i) => updateSkills('soft', resumeData.skills.soft.filter((_, idx) => idx !== i))}
                                    placeholder="Add soft skill..."
                                />
                            </div>

                            <div className="input-group">
                                <label>Tools & Technologies ({resumeData.skills.tools.length})</label>
                                <TagInput
                                    tags={resumeData.skills.tools}
                                    onAdd={(tag) => updateSkills('tools', [...resumeData.skills.tools, tag])}
                                    onRemove={(i) => updateSkills('tools', resumeData.skills.tools.filter((_, idx) => idx !== i))}
                                    placeholder="Add tool..."
                                />
                            </div>
                        </div>
                    </section>
                </div>
            </div>

            {/* Right: Preview Panel */}
            <div style={{ flex: '0 0 50%', background: '#f8f9fa', padding: '40px', display: 'flex', flexDirection: 'column', alignItems: 'center', overflowY: 'auto' }}>
                {/* Template Picker */}
                <div style={{ width: '100%', maxWidth: '600px', marginBottom: '32px' }}>
                    <h5 style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', marginBottom: '16px', letterSpacing: '0.05em' }}>Choose Template</h5>
                    <div style={{ display: 'flex', gap: '20px' }}>
                        {[
                            { id: 'Classic', desc: 'Serif headings, rules' },
                            { id: 'Modern', desc: 'Two-column sidebar' },
                            { id: 'Minimal', desc: 'Clean, sans-serif' }
                        ].map(t => (
                            <div key={t.id} onClick={() => setSelectedTemplate(t.id)} style={{ cursor: 'pointer', flex: 1 }}>
                                <div style={{
                                    height: '160px',
                                    background: '#fff',
                                    borderRadius: '8px',
                                    border: `2px solid ${selectedTemplate === t.id ? '#0066cc' : '#eee'}`,
                                    padding: '12px',
                                    position: 'relative',
                                    boxShadow: selectedTemplate === t.id ? '0 8px 20px rgba(0,102,204,0.1)' : 'none',
                                    transition: 'all 0.2s'
                                }}>
                                    {selectedTemplate === t.id && <div style={{ position: 'absolute', top: '-10px', right: '-10px', background: '#0066cc', color: '#fff', borderRadius: '50%', width: '24px', height: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Check size={14} /></div>}
                                    {/* Sketch */}
                                    <div style={{ height: '20px', width: '60%', background: '#eee', marginBottom: '10px', margin: t.id === 'Classic' ? '0 auto 10px' : '0 0 10px' }} />
                                    {t.id === 'Modern' ? (
                                        <div style={{ display: 'flex', gap: '8px', height: '80px' }}>
                                            <div style={{ flex: '0 0 30%', background: '#f5f5f5' }} />
                                            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '4px' }}>
                                                <div style={{ height: '4px', width: '100%', background: '#f5f5f5' }} /><div style={{ height: '4px', width: '80%', background: '#f5f5f5' }} />
                                            </div>
                                        </div>
                                    ) : (
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                                            <div style={{ height: '4px', width: '100%', background: '#f5f5f5' }} /><div style={{ height: '4px', width: '100%', background: '#f5f5f5' }} /><div style={{ height: '4px', width: '100%', background: '#f5f5f5' }} />
                                        </div>
                                    )}
                                </div>
                                <div style={{ marginTop: '8px', textAlign: 'center' }}>
                                    <div style={{ fontWeight: 700, fontSize: '13px' }}>{t.id}</div>
                                    <div style={{ fontSize: '11px', color: '#888' }}>{t.desc}</div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Color Picker */}
                    <div style={{ marginTop: '24px' }}>
                        <h5 style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', marginBottom: '12px', letterSpacing: '0.05em' }}>Theme Color</h5>
                        <div style={{ display: 'flex', gap: '12px' }}>
                            {COLORS.map(c => (
                                <button
                                    key={c.name}
                                    onClick={() => setSelectedColor(c.value)}
                                    title={c.name}
                                    style={{
                                        width: '32px',
                                        height: '32px',
                                        borderRadius: '50%',
                                        background: c.value,
                                        border: `2px solid ${selectedColor === c.value ? '#000' : 'transparent'}`,
                                        padding: 0,
                                        cursor: 'pointer',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        transition: 'transform 0.1s'
                                    }}
                                    onMouseOver={(e) => e.target.style.transform = 'scale(1.1)'}
                                    onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
                                >
                                    {selectedColor === c.value && <Check size={16} color="#fff" />}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                <div style={{ width: '100%', display: 'flex', justifyContent: 'center', position: 'relative' }}>
                    {renderResumeContent()}
                </div>

                {/* PDF Action */}
                <button
                    onClick={handleDownload}
                    style={{
                        position: 'fixed',
                        bottom: '40px',
                        right: '40px',
                        background: '#000',
                        color: '#fff',
                        padding: '16px 32px',
                        borderRadius: '100px',
                        fontSize: '14px',
                        fontWeight: 700,
                        border: 'none',
                        cursor: 'pointer',
                        boxShadow: '0 10px 20px rgba(0,0,0,0.1)',
                        zIndex: 100
                    }}
                >
                    Download PDF
                </button>

                {/* Toast */}
                {showToast && (
                    <div style={{
                        position: 'fixed',
                        bottom: '100px',
                        right: '40px',
                        background: '#333',
                        color: '#fff',
                        padding: '12px 24px',
                        borderRadius: '4px',
                        fontSize: '14px',
                        fontWeight: 600,
                        boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
                        animation: 'slideUp 0.3s ease-out',
                        zIndex: 1000
                    }}>
                        PDF export ready! Check your downloads.
                    </div>
                )}
            </div>
        </div>
    );
};

export default Builder;

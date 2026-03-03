import React from 'react';
import { useResume } from '../context/ResumeContext';
import { Plus, Trash2, ExternalLink } from 'lucide-react';

const Builder = () => {
    const { resumeData, setResumeData, loadSampleData } = useResume();

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

    return (
        <div style={{ display: 'flex', minHeight: 'calc(100vh - 64px)' }}>
            {/* Left: Form */}
            <div style={{
                flex: '0 0 50%',
                borderRight: '1px solid #eee',
                padding: '40px',
                overflowY: 'auto',
                maxHeight: 'calc(100vh - 64px)'
            }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
                    <h2 style={{ fontSize: '24px', fontWeight: 600 }}>Resume Information</h2>
                    <button
                        onClick={loadSampleData}
                        style={{
                            background: 'none',
                            border: '1px solid #ddd',
                            padding: '8px 16px',
                            borderRadius: '4px',
                            fontSize: '12px',
                            cursor: 'pointer'
                        }}
                    >
                        Load Sample Data
                    </button>
                </div>

                <div className="stack-large">
                    {/* Personal Info */}
                    <section className="stack-medium">
                        <h3 style={{ fontSize: '14px', fontWeight: 700, textTransform: 'uppercase', color: '#888' }}>Personal Info</h3>
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
                        <h3 style={{ fontSize: '14px', fontWeight: 700, textTransform: 'uppercase', color: '#888' }}>Links</h3>
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
                        <h3 style={{ fontSize: '14px', fontWeight: 700, textTransform: 'uppercase', color: '#888' }}>Professional Summary</h3>
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
                            <h3 style={{ fontSize: '14px', fontWeight: 700, textTransform: 'uppercase', color: '#888' }}>Education</h3>
                            <button onClick={() => addItem('education')} style={{ background: 'none', border: 'none', color: '#0066cc', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px', fontSize: '12px' }}>
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
                            <h3 style={{ fontSize: '14px', fontWeight: 700, textTransform: 'uppercase', color: '#888' }}>Experience</h3>
                            <button onClick={() => addItem('experience')} style={{ background: 'none', border: 'none', color: '#0066cc', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px', fontSize: '12px' }}>
                                <Plus size={14} /> Add Experience
                            </button>
                        </div>
                        {resumeData.experience.map((item, index) => (
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
                                </div>
                            </div>
                        ))}
                    </section>

                    {/* Projects */}
                    <section className="stack-medium">
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <h3 style={{ fontSize: '14px', fontWeight: 700, textTransform: 'uppercase', color: '#888' }}>Projects</h3>
                            <button onClick={() => addItem('projects')} style={{ background: 'none', border: 'none', color: '#0066cc', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px', fontSize: '12px' }}>
                                <Plus size={14} /> Add Project
                            </button>
                        </div>
                        {resumeData.projects.map((item, index) => (
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
                                </div>
                                <div className="input-group" style={{ marginTop: '12px' }}>
                                    <label>Link</label>
                                    <input type="text" value={item.link} onChange={(e) => updateItem('projects', index, 'link', e.target.value)} />
                                </div>
                            </div>
                        ))}
                    </section>

                    {/* Skills */}
                    <section className="stack-medium">
                        <h3 style={{ fontSize: '14px', fontWeight: 700, textTransform: 'uppercase', color: '#888' }}>Skills</h3>
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

            {/* Right: Preview Panel Shell */}
            <div style={{
                flex: '0 0 50%',
                background: '#f4f4f4',
                padding: '60px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                overflowY: 'auto'
            }}>
                <div style={{
                    width: '100%',
                    maxWidth: '595px', // Approx A4 width ratio
                    background: '#fff',
                    boxShadow: '0 10px 30px rgba(0,0,0,0.05)',
                    minHeight: '842px', // Approx A4 height ratio
                    padding: '40px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '24px'
                }}>
                    {/* Mock Resume Header */}
                    <div style={{ textAlign: 'center', borderBottom: '2px solid #000', pb: '16px', paddingBottom: '16px' }}>
                        <h1 style={{ fontSize: '28px', fontWeight: 700, margin: 0 }}>{resumeData.personal.name || 'YOUR NAME'}</h1>
                        <div style={{ fontSize: '12px', display: 'flex', justifyContent: 'center', gap: '8px', marginTop: '8px' }}>
                            <span>{resumeData.personal.email}</span>
                            <span>•</span>
                            <span>{resumeData.personal.phone}</span>
                            <span>•</span>
                            <span>{resumeData.personal.location}</span>
                        </div>
                    </div>

                    {/* Mock Sections */}
                    {resumeData.summary && (
                        <div className="stack-small">
                            <h4 style={{ fontSize: '12px', fontWeight: 700, borderBottom: '1px solid #ddd', pb: '4px', marginBottom: '8px' }}>PROFESSIONAL SUMMARY</h4>
                            <p style={{ fontSize: '12px' }}>{resumeData.summary}</p>
                        </div>
                    )}

                    <div className="stack-small">
                        <h4 style={{ fontSize: '12px', fontWeight: 700, borderBottom: '1px solid #ddd', pb: '4px', marginBottom: '8px' }}>EXPERIENCE</h4>
                        <div style={{ height: '100px', border: '1px dashed #eee', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#bbb', fontSize: '12px' }}>
                            Live preview layout placeholder
                        </div>
                    </div>

                    <div className="stack-small">
                        <h4 style={{ fontSize: '12px', fontWeight: 700, borderBottom: '1px solid #ddd', pb: '4px', marginBottom: '8px' }}>EDUCATION</h4>
                        <div style={{ height: '50px', border: '1px dashed #eee', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#bbb', fontSize: '12px' }}>
                            Academic record placeholder
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Builder;

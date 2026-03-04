import React, { createContext, useContext, useState } from 'react';

const ResumeContext = createContext();

export const useResume = () => useContext(ResumeContext);

export const ResumeProvider = ({ children }) => {
    const [resumeData, setResumeData] = useState(() => {
        const saved = localStorage.getItem('resumeBuilderData');
        const initialData = {
            personal: {
                name: '',
                email: '',
                phone: '',
                location: '',
                links: {
                    github: '',
                    linkedin: ''
                }
            },
            summary: '',
            education: [],
            experience: [],
            projects: [],
            skills: {
                technical: [],
                soft: [],
                tools: []
            }
        };

        if (saved) {
            try {
                const parsed = JSON.parse(saved);
                // Data Migration / Healing
                return {
                    ...initialData,
                    ...parsed,
                    personal: { ...initialData.personal, ...(parsed.personal || {}) },
                    projects: Array.isArray(parsed.projects) ? parsed.projects.map(proj => ({
                        name: '',
                        description: '',
                        techStack: [],
                        liveUrl: '',
                        githubUrl: '',
                        ...proj
                    })) : [],
                    skills: {
                        technical: Array.isArray(parsed.skills?.technical) ? parsed.skills.technical : [],
                        soft: Array.isArray(parsed.skills?.soft) ? parsed.skills.soft : [],
                        tools: Array.isArray(parsed.skills?.tools) ? parsed.skills.tools : []
                    }
                };
            } catch (e) {
                console.error("Failed to parse saved resume data", e);
                return initialData;
            }
        }
        return initialData;
    });

    const [selectedTemplate, setSelectedTemplate] = useState(() => {
        return localStorage.getItem('resumeBuilderTemplate') || 'Classic';
    });

    React.useEffect(() => {
        localStorage.setItem('resumeBuilderData', JSON.stringify(resumeData));
    }, [resumeData]);

    React.useEffect(() => {
        localStorage.setItem('resumeBuilderTemplate', selectedTemplate);
    }, [selectedTemplate]);

    const loadSampleData = () => {
        setResumeData({
            personal: {
                name: 'Alex Rivera',
                email: 'alex.rivera@example.com',
                phone: '+1 (555) 0123',
                location: 'San Francisco, CA',
                links: {
                    github: 'github.com/arivera',
                    linkedin: 'linkedin.com/in/arivera'
                }
            },
            summary: 'Senior Software Engineer with 8+ years of experience in building scalable web applications. Passionate about AI integration and creating seamless user experiences. Proven track record of leading cross-functional teams and delivering high-impact features.',
            education: [
                {
                    school: 'University of California, Berkeley',
                    degree: 'B.S. in Computer Science',
                    date: '2012 - 2016'
                }
            ],
            experience: [
                {
                    company: 'TechFlow Systems',
                    role: 'Lead Developer',
                    date: '2019 - Present',
                    description: 'Architected and implemented a microservices-based platform serving 1M+ active users. Improved system performance by 40% through optimized caching strategies.'
                }
            ],
            projects: [
                {
                    name: 'AI Resume Analyzer',
                    description: 'Built a tool that uses NLP to analyze resumes against job descriptions, achieving 85% accuracy in skill matching.',
                    techStack: ['Node.js', 'Python', 'React', 'Elasticsearch'],
                    githubUrl: 'github.com/arivera/ai-resume-analyzer',
                    liveUrl: 'https://analyzer.example.com'
                },
                {
                    name: 'CloudSync Hub',
                    description: 'Developed a real-time file synchronization service with 99.9% uptime and zero-latency data updates for 50k+ users.',
                    techStack: ['Go', 'PostgreSQL', 'Redis', 'AWS'],
                    githubUrl: 'github.com/arivera/cloud-sync',
                    liveUrl: ''
                }
            ],
            skills: {
                technical: ['JavaScript', 'TypeScript', 'React', 'Node.js', 'Python'],
                soft: ['Team Leadership', 'Problem Solving', 'Communication'],
                tools: ['AWS', 'Docker', 'Git', 'GraphQL']
            }
        });
    };

    return (
        <ResumeContext.Provider value={{ resumeData, setResumeData, loadSampleData, selectedTemplate, setSelectedTemplate }}>
            {children}
        </ResumeContext.Provider>
    );
};

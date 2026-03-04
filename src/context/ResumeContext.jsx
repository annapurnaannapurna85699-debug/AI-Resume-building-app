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

    const [selectedColor, setSelectedColor] = useState(() => {
        return localStorage.getItem('resumeBuilderColor') || 'hsl(168, 60%, 40%)';
    });

    React.useEffect(() => {
        localStorage.setItem('resumeBuilderData', JSON.stringify(resumeData));
    }, [resumeData]);

    React.useEffect(() => {
        localStorage.setItem('resumeBuilderTemplate', selectedTemplate);
    }, [selectedTemplate]);

    React.useEffect(() => {
        localStorage.setItem('resumeBuilderColor', selectedColor);
    }, [selectedColor]);

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

    const calculateATSScore = () => {
        let score = 0;
        const suggestions = [];
        const actionVerbs = ['built', 'led', 'designed', 'improved', 'implemented', 'developed', 'created', 'optimized', 'automated'];

        // 1. Name (+10)
        if (resumeData.personal.name.trim()) score += 10;
        else suggestions.push({ text: "Add your full name (+10 points)", points: 10 });

        // 2. Email (+10)
        if (resumeData.personal.email.trim()) score += 10;
        else suggestions.push({ text: "Add your email address (+10 points)", points: 10 });

        // 3. Summary > 50 chars (+10)
        if (resumeData.summary.length > 50) score += 10;
        else suggestions.push({ text: "Write a professional summary (at least 50 chars) (+10 points)", points: 10 });

        // 4. At least 1 experience (+15)
        if (resumeData.experience.length > 0 && resumeData.experience.some(exp => exp.description.trim().length > 10)) score += 15;
        else suggestions.push({ text: "Add at least one detailed experience entry (+15 points)", points: 15 });

        // 5. At least 1 education (+10)
        if (resumeData.education.length > 0) score += 10;
        else suggestions.push({ text: "Add your education history (+10 points)", points: 10 });

        // 6. At least 5 skills (+10)
        const totalSkills = Object.values(resumeData.skills).flat().length;
        if (totalSkills >= 5) score += 10;
        else suggestions.push({ text: "Add at least 5 skills across categories (+10 points)", points: 10 });

        // 7. At least 1 project (+10)
        if (resumeData.projects.length > 0) score += 10;
        else suggestions.push({ text: "Showcase at least one project (+10 points)", points: 10 });

        // 8. Phone (+5)
        if (resumeData.personal.phone.trim()) score += 5;
        else suggestions.push({ text: "Include your phone number (+5 points)", points: 5 });

        // 9. LinkedIn (+5)
        if (resumeData.personal.links.linkedin.trim()) score += 5;
        else suggestions.push({ text: "Link your LinkedIn profile (+5 points)", points: 5 });

        // 10. GitHub (+5)
        if (resumeData.personal.links.github.trim()) score += 5;
        else suggestions.push({ text: "Link your GitHub repository (+5 points)", points: 5 });

        // 11. Summary contains action verbs (+10)
        const hasActionVerb = actionVerbs.some(verb => resumeData.summary.toLowerCase().includes(verb));
        if (hasActionVerb) score += 10;
        else suggestions.push({ text: "Use action verbs (e.g., 'Led', 'Built') in your summary (+10 points)", points: 10 });

        return {
            score: Math.min(score, 100),
            suggestions: suggestions.sort((a, b) => b.points - a.points).slice(0, 3)
        };
    };

    const atsResult = calculateATSScore();

    return (
        <ResumeContext.Provider value={{
            resumeData,
            setResumeData,
            loadSampleData,
            selectedTemplate,
            setSelectedTemplate,
            selectedColor,
            setSelectedColor,
            atsScore: atsResult.score,
            atsSuggestions: atsResult.suggestions
        }}>
            {children}
        </ResumeContext.Provider>
    );
};

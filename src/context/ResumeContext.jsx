import React, { createContext, useContext, useState } from 'react';

const ResumeContext = createContext();

export const useResume = () => useContext(ResumeContext);

export const ResumeProvider = ({ children }) => {
    const [resumeData, setResumeData] = useState({
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
        skills: ''
    });

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
                },
                {
                    company: 'InnoLabs',
                    role: 'Full Stack Engineer',
                    date: '2016 - 2019',
                    description: 'Developed and maintained various client projects using React and Node.js. Integrated AI-driven search functionality and personalized recommendation engines.'
                }
            ],
            projects: [
                {
                    name: 'AI Resume Analyzer',
                    description: 'Built a tool that uses NLP to analyze resumes against job descriptions, achieving 85% accuracy in skill matching.',
                    link: 'github.com/arivera/ai-resume-analyzer'
                }
            ],
            skills: 'JavaScript, TypeScript, React, Node.js, Python, AWS, Docker, GraphQL, System Architecture, Team Leadership'
        });
    };

    return (
        <ResumeContext.Provider value={{ resumeData, setResumeData, loadSampleData }}>
            {children}
        </ResumeContext.Provider>
    );
};

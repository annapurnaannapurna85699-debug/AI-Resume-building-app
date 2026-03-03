import React from 'react';
import { useLocation } from 'react-router-dom';
import { getStepByPath } from '../ProjectData';

const StepContent = () => {
    const location = useLocation();
    const step = getStepByPath(location.pathname);

    const getStepDescription = (id) => {
        switch (id) {
            case '01': return 'Define the core problem your AI Resume Builder is solving.';
            case '02': return 'Analyze the market and target audience for this tool.';
            case '03': return 'Design the high-level system architecture.';
            case '04': return 'Create the High Level Design (HLD) document.';
            case '05': return 'Detail the Low Level Design (LLD) and data structures.';
            case '06': return 'Start the actual build process in Lovable.';
            case '07': return 'Test the application and fix any bugs.';
            case '08': return 'Prepare for shipment and deployment.';
            default: return 'Build track in progress.';
        }
    };

    return (
        <div className="stack-large">
            <div className="stack-small">
                <h2 style={{ fontSize: '24px' }}>Drafting Step {step?.id}</h2>
                <p style={{ opacity: 0.7 }}>{getStepDescription(step?.id)}</p>
            </div>

            <div className="prompt-box">
                {`# TASK: Create ${step?.label} Artifact\n# CONTEXT: Project 3 - AI Resume Builder\n# STEP: ${step?.id}\n\nPlease generate a comprehensive markdown artifact for the ${step?.label} phase...`}
            </div>

            <div className="stack-medium">
                <h3 style={{ fontSize: '18px', fontWeight: '600' }}>Instructions</h3>
                <ul style={{ paddingLeft: '20px', fontSize: '16px', opacity: 0.8 }} className="stack-small">
                    <li>Review the prompt above and refine it for your specific needs.</li>
                    <li>Copy the prompt from the right-hand panel into Lovable.</li>
                    <li>Once Lovable generates the artifact, paste it into the "Copy This Into Lovable" textarea to save it and proceed.</li>
                </ul>
            </div>
        </div>
    );
};

export default StepContent;

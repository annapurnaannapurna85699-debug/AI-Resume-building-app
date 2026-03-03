import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ResumeProvider } from './context/ResumeContext';
import AppLayout from './components/AppLayout';
import Home from './pages/Home';
import Builder from './pages/Builder';
import Preview from './pages/Preview';
import Proof from './pages/Proof';

// Build Track Imports
import Layout from './components/Layout';
import StepContent from './pages/StepContent';
import BuildTrackProof from './pages/BuildTrackProof';

function App() {
  return (
    <ResumeProvider>
      <BrowserRouter>
        <Routes>
          {/* Main App Routes */}
          <Route element={<AppLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/builder" element={<Builder />} />
            <Route path="/preview" element={<Preview />} />
            <Route path="/proof" element={<Proof />} />
          </Route>

          {/* Project 3 Build Track Routes */}
          <Route element={<Layout />}>
            <Route path="/rb/01-problem" element={<StepContent />} />
            <Route path="/rb/02-market" element={<StepContent />} />
            <Route path="/rb/03-architecture" element={<StepContent />} />
            <Route path="/rb/04-hld" element={<StepContent />} />
            <Route path="/rb/05-lld" element={<StepContent />} />
            <Route path="/rb/06-build" element={<StepContent />} />
            <Route path="/rb/07-test" element={<StepContent />} />
            <Route path="/rb/08-ship" element={<StepContent />} />
            <Route path="/rb/proof" element={<BuildTrackProof />} />
          </Route>

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </ResumeProvider>
  );
}

export default App;

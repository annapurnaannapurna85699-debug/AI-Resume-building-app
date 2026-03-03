import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import StepContent from './pages/StepContent';
import Proof from './pages/Proof';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Navigate to="/rb/01-problem" replace />} />
          <Route path="/rb/01-problem" element={<StepContent />} />
          <Route path="/rb/02-market" element={<StepContent />} />
          <Route path="/rb/03-architecture" element={<StepContent />} />
          <Route path="/rb/04-hld" element={<StepContent />} />
          <Route path="/rb/05-lld" element={<StepContent />} />
          <Route path="/rb/06-build" element={<StepContent />} />
          <Route path="/rb/07-test" element={<StepContent />} />
          <Route path="/rb/08-ship" element={<StepContent />} />
          <Route path="/rb/proof" element={<Proof />} />
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/rb/01-problem" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

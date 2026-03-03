export const PROJECT_STEPS = [
  { id: '01', path: '/rb/01-problem', label: 'Problem' },
  { id: '02', path: '/rb/02-market', label: 'Market' },
  { id: '03', path: '/rb/03-architecture', label: 'Architecture' },
  { id: '04', path: '/rb/04-hld', label: 'HLD' },
  { id: '05', path: '/rb/05-lld', label: 'LLD' },
  { id: '06', path: '/rb/06-build', label: 'Build' },
  { id: '07', path: '/rb/07-test', label: 'Test' },
  { id: '08', path: '/rb/08-ship', label: 'Ship' },
  { id: 'proof', path: '/rb/proof', label: 'Proof' }
];

export const getStepByPath = (path) => {
  return PROJECT_STEPS.find(step => step.path === path);
};

export const getStepIndex = (path) => {
  return PROJECT_STEPS.findIndex(step => step.path === path);
};

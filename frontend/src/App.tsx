import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AranProvider } from './context/AranContext';
import IntroAnimation from './components/branding/IntroAnimation';
import AranHero from './components/branding/AranHero';
import { CommandCenter } from './pages/CommandCenter';
import { IntelligencePage } from './pages/IntelligencePage';

const HomePage: React.FC = () => {
  const [introDone, setIntroDone] = useState(
    () => sessionStorage.getItem('aranIntroSeen') === 'true'
  );

  if (!introDone) {
    return <IntroAnimation onFinish={() => setIntroDone(true)} />;
  }

  return <AranHero />;
};

const App: React.FC = () => {
  return (
    <AranProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/command" element={<CommandCenter />} />
          <Route path="/intelligence" element={<IntelligencePage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </AranProvider>
  );
};

export default App;

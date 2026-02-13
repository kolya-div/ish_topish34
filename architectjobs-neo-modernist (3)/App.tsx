
import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './components/ThemeContext';
import { UserProvider } from './components/UserContext';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { CreativeStudio } from './components/CreativeStudio';
import { VideoAnimator } from './components/VideoAnimator';
import { LoginModal } from './components/LoginModal';
import { AdminPanel } from './components/AdminPanel';

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <UserProvider>
        <Router>
          <Layout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/vakansiyalar" element={<Home />} />
              <Route path="/dizayn" element={<CreativeStudio />} />
              <Route path="/video" element={<VideoAnimator />} />
              <Route path="/admin" element={<AdminPanel />} />
            </Routes>
          </Layout>
          <LoginModal />
        </Router>
      </UserProvider>
    </ThemeProvider>
  );
};

export default App;

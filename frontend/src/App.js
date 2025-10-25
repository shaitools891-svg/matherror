import React, { useEffect, useState } from "react";
import { HashRouter, Routes, Route, useLocation } from "react-router-dom";
import { ThemeProvider } from './context/ThemeContext';
import { useTheme } from './context/ThemeContext';


// Glass theme background component
const GlassBackground = () => {
  const { currentThemeId } = useTheme();

  console.log('[DEBUG] GlassBackground component - currentThemeId:', currentThemeId, 'typeof:', typeof currentThemeId, 'context available:', !!useTheme());

  if (currentThemeId !== 'glass') {
    console.log('[DEBUG] GlassBackground not rendering - theme is not glass');
    return null;
  }

  console.log('[DEBUG] GlassBackground rendering for glass theme');

  return (
    <div className="fixed inset-0 -z-10 pointer-events-none">
      {/* Glass theme base background */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-white/10 to-white/5"></div>

      {/* Glass theme accent elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-white/10 blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-blue-500/10 blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-3/4 left-3/4 w-64 h-64 rounded-full bg-purple-500/10 blur-3xl animate-pulse delay-500"></div>
      </div>
    </div>
  );
};
import Particles from './components/Particles'; // Add this import
import Header from './components/Header';
import Hero from './components/Hero';
import MaterialsSection from './components/MaterialsSection';
import AboutSection from './components/AboutSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import LoadingSpinner from './components/LoadingSpinner';
import ScrollToTop from './components/ScrollToTop';
import NotFound from './components/NotFound';

// Scroll restoration component
const ScrollRestoration = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

// Updated Background pattern component with particles
const BackgroundPattern = () => {
  const { currentThemeId } = useTheme();

  console.log('[DEBUG] BackgroundPattern - currentThemeId:', currentThemeId, 'typeof:', typeof currentThemeId, 'context available:', !!useTheme());

  // Different particle colors based on theme - using colors that work with your design system
  const lightThemeColors = ['#ffffff', '#f8fafc', '#e2e8f0', '#cbd5e1'];
  const darkThemeColors = ['#475569', '#64748b', '#94a3b8', '#cbd5e1'];
  const glassThemeColors = ['#ffffff', '#f8fafc', '#e2e8f0', '#cbd5e1']; // Similar to light but with glass effect

  const getParticleColors = () => {
    switch (currentThemeId) {
      case 'dark': return darkThemeColors;
      case 'glass': return glassThemeColors;
      default: return lightThemeColors;
    }
  };

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      {/* Base gradient background using your existing classes */}
      <div className={`absolute inset-0 transition-all duration-500 ${
        currentThemeId === 'glass'
          ? 'bg-gradient-to-br from-white/20 via-white/10 to-white/5'
          : 'bg-gradient-to-br from-blue-50 via-white to-gray-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900'
      }`}></div>

      {/* Particles layer */}
      <div className="absolute inset-0">
        <Particles
          particleColors={getParticleColors()}
          particleCount={100}
          particleSpread={15}
          speed={0.06}
          particleBaseSize={70}
          moveParticlesOnHover={true}
          particleHoverFactor={0.8}
          alphaParticles={true}
          disableRotation={false}
          sizeRandomness={0.6}
          cameraDistance={30}
          className="w-full h-full opacity-50"
        />
      </div>

      {/* Subtle accent orbs using your color system */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-primary/10 blur-3xl animate-pulse transition-all duration-700"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-accent/10 blur-3xl animate-pulse transition-all duration-700 delay-1000"></div>
        <div className="absolute top-3/4 left-3/4 w-64 h-64 rounded-full bg-secondary/10 blur-3xl animate-pulse transition-all duration-700 delay-500"></div>
      </div>
    </div>
  );
};

// Main Home component
const Home = () => {
  console.log('[DEBUG] Home component rendering');
  return (
    <div className="min-h-screen bg-background transition-colors duration-300 glass:bg-transparent">
      <BackgroundPattern />
      <GlassBackground />
      <Header />
      <main className="relative z-10">
        <Hero />
        <MaterialsSection />
        <AboutSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
};

// Loading component with particles
const AppLoading = () => {
  const { currentThemeId } = useTheme();
  const loadingColors = currentThemeId === 'dark' ? ['#64748b', '#94a3b8'] : ['#e2e8f0', '#cbd5e1'];

  return (
    <div className="min-h-screen flex items-center justify-center bg-background glass:bg-transparent transition-colors duration-300 relative">
      {/* Particles for loading screen */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-muted/50"></div>
        <Particles
          particleColors={loadingColors}
          particleCount={40}
          particleSpread={10}
          speed={0.04}
          particleBaseSize={50}
          moveParticlesOnHover={false}
          alphaParticles={true}
          disableRotation={false}
          className="w-full h-full opacity-30"
        />
      </div>
      <LoadingSpinner />
    </div>
  );
};

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate initial loading
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  console.log('[DEBUG] App component rendering, loading:', loading);

  return (
    <ThemeProvider>
      <HashRouter>
        <div className="App">
          <ScrollRestoration />
          <ScrollToTop />
          <Routes>
            <Route path="/" element={loading ? <AppLoading /> : <Home />} />
            {/* Add other routes here if needed */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </HashRouter>
    </ThemeProvider>
  );
}

export default App;

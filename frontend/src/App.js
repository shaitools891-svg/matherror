import React, { useEffect, useState } from "react";
import { HashRouter, Routes, Route, useLocation } from "react-router-dom";
import { ThemeProvider, useTheme } from './context/ThemeContext';
import Header from './components/Header';
import Hero from './components/Hero';
import MaterialsSection from './components/MaterialsSection';
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

// Background pattern component for visual appeal
const BackgroundPattern = () => {
  const { isDarkMode } = useTheme();
  
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      <div className={`absolute top-0 left-0 w-full h-full ${
        isDarkMode 
          ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900' 
          : 'bg-gradient-to-br from-blue-50 via-white to-gray-50'
      } transition-all duration-500`}></div>
      <div className="absolute top-0 left-0 w-full h-full opacity-10">
        <div className={`absolute top-20 left-10 w-64 h-64 rounded-full ${
          isDarkMode ? 'bg-blue-600' : 'bg-blue-300'
        } blur-3xl animate-pulse transition-colors duration-500`}></div>
        <div className={`absolute bottom-20 right-10 w-80 h-80 rounded-full ${
          isDarkMode ? 'bg-purple-600' : 'bg-purple-300'
        } blur-3xl animate-pulse transition-colors duration-500 delay-700`}></div>
      </div>
    </div>
  );
};

// Main Home component
const Home = () => {
  const { isDarkMode } = useTheme();

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      isDarkMode ? 'bg-gray-900' : 'bg-white'
    }`}>
      <BackgroundPattern />
      <Header />
      <main className="relative z-10">
        <Hero />
        <MaterialsSection />
      </main>
      <Footer />
    </div>
  );
};

// Loading component
const AppLoading = () => {
  const { isDarkMode } = useTheme();

  return (
    <div className={`min-h-screen flex items-center justify-center transition-colors duration-300 ${
      isDarkMode ? 'bg-gray-900' : 'bg-white'
    }`}>
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

  // Show loading spinner while app is initializing
  if (loading) {
    return (
      <ThemeProvider>
        <AppLoading />
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider>
      <HashRouter>
        <div className="App">
          <ScrollRestoration />
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<Home />} />
            {/* Add other routes here if needed */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </HashRouter>
    </ThemeProvider>
  );
}

export default App;

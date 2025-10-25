import React, { useEffect, useState } from "react";
import { HashRouter, Routes, Route, useLocation } from "react-router-dom";
import { ThemeProvider } from './context/ThemeContext';
import { useTheme } from './context/ThemeContext';


import Particles from './components/Particles'; // Add this import
import Header from './components/Header';
import Hero from './components/Hero';
import MaterialsSection from './components/MaterialsSection';
import VideoSection from './components/VideoSection';
import AboutSection from './components/AboutSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import LoadingSpinner from './components/LoadingSpinner';
import ScrollToTop from './components/ScrollToTop';
import NotFound from './components/NotFound';
import VideoPlayer from './components/VideoPlayer';

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
  const { currentTheme } = useTheme();
  const currentThemeId = currentTheme?.id;

  // Different particle colors based on theme - using colors that work with your design system
  const lightThemeColors = ['#ffffff', '#f8fafc', '#e2e8f0', '#cbd5e1'];
  const darkThemeColors = ['#475569', '#64748b', '#94a3b8', '#cbd5e1'];

  const getParticleColors = () => {
    switch (currentThemeId) {
      case 'dark': return darkThemeColors;
      default: return lightThemeColors;
    }
  };

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      {/* Base gradient background using your existing classes */}
      <div className={`absolute inset-0 transition-all duration-500 bg-gradient-to-br from-blue-50 via-white to-gray-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900`}></div>

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

// Video Player Page component
const VideoPlayerPage = () => {
  const { currentTheme } = useTheme();
  const location = useLocation();
  const videoData = location.state?.videoData;

  if (!videoData) {
    return (
      <div className="min-h-screen bg-background transition-colors duration-300">
        <BackgroundPattern />
        <Header />
        <main className="relative z-10 flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4">
              Video Not Found
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              The video you're looking for is not available.
            </p>
            <a
              href="#/materials"
              className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
            >
              Back to Materials
            </a>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background transition-colors duration-300">
      <BackgroundPattern />
      <Header />
      <main className="relative z-10 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <div className="mb-6">
            <nav className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
              <a href="#/" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Home</a>
              <span>/</span>
              <a href="#/materials" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Materials</a>
              <span>/</span>
              <span className="text-gray-800 dark:text-gray-200">{videoData.subject}</span>
              <span>/</span>
              <span className="text-gray-800 dark:text-gray-200">{videoData.title}</span>
            </nav>
          </div>

          {/* Video Player */}
          <div className="flex justify-center">
            <VideoPlayer
              videoUrl={videoData.url}
              title={`${videoData.subject} - ${videoData.chapter} - ${videoData.title}`}
            />
          </div>

          {/* Video Info */}
          <div className="mt-8 max-w-4xl mx-auto">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
              <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-2">
                {videoData.title}
              </h1>
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded-full text-sm font-medium">
                  {videoData.subject}
                </span>
                <span className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 rounded-full text-sm font-medium">
                  {videoData.chapter}
                </span>
                <span className="px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300 rounded-full text-sm font-medium">
                  Video Lecture
                </span>
              </div>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                Watch this educational video to enhance your understanding of {videoData.chapter} from {videoData.subject}.
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

// Main Home component
const Home = () => {
  const { currentTheme } = useTheme();

  return (
    <div className="min-h-screen bg-background transition-colors duration-300">
      <BackgroundPattern />
      <Header />
      <main className="relative z-10">
        <Hero />
        <MaterialsSection />
        <VideoSection />
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
    <div className="min-h-screen flex items-center justify-center bg-background transition-colors duration-300 relative">
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

  return (
    <ThemeProvider>
      <HashRouter>
        <div className="App">
          <ScrollRestoration />
          <ScrollToTop />
          <Routes>
            <Route path="/" element={loading ? <AppLoading /> : <Home />} />
            <Route path="/video" element={<VideoPlayerPage />} />
            {/* Add other routes here if needed */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </HashRouter>
    </ThemeProvider>
  );
}

export default App;

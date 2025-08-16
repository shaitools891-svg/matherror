import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { Button } from './ui/button';
import { GraduationCap, BookOpen, Video } from 'lucide-react';
import { mockData } from '../data/mock';

const Hero = () => {
  const { currentTheme } = useTheme();

  const scrollToMaterials = () => {
    document.getElementById('materials')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5">
        <div 
          className="absolute top-10 left-10 w-32 h-32 rounded-full"
          style={{ backgroundColor: currentTheme.primary }}
        />
        <div 
          className="absolute bottom-10 right-10 w-24 h-24 rounded-full"
          style={{ backgroundColor: currentTheme.accent }}
        />
      </div>

      <div className="max-w-4xl mx-auto text-center relative">
        {/* Main heading */}
        <div className="mb-8">
          <h1 className="text-4xl md:text-6xl font-bold mb-4" style={{ color: currentTheme.text }}>
            Welcome to{' '}
            <span style={{ color: currentTheme.primary }}>
              {mockData.siteInfo.name}
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-2">
            {mockData.siteInfo.tagline}
          </p>
          <p className="text-lg text-gray-500">
            {mockData.siteInfo.description}
          </p>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <div className="flex flex-col items-center p-6 rounded-xl bg-white shadow-sm border border-gray-100">
            <div 
              className="w-12 h-12 rounded-lg flex items-center justify-center mb-4"
              style={{ backgroundColor: `${currentTheme.primary}20` }}
            >
              <BookOpen className="w-6 h-6" style={{ color: currentTheme.primary }} />
            </div>
            <h3 className="font-semibold text-lg mb-2" style={{ color: currentTheme.text }}>
              PDF Notes
            </h3>
            <p className="text-gray-600 text-center">
              Comprehensive chapter-wise study materials
            </p>
          </div>

          <div className="flex flex-col items-center p-6 rounded-xl bg-white shadow-sm border border-gray-100">
            <div 
              className="w-12 h-12 rounded-lg flex items-center justify-center mb-4"
              style={{ backgroundColor: `${currentTheme.primary}20` }}
            >
              <Video className="w-6 h-6" style={{ color: currentTheme.primary }} />
            </div>
            <h3 className="font-semibold text-lg mb-2" style={{ color: currentTheme.text }}>
              Video Lectures
            </h3>
            <p className="text-gray-600 text-center">
              Detailed explanations and tutorials
            </p>
          </div>

          <div className="flex flex-col items-center p-6 rounded-xl bg-white shadow-sm border border-gray-100">
            <div 
              className="w-12 h-12 rounded-lg flex items-center justify-center mb-4"
              style={{ backgroundColor: `${currentTheme.primary}20` }}
            >
              <GraduationCap className="w-6 h-6" style={{ color: currentTheme.primary }} />
            </div>
            <h3 className="font-semibold text-lg mb-2" style={{ color: currentTheme.text }}>
              HSC 26 Ready
            </h3>
            <p className="text-gray-600 text-center">
              Updated materials for latest syllabus
            </p>
          </div>
        </div>

        {/* CTA */}
        <Button 
          onClick={scrollToMaterials}
          size="lg"
          className="px-8 py-3 text-lg font-semibold transition-all duration-300 hover:scale-105"
          style={{ 
            backgroundColor: currentTheme.primary,
            color: 'white'
          }}
        >
          Explore Materials
        </Button>
      </div>
    </section>
  );
};

export default Hero;
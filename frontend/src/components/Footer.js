import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { Heart, Mail, Phone } from 'lucide-react';
import { mockData } from '../data/mock';

const Footer = () => {
  const { currentTheme } = useTheme();

  return (
    <footer className="bg-gray-50 border-t border-gray-200 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Brand Section */}
          <div className="col-span-1">
            <div className="flex items-center space-x-3 mb-4">
              <div 
                className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-bold"
                style={{ backgroundColor: currentTheme.primary }}
              >
                ME
              </div>
              <h3 className="text-xl font-bold" style={{ color: currentTheme.text }}>
                {mockData.siteInfo.name}
              </h3>
            </div>
            <p className="text-gray-600 mb-4">
              Your trusted Whatsapp group for HSC 26 preparation. Quality study materials 
              and video lectures for ICT and Chemistry.
            </p>
            <p className="text-sm text-gray-500">
              {mockData.siteInfo.tagline}
            </p>
          </div>

          {/* Subjects */}
          <div className="col-span-1">
            <h4 className="font-semibold mb-4" style={{ color: currentTheme.text }}>
              Subjects
            </h4>
            <ul className="space-y-2">
              {mockData.subjects.map((subject) => (
                <li key={subject.id}>
                  <a 
                    href="#materials" 
                    className="text-gray-600 hover:text-gray-900 transition-colors text-sm"
                  >
                    {subject.name} ({subject.chapters.length} chapters)
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="col-span-1">
            <h4 className="font-semibold mb-4" style={{ color: currentTheme.text }}>
              Get in Touch
            </h4>
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-sm">
                <Mail className="w-4 h-4 text-gray-500" />
                <span className="text-gray-600">shshakib891gmail.com</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Phone className="w-4 h-4 text-gray-500" />
                <span className="text-gray-600">Whatsapp:MathERROR</span>
              </div>
            </div>
            
            <div className="mt-6">
              <p className="text-xs text-gray-500 mb-2">Available Themes:</p>
              <div className="flex gap-2">
                {mockData.colorThemes.map((theme) => (
                  <div
                    key={theme.id}
                    className="w-4 h-4 rounded-full border border-gray-300"
                    style={{ backgroundColor: theme.primary }}
                    title={theme.name}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-200 mt-8 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-500">
            © 2024 {mockData.siteInfo.name}. Made with passion for HSC students.
          </p>
          <div className="flex items-center gap-1 text-sm text-gray-500 mt-2 md:mt-0">
            <span>Built with</span>
            <Heart className="w-4 h-4 text-red-500 fill-current" />
            <span>for better education</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

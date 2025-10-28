import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import SubjectSidebar from './SubjectSidebar';
import { Button } from './ui/button';
import { Menu, X } from 'lucide-react';

const LayoutWithSidebar = ({ children }) => {
  const location = useLocation();

  // Show sidebar on subject pages and home page
  const showSidebar = location.pathname === '/' || location.pathname.startsWith('/subject/');

  const [sidebarOpen, setSidebarOpen] = useState(showSidebar);
  const [desktopSidebarOpen, setDesktopSidebarOpen] = useState(true);

  if (!showSidebar) {
    return children;
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile menu button */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
        >
          {sidebarOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
        </Button>
      </div>

      {/* Desktop toggle button */}
      <div className="fixed top-4 left-4 z-50">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setDesktopSidebarOpen(!desktopSidebarOpen)}
          className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
        >
          {desktopSidebarOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
        </Button>
      </div>

      {/* Sidebar */}
      <SubjectSidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        desktopOpen={desktopSidebarOpen}
      />

      {/* Main content */}
      <div className={`${desktopSidebarOpen ? 'lg:ml-48' : 'lg:ml-0'} transition-all duration-300`}>
        {children}
      </div>
    </div>
  );
};

export default LayoutWithSidebar;
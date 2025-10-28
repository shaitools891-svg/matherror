import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import SubjectSidebar from './SubjectSidebar';
import { Button } from './ui/button';
import { Menu, X } from 'lucide-react';

const LayoutWithSidebar = ({ children }) => {
  const location = useLocation();

  // Show sidebar on subject pages and home page
  const showSidebar = location.pathname === '/' || location.pathname.startsWith('/subject/');

  console.log('LayoutWithSidebar: location.pathname =', location.pathname);
  console.log('LayoutWithSidebar: showSidebar =', showSidebar);

  const [sidebarOpen, setSidebarOpen] = useState(showSidebar);
  const [desktopSidebarOpen, setDesktopSidebarOpen] = useState(true);

  if (!showSidebar) {
    console.log('LayoutWithSidebar: showSidebar is false, returning children without layout');
    return children;
  }

  console.log('LayoutWithSidebar: showSidebar is true, rendering layout with buttons');

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile menu button */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        {console.log('LayoutWithSidebar: Rendering mobile toggle button')}
        <Button
          variant="outline"
          size="sm"
          onClick={() => { console.log('Mobile toggle button clicked'); setSidebarOpen(!sidebarOpen); }}
          onTouchStart={(e) => { console.log('Touch start on mobile button'); }}
          onTouchEnd={(e) => { console.log('Touch end on mobile button'); }}
          className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
          style={{ touchAction: 'manipulation', userSelect: 'none' }}
        >
          {sidebarOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
        </Button>
      </div>

      {/* Desktop toggle button */}
      <div className="hidden lg:block fixed top-4 left-4 z-50">
        {console.log('LayoutWithSidebar: Rendering desktop toggle button')}
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
        onClose={() => { console.log('Sidebar onClose called'); setSidebarOpen(false); }}
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
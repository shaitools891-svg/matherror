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

  if (!showSidebar) {
    console.log('LayoutWithSidebar: showSidebar is false, returning children without layout');
    return children;
  }

  console.log('LayoutWithSidebar: showSidebar is true, rendering layout with buttons');

  return (
    <div className="min-h-screen bg-background">
      {/* Toggle button */}
      <div className="fixed top-4 left-4 z-60">
        {console.log('LayoutWithSidebar: Rendering toggle button')}
        <Button
          variant="outline"
          size="sm"
          onClick={() => { console.log('Toggle button clicked'); setSidebarOpen(!sidebarOpen); }}
          onTouchStart={(e) => { console.log('Touch start on button'); }}
          onTouchEnd={(e) => { console.log('Touch end on button'); }}
          className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
          style={{ touchAction: 'manipulation', userSelect: 'none' }}
        >
          {sidebarOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
        </Button>
      </div>

      {/* Sidebar */}
      <SubjectSidebar
        isOpen={sidebarOpen}
        onClose={() => { console.log('Sidebar onClose called'); setSidebarOpen(false); }}
      />

      {/* Main content */}
      <div className={`${sidebarOpen ? 'lg:ml-48' : 'lg:ml-0'} transition-all duration-300`}>
        {children}
      </div>
    </div>
  );
};

export default LayoutWithSidebar;
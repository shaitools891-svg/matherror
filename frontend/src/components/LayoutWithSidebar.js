import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import SubjectSidebar from './SubjectSidebar';
import { Button } from './ui/button';
import { Menu, X } from 'lucide-react';

const LayoutWithSidebar = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  // Show sidebar on subject pages and home page
  const showSidebar = location.pathname === '/' || location.pathname.startsWith('/subject/');

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
          onClick={() => setSidebarOpen(true)}
          className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
        >
          <Menu className="w-4 h-4" />
        </Button>
      </div>

      {/* Sidebar */}
      <SubjectSidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* Main content */}
      <div className="lg:ml-64">
        {children}
      </div>

      {/* Mobile overlay close button */}
      {sidebarOpen && (
        <div className="lg:hidden fixed top-4 right-4 z-50">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setSidebarOpen(false)}
            className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
      )}
    </div>
  );
};

export default LayoutWithSidebar;
import React, { useState, createContext, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import SubjectSidebar from './SubjectSidebar';
import { Button } from './ui/button';
import { Menu, X } from 'lucide-react';

// Create context for sidebar toggle
export const SidebarContext = createContext();

const LayoutWithSidebar = ({ children }) => {
  const location = useLocation();

  // Show sidebar on subject pages and home page
  const showSidebar = location.pathname === '/' || location.pathname.startsWith('/subject/');

  console.log('LayoutWithSidebar: location.pathname =', location.pathname);
  console.log('LayoutWithSidebar: showSidebar =', showSidebar);

  const [sidebarOpen, setSidebarOpen] = useState(true);

  const handleToggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  if (typeof children === 'function') {
    return children({ onToggleSidebar: handleToggleSidebar });
  }

  if (!showSidebar) {
    console.log('LayoutWithSidebar: showSidebar is false, returning children without layout');
    return children;
  }

  console.log('LayoutWithSidebar: showSidebar is true, rendering layout with buttons');

  return (
    <SidebarContext.Provider value={{ sidebarOpen, setSidebarOpen, handleToggleSidebar }}>
      <div className="min-h-screen bg-background">

        {/* Sidebar */}
        <SubjectSidebar
          isOpen={sidebarOpen}
          onClose={() => { console.log('Sidebar onClose called'); setSidebarOpen(false); }}
          onToggle={() => { console.log('Toggle button clicked'); setSidebarOpen(!sidebarOpen); }}
        />

        {/* Main content */}
        <div className={`${sidebarOpen ? 'lg:ml-48' : 'lg:ml-0'} transition-all duration-300`}>
          {children}
        </div>

        {/* Floating Action Button for Sidebar Toggle */}
        <div className="fixed top-24 left-4 z-50">
          <button
            onClick={() => { console.log('Global FAB clicked, handleToggleSidebar:', handleToggleSidebar); if (handleToggleSidebar) handleToggleSidebar(); }}
            className="w-12 h-12 rounded-full bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 border-0 flex items-center justify-center"
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>
      </div>
    </SidebarContext.Provider>
  );
};

export default LayoutWithSidebar;

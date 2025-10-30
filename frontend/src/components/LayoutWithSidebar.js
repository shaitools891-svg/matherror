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

  if (!showSidebar) {
    console.log('LayoutWithSidebar: showSidebar is false, returning children without layout');
    return children({ onToggleSidebar: handleToggleSidebar });
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
          {children({ onToggleSidebar: handleToggleSidebar })}
        </div>

      </div>
    </SidebarContext.Provider>
  );
};

export default LayoutWithSidebar;

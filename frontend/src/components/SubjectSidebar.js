import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { Button } from './ui/button';
import {
  Monitor,
  Atom,
  FlaskConical,
  Calculator,
  BookOpen,
  Languages,
  Dna,
  FileText,
  X,
  Menu
} from 'lucide-react';
import { studyMaterialsData } from '../data/studyMaterials';

const SubjectSidebar = ({ isOpen, onClose, onToggle }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeSubjectIndex, setActiveSubjectIndex] = useState(0);

  // Icon mapping
  const getIcon = (iconName, className = "w-4 h-4") => {
    const icons = {
      Monitor,
      Atom,
      FlaskConical,
      Calculator,
      BookOpen,
      Languages,
      Dna
    };
    const IconComponent = icons[iconName];
    return IconComponent ? React.createElement(IconComponent, { className }) : React.createElement(FileText, { className });
  };

  // Color mapping for subjects
  const getSubjectColor = (subjectId) => {
    const colors = {
      1: 'blue',    // Physics
      2: 'purple',  // Chemistry
      3: 'green',   // Mathematics
      4: 'orange',  // ICT
      5: 'red',     // Bangla
      6: 'teal',    // English
      7: 'emerald'  // Biology
    };
    return colors[subjectId] || 'gray';
  };

  // Get icon background color
  const getIconBgColor = (subjectId) => {
    if (!subjectId) return 'transparent'; // For HOME
    const { theme } = useTheme();
    const colorMap = {
      1: theme === 'dark' ? 'bg-blue-500/20' : 'bg-blue-500',    // Physics
      2: theme === 'dark' ? 'bg-purple-500/20' : 'bg-purple-500',  // Chemistry
      3: theme === 'dark' ? 'bg-green-500/20' : 'bg-green-500',   // Mathematics
      4: theme === 'dark' ? 'bg-orange-500/20' : 'bg-orange-500',  // ICT
      5: theme === 'dark' ? 'bg-red-500/20' : 'bg-red-500',     // Bangla
      6: theme === 'dark' ? 'bg-teal-500/20' : 'bg-teal-500',    // English
      7: theme === 'dark' ? 'bg-emerald-500/20' : 'bg-emerald-500'  // Biology
    };
    return colorMap[subjectId] || (theme === 'dark' ? 'bg-gray-500/20' : 'bg-gray-500');
  };

  // Get background color for active state
  const getActiveBgColor = (subjectColor) => {
    const colorMap = {
      blue: '#2563eb',
      purple: '#9333ea',
      green: '#16a34a',
      orange: '#ea580c',
      red: '#dc2626',
      teal: '#0d9488',
      emerald: '#059669',
      gray: '#6b7280'
    };
    return colorMap[subjectColor] || colorMap.gray;
  };

  // Get hover color for active state
  const getActiveHoverColor = (subjectColor) => {
    const colorMap = {
      blue: '#1d4ed8',
      purple: '#7c3aed',
      green: '#15803d',
      orange: '#c2410c',
      red: '#b91c1c',
      teal: '#0f766e',
      emerald: '#047857',
      gray: '#4b5563'
    };
    return colorMap[subjectColor] || colorMap.gray;
  };

  // Get active color for GooeyNav
  const getActiveColor = (index) => {
    if (index === 0) {
      return '#3b82f6'; // Blue for All Subjects
    }
    const subject = studyMaterialsData.subjects[index - 1];
    if (subject) {
      const subjectColor = getSubjectColor(subject.id);
      return getActiveBgColor(subjectColor);
    }
    return '#6b7280'; // Gray fallback
  };

  const handleSubjectClick = (subjectId) => {
    navigate(`/subject/${subjectId}`);
    if (onClose) onClose();
  };

  const handleHomeClick = () => {
    navigate('/');
    if (onClose) onClose();
  };

  const isActive = (subjectId) => {
    return location.pathname === `/subject/${subjectId}`;
  };

  const isHomeActive = () => {
    return location.pathname === '/';
  };

  // Prepare nav items for GooeyNav
  const navItems = [
    { label: 'HOME', href: '/', icon: 'FileText', subjectId: null },
    ...studyMaterialsData.subjects.map(subject => ({
      label: subject.name,
      href: `/subject/${subject.id}`,
      icon: subject.icon,
      subjectId: subject.id
    }))
  ];

  // Handle navigation click
  const handleNavClick = (subjectId) => {
    if (subjectId === null) {
      navigate('/');
    } else {
      navigate(`/subject/${subjectId}`);
    }
    if (onClose) onClose();
  };

  // Update active index based on current location
  useEffect(() => {
    if (location.pathname === '/') {
      setActiveSubjectIndex(0);
    } else {
      const subjectId = parseInt(location.pathname.split('/').pop());
      const subjectIndex = studyMaterialsData.subjects.findIndex(s => s.id === subjectId);
      if (subjectIndex !== -1) {
        setActiveSubjectIndex(subjectIndex + 1);
      }
    }
  }, [location.pathname]);

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => { console.log('Overlay clicked'); onClose(); }}
          onTouchStart={(e) => { console.log('Overlay touch start'); }}
          onTouchEnd={(e) => { console.log('Overlay touch end'); }}
          style={{ touchAction: 'manipulation', userSelect: 'none' }}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed inset-y-0 left-0 z-50 w-48 bg-white/95 dark:bg-gray-800/95 backdrop-blur-xl border-r border-gray-200/50 dark:border-gray-700/50
        transform transition-transform duration-500 ease-out shadow-2xl
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `} style={{ touchAction: 'manipulation' }}>
        <div className="flex flex-col h-full">
          {/* Header with toggle button */}
          <div className="p-4 border-b border-gray-200/50 dark:border-gray-700/50 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm relative">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                  Study Materials
                </h2>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={onToggle}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full w-8 h-8 p-0"
              >
                {isOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
              </Button>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto p-4">
            {/* Subject Navigation */}
            <div className="mb-6">
              <div className="space-y-2">
                {/* Home */}
                <button
                  onClick={() => handleNavClick(null)}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-all duration-200 ${
                    isHomeActive()
                      ? 'bg-blue-500 text-white shadow-md'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                    isHomeActive()
                      ? 'bg-white/20'
                      : 'bg-gray-100 dark:bg-gray-700'
                  }`}>
                    {getIcon('FileText', 'w-4 h-4')}
                  </div>
                  <span className="font-medium">HOME</span>
                </button>

                {/* Subjects */}
                {studyMaterialsData.subjects.map((subject) => (
                  <button
                    key={subject.id}
                    onClick={() => handleNavClick(subject.id)}
                    className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-all duration-200 ${
                      isActive(subject.id)
                        ? `bg-${getSubjectColor(subject.id)}-500 text-white shadow-md`
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                    }`}
                  >
                    <div className={`w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 ${
                      isActive(subject.id)
                        ? 'bg-white/20'
                        : getIconBgColor(subject.id)
                    }`} style={{ padding: '1px' }}>
                      {getIcon(subject.icon, 'w-4 h-4')}
                    </div>
                    <span className="font-medium truncate text-base" style={{ fontFamily: 'AbuJMAkkas, sans-serif' }}>{subject.name}</span>
                  </button>
                ))}
              </div>
            </div>
          </nav>

        </div>
      </div>
    </>
  );
};

export default SubjectSidebar;
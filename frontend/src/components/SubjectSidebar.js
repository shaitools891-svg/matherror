import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { Button } from './ui/button';
import GooeyNav from './GooeyNav';
import {
  Monitor,
  Atom,
  FlaskConical,
  Calculator,
  BookOpen,
  Languages,
  Dna,
  FileText
} from 'lucide-react';
import { studyMaterialsData } from '../data/studyMaterials';

const SubjectSidebar = ({ isOpen, onClose, desktopOpen = true }) => {
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
    { label: 'All Subjects', href: '/', icon: 'FileText' },
    ...studyMaterialsData.subjects.map(subject => ({
      label: subject.name,
      href: `/subject/${subject.id}`,
      icon: subject.icon
    }))
  ];

  // Handle GooeyNav click
  const handleGooeyNavClick = (item, index) => {
    if (index === 0) {
      navigate('/');
    } else {
      const subjectId = studyMaterialsData.subjects[index - 1].id;
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
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        ${desktopOpen ? 'lg:translate-x-0' : 'lg:-translate-x-full'}
      `}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-4 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
              Study Materials
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              HSC 2026 Preparation
            </p>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto p-4">
            {/* GooeyNav for Subject Navigation */}
            <div className="mb-6">
              <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-3">
                <GooeyNav
                  items={navItems}
                  initialActiveIndex={activeSubjectIndex}
                  onItemClick={handleGooeyNavClick}
                  getIcon={getIcon}
                  getActiveColor={getActiveColor}
                  particleCount={10}
                  particleDistances={[60, 5]}
                  particleR={70}
                  animationTime={400}
                  timeVariance={150}
                  colors={[1, 2, 3, 4]}
                />
              </div>
            </div>

            {/* Traditional Navigation as Backup */}
            <div className="space-y-2">
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">
                Quick Access
              </h3>

              {/* Home Link */}
              <Button
                variant={isHomeActive() ? "default" : "ghost"}
                className={`w-full justify-start mb-4 ${
                  isHomeActive()
                    ? 'bg-blue-600 hover:bg-blue-700 text-white'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
                onClick={handleHomeClick}
              >
                <FileText className="w-4 h-4 mr-3" />
                All Subjects
              </Button>

              {/* Subjects */}
              {studyMaterialsData.subjects.map((subject) => {
                const subjectColor = getSubjectColor(subject.id);
                const active = isActive(subject.id);

                return (
                  <Button
                    key={subject.id}
                    variant={active ? "default" : "ghost"}
                    className={`w-full justify-start ${
                      active
                        ? 'text-white'
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                    }`}
                    style={active ? {
                      backgroundColor: getActiveBgColor(subjectColor),
                      borderColor: getActiveBgColor(subjectColor)
                    } : {}}
                    onClick={() => handleSubjectClick(subject.id)}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-6 h-6 rounded flex items-center justify-center ${
                          active ? 'bg-white/20' : `bg-${subjectColor}-100 dark:bg-${subjectColor}-900/30`
                        }`}
                      >
                        {getIcon(subject.icon, `w-4 h-4 ${
                          active ? 'text-white' : `text-${subjectColor}-600 dark:text-${subjectColor}-400`
                        }`)}
                      </div>
                      <span className="truncate">{subject.name}</span>
                    </div>
                  </Button>
                );
              })}
            </div>
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-gray-200 dark:border-gray-700">
            <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
              Have resources to add?<br />
              Contact Shakib
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default SubjectSidebar;
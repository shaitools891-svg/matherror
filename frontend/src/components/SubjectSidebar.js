import React from 'react';
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
  FileText
} from 'lucide-react';
import { studyMaterialsData } from '../data/studyMaterials';

const SubjectSidebar = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const location = useLocation();

  // Icon mapping
  const getIcon = (iconName) => {
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
    return IconComponent ? <IconComponent className="w-5 h-5" /> : <FileText className="w-5 h-5" />;
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
        fixed lg:static inset-y-0 left-0 z-50 w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
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
            <div className="space-y-2">
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">
                Subjects
              </h3>
              {studyMaterialsData.subjects.map((subject) => {
                const subjectColor = getSubjectColor(subject.id);
                const active = isActive(subject.id);

                return (
                  <Button
                    key={subject.id}
                    variant={active ? "default" : "ghost"}
                    className={`w-full justify-start ${
                      active
                        ? `bg-${subjectColor}-600 hover:bg-${subjectColor}-700 text-white`
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                    }`}
                    onClick={() => handleSubjectClick(subject.id)}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-6 h-6 rounded flex items-center justify-center ${
                          active ? 'bg-white/20' : `bg-${subjectColor}-100 dark:bg-${subjectColor}-900/30`
                        }`}
                      >
                        {React.createElement(getIcon(subject.icon), {
                          className: `w-4 h-4 ${
                            active ? 'text-white' : `text-${subjectColor}-600 dark:text-${subjectColor}-400`
                          }`
                        })}
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
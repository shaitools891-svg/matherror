import React, { useState, useEffect, useRef } from 'react';
import { useTheme } from '../context/ThemeContext';
import DarkModeToggle from './DarkModeToggle';
import { Menu, X } from 'lucide-react';


const Header = ({ onToggleSidebar }) => {
    const { currentTheme } = useTheme();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [activeSection, setActiveSection] = useState(0);

    const navItems = [
        { label: 'Home', href: '#home' },
        { label: 'Materials', href: '#materials' },
        { label: 'About', href: '#about' },
        { label: 'Contact', href: '#contact' }
    ];

    const scrollToSection = (item, index) => {
        const sectionId = item.href.replace('#', '');
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
            setIsMenuOpen(false);
            setActiveSection(index);
        }
    };

    const handleGooeyNavClick = (item, index) => {
        scrollToSection(item, index);
    };

    useEffect(() => {
        const handleScroll = () => {
            const sections = navItems.map(item => item.href.replace('#', ''));
            const scrollPos = window.scrollY + 100;

            for (let i = sections.length - 1; i >= 0; i--) {
                const element = document.getElementById(sections[i]);
                if (element && element.offsetTop <= scrollPos) {
                    setActiveSection(i);
                    break;
                }
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <header className={`
            fixed top-0 left-0 right-0 z-50
            bg-white/90 dark:bg-gray-900/90 glass:bg-white/20
            backdrop-blur-md border-b border-gray-200 dark:border-gray-700 glass:border-white/30
            transition-all duration-300 ease-in-out
            animate-slide-down
        `}>
            <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Sidebar Toggle Button at very left */}
                    <button
                        onClick={onToggleSidebar}
                        className={`
                            relative inline-flex items-center justify-center z-[100]
                            w-8 h-8 rounded-full transition-all duration-300 ease-out
                            focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
                            hover:scale-110 active:scale-95 transform-gpu
                            shadow-lg hover:shadow-xl border border-red-500
                            bg-yellow-400 text-black font-bold
                            animate-fade-in mr-4
                        `}
                        style={{ animationDelay: '0.1s' }}
                        aria-label="Toggle sidebar"
                    >
                        ☰
                    </button>

                    {/* Logo */}
                    <div className="flex-shrink-0 animate-fade-in">
                        <span
                            className="text-2xl font-bold transition-all duration-300 hover:scale-105 cursor-pointer"
                            style={{
                                color: currentTheme.primary,
                                fontFamily: "'LCDSolid', monospace",
                                fontWeight: 'normal',
                                letterSpacing: '2px'
                            }}
                        >
                            Math ERROR
                        </span>
                    </div>

                    {/* Desktop Navigation - Traditional */}
                    <div className="hidden md:block">
                        <nav className="flex space-x-8">
                            {navItems.map((item, index) => (
                                <button
                                    key={item.label}
                                    onClick={() => scrollToSection(item, index)}
                                    className={`
                                        text-sm font-medium transition-all duration-300 hover:scale-105
                                        ${activeSection === index
                                            ? 'text-blue-600 dark:text-blue-400'
                                            : 'text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400'
                                        }
                                    `}
                                >
                                    {item.label}
                                </button>
                            ))}
                        </nav>
                    </div>

                    {/* Dark Mode Toggle & Mobile Menu Button */}
                    <div className="flex items-center space-x-4">
                        <div className="animate-fade-in" style={{ animationDelay: '0.4s' }}>
                            <DarkModeToggle />
                        </div>

                        {/* Mobile menu button */}
                        <div className="md:hidden">
                            <button
                                onClick={() => setIsMenuOpen(!isMenuOpen)}
                                className={`
                                    p-2 rounded-md text-gray-700 dark:text-gray-300 glass:text-gray-800 z-[100]
                                    hover:bg-gray-100 dark:hover:bg-gray-800 glass:hover:bg-white/20
                                    transition-all duration-300 hover:scale-105
                                    animate-fade-in bg-yellow-400
                                `}
                                style={{ animationDelay: '0.5s' }}
                            >
                                {isMenuOpen ? (
                                    <X className="w-6 h-6 animate-scale-in" />
                                ) : (
                                    <Menu className="w-6 h-6 animate-scale-in" />
                                )}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile Navigation Menu */}
              {isMenuOpen && (
                    <div className="md:hidden animate-slide-down">
                        <div className="px-2 pt-2 pb-3 space-y-1 bg-white/70 dark:bg-gray-900/70 glass:bg-white/30 backdrop-blur-sm rounded-lg border border-gray-200/30 dark:border-gray-700/30 glass:border-white/30 mt-2 shadow-lg">
                            {navItems.map((item, index) => (
                                <button
                                    key={item.label}
                                    onClick={() => scrollToSection(item, index)}
                                    className={`
                                        block w-full text-left px-3 py-3 rounded-md text-base font-medium
                                        text-gray-700 dark:text-gray-300 glass:text-gray-800
                                        hover:text-blue-600 dark:hover:text-blue-400 glass:hover:text-blue-500
                                        hover:bg-gray-100 dark:hover:bg-gray-800 glass:hover:bg-white/20
                                        transition-all duration-300
                                        animate-slide-up
                                        ${activeSection === index ? 'bg-blue-50 dark:bg-blue-900/30 glass:bg-white/30 text-blue-600 dark:text-blue-400 glass:text-blue-500' : ''}
                                    `}
                                    style={{ animationDelay: `${index * 0.1}s` }}
                                >
                                    {item.label}
                                </button>
                            ))}
                        </div>
                    </div>
                )}
            </nav>
        </header>
    );
};

export default Header;

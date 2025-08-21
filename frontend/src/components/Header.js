import React, { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import DarkModeToggle from './DarkModeToggle';
import GooeyNav from './reactbits/Components/GooeyNav/GooeyNav'; // Updated import path
import { Menu, X } from 'lucide-react';

const Header = () => {
    const { currentTheme } = useTheme();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [activeSection, setActiveSection] = useState(0); // Changed to index for ReactBits component

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
            setActiveSection(index); // Update to use index
        }
    };

    // Track active section based on scroll position
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
        <>
            {/* CSS Variables for GooeyNav particles */}
            <style jsx>{`
                :root {
                    --color-1: ${currentTheme.primary || '#3b82f6'};
                    --color-2: ${currentTheme.secondary || '#8b5cf6'};
                    --color-3: #ffffff;
                    --color-4: #f0f9ff;
                }
                .dark {
                    --color-1: #60a5fa;
                    --color-2: #a78bfa;
                    --color-3: #f8fafc;
                    --color-4: #dbeafe;
                }
            `}</style>

            <header className={`
                fixed top-0 left-0 right-0 z-50 
                bg-white/90 dark:bg-gray-900/90 
                backdrop-blur-md border-b border-gray-200 dark:border-gray-700
                transition-all duration-300 ease-in-out
                animate-slide-down
            `}>
                <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        {/* Logo */}
                        <div className="flex-shrink-0 animate-fade-in">
                            <h1 
                                className="text-2xl font-bold transition-all duration-300 hover:scale-105"
                                style={{ color: currentTheme.primary }}
                            >
                                MathError
                            </h1>
                        </div>

                        {/* Desktop Navigation - Official ReactBits GooeyNav */}
                        <div className="hidden md:block">
                            <div 
                                className="rounded-2xl p-1 shadow-lg backdrop-blur-sm"
                                style={{
                                    background: `linear-gradient(45deg, ${currentTheme.primary || '#3b82f6'}, ${currentTheme.secondary || '#8b5cf6'})`,
                                }}
                            >
                                <GooeyNav 
                                    items={navItems}
                                    initialActiveIndex={activeSection}
                                    animationTime={400}
                                    particleCount={12}
                                    colors={[1, 2, 3, 4]}
                                />
                            </div>
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
                                        p-2 rounded-md text-gray-700 dark:text-gray-300
                                        hover:bg-gray-100 dark:hover:bg-gray-800
                                        transition-all duration-300 hover:scale-105
                                        animate-fade-in
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

                    {/* Mobile Navigation Menu - Keep original style */}
                    {isMenuOpen && (
                        <div className="md:hidden animate-slide-down">
                            <div className="px-2 pt-2 pb-3 space-y-1 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 mt-2">
                                {navItems.map((item, index) => (
                                    <button
                                        key={item.label}
                                        onClick={() => scrollToSection(item, index)}
                                        className={`
                                            block w-full text-left px-3 py-2 rounded-md text-base font-medium
                                            text-gray-700 dark:text-gray-300
                                            hover:text-blue-600 dark:hover:text-blue-400
                                            hover:bg-gray-100 dark:hover:bg-gray-800
                                            transition-all duration-300
                                            animate-slide-up
                                            ${activeSection === index ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400' : ''}
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
        </>
    );
};

export default Header;

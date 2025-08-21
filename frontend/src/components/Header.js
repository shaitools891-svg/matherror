import React, { useState, useEffect, useRef } from 'react';
import { useTheme } from '../context/ThemeContext';
import DarkModeToggle from './DarkModeToggle';
import GooeyNav from './reactbits/Components/GooeyNav/GooeyNav';
import { Menu, X } from 'lucide-react';

const Header = () => {
    const { currentTheme } = useTheme();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [activeSection, setActiveSection] = useState(0);
    const gooeyNavRef = useRef(null);

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
            
            // Update GooeyNav active state if it exists
            if (gooeyNavRef.current) {
                const navItems = gooeyNavRef.current.querySelectorAll('li');
                navItems.forEach((li, i) => {
                    if (i === index) {
                        li.classList.add('active');
                    } else {
                        li.classList.remove('active');
                    }
                });
            }
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

    // Initialize GooeyNav after component mounts
    useEffect(() => {
        if (gooeyNavRef.current) {
            // Add click handlers to GooeyNav items
            const links = gooeyNavRef.current.querySelectorAll('a');
            links.forEach((link, index) => {
                link.addEventListener('click', (e) => {
                    e.preventDefault();
                    scrollToSection(navItems[index], index);
                });
            });

            // Set initial active state
            const navItemsElements = gooeyNavRef.current.querySelectorAll('li');
            if (navItemsElements.length > activeSection) {
                navItemsElements[activeSection].classList.add('active');
            }
        }
    }, [activeSection]);

    return (
        <>
            <style jsx global>{`
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

                /* Enhanced gooey nav container */
                .gooey-nav-wrapper {
                    background: linear-gradient(135deg, ${currentTheme.primary || '#3b82f6'} 0%, ${currentTheme.secondary || '#8b5cf6'} 100%);
                    border-radius: 24px;
                    padding: 6px;
                    box-shadow: 
                        0 8px 32px rgba(0, 0, 0, 0.12),
                        0 2px 8px rgba(0, 0, 0, 0.08),
                        inset 0 1px 0 rgba(255, 255, 255, 0.2);
                    backdrop-filter: blur(12px);
                    border: 1px solid rgba(255, 255, 255, 0.15);
                    position: relative;
                    overflow: hidden;
                }

                /* Remove all white background elements */
                .gooey-nav-wrapper .effect.filter::before {
                    background: transparent !important;
                }
                
                .gooey-nav-wrapper li::after {
                    display: none !important;
                }
                
                .gooey-nav-wrapper .effect.filter::after {
                    display: none !important;
                }
                
                .gooey-nav-wrapper li.active::after {
                    display: none !important;
                }

                /* Better text styling */
                .gooey-nav-wrapper li a {
                    color: rgba(0, 0, 0, 0.8) !important;
                    font-weight: 500;
                    text-shadow: none;
                    transition: all 0.3s ease;
                    position: relative;
                    z-index: 2;
                }

                .dark .gooey-nav-wrapper li a {
                    color: rgba(255, 255, 255, 0.9) !important;
                }

                .gooey-nav-wrapper li.active a,
                .gooey-nav-wrapper li a:hover {
                    color: white !important;
                    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
                }

                /* Keep the particle effects working */
                .gooey-nav-wrapper .effect.filter {
                    filter: blur(8px) contrast(120) blur(0);
                    mix-blend-mode: screen;
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

                        {/* Desktop Navigation - Enhanced ReactBits GooeyNav */}
                        <div className="hidden md:block">
                            <div className="gooey-nav-wrapper" ref={gooeyNavRef}>
                                <GooeyNav 
                                    items={navItems}
                                    initialActiveIndex={activeSection}
                                    animationTime={500}
                                    particleCount={15}
                                    particleDistances={[120, 15]}
                                    particleR={150}
                                    timeVariance={400}
                                    colors={[1, 2, 3, 4, 1, 2]}
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

                    {/* Mobile Navigation Menu */}
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

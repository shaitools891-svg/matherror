import React, { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import DarkModeToggle from './DarkModeToggle';
import { Menu, X } from 'lucide-react';
import GlitchText from './reactbits/TextAnimations/GlitchText/GlitchText';
import ElectricBorder from './reactbits/Animations/ElectricBorder/ElectricBorder';

const Header = () => {
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
            bg-white/90 dark:bg-gray-900/90 
            backdrop-blur-md border-b border-gray-200 dark:border-gray-700
            transition-all duration-300 ease-in-out
            animate-slide-down
        `}>
            <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <div className="flex-shrink-0 animate-fade-in">
                        <GlitchText
                            className="text-2xl font-bold transition-all duration-300 hover:scale-105"
                            style={{ color: currentTheme.primary }}
                            glitchInterval={2000}
                            hoverGlitch
                        >
                            MathError
                        </GlitchText>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:block">
                        <ElectricBorder
                            borderWidth={2}
                            animationSpeed={1.5}
                            color={currentTheme.primary}
                            borderRadius="24px"
                        >
                            <div className="flex items-center space-x-8 px-4 py-2">
                                {navItems.map((item, index) => (
                                    <a
                                        key={item.label}
                                        href={item.href}
                                        onClick={(e) => {
                                            e.preventDefault();
                                            scrollToSection(item, index)
                                        }}
                                        className={`
                                            text-lg font-medium
                                            text-gray-700 dark:text-gray-300
                                            hover:text-blue-600 dark:hover:text-blue-400
                                            transition-all duration-300
                                            ${activeSection === index ? 'text-blue-600 dark:text-blue-400' : ''}
                                        `}
                                    >
                                        {item.label}
                                    </a>
                                ))}
                            </div>
                        </ElectricBorder>
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
                        <div className="px-2 pt-2 pb-3 space-y-1 bg-white/70 dark:bg-gray-900/70 backdrop-blur-sm rounded-lg border border-gray-200/30 dark:border-gray-700/30 mt-2 shadow-none">
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
    );
};

export default Header;

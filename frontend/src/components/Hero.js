import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { Button } from './ui/button';
import { ArrowRight, BookOpen, Users, Target } from 'lucide-react';
import ShinyText from './reactbits/TextAnimations/ShinyText';

const Hero = () => {
    const { currentTheme } = useTheme();

    const scrollToMaterials = () => {
        const element = document.getElementById('materials');
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <section 
            id="home" 
            className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-16 bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 transition-colors duration-500"
        >
            <div className="max-w-7xl mx-auto">
                <div className="text-center">
                    {/* Main heading with animations */}
                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 animate-fade-in">
                        <span 
                            className="bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent animate-glow"
                        >
                            Study Materials
                        </span>
                        <br />
                        {/* Apply ShinyText here */}
                        <ShinyText 
                            text="Made Simple" 
                            // You can add props like speed, className, etc. here if needed
                            // For example: speed={3} className="inline-block"
                            className="text-gray-800 dark:text-gray-100 transition-colors duration-300"
                        />
                    </h1>

                    {/* Subtitle */}
                    <p 
                        className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8 animate-slide-up transition-colors duration-300"
                        style={{ animationDelay: '0.2s' }}
                    >
                        Comprehensive study materials, video lectures, and practice resources 
                        for HSC 2026 students.
                    </p>

                    {/* CTA Buttons */}
                    <div 
                        className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12 animate-slide-up"
                        style={{ animationDelay: '0.4s' }}
                    >
                        <Button
                            onClick={scrollToMaterials}
                            className={`
                                group px-8 py-3 text-lg font-semibold rounded-full
                                bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700
                                dark:from-blue-500 dark:to-purple-500 dark:hover:from-blue-600 dark:hover:to-purple-600
                                text-white shadow-lg hover:shadow-xl
                                transform hover:scale-105 hover:-translate-y-1
                                transition-all duration-300 ease-out
                                animate-bounce-subtle
                            `}
                        >
                            Get Started
                            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                        </Button>
                        
                        <Button
                            variant="outline"
                            className={`
                                px-8 py-3 text-lg font-semibold rounded-full
                                border-2 border-gray-300 dark:border-gray-600
                                text-gray-700 dark:text-gray-300
                                hover:bg-gray-100 dark:hover:bg-gray-800
                                hover:border-gray-400 dark:hover:border-gray-500
                                transform hover:scale-105 hover:-translate-y-1
                                transition-all duration-300 ease-out
                                backdrop-blur-sm
                            `}
                        >
                            Learn More
                        </Button>
                    </div>

                    {/* Feature cards */}
                    <div 
                        className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto animate-fade-in"
                        style={{ animationDelay: '0.6s' }}
                    >
                        {[
                            {
                                icon: BookOpen,
                                title: 'Quality Notes',
                                description: 'Comprehensive study notes covering all HSC topics'
                            },
                            {
                                icon: Users,
                                title: 'Expert Guidance',
                                description: 'Learn from experienced teachers and tutors'
                            },
                            {
                                icon: Target,
                                title: 'Focused Learning',
                                description: 'Targeted content for HSC 2026 examination'
                            }
                        ].map((feature, index) => (
                            <div
                                key={feature.title}
                                className={`
                                    group p-6 rounded-2xl 
                                    bg-white/70 dark:bg-gray-800/70 
                                    backdrop-blur-sm border border-gray-200 dark:border-gray-700
                                    hover:bg-white/90 dark:hover:bg-gray-800/90
                                    hover:shadow-lg hover:shadow-blue-500/10 dark:hover:shadow-blue-400/10
                                    transform hover:scale-105 hover:-translate-y-2
                                    transition-all duration-300 ease-out
                                    animate-slide-up
                                `}
                                style={{ animationDelay: `${0.8 + index * 0.1}s` }}
                            >
                                <div className={`
                                    w-12 h-12 rounded-full mx-auto mb-4
                                    bg-gradient-to-r from-blue-500 to-purple-500
                                    flex items-center justify-center
                                    group-hover:scale-110 transition-transform duration-300
                                `}>
                                    <feature.icon className="w-6 h-6 text-white" />
                                </div>
                                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-2 transition-colors duration-300">
                                    {feature.title}
                                </h3>
                                <p className="text-gray-600 dark:text-gray-400 transition-colors duration-300">
                                    {feature.description}
                                </p>
                            </div>
                        ))}
                    </div>

                    {/* Floating elements for visual appeal */}
                    <div className="absolute inset-0 overflow-hidden pointer-events-none">
                        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-blue-300/20 dark:bg-blue-500/20 rounded-full blur-xl animate-pulse"></div>
                        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-purple-300/20 dark:bg-purple-500/20 rounded-full blur-xl animate-pulse" style={{ animationDelay: '2s' }}></div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;

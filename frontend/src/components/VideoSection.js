import React from 'react';
import { useTheme } from '../context/ThemeContext';
import VideoPlayer from './VideoPlayer';

const VideoSection = () => {
  const { currentThemeId } = useTheme();

  return (
    <section
      id="videos"
      className={`
        py-20 px-4 sm:px-6 lg:px-8
        bg-background dark:bg-gray-900 glass:bg-transparent
        transition-colors duration-300
      `}
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className={`
            text-4xl font-bold mb-4
            text-gray-900 dark:text-white glass:text-gray-800
            transition-colors duration-300
          `}>
            Video Lectures
          </h2>
          <p className={`
            text-xl text-gray-600 dark:text-gray-300 glass:text-gray-600
            max-w-3xl mx-auto transition-colors duration-300
          `}>
            Access recorded lectures and educational content to enhance your learning experience.
          </p>
        </div>

        {/* Video Player Container - Hidden since videos are now accessed through MaterialsSection */}
        {/* <div className="flex justify-center">
          <VideoPlayer
            videoUrl="https://archive.org/details/utkorsho-hsc-24-fpb-2024-hsc-2024-fpc-ict-03-room-1-start-01-20"
            title="ICT Chapter 3 Lecture 3"
          />
        </div> */}

        {/* Additional Info */}
        <div className={`
          mt-12 text-center max-w-2xl mx-auto
          p-6 rounded-lg
          bg-white/50 dark:bg-gray-800/50 glass:bg-white/20
          backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 glass:border-white/30
          transition-all duration-300
        `}>
          <h3 className={`
            text-xl font-semibold mb-3
            text-gray-900 dark:text-white glass:text-gray-800
          `}>
            About Video Lectures
          </h3>
          <p className={`
            text-gray-600 dark:text-gray-300 glass:text-gray-600
            leading-relaxed
          `}>
            All video lectures are now available in the Study Materials section above.
            Click on any video link to watch lectures directly on our website.
          </p>
          <div className="mt-4 flex flex-wrap justify-center gap-2">
            <span className={`
              px-3 py-1 rounded-full text-sm font-medium
              bg-blue-100 dark:bg-blue-900/30 glass:bg-blue-100/50
              text-blue-800 dark:text-blue-300 glass:text-blue-700
            `}>
              HSC 2024
            </span>
            <span className={`
              px-3 py-1 rounded-full text-sm font-medium
              bg-green-100 dark:bg-green-900/30 glass:bg-green-100/50
              text-green-800 dark:text-green-300 glass:text-green-700
            `}>
              All Subjects
            </span>
            <span className={`
              px-3 py-1 rounded-full text-sm font-medium
              bg-purple-100 dark:bg-purple-900/30 glass:bg-purple-100/50
              text-purple-800 dark:text-purple-300 glass:text-purple-700
            `}>
              YouTube Integration
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VideoSection;
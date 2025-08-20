import React, { useState } from 'react';

const AboutSection = () => {
  const [imageError, setImageError] = useState(false);
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-800 dark:to-gray-900 py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
      <div className="max-w-6xl mx-auto">
        {/* Header without dark mode toggle */}
        <div className="flex justify-center items-center mb-10">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Matherror
          </h1>
        </div>

        <section className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden transition-colors duration-300">
          <div className="md:flex">
            {/* Profile Section */}
            <div className="md:w-2/5 bg-gradient-to-br from-blue-500 to-purple-600 p-8 flex flex-col justify-center items-center text-white">
              <div className="w-32 h-32 rounded-full bg-white flex items-center justify-center mb-6 shadow-lg overflow-hidden">
                {!imageError ? (
                  <img 
                    src="https://github.com/shaitools891-svg/matherror/blob/50ed9a9e85078fc8f080c629572e53769fab85bf/frontend/src/assets/profile-picture.jpg" // Replace with your image URL
                    alt="Shakib" 
                    className="w-full h-full object-cover"
                    onError={() => setImageError(true)}
                  />
                ) : (
                  <svg className="w-16 h-16 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                  </svg>
                )}
              </div>
              <h2 className="text-2xl font-bold mb-2">Shakib</h2>
              <p className="text-blue-100 mb-6">CSE Student</p>
              /* Rest of the component remains the same */
              <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 w-full max-w-xs">
                <h3 className="font-semibold mb-3 text-center">Quick Info</h3>
                <div className="space-y-2">
                  <p className="text-sm flex items-center">
                    <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                    </svg>
                    Free PDF Resources
                  </p>
                  <p className="text-sm flex items-center">
                    <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z" clipRule="evenodd" />
                    </svg>
                    Class Links
                  </p>
                  <p className="text-sm flex items-center">
                    <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2 5a2 2 0 012-2h7a2 2 0 012 2v4a2 2 0 01-2 2H9l-3 3v-3H4a2 2 0 01-2-2V5z" />
                      <path d="M15 7v2a4 4 0 01-4 4H9.828l-1.766 1.767c.28.149.599.233.938.233h2l3 3v-3h2a2 2 0 002-2V9a2 2 0 00-2-2h-1z" />
                    </svg>
                    WhatsApp Group
                  </p>
                </div>
              </div>
            </div>
            
            {/* Content Section */}
            <div className="md:w-3/5 p-8">
              <h2 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white">About Matherror</h2>
              
              <div className="space-y-6 mb-8">
                <div className="flex items-start">
                  <div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded-full mr-4 flex-shrink-0">
                    <svg className="w-5 h-5 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300">
                    I am Shakib, a student of Computer Science and Engineering (CSE).
                  </p>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-green-100 dark:bg-green-900/30 p-2 rounded-full mr-4 flex-shrink-0">
                    <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300">
                    The primary purpose behind creating this website is to consolidate all free PDF resources and important class links in one place. Often, these resources are difficult to find or get accidentally deleted.
                  </p>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-purple-100 dark:bg-purple-900/30 p-2 rounded-full mr-4 flex-shrink-0">
                    <svg className="w-5 h-5 text-purple-500" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2 5a2 2 0 012-2h7a2 2 0 012 2v4a2 2 0 01-2 2H9l-3 3v-3H4a2 2 0 01-2-2V5z" />
                      <path d="M15 7v2a4 4 0 01-4 4H9.828l-1.766 1.767c.28.149.599.233.938.233h2l3 3v-3h2a2 2 0 002-2V9a2 2 0 00-2-2h-1z" />
                    </svg>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300">
                    The website is named after one of my WhatsApp groups. There are plans to add more features in the future.
                  </p>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-yellow-100 dark:bg-yellow-900/30 p-2 rounded-full mr-4 flex-shrink-0">
                    <svg className="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300">
                    As it is a static website, I am somewhat uncertain about how far I can take it, but I intend to keep trying, Insha'Allah.
                  </p>
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-xl transition-colors duration-300 hover:shadow-md">
                  <div className="bg-gradient-to-r from-blue-500 to-blue-600 w-12 h-12 rounded-xl flex items-center justify-center text-white mb-4">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">Our Mission</h3>
                  <p className="text-gray-600 dark:text-gray-300">Making quality education accessible to every HSC student.</p>
                </div>
                
                <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-xl transition-colors duration-300 hover:shadow-md">
                  <div className="bg-gradient-to-r from-purple-500 to-pink-500 w-12 h-12 rounded-xl flex items-center justify-center text-white mb-4">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">What We Offer</h3>
                  <p className="text-gray-600 dark:text-gray-300">PDF notes, video lectures for more than 3 subjects.</p>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        <footer className="mt-10 text-center text-gray-600 dark:text-gray-400 text-sm">
          <p>© 2025 Matherror. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
};

export default AboutSection;  

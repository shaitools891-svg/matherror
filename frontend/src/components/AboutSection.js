import React from 'react';

const AboutSection = () => {
  return (
    <section id="about" className="py-20 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-900">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-800 dark:text-white">
          About Matherror
        </h2>
        <div className="text-lg text-gray-600 dark:text-gray-300 mb-8 space-y-4 text-left">
          <p>
            I am Shakib, a student of Computer Science and Engineering (CSE).
          </p>
          <p>
            The primary purpose behind creating this website is to consolidate all free PDF resources 
            and important class links in one place. Often, these resources are difficult to find or 
            get accidentally deleted. It was to solve this problem that I decided to store everything 
            in a central location—this website.
          </p>
          <p>
            The website is named after one of my WhatsApp groups. There are plans to add more features 
            in the future. As it is a static website, I am somewhat uncertain about how far I can take it, 
            but I intend to keep trying, Insha'Allah.
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-8 text-left">
          <div>
            <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">Our Mission</h3>
            <p className="text-gray-600 dark:text-gray-300">Making quality education accessible to every HSC student.</p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">What We Offer</h3>
            <p className="text-gray-600 dark:text-gray-300">PDF notes, video lectures for more than 4 subjects.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;

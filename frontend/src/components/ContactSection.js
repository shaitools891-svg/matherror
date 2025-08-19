import React from 'react';

const ContactSection = () => {
  return (
    <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-800 dark:text-white">
          Contact Us
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
          Have questions or want to contribute study materials? We'd love to hear from you.
        </p>
        <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-md">
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Email: <span className="text-blue-600 dark:text-blue-400">shshakib891@gmail.com</span>
          </p>
          <p className="text-gray-600 dark:text-gray-300">
            Reach out for support, suggestions, or to contribute resources.
          </p>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;

import React, { useState, useEffect, useCallback, memo } from 'react';

const Footer = memo(() => {
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Memoize the scroll handler for better performance
  const checkScrollPosition = useCallback(() => {
    const shouldShow = window.pageYOffset > 400;
    if (showScrollTop !== shouldShow) {
      setShowScrollTop(shouldShow);
    }
  }, [showScrollTop]);

  useEffect(() => {
    window.addEventListener('scroll', checkScrollPosition, { passive: true });
    return () => window.removeEventListener('scroll', checkScrollPosition);
  }, [checkScrollPosition]);

  // Add custom scrollbar styles once on mount
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      /* Customize the scrollbar for webkit browsers */
      ::-webkit-scrollbar {
        width: 12px;
      }
      
      ::-webkit-scrollbar-track {
        background: #f1f1f1;
      }
      
      ::-webkit-scrollbar-thumb {
        background: #888;
        border-radius: 6px;
      }
      
      ::-webkit-scrollbar-thumb:hover {
        background: #555;
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);

  const scrollToTop = useCallback(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }, []);

  return (
    <footer className="bg-gray-100 pt-16 pb-8" role="contentinfo" aria-label="Site footer">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About Company */}
          <div className="md:col-span-1">
            <h2 className="text-xl font-bold mb-4 text-gray-900">Our Company</h2>
            <p className="text-gray-600 mb-4">
              We create innovative digital solutions that help businesses thrive in the modern world.
              Our team of experts is dedicated to delivering exceptional results.
            </p>
            <div className="flex space-x-4" aria-label="Social media links">
              <a 
                href="https://facebook.com/yourcompany" 
                className="text-gray-400 hover:text-gray-600 transition-colors" 
                aria-label="Visit our Facebook page"
                rel="noopener noreferrer"
                target="_blank"
              >
                <span className="sr-only">Facebook</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                </svg>
              </a>
              <a 
                href="https://instagram.com/yourcompany" 
                className="text-gray-400 hover:text-gray-600 transition-colors" 
                aria-label="Visit our Instagram page"
                rel="noopener noreferrer"
                target="_blank"
              >
                <span className="sr-only">Instagram</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12.315 2c1.532 0 1.872.007 2.528.036.65.03 1.09.133 1.477.284a2.977 2.977 0 011.714 1.714c.151.388.254.828.284 1.477.03.656.036.996.036 2.528 0 1.532-.007 1.872-.036 2.528-.03.65-.133 1.09-.284 1.477a2.978 2.978 0 01-1.714 1.714c-.388.151-.828.254-1.477.284-.656.03-.996.036-2.528.036-1.532 0-1.872-.007-2.528-.036-.65-.03-1.09-.133-1.477-.284a2.978 2.978 0 01-1.714-1.714c-.151-.388-.254-.828-.284-1.477-.029-.656-.036-.996-.036-2.528 0-1.532.007-1.872.036-2.528.03-.65.133-1.09.284-1.477a2.978 2.978 0 011.714-1.714c.388-.151.828-.254 1.477-.284.656-.03.996-.036 2.528-.036zm0 1.107c-1.505 0-1.682.006-2.271.034-.547.025-.843.116-1.039.193a1.87 1.87 0 00-1.072 1.072c-.077.196-.168.492-.193 1.039-.028.589-.034.766-.034 2.271s.006 1.682.034 2.271c.025.547.116.843.193 1.039.104.266.268.509.468.709.201.2.443.364.709.468.195.077.492.168 1.039.193.589.028.766.034 2.271.034s1.682-.006 2.271-.034c.547-.025.843-.116 1.039-.193a1.87 1.87 0 001.072-1.072c.077-.196.168-.492.193-1.039.028-.589.034-.766.034-2.271s-.006-1.682-.034-2.271c-.025-.547-.116-.843-.193-1.039a1.87 1.87 0 00-1.072-1.072c-.196-.077-.492-.168-1.039-.193-.589-.028-.766-.034-2.271-.034zm0 1.888a3.004 3.004 0 110 6.008 3.004 3.004 0 010-6.008zm0 4.958a1.954 1.954 0 100-3.908 1.954 1.954 0 000 3.908zm3.908-5.045a.702.702 0 110 1.404.702.702 0 010-1.404z" />
                </svg>
              </a>
              <a 
                href="https://twitter.com/yourcompany" 
                className="text-gray-400 hover:text-gray-600 transition-colors" 
                aria-label="Visit our Twitter page"
                rel="noopener noreferrer"
                target="_blank"
              >
                <span className="sr-only">Twitter</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
              <a 
                href="https://linkedin.com/company/yourcompany" 
                className="text-gray-400 hover:text-gray-600 transition-colors" 
                aria-label="Visit our LinkedIn page"
                rel="noopener noreferrer"
                target="_blank"
              >
                <span className="sr-only">LinkedIn</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M19.7 3H4.3A1.3 1.3 0 003 4.3v15.4A1.3 1.3 0 004.3 21h15.4a1.3 1.3 0 001.3-1.3V4.3A1.3 1.3 0 0019.7 3zM8.339 18.338H5.667v-8.59h2.672v8.59zM7.004 8.574a1.548 1.548 0 11-.002-3.096 1.548 1.548 0 01.002 3.096zm11.335 9.764H15.67v-4.177c0-.996-.017-2.278-1.387-2.278-1.389 0-1.601 1.086-1.601 2.206v4.249h-2.667v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.779 3.203 4.092v4.711z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <nav className="md:col-span-1" aria-labelledby="footer-quick-links">
            <h2 className="text-xl font-bold mb-4 text-gray-900" id="footer-quick-links">Quick Links</h2>
            <ul className="space-y-2">
              <li>
                <a href="#home" className="text-gray-600 hover:text-black transition-colors" aria-label="Go to home section">Home</a>
              </li>
              <li>
                <a href="#services" className="text-gray-600 hover:text-black transition-colors" aria-label="Go to services section">Services</a>
              </li>
              <li>
                <a href="#team" className="text-gray-600 hover:text-black transition-colors" aria-label="Go to our team section">Our Team</a>
              </li>
              <li>
                <a href="#projects" className="text-gray-600 hover:text-black transition-colors" aria-label="Go to projects section">Projects</a>
              </li>
              <li>
                <a href="#roadmap" className="text-gray-600 hover:text-black transition-colors" aria-label="Go to roadmap section">Roadmap</a>
              </li>
              <li>
                <a href="#contact" className="text-gray-600 hover:text-black transition-colors" aria-label="Go to contact section">Contact Us</a>
              </li>
            </ul>
          </nav>

          {/* Services */}
          <nav className="md:col-span-1" aria-labelledby="footer-services">
            <h2 className="text-xl font-bold mb-4 text-gray-900" id="footer-services">Services</h2>
            <ul className="space-y-2">
              <li>
                <a href="#services" className="text-gray-600 hover:text-black transition-colors" aria-label="Learn about our web development services">Web Development</a>
              </li>
              <li>
                <a href="#services" className="text-gray-600 hover:text-black transition-colors" aria-label="Learn about our mobile app services">Mobile Apps</a>
              </li>
              <li>
                <a href="#services" className="text-gray-600 hover:text-black transition-colors" aria-label="Learn about our UI/UX design services">UI/UX Design</a>
              </li>
              <li>
                <a href="#services" className="text-gray-600 hover:text-black transition-colors" aria-label="Learn about our digital marketing services">Digital Marketing</a>
              </li>
              <li>
                <a href="#services" className="text-gray-600 hover:text-black transition-colors" aria-label="Learn about our cloud solutions">Cloud Solutions</a>
              </li>
              <li>
                <a href="#services" className="text-gray-600 hover:text-black transition-colors" aria-label="Learn about our IT consulting services">IT Consulting</a>
              </li>
            </ul>
          </nav>

          {/* Contact */}
          <div className="md:col-span-1">
            <h2 className="text-xl font-bold mb-4 text-gray-900">Contact Us</h2>
            <address className="not-italic">
              <ul className="space-y-2">
                <li className="flex items-start">
                  {/* <svg className="h-6 w-6 text-gray-400 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg> */}
                  {/* <span className="text-gray-600">123 Innovation Street, Tech City, TC 10101</span> */}
                </li>
                <li className="flex items-start">
                  <svg className="h-6 w-6 text-gray-400 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <a href="mailto:info@company.com" className="text-gray-600 hover:text-black transition-colors">contact.triadforge@gmail.com</a>
                </li>
                <li className="flex items-start">
                  <svg className="h-6 w-6 text-gray-400 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <a href="tel:+11234567890" className="text-gray-600 hover:text-black transition-colors">+91 9182434370</a>
                </li>
              </ul>
            </address>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-200 mt-12 pt-8">
          <p className="text-gray-500 text-center text-sm">
            &copy; {new Date().getFullYear()} TriadForge All rights reserved.
          </p>
        </div>
      </div>

      {/* Scroll to top button - added title attribute for better accessibility */}
      <button
        onClick={scrollToTop}
        className={`fixed bottom-8 right-8 p-3 rounded-full bg-black text-white shadow-lg transition-opacity duration-300 z-50 ${
          showScrollTop ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        aria-label="Scroll to top of page"
        title="Scroll to top"
      >
        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18" />
        </svg>
      </button>
    </footer>
  );
});

Footer.displayName = 'Footer';

export default Footer; 
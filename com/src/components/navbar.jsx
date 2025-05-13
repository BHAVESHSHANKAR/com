import React, { useState, useEffect } from 'react';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const scrollToSection = (sectionId) => {
    setMobileMenuOpen(false);
    const section = document.getElementById(sectionId);
    if (section) {
      window.scrollTo({
        top: section.offsetTop - 100, // Offset to account for navbar height
        behavior: 'smooth'
      });
    }
  };

  const navLinks = [
    { name: 'Home', id: 'home' },
    { name: 'Services', id: 'services' },
    { name: 'Team', id: 'team' },
    { name: 'Projects', id: 'projects' },
    { name: 'Workflow', id: 'roadmap' },
    { name: 'Contact', id: 'contact' }
  ];

  return (
    <div className="relative">
      <nav 
        className={`w-full py-2 px-4 sm:px-6 rounded-full transition-all duration-300 ease-in-out ${
          scrolled 
            ? 'fixed top-2 left-0 right-0 max-w-7xl mx-auto z-50 bg-white bg-opacity-80 backdrop-blur-md shadow-md border-2 border-black' 
            : 'relative bg-white border-2 border-black'
        }`}
      >
        <div className="flex justify-between items-center">
          {/* Left side - Company Logo */}
          <div className="flex items-center">
            <a 
              href="#home" 
              onClick={(e) => {e.preventDefault(); scrollToSection('home');}}
              className="flex items-center gap-2"
            >
              <div className="text-black">
                <svg viewBox="0 0 24 24" width="24" height="24" sm:width="28" sm:height="28" fill="currentColor">
                  <path d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4M12,6.5A1.5,1.5 0 0,0 10.5,8A1.5,1.5 0 0,0 12,9.5A1.5,1.5 0 0,0 13.5,8A1.5,1.5 0 0,0 12,6.5M12,7.5A0.5,0.5 0 0,1 12.5,8A0.5,0.5 0 0,1 12,8.5A0.5,0.5 0 0,1 11.5,8A0.5,0.5 0 0,1 12,7.5"/>
                </svg>
              </div>
              <span className="font-semibold text-base sm:text-lg text-black">Company</span>
            </a>
          </div>
          
          {/* Desktop Navigation Links - hidden on mobile */}
          <div className="hidden md:flex items-center gap-3">
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={`#${link.id}`}
                onClick={(e) => {e.preventDefault(); scrollToSection(link.id);}}
                className="px-4 py-1.5 rounded-full transition-colors duration-200 text-gray-600 border-2 border-transparent hover:bg-gray-100 hover:text-black hover:font-medium hover:border-black cursor-pointer"
                style={{ height: '40px', display: 'flex', alignItems: 'center' }}
              >
                {link.name}
              </a>
            ))}
          </div>
          
          {/* Mobile Menu Button - only on mobile */}
          <div className="md:hidden">
            <button 
              onClick={toggleMobileMenu}
              className="text-black focus:outline-none"
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            >
              {mobileMenuOpen ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </nav>
      
      {/* Mobile Menu Dropdown - Frosted Glass Effect */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-40 flex items-start justify-center pt-20" onClick={() => setMobileMenuOpen(false)}>
          <div 
            className="w-[85%] bg-white bg-opacity-80 backdrop-blur-md rounded-xl shadow-xl border border-white border-opacity-40 overflow-hidden"
            onClick={(e) => e.stopPropagation()}
            style={{ maxWidth: '320px' }}
          >
            <div className="flex flex-col p-2">
              {navLinks.map((link) => (
                <a 
                  key={link.name} 
                  href={`#${link.id}`}
                  onClick={(e) => {e.preventDefault(); scrollToSection(link.id);}}
                  className="flex items-center px-4 py-3 my-1 rounded-lg hover:bg-white hover:bg-opacity-60 transition-all duration-200 cursor-pointer"
                >
                  <span className="mr-3 text-black">
                    {link.name === 'Home' && (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                      </svg>
                    )}
                    {link.name === 'Services' && (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    )}
                    {link.name === 'Team' && (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                      </svg>
                    )}
                    {link.name === 'Projects' && (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                      </svg>
                    )}
                    {link.name === 'Workflow' && (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                      </svg>
                    )}
                    {link.name === 'Contact' && (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    )}
                  </span>
                  <span className="text-black font-medium">{link.name}</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;

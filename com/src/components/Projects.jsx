import React, { useState, useEffect, useRef } from 'react';

const Projects = () => {
  const [activeProject, setActiveProject] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const autoPlayRef = useRef(null);
  
  const projects = [
    {
      id: 1,
      name: 'Petfinder',
      description: 'A comprehensive platform connecting pet owners with lost pets and adoption services, featuring real-time notifications and location-based search.',
      technologies: ['MongoDB', 'Express', 'React', 'Node.js'],
      projectUrl: 'https://petfinder-weld.vercel.app/',
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14 10h.01M17 10h.01M15 13a2 2 0 100-4 2 2 0 000 4zm-5 3a3 3 0 100-6 3 3 0 000 6z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5.93 17.97A8 8 0 1116.352 4.372l.892-1.351a1 1 0 011.665 1.098l-.903 1.37A8 8 0 115.93 17.971z" />
        </svg>
      )
    },
    {
      id: 2,
      name: 'Gradway',
      description: 'An educational platform helping students navigate their academic journey with personalized learning paths, progress tracking, and career guidance.',
      technologies: ['MongoDB', 'Express', 'React', 'Node.js'],
      projectUrl: '#',
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 14l9-5-9-5-9 5 9 5z" />
          <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
        </svg>
      )
    },
    {
      id: 3,
      name: 'Zest Travel',
      description: 'A modern travel booking site offering personalized itineraries, destination recommendations, and seamless booking experiences for adventurous travelers.',
      technologies: ['MongoDB', 'Express', 'React', 'Node.js'],
      projectUrl: 'https://zest-travel.vercel.app/',
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    {
      id: 4,
      name: 'Chitrakar',
      description: 'A digital platform for artists to showcase their work, collaborate on projects, and connect with art enthusiasts and potential clients worldwide.',
      technologies: ['MongoDB', 'Express', 'React', 'Node.js'],
      projectUrl: 'https://chitrakar-app.vercel.app/',
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      )
    },
    {
      id: 5,
      name: 'Fashion Finder',
      description: 'An intelligent fashion discovery platform that helps users find clothing items and accessories based on their preferences, style, and occasion needs.',
      technologies: ['Flask API', 'React', 'Python', 'TensorFlow'],
      projectUrl: '#',
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14 9a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      )
    },
    {
      id: 6,
      name: 'Antenna Positioning',
      description: 'A smart IoT system for optimizing antenna positioning in real-time, improving signal strength and coverage through automated adjustments and monitoring.',
      technologies: ['React', 'Firebase', 'IoT', 'ESP32'],
      projectUrl: 'https://anetnna-positioning.vercel.app/',
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0" />
        </svg>
      )
    }
  ];

  // Check if the device is mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Auto-play functionality
  useEffect(() => {
    const play = () => {
      if (isAutoPlaying) {
        setActiveProject((prev) => (prev + 1) % projects.length);
      }
    };

    autoPlayRef.current = play;
  }, [isAutoPlaying, projects.length]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (autoPlayRef.current) {
        autoPlayRef.current();
      }
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // Pause auto-play on user interaction
  const handleProjectClick = (index) => {
    setActiveProject(index);
    setIsAutoPlaying(false);
    
    // Resume auto-play after 10 seconds of inactivity
    setTimeout(() => {
      setIsAutoPlaying(true);
    }, 10000);
  };

  // Open project website in a new tab
  const openProjectWebsite = (url) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  // Scroll to contact section
  const scrollToContact = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      window.scrollTo({
        top: contactSection.offsetTop - 100,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section id="projects" className="w-full bg-white py-16 relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute w-full h-full" style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 0)', backgroundSize: '40px 40px' }}></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">Client Projects</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Showcasing our successful collaborations with clients across various industries.
            Each project represents our commitment to quality and innovation.
          </p>
        </div>

        {/* Project Showcase - Full Width */}
        <div className="w-full overflow-hidden rounded-xl shadow-2xl border border-gray-100 mb-16">
          {/* Project Tabs - Scrollable */}
          <div className="flex overflow-x-auto bg-gray-50 border-b border-gray-200 scrollbar-hide">
            {projects.map((project, index) => (
              <button
                key={project.id}
                onClick={() => handleProjectClick(index)}
                className={`flex items-center px-4 py-3 min-w-max whitespace-nowrap border-b-2 transition-all duration-300 font-medium ${
                  activeProject === index 
                    ? `border-black text-black` 
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <span className={`mr-2 ${activeProject === index ? 'opacity-100' : 'opacity-70'}`}>
                  {project.icon}
                </span>
                <span className="text-lg">{project.name}</span>
              </button>
            ))}
          </div>

          {/* Project Content */}
          <div className="relative" style={{ height: isMobile ? '650px' : '500px' }}>
            {projects.map((project, index) => (
              <div
                key={project.id}
                className={`transition-all duration-500 ${
                  activeProject === index ? 'opacity-100 relative' : 'opacity-0 hidden'
                }`}
              >
                <div className="grid grid-cols-1 md:grid-cols-2">
                  {/* Project Visual */}
                  <div className="h-[250px] md:h-[500px] p-10 flex items-center justify-center bg-gray-50">
                    <div className="w-48 h-48 md:w-64 md:h-64 rounded-full bg-black shadow-lg flex items-center justify-center text-white">
                      <div className="text-center p-6">
                        <div className="w-16 h-16 md:w-20 md:h-20 mx-auto bg-white bg-opacity-20 rounded-full flex items-center justify-center mb-4">
                          {project.icon}
                        </div>
                        <h3 className="text-xl md:text-2xl font-bold">{project.name}</h3>
                      </div>
                    </div>
                  </div>

                  {/* Project Details */}
                  <div className="p-6 md:p-12 bg-white flex flex-col justify-center">
                    <h3 className="text-2xl md:text-3xl font-bold mb-4 text-black">{project.name}</h3>
                    <p className="text-gray-700 mb-6 md:mb-8 text-base md:text-lg">{project.description}</p>
                    
                    <div className="mb-6 md:mb-8">
                      <h4 className="text-gray-500 font-medium mb-3">Tech Stack</h4>
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.map((tech, i) => (
                          <span 
                            key={`${project.id}-tech-${i}`}
                            className="px-3 py-1 text-sm rounded-full bg-gray-100 text-gray-800 font-medium"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div className="mt-auto">
                      <button 
                        onClick={() => openProjectWebsite(project.projectUrl)}
                        className="inline-flex items-center px-5 py-2 md:px-6 md:py-3 rounded-lg bg-black text-white hover:bg-gray-800 transition-colors"
                      >
                        View Project Website
                        <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Project Navigation Dots */}
          <div className="bg-white p-4 border-t border-gray-100 flex justify-center">
            <div className="flex space-x-3">
              {projects.map((_, index) => (
                <button
                  key={`dot-${index}`}
                  onClick={() => handleProjectClick(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    activeProject === index 
                      ? 'bg-black scale-110' 
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                  aria-label={`Go to project ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center bg-gray-50 rounded-xl p-8 border border-gray-100 shadow-sm">
          <h3 className="text-2xl font-bold text-black mb-4">Have a project in mind?</h3>
          <p className="text-gray-600 max-w-2xl mx-auto mb-8">
            We're ready to bring your ideas to life with our expertise in web development, 
            app creation, and digital solutions. Let's collaborate on your next big project.
          </p>
          <button 
            onClick={scrollToContact}
            className="inline-block px-8 py-4 bg-black text-white font-medium rounded-lg hover:bg-gray-800 transition-colors shadow-md hover:shadow-lg"
          >
            Start a Project
          </button>
        </div>
      </div>
    </section>
  );
};

// Add scrollbar hiding utility
const style = document.createElement('style');
style.textContent = `
  .scrollbar-hide::-webkit-scrollbar {
    display: none;
  }
  .scrollbar-hide {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
`;
document.head.appendChild(style);

export default Projects; 
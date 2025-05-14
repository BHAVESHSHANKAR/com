import React, { useState, useEffect } from 'react';

const Team = () => {
  const [hoveredMember, setHoveredMember] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const [activeMobileIndex, setActiveMobileIndex] = useState(0);
  const [showPopup, setShowPopup] = useState(false);

  const teamMembers = [
    {
      id: 1,
      name: 'Venkata Teja',
      bio: 'Tech enthusiast with expertise in full-stack development and system architecture. Leads the vision and strategy for our company.',
      firstLetter: 'V',
      socialLinks: {
        linkedin: 'https://www.linkedin.com/in/uvenkatateja/',
        github: 'https://github.com/uvenkatateja'
      }
    },
    {
      id: 2,
      name: 'Bhavesh',
      bio: 'Expert in modern web technologies with a passion for creating seamless user experiences. Oversees all technical implementations.',
      firstLetter: 'B',
      socialLinks: {
        linkedin: 'https://www.linkedin.com/in/kalluru-bhavesh-shankar-083b13264/',
        github: 'https://github.com/BHAVESHSHANKAR'
      }
    },
    {
      id: 3,
      name: 'Raghava',
      bio: 'Creative designer who transforms complex ideas into intuitive interfaces. Ensures all our products are beautiful and user-friendly.',
      firstLetter: 'R',
      socialLinks: {
        linkedin: 'https://www.linkedin.com/in/raghavendra-g-7b2a01264/',
        github: 'https://github.com/raghhhava7'
      }
    },
    {
      id: 4,
      name: 'Megha Shyam',
      bio: 'Organizational genius who keeps projects on track and ensures timely delivery. Expert in agile methodologies and client communications.',
      firstLetter: 'M',
      socialLinks: {
        linkedin: 'https://www.linkedin.com/in/megha-shyam-reddy-pathakota-b0703b265/',
        github: 'https://github.com/PATHAKOTAMEGHASHYAMREDDY'
      }
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

  // Auto-rotate through team members on mobile
  useEffect(() => {
    if (!isMobile) return;
    
    const interval = setInterval(() => {
      setActiveMobileIndex((prev) => (prev + 1) % teamMembers.length);
    }, 3000); // Change active member every 3 seconds
    
    return () => clearInterval(interval);
  }, [isMobile, teamMembers.length]);

  // Update hoveredMember based on mobile auto-rotation or mouse hover
  useEffect(() => {
    if (isMobile) {
      setHoveredMember(teamMembers[activeMobileIndex].id);
    }
  }, [isMobile, activeMobileIndex, teamMembers]);

  // Function to handle mouse hover effects (only for desktop)
  const handleMouseEnter = (id) => {
    if (!isMobile) {
      setHoveredMember(id);
    }
  };

  const handleMouseLeave = () => {
    if (!isMobile) {
      setHoveredMember(null);
    }
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

  // Show popup instead of scrolling to contact
  const handleJoinTeamClick = () => {
    setShowPopup(true);
  };

  // Close popup
  const closePopup = () => {
    setShowPopup(false);
  };

  return (
    <section id="team" className="w-full bg-white py-16 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-gray-100 opacity-70"></div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">Who We Are</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Meet the talented individuals who make our company thrive. 
            Each member brings unique skills and perspectives to our work.
          </p>
        </div>

        {/* Mobile indicator dots */}
        {isMobile && (
          <div className="flex justify-center gap-2 mb-6">
            {teamMembers.map((member, index) => (
              <button 
                key={`dot-${member.id}`}
                onClick={() => setActiveMobileIndex(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  activeMobileIndex === index ? 'bg-black scale-125' : 'bg-gray-300'
                }`}
                aria-label={`Show ${member.name}`}
              />
            ))}
          </div>
        )}

        {/* Team members in a single row on desktop, carousel-style on mobile */}
        <div className={`
          flex 
          ${isMobile ? 'flex-col items-center' : 'flex-wrap justify-center md:justify-between md:flex-nowrap items-start'} 
          gap-4 md:gap-6 mb-8
        `}>
          {teamMembers.map((member, index) => (
            <div 
              key={member.id}
              className={`
                flex flex-col items-center 
                ${isMobile ? 'w-full' : 'w-full md:w-1/4'} 
                px-2 transition-all duration-500
                ${isMobile && activeMobileIndex !== index ? 'hidden' : ''}
              `}
              onMouseEnter={() => handleMouseEnter(member.id)}
              onMouseLeave={handleMouseLeave}
            >
              {/* Profile circle with first letter */}
              <div className="relative mb-6 group">
                <div 
                  className={`w-32 h-32 rounded-full overflow-hidden border-4 flex items-center justify-center transition-all duration-500 ${
                    hoveredMember === member.id 
                      ? 'border-black scale-105 shadow-xl bg-black text-white' 
                      : 'border-gray-200 bg-gray-100 text-black'
                  }`}
                >
                  <span className="text-5xl font-bold">{member.firstLetter}</span>
                </div>

                {/* Animated circles on hover or active mobile */}
                <div className={`absolute -inset-4 rounded-full transition-all duration-700 ${
                  hoveredMember === member.id ? 'animate-spin-slow opacity-100' : 'opacity-0'
                }`}>
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3 h-3 bg-black rounded-full"></div>
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3 h-3 bg-black rounded-full"></div>
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-black rounded-full"></div>
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-black rounded-full"></div>
                </div>
              </div>

              {/* Member info with animated effects */}
              <div 
                className={`text-center transition-all duration-300 ${
                  hoveredMember === member.id ? 'translate-y-2' : ''
                }`}
              >
                <h3 className="text-xl font-bold text-black mb-3">{member.name}</h3>
                <p className={`text-gray-600 text-sm md:text-base mb-4 max-w-xs transition-all duration-500 ${
                  hoveredMember === member.id ? 'opacity-100' : 'opacity-80'
                }`}>
                  {member.bio}
                </p>

                {/* Social links - Modified for mobile visibility */}
                <div className={`flex justify-center gap-4 transition-all duration-500 ${
                  isMobile ? 'opacity-100 translate-y-0' : 
                  hoveredMember === member.id ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                }`}>
                  <a 
                    href={member.socialLinks.linkedin} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-gray-600 hover:text-black transition-colors p-2"
                    aria-label={`${member.name}'s LinkedIn profile`}
                  >
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" />
                    </svg>
                  </a>
                  <a 
                    href={member.socialLinks.github} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-gray-600 hover:text-black transition-colors p-2"
                    aria-label={`${member.name}'s GitHub profile`}
                  >
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile navigation buttons */}
        {isMobile && (
          <div className="flex justify-center gap-4 mt-4 mb-8">
            <button 
              onClick={() => setActiveMobileIndex(prev => (prev - 1 + teamMembers.length) % teamMembers.length)}
              className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center shadow-md"
              aria-label="Previous team member"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button 
              onClick={() => setActiveMobileIndex(prev => (prev + 1) % teamMembers.length)}
              className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center shadow-md"
              aria-label="Next team member"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        )}

        {/* CTA button */}
        <div className="text-center mt-12">
          <button 
            onClick={handleJoinTeamClick}
            className="inline-block px-8 py-3 bg-black text-white font-medium rounded-full hover:bg-gray-800 transition-colors shadow-md hover:shadow-lg"
          >
            Join Our Team
          </button>
        </div>
      </div>

      {/* Popup for Not Hiring Message */}
      {showPopup && (
        <div className="fixed inset-0 bg-white bg-opacity-70 backdrop-blur-md flex items-center justify-center z-50 p-4">
          <div className="bg-white bg-opacity-80 backdrop-blur-md rounded-xl shadow-2xl p-6 max-w-md w-full animate-rise relative border border-white border-opacity-40">
            <button 
              onClick={closePopup}
              className="absolute top-3 right-3 text-gray-500 hover:text-black"
              aria-label="Close popup"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <div className="text-center py-4">
              <div className="text-5xl mb-4">😊</div>
              <h3 className="text-2xl font-bold text-black mb-3">We're Not Currently Hiring</h3>
              <p className="text-gray-600 mb-6">
                Thank you for your interest in joining our team! We're not currently hiring, but we'd still love to hear from you and keep your information for future opportunities.
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

// Add the slow spin animation
const style = document.createElement('style');
style.textContent = `
  @keyframes spin-slow {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
  .animate-spin-slow {
    animation: spin-slow 15s linear infinite;
  }
  
  @keyframes rise {
    0% { transform: translateY(20px); opacity: 0; }
    100% { transform: translateY(0); opacity: 1; }
  }
  .animate-rise {
    animation: rise 0.3s ease-out forwards;
  }
`;
document.head.appendChild(style);

export default Team; 
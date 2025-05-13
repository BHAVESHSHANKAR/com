import React, { useState, useRef, useEffect } from 'react';
import Lottie from 'lottie-react';
import servicesAnimation from '../assets/animations/servicesanimation.json';
import useScrollAnimation from '../hooks/useScrollAnimation';

const Services = () => {
  // State to track which card is expanded
  const [expandedCard, setExpandedCard] = useState(null);
  const cardsRef = useRef([]);
  
  // Use our scroll animation hook
  const { ref: sectionRef, isVisible } = useScrollAnimation({
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px',
    once: true
  });
  
  // Apply staggered animation to cards when section becomes visible
  useEffect(() => {
    if (isVisible && cardsRef.current.length > 0) {
      cardsRef.current.forEach((card, index) => {
        if (card) {
          setTimeout(() => {
            card.classList.add('animated');
          }, 100 * index); // Stagger the animations
        }
      });
    }
  }, [isVisible]);

  // Toggle card expansion
  const toggleCard = (id) => {
    if (expandedCard === id) {
      setExpandedCard(null); // Close if already open
    } else {
      setExpandedCard(id); // Open this card, close others
    }
  };

  const services = [
    {
      id: 1,
      title: 'Web Development',
      description: 'Modern, responsive websites and web applications built with the latest technologies.',
      detailedContent: 'Our web development services include custom website creation, e-commerce solutions, progressive web applications, content management systems, and API integrations. We use modern frameworks like React, Vue, and Angular to build fast, scalable, and SEO-friendly websites. Our design process ensures intuitive interfaces with engaging user experiences through careful wireframing, prototyping, and usability testing.',
      icon: (
        <svg className="w-12 h-12 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      )
    },
    {
      id: 2,
      title: 'App Development',
      description: 'Native and cross-platform mobile applications for iOS and Android devices.',
      detailedContent: 'We develop mobile applications for both iOS and Android platforms using React Native, Flutter, or native development. Our apps are feature-rich, optimized for performance, and designed with user experience in mind. We handle everything from wireframing to app store submission. Each app is designed with a user-centered approach, creating beautiful interfaces that are intuitive and engaging while maintaining optimal performance.',
      icon: (
        <svg className="w-12 h-12 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
        </svg>
      )
    },
    {
      id: 3,
      title: 'IoT Development',
      description: 'Connected device solutions for smart homes, industrial automation, and enterprise systems.',
      detailedContent: 'Our IoT development services help businesses connect physical devices to digital networks. We develop custom firmware, establish secure communication protocols, create cloud backends for data processing, and build intuitive dashboards for monitoring and control. Our solutions scale from smart home devices to industrial automation systems, with a focus on security, reliability, and seamless integration.',
      icon: (
        <svg className="w-12 h-12 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
        </svg>
      )
    },
    {
      id: 4,
      title: 'Documentation',
      description: 'Comprehensive technical documentation, user guides, and specification documents.',
      detailedContent: 'Our documentation services ensure your project is well-documented with technical specifications, API documentation, user guides, and system architecture diagrams. We make complex information accessible and organized for technical and non-technical stakeholders.',
      icon: (
        <svg className="w-12 h-12 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      )
    },
    {
      id: 5,
      title: 'Paper Work',
      description: 'Professional report making, IEEE papers, and academic documentation.',
      detailedContent: 'We specialize in creating professional reports, IEEE-formatted research papers, academic documentation, and formal business proposals. Our team ensures all documents follow industry standards and formatting guidelines while communicating your ideas effectively.',
      icon: (
        <svg className="w-12 h-12 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
        </svg>
      )
    },
    {
      id: 6,
      title: 'Deployment',
      description: 'Seamless deployment to production environments with ongoing support.',
      detailedContent: 'We handle the entire deployment process including server setup, CI/CD pipeline configuration, containerization with Docker, cloud deployment (AWS, Azure, GCP), and monitoring setup. We also provide post-deployment support and maintenance to ensure your application runs smoothly.',
      icon: (
        <svg className="w-12 h-12 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
      )
    }
  ];

  // Handle keyboard navigation
  const handleKeyDown = (e, id) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggleCard(id);
    } else if (e.key === 'Escape' && expandedCard === id) {
      setExpandedCard(null);
    }
  };

  // Memo-ized background animation to improve performance
  const backgroundAnimation = (
    <div className="absolute inset-0 opacity-50 pointer-events-none overflow-hidden animation-container">
      <Lottie
        animationData={servicesAnimation}
        loop={true}
        autoplay={true}
        className="w-full h-full object-cover"
        style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%) scale(1.8)' }}
        rendererSettings={{
          preserveAspectRatio: 'xMidYMid slice',
          progressiveLoad: true
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-white via-transparent to-white opacity-40"></div>
    </div>
  );

  return (
    <div ref={sectionRef} className="w-full bg-white py-16 px-4 sm:px-6 relative overflow-hidden">
      {/* Lottie Animation in the background */}
      {backgroundAnimation}
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">Our Services</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            We provide end-to-end solutions for businesses at every stage of growth.
            From concept to deployment, we've got you covered.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {services.map((service, index) => (
            <div 
              key={service.id}
              ref={(el) => (cardsRef.current[index] = el)}
              className="scroll-animation flex flex-col items-center md:items-start rounded-lg p-6 border-2 border-black hover:shadow-lg transition-all duration-300 relative"
              style={{
                flexDirection: index % 2 === 0 ? 'row' : 'row-reverse',
                boxShadow: expandedCard === service.id ? '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)' : ''
              }}
            >
              <div className="flex-shrink-0 mb-4 md:mb-0 md:mr-6 md:ml-6">
                <div 
                  className={`p-3 bg-white bg-opacity-70 rounded-full shadow-sm border border-gray-300 backdrop-filter backdrop-blur-sm transition-all ${
                    expandedCard === service.id ? 'animate-pulse' : ''
                  }`}
                >
                  {service.icon}
                </div>
              </div>
              <div className={`flex-grow text-center md:text-left ${index % 2 !== 0 ? 'md:text-right' : ''}`}>
                <h3 className="text-xl font-semibold text-black mb-2">{service.title}</h3>
                <p className="text-gray-800 mb-4">{service.description}</p>
                
                {/* Button to show more content */}
                {expandedCard !== service.id && (
                  <button
                    onClick={() => toggleCard(service.id)}
                    onKeyDown={(e) => handleKeyDown(e, service.id)}
                    className="inline-flex items-center text-black font-medium hover:underline focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
                    aria-expanded={expandedCard === service.id}
                    aria-controls={`service-details-${service.id}`}
                  >
                    Learn More
                    <svg 
                      className="w-4 h-4 ml-1" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24" 
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden="true"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </button>
                )}
              </div>
              
              {/* Expanded content - rises up on the card when Learn More is clicked */}
              {expandedCard === service.id && (
                <div 
                  id={`service-details-${service.id}`}
                  className="absolute inset-0 backdrop-filter backdrop-blur-lg bg-white bg-opacity-70 rounded-lg border-2 border-black p-6 shadow-xl animate-rise overflow-y-auto z-20"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center">
                      <div className="p-2 bg-white bg-opacity-70 backdrop-filter backdrop-blur-sm rounded-full mr-3">
                        {service.icon}
                      </div>
                      <h3 className="text-xl font-semibold text-black">{service.title}</h3>
                    </div>
                    <button 
                      onClick={() => toggleCard(service.id)}
                      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ' || e.key === 'Escape') toggleCard(service.id) }}
                      className="p-1 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-black"
                      aria-label="Close"
                    >
                      <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                  <p className="text-gray-800 mb-4">{service.detailedContent}</p>
                  <div className="flex justify-end">
                    <button
                      onClick={() => toggleCard(service.id)}
                      className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
                    >
                      Close
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Add the rising animation and backdrop filter support for browsers
const style = document.createElement('style');
style.textContent = `
  @keyframes rise {
    0% { transform: translateY(20px); opacity: 0; }
    100% { transform: translateY(0); opacity: 1; }
  }
  .animate-rise {
    animation: rise 0.3s ease-out forwards;
  }
  
  @supports not (backdrop-filter: blur(10px)) {
    .backdrop-filter.backdrop-blur-md {
      background-color: rgba(255, 255, 255, 0.9) !important;
    }
    .backdrop-filter.backdrop-blur-lg {
      background-color: rgba(255, 255, 255, 0.95) !important;
    }
  }
`;
document.head.appendChild(style);

export default Services; 
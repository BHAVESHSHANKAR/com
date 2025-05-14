import React, { useEffect, useRef, useState } from 'react';
import heroImage from '../assets/heroimg.png';
// Note: After running the optimizeImages.js script, import these optimized versions
// You'll need to create these files by running the script first
const heroImageOptimized = heroImage; // Update path after optimization
const heroImageWebP = heroImage; // Update path after optimization

// Progressive image loading component
const ProgressiveImage = ({ src, webpSrc, alt, className, width, height, ...props }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  
  // Create a placeholder SVG as a tiny base64 data URI
  const placeholder = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 450 450'%3E%3Crect width='450' height='450' fill='%23f0f0f0'/%3E%3C/svg%3E";
  
  return (
    <div className="relative w-full h-full">
      {/* Placeholder */}
      <div 
        className={`absolute inset-0 bg-gray-100 ${isLoaded ? 'opacity-0' : 'opacity-100'}`}
        style={{ 
          backgroundImage: `url(${placeholder})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          transition: 'opacity 0.3s ease-out'
        }}
        aria-hidden="true"
      />
      
      {/* Actual image with WebP support */}
      <picture>
        {webpSrc && <source srcSet={webpSrc} type="image/webp" />}
        <source srcSet={src} type="image/png" />
        <img 
          src={src} 
          alt={alt} 
          className={`${className} ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
          style={{ transition: 'opacity 0.3s ease-out' }}
          width={width}
          height={height}
          onLoad={() => setIsLoaded(true)}
          {...props}
        />
      </picture>
    </div>
  );
};

// Add preload link for the hero image
const preloadHeroImage = () => {
  // Create preload for PNG
  const linkElement = document.createElement('link');
  linkElement.rel = 'preload';
  linkElement.href = heroImageOptimized;
  linkElement.as = 'image';
  linkElement.type = 'image/png';
  linkElement.importance = 'high';
  document.head.appendChild(linkElement);
  
  // Create preload for WebP if browser supports it
  if (
    document.createElement('canvas').toDataURL('image/webp').indexOf('data:image/webp') === 0
  ) {
    const webpLinkElement = document.createElement('link');
    webpLinkElement.rel = 'preload';
    webpLinkElement.href = heroImageWebP;
    webpLinkElement.as = 'image';
    webpLinkElement.type = 'image/webp';
    webpLinkElement.importance = 'high';
    document.head.appendChild(webpLinkElement);
  }
  
  return () => {
    // Clean up to prevent memory leaks
    if (document.head.contains(linkElement)) {
      document.head.removeChild(linkElement);
    }
  };
};

const HeroSection = () => {
  const titleRef = useRef(null);
  
  useEffect(() => {
    // Preload hero image immediately
    const cleanup = preloadHeroImage();
    
    // Simplified animation with requestAnimationFrame for better performance
    let rafId;
    
    // Title animation - simplified
    if (titleRef.current) {
      const title = titleRef.current;
      rafId = window.requestAnimationFrame(() => {
        title.style.opacity = '1';
        title.style.transform = 'translateY(0)';
      });
    }
    
    return () => {
      if (rafId) window.cancelAnimationFrame(rafId);
      cleanup();
    };
  }, []);

  const scrollToContact = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      // Add a small delay to ensure DOM is fully rendered
      setTimeout(() => {
        const offsetTop = contactSection.getBoundingClientRect().top + window.pageYOffset;
        window.scrollTo({
          top: offsetTop - 80, // Reduced offset for better positioning
          behavior: 'smooth'
        });
      }, 50);
    } else {
      // Fallback if element isn't found immediately
      console.log('Contact section not found, using fallback navigation');
      document.querySelector('a[href="#contact"]')?.click();
    }
  };

  return (
    <section id="home" className="relative py-0 bg-gradient-to-b from-white to-gray-50 overflow-hidden">
      <div className="w-full bg-white text-black min-h-[600px] relative overflow-hidden select-none px-4 sm:px-6">
        <div className="max-w-7xl mx-auto py-10 sm:py-12 md:py-16 flex flex-col md:flex-row items-center justify-between relative z-10">
          {/* Left content */}
          <div className="w-full md:w-1/2 mb-12 md:mb-0 relative text-center md:text-left">
            {/* Animated badge with pulsing green dot */}
            <div className="inline-flex items-center px-3 py-1 rounded-full border border-gray-300 bg-white mb-4 sm:mb-6">
              <div className="relative">
                <div className="w-2 h-2 rounded-full bg-green-500 mr-2"></div>
                <div className="absolute top-0 left-0 w-2 h-2 rounded-full bg-green-400 animate-ping opacity-75"></div>
              </div>
              <span className="text-sm text-black">Available for Work</span>
            </div>
            
            {/* Animated heading - with initial styles for no FOUC */}
            <div 
              ref={titleRef} 
              className="overflow-hidden" 
              style={{ opacity: 0, transform: 'translateY(20px)', transition: 'opacity 0.8s ease, transform 0.8s ease' }}
            >
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4 sm:mb-5 text-black">
                Transform your<br className="hidden sm:block" />
                ideas into digital<br className="hidden sm:block" />
                success with us!
              </h1>
            </div>
            
            <p className="text-base sm:text-lg text-gray-600 mb-6 sm:mb-8 max-w-lg mx-auto md:mx-0">
              We're your partner in product design, website creation,
              and branding for every stage of your business.
            </p>
            
            <div className="flex justify-center md:justify-start space-x-4">
              <button 
                onClick={scrollToContact}
                className="px-6 sm:px-8 py-3 sm:py-4 bg-black text-white font-medium rounded-lg hover:bg-gray-800 transition-all duration-300 transform hover:scale-105 hover:shadow-lg text-sm sm:text-base"
              >
                Build Your Product
              </button>
            </div>
          </div>
          
          {/* Right image - optimized for better LCP */}
          <div className="w-full md:w-1/2 flex justify-center items-center mt-8 md:mt-0">
            <div className="relative w-[280px] h-[280px] sm:w-[350px] sm:h-[350px] md:w-[400px] md:h-[400px] lg:w-[450px] lg:h-[450px] overflow-hidden">
              <ProgressiveImage 
                src={heroImageOptimized}
                webpSrc={heroImageWebP}
                alt="Digital design and development" 
                className="w-full h-full object-contain optimize-rendering"
                draggable="false"
                loading="eager"
                fetchPriority="high"
                width="450"
                height="450"
                onDragStart={(e) => e.preventDefault()}
              />
              
              {/* Simplified animations - load after critical content */}
              <div className="absolute top-0 left-0 w-full h-full pointer-events-none hidden sm:block">
                <div className="absolute top-[20%] left-[10%] w-6 h-6 rounded-full border border-gray-800 hero-dot-1"></div>
                <div className="absolute top-[70%] right-[20%] w-4 h-4 rounded-full border border-gray-800 hero-dot-2"></div>
                <div className="absolute bottom-[30%] left-[30%] w-3 h-3 rounded-full bg-black hero-dot-3"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection; 
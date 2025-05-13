import React, { useEffect } from 'react';
import Navbar from '../components/navbar';
import HeroSection from '../components/HeroSection';
import Services from '../components/Services';
import Team from '../components/Team';
import Roadmap from '../components/Roadmap';
import Projects from '../components/Projects';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import useScrollAnimation from '../hooks/useScrollAnimation';

// Animated Section Component 
const AnimatedSection = ({ children, id, className = '' }) => {
    const { ref, isVisible } = useScrollAnimation({
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px', // Trigger a bit earlier
        once: true
    });
    
    return (
        <section 
            id={id} 
            ref={ref} 
            className={`scroll-animation ${isVisible ? 'animated' : ''} ${className}`}
        >
            {children}
        </section>
    );
};

function Mainpage(){
    // Apply loading class during initial render and remove it after LCP completes
    useEffect(() => {
        document.documentElement.classList.add('loading');
        
        let lcpObserver;
        let removeLoadingTimeout;
        
        // Remove loading class after LCP measurement or fallback to a timeout
        const removeLoadingClass = () => {
            // Use requestAnimationFrame to batch DOM updates
            requestAnimationFrame(() => {
                document.documentElement.classList.remove('loading');
            });
        };
        
        // Listen for the LCP metric if available
        if ('PerformanceObserver' in window) {
            lcpObserver = new PerformanceObserver((entryList) => {
                const entries = entryList.getEntries();
                if (entries.length > 0) {
                    // LCP has been recorded, remove loading class with small delay
                    // to ensure page is stable
                    removeLoadingTimeout = setTimeout(removeLoadingClass, 100);
                    lcpObserver.disconnect();
                }
            });
            
            lcpObserver.observe({ type: 'largest-contentful-paint', buffered: true });
            
            // Fallback in case LCP doesn't fire
            removeLoadingTimeout = setTimeout(removeLoadingClass, 2000);
        } else {
            // Browser doesn't support PerformanceObserver
            removeLoadingTimeout = setTimeout(removeLoadingClass, 1000);
        }
        
        // Fix smooth scrolling for all hash links
        const handleHashClick = (e) => {
            const href = e.target.closest('a')?.getAttribute('href');
            if (href && href.startsWith('#')) {
                e.preventDefault();
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    // Use requestAnimationFrame for smooth scrolling
                    requestAnimationFrame(() => {
                        const offsetTop = targetElement.getBoundingClientRect().top + window.pageYOffset;
                        window.scrollTo({
                            top: offsetTop - 80,
                            behavior: 'smooth'
                        });
                        
                        // Update URL without triggering navigation
                        window.history.pushState(null, '', href);
                    });
                }
            }
        };
        
        document.addEventListener('click', handleHashClick, { passive: false });
        
        return () => {
            document.documentElement.classList.remove('loading');
            document.removeEventListener('click', handleHashClick);
            
            // Clean up timers and observers
            if (lcpObserver) {
                lcpObserver.disconnect();
            }
            
            if (removeLoadingTimeout) {
                clearTimeout(removeLoadingTimeout);
            }
        };
    }, []);
    
    return(
        <div className="min-h-screen bg-white">
            {/* Navbar section with minimal spacing */}
            <header className="pt-2 pb-0 px-6">
                <div className="max-w-screen-xl mx-auto">
                    <Navbar />
                </div>
            </header>
            
            {/* Main content */}
            <main>
                <section id="home">
                    <HeroSection />
                </section>
                
                <AnimatedSection id="services" className="cv-auto">
                    <Services />
                </AnimatedSection>
                
                <AnimatedSection id="team" className="cv-auto">
                    <Team />
                </AnimatedSection>
                
                <AnimatedSection id="projects" className="cv-auto">
                    <Projects />
                </AnimatedSection>
                
                <AnimatedSection id="roadmap" className="cv-auto">
                    <Roadmap />
                </AnimatedSection>
                
                <AnimatedSection id="contact" className="cv-auto">
                    <Contact />
                </AnimatedSection>
            </main>
            
            <Footer />
        </div>
    )
}
export default Mainpage;

import React, { useEffect, useState, useRef } from 'react';

const Roadmap = () => {
  const [activeStep, setActiveStep] = useState(null);
  const containerRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);
  
  // Define workflow steps
  const workflowSteps = [
    {
      id: 1,
      title: 'Discovery',
      icon: '🔍',
      description: 'We start by understanding your project needs, goals, and timeline. This helps us create a tailored approach for your specific requirements.'
    },
    {
      id: 2,
      title: 'Planning',
      icon: '📋',
      description: 'We create detailed wireframes, design concepts, and project roadmaps. Regular feedback ensures we are aligned with your vision.'
    },
    {
      id: 3,
      title: 'Development',
      icon: '💻',
      description: 'Our team builds your solution using the latest technologies and best practices. We implement features in sprints with regular progress updates.'
    },
    {
      id: 4,
      title: 'Testing',
      icon: '✓',
      description: 'We thoroughly test functionality, performance, and security. You will have opportunities to review and suggest adjustments before finalization.'
    },
    {
      id: 5,
      title: 'Deployment',
      icon: '🚀',
      description: 'We handle the launch process, ensuring smooth deployment to your preferred environment with minimal disruption.'
    },
    {
      id: 6,
      title: 'Support',
      icon: '🛠️',
      description: 'We provide ongoing maintenance, updates, and support to keep your solution running optimally and evolving with your needs.'
    }
  ];

  // Track hover on steps
  const handleMouseEnter = (id) => {
    setActiveStep(id);
  };

  const handleMouseLeave = () => {
    setActiveStep(null);
  };

  // Check if the viewport is mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Draw connections between workflow steps
  useEffect(() => {
    if (!containerRef.current) return;
    
    const drawConnections = () => {
      const container = containerRef.current;
      const steps = container.querySelectorAll('.step-node');
      
      // Clear existing connections
      const existingConnections = container.querySelectorAll('.connections-svg');
      existingConnections.forEach(conn => conn.remove());
      
      // Create SVG container
      const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      svg.classList.add('connections-svg');
      svg.style.position = 'absolute';
      svg.style.top = '0';
      svg.style.left = '0';
      svg.style.width = '100%';
      svg.style.height = '100%';
      svg.style.pointerEvents = 'none';
      svg.style.zIndex = '1'; // Set z-index below the nodes
      container.appendChild(svg);
      
      // Set SVG size
      svg.setAttribute('width', container.offsetWidth);
      svg.setAttribute('height', container.offsetHeight);
      
      // Create defs for filters
      const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
      svg.appendChild(defs);
      
      // Create gradient definitions for colorful paths
      const colors = [
        ['#ff6b6b', '#f06'], // Red gradient
        ['#4ecdc4', '#00b7ff'], // Cyan gradient
        ['#a06cd5', '#6c5ce7'], // Purple gradient
        ['#fdcb6e', '#e17055'], // Orange gradient
        ['#00cec9', '#74b9ff']  // Blue gradient
      ];
      
      colors.forEach((color, i) => {
        const gradientId = `line-gradient-${i}`;
        const gradient = document.createElementNS('http://www.w3.org/2000/svg', 'linearGradient');
        gradient.setAttribute('id', gradientId);
        
        if (isMobile) {
          gradient.setAttribute('x1', '0%');
          gradient.setAttribute('y1', '0%');
          gradient.setAttribute('x2', '0%');
          gradient.setAttribute('y2', '100%');
        } else {
          gradient.setAttribute('x1', '0%');
          gradient.setAttribute('y1', '0%');
          gradient.setAttribute('x2', '100%');
          gradient.setAttribute('y2', '0%');
        }
        
        const stop1 = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
        stop1.setAttribute('offset', '0%');
        stop1.setAttribute('stop-color', color[0]);
        
        const stop2 = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
        stop2.setAttribute('offset', '100%');
        stop2.setAttribute('stop-color', color[1]);
        
        gradient.appendChild(stop1);
        gradient.appendChild(stop2);
        defs.appendChild(gradient);
      });
      
      // Connect steps with curved paths
      for (let i = 0; i < steps.length - 1; i++) {
        const startStep = steps[i];
        const endStep = steps[i + 1];
        
        const startRect = startStep.getBoundingClientRect();
        const endRect = endStep.getBoundingClientRect();
        const containerRect = container.getBoundingClientRect();
        
        // Different calculations based on mobile/desktop
        let startX, startY, endX, endY, midX, midY, pathData;
        
        if (isMobile) {
          // Vertical layout connections
          startX = (startRect.left + startRect.width / 2) - containerRect.left;
          startY = (startRect.bottom) - containerRect.top;
          endX = (endRect.left + endRect.width / 2) - containerRect.left;
          endY = (endRect.top) - containerRect.top;
          midX = startX;
          midY = startY + (endY - startY) / 2;
          
          // Create curved path alternating left and right
          const curveWidth = 30;
          const sign = i % 2 === 0 ? 1 : -1;
          
          pathData = `M ${startX} ${startY} C ${startX + sign * curveWidth} ${startY + (endY - startY)/3}, ${endX + sign * curveWidth} ${endY - (endY - startY)/3}, ${endX} ${endY}`;
        } else {
          // Horizontal layout connections
          startX = (startRect.left + startRect.width / 2) - containerRect.left;
          startY = (startRect.top + startRect.height / 2) - containerRect.top;
          endX = (endRect.left + endRect.width / 2) - containerRect.left;
          endY = (endRect.top + endRect.height / 2) - containerRect.top;
          midX = startX + (endX - startX) / 2;
          midY = startY;
          
          // Create curve based on position (alternating up/down)
          const curveHeight = 40;
          const sign = i % 2 === 0 ? 1 : -1;
          
          pathData = `M ${startX} ${startY} C ${startX + (endX - startX)/3} ${startY + sign * curveHeight}, ${endX - (endX - startX)/3} ${startY + sign * curveHeight}, ${endX} ${startY}`;
        }
        
        // Create the colored curved path
        const colorfulPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        colorfulPath.setAttribute('d', pathData);
        colorfulPath.setAttribute('fill', 'none');
        colorfulPath.setAttribute('stroke', `url(#line-gradient-${i % colors.length})`);
        colorfulPath.setAttribute('stroke-width', '3');
        colorfulPath.setAttribute('stroke-linecap', 'round');
        colorfulPath.setAttribute('opacity', '0.7');
        colorfulPath.classList.add('colorful-path');
        
        // Add glow effect for colorful path
        const filterId = `glow-${i}`;
        const filter = document.createElementNS('http://www.w3.org/2000/svg', 'filter');
        filter.setAttribute('id', filterId);
        filter.setAttribute('x', '-20%');
        filter.setAttribute('y', '-20%');
        filter.setAttribute('width', '140%');
        filter.setAttribute('height', '140%');
        
        const feGaussianBlur = document.createElementNS('http://www.w3.org/2000/svg', 'feGaussianBlur');
        feGaussianBlur.setAttribute('stdDeviation', '1.5');
        feGaussianBlur.setAttribute('result', 'blur');
        filter.appendChild(feGaussianBlur);
        
        defs.appendChild(filter);
        colorfulPath.setAttribute('filter', `url(#${filterId})`);
        
        svg.appendChild(colorfulPath);
        
        // Add circle in the middle of the path
        const midCircle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        midCircle.setAttribute('cx', isMobile ? midX : midX);
        midCircle.setAttribute('cy', isMobile ? midY : midY);
        midCircle.setAttribute('r', '5');
        midCircle.setAttribute('fill', 'white');
        midCircle.setAttribute('stroke', '#e0e0e0');
        midCircle.setAttribute('stroke-width', '2');
        midCircle.classList.add('mid-circle');
        
        const midCircleActive = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        midCircleActive.setAttribute('cx', isMobile ? midX : midX);
        midCircleActive.setAttribute('cy', isMobile ? midY : midY);
        midCircleActive.setAttribute('r', '6');
        midCircleActive.setAttribute('fill', `url(#line-gradient-${i % colors.length})`);
        midCircleActive.setAttribute('filter', `url(#${filterId})`);
        midCircleActive.classList.add('mid-circle-active');
        midCircleActive.style.opacity = (activeStep === i + 1 || activeStep === i + 2) ? '1' : '0';
        midCircleActive.style.transition = 'opacity 0.3s ease';
        
        svg.appendChild(midCircle);
        svg.appendChild(midCircleActive);
      }
    };
    
    drawConnections();
    
    // Redraw on window resize
    window.addEventListener('resize', drawConnections);
    return () => window.removeEventListener('resize', drawConnections);
  }, [activeStep, isMobile]);

  return (
    <section id="roadmap" className="w-full bg-white py-16 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">Workflow</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            From initial discovery to ongoing support, our agile process ensures your project is delivered efficiently and exceeds expectations.
          </p>
        </div>
        
        {/* Roadmap container - vertical on mobile, horizontal on desktop */}
        <div 
          ref={containerRef}
          className={`relative ${isMobile ? 'h-[800px]' : 'h-[300px]'} w-full mt-16`}
        >
          {/* Steps - row on desktop, column on mobile */}
          <div className={`${isMobile ? 'flex-col h-full' : 'top-[50%] -translate-y-1/2'} flex justify-between absolute w-full`}>
            {workflowSteps.map((step) => (
              <div 
                key={step.id}
                className="step-node relative z-10"
                onMouseEnter={() => handleMouseEnter(step.id)}
                onMouseLeave={handleMouseLeave}
              >
                {/* Circle */}
                <div 
                  className={`
                    w-16 h-16 md:w-20 md:h-20 mx-auto rounded-full flex items-center justify-center
                    transition-all duration-300 relative
                    ${step.id % 2 === 0 ? 'bg-gray-800' : 'bg-black'}
                    text-white text-2xl border border-gray-200
                    ${activeStep === step.id ? 'shadow-[0_0_15px_rgba(0,0,0,0.5)] scale-110' : 'shadow-md'}
                  `}
                >
                  <span role="img" aria-label={step.title}>{step.icon}</span>
                  
                  {/* Step number */}
                  <div className="absolute -top-2 -right-2 w-6 h-6 md:w-7 md:h-7 bg-white text-black rounded-full flex items-center justify-center text-sm font-bold border border-black">
                    {step.id}
                  </div>
                </div>
                
                {/* Title - below on desktop, right side on mobile */}
                <div className={`${isMobile ? 'ml-24 -mt-14' : 'mt-3'} text-center`}>
                  <h3 className={`
                    text-sm font-bold whitespace-nowrap
                    ${activeStep === step.id ? 'text-black' : 'text-gray-600'}
                    transition-all duration-300
                  `}>
                    {step.title}
                  </h3>
                </div>
                
                {/* Description - popup box */}
                <div className={`
                  absolute ${isMobile ? 'w-40 right-0 top-0' : 'w-48 left-1/2 -translate-x-1/2'} 
                  bg-white p-3 rounded-lg shadow-lg border border-gray-200
                  transition-all duration-300 text-center z-20
                  ${activeStep === step.id ? 'opacity-100' : 'opacity-0 pointer-events-none'}
                  ${!isMobile && (step.id <= 3 ? 'top-[120%]' : 'bottom-[120%]')}
                `}>
                  <p className="text-xs text-gray-600">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Roadmap; 
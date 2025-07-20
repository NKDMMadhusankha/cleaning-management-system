import React, { useEffect, useRef } from 'react';

const Services = () => {
  const servicesRef = useRef(null);
  const imageRef = useRef(null);
  const scrollRef = useRef(null);

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
        }
      });
    }, observerOptions);

    if (servicesRef.current) observer.observe(servicesRef.current);
    if (imageRef.current) observer.observe(imageRef.current);

    return () => observer.disconnect();
  }, []);

  // Auto-scroll effect for horizontal scrolling
  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    let animationId;
    let scrollPosition = 0;
    const scrollSpeed = 0.3; // Slower speed for better mobile experience

    const scroll = () => {
      scrollPosition += scrollSpeed;
      
      // Get the width of one complete set of services
      const itemWidth = 250; // Approximate width of each service item
      const totalWidth = services.length * itemWidth;
      
      // Reset to beginning when we've scrolled through the first set
      if (scrollPosition >= totalWidth) {
        scrollPosition = 0;
      }
      
      scrollContainer.scrollLeft = scrollPosition;
      animationId = requestAnimationFrame(scroll);
    };

    // Start the animation
    animationId = requestAnimationFrame(scroll);

    // Pause scrolling on hover/touch for better UX
    const pauseScroll = () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };

    const resumeScroll = () => {
      animationId = requestAnimationFrame(scroll);
    };

    // Add event listeners for pause/resume
    scrollContainer.addEventListener('mouseenter', pauseScroll);
    scrollContainer.addEventListener('mouseleave', resumeScroll);
    scrollContainer.addEventListener('touchstart', pauseScroll);
    scrollContainer.addEventListener('touchend', resumeScroll);

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
      scrollContainer.removeEventListener('mouseenter', pauseScroll);
      scrollContainer.removeEventListener('mouseleave', resumeScroll);
      scrollContainer.removeEventListener('touchstart', pauseScroll);
      scrollContainer.removeEventListener('touchend', resumeScroll);
    };
  }, []);

  const services = [
    {
      icon: (
        <svg className="w-8 h-8 text-[#8cc53f]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      ),
      title: "Retail Store or Complexes",
      bgColor: "bg-gradient-to-br from-yellow-50 to-orange-50",
      iconBg: "bg-yellow-100"
    },
    {
      icon: (
        <svg className="w-8 h-8 text-[#8cc53f]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      ),
      title: "Medical Office Cleaning",
      bgColor: "bg-gradient-to-br from-blue-50 to-indigo-50",
      iconBg: "bg-blue-100"
    },
    {
      icon: (
        <svg className="w-8 h-8 text-[#8cc53f]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      title: "Office Cleaning Service",
      bgColor: "bg-gradient-to-br from-green-50 to-emerald-50",
      iconBg: "bg-green-100"
    },
    {
      icon: (
        <svg className="w-8 h-8 text-[#8cc53f]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
        </svg>
      ),
      title: "Residential Home Cleaning",
      bgColor: "bg-gradient-to-br from-purple-50 to-pink-50",
      iconBg: "bg-purple-100"
    },
    {
      icon: (
        <svg className="w-8 h-8 text-[#8cc53f]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      ),
      title: "Commercial Building Cleaning",
      bgColor: "bg-gradient-to-br from-teal-50 to-cyan-50",
      iconBg: "bg-teal-100"
    },
    {
      icon: (
        <svg className="w-8 h-8 text-[#8cc53f]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      title: "Deep Cleaning Services",
      bgColor: "bg-gradient-to-br from-rose-50 to-red-50",
      iconBg: "bg-rose-100"
    }
  ];

  // Duplicate services for seamless loop
  const duplicatedServices = [...services, ...services];

  return (
    <section className="bg-green-50 py-12 sm:py-16 md:py-20 relative overflow-hidden">
      {/* Background decorative elements - hidden on mobile */}
      <div className="hidden md:block absolute top-10 left-10 w-16 h-16 text-yellow-400 opacity-20">
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
        </svg>
      </div>
      <div className="hidden lg:block absolute top-20 left-20 w-8 h-8 text-yellow-400 opacity-30">
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
        </svg>
      </div>

      {/* Bottom decorative elements - adjusted for mobile */}
      <div className="absolute bottom-5 md:bottom-10 left-0 w-16 md:w-32 h-16 md:h-32 text-[#8cc53f] opacity-10">
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
        </svg>
      </div>
      <div className="hidden sm:block absolute bottom-10 md:bottom-20 left-5 md:left-10 w-6 md:w-8 h-6 md:h-8 text-[#8cc53f] opacity-20">
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
        </svg>
      </div>

      {/* Main curved background - responsive */}
      <div className="absolute bottom-0 right-0 w-1/3 sm:w-1/2 h-full bg-gradient-to-l from-[#8cc53f]/10 to-transparent rounded-l-[4rem] md:rounded-l-[8rem]"></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <div className="opacity-0 translate-y-8 transition-all duration-1000 ease-out order-1 lg:order-1" ref={servicesRef}>
            <div className="flex items-center gap-2 mb-4 md:mb-6">
              <div className="w-8 md:w-12 h-0.5 bg-[#8cc53f]"></div>
              <span className="text-[#8cc53f] font-medium text-xs md:text-sm tracking-wider uppercase">OUR SERVICES</span>
            </div>
            
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[#202020] leading-tight mb-4 md:mb-6 lg:mb-8">
              The Services We Provide
              <span className="block">For Our Customer</span>
            </h2>
            
            <p className="text-gray-600 leading-relaxed mb-6 md:mb-8 lg:mb-12 text-sm sm:text-base lg:text-lg">
              These services are designed to maintain cleanliness, hygiene, and 
              overall appearance of homes, offering convenience to homeowners 
              and ensuring a healthy living environment. Routine cleaning tasks 
              performed weekly or bi-weekly.
            </p>

            {/* Auto-scrolling Services List */}
            <div className="overflow-hidden rounded-xl md:rounded-2xl bg-white p-2 sm:p-3 md:p-4 shadow-inner">
              <div 
                ref={scrollRef}
                className="flex space-x-2 sm:space-x-3 md:space-x-4 overflow-x-hidden will-change-scroll"
                style={{ 
                  scrollBehavior: 'auto',
                  whiteSpace: 'nowrap',
                  WebkitOverflowScrolling: 'touch'
                }}
              >
                {duplicatedServices.map((service, index) => (
                  <div 
                    key={index} 
                    className={`${service.bgColor} rounded-lg md:rounded-xl p-2 sm:p-3 md:p-4 flex items-center gap-2 md:gap-3 min-w-[220px] sm:min-w-[250px] md:min-w-[300px] shadow-md hover:shadow-lg transition-all duration-300 group cursor-pointer flex-shrink-0`}
                  >
                    <div className={`${service.iconBg} w-8 sm:w-10 md:w-12 h-8 sm:h-10 md:h-12 rounded-lg md:rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                      <div className="w-5 sm:w-6 md:w-8 h-5 sm:h-6 md:h-8 text-[#8cc53f]">
                        {React.cloneElement(service.icon, { 
                          className: "w-full h-full text-[#8cc53f]" 
                        })}
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm sm:text-base md:text-lg font-bold text-[#202020] group-hover:text-[#8cc53f] transition-colors duration-300 truncate">
                        {service.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-gray-600">Professional cleaning</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Content - Image */}
          <div className="relative opacity-0 translate-x-8 transition-all duration-1000 ease-out delay-500 order-2 lg:order-2" ref={imageRef}>
            <div className="relative overflow-hidden w-full sm:w-4/5 md:w-3/4 mx-auto">
              <img 
                src={require('../Assets/service.jpg')} 
                alt="Office Cleaning Service" 
                className="w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] object-cover rounded-lg md:rounded-xl"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Custom CSS for animations */}
      <style jsx>{`
        .animate-in {
          opacity: 1 !important;
          transform: translateY(0) translateX(0) !important;
        }
        
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        @media (max-width: 640px) {
          .container {
            padding-left: 1rem;
            padding-right: 1rem;
          }
        }
      `}</style>
    </section>
  );
};

export default Services;

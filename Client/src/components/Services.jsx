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

    const scroll = () => {
      scrollContainer.scrollLeft += 0.5;
      
      // Reset to beginning when we've scrolled through the first set
      if (scrollContainer.scrollLeft >= scrollContainer.scrollWidth / 2) {
        scrollContainer.scrollLeft = 0;
      }
    };

    const intervalId = setInterval(scroll, 20); // Smoother animation

    return () => clearInterval(intervalId);
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
    <section className="bg-slate-100 py-20 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-10 left-10 w-16 h-16 text-yellow-400 opacity-20">
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
        </svg>
      </div>
      <div className="absolute top-20 left-20 w-8 h-8 text-yellow-400 opacity-30">
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
        </svg>
      </div>

      {/* Bottom decorative elements */}
      <div className="absolute bottom-10 left-0 w-32 h-32 text-[#8cc53f] opacity-10">
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
        </svg>
      </div>
      <div className="absolute bottom-20 left-10 w-8 h-8 text-[#8cc53f] opacity-20">
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
        </svg>
      </div>

      {/* Main curved background */}
      <div className="absolute bottom-0 right-0 w-1/2 h-full bg-gradient-to-l from-[#8cc53f]/10 to-transparent rounded-l-[8rem]"></div>

      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div className="opacity-0 translate-y-8 transition-all duration-1000 ease-out" ref={servicesRef}>
            <div className="flex items-center gap-2 mb-6">
              <div className="w-12 h-0.5 bg-[#8cc53f]"></div>
              <span className="text-[#8cc53f] font-medium text-sm tracking-wider uppercase">OUR SERVICES</span>
            </div>
            
            <h2 className="text-4xl lg:text-5xl font-bold text-[#202020] leading-tight mb-8">
              The Services We Provide
              <span className="block">For Our Customer</span>
            </h2>
            
            <p className="text-gray-600 leading-relaxed mb-12 text-lg">
              These services are designed to maintain cleanliness, hygiene, and 
              overall appearance of homes, offering convenience to homeowners 
              and ensuring a healthy living environment. Routine cleaning tasks 
              performed weekly or bi-weekly.
            </p>

            {/* Auto-scrolling Services List */}
            <div className="overflow-hidden rounded-2xl bg-white p-4 shadow-inner">
                  <div 
                ref={scrollRef}
                className="flex space-x-4 overflow-x-hidden"
                style={{ 
                  scrollBehavior: 'auto',
                  whiteSpace: 'nowrap'
                }}
              >
                {duplicatedServices.map((service, index) => (
                  <div 
                    key={index} 
                    className={`${service.bgColor} rounded-xl p-4 flex items-center gap-3 min-w-[300px] shadow-md hover:shadow-lg transition-all duration-300 group cursor-pointer flex-shrink-0`}
                  >
                    <div className={`${service.iconBg} w-12 h-12 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                      {service.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-[#202020] group-hover:text-[#8cc53f] transition-colors duration-300">
                        {service.title}
                      </h3>
                      <p className="text-sm text-gray-600">Professional cleaning</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Content - Image */}
          <div className="relative opacity-0 translate-x-8 transition-all duration-1000 ease-out delay-500" ref={imageRef}>
            <div className="relative overflow-hidden">
              <img 
                src={require('../Assets/service.jpg')} 
                alt="Office Cleaning Service" 
                className="w-full h-[600px] object-cover hover:scale-105 transition-transform duration-700"
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
      `}</style>
    </section>
  );
};

export default Services;

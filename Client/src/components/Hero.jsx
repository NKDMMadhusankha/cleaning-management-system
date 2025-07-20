import React, { useEffect, useRef } from 'react';
import HeroBg from '../Assets/Hero_Bg.png';

const Hero = () => {
  const heroRef = useRef(null);
  const imageRef = useRef(null);
  const statsRef = useRef(null);

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

    if (heroRef.current) observer.observe(heroRef.current);
    if (imageRef.current) observer.observe(imageRef.current);
    if (statsRef.current) observer.observe(statsRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* Hero Section */}
      <section className="bg-white py-16 sm:py-20 md:py-24 lg:py-28 xl:py-36 relative overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-start gap-8 sm:gap-12 lg:gap-16">
            {/* Left Content */}
            <div className="w-full lg:w-1/2">
              <div className="relative">
                <div className="relative z-10 opacity-0 translate-y-8 transition-all duration-1000 ease-out" ref={heroRef}>
                  <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-[#202020] leading-tight mb-6 sm:mb-8">
                    Professional 
                    <span className="block text-[#8cc53f] mt-1 sm:mt-2">
                      Cleaning Services
                    </span>
                    <span className="block text-2xl sm:text-3xl md:text-4xl lg:text-5xl mt-1 sm:mt-2">
                      for Your Home
                    </span>
                  </h1>
                  
                  <p className="text-base sm:text-lg text-gray-600 mb-6 sm:mb-8 leading-relaxed">
                    Experience spotless cleaning with our professional team. 
                    Safe, reliable, and thorough cleaning services for your home and office.
                  </p>
                  
                  <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-8 sm:mb-12">
                    <a
                      href="#booking"
                      className="bg-[#8cc53f] text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full hover:bg-[#7ab534] transition-all duration-300 hover:scale-105 hover:shadow-lg font-semibold text-base sm:text-lg inline-block text-center"
                    >
                      BOOK NOW
                    </a>
                    <button className="bg-transparent border-2 border-[#202020] text-[#202020] px-6 sm:px-8 py-3 sm:py-4 rounded-full hover:bg-[#202020] hover:text-white transition-all duration-300 hover:scale-105 font-semibold text-base sm:text-lg">
                      Learn More
                    </button>
                  </div>
                  
                  {/* Features */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                    <div className="flex items-center gap-3 transform transition-all duration-300 hover:scale-105">
                      <div className="w-5 h-5 sm:w-6 sm:h-6 bg-[#8cc53f] rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-white text-xs sm:text-sm">✓</span>
                      </div>
                      <span className="text-[#202020] font-medium text-sm sm:text-base">Kid & Pet Safe</span>
                    </div>
                    <div className="flex items-center gap-3 transform transition-all duration-300 hover:scale-105">
                      <div className="w-5 h-5 sm:w-6 sm:h-6 bg-[#8cc53f] rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-white text-xs sm:text-sm">✓</span>
                      </div>
                      <span className="text-[#202020] font-medium text-sm sm:text-base">Eco-Friendly</span>
                    </div>
                    <div className="flex items-center gap-3 transform transition-all duration-300 hover:scale-105">
                      <div className="w-5 h-5 sm:w-6 sm:h-6 bg-[#8cc53f] rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-white text-xs sm:text-sm">✓</span>
                      </div>
                      <span className="text-[#202020] font-medium text-sm sm:text-base">Insured & Bonded</span>
                    </div>
                    <div className="flex items-center gap-3 transform transition-all duration-300 hover:scale-105">
                      <div className="w-5 h-5 sm:w-6 sm:h-6 bg-[#8cc53f] rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-white text-xs sm:text-sm">✓</span>
                      </div>
                      <span className="text-[#202020] font-medium text-sm sm:text-base">Same Day Service</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Content - Image */}
            <div className="w-full lg:w-1/2 mt-8 lg:mt-0 lg:absolute lg:right-0 lg:top-0 lg:bottom-0 lg:flex lg:items-center">
              <div className="relative lg:ml-48 opacity-0 translate-x-8 transition-all duration-1000 ease-out delay-300" ref={imageRef}>
                <img 
                  src={HeroBg} 
                  alt="Professional Cleaning Service" 
                  className="w-full h-auto max-h-[300px] sm:max-h-[400px] md:max-h-[500px] lg:h-auto lg:max-h-[580px] object-cover object-center hover:scale-105 transition-transform duration-500 rounded-lg lg:rounded-none"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Custom CSS for animations */}
      <style jsx>{`
        .animate-in {
          opacity: 1 !important;
          transform: translateY(0) translateX(0) !important;
        }
      `}</style>
    </>
  );
};

export default Hero;

import React, { useEffect, useRef, useState } from 'react';
import HeroBg from '../Assets/Hero_Bg.png';

const Hero = () => {
  const heroRef = useRef(null);
  const imageRef = useRef(null);
  const statsRef = useRef(null);
  
  // State for auto-scrolling text
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const words = ['Home', 'Office', 'Business', 'Space', 'Building'];

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

  // Modern slide-up animation effect
  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true);
      
      setTimeout(() => {
        setCurrentWordIndex((prevIndex) => 
          prevIndex === words.length - 1 ? 0 : prevIndex + 1
        );
        setIsAnimating(false);
      }, 300); // Animation duration
      
    }, 3000); // Change word every 3 seconds

    return () => clearInterval(interval);
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
                    <span className="block text-2xl sm:text-3xl md:text-4xl lg:text-5xl mt-1 sm:mt-2 relative">
                      for Your 
                      <span className="inline-block ml-2 relative">
                        <span 
                          className={`text-[#8cc53f] font-bold transition-all duration-300 ease-in-out transform ${
                            isAnimating 
                              ? 'opacity-0 -translate-y-full scale-95' 
                              : 'opacity-100 translate-y-0 scale-100'
                          }`}
                          style={{ 
                            display: 'inline-block',
                            minWidth: '180px',
                            textAlign: 'left',
                            height: 'auto',
                            lineHeight: '1.2'
                          }}
                        >
                          {words[currentWordIndex]}
                        </span>
                      </span>
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
                      <span className="text-[#202020] font-medium text-sm sm:text-base">Professional Equipment</span>
                    </div>
                    <div className="flex items-center gap-3 transform transition-all duration-300 hover:scale-105">
                      <div className="w-5 h-5 sm:w-6 sm:h-6 bg-[#8cc53f] rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-white text-xs sm:text-sm">✓</span>
                      </div>
                      <span className="text-[#202020] font-medium text-sm sm:text-base">Trained Staff</span>
                    </div>
                    <div className="flex items-center gap-3 transform transition-all duration-300 hover:scale-105">
                      <div className="w-5 h-5 sm:w-6 sm:h-6 bg-[#8cc53f] rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-white text-xs sm:text-sm">✓</span>
                      </div>
                      <span className="text-[#202020] font-medium text-sm sm:text-base">Quality Guaranteed</span>
                    </div>
                    <div className="flex items-center gap-3 transform transition-all duration-300 hover:scale-105">
                      <div className="w-5 h-5 sm:w-6 sm:h-6 bg-[#8cc53f] rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-white text-xs sm:text-sm">✓</span>
                      </div>
                      <span className="text-[#202020] font-medium text-sm sm:text-base">Flexible Scheduling</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Content - Image */}
            <div className="w-full lg:w-1/2 mt-8 lg:mt-0 lg:absolute lg:right-0 lg:top-0 lg:bottom-0 lg:flex lg:items-center">
              <div className="relative lg:ml-48 opacity-0 translate-x-8 transition-all duration-1000 ease-out delay-300" ref={imageRef}>
                {/* Geometric shapes */}
                <div className="absolute -top-8 -left-8 w-16 h-16 border-2 border-[#8cc53f] rotate-45 animate-spin-slow opacity-30"></div>
                <div className="absolute top-1/3 -right-4 w-8 h-8 bg-gradient-to-br from-yellow-400 to-orange-400 animate-bounce-slow opacity-60"></div>
                <div className="absolute -bottom-4 left-1/4 w-6 h-6 bg-gradient-to-tr from-blue-400 to-purple-500 rounded-full animate-pulse-custom opacity-50"></div>
                
                {/* Orbiting dots */}
                <div className="absolute top-1/2 left-1/2 w-24 h-24 -translate-x-12 -translate-y-12">
                  <div className="absolute w-3 h-3 bg-[#8cc53f] rounded-full animate-orbit-1"></div>
                  <div className="absolute w-2 h-2 bg-pink-400 rounded-full animate-orbit-2"></div>
                  <div className="absolute w-2.5 h-2.5 bg-cyan-400 rounded-full animate-orbit-3"></div>
                </div>
                
                {/* Light beams */}
                <div className="absolute inset-0 animate-light-sweep opacity-0">
                  <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-[#8cc53f]/50 to-transparent"></div>
                  <div className="absolute bottom-0 right-0 w-0.5 h-full bg-gradient-to-t from-transparent via-yellow-400/40 to-transparent"></div>
                </div>
                
                {/* Morphing shapes */}
                <div className="absolute -top-6 right-1/3 w-12 h-12 bg-gradient-to-br from-purple-400/30 to-pink-400/30 animate-morph-1 rounded-full"></div>
                <div className="absolute bottom-1/4 -left-10 w-10 h-10 bg-gradient-to-tl from-green-400/25 to-blue-400/25 animate-morph-2"></div>
                
                <img 
                  src={HeroBg} 
                  alt="Professional Cleaning Service" 
                  className="w-full h-auto max-h-[300px] sm:max-h-[400px] md:max-h-[500px] lg:h-auto lg:max-h-[580px] object-cover object-center hover:scale-105 transition-transform duration-500 rounded-lg lg:rounded-none relative z-10"
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
        
        @keyframes slideInUp {
          0% {
            transform: translateY(100%);
            opacity: 0;
          }
          100% {
            transform: translateY(0);
            opacity: 1;
          }
        }
        
        @keyframes slideOutUp {
          0% {
            transform: translateY(0);
            opacity: 1;
          }
          100% {
            transform: translateY(-100%);
            opacity: 0;
          }
        }
        
        .word-enter {
          animation: slideInUp 0.3s ease-out forwards;
        }
        
        .word-exit {
          animation: slideOutUp 0.3s ease-in forwards;
        }
        
        /* Super cool effects */
        @keyframes spin-slow {
          0% { transform: rotate(45deg); }
          100% { transform: rotate(405deg); }
        }
        
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0px) scale(1); }
          50% { transform: translateY(-20px) scale(1.1); }
        }
        
        @keyframes pulse-custom {
          0%, 100% { transform: scale(1); opacity: 0.5; }
          50% { transform: scale(1.5); opacity: 0.8; }
        }
        
        @keyframes orbit-1 {
          0% { transform: rotate(0deg) translateX(40px) rotate(0deg); }
          100% { transform: rotate(360deg) translateX(40px) rotate(-360deg); }
        }
        
        @keyframes orbit-2 {
          0% { transform: rotate(120deg) translateX(30px) rotate(-120deg); }
          100% { transform: rotate(480deg) translateX(30px) rotate(-480deg); }
        }
        
        @keyframes orbit-3 {
          0% { transform: rotate(240deg) translateX(35px) rotate(-240deg); }
          100% { transform: rotate(600deg) translateX(35px) rotate(-600deg); }
        }
        
        @keyframes light-sweep {
          0% { opacity: 0; }
          10% { opacity: 0.6; }
          20% { opacity: 0; }
          100% { opacity: 0; }
        }
        
        @keyframes morph-1 {
          0%, 100% { 
            border-radius: 50%; 
            transform: scale(1) rotate(0deg); 
          }
          25% { 
            border-radius: 0%; 
            transform: scale(1.2) rotate(90deg); 
          }
          50% { 
            border-radius: 50%; 
            transform: scale(0.8) rotate(180deg); 
          }
          75% { 
            border-radius: 20%; 
            transform: scale(1.1) rotate(270deg); 
          }
        }
        
        @keyframes morph-2 {
          0%, 100% { 
            border-radius: 0%; 
            transform: scale(1) skew(0deg); 
          }
          33% { 
            border-radius: 50%; 
            transform: scale(1.3) skew(15deg); 
          }
          66% { 
            border-radius: 25%; 
            transform: scale(0.7) skew(-15deg); 
          }
        }
        
        .animate-spin-slow { animation: spin-slow 8s linear infinite; }
        .animate-bounce-slow { animation: bounce-slow 3s ease-in-out infinite 1s; }
        .animate-pulse-custom { animation: pulse-custom 2s ease-in-out infinite 2s; }
        .animate-orbit-1 { animation: orbit-1 10s linear infinite; }
        .animate-orbit-2 { animation: orbit-2 8s linear infinite; }
        .animate-orbit-3 { animation: orbit-3 12s linear infinite; }
        .animate-light-sweep { animation: light-sweep 6s ease-in-out infinite 3s; }
        .animate-morph-1 { animation: morph-1 7s ease-in-out infinite 1s; }
        .animate-morph-2 { animation: morph-2 9s ease-in-out infinite 4s; }
      `}</style>
    </>
  );
};

export default Hero;

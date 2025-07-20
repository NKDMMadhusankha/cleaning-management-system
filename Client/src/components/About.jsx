import React, { useEffect, useRef, useState } from 'react';
import AboutBg from '../Assets/aboutus_bg.jpg';

const About = () => {
  const aboutRef = useRef(null);
  const statsRef = useRef(null);
  const servicesRef = useRef(null);
  
  // State for counting animations
  const [counts, setCounts] = useState({
    projects: 0,
    customers: 0,
    members: 0,
    awards: 0
  });
  
  const [hasAnimated, setHasAnimated] = useState(false);

  // Counter animation function
  const animateCount = (target, current, setter) => {
    if (current < target) {
      const increment = Math.ceil(target / 100);
      const newValue = Math.min(current + increment, target);
      setter(newValue);
      
      setTimeout(() => {
        animateCount(target, newValue, setter);
      }, 50);
    }
  };

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
          
          // Start counting animation when stats section comes into view
          if (entry.target === statsRef.current && !hasAnimated) {
            setHasAnimated(true);
            
            // Start all counters
            setTimeout(() => {
              animateCount(150, 0, (val) => setCounts(prev => ({ ...prev, projects: val })));
            }, 300);
            
            setTimeout(() => {
              animateCount(250, 0, (val) => setCounts(prev => ({ ...prev, customers: val })));
            }, 500);
            
            setTimeout(() => {
              animateCount(25, 0, (val) => setCounts(prev => ({ ...prev, members: val })));
            }, 700);
            
            setTimeout(() => {
              animateCount(5, 0, (val) => setCounts(prev => ({ ...prev, awards: val })));
            }, 900);
          }
        }
      });
    }, observerOptions);

    if (aboutRef.current) observer.observe(aboutRef.current);
    if (statsRef.current) observer.observe(statsRef.current);
    if (servicesRef.current) observer.observe(servicesRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <section className="bg-gray-50 py-20 relative overflow-hidden  rounded-[rem]">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div className="opacity-0 translate-y-8 transition-all duration-1000 ease-out" ref={aboutRef}>
            <div className="flex items-center gap-2 mb-6">
              <div className="w-12 h-0.5 bg-[#8cc53f]"></div>
              <span className="text-[#8cc53f] font-medium text-sm tracking-wider uppercase">ABOUT US</span>
            </div>
            
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight mb-8">
              One Stop Commercial
              <span className="block">Cleaning Company</span>
            </h2>
            
            <p className="text-gray-600 leading-relaxed mb-8 text-lg">
              House cleaning services provide professional cleaning of residential 
              spaces. These services are designed to maintain cleanliness, hygiene, 
              and overall appearance of homes, offering convenience to homeowners 
              and ensuring a healthy living environment. Intensive cleaning targeting 
              areas often neglected in regular cleaning, such as behind appliances, 
              under furniture, and inside cabinets.
            </p>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-8 mb-12 opacity-0 translate-y-8 transition-all duration-1000 ease-out delay-300" ref={statsRef}>
              <div className="text-center lg:text-left">
                <div className="text-4xl lg:text-5xl font-bold text-gray-900 mb-2">
                  {counts.projects}<span className="text-[#8cc53f]">+</span>
                </div>
                <p className="text-gray-500 text-sm">Cleaning Project Finish</p>
              </div>
              
              <div className="text-center lg:text-left">
                <div className="text-4xl lg:text-5xl font-bold text-gray-900 mb-2">
                  {counts.customers}<span className="text-[#8cc53f]">+</span>
                </div>
                <p className="text-gray-500 text-sm">Satisfied Our Customers</p>
              </div>
              
              <div className="text-center lg:text-left">
                <div className="text-4xl lg:text-5xl font-bold text-gray-900 mb-2">
                  {counts.members}<span className="text-[#8cc53f]">+</span>
                </div>
                <p className="text-gray-500 text-sm">Expert Members</p>
              </div>
              
              <div className="text-center lg:text-left">
                <div className="text-4xl lg:text-5xl font-bold text-gray-900 mb-2">
                  {counts.awards}<span className="text-[#8cc53f]">+</span>
                </div>
                <p className="text-gray-500 text-sm">Company Award Winner</p>
              </div>
            </div>
          </div>

          {/* Right Content - Image */}
          <div className="relative opacity-0 translate-x-8 transition-all duration-1000 ease-out delay-500" ref={servicesRef}>
            <div className="relative rounded-2xl overflow-hidden h-full">
              <img 
                src={AboutBg} 
                alt="Professional Cleaning Service" 
                className="w-full h-full object-cover animate-roll-slow"
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
        
        @keyframes roll-slow {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        .animate-roll-slow {
          animation: roll-slow 90s linear infinite;
        }
      `}</style>
    </section>
  );
};

export default About;

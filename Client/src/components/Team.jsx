import React, { useEffect, useRef } from 'react';

const Team = () => {
  const teamRef = useRef(null);
  const cardsRef = useRef(null);

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

    if (teamRef.current) observer.observe(teamRef.current);
    if (cardsRef.current) observer.observe(cardsRef.current);

    return () => observer.disconnect();
  }, []);

  const teamMembers = [
    {
      name: "Miler Michel",
      role: "Home Cleaner",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      bgColor: "bg-gradient-to-br from-purple-200 to-blue-200"
    },
    {
      name: "Cary Simran",
      role: "Home Cleaner",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      bgColor: "bg-gradient-to-br from-yellow-200 to-orange-200"
    },
    {
      name: "Alex Fluran",
      role: "Home Cleaner",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      bgColor: "bg-gradient-to-br from-green-200 to-teal-200"
    },
    {
      name: "Hima Corera",
      role: "Home Cleaner",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      bgColor: "bg-gradient-to-br from-pink-200 to-rose-200"
    }
  ];

  return (
    <section className="bg-gray-50 py-20 relative overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16 opacity-0 translate-y-8 transition-all duration-1000 ease-out" ref={teamRef}>
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="w-12 h-0.5 bg-[#8cc53f]"></div>
            <span className="text-[#8cc53f] font-medium text-sm tracking-wider uppercase">TEAM MEMBERS</span>
            <div className="w-12 h-0.5 bg-[#8cc53f]"></div>
          </div>
          
          <h2 className="text-4xl lg:text-5xl font-bold text-[#202020] leading-tight">
            Meet Cleaning Expert
          </h2>
        </div>

        {/* Team Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 opacity-0 translate-y-8 transition-all duration-1000 ease-out delay-300" ref={cardsRef}>
          {teamMembers.map((member, index) => (
            <div key={index} className="group cursor-pointer">
              <div className={`relative ${member.bgColor} rounded-t-[3rem] rounded-b-[3rem] hover:scale-105 transition-all duration-500 overflow-hidden h-[450px] flex flex-col`}>
                {/* Member Image - Fixed height for consistency */}
                <div className="relative h-80 overflow-hidden rounded-t-[3rem]">
                  <img 
                    src={member.image} 
                    alt={member.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  
                  {/* Plus Icon - Overlays on the image */}
                  <div className="absolute top-6 right-6 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center group-hover:bg-white transition-colors duration-300 shadow-lg z-10">
                    <span className="text-gray-700 text-2xl font-light">+</span>
                  </div>
                </div>

                {/* Member Info - Fixed bottom section */}
                <div className="text-center p-6 pb-8 flex-1 flex flex-col justify-center">
                  <h3 className="text-2xl font-bold text-[#202020] mb-2 group-hover:text-[#8cc53f] transition-colors duration-300">
                    {member.name}
                  </h3>
                  <p className="text-gray-600 text-base font-medium">
                    {member.role}
                  </p>
                </div>

              </div>
            </div>
          ))}
        </div>

       
      </div>

      {/* Custom CSS for animations */}
      <style jsx>{`
        .animate-in {
          opacity: 1 !important;
          transform: translateY(0) translateX(0) !important;
        }
      `}</style>
    </section>
  );
};

export default Team;

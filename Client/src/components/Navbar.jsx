import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-white border-b border-gray-100 py-4">
      <div className="container mx-auto px-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-3">
         
          <div>
            <h1 className="text-xl font-bold text-[#202020]">CleanBee</h1>
            <p className="text-xs text-gray-400">Professional Cleaning</p>
          </div>
        </Link>
        
        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-8">
          <nav className="flex items-center space-x-6">
            <a href="#services" className="text-[#202020] hover:text-[#8cc53f] transition-colors text-sm font-medium">
              Services
            </a>
            <a href="#about" className="text-[#202020] hover:text-[#8cc53f] transition-colors text-sm font-medium">
              About
            </a>
            <a href="#booking" className="text-[#202020] hover:text-[#8cc53f] transition-colors text-sm font-medium">
              Book Now
            </a>
            <Link to="/register" className="text-[#202020] hover:text-[#8cc53f] transition-colors text-sm font-medium">
              Register
            </Link>
            <a href="#contact" className="text-[#202020] hover:text-[#8cc53f] transition-colors text-sm font-medium">
              Contact
            </a>
          </nav>
          
          <div className="flex items-center space-x-6">
            
            <a
              href="#booking"
              className="bg-[#8cc53f] text-white px-6 py-2 rounded-full hover:bg-[#7ab534] transition-colors text-sm font-medium"
            >
              BOOK NOW
            </a>
          </div>
        </div>
        
        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button className="text-[#202020] hover:text-[#8cc53f] transition-colors p-2">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

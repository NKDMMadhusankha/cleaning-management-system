import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../App';

const Navbar = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const navigate = useNavigate();
  const { isLoggedIn, userRole, logout } = useAuth();

  useEffect(() => {
    // Close dropdown when clicking outside
    const handleClickOutside = (event) => {
      if (showDropdown && !event.target.closest('.relative')) {
        setShowDropdown(false);
      }
      if (showMobileMenu && !event.target.closest('.md\\:hidden')) {
        setShowMobileMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showDropdown, showMobileMenu]);

  const handleProfileClick = () => {
    if (userRole === 'admin') {
      navigate('/portal');
    } else {
      navigate('/profile');
    }
    setShowDropdown(false);
    setShowMobileMenu(false);
  };

  const handleLogout = () => {
    logout();
    setShowDropdown(false);
    setShowMobileMenu(false);
    navigate('/');
  };

  return (
    <nav className="bg-white border-b border-gray-100 py-4 relative">
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
            <Link to="/login" className="text-[#202020] hover:text-[#8cc53f] transition-colors text-sm font-medium">
              Blog
            </Link>
            <a href="#contact" className="text-[#202020] hover:text-[#8cc53f] transition-colors text-sm font-medium">
              Contact
            </a>
          </nav>
          
          
          <div className="flex items-center space-x-6">
            {isLoggedIn ? (
              <div className="relative">
                <button
                  onClick={() => setShowDropdown(!showDropdown)}
                  className="flex items-center justify-center w-10 h-10 bg-[#8cc53f] text-white rounded-full hover:bg-[#7ab534] transition-colors focus:outline-none focus:ring-2 focus:ring-[#8cc53f] focus:ring-offset-2"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </button>
                
                {showDropdown && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-100">
                    <button
                      onClick={handleProfileClick}
                      className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                    >
                      <svg className="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      {userRole === 'admin' ? 'Admin Portal' : 'Profile'}
                    </button>
                    <button
                      onClick={handleLogout}
                      className="flex items-center w-full px-4 py-2 text-sm text-white bg-red-500 hover:bg-red-600 transition-colors"
                    >
                      <svg className="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                      </svg>
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to="/login"
                className="bg-[#8cc53f] text-white px-6 py-2 rounded-full hover:bg-[#7ab534] transition-colors text-sm font-medium"
              >
                Sign In
              </Link>
            )}
          </div>
        </div>
        
        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button 
            onClick={() => setShowMobileMenu(!showMobileMenu)}
            className="text-[#202020] hover:text-[#8cc53f] transition-colors p-2"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          
          {/* Mobile Menu Dropdown */}
          {showMobileMenu && (
            <div className="absolute top-full left-0 right-0 bg-white border-b border-gray-100 shadow-lg z-50">
              <div className="container mx-auto px-4 py-4 space-y-4">
                <a href="#services" className="block text-[#202020] hover:text-[#8cc53f] transition-colors text-sm font-medium">
                  Services
                </a>
                <a href="#about" className="block text-[#202020] hover:text-[#8cc53f] transition-colors text-sm font-medium">
                  About
                </a>
                <a href="#booking" className="block text-[#202020] hover:text-[#8cc53f] transition-colors text-sm font-medium">
                  Blog
                </a>
                <a href="#contact" className="block text-[#202020] hover:text-[#8cc53f] transition-colors text-sm font-medium">
                  Contact
                </a>
                <hr className="border-gray-200" />
                {isLoggedIn ? (
                  <>
                    <button
                      onClick={handleProfileClick}
                      className="flex items-center w-full text-left text-[#202020] hover:text-[#8cc53f] transition-colors text-sm font-medium"
                    >
                      <svg className="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      {userRole === 'admin' ? 'Admin Portal' : 'Profile'}
                    </button>
                    <button
                      onClick={handleLogout}
                      className="flex items-center w-full text-left text-white bg-red-500 hover:bg-red-600 transition-colors text-sm font-medium px-4 py-2 rounded"
                    >
                      <svg className="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                      </svg>
                      Logout
                    </button>
                  </>
                ) : (
                  <Link
                    to="/login"
                    className="block bg-[#8cc53f] text-white px-6 py-2 rounded-full hover:bg-[#7ab534] transition-colors text-sm font-medium text-center"
                    onClick={() => setShowMobileMenu(false)}
                  >
                    Sign In
                  </Link>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

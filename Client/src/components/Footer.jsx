import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-black text-white py-12 relative overflow-hidden">
      {/* Newsletter Section - Minimal */}
      <div className="container mx-auto px-4 mb-10">
        <div className="rounded-2xl p-6 flex flex-col items-center gap-3">
          <h3 className="text-xl font-semibold text-white mb-1">Get Update From Newsletter</h3>
          <p className="text-gray-400 mb-3 text-center">Regular inspections and feedback mechanisms</p>
          <form className="w-full max-w-md flex gap-2">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-3 py-2 rounded-l-lg bg-white text-gray-700 outline-none text-sm"
            />
            <button type="submit" className="px-4 py-2 rounded-r-lg bg-[#8cc53f] text-white font-medium hover:bg-[#7ab534] transition-colors duration-200">
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-4 gap-6 lg:gap-8">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-full flex items-center justify-center overflow-hidden">
                <img src="/favicon1.ico" alt="CleanBee Logo" className="w-full h-full object-contain" />
              </div>
              <span className="text-xl font-bold text-white">CleanBee</span>
            </div>
            <p className="text-gray-400 leading-relaxed mb-6 text-sm">
              House cleaning services provide professional cleaning of residential 
              spaces. These services homes,
            </p>
            <div className="space-y-3">
              <div>
                <h4 className="text-white font-semibold mb-2 text-sm">Working Hour:</h4>
                <div className="flex items-center gap-2 text-gray-400 text-sm">
                  <div className="w-2 h-2 bg-[#8cc53f] rounded-full"></div>
                  <span>Monday to Saturday: 9AM - 8PM</span>
                </div>
                <div className="text-gray-400 ml-4 text-sm">Sunday is Closed</div>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold text-lg mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-400 hover:text-[#8cc53f] transition-colors duration-300 flex items-center gap-2 text-sm">
                  <svg className="w-3 h-3 text-[#8cc53f]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-[#8cc53f] transition-colors duration-300 flex items-center gap-2 text-sm">
                  <svg className="w-3 h-3 text-[#8cc53f]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                  Our Services
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-[#8cc53f] transition-colors duration-300 flex items-center gap-2 text-sm">
                  <svg className="w-3 h-3 text-[#8cc53f]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                  Faq's
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-[#8cc53f] transition-colors duration-300 flex items-center gap-2 text-sm">
                  <svg className="w-3 h-3 text-[#8cc53f]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                  Our Project
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-[#8cc53f] transition-colors duration-300 flex items-center gap-2 text-sm">
                  <svg className="w-3 h-3 text-[#8cc53f]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                  Portfolio Us
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-[#8cc53f] transition-colors duration-300 flex items-center gap-2 text-sm">
                  <svg className="w-3 h-3 text-[#8cc53f]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                  Contact Us
                </a>
              </li>
            </ul>
          </div>

          {/* Our Services */}
          <div>
            <h4 className="text-white font-semibold text-lg mb-4">Our Services</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-400 hover:text-[#8cc53f] transition-colors duration-300 flex items-center gap-2 text-sm">
                  <svg className="w-3 h-3 text-[#8cc53f]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                  Residential Home Cleaning
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-[#8cc53f] transition-colors duration-300 flex items-center gap-2 text-sm">
                  <svg className="w-3 h-3 text-[#8cc53f]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                  Office Cleaning Service
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-[#8cc53f] transition-colors duration-300 flex items-center gap-2 text-sm">
                  <svg className="w-3 h-3 text-[#8cc53f]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                  Medical Office Cleaning
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-[#8cc53f] transition-colors duration-300 flex items-center gap-2 text-sm">
                  <svg className="w-3 h-3 text-[#8cc53f]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                  Commercial Building Cleaning
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-[#8cc53f] transition-colors duration-300 flex items-center gap-2 text-sm">
                  <svg className="w-3 h-3 text-[#8cc53f]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                  Retail Store Cleaning
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-[#8cc53f] transition-colors duration-300 flex items-center gap-2 text-sm">
                  <svg className="w-3 h-3 text-[#8cc53f]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                  Deep Cleaning Services
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Us */}
          <div>
            <h4 className="text-white font-semibold text-lg mb-4">Contact Us</h4>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-[#202020] rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <svg className="w-4 h-4 text-[#8cc53f]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <h5 className="text-white font-semibold mb-1 text-sm">Address</h5>
                  <p className="text-gray-400 text-sm">
                    No. 45, Galle Road, Wellawatte, Colombo 06, Western Province, Sri Lanka.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-[#202020] rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <svg className="w-4 h-4 text-[#8cc53f]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <h5 className="text-white font-semibold mb-1 text-sm">Call Us</h5>
                  <p className="text-gray-400 text-sm">+94 11 234 5678</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-[#202020] rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <svg className="w-4 h-4 text-[#8cc53f]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <h5 className="text-white font-semibold mb-1 text-sm">Email</h5>
                  <p className="text-gray-400 text-sm">info@cleanbee.com</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-gray-800 mt-10 pt-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-4">
            <div className="text-gray-400 text-sm">
              Copyright © 2025 CleanBee. All Rights Reserved.
            </div>
            <div className="flex items-center gap-3">
              <a href="#" className="w-8 h-8 bg-[#8cc53f] rounded-full flex items-center justify-center hover:bg-[#7ab534] transition-colors duration-300">
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                </svg>
              </a>
              <a href="#" className="w-8 h-8 bg-[#8cc53f] rounded-full flex items-center justify-center hover:bg-[#7ab534] transition-colors duration-300">
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.097.118.112.22.082.341-.09.369-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.746-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24.009c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001 12.017.001z"/>
                </svg>
              </a>
              <a href="#" className="w-8 h-8 bg-[#8cc53f] rounded-full flex items-center justify-center hover:bg-[#7ab534] transition-colors duration-300">
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
              <a href="#" className="w-8 h-8 bg-[#8cc53f] rounded-full flex items-center justify-center hover:bg-[#7ab534] transition-colors duration-300">
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.885 3.488A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

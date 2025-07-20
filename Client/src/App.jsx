import React, { useState, useEffect, createContext, useContext } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import Footer from './components/Footer';
import Loading from './components/Loading';
import BookingForm from './components/BookingForm';
import RegisterForm from './components/RegisterForm';
import Login from './components/Login';
import Profile from './components/Profile';
import AdminPortal from './components/AdminPortal';
import AdminRegister from './components/AdminRegister';
import { API_BASE_URL } from './config';

// Create Auth Context
const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [authState, setAuthState] = useState({
    isLoggedIn: false,
    userRole: null,
    user: null
  });

  const checkAuthStatus = async () => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const response = await fetch(`${API_BASE_URL}/api/auth/verify`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        const data = await response.json();
        if (data.success) {
          setAuthState({
            isLoggedIn: true,
            userRole: data.data.user.role,
            user: data.data.user
          });
        } else {
          localStorage.removeItem('token');
          setAuthState({
            isLoggedIn: false,
            userRole: null,
            user: null
          });
        }
      } catch (error) {
        localStorage.removeItem('token');
        setAuthState({
          isLoggedIn: false,
          userRole: null,
          user: null
        });
      }
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setAuthState({
      isLoggedIn: false,
      userRole: null,
      user: null
    });
  };

  useEffect(() => {
    // Check auth status on app load
    checkAuthStatus();
    
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000); // 3 seconds loading time

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <AuthContext.Provider value={{ ...authState, checkAuthStatus, logout }}>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Routes>
            <Route path="/" element={
              <>
                <Navbar />
                <Hero />
                <BookingForm />
                <About />
                <Services />
                <Footer />
              </>
            } />
            <Route path="/register" element={<RegisterForm />} />
            <Route path="/login" element={<Login />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/portal" element={<AdminPortal />} />

            {/* <Route path="/adminregister" element={<AdminRegister />} /> */}
          </Routes>
        </div>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;

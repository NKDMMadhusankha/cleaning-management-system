import React, { useState, useEffect } from 'react';
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

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
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
          <Route path="/adminregister" element={<AdminRegister />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/portal" element={<AdminPortal />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

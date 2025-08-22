import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import Navigation from '@/components/landing/Navigation';
import HeroSection from '@/components/landing/HeroSection';
import FeatureCards from '@/components/landing/FeatureCards';
import StatsSection from '@/components/landing/StatsSection';
import Footer from '@/components/Footer';
import { Helmet } from 'react-helmet-async';
import ContactUsCard from '@/components/ContactUsCard';

const InvitePage = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
    setIsMobileMenuOpen(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900"
    >
      <Helmet>
        <title>You're Invited! Join RE360</title>
        <meta name="description" content="You have been invited to join the RE360 revolution. Sign up now to supercharge your real estate business." />
      </Helmet>
      
      <Navigation 
        onNavigate={handleNavigation}
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
      />

      <div className="bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 text-white p-4 text-center">
        <p className="font-bold text-sm sm:text-base md:text-lg">
          You have been invited to join the RE360 revolution –{' '}
          <Link to="/register" className="underline hover:text-yellow-200 transition-colors duration-300">
            Click here to sign up now
          </Link>
        </p>
      </div>
      
      <HeroSection onNavigate={handleNavigation} />
      
      <section className="relative px-4 sm:px-6 lg:px-8 py-2">
        <div className="max-w-7xl mx-auto text-center">
          <motion.h2 
            initial={{ opacity: 0, y: 30 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4"
          >
            Power Up Your Pipeline –{' '}
            <span className="bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 bg-clip-text text-transparent">
              Free!
            </span>
          </motion.h2>
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }} 
            whileInView={{ opacity: 1, scale: 1 }} 
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-orange-500 mx-auto rounded-full mb-12"
          />
        </div>
      </section>
      
      <FeatureCards />
      <StatsSection />
      <ContactUsCard />
      <Footer />
    </motion.div>
  );
};

export default InvitePage;
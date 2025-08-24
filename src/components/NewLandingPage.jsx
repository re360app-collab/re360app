import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, DollarSign, Rocket } from 'lucide-react';
import Navigation from '@/components/landing/Navigation';
import HeroSection from '@/components/landing/HeroSection';
import Footer from '@/components/Footer';
import ContactUsCard from '@/components/ContactUsCard';

const NewLandingPage = () => {
  console.log("✅ Rendering NewLandingPage");

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section with Navigation on dark gradient */}
      <div className="bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
        <Navigation 
          onNavigate={handleNavigation}
          isMobileMenuOpen={isMobileMenuOpen}
          setIsMobileMenuOpen={setIsMobileMenuOpen}
        />
        <HeroSection onNavigate={handleNavigation} />
      </div>

      {/* Light CTA Section with gradient + background blobs */}
      <section className="relative py-24 px-6 text-center bg-gradient-to-br from-slate-50 via-blue-50 to-white overflow-hidden">
        {/* background blobs */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div 
            className="absolute top-10 left-1/4 w-72 h-72 bg-blue-200/40 rounded-full blur-3xl" 
            animate={{ scale: [1, 1.2, 1], rotate: [0, 360] }}
            transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          />
          <motion.div 
            className="absolute bottom-10 right-1/4 w-96 h-96 bg-yellow-200/40 rounded-full blur-3xl" 
            animate={{ scale: [1.2, 1, 1.2], rotate: [360, 0] }}
            transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
          />
        </div>

        <div className="relative max-w-5xl mx-auto">
          <motion.h2 
            initial={{ opacity: 0, y: 30 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-4xl sm:text-5xl font-bold mb-10 text-slate-900"
          >
            Unlock More Income with RE360
          </motion.h2>

          <p className="text-lg md:text-xl mb-16 max-w-3xl mx-auto text-slate-700">
            Not just real estate commissions — get paid on 
            <span className="text-blue-600 font-semibold"> refinances</span>, mortgages, and more.  
            And this is just the beginning — powerful new tools are on the way.
          </p>

          {/* Benefit cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-16">
            <div className="flex flex-col items-center bg-white p-8 rounded-xl shadow-lg border border-slate-200">
              <DollarSign className="w-10 h-10 text-green-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Earn More</h3>
              <p className="text-slate-600">Commissions + mortgage + refinance = more income streams.</p>
            </div>
            <div className="flex flex-col items-center bg-white p-8 rounded-xl shadow-lg border border-slate-200">
              <CheckCircle className="w-10 h-10 text-yellow-500 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Simple Process</h3>
              <p className="text-slate-600">We guide you through dual licensing step by step.</p>
            </div>
            <div className="flex flex-col items-center bg-white p-8 rounded-xl shadow-lg border border-slate-200">
              <Rocket className="w-10 h-10 text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Future Tools</h3>
              <p className="text-slate-600">AI marketing, smarter CRM, and more innovations coming soon.</p>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <button
              onClick={() => handleNavigation('/register')}
              className="bg-blue-600 text-white font-semibold px-10 py-4 rounded-lg shadow hover:bg-blue-500 transition text-lg"
            >
              Get Started Today
            </button>
            <button
              onClick={() => handleNavigation('/demo')}
              className="border border-blue-600 text-blue-600 px-10 py-4 rounded-lg hover:bg-blue-50 transition text-lg"
            >
              See How It Works
            </button>
          </div>
        </div>
      </section>

      {/* Contact Card + Footer back on dark gradient */}
      <div className="bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 mt-20">
        <ContactUsCard />
        <Footer />
      </div>
    </div>
  );
};

export default NewLandingPage;


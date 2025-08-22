import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Helmet } from 'react-helmet-async';
import ContactForm from '@/components/ContactForm';

const ContactUsCard = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);

  return (
    <>
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900"
      >
        <Helmet>
          <title>Contact Us - RE360App</title>
          <meta name="description" content="Get in touch with RE360App. We're here to help you revolutionize your real estate career." />
        </Helmet>
        <div className="max-w-4xl mx-auto glass-effect rounded-3xl p-8 md:p-12 shadow-2xl border border-white/10 overflow-hidden relative">
          <div className="absolute inset-0 z-0">
            <div className="absolute -top-10 -left-10 w-48 h-48 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
            <div className="absolute -bottom-8 -right-8 w-48 h-48 bg-yellow-500 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000"></div>
            <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-4000"></div>
          </div>
          
          <div className="relative z-10 text-center">
            <motion.h2
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-4xl md:text-5xl font-extrabold text-white mb-4 leading-tight"
            >
              Have Questions? <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">Let's Talk!</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-lg md:text-xl text-blue-200 mb-8 max-w-2xl mx-auto"
            >
              We're here to help you achieve your dual-licensing goals and supercharge your career. Reach out to our team anytime!
            </motion.p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="flex flex-col items-center p-6 bg-white/5 border border-white/10 rounded-2xl shadow-inner backdrop-blur-sm"
              >
                <Mail className="w-8 h-8 text-yellow-400 mb-3" />
                <p className="text-white text-lg font-semibold">Email Us</p>
                <p className="text-blue-200 text-sm">support@re360app.com</p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="flex flex-col items-center p-6 bg-white/5 border border-white/10 rounded-2xl shadow-inner backdrop-blur-sm"
              >
                <Phone className="w-8 h-8 text-yellow-400 mb-3" />
                <p className="text-white text-lg font-semibold">Call Us</p>
                <p className="text-blue-200 text-sm">+1 (888) 223-7810</p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="flex flex-col items-center p-6 bg-white/5 border border-white/10 rounded-2xl shadow-inner backdrop-blur-sm"
              >
                <MapPin className="w-8 h-8 text-yellow-400 mb-3" />
                <p className="text-white text-lg font-semibold">Visit Us</p>
                <p className="text-blue-200 text-sm">3 Huntington Quad, Melville, NY</p>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.7 }}
            >
              <Button
                size="lg"
                className="bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-black font-bold px-10 py-4 text-xl rounded-full shadow-xl transform hover:scale-105 transition-all duration-300 group"
                onClick={() => setIsFormOpen(true)}
              >
                <Send className="w-6 h-6 mr-3 transition-transform duration-300 group-hover:-translate-x-1" />
                Send a Message
              </Button>
            </motion.div>
          </div>
        </div>
      </motion.section>
      <ContactForm isOpen={isFormOpen} onClose={() => setIsFormOpen(false)} />
    </>
  );
};

export default ContactUsCard;
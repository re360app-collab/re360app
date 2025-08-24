import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, DollarSign, Rocket } from 'lucide-react';
import { motion } from 'framer-motion';

const DemoPage = () => {
  console.log("✅ Rendering DemoPage");
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero intro (dark) */}
      <div className="bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white py-20 px-6 text-center">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            How RE360 Works
          </h1>
          <p className="text-lg md:text-xl mb-12 text-white/90 max-w-3xl mx-auto">
            With RE360, you can earn on commissions, mortgages, and 
            <span className="text-yellow-400 font-semibold"> refinances</span>.  
            More tools are coming soon to supercharge your growth 🚀.
          </p>

          {/* Video Embed */}
          <div className="relative w-full rounded-xl overflow-hidden shadow-2xl border border-white/20 mb-12">
            <iframe
              className="w-full h-[400px] md:h-[500px]"
              src="https://www.youtube.com/embed/Twqnr0HvFQ8?autoplay=0&mute=0&controls=1&rel=0"
              title="RE360 Demo Video"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </div>

      {/* Steps Section (light w/ blobs) */}
      <section className="relative py-24 px-6 text-center bg-gradient-to-br from-slate-50 via-blue-50 to-white overflow-hidden">
        {/* Background blobs */}
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
          <h2 className="text-3xl sm:text-4xl font-bold mb-12 text-slate-900">
            Your Path to More Income
          </h2>

          {/* Steps with icons */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-16 text-left">
            <div className="bg-white rounded-xl p-8 shadow-lg border border-slate-200">
              <DollarSign className="w-10 h-10 text-green-600 mb-3" />
              <h3 className="text-xl font-semibold mb-2">1. Register</h3>
              <p className="text-slate-600">Create your free account and join the RE360 network.</p>
            </div>
            <div className="bg-white rounded-xl p-8 shadow-lg border border-slate-200">
              <CheckCircle className="w-10 h-10 text-yellow-500 mb-3" />
              <h3 className="text-xl font-semibold mb-2">2. Get Licensed</h3>
              <p className="text-slate-600">We’ll guide you through becoming a licensed loan officer.</p>
            </div>
            <div className="bg-white rounded-xl p-8 shadow-lg border border-slate-200">
              <Rocket className="w-10 h-10 text-blue-600 mb-3" />
              <h3 className="text-xl font-semibold mb-2">3. Earn More</h3>
              <p className="text-slate-600">Start earning on purchases, refinances, and more tools soon.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Strong CTA (dark) */}
      <div className="bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white py-20 text-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-8">
          Ready to Start Earning More?
        </h2>
        <div className="flex flex-col sm:flex-row justify-center gap-6">
          <button
            onClick={() => navigate('/register')}
            className="bg-yellow-400 text-blue-900 font-semibold px-10 py-4 rounded-lg shadow hover:bg-yellow-300 transition text-lg"
          >
            Register Now
          </button>
          <button
            onClick={() => navigate('/')}
            className="border border-white text-white px-10 py-4 rounded-lg hover:bg-white hover:text-blue-900 transition text-lg"
          >
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default DemoPage;

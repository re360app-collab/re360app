import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Navigation from '@/components/landing/Navigation';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Star, TrendingUp, DollarSign, Award, Users, MessageSquare as MessageSquareQuote, CheckCircle } from 'lucide-react';
import ContactUsCard from '@/components/ContactUsCard';

const stories = [
  {
    name: 'Sarah M.',
    location: 'Phoenix, AZ',
    imageName: 'realtor-sarah.jpg',
    quote: "RE360 and dual licensing didn't just change my income; it transformed my entire career. I'm closing more deals, earning significantly more on each, and providing unparalleled value to my clients. The AI mentor was key to getting my loan origination skills up to speed quickly!",
    stats: [
      { value: '$847K+', label: 'Additional Annual Income' },
      { value: '312%', label: 'Income Increase' },
      { value: 'Top 1%', label: 'Producer in Brokerage' },
    ],
    bgColor: 'from-green-500/20 to-teal-500/20',
    borderColor: 'border-green-400/40',
    textColor: 'text-green-300',
    imgPlaceholder: 'Successful female realtor smiling confidently'
  },
  {
    name: 'Mike R.',
    location: 'Dallas, TX',
    imageName: 'realtor-mike.jpg',
    quote: "I was skeptical at first, but becoming dual-licensed through RE360 was the best decision I've made. My per-deal earnings have more than doubled, and the platform makes managing both sides of the transaction incredibly easy. My clients love the streamlined process too!",
    stats: [
      { value: '156%', label: 'Per-Deal Income Boost' },
      { value: '$460K+', label: 'New Annual Income' },
      { value: '90 Days', label: 'To First Dual Closing' },
    ],
    bgColor: 'from-yellow-500/20 to-orange-500/20',
    borderColor: 'border-yellow-400/40',
    textColor: 'text-yellow-300',
    imgPlaceholder: 'Male realtor in a suit giving a thumbs up'
  },
  {
    name: 'Jessica L.',
    location: 'Miami, FL',
    imageName: 'realtor-jessica.jpg',
    quote: "The RE360 Dual Licensing Academy was fantastic. It was tailored for realtors and made the NMLS exam feel like a breeze. Now, I'm not just selling homes; I'm originating loans and earning what I'm truly worth. My average deal value shot up from $18K to over $50K!",
    stats: [
      { value: '$52K+', label: 'Average Per-Deal Earnings' },
      { value: '2.8x', label: 'Previous Earnings' },
      { value: '1st', label: 'Dual-Licensed in Team' },
    ],
    bgColor: 'from-purple-500/20 to-pink-500/20',
    borderColor: 'border-purple-400/40',
    textColor: 'text-purple-300',
    imgPlaceholder: 'Professional woman realtor in a business setting'
  },
  {
    name: 'David K.',
    location: 'Denver, CO',
    imageName: 'realtor-david.jpg',
    quote: "As a seasoned realtor, I thought I knew it all. RE360 opened my eyes to a whole new revenue stream I was leaving on the table. The platform's tools for managing loans are intuitive, and the support is top-notch. My clients appreciate the one-stop-shop experience.",
    stats: [
      { value: '45%', label: 'Increase in Client Referrals' },
      { value: '$250K+', label: 'Added Income in 1st Year' },
      { value: 'Faster', label: 'Deal Closings' },
    ],
    bgColor: 'from-blue-500/20 to-indigo-500/20',
    borderColor: 'border-blue-400/40',
    textColor: 'text-blue-300',
    imgPlaceholder: 'Experienced male realtor with a friendly smile'
  }
];

const SuccessStoriesPage = () => {
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
      className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white flex flex-col"
    >
      <Navigation 
        onNavigate={handleNavigation}
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
      />

      <main className="flex-grow py-16 sm:py-24 px-4 sm:px-6 lg:px-8 mt-16">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center justify-center bg-yellow-400/10 text-yellow-300 px-4 py-1.5 rounded-full text-sm font-semibold mb-4">
              <Star className="w-4 h-4 mr-2" />
              Real Results, Real Income
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4">
              Transforming Careers, <span className="bg-gradient-to-r from-green-400 via-teal-400 to-blue-400 bg-clip-text text-transparent">Multiplying Incomes</span>
            </h1>
            <p className="text-lg sm:text-xl text-blue-200 max-w-3xl mx-auto">
              Discover how RE360 has empowered real estate professionals like you to achieve unprecedented success through dual licensing.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
            {stories.map((story, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`glass-effect rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-start gap-6 ${story.bgColor} border ${story.borderColor} hover:shadow-2xl hover:shadow-blue-500/30 transition-shadow duration-300`}
              >
                <div className="flex-shrink-0 w-full md:w-1/3">
                  <div className="aspect-square rounded-xl overflow-hidden shadow-lg mb-4 md:mb-0">
                    <img  
                      className="w-full h-full object-cover" 
                      alt={story.imgPlaceholder}
                     src="https://images.unsplash.com/photo-1626447857058-2ba6a8868cb5" />
                  </div>
                  <h3 className={`text-2xl font-bold ${story.textColor} mt-3`}>{story.name}</h3>
                  <p className="text-sm text-blue-100">{story.location}</p>
                </div>
                <div className="flex-1">
                  <MessageSquareQuote className={`w-10 h-10 ${story.textColor} mb-3 opacity-50`} />
                  <p className="text-blue-100 text-md italic mb-6 leading-relaxed">"{story.quote}"</p>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    {story.stats.map((stat, i) => (
                      <div key={i} className={`p-3 rounded-lg bg-white/5 border border-white/10`}>
                        <p className={`text-xl font-bold ${story.textColor}`}>{stat.value}</p>
                        <p className="text-xs text-blue-200">{stat.label}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="bg-gradient-to-r from-blue-600/30 to-purple-600/30 p-8 rounded-2xl text-center border border-blue-400/40"
          >
            <Award className="w-16 h-16 text-yellow-300 mx-auto mb-4" />
            <h2 className="text-3xl font-bold mb-4">Your Success Story Starts Here</h2>
            <p className="text-lg text-blue-100 mb-6 max-w-2xl mx-auto">
              Join the growing community of RE360 dual-licensed professionals who are redefining success in the real estate industry. 
              With our comprehensive training, powerful AI tools, and supportive community, you have everything you need to elevate your hustle.
            </p>
            <Button
              size="lg"
              className="bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-black font-bold px-10 py-4 text-xl rounded-xl shadow-2xl transform hover:scale-105 transition-all duration-300"
              onClick={() => handleNavigation('/register')}
            >
              <TrendingUp className="w-6 h-6 mr-2" />
              Start Your Dual Licensing Journey
            </Button>
          </motion.div>

        </div>
      </main>

      <ContactUsCard />
      <Footer variant="dark" />
    </motion.div>
  );
};

export default SuccessStoriesPage;
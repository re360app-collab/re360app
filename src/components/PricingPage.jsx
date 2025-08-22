import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Navigation from '@/components/landing/Navigation';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { CheckCircle, XCircle, DollarSign, Zap, Gift, Award, ShieldCheck, BarChart3, Users, MessageCircle } from 'lucide-react';
import ContactUsCard from '@/components/ContactUsCard';

const servicesComparison = [
  { 
    name: 'AI Mortgage Mentor (Like Nathan AI)', 
    icon: MessageCircle, 
    re360: { included: true, cost: '$0' }, 
    others: { cost: '$99 - $299/mo', note: 'Per user, limited features' } 
  },
  { 
    name: 'NMLS Licensing Course & Prep', 
    icon: Award, 
    re360: { included: true, cost: '$0' }, 
    others: { cost: '$300 - $700', note: 'One-time, per attempt' } 
  },
  { 
    name: 'Loan Origination Software (LOS)', 
    icon: BarChart3, 
    re360: { included: true, cost: '$0' }, 
    others: { cost: '$150 - $500+/mo', note: 'Basic to premium plans' } 
  },
  { 
    name: 'CRM for Realtors & Lenders', 
    icon: Users, 
    re360: { included: true, cost: '$0' }, 
    others: { cost: '$50 - $200/mo', note: 'Per user, varies by features' } 
  },
  { 
    name: 'Compliance & Doc Management', 
    icon: ShieldCheck, 
    re360: { included: true, cost: '$0' }, 
    others: { cost: '$75 - $250/mo', note: 'Secure storage & e-sign costs' } 
  },
  { 
    name: 'Continuing Education (CE) Access', 
    icon: Zap, 
    re360: { included: true, cost: '$0' }, 
    others: { cost: '$100 - $300/year', note: 'Per license type' } 
  },
];

const PricingPage = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
    setIsMobileMenuOpen(false);
  };

  const totalOtherCostMonthlyMin = servicesComparison.reduce((sum, service) => {
    const costString = service.others.cost;
    if (costString.includes('/mo')) {
      const match = costString.match(/\$(\d+)/);
      return sum + (match ? parseInt(match[1]) : 0);
    }
    return sum;
  }, 0);
  
  const totalOtherCostOneTimeMin = servicesComparison.reduce((sum, service) => {
    const costString = service.others.cost;
    if (!costString.includes('/mo') && !costString.includes('/year')) {
      const match = costString.match(/\$(\d+)/);
      return sum + (match ? parseInt(match[1]) : 0);
    }
    return sum;
  },0);


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
            <div className="inline-flex items-center justify-center bg-green-400/10 text-green-300 px-4 py-1.5 rounded-full text-sm font-semibold mb-4">
              <Gift className="w-5 h-5 mr-2" />
              Unbeatable Value Proposition
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4">
              All This Power, <span className="bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 bg-clip-text text-transparent">Absolutely FREE</span>
            </h1>
            <p className="text-lg sm:text-xl text-blue-200 max-w-3xl mx-auto">
              RE360 is committed to your success. That's why we provide our entire suite of dual licensing tools and resources at no cost to you.
              See how much you'd pay for these services elsewhere.
            </p>
          </motion.div>

          <motion.div 
            className="bg-white/5 backdrop-blur-md rounded-2xl shadow-2xl border border-white/10 overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.6 }}
          >
            <div className="p-6 sm:p-8">
              <h2 className="text-2xl sm:text-3xl font-semibold text-center text-white mb-6 sm:mb-8">
                Feature Value Breakdown
              </h2>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-white/10">
                <thead className="bg-white/5">
                  <tr>
                    <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-white sm:pl-6">Feature / Service</th>
                    <th scope="col" className="px-3 py-3.5 text-center text-sm font-semibold text-white">RE360 Cost</th>
                    <th scope="col" className="px-3 py-3.5 text-center text-sm font-semibold text-white">Typical Market Cost</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10">
                  {servicesComparison.map((service, index) => {
                    const Icon = service.icon;
                    return (
                      <motion.tr 
                        key={index}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3, delay: index * 0.05 }}
                        className="hover:bg-white/5 transition-colors"
                      >
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6">
                          <div className="flex items-center">
                            <div className="h-10 w-10 flex-shrink-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center mr-3">
                              <Icon className="h-5 w-5 text-white" />
                            </div>
                            <div className="font-medium text-white">{service.name}</div>
                          </div>
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-center">
                          <span className="inline-flex items-center rounded-md bg-green-500/20 px-2 py-1 text-xs font-medium text-green-300 ring-1 ring-inset ring-green-500/30">
                            <CheckCircle className="w-4 h-4 mr-1.5" />
                            {service.re360.cost} (Included)
                          </span>
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-center">
                          <div className="text-red-300">{service.others.cost}</div>
                          <div className="text-xs text-blue-200">{service.others.note}</div>
                        </td>
                      </motion.tr>
                    );
                  })}
                </tbody>
                <tfoot className="bg-white/10">
                  <tr>
                    <th scope="row" colSpan="1" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-white sm:pl-6">
                      Estimated Total Savings
                    </th>
                    <td className="px-3 py-3.5 text-center text-sm font-semibold text-green-300">
                      100% FREE
                    </td>
                    <td className="px-3 py-3.5 text-center text-sm font-semibold text-yellow-300">
                      ${totalOtherCostMonthlyMin}+/mo & ${totalOtherCostOneTimeMin}+ upfront
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="text-center mt-16 sm:mt-20"
          >
            <DollarSign className="w-16 h-16 text-yellow-300 mx-auto mb-4 opacity-80" />
            <h2 className="text-3xl font-bold mb-6">Invest in Yourself, Not in Fees</h2>
            <p className="text-lg text-blue-200 mb-8 max-w-2xl mx-auto">
              RE360 believes in empowering real estate professionals by removing financial barriers. 
              Our success is tied to yours. Focus on growing your dual-licensed business, and we'll provide the tools.
            </p>
            <Button
              size="lg"
              className="bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-black font-bold px-10 py-4 text-xl rounded-xl shadow-2xl transform hover:scale-105 transition-all duration-300"
              onClick={() => handleNavigation('/register')}
            >
              <Award className="w-6 h-6 mr-2" />
              Start Earning More, For Free
            </Button>
          </motion.div>
        </div>
      </main>

      <ContactUsCard />
      <Footer variant="dark" />
    </motion.div>
  );
};

export default PricingPage;
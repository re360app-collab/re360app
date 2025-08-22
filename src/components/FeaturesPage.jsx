import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Navigation from '@/components/landing/Navigation';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { MessageCircle, BookOpen, Target, DollarSign, TrendingUp, Zap, Users, BarChart3, CalendarDays, Settings, ShieldCheck, HelpCircle, Award } from 'lucide-react';

const featureList = [
  {
    icon: MessageCircle,
    iconBg: 'bg-gradient-to-r from-blue-400 to-purple-500',
    title: 'Nathan AI Loan Officer Assistant',
    description: 'Your personal AI mortgage expert for instant loan recommendations, buyer qualification, and overcoming objections. Maximize every deal by mastering both sides.',
    details: [
      'Instant loan product matching',
      'Automated buyer pre-qualification guidance',
      'Objection handling scripts & strategies',
      '24/7 availability for quick answers',
    ],
    badge: 'AI POWERED',
    badgeColor: 'text-yellow-300 bg-yellow-400/20',
    benefit: 'Identifies $5K-$15K+ in extra income per deal.',
    benefitColor: 'text-green-300'
  },
  {
    icon: BookOpen,
    iconBg: 'bg-gradient-to-r from-green-400 to-blue-500',
    title: 'Dual Licensing Academy',
    description: 'Comprehensive, realtor-focused courses to fast-track your loan officer licensing. Become an elite dual-licensed professional and multiply your income.',
    details: [
      'Step-by-step licensing guidance',
      'Engaging video modules & quizzes',
      'State-specific requirement breakdowns',
      'Community support & expert Q&A',
    ],
    badge: 'FAST TRACK',
    badgeColor: 'text-purple-300 bg-purple-400/20',
    benefit: 'Achieve dual-licensing in as little as 90 days.',
    benefitColor: 'text-orange-300'
  },
  {
    icon: Target,
    iconBg: 'bg-gradient-to-r from-purple-400 to-pink-500',
    title: 'Dual Revenue Pipeline Dashboard',
    description: 'Streamline your entire dual-income workflow. Manage realtor commissions and loan originator fees seamlessly with intelligent tools designed for maximum profit.',
    details: [
      'Integrated buyer & loan tracking',
      'Automated pre-qualification document collection',
      'Commission & fee projection tools',
      'Client communication templates',
    ],
    badge: 'PROFIT MAXIMIZER',
    badgeColor: 'text-pink-300 bg-pink-400/20',
    benefit: 'Boost average income by up to 83% per deal.',
    benefitColor: 'text-teal-300'
  },
  {
    icon: Users,
    iconBg: 'bg-gradient-to-r from-teal-400 to-cyan-500',
    title: 'Client Management Suite',
    description: 'Robust tools to manage your buyers and loan applications efficiently. Keep track of progress, documents, and communication all in one place.',
    details: [
      'Centralized buyer database',
      'Loan application status tracking',
      'Automated reminders & follow-ups',
      'Secure document storage & sharing',
    ],
    badge: 'ORGANIZED',
    badgeColor: 'text-cyan-300 bg-cyan-400/20',
    benefit: 'Save hours per week on administrative tasks.',
    benefitColor: 'text-sky-300'
  },
  {
    icon: BarChart3,
    iconBg: 'bg-gradient-to-r from-indigo-400 to-violet-500',
    title: 'Analytics & Reporting',
    description: 'Gain valuable insights into your performance. Track your deals, income, and progress towards your financial goals with easy-to-understand reports.',
    details: [
      'Real-time income tracking (realtor & LO)',
      'Deal conversion rate analysis',
      'Pipeline forecasting',
      'Customizable report generation',
    ],
    badge: 'DATA DRIVEN',
    badgeColor: 'text-violet-300 bg-violet-400/20',
    benefit: 'Make informed decisions to grow your business.',
    benefitColor: 'text-fuchsia-300'
  },
  {
    icon: CalendarDays,
    iconBg: 'bg-gradient-to-r from-rose-400 to-red-500',
    title: 'Integrated Calendar & Appointments',
    description: 'Schedule and manage client meetings, pre-qualification calls, and important deadlines directly within the RE360 platform.',
    details: [
      'Sync with external calendars (Google, Outlook)',
      'Automated appointment reminders for clients',
      'View availability and book slots easily',
      'Link appointments to specific buyers or loans',
    ],
    badge: 'EFFICIENT',
    badgeColor: 'text-red-300 bg-red-400/20',
    benefit: 'Never miss an important meeting or deadline.',
    benefitColor: 'text-amber-400'
  },
];

const FeaturesPage = () => {
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
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4">
              Unlock Your <span className="bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 bg-clip-text text-transparent">Full Potential</span>
            </h1>
            <p className="text-lg sm:text-xl text-blue-200 max-w-3xl mx-auto">
              RE360 provides a comprehensive suite of tools designed to help dual-licensed professionals maximize their income and streamline their workflow.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featureList.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="glass-effect rounded-2xl p-6 flex flex-col hover:shadow-2xl hover:shadow-blue-500/30 transition-shadow duration-300"
              >
                <div className="flex items-center mb-4">
                  <div className={`w-12 h-12 ${feature.iconBg} rounded-lg flex items-center justify-center mr-4`}>
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white">{feature.title}</h3>
                    {feature.badge && (
                      <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${feature.badgeColor} mt-1 inline-block`}>
                        {feature.badge}
                      </span>
                    )}
                  </div>
                </div>
                <p className="text-blue-100 text-sm mb-4 flex-grow">{feature.description}</p>
                <ul className="space-y-1 text-sm text-blue-200 mb-4">
                  {feature.details.map((detail, i) => (
                    <li key={i} className="flex items-start">
                      <Zap className="w-4 h-4 text-yellow-400 mr-2 mt-0.5 flex-shrink-0" />
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
                <div className={`mt-auto p-3 rounded-lg bg-opacity-20 ${feature.benefitColor.replace('text-', 'bg-').split(' ')[0]}/20 border ${feature.benefitColor.replace('text-', 'border-').split(' ')[0]}/30`}>
                  <p className={`text-sm font-semibold ${feature.benefitColor}`}>✨ {feature.benefit}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </main>

      <Footer variant="dark" />
    </motion.div>
  );
};

export default FeaturesPage;
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Users, Briefcase, DollarSign, MessageSquare, BarChart2, Send, UserPlus, TestTube2, PieChart, Phone } from 'lucide-react';
import { useAuth } from '@/contexts/SupabaseAuthContext';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Helmet } from 'react-helmet-async';
import StatCardsGrid from '@/components/dashboard/home/StatCardsGrid';
import WelcomeBanner from '@/components/dashboard/home/WelcomeBanner';

const AdminDashboard = () => {
  const { user, userProfile, isAdmin } = useAuth();
  const navigate = useNavigate();

  const handleAction = (path) => {
    navigate(`/admin/${path}`);
  };

  const adminTools = [
    {
      title: 'Buyer Leads',
      description: 'View and assign new buyer leads.',
      link: '/admin/leads',
      icon: <Users className="w-8 h-8 text-blue-500" />,
      color: 'border-blue-500',
    },
    {
      title: 'Realtor Registrations',
      description: 'Manage and assign new realtors.',
      link: '/admin/realtor-leads',
      icon: <UserPlus className="w-8 h-8 text-teal-500" />,
      color: 'border-teal-500',
    },
    {
      title: 'Loan Overview',
      description: 'Monitor all active loan applications.',
      link: '/admin/loans',
      icon: <DollarSign className="w-8 h-8 text-green-500" />,
      color: 'border-green-500',
    },
    {
      title: 'Loan Officers',
      description: 'Add or manage loan officer accounts.',
      link: '/admin/loan-officers',
      icon: <Briefcase className="w-8 h-8 text-purple-500" />,
      color: 'border-purple-500',
    },
    {
      title: 'Contact Inbox',
      description: 'Read messages from the contact form.',
      link: '/admin/inbox',
      icon: <MessageSquare className="w-8 h-8 text-orange-500" />,
      color: 'border-orange-500',
    },
    {
      title: 'SMS Conversations',
      description: 'View and manage all SMS threads.',
      link: '/admin/conversations',
      icon: <MessageSquare className="w-8 h-8 text-pink-500" />,
      color: 'border-pink-500',
    },
    {
      title: 'Contacts',
      description: 'Manage all contacts for SMS campaigns.',
      link: '/admin/contacts',
      icon: <Phone className="w-8 h-8 text-yellow-500" />,
      color: 'border-yellow-500',
    },
    {
      title: 'SMS Campaigns',
      description: 'Send bulk SMS messages to contacts.',
      link: '/admin/sms-campaign',
      icon: <Send className="w-8 h-8 text-indigo-500" />,
      color: 'border-indigo-500',
    },
    {
      title: 'SMS Analytics',
      description: 'Track campaign performance and opt-outs.',
      link: '/admin/sms-analytics',
      icon: <PieChart className="w-8 h-8 text-rose-500" />,
      color: 'border-rose-500',
    },
    {
      title: 'Twilio Inbound Tester',
      description: 'Simulate inbound Twilio webhooks.',
      link: '/admin/twilio-test',
      icon: <TestTube2 className="w-8 h-8 text-cyan-500" />,
      color: 'border-cyan-500',
    },
  ];

  if (isAdmin && userProfile?.position === 'System Admin') {
    adminTools.push({
      title: 'Site Analytics',
      description: 'View Google Analytics data.',
      link: '/admin/analytics',
      icon: <BarChart2 className="w-8 h-8 text-red-500" />,
      color: 'border-red-500',
    });
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };

  return (
    <>
      <Helmet>
        <title>Admin Dashboard | RE360App</title>
        <meta name="description" content="Central hub for all administrative tasks." />
      </Helmet>
      <div className="space-y-8">
        <WelcomeBanner user={user} userProfile={userProfile} onActionClick={handleAction} />

        <StatCardsGrid onActionClick={handleAction} />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Admin Tools</h2>
          <motion.div
            className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {adminTools.sort((a, b) => a.title.localeCompare(b.title)).map((tool) => (
              <motion.div key={tool.title} variants={itemVariants}>
                <Link to={tool.link}>
                  <Card className={`hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border-l-4 ${tool.color} h-full`}>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-xl font-bold">{tool.title}</CardTitle>
                      {tool.icon}
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">{tool.description}</p>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </>
  );
};

export default AdminDashboard;
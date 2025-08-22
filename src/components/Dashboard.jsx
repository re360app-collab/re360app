import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import Sidebar from '@/components/dashboard/Sidebar';
import Header from '@/components/dashboard/Header';
import DashboardHome from '@/components/dashboard/DashboardHome';
import NathanAI from '@/components/dashboard/NathanAI';
import Calendar from '@/components/dashboard/Calendar';
import LearningLab from '@/components/dashboard/LearningLab';
import QualifyBuyers from '@/components/dashboard/QualifyBuyers';
import Profile from '@/components/dashboard/Profile';

const Dashboard = ({ user, onLogout }) => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { toast } = useToast();

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardHome user={user} />;
      case 'nathan':
        return <NathanAI user={user} />;
      case 'calendar':
        return <Calendar user={user} />;
      case 'learning':
        return <LearningLab user={user} />;
      case 'qualify':
        return <QualifyBuyers user={user} />;
      case 'profile':
        return <Profile user={user} />;
      default:
        return <DashboardHome user={user} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="flex">
        {/* Sidebar */}
        <Sidebar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />

        {/* Main Content */}
        <div className="flex-1 lg:ml-64">
          <Header
            user={user}
            onLogout={onLogout}
            setSidebarOpen={setSidebarOpen}
          />
          
          <main className="p-6">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              {renderContent()}
            </motion.div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
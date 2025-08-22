import React from 'react';
import { motion } from 'framer-motion';
import { Users, Target, CheckCircle } from 'lucide-react';

const StatCard = ({ icon, value, label, color }) => (
  <div className="flex items-center p-4 bg-white/10 rounded-lg backdrop-blur-sm">
    <div className={`p-3 rounded-full mr-4 ${color}`}>
      {icon}
    </div>
    <div>
      <p className="text-2xl font-bold text-white">{value}</p>
      <p className="text-sm text-white/80">{label}</p>
    </div>
  </div>
);

const QualifyBuyersHeader = ({ buyers }) => {
  const totalBuyers = buyers.length;
  const qualifiedBuyers = buyers.filter(b => b.status === 'Qualified').length;
  const newLeads = buyers.filter(b => b.status === 'New').length;

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-gradient-to-br from-blue-600 to-purple-700 p-6 rounded-2xl shadow-2xl flex justify-between items-center relative overflow-hidden"
    >
      <div className="relative z-10 flex-grow">
        <h2 className="text-3xl font-bold text-white drop-shadow-md">Your Buyer Pipeline</h2>
        <p className="text-white/90 mt-1 mb-6 drop-shadow-sm">An overview of your active buyers and leads.</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <StatCard icon={<Users className="w-6 h-6 text-blue-800" />} value={totalBuyers} label="Total Buyers" color="bg-blue-200" />
          <StatCard icon={<CheckCircle className="w-6 h-6 text-green-800" />} value={qualifiedBuyers} label="Qualified" color="bg-green-200" />
          <StatCard icon={<Target className="w-6 h-6 text-yellow-800" />} value={newLeads} label="New Leads" color="bg-yellow-200" />
        </div>
      </div>
      <div className="hidden lg:flex relative z-10 ml-8 items-center justify-center">
        <div className="w-48 h-48 rounded-full bg-white/20 flex items-center justify-center overflow-hidden shadow-xl border-4 border-white/30 transform transition-transform hover:scale-105">
          <img
            src="https://storage.googleapis.com/hostinger-horizons-assets-prod/0b420d02-3d28-409e-bd2c-9abc859f6e58/536241aea6270897197f5be0a57d7cde.jpg"
            alt="A person holding keys to a new house"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
       <div className="absolute top-0 left-0 w-full h-full bg-black/10"></div>
    </motion.div>
  );
};

export default QualifyBuyersHeader;
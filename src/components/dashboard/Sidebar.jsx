import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, Users, BarChart2, Calendar, BookOpen, Bot, User, LogOut, X, Send, PieChart, UserPlus, Inbox, FileText, Phone, TestTube2, MessageSquare } from 'lucide-react';
import Logo from '@/components/Logo';

const Sidebar = ({ isOpen, onClose, userProfile, isAdmin }) => {
  const location = useLocation();

  const isSystemAdmin = userProfile?.position === 'System Admin';
  const isLoanOfficer = userProfile?.position === 'Loan Officer';

  const getBasePath = () => {
    return isAdmin ? '/admin' : '/dashboard';
  };
  
  const baseNavItems = [
    { to: '', icon: Home, label: 'Dashboard Home' },
    { to: '/profile', icon: User, label: 'My Profile' },
  ];

  const adminNavItems = [
    { to: '/leads', icon: Users, label: 'Buyer Leads' },
    { to: '/realtor-leads', icon: UserPlus, label: 'Realtor Leads' },
    { to: '/loans', icon: FileText, label: 'Loans Overview' },
    { to: '/loan-officers', icon: Users, label: 'Loan Officers' },
    { to: '/inbox', icon: Inbox, label: 'Inbox' },
    { to: '/conversations', icon: MessageSquare, label: 'SMS Conversations' },
    { to: '/contacts', icon: Phone, label: 'Contacts' },
    {
      label: "SMS Tools",
      items: [
        { to: '/sms-campaign', icon: Send, label: 'SMS Campaigns' },
        { to: '/sms-analytics', icon: PieChart, label: 'SMS Analytics' },
        { to: '/twilio-test', icon: TestTube2, label: 'Twilio Tester'},
      ]
    },
    ...(isSystemAdmin ? [{ to: '/analytics', icon: BarChart2, label: 'Site Analytics' }] : [])
  ];

  const loanOfficerNavItems = [
    { to: '/assigned-leads', icon: Users, label: 'Assigned Leads' },
    { to: '/realtor-leads', icon: UserPlus, label: 'My Realtor Leads'},
    { to: '/loans', icon: FileText, label: 'Loans In Progress' },
    { to: '/calendar', icon: Calendar, label: 'My Calendar' },
    { to: '/learning', icon: BookOpen, label: 'Learning Lab' },
    { to: '/nathan', icon: Bot, label: 'Nathan AI' },
  ];

  const realtorNavItems = [
    { to: '/qualify-buyers', icon: Users, label: 'Qualify Buyers' },
    { to: '/loans', icon: FileText, label: 'Loans In Progress' },
    { to: '/calendar', icon: Calendar, label: 'My Calendar' },
    { to: '/learning', icon: BookOpen, label: 'Learning Lab' },
    { to: '/nathan', icon: Bot, label: 'Nathan AI' },
  ];
  
  let navItems = [...baseNavItems];

  if (isAdmin) {
    navItems = [...baseNavItems, ...adminNavItems];
  } else if (isLoanOfficer) {
    navItems = [...baseNavItems, ...loanOfficerNavItems];
  } else { // Realtor
    navItems = [...baseNavItems, ...realtorNavItems];
  }

  const sidebarVariants = {
    open: { x: 0, transition: { type: 'spring', stiffness: 300, damping: 30 } },
    closed: { x: '-100%', transition: { type: 'spring', stiffness: 300, damping: 30 } },
  };

  const NavItem = ({ to, icon: Icon, label, isSubItem = false }) => {
    const fullPath = `${getBasePath()}${to}`;
    const isActive = location.pathname === fullPath || (to === '' && location.pathname === getBasePath());

    return (
      <li>
        <NavLink
          to={fullPath}
          end={to === ''}
          onClick={onClose}
          className={({ isActive: navIsActive }) =>
            `flex items-center p-3 rounded-lg transition-colors duration-200 ${
              isSubItem ? 'pl-10' : 'pl-3'
            } ${
              navIsActive
                ? 'bg-blue-600 text-white shadow-lg'
                : 'text-gray-300 hover:bg-slate-700/50 hover:text-white'
            }`
          }
        >
          <Icon className="w-5 h-5 mr-3 flex-shrink-0" />
          <span className="font-medium">{label}</span>
        </NavLink>
      </li>
    );
  };
  
  const NavGroup = ({ label, items }) => (
    <li>
      <span className="px-3 py-2 text-xs font-bold uppercase text-gray-400">{label}</span>
      <ul className="mt-1 space-y-1">
        {items.map(item => <NavItem key={item.to} {...item} isSubItem={true} />)}
      </ul>
    </li>
  );

  return (
    <motion.aside
      variants={sidebarVariants}
      initial={false}
      animate={isOpen ? 'open' : 'closed'}
      className="fixed inset-y-0 left-0 z-40 w-64 bg-slate-800 text-white flex flex-col shadow-2xl lg:relative lg:translate-x-0"
    >
      <div className="flex items-center justify-between p-4 border-b border-slate-700">
        <Logo />
        <button onClick={onClose} className="lg:hidden p-1 rounded-full hover:bg-slate-700">
          <X className="w-6 h-6" />
        </button>
      </div>

      <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
        <ul>
          {navItems.map((item, index) => (
            item.items ? (
              <NavGroup key={index} label={item.label} items={item.items} />
            ) : (
              <NavItem key={item.to} {...item} />
            )
          ))}
        </ul>
      </nav>

      <div className="p-4 border-t border-slate-700">
        <NavLink
          to="/auth"
          onClick={onClose}
          className="flex items-center p-3 rounded-lg text-gray-300 hover:bg-red-500/20 hover:text-red-400 transition-colors duration-200"
        >
          <LogOut className="w-5 h-5 mr-3" />
          <span className="font-medium">Logout</span>
        </NavLink>
      </div>
    </motion.aside>
  );
};

export default Sidebar;
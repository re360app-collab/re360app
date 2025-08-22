import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { Toaster } from '@/components/ui/toaster';

import LandingPage from '@/components/LandingPage';
import InvitePage from '@/components/InvitePage';
import FeaturesPage from '@/components/FeaturesPage';
import PricingPage from '@/components/PricingPage';
import SuccessStoriesPage from '@/components/SuccessStoriesPage';
import LoginPage from '@/pages/LoginPage';
import RegisterPage from '@/pages/RegisterPage';
import UpdatePasswordPage from '@/pages/UpdatePasswordPage';
import DashboardLayout from '@/components/DashboardLayout';
import PrivacyPolicy from '@/components/legal/PrivacyPolicy';
import TermsOfService from '@/components/legal/TermsOfService';
import VotePage from '@/pages/VotePage';
import MetaPixel from '@/components/MetaPixel';
import PublicRoute from '@/components/auth/PublicRoute';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import CatchAllRedirect from '@/components/CatchAllRedirect';
import TokenRegistrationPage from '@/pages/TokenRegistrationPage';

import DashboardHome from '@/components/dashboard/DashboardHome';
import QualifyBuyers from '@/components/dashboard/QualifyBuyers';
import LoansInProgress from '@/components/dashboard/LoansInProgress';
import Calendar from '@/components/dashboard/Calendar';
import LearningLab from '@/components/dashboard/LearningLab';
import NathanAI from '@/components/dashboard/NathanAI';
import Profile from '@/components/dashboard/Profile';

import AdminDashboard from '@/components/dashboard/admin/AdminDashboard';
import AdminInbox from '@/components/dashboard/admin/AdminInbox';
import AdminLeadsOverview from '@/components/dashboard/admin/AdminLeadsOverview';
import AdminRealtorLeads from '@/components/dashboard/admin/AdminRealtorLeads';
import AdminLoansOverview from '@/components/dashboard/AdminLoansOverview';
import AdminLoanOfficersPage from '@/components/dashboard/admin/AdminLoanOfficersPage';
import AdminAddRealtor from '@/components/dashboard/admin/AdminAddRealtor';
import SmsCampaignPage from '@/pages/admin/SmsCampaignPage';
import SmsAnalyticsPage from '@/pages/admin/SmsAnalyticsPage';
import ContactsPage from '@/pages/admin/ContactsPage';
import AdminTwilioTestPage from '@/pages/admin/AdminTwilioTestPage';
import SiteAnalytics from '@/components/dashboard/admin/SiteAnalytics';

import LoanOfficerLeadsView from '@/components/dashboard/lo/LoanOfficerLeadsView';
import MyRealtorLeads from '@/components/dashboard/lo/MyRealtorLeads';

import ConversationsPage from '@/pages/admin/ConversationsPage';
import ConversationDetailPage from '@/pages/admin/ConversationDetailPage';

const AppRoutes = () => {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<LandingPage />} />
        <Route path="/invite" element={<InvitePage />} />
        <Route path="/features" element={<FeaturesPage />} />
        <Route path="/pricing" element={<PricingPage />} />
        <Route path="/success-stories" element={<SuccessStoriesPage />} />
        <Route path="/vote" element={<VotePage />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms-of-service" element={<TermsOfService />} />
        
        <Route path="/auth" element={<PublicRoute><LoginPage /></PublicRoute>} />
        <Route path="/register" element={<PublicRoute><RegisterPage /></PublicRoute>} />
        <Route path="/update-password" element={<UpdatePasswordPage />} />
        <Route path="/r" element={<TokenRegistrationPage />} />

        <Route path="/dashboard" element={<ProtectedRoute><DashboardLayout /></ProtectedRoute>}>
          <Route index element={<DashboardHome />} />
          <Route path="qualify-buyers" element={<QualifyBuyers />} />
          <Route path="loans" element={<LoansInProgress />} />
          <Route path="assigned-leads" element={<LoanOfficerLeadsView />} />
          <Route path="realtor-leads" element={<MyRealtorLeads />} />
          <Route path="calendar" element={<Calendar />} />
          <Route path="learning" element={<LearningLab />} />
          <Route path="nathan" element={<NathanAI />} />
          <Route path="profile" element={<Profile />} />
        </Route>

        <Route path="/admin" element={<ProtectedRoute adminOnly={true}><DashboardLayout /></ProtectedRoute>}>
          <Route index element={<AdminDashboard />} />
          <Route path="inbox" element={<AdminInbox />} />
          <Route path="leads" element={<AdminLeadsOverview />} />
          <Route path="realtor-leads" element={<AdminRealtorLeads />} />
          <Route path="loans" element={<AdminLoansOverview />} />
          <Route path="loan-officers" element={<AdminLoanOfficersPage />} />
          <Route path="add-realtor" element={<AdminAddRealtor />} />
          <Route path="sms-campaign" element={<SmsCampaignPage />} />
          <Route path="sms-analytics" element={<SmsAnalyticsPage />} />
          <Route path="contacts" element={<ContactsPage />} />
          <Route path="twilio-test" element={<AdminTwilioTestPage />} />
          <Route path="analytics" element={<SiteAnalytics />} />
          <Route path="conversations" element={<ConversationsPage />} />
          <Route path="conversations/:phone" element={<ConversationDetailPage />} />
          <Route path="profile" element={<Profile />} />
        </Route>
        
        <Route path="*" element={<CatchAllRedirect />} />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-950">
      <MetaPixel />
      <AppRoutes />
      <Toaster />
    </div>
  );
}

export default App;
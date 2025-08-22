import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';
import { useProfileCompletion } from '@/hooks/useProfileCompletion';
import { useAuth } from '@/contexts/SupabaseAuthContext';
import WelcomeBanner from '@/components/dashboard/home/WelcomeBanner';
import StatCardsGrid from '@/components/dashboard/home/StatCardsGrid';
import QuickActions from '@/components/dashboard/home/QuickActions';
import RecentActivity from '@/components/dashboard/home/RecentActivity';
import UpcomingReminders from '@/components/dashboard/home/UpcomingReminders';
import GoalsProgress from '@/components/dashboard/home/GoalsProgress';
import ProfileSetupBanner from '@/components/dashboard/ProfileSetupBanner';
import FeatureLockedModal from '@/components/dashboard/FeatureLockedModal';
import { useMediaQuery } from '@/hooks/useMediaQuery';

const DashboardHome = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user, userProfile } = useAuth();
  const { isProfileComplete } = useProfileCompletion(userProfile);
  const [showSetupBanner, setShowSetupBanner] = useState(false);
  const [featureLockedModal, setFeatureLockedModal] = useState({ isOpen: false, featureName: '' });
  const isMobile = useMediaQuery("(max-width: 768px)");

  const isAdmin = userProfile?.position === 'System Admin' || userProfile?.position === 'NMB Admin';

  useEffect(() => {
    if (userProfile && !isProfileComplete) {
      setShowSetupBanner(true);
    }
  }, [isProfileComplete, userProfile]);

  const handleAction = (path) => {
    if (path === 'qualify-buyers' && !isProfileComplete && !isAdmin) {
      setFeatureLockedModal({ isOpen: true, featureName: 'Qualify Buyers' });
      return;
    }

    if (path === 'calendar') {
      toast({
        title: "📅 Calendar is now live!",
        description: "Check out your schedule and manage appointments.",
      });
    }
    const basePath = isAdmin ? '/admin' : '/dashboard';
    navigate(`${basePath}/${path}`);
  };

  return (
    <div className="space-y-8">
      {showSetupBanner && (
        <ProfileSetupBanner 
          onDismiss={() => setShowSetupBanner(false)}
        />
      )}

      <WelcomeBanner user={user} userProfile={userProfile} onActionClick={handleAction} />

      <StatCardsGrid onActionClick={handleAction} />

      {!(isAdmin && isMobile) && <UpcomingReminders user={user} />}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
          <QuickActions onActionClick={handleAction} userProfile={userProfile} />
        </motion.div>
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
          <RecentActivity user={user} toast={toast} />
        </motion.div>
      </div>

      <GoalsProgress userProfile={userProfile} />

      <FeatureLockedModal
        isOpen={featureLockedModal.isOpen}
        onClose={() => setFeatureLockedModal({ isOpen: false, featureName: '' })}
        featureName={featureLockedModal.featureName}
        userProfile={userProfile}
      />
    </div>
  );
};

export default DashboardHome;
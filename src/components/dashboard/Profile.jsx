import React, { useState, useEffect } from 'react';
    import { motion } from 'framer-motion';
    import { Settings, Shield, Bell, LogOut } from 'lucide-react';
    import { Button } from '@/components/ui/button';
    import { useToast } from '@/components/ui/use-toast';
    import { useNavigate } from 'react-router-dom';
    import { useAuth } from '@/contexts/SupabaseAuthContext';
    import { getFullUserProfile, updateUserProfile } from '@/lib/profiles';
    import ProfileHeader from '@/components/dashboard/profile/ProfileHeader';
    import PersonalInfoSection from '@/components/dashboard/profile/PersonalInfoSection';
    import ProfessionalInfoSection from '@/components/dashboard/profile/ProfessionalInfoSection';
    import SocialMediaSection from '@/components/dashboard/profile/SocialMediaSection';
    import GoalsAndPreferencesSection from '@/components/dashboard/profile/GoalsAndPreferencesSection';
    import ChangePasswordModal from '@/components/dashboard/profile/ChangePasswordModal';

    const Profile = ({ onLogout }) => {
      const [isEditing, setIsEditing] = useState(false);
      const [loading, setLoading] = useState(true);
      const [saving, setSaving] = useState(false);
      const [showChangePasswordModal, setShowChangePasswordModal] = useState(false);
      const [profileData, setProfileData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        licenseNumber: '',
        stateOfLicensure: '',
        brokerageName: '',
        position: '',
        experienceLevel: '',
        avg_homes_closed_yearly: '',
        profilePicture: '',
        socialMedia: {
          facebook: '',
          instagram: '',
          linkedin: '',
          website: ''
        },
        goals: {
          becomeLoanOfficer: false,
          increaseClosings: false,
          growTeam: false
        },
        settings: {
          emailNotifications: true,
          smsNotifications: true,
          autoPostContent: false,
          marketingConsent: true
        }
      });
      const { toast } = useToast();
      const navigate = useNavigate();
      const { user, refreshUserProfile } = useAuth();

      useEffect(() => {
        if (user) {
          loadUserProfile();
        }
      }, [user]);

      const loadUserProfile = async () => {
        try {
          setLoading(true);
          
          const { data, error } = await getFullUserProfile(user.id);
          
          if (error) {
            console.error('Error loading profile:', error);
            setProfileDataFromUserMetadata();
            return;
          }

          if (data) {
            setProfileData({
              firstName: data.first_name || '',
              lastName: data.last_name || '',
              email: user.email || '',
              phone: data.phone || '',
              licenseNumber: data.license_number || '',
              stateOfLicensure: data.state_of_licensure || '',
              brokerageName: data.brokerage_name || '',
              position: data.position || '',
              experienceLevel: data.experience_level || '',
              avg_homes_closed_yearly: data.avg_homes_closed_yearly || '',
              profilePicture: data.profile_picture_url || '',
              socialMedia: data.social_media || {
                facebook: '',
                instagram: '',
                linkedin: '',
                website: ''
              },
              goals: data.goals || {
                becomeLoanOfficer: false,
                increaseClosings: false,
                growTeam: false
              },
              settings: data.settings || {
                emailNotifications: true,
                smsNotifications: true,
                autoPostContent: false,
                marketingConsent: true
              }
            });
          } else {
            setProfileDataFromUserMetadata();
          }
        } catch (error) {
          console.error('Error loading profile:', error);
          setProfileDataFromUserMetadata();
        } finally {
          setLoading(false);
        }
      };

      const setProfileDataFromUserMetadata = () => {
        setProfileData(prev => ({
          ...prev,
          firstName: user.user_metadata?.firstName || user.user_metadata?.first_name || '',
          lastName: user.user_metadata?.lastName || user.user_metadata?.last_name || '',
          email: user.email || '',
          phone: user.user_metadata?.phone || '',
          licenseNumber: user.user_metadata?.licenseNumber || '',
          stateOfLicensure: user.user_metadata?.stateOfLicensure || '',
          brokerageName: user.user_metadata?.brokerageName || '',
          position: user.user_metadata?.userType || 'Realtor',
          experienceLevel: user.user_metadata?.experienceLevel || '',
          avg_homes_closed_yearly: user.user_metadata?.avg_homes_closed_yearly || ''
        }));
      };

      const handleSave = async () => {
        if (!user || !user.id) {
            toast({
              title: "Authentication Error",
              description: "Could not verify user. Please log out and log back in.",
              variant: "destructive"
            });
            return;
          }
        try {
          setSaving(true);
          
          const updates = {
            first_name: profileData.firstName,
            last_name: profileData.lastName,
            phone: profileData.phone,
            license_number: profileData.licenseNumber,
            state_of_licensure: profileData.stateOfLicensure,
            brokerage_name: profileData.brokerageName,
            position: profileData.position,
            experience_level: profileData.experienceLevel,
            avg_homes_closed_yearly: profileData.avg_homes_closed_yearly,
            profile_picture_url: profileData.profilePicture,
            social_media: profileData.socialMedia,
            goals: profileData.goals,
            settings: profileData.settings,
          };

          const { error } = await updateUserProfile(user.id, updates);

          if (error) {
            console.error('Error updating profile:', error);
            toast({
              title: "Error updating profile",
              description: `Failed to save profile changes. ${error.message}`,
              variant: "destructive"
            });
            return;
          }

          setIsEditing(false);
          toast({
            title: "Profile updated! 🎉",
            description: "Your profile information has been saved successfully.",
          });

          if (refreshUserProfile) {
            await refreshUserProfile();
          }
          window.dispatchEvent(new CustomEvent('profileUpdated'));

          setTimeout(() => {
            navigate('/dashboard');
          }, 1500);
        } catch (error) {
          console.error('Error updating profile:', error);
          toast({
            title: "Error updating profile",
            description: "Failed to save profile changes. Please try again.",
            variant: "destructive"
          });
        } finally {
          setSaving(false);
        }
      };

      const handleInputChange = (field, value) => {
        if (field.includes('.')) {
          const [parent, child] = field.split('.');
          setProfileData(prev => ({
            ...prev,
            [parent]: {
              ...prev[parent],
              [child]: value
            }
          }));
        } else {
          setProfileData(prev => ({
            ...prev,
            [field]: value
          }));
        }
      };

      const handleGoalToggle = (goal) => {
        setProfileData(prev => ({
          ...prev,
          goals: {
            ...prev.goals,
            [goal]: !prev.goals[goal]
          }
        }));
      };

      const handleSettingToggle = (setting) => {
        setProfileData(prev => ({
          ...prev,
          settings: {
            ...prev.settings,
            [setting]: !prev.settings[setting]
          }
        }));
      };

      const handleProfilePictureUpload = () => {
        toast({
          title: "🚧 Photo upload coming soon!",
          description: "This feature isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀",
        });
      };

      if (loading) {
        return (
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        );
      }

      return (
        <>
        <div className="space-y-8 p-6 lg:p-8 bg-white dark:bg-gray-800 rounded-xl shadow-lg">
          <ProfileHeader
            profileData={profileData}
            isEditing={isEditing}
            onEdit={() => setIsEditing(true)}
            onSave={handleSave}
            onCancel={() => {
              setIsEditing(false);
              loadUserProfile();
            }}
            onProfilePictureUpload={handleProfilePictureUpload}
          />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <PersonalInfoSection
              profileData={profileData}
              isEditing={isEditing}
              onInputChange={handleInputChange}
            />

            <ProfessionalInfoSection
              profileData={profileData}
              isEditing={isEditing}
              onInputChange={handleInputChange}
            />

            <SocialMediaSection
              profileData={profileData}
              isEditing={isEditing}
              onInputChange={handleInputChange}
            />

            <GoalsAndPreferencesSection
              profileData={profileData}
              isEditing={isEditing}
              onGoalToggle={handleGoalToggle}
              onSettingToggle={handleSettingToggle}
            />
          </div>

          {isEditing && (
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-100 dark:border-gray-700">
              <div className="flex justify-end space-x-4">
                <Button
                  variant="outline"
                  onClick={() => {
                    setIsEditing(false);
                    loadUserProfile();
                  }}
                  disabled={saving}
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleSave}
                  disabled={saving}
                  className="bg-gradient-to-r from-blue-500 to-purple-600 text-white"
                >
                  {saving ? 'Saving...' : 'Save Changes'}
                </Button>
              </div>
            </div>
          )}

          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-100 dark:border-gray-700">
            <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-6 flex items-center">
              <Settings className="w-5 h-5 mr-3 text-gray-600 dark:text-gray-400" />
              Account Actions
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button
                variant="outline"
                className="flex items-center justify-center space-x-2 p-4 h-auto"
                onClick={() => setShowChangePasswordModal(true)}
              >
                <Shield className="w-5 h-5" />
                <span>Change Password</span>
              </Button>
              
              <Button
                variant="outline"
                className="flex items-center justify-center space-x-2 p-4 h-auto"
                onClick={() => toast({
                  title: "🚧 Feature coming soon!",
                  description: "This feature isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀",
                })}
              >
                <Bell className="w-5 h-5" />
                <span>Notification Settings</span>
              </Button>
              
              <Button
                variant="outline"
                className="flex items-center justify-center space-x-2 p-4 h-auto text-red-600 border-red-600 hover:bg-red-50 dark:hover:bg-red-900 dark:text-red-400 dark:border-red-400"
                onClick={onLogout}
              >
                <LogOut className="w-5 h-5" />
                <span>Sign Out</span>
              </Button>
            </div>
          </div>
        </div>
        <ChangePasswordModal
            isOpen={showChangePasswordModal}
            onClose={() => setShowChangePasswordModal(false)}
        />
        </>
      );
    };

    export default Profile;
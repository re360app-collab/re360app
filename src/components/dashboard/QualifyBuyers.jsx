import React, { useState, useEffect, useCallback } from 'react';
    import { motion, AnimatePresence } from 'framer-motion';
    import { Plus, Users, AlertTriangle } from 'lucide-react';
    import { Button } from '@/components/ui/button';
    import { useToast } from '@/components/ui/use-toast';
    import { useProfileCompletion } from '@/hooks/useProfileCompletion';
    import QualifyBuyersHeader from '@/components/dashboard/buyers/QualifyBuyersHeader';
    import QualifyBuyersControls from '@/components/dashboard/buyers/QualifyBuyersControls';
    import BuyerCard from '@/components/dashboard/buyers/BuyerCard';
    import BuyerDetailModal from '@/components/dashboard/buyers/BuyerDetailModal';
    import AddBuyerForm from '@/components/dashboard/buyers/AddBuyerForm';
    import AddAppointmentModal from '@/components/dashboard/appointments/AddAppointmentModal';
    import FeatureLockedModal from '@/components/dashboard/FeatureLockedModal';
    import { useAuth } from '@/contexts/SupabaseAuthContext';
    import { getFullUserProfile } from '@/lib/profiles';
    import { fetchMyLeads, addLead, updateLead, deleteLead } from '@/lib/realtorLeads';

    const QualifyBuyers = () => {
      const { user, supabase, loading: authLoading } = useAuth();
      const [userProfile, setUserProfile] = useState(null);
      const [leads, setLeads] = useState([]);
      const [filteredLeads, setFilteredLeads] = useState([]);
      const [searchTerm, setSearchTerm] = useState('');
      const [statusFilter, setStatusFilter] = useState('all');
      const [showAddForm, setShowAddForm] = useState(false);
      const [selectedLead, setSelectedLead] = useState(null);
      const [leadForAppointment, setLeadForAppointment] = useState(null);
      const [loadingLeads, setLoadingLeads] = useState(true);
      const [featureLockedModal, setFeatureLockedModal] = useState(false);
      const { toast } = useToast();
      const { isProfileComplete } = useProfileCompletion(userProfile);

      const statusOptions = [
        { value: 'all', label: 'All Leads', color: 'bg-gray-100 text-gray-800' },
        { value: 'New', label: 'New Lead', color: 'bg-blue-100 text-blue-800' },
        { value: 'Contacted', label: 'Contacted', color: 'bg-yellow-100 text-yellow-800' },
        { value: 'Qualified', label: 'Qualified', color: 'bg-green-100 text-green-800' },
        { value: 'Needs Docs', label: 'Needs Docs', color: 'bg-orange-100 text-orange-800' },
        { value: 'Assigned to LO', label: 'Assigned to LO', color: 'bg-purple-100 text-purple-800' },
        { value: 'Not Qualified', label: 'Not Qualified', color: 'bg-red-100 text-red-800' }
      ];

      const fetchUserData = useCallback(async () => {
        if (user && supabase) {
          const { data, error } = await getFullUserProfile(user.id);
          if (error) {
            console.error('Error fetching user profile:', error);
            toast({ title: "Error", description: "Could not fetch user profile.", variant: "destructive" });
          } else {
            setUserProfile(data);
            if (data?.position === 'Real Estate Agent') {
              const { data: leadsData, error: leadsError } = await fetchMyLeads(supabase, user.id);
              if (leadsError) {
                toast({ title: "Error", description: "Could not fetch leads.", variant: "destructive" });
              } else {
                setLeads(leadsData || []);
              }
            }
          }
          setLoadingLeads(false);
        }
      }, [user, supabase, toast]);

      useEffect(() => {
        fetchUserData();
      }, [fetchUserData]);

      useEffect(() => {
        let filtered = leads;
        if (searchTerm) {
          filtered = filtered.filter(lead =>
            `${lead.buyer_first_name} ${lead.buyer_last_name}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
            lead.buyer_email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            (lead.buyer_phone && lead.buyer_phone.includes(searchTerm))
          );
        }
        if (statusFilter !== 'all') {
          filtered = filtered.filter(lead => lead.status === statusFilter);
        }
        setFilteredLeads(filtered);
      }, [leads, searchTerm, statusFilter]);

      const handleAddLead = useCallback(async (leadData) => {
        if (!isProfileComplete) {
          setFeatureLockedModal(true);
          return;
        }

        if (!user || !userProfile || userProfile.position !== 'Real Estate Agent') {
          toast({ title: "Unauthorized", description: "Only real estate agents can add leads.", variant: "destructive" });
          return;
        }

        const newLeadPayload = {
          realtor_id: user.id,
          buyer_first_name: leadData.firstName,
          buyer_last_name: leadData.lastName,
          buyer_email: leadData.email,
          buyer_phone: leadData.phone,
          desired_purchase_price: parseFloat(leadData.desiredPurchasePrice) || null,
          monthly_budget: parseFloat(leadData.monthlyBudget) || null,
          down_payment_percent: parseFloat(leadData.downPaymentPercent) || null,
          down_payment_amount: leadData.downPaymentAmount ? parseFloat(leadData.downPaymentAmount) : (leadData.desiredPurchasePrice && leadData.downPaymentPercent ? parseFloat(leadData.desiredPurchasePrice) * (parseFloat(leadData.downPaymentPercent)/100) : null),
          monthly_income: parseFloat(leadData.monthlyIncome) || null,
          credit_score: parseInt(leadData.creditScore) || null,
          monthly_debts: parseFloat(leadData.monthlyDebts) || null,
          employment_type: leadData.employmentType,
          property_type: leadData.propertyType,
          buyer_notes: leadData.notes,
          status: 'New',
          source: 'QualifyBuyersFeature'
        };

        const { data, error } = await addLead(supabase, newLeadPayload);

        if (error) {
          console.error('Error adding lead:', error);
          toast({ title: "Error", description: "Could not add lead. " + error.message, variant: "destructive" });
        } else if (data) {
          setLeads(prevLeads => [data, ...prevLeads]);
          setShowAddForm(false);
          toast({
            title: "Lead added successfully! 🎉",
            description: `${data.buyer_first_name} ${data.buyer_last_name} has been added.`,
          });
        }
      }, [user, userProfile, supabase, toast, isProfileComplete]);

      const handleStatusChange = useCallback(async (leadId, newStatus) => {
        const { data, error } = await updateLead(supabase, leadId, { status: newStatus, updated_at: new Date().toISOString() });

        if (error) {
          toast({ title: "Error", description: "Could not update lead status.", variant: "destructive" });
        } else if (data) {
          setLeads(prevLeads => prevLeads.map(lead =>
            lead.id === leadId ? { ...lead, ...data } : lead
          ));
          toast({ title: "Status updated!", description: `Lead status changed to ${newStatus}.` });
        }
      }, [supabase, toast]);

      const handleDeleteLead = useCallback(async (leadId) => {
        const { error } = await deleteLead(supabase, leadId);

        if (error) {
          toast({ title: "Error", description: "Could not delete lead.", variant: "destructive" });
        } else {
          setLeads(prevLeads => prevLeads.filter(lead => lead.id !== leadId));
          toast({ title: "Lead removed", description: "Lead has been removed." });
        }
      }, [supabase, toast]);

      const handleScheduleAppointment = (lead) => {
        const leadData = {
          id: lead.id,
          firstName: lead.buyer_first_name,
          lastName: lead.buyer_last_name,
        };
        setLeadForAppointment(leadData);
      };

      const handleAddBuyerClick = () => {
        if (!isProfileComplete) {
          setFeatureLockedModal(true);
          return;
        }
        setShowAddForm(true);
      };

      if (authLoading || loadingLeads) {
        return (
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            <p className="ml-4 text-lg">Loading Buyer Pipeline...</p>
          </div>
        );
      }

      if (!userProfile || userProfile.position !== 'Real Estate Agent') {
        return (
          <div className="flex flex-col items-center justify-center h-64 bg-yellow-50 border border-yellow-200 rounded-lg p-8">
            <AlertTriangle className="w-16 h-16 text-yellow-500 mb-4" />
            <h2 className="text-2xl font-semibold text-yellow-700 mb-2">Access Denied</h2>
            <p className="text-yellow-600 text-center">
              The "Qualify Buyers" feature is exclusively available for Real Estate Agent accounts.
            </p>
          </div>
        );
      }

      return (
        <div className="space-y-8">
          <QualifyBuyersHeader buyers={leads} />
          <QualifyBuyersControls
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            statusFilter={statusFilter}
            setStatusFilter={setStatusFilter}
            statusOptions={statusOptions}
            onAddBuyer={handleAddBuyerClick}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence>
              {filteredLeads.map((lead) => (
                <BuyerCard
                  key={lead.id}
                  buyer={{
                    id: lead.id,
                    firstName: lead.buyer_first_name,
                    lastName: lead.buyer_last_name,
                    email: lead.buyer_email,
                    phone: lead.buyer_phone,
                    status: lead.status,
                    createdDate: lead.created_at,
                    lastUpdated: lead.updated_at,
                    qualificationScore: lead.qualification_score,
                    desiredPurchasePrice: lead.desired_purchase_price,
                    monthlyBudget: lead.monthly_budget,
                    creditScore: lead.credit_score,
                    monthlyDebts: lead.monthly_debts,
                    downPaymentPercent: lead.down_payment_percent,
                  }}
                  onStatusChange={handleStatusChange}
                  onDelete={handleDeleteLead}
                  onViewDetails={() => setSelectedLead(lead)}
                  onScheduleAppointment={() => handleScheduleAppointment(lead)}
                  statusOptions={statusOptions}
                />
              ))}
            </AnimatePresence>
          </div>
          {filteredLeads.length === 0 && (
            <div className="text-center py-12">
              <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {leads.length === 0 ? 'No buyers yet' : 'No buyers found'}
              </h3>
              <p className="text-gray-600 mb-6">
                {leads.length === 0
                  ? 'Start building your buyer pipeline by adding your first buyer.'
                  : 'Try adjusting your search or filter criteria.'}
              </p>
              {leads.length === 0 && (
                <Button
                  onClick={handleAddBuyerClick}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                >
                  <Plus className="w-5 h-5 mr-2" />
                  Add Your First Buyer
                </Button>
              )}
            </div>
          )}
          <AnimatePresence>
            {showAddForm && (
              <AddBuyerForm
                onSubmit={handleAddLead}
                onClose={() => setShowAddForm(false)}
              />
            )}
            {selectedLead && (
              <BuyerDetailModal
                buyer={{
                    id: selectedLead.id,
                    firstName: selectedLead.buyer_first_name,
                    lastName: selectedLead.buyer_last_name,
                    email: selectedLead.buyer_email,
                    phone: selectedLead.buyer_phone,
                    status: selectedLead.status,
                    createdDate: selectedLead.created_at,
                    lastUpdated: selectedLead.updated_at,
                    desiredPurchasePrice: selectedLead.desired_purchase_price,
                    monthlyBudget: selectedLead.monthly_budget,
                    downPaymentPercent: selectedLead.down_payment_percent,
                    downPaymentAmount: selectedLead.down_payment_amount,
                    monthlyIncome: selectedLead.monthly_income,
                    creditScore: selectedLead.credit_score,
                    monthlyDebts: selectedLead.monthly_debts,
                    employmentType: selectedLead.employment_type,
                    propertyType: selectedLead.property_type,
                    notes: selectedLead.buyer_notes,
                    qualificationScore: selectedLead.qualification_score,
                }}
                onClose={() => setSelectedLead(null)}
                onStatusChange={handleStatusChange}
                statusOptions={statusOptions}
                onScheduleAppointment={() => {
                  handleScheduleAppointment(selectedLead);
                  setSelectedLead(null);
                }}
              />
            )}
            {leadForAppointment && (
              <AddAppointmentModal
                user={user}
                realtorLeadId={leadForAppointment.id}
                onClose={() => setLeadForAppointment(null)}
                onAppointmentCreated={() => {
                  toast({title: "Success", description: "Appointment scheduled."})
                }}
              />
            )}
          </AnimatePresence>

          <FeatureLockedModal
            isOpen={featureLockedModal}
            onClose={() => setFeatureLockedModal(false)}
            featureName="Qualify Buyers"
            userProfile={userProfile}
          />
        </div>
      );
    };

    export default QualifyBuyers;
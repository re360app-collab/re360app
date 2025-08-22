import React, { useState, useEffect, useCallback } from 'react';
    import { motion, AnimatePresence } from 'framer-motion';
    import { Users, UserPlus, Phone, Mail } from 'lucide-react';
    import { useToast } from '@/components/ui/use-toast';
    import { useAuth } from '@/contexts/SupabaseAuthContext';
    import AddAppointmentModal from '@/components/dashboard/appointments/AddAppointmentModal';
    import { fetchAssignedAgentRegistrations, updateAgentRegistration } from '@/lib/agentRegistrations';

    const MyRealtorLeads = () => {
      const { user, supabase, loading: authLoading } = useAuth();
      const [leads, setLeads] = useState([]);
      const [loadingLeads, setLoadingLeads] = useState(true);
      const [realtorLeadForAppointment, setRealtorLeadForAppointment] = useState(null);
      const { toast } = useToast();

      const statusOptions = [
        { value: 'Assigned', label: 'New Lead' },
        { value: 'Contacted', label: 'Contacted' },
        { value: 'Follow-up', label: 'Follow-up' },
        { value: 'Partnered', label: 'Partnered' },
        { value: 'Not Interested', label: 'Not Interested' },
      ];
      
      const getStatusColor = (status) => {
        const colors = {
          'Assigned': 'bg-purple-100 text-purple-800',
          'Contacted': 'bg-yellow-100 text-yellow-800',
          'Follow-up': 'bg-blue-100 text-blue-800',
          'Partnered': 'bg-green-100 text-green-800',
          'Not Interested': 'bg-red-100 text-red-800',
        };
        return colors[status] || 'bg-gray-100 text-gray-800';
      };

      const loadAssignedLeads = useCallback(async () => {
        if (!user || !supabase) return;
        setLoadingLeads(true);
        const { data, error } = await fetchAssignedAgentRegistrations(supabase, user.id);
        if (error) {
          toast({ title: "Error", description: "Could not fetch your realtor leads.", variant: "destructive" });
        } else {
          setLeads(data || []);
        }
        setLoadingLeads(false);
      }, [user, supabase, toast]);

      useEffect(() => {
        loadAssignedLeads();
      }, [loadAssignedLeads]);

      const handleUpdateStatus = async (lead, newStatus) => {
        const { data, error } = await updateAgentRegistration(supabase, lead.id, { status: newStatus, updated_at: new Date().toISOString() });
        
        if (error) {
          toast({ title: "Update Failed", description: "Could not update lead status.", variant: "destructive" });
        } else {
          setLeads(prevLeads => prevLeads.map(l => l.id === lead.id ? { ...l, ...data } : l));
          toast({ title: "Status Updated!", description: `Realtor lead status changed to ${newStatus}.` });
          if (newStatus === 'Follow-up') {
            const leadData = {
              id: lead.id,
              firstName: lead.first_name,
              lastName: lead.last_name,
            };
            setRealtorLeadForAppointment(leadData);
          }
        }
      };

      if (authLoading || loadingLeads) {
        return <div className="flex items-center justify-center h-64"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div><p className="ml-4">Loading Realtor Leads...</p></div>;
      }

      return (
        <>
          <div className="space-y-8">
            <div className="bg-gradient-to-r from-green-600 to-emerald-700 rounded-2xl p-8 text-white">
              <h1 className="text-3xl font-bold mb-2">My Realtor Leads</h1>
              <p className="text-xl opacity-90">Connect with new realtors and build your network.</p>
            </div>
            
            {leads.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <AnimatePresence>
                  {leads.map((lead, index) => (
                    <motion.div
                      key={lead.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="bg-white rounded-xl shadow-lg p-6 border flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex justify-between items-start mb-4">
                          <h3 className="text-xl font-bold text-gray-800">{lead.first_name} {lead.last_name}</h3>
                          <select
                              value={lead.status || 'Assigned'}
                              onChange={(e) => handleUpdateStatus(lead, e.target.value)}
                              className={`text-xs font-semibold rounded-full border px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none bg-transparent ${getStatusColor(lead.status)}`}
                            >
                              {statusOptions.map(opt => (
                                <option key={opt.value} value={opt.value}>{opt.label}</option>
                              ))}
                            </select>
                        </div>
                        <p className="text-sm text-gray-500 mb-4">{lead.position || 'Realtor'}</p>
                        
                        <div className="space-y-3 text-sm">
                          <div className="flex items-center text-gray-600">
                            <Mail className="w-4 h-4 mr-3 text-gray-400" />
                            <a href={`mailto:${lead.email}`} className="hover:text-blue-600">{lead.email}</a>
                          </div>
                          <div className="flex items-center text-gray-600">
                            <Phone className="w-4 h-4 mr-3 text-gray-400" />
                            <a href={`tel:${lead.phone}`} className="hover:text-blue-600">{lead.phone || 'N/A'}</a>
                          </div>
                        </div>
                      </div>

                      <div className="mt-6 border-t pt-4">
                        <p className="text-xs text-gray-400">Assigned on: {new Date(lead.created_at).toLocaleDateString()}</p>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            ) : (
              <EmptyState />
            )}
          </div>
          <AnimatePresence>
            {realtorLeadForAppointment && (
              <AddAppointmentModal
                user={user}
                realtorLead={realtorLeadForAppointment}
                onClose={() => setRealtorLeadForAppointment(null)}
                onAppointmentCreated={() => {
                  toast({ title: "Success", description: "Follow-up appointment scheduled." });
                  loadAssignedLeads();
                }}
              />
            )}
          </AnimatePresence>
        </>
      );
    };

    const EmptyState = () => (
      <div className="text-center py-16 bg-white rounded-xl shadow-lg">
        <UserPlus className="w-20 h-20 text-gray-300 mx-auto mb-4" />
        <h3 className="text-2xl font-semibold text-gray-800 mb-2">No Realtor Leads Yet</h3>
        <p className="text-gray-500 max-w-md mx-auto">When an admin assigns a new realtor lead to you, it will appear here. Check back soon!</p>
      </div>
    );

    export default MyRealtorLeads;
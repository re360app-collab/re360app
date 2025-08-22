import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, Eye, Filter, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { useAuth } from '@/contexts/SupabaseAuthContext';
import BuyerDetailModal from '@/components/dashboard/buyers/BuyerDetailModal';
import { fetchAssignedLeads, updateLead } from '@/lib/realtorLeads';

const LoanOfficerLeadsView = () => {
  const { user, supabase, loading: authLoading } = useAuth();
  const [leads, setLeads] = useState([]);
  const [filteredLeads, setFilteredLeads] = useState([]);
  const [loadingLeads, setLoadingLeads] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedLeadDetails, setSelectedLeadDetails] = useState(null);
  const { toast } = useToast();

  const statusOptions = [
    { value: 'all', label: 'All Leads', color: 'bg-gray-100 text-gray-800' },
    { value: 'Assigned to LO', label: 'New (Assigned)', color: 'bg-purple-100 text-purple-800' },
    { value: 'Contacted', label: 'Contacted', color: 'bg-yellow-100 text-yellow-800' },
    { value: 'Qualified', label: 'Qualified', color: 'bg-green-100 text-green-800' },
    { value: 'Needs Docs', label: 'Needs Docs', color: 'bg-orange-100 text-orange-800' },
    { value: 'Not Qualified', label: 'Not Qualified', color: 'bg-red-100 text-red-800' },
    { value: 'Pre-Approved', label: 'Pre-Approved', color: 'bg-blue-100 text-blue-800' },
  ];

  const fetchAssignedLeadsData = useCallback(async () => {
    if (!user || !supabase) return;
    setLoadingLeads(true);
    try {
      const { data, error } = await fetchAssignedLeads(supabase, user.id);
      if (error) throw error;
      setLeads(data || []);
    } catch (error) {
      console.error('Error fetching assigned leads:', error);
      toast({ title: "Error", description: "Could not fetch assigned leads.", variant: "destructive" });
    } finally {
      setLoadingLeads(false);
    }
  }, [user, supabase, toast]);

  useEffect(() => {
    if (user) {
      fetchAssignedLeadsData();
    }
  }, [user, fetchAssignedLeadsData]);

  useEffect(() => {
    let filtered = leads;
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      filtered = filtered.filter(lead =>
        `${lead.buyer_first_name} ${lead.buyer_last_name}`.toLowerCase().includes(searchLower) ||
        lead.buyer_email.toLowerCase().includes(searchLower) ||
        (lead.realtor_profile?.first_name?.toLowerCase().includes(searchLower)) ||
        (lead.realtor_profile?.last_name?.toLowerCase().includes(searchLower))
      );
    }
    if (statusFilter !== 'all') {
      filtered = filtered.filter(lead => lead.status === statusFilter);
    }
    setFilteredLeads(filtered);
  }, [leads, searchTerm, statusFilter]);

  const getRealtorName = (lead) => lead.realtor_profile ? `${lead.realtor_profile.first_name} ${lead.realtor_profile.last_name}` : 'Unknown Realtor';
  const getStatusColor = (status) => statusOptions.find(s => s.value === status)?.color || 'bg-gray-100 text-gray-800';

  const handleUpdateLeadStatus = async (leadId, newStatus) => {
    const { data, error } = await updateLead(supabase, leadId, { status: newStatus, updated_at: new Date().toISOString() });

    if (error) {
      toast({ title: "Error", description: "Could not update lead status.", variant: "destructive" });
    } else {
      setLeads(prevLeads => prevLeads.map(lead =>
        lead.id === leadId ? { ...lead, ...data } : lead
      ));
      toast({ title: "Status updated!", description: `Lead status changed to ${newStatus}.` });
    }
  };

  if (authLoading || loadingLeads) {
    return <div className="flex items-center justify-center h-64"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div><p className="ml-4 text-lg">Loading Assigned Leads...</p></div>;
  }

  return (
    <div className="space-y-8">
      <div className="bg-gradient-to-r from-cyan-600 to-sky-700 rounded-2xl p-8 text-white relative overflow-hidden">
        <h1 className="text-3xl font-bold mb-2">My Assigned Leads</h1>
        <p className="text-xl opacity-90">Manage leads assigned to you by admins.</p>
      </div>

      <div className="bg-white rounded-xl p-6 shadow-lg">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Filter className="w-5 h-5 text-gray-400" />
              <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                {statusOptions.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
              </select>
            </div>
            <div className="flex items-center space-x-2">
              <Search className="w-5 h-5 text-gray-400" />
              <input type="text" placeholder="Search leads or realtors..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 md:w-64" />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <Th>Buyer</Th>
                <Th>Realtor</Th>
                <Th>Purchase Price</Th>
                <Th>Status</Th>
                <Th>Assigned On</Th>
                <Th>Actions</Th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredLeads.map((lead) => (
                <tr key={lead.id} className="hover:bg-gray-50">
                  <Td>
                    <div>{lead.buyer_first_name} {lead.buyer_last_name}</div>
                    <div className="text-xs text-gray-500">{lead.buyer_email}</div>
                  </Td>
                  <Td>{getRealtorName(lead)}</Td>
                  <Td>${lead.desired_purchase_price?.toLocaleString() || 'N/A'}</Td>
                  <Td>
                     <select
                        value={lead.status || 'Assigned to LO'}
                        onChange={(e) => handleUpdateLeadStatus(lead.id, e.target.value)}
                        className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full border ${getStatusColor(lead.status)} focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none bg-transparent`}
                        style={{ WebkitAppearance: 'none', MozAppearance: 'none', appearance: 'none' }}
                      >
                        {statusOptions.filter(s => s.value !== 'all').map(opt => (
                          <option key={opt.value} value={opt.value} className="bg-white text-gray-800">{opt.label}</option>
                        ))}
                      </select>
                  </Td>
                  <Td>{new Date(lead.updated_at).toLocaleDateString()}</Td>
                  <Td>
                    <Button size="sm" variant="outline" onClick={() => setSelectedLeadDetails(lead)}><Eye className="w-4 h-4 mr-1" /> View</Button>
                  </Td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filteredLeads.length === 0 && <EmptyState message={leads.length === 0 ? "No leads assigned to you yet." : "No leads match your filters."} />}
      </div>

      <AnimatePresence>
        {selectedLeadDetails && (
          <BuyerDetailModal
            buyer={{
                id: selectedLeadDetails.id,
                firstName: selectedLeadDetails.buyer_first_name,
                lastName: selectedLeadDetails.buyer_last_name,
                email: selectedLeadDetails.buyer_email,
                phone: selectedLeadDetails.buyer_phone,
                status: selectedLeadDetails.status,
                createdDate: selectedLeadDetails.created_at,
                lastUpdated: selectedLeadDetails.updated_at,
                desiredPurchasePrice: selectedLeadDetails.desired_purchase_price,
                monthlyBudget: selectedLeadDetails.monthly_budget,
                downPaymentPercent: selectedLeadDetails.down_payment_percent,
                downPaymentAmount: selectedLeadDetails.down_payment_amount,
                monthlyIncome: selectedLeadDetails.monthly_income,
                creditScore: selectedLeadDetails.credit_score,
                monthlyDebts: selectedLeadDetails.monthly_debts,
                employmentType: selectedLeadDetails.employment_type,
                propertyType: selectedLeadDetails.property_type,
                notes: selectedLeadDetails.buyer_notes,
                qualificationScore: selectedLeadDetails.qualification_score,
            }}
            onClose={() => setSelectedLeadDetails(null)}
            onStatusChange={handleUpdateLeadStatus}
            statusOptions={statusOptions}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

const Th = ({ children }) => <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{children}</th>;
const Td = ({ children, className = "" }) => <td className={`px-6 py-4 whitespace-nowrap text-sm text-gray-700 ${className}`}>{children}</td>;
const EmptyState = ({ message }) => (
  <div className="text-center py-12">
    <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
    <h3 className="text-xl font-semibold text-gray-900 mb-2">{message}</h3>
  </div>
);

export default LoanOfficerLeadsView;
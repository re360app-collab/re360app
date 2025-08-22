import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, UserPlus, UserCheck, Search, Filter, Edit2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import AdminRealtorLeadAssignmentModal from '@/components/dashboard/admin/AdminRealtorLeadAssignmentModal';
import { fetchAllAgentRegistrations } from '@/lib/agentRegistrations';
import { fetchAllUserProfiles } from '@/lib/profiles';
import { useAuth } from '@/contexts/SupabaseAuthContext';

const AdminRealtorLeads = () => {
  const { supabase } = useAuth();
  const [leads, setLeads] = useState([]);
  const [loanOfficers, setLoanOfficers] = useState({});
  const [loading, setLoading] = useState(true);
  const [selectedLeadForAssignment, setSelectedLeadForAssignment] = useState(null);
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const { toast } = useToast();

  const statusOptions = [
    { value: 'all', label: 'All Leads', color: 'bg-gray-100 text-gray-800' },
    { value: 'New', label: 'New Lead', color: 'bg-blue-100 text-blue-800' },
    { value: 'Contacted', label: 'Contacted', color: 'bg-yellow-100 text-yellow-800' },
    { value: 'Assigned', label: 'Assigned', color: 'bg-purple-100 text-purple-800' },
    { value: 'Partnered', label: 'Partnered', color: 'bg-green-100 text-green-800' },
    { value: 'Not Interested', label: 'Not Interested', color: 'bg-red-100 text-red-800' }
  ];

  const fetchData = useCallback(async () => {
    if (!supabase) return;
    setLoading(true);
    try {
      const [leadsRes, profilesRes] = await Promise.all([
        fetchAllAgentRegistrations(supabase),
        fetchAllUserProfiles(supabase)
      ]);

      if (leadsRes.error) throw leadsRes.error;
      setLeads(leadsRes.data || []);

      if (profilesRes.error) throw profilesRes.error;
      const loanOfficersMap = {};
      (profilesRes.data || []).forEach(profile => {
        if (profile.position === 'Loan Officer' || profile.position === 'NMB Admin' || profile.position === 'System Admin') {
          loanOfficersMap[profile.user_id] = profile;
        }
      });
      setLoanOfficers(loanOfficersMap);

    } catch (error) {
      console.error('Error fetching data:', error);
      toast({ title: "Error", description: "Failed to load realtor leads data.", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  }, [supabase, toast]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const getLoanOfficerName = (loId) => loanOfficers[loId] ? `${loanOfficers[loId].first_name} ${loanOfficers[loId].last_name}` : 'N/A';
  const getStatusColor = (status) => statusOptions.find(s => s.value === status)?.color || 'bg-gray-100 text-gray-800';

  const filteredLeads = leads.filter(lead => {
    const matchesStatus = filterStatus === 'all' || lead.status === filterStatus;
    const searchLower = searchTerm.toLowerCase();
    const matchesSearch = searchTerm === '' ||
      `${lead.first_name} ${lead.last_name}`.toLowerCase().includes(searchLower) ||
      lead.email.toLowerCase().includes(searchLower) ||
      (lead.phone && lead.phone.toLowerCase().includes(searchLower)) ||
      (lead.brokerage_name && lead.brokerage_name.toLowerCase().includes(searchLower)) ||
      (lead.assigned_loan_officer_id && getLoanOfficerName(lead.assigned_loan_officer_id).toLowerCase().includes(searchLower));
    return matchesStatus && matchesSearch;
  });

  const stats = {
    totalLeads: leads.length,
    newLeads: leads.filter(l => l.status === 'New').length,
    assignedLeads: leads.filter(l => l.assigned_loan_officer_id !== null).length,
  };

  const handleLeadAssigned = (updatedLead) => {
    setLeads(prevLeads => prevLeads.map(l => l.id === updatedLead.id ? updatedLead : l));
  };

  if (loading) {
    return <div className="flex items-center justify-center h-64"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div></div>;
  }

  return (
    <div className="space-y-8">
      <div className="bg-gradient-to-r from-teal-600 to-cyan-700 rounded-2xl p-8 text-white">
        <h1 className="text-3xl font-bold mb-2">Realtor Leads Management</h1>
        <p className="text-xl opacity-90">Assign new realtors to loan officers to build partnerships.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard title="Total Realtor Leads" value={stats.totalLeads} icon={<Users className="w-8 h-8 text-teal-600" />} />
        <StatCard title="New Leads" value={stats.newLeads} icon={<UserPlus className="w-8 h-8 text-yellow-600" />} />
        <StatCard title="Assigned Leads" value={stats.assignedLeads} icon={<UserCheck className="w-8 h-8 text-purple-600" />} />
      </div>

      <div className="bg-white rounded-xl p-6 shadow-lg flex justify-between items-center">
        <div className="flex items-center space-x-4">
            <FilterControl value={filterStatus} onChange={setFilterStatus} options={statusOptions.map(s => ({value: s.value, label: s.label}))} />
            <SearchControl value={searchTerm} onChange={setSearchTerm} placeholder="Search realtors, brokerages..." />
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <Th>Realtor</Th>
                <Th>Brokerage</Th>
                <Th>Position</Th>
                <Th>Status</Th>
                <Th>Assigned LO</Th>
                <Th>Registered On</Th>
                <Th>Actions</Th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredLeads.map((lead) => (
                <tr key={lead.id} className="hover:bg-gray-50">
                  <Td>
                    <div>{lead.first_name} {lead.last_name}</div>
                    <div className="text-xs text-gray-500">{lead.email}</div>
                    <div className="text-xs text-gray-500">{lead.phone || 'N/A'}</div>
                  </Td>
                  <Td>{lead.brokerage_name || 'N/A'}</Td>
                  <Td>{lead.position}</Td>
                  <Td>
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(lead.status)}`}>
                        {lead.status}
                    </span>
                  </Td>
                  <Td>{getLoanOfficerName(lead.assigned_loan_officer_id)}</Td>
                  <Td>{new Date(lead.created_at).toLocaleDateString()}</Td>
                  <Td>
                    <Button size="sm" variant="outline" onClick={() => setSelectedLeadForAssignment(lead)}><Edit2 className="w-4 h-4 mr-1" /> Assign</Button>
                  </Td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filteredLeads.length === 0 && <EmptyState message={leads.length === 0 ? "No realtors have registered yet." : "No realtors match your filters."} />}
      </div>

      <AnimatePresence>
        {selectedLeadForAssignment && (
          <AdminRealtorLeadAssignmentModal
            lead={selectedLeadForAssignment}
            onClose={() => setSelectedLeadForAssignment(null)}
            onLeadAssigned={handleLeadAssigned}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

const StatCard = ({ title, value, icon }) => (
  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-xl p-6 shadow-lg border">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-gray-600">{title}</p>
        <p className="text-3xl font-bold text-gray-900">{value}</p>
      </div>
      {icon}
    </div>
  </motion.div>
);

const FilterControl = ({ value, onChange, options }) => (
  <div className="flex items-center space-x-2">
    <Filter className="w-5 h-5 text-gray-400" />
    <select value={value} onChange={(e) => onChange(e.target.value)} className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
      {options.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
    </select>
  </div>
);

const SearchControl = ({ value, onChange, placeholder }) => (
  <div className="relative">
    <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
    <input type="text" placeholder={placeholder} value={value} onChange={(e) => onChange(e.target.value)} className="pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 md:w-64" />
  </div>
);

const Th = ({ children }) => <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{children}</th>;
const Td = ({ children, className = "" }) => <td className={`px-6 py-4 whitespace-nowrap text-sm text-gray-700 ${className}`}>{children}</td>;

const EmptyState = ({ message }) => (
  <div className="text-center py-12">
    <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
    <h3 className="text-xl font-semibold text-gray-900 mb-2">{message}</h3>
  </div>
);

export default AdminRealtorLeads;
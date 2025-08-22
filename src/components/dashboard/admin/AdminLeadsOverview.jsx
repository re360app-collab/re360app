import React, { useState, useEffect, useCallback } from 'react';
    import { motion, AnimatePresence } from 'framer-motion';
    import { Users, TrendingUp, DollarSign, CheckCircle, AlertCircle, Search, Filter, Download, Eye, Edit2, UserCheck, Loader2 } from 'lucide-react';
    import { Button } from '@/components/ui/button';
    import { useToast } from '@/components/ui/use-toast';
    import AdminLeadAssignmentModal from '@/components/dashboard/admin/AdminLeadAssignmentModal';
    import BuyerDetailModal from '@/components/dashboard/buyers/BuyerDetailModal';
    import { fetchAllLeads, updateLead } from '@/lib/realtorLeads';
    import { useAuth } from '@/contexts/SupabaseAuthContext';

    const AdminLeadsOverview = () => {
      const [leads, setLeads] = useState([]);
      const [loading, setLoading] = useState(true);
      const [error, setError] = useState(null);
      const [selectedLeadForAssignment, setSelectedLeadForAssignment] = useState(null);
      const [selectedLeadForDetails, setSelectedLeadForDetails] = useState(null);
      const [filterStatus, setFilterStatus] = useState('all');
      const [searchTerm, setSearchTerm] = useState('');
      const { toast } = useToast();
      const { supabase } = useAuth();

      const statusOptions = [
        { value: 'all', label: 'All Leads', color: 'bg-gray-100 text-gray-800' },
        { value: 'New', label: 'New Lead', color: 'bg-blue-100 text-blue-800' },
        { value: 'Contacted', label: 'Contacted', color: 'bg-yellow-100 text-yellow-800' },
        { value: 'Qualified', label: 'Qualified', color: 'bg-green-100 text-green-800' },
        { value: 'Needs Docs', label: 'Needs Docs', color: 'bg-orange-100 text-orange-800' },
        { value: 'Assigned to LO', label: 'Assigned to LO', color: 'bg-purple-100 text-purple-800' },
        { value: 'Not Qualified', label: 'Not Qualified', color: 'bg-red-100 text-red-800' }
      ];

      const fetchData = useCallback(async () => {
        if (!supabase) return;
        setLoading(true);
        setError(null);
        try {
          const { data, error: fetchError } = await fetchAllLeads(supabase);
          if (fetchError) throw fetchError;
          setLeads(data || []);
        } catch (error) {
          console.error('Error fetching leads:', error);
          setError("Failed to load leads data. Please try again.");
          toast({ title: "Error", description: error.message || "An unexpected error occurred.", variant: "destructive" });
        } finally {
          setLoading(false);
        }
      }, [toast, supabase]);

      useEffect(() => {
        fetchData();
      }, [fetchData]);

      const getRealtorName = (lead) => lead.realtor_profile ? `${lead.realtor_profile.first_name} ${lead.realtor_profile.last_name}` : 'Unknown Realtor';
      const getLoanOfficerName = (lead) => lead.lo_profile ? `${lead.lo_profile.first_name} ${lead.lo_profile.last_name}` : 'N/A';
      const getStatusColor = (status) => statusOptions.find(s => s.value === status)?.color || 'bg-gray-100 text-gray-800';

      const filteredLeads = leads.filter(lead => {
        const matchesStatus = filterStatus === 'all' || lead.status === filterStatus;
        const searchLower = searchTerm.toLowerCase();
        const matchesSearch = searchTerm === '' ||
          `${lead.buyer_first_name} ${lead.buyer_last_name}`.toLowerCase().includes(searchLower) ||
          lead.buyer_email.toLowerCase().includes(searchLower) ||
          getRealtorName(lead).toLowerCase().includes(searchLower) ||
          getLoanOfficerName(lead).toLowerCase().includes(searchLower);
        return matchesStatus && matchesSearch;
      });

      const stats = {
        totalLeads: leads.length,
        newLeads: leads.filter(l => l.status === 'New').length,
        assignedLeads: leads.filter(l => l.assigned_loan_officer_id !== null).length,
        qualifiedLeads: leads.filter(l => l.status === 'Qualified').length,
        averageScore: leads.length > 0 ? Math.round(leads.reduce((sum, lead) => sum + (lead.qualification_score || 0), 0) / leads.filter(l => l.qualification_score).length) : 0,
        totalValue: leads.reduce((sum, lead) => sum + (lead.desired_purchase_price || 0), 0),
      };

      const handleLeadAssigned = (updatedLead) => {
        setLeads(prevLeads => prevLeads.map(l => l.id === updatedLead.id ? updatedLead : l));
        fetchData();
      };
      
      const handleUpdateLeadStatus = async (leadId, newStatus) => {
        const { data, error } = await updateLead(supabase, leadId, { status: newStatus, updated_at: new Date().toISOString() });

        if (error) {
          toast({ title: "Error", description: "Could not update lead status.", variant: "destructive" });
        } else if (data) {
          setLeads(prevLeads => prevLeads.map(lead =>
            lead.id === leadId ? { ...lead, ...data } : lead
          ));
          toast({ title: "Status updated!", description: `Lead status changed to ${newStatus}.` });
        }
      };

      if (loading) {
        return <div className="flex items-center justify-center h-64"><Loader2 className="w-12 h-12 animate-spin text-blue-600" /></div>;
      }
      
      if (error) {
        return (
          <div className="flex flex-col items-center justify-center h-64 bg-red-50 text-red-700 rounded-lg p-6">
            <AlertCircle className="w-12 h-12 mb-4" />
            <h2 className="text-xl font-semibold mb-2">Something went wrong</h2>
            <p className="text-center mb-4">{error}</p>
            <Button onClick={fetchData} variant="destructive">Try Again</Button>
          </div>
        );
      }


      return (
        <div className="space-y-8">
          <div className="bg-gradient-to-r from-indigo-600 to-purple-700 rounded-2xl p-8 text-white relative overflow-hidden">
            <h1 className="text-3xl font-bold mb-2">Admin Leads Dashboard</h1>
            <p className="text-xl opacity-90">Manage and assign all incoming real estate leads.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
            <StatCard title="Total Leads" value={stats.totalLeads} icon={<Users className="w-8 h-8 text-blue-600" />} />
            <StatCard title="New Leads" value={stats.newLeads} icon={<AlertCircle className="w-8 h-8 text-yellow-600" />} />
            <StatCard title="Assigned Leads" value={stats.assignedLeads} icon={<UserCheck className="w-8 h-8 text-purple-600" />} />
            <StatCard title="Qualified Leads" value={stats.qualifiedLeads} icon={<CheckCircle className="w-8 h-8 text-green-600" />} />
            <StatCard title="Avg. Score" value={stats.averageScore || 'N/A'} icon={<TrendingUp className="w-8 h-8 text-orange-600" />} />
            <StatCard title="Total Value" value={`${(stats.totalValue / 1000000).toFixed(1)}M`} icon={<DollarSign className="w-8 h-8 text-teal-600" />} />
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
              <div className="flex items-center space-x-4">
                <FilterControl value={filterStatus} onChange={setFilterStatus} options={statusOptions.map(s => ({value: s.value, label: s.label}))} />
                <SearchControl value={searchTerm} onChange={setSearchTerm} placeholder="Search leads..." />
              </div>
              <Button variant="outline" onClick={() => toast({ title: "🚧 Export feature coming soon!" })}>
                <Download className="w-4 h-4 mr-2" /> Export Data
              </Button>
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
                    <Th>Assigned LO</Th>
                    <Th>Added</Th>
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
                            value={lead.status || 'New'}
                            onChange={(e) => handleUpdateLeadStatus(lead.id, e.target.value)}
                            className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full border ${getStatusColor(lead.status)} focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none bg-transparent`}
                            style={{ WebkitAppearance: 'none', MozAppearance: 'none', appearance: 'none' }}
                          >
                            {statusOptions.filter(s => s.value !== 'all').map(opt => (
                              <option key={opt.value} value={opt.value} className="bg-white text-gray-800">{opt.label}</option>
                            ))}
                          </select>
                      </Td>
                      <Td>{getLoanOfficerName(lead)}</Td>
                      <Td>{new Date(lead.created_at).toLocaleDateString()}</Td>
                      <Td className="space-x-2">
                        <Button size="sm" variant="outline" onClick={() => setSelectedLeadForDetails(lead)}><Eye className="w-4 h-4" /></Button>
                        <Button size="sm" variant="outline" onClick={() => setSelectedLeadForAssignment(lead)}><Edit2 className="w-4 h-4" /></Button>
                      </Td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {filteredLeads.length === 0 && <EmptyState message={leads.length === 0 ? "No leads submitted yet." : "No leads match your filters."} />}
          </div>

          <AnimatePresence>
            {selectedLeadForAssignment && (
              <AdminLeadAssignmentModal
                lead={selectedLeadForAssignment}
                onClose={() => setSelectedLeadForAssignment(null)}
                onLeadAssigned={handleLeadAssigned}
              />
            )}
            {selectedLeadForDetails && (
              <BuyerDetailModal
                 buyer={{
                    id: selectedLeadForDetails.id,
                    firstName: selectedLeadForDetails.buyer_first_name,
                    lastName: selectedLeadForDetails.buyer_last_name,
                    email: selectedLeadForDetails.buyer_email,
                    phone: selectedLeadForDetails.buyer_phone,
                    status: selectedLeadForDetails.status,
                    createdDate: selectedLeadForDetails.created_at,
                    lastUpdated: selectedLeadForDetails.updated_at,
                    desiredPurchasePrice: selectedLeadForDetails.desired_purchase_price,
                    monthlyBudget: selectedLeadForDetails.monthly_budget,
                    downPaymentPercent: selectedLeadForDetails.down_payment_percent,
                    downPaymentAmount: selectedLeadForDetails.down_payment_amount,
                    monthlyIncome: selectedLeadForDetails.monthly_income,
                    creditScore: selectedLeadForDetails.credit_score,
                    monthlyDebts: selectedLeadForDetails.monthly_debts,
                    employmentType: selectedLeadForDetails.employment_type,
                    propertyType: selectedLeadForDetails.property_type,
                    notes: selectedLeadForDetails.buyer_notes,
                    qualificationScore: selectedLeadForDetails.qualification_score,
                }}
                onClose={() => setSelectedLeadForDetails(null)}
                onStatusChange={handleUpdateLeadStatus}
                statusOptions={statusOptions}
              />
            )}
          </AnimatePresence>
        </div>
      );
    };

    const StatCard = ({ title, value, icon }) => (
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
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
      <div className="flex items-center space-x-2">
        <Search className="w-5 h-5 text-gray-400" />
        <input type="text" placeholder={placeholder} value={value} onChange={(e) => onChange(e.target.value)} className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 md:w-64" />
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

    export default AdminLeadsOverview;
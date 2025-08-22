import React, { useState, useEffect } from 'react';
    import { useToast } from '@/components/ui/use-toast';
    import AdminLoansOverviewHeader from '@/components/dashboard/admin/AdminLoansOverviewHeader';
    import AdminLoansStatsGrid from '@/components/dashboard/admin/AdminLoansStatsGrid';
    import AdminLoansFilterControls from '@/components/dashboard/admin/AdminLoansFilterControls';
    import AdminLoansTable from '@/components/dashboard/admin/AdminLoansTable';
    import AdminLoanDetailsModal from '@/components/dashboard/admin/AdminLoanDetailsModal';
    import { AnimatePresence } from 'framer-motion';
    import { getAllLoans } from '@/lib/loans';
    import { useAuth } from '@/contexts/SupabaseAuthContext';

    const AdminLoansOverview = () => {
      const [loans, setLoans] = useState([]);
      const [loading, setLoading] = useState(true);
      const [selectedLoan, setSelectedLoan] = useState(null);
      const [filterStatus, setFilterStatus] = useState('all');
      const [searchTerm, setSearchTerm] = useState('');
      const { toast } = useToast();
      const { user, supabase } = useAuth();

      useEffect(() => {
        if (supabase) {
          fetchLoansAndRealtors();
        }
      }, [supabase]);

      const fetchLoansAndRealtors = async () => {
        try {
          setLoading(true);
          
          const { data: loansData, error: loansError } = await getAllLoans(supabase);

          if (loansError) throw loansError;

          const processedLoans = loansData.map(loan => {
            const agentProfile = loan.agent_profile;
            return {
              ...loan,
              agent_info: agentProfile || { first_name: 'Unknown', last_name: 'Agent' }
            };
          });

          setLoans(processedLoans || []);

        } catch (error) {
          console.error('Error fetching data:', error);
          toast({
            title: "Error loading data",
            description: error.message || "Failed to load dashboard data. Please try again.",
            variant: "destructive"
          });
        } finally {
          setLoading(false);
        }
      };

      const getRealtorInfo = (loan) => {
        return loan.agent_info || { 
          first_name: 'Unknown', 
          last_name: 'Agent',
          brokerage_name: 'N/A',
          phone: 'N/A'
        };
      };

      const getStatusColor = (status) => {
        switch (status) {
          case 'pending': return 'bg-yellow-100 text-yellow-700 border-yellow-300';
          case 'in_progress': return 'bg-blue-100 text-blue-700 border-blue-300';
          case 'completed': return 'bg-green-100 text-green-700 border-green-300';
          case 'rejected': return 'bg-red-100 text-red-700 border-red-300';
          default: return 'bg-gray-100 text-gray-700 border-gray-300';
        }
      };

      const filteredLoans = loans.filter(loan => {
        const matchesStatus = filterStatus === 'all' || loan.status === filterStatus;
        const realtorInfo = getRealtorInfo(loan);
        const matchesSearch = searchTerm === '' || 
          loan.borrower_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          realtorInfo.first_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          realtorInfo.last_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          loan.loan_type?.toLowerCase().includes(searchTerm.toLowerCase());
        
        return matchesStatus && matchesSearch;
      });

      const stats = {
        totalLoans: loans.length,
        pendingLoans: loans.filter(l => l.status === 'pending').length,
        inProgressLoans: loans.filter(l => l.status === 'in_progress').length,
        completedLoans: loans.filter(l => l.status === 'completed').length,
        totalValue: loans.reduce((sum, loan) => sum + (Number(loan.purchase_price) || 0), 0),
        activeRealtors: new Set(loans.map(l => l.agent_id)).size
      };

      if (loading) {
        return (
          <div className="flex items-center justify-center h-screen bg-gray-50">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-600"></div>
            <p className="ml-4 text-lg text-gray-700">Loading Loan Data...</p>
          </div>
        );
      }

      return (
        <div className="space-y-6 sm:space-y-8 p-4 sm:p-6 bg-gray-50 min-h-screen">
          <AdminLoansOverviewHeader user={user} />
          <AdminLoansStatsGrid stats={stats} />
          <AdminLoansFilterControls 
            filterStatus={filterStatus}
            setFilterStatus={setFilterStatus}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
          />
          <AdminLoansTable 
            loans={filteredLoans}
            getRealtorInfo={getRealtorInfo}
            getStatusColor={getStatusColor}
            onSelectLoan={setSelectedLoan}
          />
          <AnimatePresence>
            {selectedLoan && (
              <AdminLoanDetailsModal 
                loan={selectedLoan}
                realtorInfo={getRealtorInfo(selectedLoan)}
                onClose={() => setSelectedLoan(null)}
              />
            )}
          </AnimatePresence>
        </div>
      );
    };

    export default AdminLoansOverview;
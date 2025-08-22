import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { PlusCircle, ArrowLeft, Users, Loader2 } from 'lucide-react';
import AdminLoanOfficersList from '@/components/dashboard/admin/AdminLoanOfficersList';
import AdminCreateLOForm from '@/components/dashboard/admin/AdminCreateLOForm';
import { fetchLoanOfficers } from '@/lib/profiles';
import { useAuth } from '@/contexts/SupabaseAuthContext';

const AdminLoanOfficersPage = () => {
  const [view, setView] = useState('list');
  const [loanOfficers, setLoanOfficers] = useState([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const { supabase } = useAuth();

  const loadLoanOfficers = async () => {
    if (!supabase) return;
    setLoading(true);
    const { data, error } = await fetchLoanOfficers(supabase);
    if (error) {
      toast({
        title: 'Error fetching Loan Officers',
        description: error.message,
        variant: 'destructive',
      });
    } else {
      setLoanOfficers(data || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (view === 'list') {
      loadLoanOfficers();
    }
  }, [view, supabase]);

  const handleFormSuccess = () => {
    setView('list');
  };

  return (
    <div className="p-4 sm:p-6 bg-gray-50 min-h-screen">
      <AnimatePresence mode="wait">
        <motion.div
          key={view}
          initial={{ opacity: 0, x: view === 'list' ? -50 : 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: view === 'list' ? 50 : -50 }}
          transition={{ duration: 0.3 }}
        >
          {view === 'list' ? (
            <div>
              <div className="flex justify-between items-center mb-6 flex-wrap gap-4">
                <div className="flex items-center">
                  <Users className="w-8 h-8 text-blue-600 mr-3" />
                  <div>
                    <h1 className="text-3xl font-bold text-gray-800">Loan Officers</h1>
                    <p className="text-gray-500">Manage all Loan Officers in the system.</p>
                  </div>
                </div>
                <Button onClick={() => setView('form')} className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
                  <PlusCircle className="mr-2 h-4 w-4" /> Add New Loan Officer
                </Button>
              </div>
              {loading ? (
                <div className="flex justify-center items-center h-64">
                  <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
                </div>
              ) : (
                <AdminLoanOfficersList loanOfficers={loanOfficers} />
              )}
            </div>
          ) : (
            <div>
              <div className="flex items-center mb-6">
                <Button variant="ghost" onClick={() => setView('list')} className="mr-4 text-gray-600 hover:bg-gray-200">
                  <ArrowLeft className="mr-2 h-4 w-4" /> Back to List
                </Button>
              </div>
              <AdminCreateLOForm onSuccess={handleFormSuccess} />
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default AdminLoanOfficersPage;
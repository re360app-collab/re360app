import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { supabase } from '@/lib/supabase';
import { useToast } from '@/components/ui/use-toast';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const AdminRealtorLeadAssignmentModal = ({ lead, onClose, onLeadAssigned }) => {
  const [loanOfficers, setLoanOfficers] = useState([]);
  const [selectedLoanOfficerId, setSelectedLoanOfficerId] = useState(lead.assigned_loan_officer_id || '');
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const fetchLoanOfficers = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('user_profiles')
        .select('user_id, first_name, last_name')
        .in('position', ['Loan Officer', 'NMB Admin']);

      if (error) {
        toast({ title: "Error", description: "Could not fetch loan officers.", variant: "destructive" });
      } else {
        setLoanOfficers(data || []);
      }
      setLoading(false);
    };
    fetchLoanOfficers();
  }, [toast]);

  const handleAssignLead = async () => {
    if (!selectedLoanOfficerId) {
      toast({ title: "Selection Required", description: "Please select a loan officer.", variant: "destructive" });
      return;
    }
    setLoading(true);
    const { data, error } = await supabase
      .from('agent_registrations')
      .update({ 
        assigned_loan_officer_id: selectedLoanOfficerId, 
        status: 'Assigned',
        updated_at: new Date().toISOString() 
      })
      .eq('id', lead.id)
      .select()
      .single();

    if (error) {
      toast({ title: "Error", description: "Failed to assign realtor lead. " + error.message, variant: "destructive" });
    } else {
      toast({ title: "Success", description: `Realtor lead assigned to ${loanOfficers.find(lo => lo.user_id === selectedLoanOfficerId)?.first_name || 'Loan Officer'}.` });
      onLeadAssigned(data);
      onClose();
    }
    setLoading(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex items-center justify-center p-4 z-50"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white rounded-2xl p-8 max-w-lg w-full shadow-2xl"
      >
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Assign Realtor: {lead.first_name} {lead.last_name}</h2>
        
        <div className="space-y-4">
          <div>
            <label htmlFor="loanOfficerSelect" className="block text-sm font-medium text-gray-700 mb-1">
              Select Loan Officer
            </label>
            <Select
              value={selectedLoanOfficerId}
              onValueChange={setSelectedLoanOfficerId}
              disabled={loading}
            >
              <SelectTrigger id="loanOfficerSelect" className="w-full">
                <SelectValue placeholder="Choose a Loan Officer" />
              </SelectTrigger>
              <SelectContent>
                {loanOfficers.length > 0 ? (
                  loanOfficers.map(lo => (
                    <SelectItem key={lo.user_id} value={lo.user_id}>
                      {lo.first_name} {lo.last_name}
                    </SelectItem>
                  ))
                ) : (
                  <SelectItem value="no-lo" disabled>No Loan Officers available</SelectItem>
                )}
              </SelectContent>
            </Select>
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <Button variant="outline" onClick={onClose} disabled={loading}>
              Cancel
            </Button>
            <Button onClick={handleAssignLead} disabled={loading || !selectedLoanOfficerId}>
              {loading ? 'Assigning...' : 'Assign Realtor Lead'}
            </Button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default AdminRealtorLeadAssignmentModal;
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { useToast } from '@/components/ui/use-toast';

export const useLoans = (user) => {
  const [loans, setLoans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isNMBAdmin, setIsNMBAdmin] = useState(false);
  const { toast } = useToast();

  const loanMilestones = [
    { id: 1, title: 'Application Submitted', description: 'Initial loan application received' },
    { id: 2, title: 'Document Collection', description: 'Gathering required documentation' },
    { id: 3, title: 'Credit Check', description: 'Running credit verification' },
    { id: 4, title: 'Property Appraisal', description: 'Property valuation in progress' },
    { id: 5, title: 'Underwriting Review', description: 'Loan underwriting assessment' },
    { id: 6, title: 'Conditional Approval', description: 'Loan conditionally approved' },
    { id: 7, title: 'Final Approval', description: 'Loan fully approved' },
    { id: 8, title: 'Closing Scheduled', description: 'Closing date scheduled' },
    { id: 9, title: 'Loan Funded', description: 'Loan successfully funded' }
  ];

  useEffect(() => {
    if (user) {
      checkAdminStatus();
      fetchLoans();
    }
  }, [user]);

  const checkAdminStatus = async () => {
    try {
      const { data, error } = await supabase
        .from('user_profiles')
        .select('position')
        .eq('user_id', user.id)
        .single();

      if (error && error.code !== 'PGRST116') {
        console.error('Error checking admin status:', error);
        return;
      }

      setIsNMBAdmin(data?.position === 'NMB Admin');
    } catch (error) {
      console.error('Error checking admin status:', error);
    }
  };

  const fetchLoans = async () => {
    try {
      setLoading(true);
      
      let query = supabase.from('loans').select('*');
      
      // If not NMB Admin, only show user's own loans
      if (!isNMBAdmin) {
        query = query.eq('agent_id', user.id);
      }
      
      const { data, error } = await query.order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching loans:', error);
        toast({
          title: "Error loading loans",
          description: "Failed to load loan data. Please try again.",
          variant: "destructive"
        });
        return;
      }

      setLoans(data || []);
    } catch (error) {
      console.error('Error fetching loans:', error);
      toast({
        title: "Error loading loans",
        description: "Failed to load loan data. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const determineLoanType = (formData) => {
    const downPaymentPercent = (parseFloat(formData.down_payment) / parseFloat(formData.purchase_price)) * 100;
    
    if (formData.has_rental_income && formData.can_cover_mortgage) {
      return 'DSCR Loan';
    } else if (downPaymentPercent >= 20) {
      return 'Conventional';
    } else if (downPaymentPercent >= 3.5) {
      return 'FHA Loan';
    } else {
      return 'VA Loan';
    }
  };

  const submitLoan = async (formData) => {
    try {
      const loanType = determineLoanType(formData);
      
      // Initialize milestones
      const initialMilestones = loanMilestones.map(milestone => ({
        id: milestone.id,
        completed: false,
        completed_date: null,
        notes: ''
      }));

      const loanData = {
        agent_id: user.id,
        borrower_name: formData.borrower_name,
        borrower_phone: formData.borrower_phone,
        borrower_email: formData.borrower_email,
        borrower_address: formData.borrower_address,
        proposed_properties: formData.proposed_properties.filter(p => p.trim() !== ''),
        purchase_price: parseFloat(formData.purchase_price),
        down_payment: parseFloat(formData.down_payment),
        credit_rating: formData.credit_rating,
        has_rental_income: formData.has_rental_income,
        can_cover_mortgage: formData.can_cover_mortgage,
        loan_type: loanType,
        status: 'pending',
        milestones: initialMilestones
      };

      const { data, error } = await supabase
        .from('loans')
        .insert([loanData])
        .select()
        .single();

      if (error) {
        console.error('Error submitting loan:', error);
        toast({
          title: "Error submitting loan",
          description: "Failed to submit loan application. Please try again.",
          variant: "destructive"
        });
        return false;
      }

      toast({
        title: "Loan application submitted!",
        description: `${formData.borrower_name}'s ${loanType} application has been submitted successfully.`,
      });

      // Refresh loans list
      fetchLoans();
      return true;
    } catch (error) {
      console.error('Error submitting loan:', error);
      toast({
        title: "Error submitting loan",
        description: "Failed to submit loan application. Please try again.",
        variant: "destructive"
      });
      return false;
    }
  };

  const updateLoanMilestone = async (loanId, milestoneIndex, completed) => {
    try {
      // Get current loan data
      const { data: currentLoan, error: fetchError } = await supabase
        .from('loans')
        .select('milestones, status')
        .eq('id', loanId)
        .single();

      if (fetchError) {
        console.error('Error fetching loan:', fetchError);
        return;
      }

      // Update milestone
      const updatedMilestones = [...(currentLoan.milestones || [])];
      updatedMilestones[milestoneIndex] = {
        ...updatedMilestones[milestoneIndex],
        completed,
        completed_date: completed ? new Date().toISOString() : null
      };

      // Determine new status
      const completedCount = updatedMilestones.filter(m => m.completed).length;
      let newStatus = currentLoan.status;
      
      if (completedCount === 0) {
        newStatus = 'pending';
      } else if (completedCount === loanMilestones.length) {
        newStatus = 'completed';
      } else {
        newStatus = 'in_progress';
      }

      const { error: updateError } = await supabase
        .from('loans')
        .update({ 
          milestones: updatedMilestones,
          status: newStatus
        })
        .eq('id', loanId);

      if (updateError) {
        console.error('Error updating milestone:', updateError);
        toast({
          title: "Error updating milestone",
          description: "Failed to update loan milestone. Please try again.",
          variant: "destructive"
        });
        return;
      }

      toast({
        title: "Milestone updated!",
        description: `Loan milestone has been ${completed ? 'completed' : 'marked incomplete'}.`,
      });

      // Refresh loans list
      fetchLoans();
    } catch (error) {
      console.error('Error updating milestone:', error);
      toast({
        title: "Error updating milestone",
        description: "Failed to update loan milestone. Please try again.",
        variant: "destructive"
      });
    }
  };

  return {
    loans,
    loading,
    isNMBAdmin,
    loanMilestones,
    submitLoan,
    updateLoanMilestone,
    fetchLoans
  };
};
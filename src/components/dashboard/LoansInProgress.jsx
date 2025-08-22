import React, { useState } from 'react';
    import { 
      DollarSign, 
      Plus, 
      Clock, 
      CheckCircle, 
      FileText,
      TrendingUp
    } from 'lucide-react';
    import { Button } from '@/components/ui/button';
    import { useLoans } from '@/hooks/useLoans';
    import LoanCard from '@/components/loans/LoanCard';
    import LoanDetailsModal from '@/components/loans/LoanDetailsModal';
    import LoanForm from '@/components/loans/LoanForm';

    const LoansInProgress = ({ user }) => {
      const { 
        loans, 
        loading, 
        isNMBAdmin, 
        loanMilestones, 
        submitLoan, 
        updateLoanMilestone 
      } = useLoans(user);

      const [showAddForm, setShowAddForm] = useState(false);
      const [selectedLoan, setSelectedLoan] = useState(null);

      const [formData, setFormData] = useState({
        borrower_name: '',
        borrower_phone: '',
        borrower_email: '',
        borrower_address: '',
        proposed_properties: [''],
        purchase_price: '',
        down_payment: '',
        credit_rating: '',
        has_rental_income: false,
        can_cover_mortgage: false,
        loan_type: 'Purchase'
      });

      const handleInputChange = (field, value) => {
        setFormData(prev => ({
          ...prev,
          [field]: value
        }));
      };

      const handlePropertyChange = (index, value) => {
        const newProperties = [...formData.proposed_properties];
        newProperties[index] = value;
        setFormData(prev => ({
          ...prev,
          proposed_properties: newProperties
        }));
      };

      const addPropertyField = () => {
        setFormData(prev => ({
          ...prev,
          proposed_properties: [...prev.proposed_properties, '']
        }));
      };

      const removePropertyField = (index) => {
        if (formData.proposed_properties.length > 1) {
          const newProperties = formData.proposed_properties.filter((_, i) => i !== index);
          setFormData(prev => ({
            ...prev,
            proposed_properties: newProperties
          }));
        }
      };

      const handleSubmit = async (e) => {
        e.preventDefault();
        
        const success = await submitLoan(formData);
        if (success) {
          setShowAddForm(false);
          setFormData({
            borrower_name: '',
            borrower_phone: '',
            borrower_email: '',
            borrower_address: '',
            proposed_properties: [''],
            purchase_price: '',
            down_payment: '',
            credit_rating: '',
            has_rental_income: false,
            can_cover_mortgage: false,
            loan_type: 'Purchase'
          });
        }
      };

      if (loading) {
        return (
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        );
      }

      return (
        <div className="space-y-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 flex items-center">
                <DollarSign className="w-8 h-8 mr-3 text-green-600" />
                Loans in Progress
              </h1>
              <p className="text-gray-600 mt-2">
                {isNMBAdmin ? 'Manage all loan applications and track progress' : 'Track your loan applications and their progress'}
              </p>
            </div>
            <Button
              onClick={() => setShowAddForm(true)}
              className="bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700"
            >
              <Plus className="w-5 h-5 mr-2" />
              Add New Loan
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Loans</p>
                  <p className="text-3xl font-bold text-gray-900">{loans.length}</p>
                </div>
                <FileText className="w-8 h-8 text-blue-600" />
              </div>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Pending</p>
                  <p className="text-3xl font-bold text-yellow-600">
                    {loans.filter(l => l.status === 'pending').length}
                  </p>
                </div>
                <Clock className="w-8 h-8 text-yellow-600" />
              </div>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">In Progress</p>
                  <p className="text-3xl font-bold text-blue-600">
                    {loans.filter(l => l.status === 'in_progress').length}
                  </p>
                </div>
                <TrendingUp className="w-8 h-8 text-blue-600" />
              </div>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Completed</p>
                  <p className="text-3xl font-bold text-green-600">
                    {loans.filter(l => l.status === 'completed').length}
                  </p>
                </div>
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
            </div>
          </div>

          {loans.length === 0 ? (
            <div className="text-center py-12">
              <DollarSign className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No loans yet</h3>
              <p className="text-gray-600 mb-6">Start by adding your first loan application</p>
              <Button
                onClick={() => setShowAddForm(true)}
                className="bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700"
              >
                <Plus className="w-5 h-5 mr-2" />
                Add Your First Loan
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {loans.map((loan) => (
                <LoanCard 
                  key={loan.id} 
                  loan={loan} 
                  onViewDetails={setSelectedLoan}
                  isNMBAdmin={isNMBAdmin}
                  loanMilestones={loanMilestones}
                />
              ))}
            </div>
          )}

          {showAddForm && (
            <LoanForm
              formData={formData}
              onInputChange={handleInputChange}
              onPropertyChange={handlePropertyChange}
              onAddProperty={addPropertyField}
              onRemoveProperty={removePropertyField}
              onSubmit={handleSubmit}
              onCancel={() => setShowAddForm(false)}
            />
          )}

          {selectedLoan && (
            <LoanDetailsModal
              loan={selectedLoan}
              onClose={() => setSelectedLoan(null)}
              isNMBAdmin={isNMBAdmin}
              loanMilestones={loanMilestones}
              onUpdateMilestone={updateLoanMilestone}
            />
          )}
        </div>
      );
    };

    export default LoansInProgress;
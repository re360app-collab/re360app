import React from 'react';
import { CheckCircle, FileText, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

const BuyerPreApprovalResponse = ({ buyer, onStatusChange }) => {
  const { toast } = useToast();

  const handleDownloadPDF = () => {
    toast({
      title: "🚧 PDF Download coming soon!",
      description: "Pre-approval PDF generation isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀",
    });
  };

  const handleImportToLoans = () => {
    // Get existing loans from localStorage
    const existingLoans = JSON.parse(localStorage.getItem('re360_loans') || '[]');
    
    // Create loan from buyer data
    const newLoan = {
      id: Date.now(),
      agent_id: buyer.agent,
      borrower_name: `${buyer.firstName} ${buyer.lastName}`,
      borrower_phone: buyer.phone,
      borrower_email: buyer.email,
      borrower_address: buyer.address || 'Address not provided',
      proposed_properties: [buyer.desiredLocation || 'Location not specified'],
      purchase_price: parseFloat(buyer.desiredPurchasePrice) || 0,
      down_payment: (parseFloat(buyer.desiredPurchasePrice) * parseFloat(buyer.downPaymentPercent)) / 100 || 0,
      credit_rating: buyer.creditScore ? `${buyer.creditScore} (Excellent)` : 'Not provided',
      has_rental_income: false,
      can_cover_mortgage: true,
      loan_type: 'Conventional',
      status: 'pending',
      milestones: [],
      notes: `Imported from qualified buyer. Monthly income: $${buyer.monthlyIncome}, Monthly budget: $${buyer.monthlyBudget}`,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };

    // Add to loans
    const updatedLoans = [...existingLoans, newLoan];
    localStorage.setItem('re360_loans', JSON.stringify(updatedLoans));

    toast({
      title: "Buyer imported to loans! 🎉",
      description: `${buyer.firstName} ${buyer.lastName} has been successfully imported to your loans in progress.`,
    });
  };

  if (buyer.status !== 'Qualified') {
    return null;
  }

  return (
    <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
      <div className="flex items-start space-x-3">
        <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
        <div className="flex-1">
          <h4 className="font-semibold text-green-800 mb-2">
            ✅ Pre-Approved by NMB Loan Officer
          </h4>
          <div className="bg-white p-3 rounded border border-green-200 mb-3">
            <p className="text-sm text-gray-700 mb-2">
              <strong>Loan Officer Response:</strong>
            </p>
            <p className="text-sm text-gray-600 italic">
              "Congratulations! {buyer.firstName} {buyer.lastName} has been pre-approved for a mortgage up to ${parseInt(buyer.desiredPurchasePrice || 0).toLocaleString()}. 
              Based on their credit score of {buyer.creditScore} and monthly income of ${parseInt(buyer.monthlyIncome || 0).toLocaleString()}, 
              they qualify for excellent rates. Pre-approval letter attached."
            </p>
            <div className="mt-2 text-xs text-gray-500">
              - Sarah Johnson, Senior Loan Officer, NMB
            </div>
          </div>
          
          <div className="flex flex-wrap gap-2">
            <Button
              size="sm"
              onClick={handleDownloadPDF}
              className="bg-green-600 hover:bg-green-700 text-white"
            >
              <FileText className="w-4 h-4 mr-1" />
              View Pre-Approval Letter
            </Button>
            
            <Button
              size="sm"
              onClick={handleDownloadPDF}
              variant="outline"
              className="border-green-600 text-green-600 hover:bg-green-50"
            >
              <Download className="w-4 h-4 mr-1" />
              Download PDF
            </Button>
            
            <Button
              size="sm"
              onClick={handleImportToLoans}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              Import to Loans
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuyerPreApprovalResponse;
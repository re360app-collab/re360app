import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';

const DetailItem = ({ label, value }) => (
  <div className="flex justify-between py-2 border-b border-gray-100">
    <span className="text-sm text-gray-600">{label}:</span>
    <span className="text-sm font-medium text-gray-800 text-right">{value}</span>
  </div>
);

const AdminLoanDetailsModal = ({ loan, realtorInfo, onClose }) => {
  if (!loan) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
        className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 sm:p-8 max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-gray-200"
      >
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-200">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
            {loan.borrower_name} - Loan Details
          </h2>
          <Button variant="ghost" size="icon" onClick={onClose} className="text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full">
            <X className="w-5 h-5" />
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
          {/* Borrower Information */}
          <div className="space-y-3 bg-white p-4 rounded-lg shadow-sm border border-gray-100">
            <h3 className="text-md font-semibold text-gray-800 border-b pb-2 mb-2">Borrower Information</h3>
            <DetailItem label="Name" value={loan.borrower_name} />
            <DetailItem label="Email" value={loan.borrower_email} />
            <DetailItem label="Phone" value={loan.borrower_phone} />
            <DetailItem label="Address" value={loan.borrower_address} />
          </div>

          {/* Realtor Information */}
          <div className="space-y-3 bg-white p-4 rounded-lg shadow-sm border border-gray-100">
            <h3 className="text-md font-semibold text-gray-800 border-b pb-2 mb-2">Realtor Information</h3>
            <DetailItem label="Name" value={`${realtorInfo.first_name} ${realtorInfo.last_name}`} />
            <DetailItem label="Brokerage" value={realtorInfo.brokerage_name} />
            <DetailItem label="Phone" value={realtorInfo.phone} />
          </div>

          {/* Loan Details */}
          <div className="space-y-3 md:col-span-2 bg-white p-4 rounded-lg shadow-sm border border-gray-100">
            <h3 className="text-md font-semibold text-gray-800 border-b pb-2 mb-2">Loan Details</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3">
              <DetailItem label="Loan Type" value={loan.loan_type} />
              <DetailItem label="Purchase Price" value={`$${loan.purchase_price?.toLocaleString()}`} />
              <DetailItem label="Down Payment" value={`$${loan.down_payment?.toLocaleString()}`} />
              <DetailItem label="Credit Rating" value={loan.credit_rating} />
              <DetailItem label="Rental Income" value={loan.has_rental_income ? 'Yes' : 'No'} />
              <DetailItem label="Can Cover Mortgage" value={loan.can_cover_mortgage ? 'Yes' : 'No'} />
              <DetailItem label="Status" value={loan.status.replace('_', ' ').toUpperCase()} />
              <DetailItem label="Submitted" value={new Date(loan.created_at).toLocaleDateString()} />
            </div>
          </div>
        </div>
        <div className="mt-8 flex justify-end">
            <Button onClick={onClose} className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-2.5 rounded-lg shadow-md hover:shadow-lg transition-all">
                Close
            </Button>
        </div>
      </motion.div>
    </div>
  );
};

export default AdminLoanDetailsModal;
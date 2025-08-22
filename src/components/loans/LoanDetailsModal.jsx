import React from 'react';
import { motion } from 'framer-motion';
import { 
  User,
  Phone,
  Mail,
  MapPin,
  Home,
  CheckCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const LoanDetailsModal = ({ loan, onClose, isNMBAdmin, loanMilestones, onUpdateMilestone }) => {
  if (!loan) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-2xl p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">{loan.borrower_name} - Loan Details</h2>
          <Button variant="outline" onClick={onClose}>Close</Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Borrower Information */}
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Borrower Information</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <User className="w-5 h-5 text-gray-400" />
                  <span className="text-gray-900">{loan.borrower_name}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="w-5 h-5 text-gray-400" />
                  <span className="text-gray-900">{loan.borrower_phone}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="w-5 h-5 text-gray-400" />
                  <span className="text-gray-900">{loan.borrower_email}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <MapPin className="w-5 h-5 text-gray-400" />
                  <span className="text-gray-900">{loan.borrower_address}</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Loan Details</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Loan Type:</span>
                  <span className="font-medium text-gray-900">{loan.loan_type}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Purchase Price:</span>
                  <span className="font-medium text-gray-900">${loan.purchase_price?.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Down Payment:</span>
                  <span className="font-medium text-gray-900">${loan.down_payment?.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Credit Rating:</span>
                  <span className="font-medium text-gray-900">{loan.credit_rating}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Rental Income:</span>
                  <span className="font-medium text-gray-900">{loan.has_rental_income ? 'Yes' : 'No'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Can Cover Mortgage:</span>
                  <span className="font-medium text-gray-900">{loan.can_cover_mortgage ? 'Yes' : 'No'}</span>
                </div>
              </div>
            </div>

            {loan.proposed_properties && loan.proposed_properties.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Proposed Properties</h3>
                <div className="space-y-2">
                  {loan.proposed_properties.map((property, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <Home className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-900">{property}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Loan Milestones */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Loan Progress</h3>
            <div className="space-y-4">
              {loanMilestones.map((milestone, index) => {
                const loanMilestone = loan.milestones?.[index];
                const isCompleted = loanMilestone?.completed;
                
                return (
                  <div key={milestone.id} className="flex items-start space-x-3">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${
                      isCompleted ? 'bg-green-500' : 'bg-gray-300'
                    }`}>
                      {isCompleted ? (
                        <CheckCircle className="w-4 h-4 text-white" />
                      ) : (
                        <div className="w-2 h-2 bg-white rounded-full"></div>
                      )}
                    </div>
                    <div className="flex-1">
                      <h4 className={`font-medium ${isCompleted ? 'text-green-700' : 'text-gray-700'}`}>
                        {milestone.title}
                      </h4>
                      <p className="text-sm text-gray-600">{milestone.description}</p>
                      {loanMilestone?.completed_date && (
                        <p className="text-xs text-gray-500 mt-1">
                          Completed: {new Date(loanMilestone.completed_date).toLocaleDateString()}
                        </p>
                      )}
                      {loanMilestone?.notes && (
                        <p className="text-xs text-blue-600 mt-1">{loanMilestone.notes}</p>
                      )}
                      {isNMBAdmin && (
                        <div className="mt-2 space-x-2">
                          <Button
                            size="sm"
                            variant={isCompleted ? "outline" : "default"}
                            onClick={() => onUpdateMilestone(loan.id, index, !isCompleted)}
                          >
                            {isCompleted ? 'Mark Incomplete' : 'Mark Complete'}
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default LoanDetailsModal;
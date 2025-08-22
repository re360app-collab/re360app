import React from 'react';
import { motion } from 'framer-motion';
import { 
  Mail, 
  Phone, 
  Calendar,
  DollarSign
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

const BuyerDetailModal = ({ buyer, onClose, onStatusChange, statusOptions, onScheduleAppointment }) => {
  const { toast } = useToast();

  const calculateDTI = (buyer) => {
    const monthlyIncome = parseFloat(buyer.monthlyIncome) || 0;
    const monthlyDebts = parseFloat(buyer.monthlyDebts) || 0;
    const monthlyBudget = parseFloat(buyer.monthlyBudget) || 0;
    
    if (monthlyIncome === 0) return 0;
    
    const totalMonthlyObligations = monthlyDebts + monthlyBudget;
    return Math.round((totalMonthlyObligations / monthlyIncome) * 100);
  };

  const getQualificationScore = (buyer) => {
    let score = 0;
    const creditScore = parseInt(buyer.creditScore) || 0;
    const dti = calculateDTI(buyer);
    const downPaymentPercent = parseFloat(buyer.downPaymentPercent) || 0;

    if (creditScore >= 740) score += 40;
    else if (creditScore >= 680) score += 30;
    else if (creditScore >= 620) score += 20;
    else if (creditScore >= 580) score += 10;

    if (dti <= 28) score += 35;
    else if (dti <= 36) score += 25;
    else if (dti <= 43) score += 15;
    else if (dti <= 50) score += 5;

    if (downPaymentPercent >= 20) score += 25;
    else if (downPaymentPercent >= 10) score += 20;
    else if (downPaymentPercent >= 5) score += 15;
    else if (downPaymentPercent >= 3) score += 10;

    return Math.min(score, 100);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white rounded-2xl p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">
            {buyer.firstName} {buyer.lastName}
          </h2>
          <Button variant="outline" size="sm" onClick={onClose}>
            Close
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column */}
          <div className="space-y-6">
            {/* Contact Information */}
            <div className="bg-gray-50 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact Information</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Mail className="w-5 h-5 text-gray-400" />
                  <span className="text-gray-700">{buyer.email}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="w-5 h-5 text-gray-400" />
                  <span className="text-gray-700">{buyer.phone}</span>
                </div>
              </div>
            </div>

            {/* Financial Overview */}
            <div className="bg-gray-50 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Financial Overview</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Purchase Price</p>
                  <p className="text-lg font-semibold text-gray-900">
                    ${parseInt(buyer.desiredPurchasePrice || 0).toLocaleString()}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Monthly Budget</p>
                  <p className="text-lg font-semibold text-gray-900">
                    ${parseInt(buyer.monthlyBudget || 0).toLocaleString()}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Monthly Income</p>
                  <p className="text-lg font-semibold text-gray-900">
                    ${parseInt(buyer.monthlyIncome || 0).toLocaleString()}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Credit Score</p>
                  <p className="text-lg font-semibold text-gray-900">{buyer.creditScore || 'N/A'}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Qualification Analysis */}
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Qualification Analysis</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-600">Qualification Score</span>
                    <span className="text-lg font-bold text-gray-900">{getQualificationScore(buyer)}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div 
                      className="bg-gradient-to-r from-blue-500 to-purple-600 h-3 rounded-full transition-all duration-300"
                      style={{ width: `${getQualificationScore(buyer)}%` }}
                    ></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-600">Debt-to-Income Ratio</span>
                    <span className="text-lg font-bold text-gray-900">{calculateDTI(buyer)}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div 
                      className={`h-3 rounded-full transition-all duration-300 ${
                        calculateDTI(buyer) <= 28 ? 'bg-green-500' :
                        calculateDTI(buyer) <= 36 ? 'bg-yellow-500' :
                        calculateDTI(buyer) <= 43 ? 'bg-orange-500' : 'bg-red-500'
                      }`}
                      style={{ width: `${Math.min(calculateDTI(buyer), 100)}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Status & Actions */}
            <div className="bg-gray-50 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Status & Actions</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Current Status
                  </label>
                  <select
                    value={buyer.status}
                    onChange={(e) => onStatusChange(buyer.id, e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {statusOptions.slice(1).map(option => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div className="grid grid-cols-2 gap-3">
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={onScheduleAppointment}
                  >
                    <Calendar className="w-4 h-4 mr-2" />
                    Schedule
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => toast({
                      title: "🚧 Feature coming soon!",
                      description: "This feature isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀",
                    })}
                  >
                    <Mail className="w-4 h-4 mr-2" />
                    Email
                  </Button>
                </div>
              </div>
            </div>

            {/* Notes */}
            {buyer.notes && (
              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Notes</h3>
                <p className="text-gray-700">{buyer.notes}</p>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default BuyerDetailModal;
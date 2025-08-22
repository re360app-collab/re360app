import React from 'react';
import { motion } from 'framer-motion';
import { 
  DollarSign, 
  TrendingUp,
  Phone,
  Home,
  Eye,
  Trash2,
  Calendar,
  User
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import BuyerPreApprovalResponse from '@/components/dashboard/buyers/BuyerPreApprovalResponse';

const BuyerCard = ({ buyer, onStatusChange, onDelete, onViewDetails, onScheduleAppointment, statusOptions }) => {
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

  const getStatusColor = (status) => {
    const option = statusOptions.find(opt => opt.value === status);
    return option ? option.color : 'bg-gray-100 text-gray-800';
  };

  const qualificationScore = getQualificationScore(buyer);
  const dti = calculateDTI(buyer);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
            <User className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="font-bold text-gray-900 text-lg">
              {buyer.firstName} {buyer.lastName}
            </h3>
            <p className="text-gray-600 text-sm">{buyer.email}</p>
          </div>
        </div>
        <div className="flex space-x-1">
          <Button
            size="sm"
            variant="outline"
            onClick={() => onViewDetails(buyer)}
          >
            <Eye className="w-4 h-4" />
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={() => onDelete(buyer.id)}
            className="text-red-600 hover:text-red-700"
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      </div>

      <div className="mb-4">
        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(buyer.status)}`}>
          {buyer.status}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="bg-gray-50 rounded-lg p-3">
          <div className="flex items-center space-x-2">
            <DollarSign className="w-4 h-4 text-green-600" />
            <div>
              <p className="text-xs text-gray-600">Purchase Price</p>
              <p className="font-semibold text-gray-900">
                ${parseInt(buyer.desiredPurchasePrice || 0).toLocaleString()}
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-gray-50 rounded-lg p-3">
          <div className="flex items-center space-x-2">
            <TrendingUp className="w-4 h-4 text-blue-600" />
            <div>
              <p className="text-xs text-gray-600">Qualification Score</p>
              <p className="font-semibold text-gray-900">{qualificationScore}%</p>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-2 mb-4">
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <Phone className="w-4 h-4" />
          <span>{buyer.phone}</span>
        </div>
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <Home className="w-4 h-4" />
          <span>Budget: ${parseInt(buyer.monthlyBudget || 0).toLocaleString()}/month</span>
        </div>
        {dti > 0 && (
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <TrendingUp className="w-4 h-4" />
            <span>DTI: {dti}%</span>
          </div>
        )}
      </div>

      <BuyerPreApprovalResponse 
        buyer={buyer} 
        onStatusChange={onStatusChange}
      />

      <div className="flex space-x-2 mt-4">
        <select
          value={buyer.status}
          onChange={(e) => onStatusChange(buyer.id, e.target.value)}
          className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {statusOptions.slice(1).map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <Button
          size="sm"
          variant="outline"
          onClick={() => onScheduleAppointment(buyer)}
        >
          <Calendar className="w-4 h-4" />
        </Button>
      </div>
    </motion.div>
  );
};

export default BuyerCard;
import React from 'react';
import { motion } from 'framer-motion';
import { 
  DollarSign, 
  CreditCard,
  Phone,
  Mail,
  Eye,
  Edit
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

const LoanCard = ({ loan, onViewDetails, isNMBAdmin, loanMilestones }) => {
  const { toast } = useToast();
  
  const completedMilestones = (loan.milestones || []).filter(m => m.completed).length;
  const progressPercent = (completedMilestones / loanMilestones.length) * 100;

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'in_progress': return 'bg-blue-100 text-blue-800';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300"
    >
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-xl font-bold text-gray-900 mb-1">{loan.borrower_name}</h3>
          <p className="text-sm text-gray-600">{loan.loan_type}</p>
        </div>
        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(loan.status)}`}>
          {loan.status.replace('_', ' ').toUpperCase()}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="flex items-center space-x-2">
          <DollarSign className="w-4 h-4 text-green-600" />
          <span className="text-sm text-gray-600">
            ${loan.purchase_price?.toLocaleString()}
          </span>
        </div>
        <div className="flex items-center space-x-2">
          <CreditCard className="w-4 h-4 text-blue-600" />
          <span className="text-sm text-gray-600">{loan.credit_rating}</span>
        </div>
        <div className="flex items-center space-x-2">
          <Phone className="w-4 h-4 text-purple-600" />
          <span className="text-sm text-gray-600">{loan.borrower_phone}</span>
        </div>
        <div className="flex items-center space-x-2">
          <Mail className="w-4 h-4 text-orange-600" />
          <span className="text-sm text-gray-600 truncate">{loan.borrower_email}</span>
        </div>
      </div>

      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-700">Progress</span>
          <span className="text-sm text-gray-600">{completedMilestones}/{loanMilestones.length}</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-gradient-to-r from-blue-500 to-green-500 h-2 rounded-full transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
          ></div>
        </div>
      </div>

      <div className="flex space-x-2">
        <Button
          size="sm"
          onClick={() => onViewDetails(loan)}
          className="flex-1"
        >
          <Eye className="w-4 h-4 mr-1" />
          View Details
        </Button>
        {isNMBAdmin && (
          <Button
            size="sm"
            variant="outline"
            onClick={() => {
              toast({
                title: "🚧 Admin features coming soon!",
                description: "Advanced admin controls will be available in the next update! 🚀",
              });
            }}
          >
            <Edit className="w-4 h-4" />
          </Button>
        )}
      </div>
    </motion.div>
  );
};

export default LoanCard;
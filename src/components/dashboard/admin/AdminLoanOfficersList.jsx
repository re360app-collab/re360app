import React from 'react';
import { motion } from 'framer-motion';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Mail, Phone, Calendar } from 'lucide-react';

const AdminLoanOfficersList = ({ loanOfficers }) => {
  const getInitials = (firstName, lastName) => {
    return `${firstName?.[0] || ''}${lastName?.[0] || ''}`.toUpperCase();
  };

  if (!loanOfficers || loanOfficers.length === 0) {
    return (
      <div className="text-center py-16 bg-white rounded-lg shadow-md border border-gray-200">
        <h3 className="text-xl font-semibold text-gray-700">No Loan Officers Found</h3>
        <p className="text-gray-500 mt-2">Click "Add New Loan Officer" to get started.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Joined On</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {loanOfficers.map((lo, index) => (
              <motion.tr 
                key={lo.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="hover:bg-gray-50"
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <Avatar>
                      <AvatarImage src={lo.profile_picture_url} alt={`${lo.first_name} ${lo.last_name}`} />
                      <AvatarFallback className="bg-blue-100 text-blue-600 font-bold">{getInitials(lo.first_name, lo.last_name)}</AvatarFallback>
                    </Avatar>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">{lo.first_name} {lo.last_name}</div>
                      <div className="text-sm text-gray-500">{lo.brokerage_name || 'N/A'}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900 flex items-center"><Mail className="w-4 h-4 mr-2 text-gray-400"/>{lo.email}</div>
                  <div className="text-sm text-gray-500 flex items-center mt-1"><Phone className="w-4 h-4 mr-2 text-gray-400"/>{lo.phone || 'Not provided'}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-2 text-gray-400"/>
                    {new Date(lo.created_at).toLocaleDateString()}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                    Active
                  </span>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminLoanOfficersList;
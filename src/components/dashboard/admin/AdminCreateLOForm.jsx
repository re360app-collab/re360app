import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Send, AlertCircle, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import AdminLOFormFields from '@/components/dashboard/admin/AdminLOFormFields';
import { useAdminLOFormLogic } from '@/components/dashboard/admin/useAdminLOFormLogic';

const AdminCreateLOForm = ({ onSuccess }) => {
  const {
    formData,
    phoneDisplay,
    isLoading,
    error,
    successMessage,
    handleInputChange,
    handlePhoneDisplayChange,
    handlePhoneBlur,
    handleSubmit,
  } = useAdminLOFormLogic(onSuccess);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-2xl mx-auto p-6 sm:p-8 bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl shadow-2xl border border-blue-500/30"
    >
      <div className="flex items-center mb-8">
        <Briefcase className="w-10 h-10 text-blue-400 mr-4" />
        <div>
          <h2 className="text-3xl font-bold text-white">Create New Loan Officer</h2>
          <p className="text-blue-200">Invite a new Loan Officer to join the NMB platform.</p>
        </div>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-500/20 border border-red-500/50 text-red-300 rounded-lg flex items-center">
          <AlertCircle className="w-5 h-5 mr-3 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}
      {successMessage && (
        <div className="mb-6 p-4 bg-green-500/20 border border-green-500/50 text-green-300 rounded-lg flex items-center">
          <CheckCircle className="w-5 h-5 mr-3 flex-shrink-0" />
          <span>{successMessage}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <AdminLOFormFields
          formData={formData}
          phoneDisplay={phoneDisplay}
          handleInputChange={handleInputChange}
          handlePhoneDisplayChange={handlePhoneDisplayChange}
          handlePhoneBlur={handlePhoneBlur}
        />

        <div className="pt-2">
          <Button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold py-3 text-lg rounded-lg shadow-lg transform hover:scale-105 transition-all duration-300 ease-in-out flex items-center justify-center"
          >
            {isLoading ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                <span>Inviting Loan Officer...</span>
              </>
            ) : (
              <>
                <Send className="w-5 h-5 mr-3" />
                <span>Invite Loan Officer</span>
              </>
            )}
          </Button>
        </div>
      </form>
      <p className="text-center text-xs text-blue-300/60 mt-8">
        The invited Loan Officer will receive an email with instructions to activate their account and set up their profile. An SMS notification will also be sent.
      </p>
    </motion.div>
  );
};

export default AdminCreateLOForm;
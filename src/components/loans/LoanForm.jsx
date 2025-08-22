import React from 'react';
import { motion } from 'framer-motion';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';

const LoanForm = ({ 
  formData, 
  onInputChange, 
  onPropertyChange, 
  onAddProperty, 
  onRemoveProperty, 
  onSubmit, 
  onCancel 
}) => {
  const creditRatings = [
    'Excellent (750+)',
    'Good (700-749)',
    'Fair (650-699)',
    'Poor (600-649)',
    'Very Poor (Below 600)'
  ];

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
      >
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Add New Loan Application</h2>
        
        <form onSubmit={onSubmit} className="space-y-6">
          {/* Borrower Information */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Borrower Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
                <input
                  type="text"
                  value={formData.borrower_name}
                  onChange={(e) => onInputChange('borrower_name', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                  placeholder="John Smith"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number *</label>
                <input
                  type="tel"
                  value={formData.borrower_phone}
                  onChange={(e) => onInputChange('borrower_phone', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                  placeholder="(555) 123-4567"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
                <input
                  type="email"
                  value={formData.borrower_email}
                  onChange={(e) => onInputChange('borrower_email', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                  placeholder="john@example.com"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Current Address *</label>
                <input
                  type="text"
                  value={formData.borrower_address}
                  onChange={(e) => onInputChange('borrower_address', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                  placeholder="123 Main St, City, State 12345"
                  required
                />
              </div>
            </div>
          </div>

          {/* Property Information */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Property Information</h3>
            <div className="space-y-3">
              <label className="block text-sm font-medium text-gray-700">Proposed Properties</label>
              {formData.proposed_properties.map((property, index) => (
                <div key={index} className="flex space-x-2">
                  <input
                    type="text"
                    value={property}
                    onChange={(e) => onPropertyChange(index, e.target.value)}
                    className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                    placeholder="Property address"
                  />
                  {formData.proposed_properties.length > 1 && (
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => onRemoveProperty(index)}
                    >
                      Remove
                    </Button>
                  )}
                </div>
              ))}
              <Button
                type="button"
                variant="outline"
                onClick={onAddProperty}
                className="w-full"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Another Property
              </Button>
            </div>
          </div>

          {/* Financial Information */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Financial Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Purchase Price *</label>
                <input
                  type="number"
                  value={formData.purchase_price}
                  onChange={(e) => onInputChange('purchase_price', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                  placeholder="500000"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Down Payment *</label>
                <input
                  type="number"
                  value={formData.down_payment}
                  onChange={(e) => onInputChange('down_payment', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                  placeholder="100000"
                  required
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">Credit Rating *</label>
                <select
                  value={formData.credit_rating}
                  onChange={(e) => onInputChange('credit_rating', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                  required
                >
                  <option value="">Select credit rating</option>
                  {creditRatings.map(rating => (
                    <option key={rating} value={rating}>{rating}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Additional Options */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Additional Information</h3>
            <div className="space-y-4">
              <label className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  checked={formData.has_rental_income}
                  onChange={(e) => onInputChange('has_rental_income', e.target.checked)}
                  className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <span className="text-gray-700">Property has rental income potential</span>
              </label>
              <label className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  checked={formData.can_cover_mortgage}
                  onChange={(e) => onInputChange('can_cover_mortgage', e.target.checked)}
                  className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <span className="text-gray-700">Rental income can cover mortgage payments</span>
              </label>
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex space-x-4 pt-6">
            <Button
              type="button"
              variant="outline"
              onClick={onCancel}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700"
            >
              Submit Application
            </Button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default LoanForm;
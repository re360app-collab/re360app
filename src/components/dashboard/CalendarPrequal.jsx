import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from '@/components/ui/use-toast';
import { 
  Calendar, 
  Plus, 
  Clock, 
  User, 
  Phone, 
  Mail, 
  DollarSign,
  Home,
  FileText,
  CheckCircle
} from 'lucide-react';

const CalendarPrequal = ({ user }) => {
  const [activeTab, setActiveTab] = useState('calendar');
  const [showPrequalForm, setShowPrequalForm] = useState(false);
  const [prequalData, setPrequalData] = useState({
    name: '',
    email: '',
    phone: '',
    purchasePrice: '',
    monthlyBudget: '',
    downPayment: '',
    creditScore: '',
    annualIncome: '',
    monthlyDebts: '',
  });

  const [events] = useState([
    {
      id: 1,
      title: 'Follow-up with Sarah Johnson',
      date: '2024-01-15',
      time: '10:00 AM',
      type: 'follow-up',
      client: 'Sarah Johnson',
    },
    {
      id: 2,
      title: 'Buyer consultation - Mike Chen',
      date: '2024-01-16',
      time: '2:00 PM',
      type: 'consultation',
      client: 'Mike Chen',
    },
    {
      id: 3,
      title: 'Loan officer training session',
      date: '2024-01-17',
      time: '9:00 AM',
      type: 'training',
      client: 'NMB Training',
    },
  ]);

  const [prequals] = useState([
    {
      id: 1,
      name: 'Sarah Johnson',
      email: 'sarah@email.com',
      phone: '(555) 123-4567',
      purchasePrice: '$350,000',
      status: 'Qualified',
      createdAt: '2024-01-10',
    },
    {
      id: 2,
      name: 'Mike Chen',
      email: 'mike@email.com',
      phone: '(555) 987-6543',
      purchasePrice: '$425,000',
      status: 'Need Docs',
      createdAt: '2024-01-12',
    },
  ]);

  const handlePrequalSubmit = (e) => {
    e.preventDefault();
    
    // Save to localStorage
    const existingPrequals = JSON.parse(localStorage.getItem('re360_prequals') || '[]');
    const newPrequal = {
      id: Date.now(),
      ...prequalData,
      userId: user.id,
      status: 'New',
      createdAt: new Date().toISOString(),
    };
    
    existingPrequals.push(newPrequal);
    localStorage.setItem('re360_prequals', JSON.stringify(existingPrequals));
    
    toast({
      title: "Prequal Saved! 🎉",
      description: `${prequalData.name}'s information has been saved successfully.`,
    });
    
    setShowPrequalForm(false);
    setPrequalData({
      name: '',
      email: '',
      phone: '',
      purchasePrice: '',
      monthlyBudget: '',
      downPayment: '',
      creditScore: '',
      annualIncome: '',
      monthlyDebts: '',
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Qualified':
        return 'bg-green-100 text-green-800';
      case 'Need Docs':
        return 'bg-yellow-100 text-yellow-800';
      case 'Refer to NMB':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getEventTypeColor = (type) => {
    switch (type) {
      case 'follow-up':
        return 'bg-blue-100 text-blue-800';
      case 'consultation':
        return 'bg-green-100 text-green-800';
      case 'training':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-green-600 to-blue-600 rounded-2xl p-6 text-white"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
              <Calendar size={32} className="text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">Calendar & Prequal Management</h1>
              <p className="text-green-100">Schedule follow-ups and manage buyer qualifications</p>
            </div>
          </div>
          <Button
            onClick={() => setShowPrequalForm(true)}
            className="bg-white text-green-600 hover:bg-green-50"
          >
            <Plus className="mr-2" size={18} />
            New Prequal
          </Button>
        </div>
      </motion.div>

      {/* Tab Navigation */}
      <div className="flex space-x-1 bg-gray-100 rounded-lg p-1">
        <button
          onClick={() => setActiveTab('calendar')}
          className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${
            activeTab === 'calendar'
              ? 'bg-white text-blue-600 shadow-md'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          <Calendar className="inline mr-2" size={16} />
          Calendar
        </button>
        <button
          onClick={() => setActiveTab('prequals')}
          className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${
            activeTab === 'prequals'
              ? 'bg-white text-blue-600 shadow-md'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          <FileText className="inline mr-2" size={16} />
          Prequals
        </button>
      </div>

      {/* Content */}
      {activeTab === 'calendar' ? (
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-6"
        >
          {/* Calendar View */}
          <div className="lg:col-span-2 bg-white rounded-xl p-6 shadow-lg">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-900">Upcoming Events</h3>
              <Button
                onClick={() => toast({
                  title: "🚧 Add Event",
                  description: "This feature isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀",
                })}
                variant="outline"
              >
                <Plus className="mr-2" size={16} />
                Add Event
              </Button>
            </div>
            
            <div className="space-y-4">
              {events.map((event) => (
                <div key={event.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 mb-2">{event.title}</h4>
                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <div className="flex items-center">
                          <Calendar className="mr-1" size={14} />
                          {event.date}
                        </div>
                        <div className="flex items-center">
                          <Clock className="mr-1" size={14} />
                          {event.time}
                        </div>
                        <div className="flex items-center">
                          <User className="mr-1" size={14} />
                          {event.client}
                        </div>
                      </div>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getEventTypeColor(event.type)}`}>
                      {event.type}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Quick Actions</h3>
            <div className="space-y-4">
              <Button
                onClick={() => toast({
                  title: "🚧 Schedule Follow-up",
                  description: "This feature isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀",
                })}
                className="w-full justify-start"
                variant="outline"
              >
                <Clock className="mr-2" size={16} />
                Schedule Follow-up
              </Button>
              <Button
                onClick={() => toast({
                  title: "🚧 Book Consultation",
                  description: "This feature isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀",
                })}
                className="w-full justify-start"
                variant="outline"
              >
                <User className="mr-2" size={16} />
                Book Consultation
              </Button>
              <Button
                onClick={() => toast({
                  title: "🚧 Training Session",
                  description: "This feature isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀",
                })}
                className="w-full justify-start"
                variant="outline"
              >
                <FileText className="mr-2" size={16} />
                Training Session
              </Button>
            </div>
          </div>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white rounded-xl p-6 shadow-lg"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-gray-900">Buyer Prequals</h3>
            <div className="flex space-x-2">
              <Button
                onClick={() => toast({
                  title: "🚧 Filter Prequals",
                  description: "This feature isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀",
                })}
                variant="outline"
                size="sm"
              >
                Filter
              </Button>
              <Button
                onClick={() => setShowPrequalForm(true)}
                size="sm"
              >
                <Plus className="mr-2" size={16} />
                New Prequal
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {prequals.map((prequal) => (
              <div key={prequal.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-3">
                  <h4 className="font-semibold text-gray-900">{prequal.name}</h4>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(prequal.status)}`}>
                    {prequal.status}
                  </span>
                </div>
                
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex items-center">
                    <Mail className="mr-2" size={14} />
                    {prequal.email}
                  </div>
                  <div className="flex items-center">
                    <Phone className="mr-2" size={14} />
                    {prequal.phone}
                  </div>
                  <div className="flex items-center">
                    <DollarSign className="mr-2" size={14} />
                    {prequal.purchasePrice}
                  </div>
                </div>
                
                <div className="mt-4 flex space-x-2">
                  <Button
                    onClick={() => toast({
                      title: "🚧 View Details",
                      description: "This feature isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀",
                    })}
                    size="sm"
                    variant="outline"
                    className="flex-1"
                  >
                    View
                  </Button>
                  <Button
                    onClick={() => toast({
                      title: "🚧 Schedule Follow-up",
                      description: "This feature isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀",
                    })}
                    size="sm"
                    className="flex-1"
                  >
                    Follow-up
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Prequal Form Modal */}
      {showPrequalForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-gray-900">New Buyer Prequal</h3>
              <button
                onClick={() => setShowPrequalForm(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handlePrequalSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Full Name *</Label>
                  <Input
                    id="name"
                    value={prequalData.name}
                    onChange={(e) => setPrequalData({ ...prequalData, name: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={prequalData.email}
                    onChange={(e) => setPrequalData({ ...prequalData, email: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Phone *</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={prequalData.phone}
                    onChange={(e) => setPrequalData({ ...prequalData, phone: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="purchasePrice">Desired Purchase Price *</Label>
                  <Input
                    id="purchasePrice"
                    value={prequalData.purchasePrice}
                    onChange={(e) => setPrequalData({ ...prequalData, purchasePrice: e.target.value })}
                    placeholder="$350,000"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="monthlyBudget">Monthly Budget</Label>
                  <Input
                    id="monthlyBudget"
                    value={prequalData.monthlyBudget}
                    onChange={(e) => setPrequalData({ ...prequalData, monthlyBudget: e.target.value })}
                    placeholder="$2,500"
                  />
                </div>
                <div>
                  <Label htmlFor="downPayment">Down Payment %</Label>
                  <Input
                    id="downPayment"
                    value={prequalData.downPayment}
                    onChange={(e) => setPrequalData({ ...prequalData, downPayment: e.target.value })}
                    placeholder="20%"
                  />
                </div>
                <div>
                  <Label htmlFor="creditScore">Credit Score (if known)</Label>
                  <Input
                    id="creditScore"
                    value={prequalData.creditScore}
                    onChange={(e) => setPrequalData({ ...prequalData, creditScore: e.target.value })}
                    placeholder="750"
                  />
                </div>
                <div>
                  <Label htmlFor="annualIncome">Annual Income</Label>
                  <Input
                    id="annualIncome"
                    value={prequalData.annualIncome}
                    onChange={(e) => setPrequalData({ ...prequalData, annualIncome: e.target.value })}
                    placeholder="$75,000"
                  />
                </div>
                <div className="md:col-span-2">
                  <Label htmlFor="monthlyDebts">Monthly Debts</Label>
                  <Input
                    id="monthlyDebts"
                    value={prequalData.monthlyDebts}
                    onChange={(e) => setPrequalData({ ...prequalData, monthlyDebts: e.target.value })}
                    placeholder="$500"
                  />
                </div>
              </div>

              <div className="flex space-x-4">
                <Button
                  type="button"
                  onClick={() => setShowPrequalForm(false)}
                  variant="outline"
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600"
                >
                  <CheckCircle className="mr-2" size={18} />
                  Save Prequal
                </Button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default CalendarPrequal;
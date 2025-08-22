import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, User, MessageSquare, MapPin, Tag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { addAppointment } from '@/lib/appointments';
import { useToast } from '@/components/ui/use-toast';

const AddAppointmentModal = ({ user, lead, buyer, realtorLeadId, onClose, onAppointmentCreated }) => {
  const [formData, setFormData] = useState({
    title: lead ? `Meeting with ${lead.firstName} ${lead.lastName}` : (buyer ? `Meeting with ${buyer.first_name} ${buyer.last_name}` : ''),
    description: '',
    appointment_date: '',
    duration: 30,
    type: 'initial-consultation',
    location: '',
  });

  const { toast } = useToast();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const appointmentData = {
      ...formData,
      user_id: user.id,
      lead_id: lead ? lead.id : null,
      buyer_id: buyer ? buyer.id : null,
      realtor_lead_id: realtorLeadId ? realtorLeadId : null,
      appointment_date: new Date(formData.appointment_date).toISOString(),
      status: 'scheduled',
    };

    const { data, error } = await addAppointment(appointmentData);

    if (error) {
      console.error("Error adding appointment:", error);
      toast({
        title: "Error",
        description: "Could not schedule appointment. " + error.message,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Success!",
        description: "Appointment scheduled successfully.",
      });
      onAppointmentCreated(data);
      onClose();
    }
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
        className="bg-white rounded-2xl p-8 max-w-lg w-full max-h-[90vh] overflow-y-auto"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Schedule Appointment</h2>
          <Button variant="outline" size="sm" onClick={onClose}>
            Cancel
          </Button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title" className="flex items-center"><User className="w-4 h-4 mr-2" />Title</Label>
            <Input id="title" name="title" value={formData.title} onChange={handleInputChange} required />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
                <Label htmlFor="appointment_date" className="flex items-center"><Calendar className="w-4 h-4 mr-2" />Date & Time</Label>
                <Input type="datetime-local" id="appointment_date" name="appointment_date" value={formData.appointment_date} onChange={handleInputChange} required />
            </div>
            <div className="space-y-2">
                <Label htmlFor="duration" className="flex items-center"><Clock className="w-4 h-4 mr-2" />Duration (minutes)</Label>
                <Input type="number" id="duration" name="duration" value={formData.duration} onChange={handleInputChange} required min="15" />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="type" className="flex items-center"><Tag className="w-4 h-4 mr-2" />Type</Label>
            <select id="type" name="type" value={formData.type} onChange={handleInputChange} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option value="initial-consultation">Initial Consultation</option>
                <option value="follow-up">Follow-up</option>
                <option value="pre-approval">Pre-approval Meeting</option>
                <option value="document-signing">Document Signing</option>
                <option value="other">Other</option>
            </select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="location" className="flex items-center"><MapPin className="w-4 h-4 mr-2" />Location / Link</Label>
            <Input id="location" name="location" value={formData.location} onChange={handleInputChange} placeholder="e.g., Office Address or Zoom Link" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description" className="flex items-center"><MessageSquare className="w-4 h-4 mr-2" />Description / Notes</Label>
            <Textarea id="description" name="description" value={formData.description} onChange={handleInputChange} placeholder="Details about the appointment..." />
          </div>
          
          <div className="flex justify-end pt-4">
            <Button type="submit" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
              Schedule Appointment
            </Button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default AddAppointmentModal;
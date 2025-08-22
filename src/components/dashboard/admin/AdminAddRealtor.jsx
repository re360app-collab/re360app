import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, User, Phone, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { AsYouType, parsePhoneNumberFromString } from 'libphonenumber-js';
import { useAuth } from '@/contexts/SupabaseAuthContext';

const AdminAddRealtor = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const { supabase } = useAuth();

  const handlePhoneChange = (e) => {
    const value = e.target.value;
    const formatted = new AsYouType('US').input(value);
    setPhone(formatted);
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name.trim()) {
      toast({
        title: 'Validation Error',
        description: 'Please enter the realtor\'s name.',
        variant: 'destructive',
      });
      return;
    }
    
    const phoneNumber = parsePhoneNumberFromString(phone, 'US');
    if (!phoneNumber || !phoneNumber.isValid()) {
      toast({
        title: 'Validation Error',
        description: 'Please enter a valid 10-digit US phone number.',
        variant: 'destructive',
      });
      return;
    }

    setLoading(true);

    const fullPhoneNumber = phoneNumber.format('E.164');
    
    try {
      const { data, error } = await supabase.functions.invoke('send-realtor-invite', {
        body: { 
          name, 
          phone: fullPhoneNumber 
        },
      });

      if (error) throw error;
      
      if (data.error) throw new Error(data.error);

      toast({
        title: 'Invitation Sent! 🚀',
        description: `An SMS invitation has been sent to ${name}.`,
      });
      setName('');
      setPhone('');

    } catch (error) {
       toast({
        title: 'Error Sending Invitation',
        description: `Failed to invoke Edge Function. Make sure 'send-realtor-invite' is deployed. Error: ${error.message}`,
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-2xl mx-auto"
    >
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white shadow-2xl mb-8">
        <div className="flex items-center space-x-4">
          <Send className="w-12 h-12" />
          <div>
            <h1 className="text-3xl font-bold">Invite a Realtor</h1>
            <p className="text-lg opacity-90">Send a registration link via SMS to a new real estate professional.</p>
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-2xl shadow-xl p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Label htmlFor="realtor-name" className="text-lg font-medium text-gray-700">
              <User className="inline-block w-5 h-5 mr-2 text-gray-400" />
              Realtor's Name
            </Label>
            <Input
              id="realtor-name"
              type="text"
              placeholder="e.g., Jane Doe"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-2 text-base p-4 h-12"
              required
            />
          </div>
          
          <div>
            <Label htmlFor="realtor-phone" className="text-lg font-medium text-gray-700">
              <Phone className="inline-block w-5 h-5 mr-2 text-gray-400" />
              Realtor's Phone Number
            </Label>
            <Input
              id="realtor-phone"
              type="tel"
              placeholder="(555) 123-4567"
              value={phone}
              onChange={handlePhoneChange}
              className="mt-2 text-base p-4 h-12"
              required
            />
          </div>
          
          <div className="pt-4">
            <Button type="submit" className="w-full text-lg h-14 bg-gradient-to-r from-green-500 to-teal-500 text-white font-bold hover:from-green-600 hover:to-teal-600 transition-all duration-300 transform hover:scale-105" disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Sending Invite...
                </>
              ) : (
                <>
                  <Send className="mr-2 h-5 w-5" />
                  Send SMS Invitation
                </>
              )}
            </Button>
          </div>
        </form>
        <p className="text-center text-sm text-gray-500 mt-6">
          The realtor will receive a text message with a link to register. Standard message rates may apply.
        </p>
      </div>
    </motion.div>
  );
};

export default AdminAddRealtor;
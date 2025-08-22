import { useState, useEffect } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/lib/customSupabaseClient';
import { useAuth } from '@/contexts/SupabaseAuthContext';

export const useAdminLOFormLogic = (onSuccess) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '', // Stores raw digits
  });
  const [phoneDisplay, setPhoneDisplay] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const { toast } = useToast();
  const { userProfile: adminUserProfile } = useAuth();

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (error) setError(null);
    if (successMessage) setSuccessMessage('');
  };

  const formatPhoneNumberForDisplay = (rawDigits) => {
    if (!rawDigits) return '';
    const cleaned = rawDigits.replace(/\D/g, '');
    const match = cleaned.match(/^(1)?(\d{0,3})(\d{0,3})(\d{0,4})$/);
    if (!match) return cleaned;
  
    const countryCode = match[1] ? '+1 ' : '';
    const areaCode = match[2] ? `(${match[2]}` : '';
    const firstPart = match[3] ? (match[2].length === 3 ? `) ${match[3]}` : match[3]) : '';
    const secondPart = match[4] ? (match[3].length === 3 ? `-${match[4]}` : match[4]) : '';
  
    let result = countryCode + areaCode + firstPart + secondPart;
    return result.trim();
  };

  const handlePhoneDisplayChange = (e) => {
    const typedValue = e.target.value;
    const rawDigits = typedValue.replace(/\D/g, '');
    let limitedDigits = rawDigits;
    if (rawDigits.startsWith('1') && rawDigits.length > 11) {
        limitedDigits = rawDigits.substring(0, 11);
    } else if (!rawDigits.startsWith('1') && rawDigits.length > 10) {
        limitedDigits = rawDigits.substring(0, 10);
    }
    const newDisplayValue = formatPhoneNumberForDisplay(limitedDigits);
    setPhoneDisplay(newDisplayValue);
    setFormData(prev => ({ ...prev, phone: limitedDigits }));
  };
  
  const handlePhoneBlur = () => {
    const rawDigits = formData.phone.replace(/\D/g, '');
    setPhoneDisplay(formatPhoneNumberForDisplay(rawDigits));
  };

  useEffect(() => {
    if (formData.phone === '' && phoneDisplay !== '') {
      setPhoneDisplay('');
    }
  }, [formData.phone, phoneDisplay]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setSuccessMessage('');

    if (!adminUserProfile || (adminUserProfile.position !== 'System Admin' && adminUserProfile.position !== 'NMB Admin')) {
      const msg = "You do not have permission to perform this action.";
      setError(msg);
      toast({ title: "Permission Denied", description: "Your account does not have admin privileges to create users.", variant: "destructive" });
      setIsLoading(false);
      return;
    }

    if (!formData.firstName || !formData.lastName || !formData.email || !formData.phone) {
      const msg = "All fields are required.";
      setError(msg);
      setIsLoading(false);
      toast({ title: "Missing Fields", description: "Please fill in all required fields.", variant: "destructive" });
      return;
    }

    const phoneDigitsOnly = formData.phone.replace(/\D/g, '');
    let fullPhoneNumber; 
    if (phoneDigitsOnly.startsWith('1') && phoneDigitsOnly.length === 11) {
      fullPhoneNumber = `+${phoneDigitsOnly}`;
    } else if (phoneDigitsOnly.length === 10) {
      fullPhoneNumber = `+1${phoneDigitsOnly}`;
    } else {
      const msg = "Phone number must be a valid 10-digit US number. It will be stored as +1XXXXXXXXXX.";
      setError(msg);
      setIsLoading(false);
      toast({ title: "Invalid Phone", description: "Please enter a valid 10-digit US phone number.", variant: "destructive" });
      return;
    }

    try {
      const invitePayload = {
        email: formData.email,
        data: {
          first_name: formData.firstName,
          last_name: formData.lastName,
          phone: fullPhoneNumber,
          position: 'Loan Officer',
          user_type: 'loan_officer',
          brokerage_name: 'NMB',
          settings: { email_notifications: true, sms_notifications: true },
          goals: { manageBuyerPipeline: true }
        },
      };

      const { data: inviteData, error: invokeError } = await supabase.functions.invoke('admin-invite-user', {
        body: JSON.stringify(invitePayload)
      });

      if (invokeError) {
        const errMsg = `Email Invitation Failed: ${invokeError.message}. Check Supabase logs for 'admin-invite-user'.`;
        setError(errMsg);
        toast({ title: "Function Invoke Error", description: errMsg, variant: "destructive", duration: 7000 });
        setIsLoading(false);
        return;
      }

      if (inviteData.error) {
        const errorDetail = inviteData.error;
        let errMsg = "Email Invitation Failed. ";
        if (typeof errorDetail === 'string') errMsg += errorDetail;
        else if (errorDetail.message) errMsg += errorDetail.message;
        else if (errorDetail.msg) errMsg += errorDetail.msg;
        else if (errorDetail.error_description) errMsg += errorDetail.error_description;
        else errMsg += "An unknown error occurred inside the edge function.";
        
        setError(errMsg);
        toast({ title: "Email Invitation Failed", description: errMsg, variant: "destructive", duration: 7000 });
        setIsLoading(false);
        return;
      }

      setSuccessMessage(`Loan Officer ${formData.firstName} ${formData.lastName} invited! They will receive an email. Sending SMS now...`);
      toast({ title: "Loan Officer Invited!", description: `An email has been sent to ${formData.firstName}.` });
      
      try {
        const { error: smsError } = await supabase.functions.invoke('send-lo-invitation-sms', {
          body: JSON.stringify({
            to: fullPhoneNumber,
            firstName: formData.firstName
          })
        });
        if (smsError) {
          toast({ title: "SMS Sending Failed", description: `The SMS could not be sent. ${smsError.message}`, variant: "destructive" });
        } else {
          toast({ title: "SMS Sent!", description: `An invitation SMS was sent to ${formData.firstName}.` });
        }
      } catch (smsCatchError) {
        toast({ title: "SMS Sending Error", description: "An unexpected error occurred while trying to send the SMS.", variant: "destructive" });
      }

      setFormData({ firstName: '', lastName: '', email: '', phone: '' });
      setPhoneDisplay('');
      if (onSuccess) {
        onSuccess();
      }
    } catch (err) {
      const desc = err.message || "An unexpected error occurred.";
      setError(desc);
      toast({ title: "Invitation Error", description: desc, variant: "destructive", duration: 7000 });
    } finally {
      setIsLoading(false);
    }
  };

  return {
    formData,
    phoneDisplay,
    isLoading,
    error,
    successMessage,
    handleInputChange,
    handlePhoneDisplayChange,
    handlePhoneBlur,
    handleSubmit,
  };
};
import React, { useState } from 'react';
import { supabase } from '@/lib/customSupabaseClient';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Loader2 } from 'lucide-react';
import { normalizePhoneNumber } from '@/lib/utils';

const AddContactForm = ({ isOpen, onClose, onContactAdded }) => {
    const [formData, setFormData] = useState({ phone: '', first_name: '', last_name: '', email: '', tags: '' });
    const [loading, setLoading] = useState(false);
    const { toast } = useToast();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const tagsArray = formData.tags.split(',').map(tag => tag.trim().toLowerCase()).filter(Boolean);
            const normalizedPhone = normalizePhoneNumber(formData.phone);
            if (!normalizedPhone) {
                throw new Error("Invalid phone number provided.");
            }
            const { data, error } = await supabase
                .from('contacts')
                .insert([{ ...formData, phone: normalizedPhone, tags: tagsArray }])
                .select()
                .single();
            
            if (error) throw error;
            
            toast({ title: 'Contact Added!', description: `${data.first_name} has been added to your contacts.` });
            onContactAdded(data);
            onClose();
            setFormData({ phone: '', first_name: '', last_name: '', email: '', tags: '' });
        } catch (err) {
            toast({ variant: 'destructive', title: 'Error adding contact', description: err.message });
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Add New Contact</DialogTitle>
                    <DialogDescription>Enter the details for the new contact.</DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit}>
                    <div className="grid gap-4 py-4">
                        <Input name="phone" placeholder="Phone (e.g., +15551234567)" required value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})}/>
                        <div className="grid grid-cols-2 gap-4">
                            <Input name="first_name" placeholder="First Name" value={formData.first_name} onChange={(e) => setFormData({...formData, first_name: e.target.value})}/>
                            <Input name="last_name" placeholder="Last Name" value={formData.last_name} onChange={(e) => setFormData({...formData, last_name: e.target.value})}/>
                        </div>
                        <Input name="email" type="email" placeholder="Email Address" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})}/>
                        <Input name="tags" placeholder="Tags (comma-separated)" value={formData.tags} onChange={(e) => setFormData({...formData, tags: e.target.value})}/>
                    </div>
                    <DialogFooter>
                        <Button type="button" variant="ghost" onClick={onClose}>Cancel</Button>
                        <Button type="submit" disabled={loading}>
                            {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin"/> : 'Add Contact'}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default AddContactForm;
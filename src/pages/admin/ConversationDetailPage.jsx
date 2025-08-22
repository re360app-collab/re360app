import React, { useState, useEffect, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useAuth } from '@/contexts/SupabaseAuthContext';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, ArrowLeft } from 'lucide-react';

const ConversationDetailPage = () => {
  const { phone } = useParams();
  const { supabase } = useAuth();
  const { toast } = useToast();

  const [loading, setLoading] = useState(true);
  const [contact, setContact] = useState(null);
  const [messages, setMessages] = useState([]);
  const [conversation, setConversation] = useState(null);
  const [loanOfficers, setLoanOfficers] = useState([]);
  
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    assigned_loan_officer_id: '',
    status: 'open',
    tags: '',
  });
  const [replyMessage, setReplyMessage] = useState('');
  const [escalationNote, setEscalationNote] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [isEscalating, setIsEscalating] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const fetchData = useCallback(async () => {
    if (!supabase) return;
    setLoading(true);
    try {
      const decodedPhone = decodeURIComponent(phone);
      
      const [contactRes, messagesRes, conversationRes, loRes] = await Promise.all([
        supabase.from('contacts').select('*').eq('phone', decodedPhone).single(),
        supabase.from('sms_messages').select('*').eq('phone', decodedPhone).order('created_at', { ascending: true }),
        supabase.from('sms_conversations').select('*').eq('phone', decodedPhone).single(),
        supabase.from('loan_officers').select('id, name').order('name'),
      ]);

      if (contactRes.error && contactRes.error.code !== 'PGRST116') throw new Error(`Contact: ${contactRes.error.message}`);
      if (messagesRes.error) throw new Error(`Messages: ${messagesRes.error.message}`);
      if (conversationRes.error && conversationRes.error.code !== 'PGRST116') throw new Error(`Conversation: ${conversationRes.error.message}`);
      if (loRes.error) throw new Error(`Loan Officers: ${loRes.error.message}`);

      setContact(contactRes.data);
      setMessages(messagesRes.data || []);
      setConversation(conversationRes.data);
      setLoanOfficers(loRes.data || []);

      setFormData({
        first_name: contactRes.data?.first_name || '',
        last_name: contactRes.data?.last_name || '',
        assigned_loan_officer_id: contactRes.data?.assigned_loan_officer_id || '',
        status: conversationRes.data?.status || 'open',
        tags: (contactRes.data?.tags || []).join(', '),
      });

    } catch (error) {
      toast({ variant: 'destructive', title: 'Failed to load conversation', description: error.message });
    } finally {
      setLoading(false);
    }
  }, [phone, supabase, toast]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const tagsArray = formData.tags.split(',').map(tag => tag.trim()).filter(Boolean);
      
      const { error: contactError } = await supabase
        .from('contacts')
        .update({
          first_name: formData.first_name,
          last_name: formData.last_name,
          assigned_loan_officer_id: formData.assigned_loan_officer_id || null,
          tags: tagsArray,
        })
        .eq('id', contact.id);
      if (contactError) throw contactError;

      const { error: convError } = await supabase
        .from('sms_conversations')
        .upsert({ phone: contact.phone, status: formData.status });
      if (convError) throw convError;

      toast({ title: 'Success', description: 'Contact and conversation status updated.' });
      fetchData();
    } catch (error) {
      toast({ variant: 'destructive', title: 'Save failed', description: error.message });
    } finally {
      setIsSaving(false);
    }
  };

  const handleSendReply = async () => {
    if (!replyMessage.trim()) return;
    setIsSending(true);
    try {
      const { data, error } = await supabase.functions.invoke('send-sms', {
        body: { to: contact.phone, body: replyMessage },
      });
      if (error || (data && !data.ok)) throw new Error(data?.error?.message || 'Failed to send SMS.');
      
      setReplyMessage('');
      toast({ title: 'Reply Sent!', description: 'Your message is on its way.' });
      setTimeout(fetchData, 1000); // Refresh messages after a short delay
    } catch (error) {
      toast({ variant: 'destructive', title: 'Send failed', description: error.message });
    } finally {
      setIsSending(false);
    }
  };

  const handleEscalate = async () => {
    if (!escalationNote.trim()) {
      toast({ variant: 'destructive', title: 'Note required', description: 'Please provide a reason for escalation.' });
      return;
    }
    setIsEscalating(true);
    try {
      const { error } = await supabase.from('escalations').insert({
        phone: contact.phone,
        type: 'sms',
        note: escalationNote,
        assigned_loan_officer_id: contact.assigned_loan_officer_id || null,
      });
      if (error) throw error;

      await supabase.from('sms_conversations').upsert({ phone: contact.phone, status: 'escalated' });

      setEscalationNote('');
      toast({ title: 'Escalated!', description: 'The conversation has been marked for follow-up.' });
      fetchData();
    } catch (error) {
      toast({ variant: 'destructive', title: 'Escalation failed', description: error.message });
    } finally {
      setIsEscalating(false);
    }
  };

  if (loading) {
    return <div className="flex justify-center items-center h-screen"><Loader2 className="h-8 w-8 animate-spin" /></div>;
  }

  return (
    <div className="container mx-auto py-8">
      <Helmet>
        <title>RE360 Concierge — Conversation</title>
        <meta name="description" content={`Conversation with ${phone}`} />
      </Helmet>
      
      <div className="mb-6">
        <Link to="/admin/conversations" className="flex items-center text-sm text-muted-foreground hover:text-primary">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Conversations
        </Link>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mt-2">
          Conversation with {formData.first_name || phone}
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Message Thread</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[65vh] overflow-y-auto p-4 flex flex-col space-y-4">
              {messages.map((msg) => (
                <div key={msg.id} className={`flex flex-col ${msg.direction === 'out' ? 'items-end' : 'items-start'}`}>
                  <div className={`max-w-lg rounded-lg px-4 py-2 ${msg.direction === 'out' ? 'bg-blue-100 dark:bg-blue-900 text-blue-900 dark:text-blue-100' : 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100'}`}>
                    <p>{msg.body}</p>
                  </div>
                  <span className="text-xs text-muted-foreground mt-1">
                    {new Date(msg.created_at).toLocaleString()}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card>
            <CardHeader><CardTitle>Contact Details</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">First Name</label>
                  <Input value={formData.first_name} onChange={(e) => setFormData({...formData, first_name: e.target.value})} />
                </div>
                <div>
                  <label className="text-sm font-medium">Last Name</label>
                  <Input value={formData.last_name} onChange={(e) => setFormData({...formData, last_name: e.target.value})} />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium">Assigned Loan Officer</label>
                <Select value={formData.assigned_loan_officer_id || 'unassigned'} onValueChange={(val) => setFormData({...formData, assigned_loan_officer_id: val === 'unassigned' ? '' : val})}>
                  <SelectTrigger><SelectValue placeholder="Unassigned" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="unassigned">Unassigned</SelectItem>
                    {loanOfficers.map(lo => <SelectItem key={lo.id} value={lo.id}>{lo.name}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium">Status</label>
                <Select value={formData.status} onValueChange={(val) => setFormData({...formData, status: val})}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="open">Open</SelectItem>
                    <SelectItem value="escalated">Escalated</SelectItem>
                    <SelectItem value="closed">Closed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium">Tags (comma-separated)</label>
                <Input value={formData.tags} onChange={(e) => setFormData({...formData, tags: e.target.value})} placeholder="trialrun, vip" />
              </div>
              <Button onClick={handleSave} disabled={isSaving} className="w-full">
                {isSaving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : 'Save Contact & Status'}
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle>Actions</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium">Reply as Human (SMS)</label>
                <Textarea value={replyMessage} onChange={(e) => setReplyMessage(e.target.value)} placeholder="Type your message…" />
                <Button onClick={handleSendReply} disabled={isSending} className="w-full mt-2">
                  {isSending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : 'Send Reply'}
                </Button>
              </div>
              <div>
                <label className="text-sm font-medium">Escalate (notify LO by SMS)</label>
                <Textarea value={escalationNote} onChange={(e) => setEscalationNote(e.target.value)} placeholder="Why are we escalating?" />
                <Button onClick={handleEscalate} disabled={isEscalating} className="w-full mt-2">
                  {isEscalating ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : 'Escalate'}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ConversationDetailPage;
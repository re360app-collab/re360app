
    import React, { useState, useEffect, useCallback, useMemo } from 'react';
    import { Helmet } from 'react-helmet-async';
    import { supabase } from '@/lib/customSupabaseClient';
    import { useToast } from '@/components/ui/use-toast';
    import { Button } from '@/components/ui/button';
    import { AlertTriangle, Loader2, Send } from 'lucide-react';

    import { sendSmsBatch } from "@/lib/send-sms-batch";
    import SavedCampaigns from '@/components/admin/sms/SavedCampaigns';
    import CampaignComposer from '@/components/admin/sms/CampaignComposer';
    import AudienceSelector from '@/components/admin/sms/AudienceSelector';
    import CampaignScheduler from '@/components/admin/sms/CampaignScheduler';
    import AvailableTags from '@/components/admin/sms/AvailableTags';

    const SmsCampaignPage = () => {
      const [message, setMessage] = useState('');
      const [campaignName, setCampaignName] = useState('');
      const [tag, setTag] = useState('');
      const [loadingContacts, setLoadingContacts] = useState(true);
      const [sending, setSending] = useState(false);
      const [error, setError] = useState(null);
      const [contacts, setContacts] = useState([]);
      const [selectedContacts, setSelectedContacts] = useState([]);
      const [savedCampaigns, setSavedCampaigns] = useState([]);
      const [scheduledAt, setScheduledAt] = useState(null);
      const { toast } = useToast();

      const fetchContacts = useCallback(async () => {
        setLoadingContacts(true);
        try {
          const { data, error: fetchError } = await supabase.from('contacts').select('*').not('opted_out', 'is', true);
          if (fetchError) throw fetchError;
          setContacts(data);
        } catch (err) {
          setError(err.message);
          toast({ variant: 'destructive', title: 'Error fetching contacts', description: err.message });
        } finally {
          setLoadingContacts(false);
        }
      }, [toast]);

      const fetchCampaignTemplates = useCallback(async () => {
        try {
            const { data, error } = await supabase.from('campaign_templates').select('*').order('name');
            if (error) throw error;
            setSavedCampaigns(data);
        } catch (err) {
            toast({ variant: 'destructive', title: 'Error fetching campaign templates', description: err.message });
        }
      }, [toast]);

      useEffect(() => {
        fetchContacts();
        fetchCampaignTemplates();
      }, [fetchContacts, fetchCampaignTemplates]);
      
      const allTags = useMemo(() => {
        const tagsSet = new Set();
        contacts.forEach(c => {
          if (c.tags && Array.isArray(c.tags)) {
            c.tags.forEach(t => {
                if(t) tagsSet.add(t.toLowerCase());
            });
          }
        });
        return Array.from(tagsSet).sort();
      }, [contacts]);

      const contactsWithTag = useMemo(() => {
          if (!tag) return [];
          const lowerCaseTag = tag.trim().toLowerCase();
          return contacts.filter(c => c.tags?.some(t => t && t.toLowerCase() === lowerCaseTag));
      }, [tag, contacts]);

      const targetCount = tag ? contactsWithTag.length : selectedContacts.length;

      const handleSelectContact = (id) => {
        setTag('');
        setSelectedContacts(prev => prev.includes(id) ? prev.filter(cId => cId !== id) : [...prev, id]);
      };

      const handleTagChange = (newTag) => {
        setSelectedContacts([]);
        setTag(newTag);
      };
      
      const handleLoadCampaign = (campaign) => {
        setCampaignName(campaign.name);
        setMessage(campaign.message);
      };

      const clearForm = () => {
          setMessage('');
          setCampaignName('');
          setTag('');
          setSelectedContacts([]);
          setScheduledAt(null);
      };

      const handleSubmit = async (e) => {
        e.preventDefault();
        if (!message) {
            toast({ variant: 'destructive', title: 'Message Required', description: 'Please enter a message to send.' });
            return;
        }
        if (targetCount === 0) {
            toast({ variant: 'destructive', title: 'Target Required', description: 'Please specify a tag with contacts or select contacts to send to.' });
            return;
        }

        setSending(true);
        setError(null);

        const campaignPayload = {
          message,
          campaign: campaignName || 'Unnamed Campaign',
        };

        if (tag) {
          campaignPayload.tag = tag.trim().toLowerCase();
        } else {
          campaignPayload.contactIds = selectedContacts;
        }

        const payload = { campaignPayload };
        if (scheduledAt) {
            payload.scheduledAt = scheduledAt.toISOString();
        }

        try {
          const out = await sendSmsBatch(payload);
          if (out.scheduledCampaignId) {
              toast({
                  title: 'Campaign Scheduled! 🗓️',
                  description: `Your campaign will be sent to ${targetCount} contacts at the specified time.`,
              });
          } else {
              toast({
                title: 'Campaign Sent! 🚀',
                description: `Sent ${out.sent} messages`,
              });
          }
          clearForm();
        } catch (err) {
          console.error("Error sending/scheduling campaign:", err);
          toast({
            variant: 'destructive',
            title: 'Campaign Failed',
            description: err.message,
          });
        } finally {
          setSending(false);
        }
      };

      return (
        <>
          <Helmet>
            <title>SMS Campaign Sender | RE360App Admin</title>
          </Helmet>
          <div className="container mx-auto p-4 space-y-8">
            <h1 className="text-3xl font-bold">SMS Campaign Sender</h1>
            
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="md:col-span-2 space-y-6">
                  <SavedCampaigns savedCampaigns={savedCampaigns} onCampaignLoad={handleLoadCampaign} />
                  <CampaignComposer 
                    campaignName={campaignName}
                    setCampaignName={setCampaignName}
                    message={message}
                    setMessage={setMessage}
                    onCampaignSaved={fetchCampaignTemplates}
                  />
                </div>

                <div className="space-y-6">
                  <AudienceSelector
                    contacts={contacts}
                    loading={loadingContacts}
                    onTagChange={handleTagChange}
                    onSelectContact={handleSelectContact}
                    selectedContacts={selectedContacts}
                    tag={tag}
                    onContactsUpdated={fetchContacts}
                    allTags={allTags}
                  />
                  <AvailableTags tags={allTags} onTagSelect={handleTagChange} currentTag={tag} />
                  <CampaignScheduler scheduledAt={scheduledAt} onScheduleChange={setScheduledAt} />
                  <Button type="submit" size="lg" className="w-full" disabled={sending || targetCount === 0}>
                    {sending ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : <Send className="mr-2 h-5 w-5" />}
                    {sending ? (scheduledAt ? 'Scheduling...' : 'Sending...') : 
                     scheduledAt ? `Schedule Campaign for ${targetCount} Contact(s)` : `Send Now to ${targetCount} Contact(s)`
                    }
                  </Button>
                  
                   {error && <div className="text-red-500 text-sm p-3 bg-red-50 rounded-md flex items-start gap-2"><AlertTriangle className="w-4 h-4 mt-0.5" /><div><strong>Error:</strong> {error}</div></div>}
                </div>
              </div>
            </form>
          </div>
        </>
      );
    };

    export default SmsCampaignPage;
  
import React, { useState } from 'react';
import { supabase } from '@/lib/customSupabaseClient';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Loader2, MessageSquare, Save } from 'lucide-react';

const CampaignComposer = ({ campaignName, setCampaignName, message, setMessage, onCampaignSaved }) => {
    const [saving, setSaving] = useState(false);
    const { toast } = useToast();

    const handleSaveCampaign = async () => {
        if (!campaignName || !message) {
            toast({ variant: 'destructive', title: 'Missing Info', description: 'Please provide a campaign name and message to save.' });
            return;
        }
        setSaving(true);
        try {
            const { error } = await supabase
                .from('campaign_templates')
                .upsert({ name: campaignName, message: message }, { onConflict: 'name' });
            
            if (error) throw error;

            toast({ title: 'Campaign Saved!', description: `The "${campaignName}" campaign has been saved.` });
            onCampaignSaved();
        } catch (err) {
            toast({ variant: 'destructive', title: 'Error Saving Campaign', description: err.message });
        } finally {
            setSaving(false);
        }
    };
    
    const insertPlaceholder = (placeholder) => {
        setMessage(prev => `${prev}${placeholder}`);
    };

    return (
        <Card>
            <CardHeader>
                <div className="flex items-center gap-2">
                    <MessageSquare className="w-6 h-6 text-primary"/>
                    <CardTitle>Compose Message</CardTitle>
                </div>
            </CardHeader>
            <CardContent className="space-y-4">
                <div>
                    <Label htmlFor="campaignName">Campaign Name (e.g. agent-invite)</Label>
                    <Input id="campaignName" value={campaignName} onChange={(e) => setCampaignName(e.target.value)} placeholder="e.g., Q3 Promo" />
                </div>
                <div>
                    <Label htmlFor="message">Message Content</Label>
                    <Textarea id="message" value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Type your SMS message here..." rows={6} />
                    <div className="text-sm text-muted-foreground mt-2">
                        Placeholders: <Button type="button" size="sm" variant="link" onClick={() => insertPlaceholder('{first}')} className="p-1 h-auto">{'{first}'}</Button> <Button type="button" size="sm" variant="link" onClick={() => insertPlaceholder('{link}')} className="p-1 h-auto">{'{link}'}</Button>
                    </div>
                </div>
            </CardContent>
            <CardFooter>
                <Button type="button" onClick={handleSaveCampaign} disabled={saving}>
                    {saving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
                    Save Campaign
                </Button>
            </CardFooter>
        </Card>
    );
};

export default CampaignComposer;
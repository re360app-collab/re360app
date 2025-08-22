import React from 'react';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Send, Star } from 'lucide-react';

const SavedCampaigns = ({ savedCampaigns, onCampaignLoad }) => {
    const { toast } = useToast();

    const loadCampaignTemplate = (campaign) => {
        onCampaignLoad(campaign);
        toast({
            title: `"${campaign.name}" Loaded!`,
            description: "The campaign message has been loaded. Just select your contacts and send.",
        });
    };

    return (
        <Card>
            <CardHeader>
                <div className="flex items-center gap-2">
                    <Star className="w-6 h-6 text-primary"/>
                    <CardTitle>Saved Campaigns</CardTitle>
                </div>
                <CardDescription>Quickly load a pre-written campaign message.</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-2">
                {savedCampaigns.length > 0 ? (
                    savedCampaigns.map(campaign => (
                        <Button key={campaign.id} type="button" variant="outline" onClick={() => loadCampaignTemplate(campaign)}>
                            <Send className="mr-2 h-4 w-4" /> Load: {campaign.name}
                        </Button>
                    ))
                ) : (
                    <p className="text-sm text-muted-foreground">No saved campaigns yet. Create one below!</p>
                )}
            </CardContent>
        </Card>
    );
};

export default SavedCampaigns;
import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const SmsCampaignTriggerPage = () => {
  const [loading, setLoading] = useState(true);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const sendCampaign = async () => {
      try {
        setLoading(true);
        setError(null);
        setResult(null);

        const { data, error: functionError } = await supabase.functions.invoke('sms-send-batch', {
          body: {
            tag: 'agent',
            campaign: 'aug-launch',
            message: "Hey {first}, it’s Nathan @ RE360. We help realtors get paid on both sides—without doubling the work. 30-sec setup: {link} Reply STOP to opt out."
          }
        });

        if (functionError) {
          throw functionError;
        }
        
        setResult(data);
      } catch (err) {
        console.error("Error calling sms-send-batch function:", err);
        setError(err.message || 'An unknown error occurred.');
      } finally {
        setLoading(false);
      }
    };

    sendCampaign();
  }, []);

  const renderContent = () => {
    if (loading) {
      return (
        <div className="flex flex-col items-center justify-center p-8 text-center">
          <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
          <h3 className="text-xl font-semibold">Sending SMS Campaign...</h3>
          <p className="text-muted-foreground">Please wait while we process the request.</p>
        </div>
      );
    }

    if (error) {
      return (
        <div className="p-8">
          <h3 className="text-xl font-semibold text-destructive mb-2">Campaign Failed</h3>
          <CardDescription>An error occurred while trying to send the campaign.</CardDescription>
          <pre className="mt-4 bg-muted text-destructive-foreground p-4 rounded-md overflow-x-auto text-sm">
            {error}
          </pre>
        </div>
      );
    }

    if (result) {
      return (
        <div className="p-8">
          <h3 className="text-xl font-semibold text-green-600 mb-2">Campaign Processed</h3>
          <CardDescription>The SMS batch request has been completed. Here is the response:</CardDescription>
          <pre className="mt-4 bg-muted text-muted-foreground p-4 rounded-md overflow-x-auto text-sm">
            {JSON.stringify(result, null, 2)}
          </pre>
        </div>
      );
    }
    
    return null;
  };

  return (
    <>
      <Helmet>
        <title>SMS Campaign | RE360App Admin</title>
        <meta name="description" content="Trigger and view results for an SMS campaign." />
      </Helmet>
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex flex-col items-center justify-center p-4">
        <Card className="w-full max-w-2xl mx-auto shadow-lg">
          <CardHeader>
            <CardTitle>SMS Campaign Launcher</CardTitle>
            <CardDescription>Targeting tag: 'agent', Campaign: 'aug-launch'</CardDescription>
          </CardHeader>
          <CardContent>
            {renderContent()}
          </CardContent>
        </Card>
        <Button asChild variant="link" className="mt-6">
            <Link to="/dashboard">Back to Dashboard</Link>
        </Button>
      </div>
    </>
  );
};

export default SmsCampaignTriggerPage;
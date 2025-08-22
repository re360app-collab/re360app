import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { supabase } from '@/lib/customSupabaseClient';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Send, Loader2, AlertTriangle, Server, CheckCircle } from 'lucide-react';

const AdminTwilioTestPage = () => {
  const [fromNumber, setFromNumber] = useState('+15551234567');
  const [body, setBody] = useState('Hello from the test page!');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const { toast } = useToast();

  const handleSimulatePayload = async () => {
    setLoading(true);
    setResult(null);
    setError(null);

    try {
      const { data, error: functionError } = await supabase.functions.invoke('diag-twilio-inbound', {
        body: {
          from_number: fromNumber,
          body: body,
        },
      });

      if (functionError) {
        throw new Error(`Function invocation failed: ${functionError.message}`);
      }
      
      if (data.error) {
        throw new Error(data.error);
      }

      setResult(data);
      toast({
        title: 'Simulation Successful!',
        description: 'The test payload was sent and processed.',
        variant: 'success',
      });
    } catch (err) {
      setError(err.message);
      toast({
        variant: 'destructive',
        title: 'Simulation Failed',
        description: err.message,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Twilio Inbound Test | RE360App Admin</title>
      </Helmet>
      <div className="container mx-auto p-4 space-y-8">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold">Twilio Inbound SMS Test</h1>
          <p className="text-muted-foreground">
            Use this tool to simulate an incoming SMS message to your `twilio-inbound` Edge Function.
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Simulate Payload</CardTitle>
            <CardDescription>
              Enter the details of the simulated SMS and click the button to send it to your function.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="fromNumber">From Phone Number</Label>
              <Input
                id="fromNumber"
                value={fromNumber}
                onChange={(e) => setFromNumber(e.target.value)}
                placeholder="e.g., +15551234567"
              />
            </div>
            <div>
              <Label htmlFor="body">Message Body</Label>
              <Textarea
                id="body"
                value={body}
                onChange={(e) => setBody(e.target.value)}
                placeholder="Enter the SMS content here"
              />
            </div>
            <Button onClick={handleSimulatePayload} disabled={loading}>
              {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Send className="mr-2 h-4 w-4" />}
              Simulate Inbound SMS
            </Button>
          </CardContent>
        </Card>

        {(result || error) && (
          <Card>
            <CardHeader>
              <CardTitle>Simulation Result</CardTitle>
            </CardHeader>
            <CardContent>
              {loading && <div className="flex items-center gap-2"><Loader2 className="h-5 w-5 animate-spin" /><p>Loading...</p></div>}
              
              {error && (
                <div className="text-red-500 p-4 bg-red-500/10 rounded-md flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 mt-1" />
                  <div>
                    <p className="font-bold">Error</p>
                    <pre className="mt-2 whitespace-pre-wrap break-words bg-red-900/20 p-2 rounded text-sm">
                      <code>{error}</code>
                    </pre>
                  </div>
                </div>
              )}

              {result && (
                <div className="text-green-600 p-4 bg-green-500/10 rounded-md flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 mt-1" />
                  <div>
                    <p className="font-bold">Success</p>
                    <pre className="mt-2 whitespace-pre-wrap break-words bg-green-900/20 p-2 rounded text-sm">
                      <code>{JSON.stringify(result, null, 2)}</code>
                    </pre>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </>
  );
};

export default AdminTwilioTestPage;
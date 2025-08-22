import React, { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/lib/customSupabaseClient';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { useToast } from '@/components/ui/use-toast';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Loader2, Users, UserCheck, UserX, BarChart, Search, AlertTriangle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

const StatCard = ({ title, value, icon: Icon, color }) => (
  <Card className={`border-l-4 ${color}`}>
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium">{title}</CardTitle>
      <Icon className="h-4 w-4 text-muted-foreground" />
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">{value}</div>
    </CardContent>
  </Card>
);

const ContactTable = ({ title, description, contacts, searchTerm, setSearchTerm, icon: Icon, emptyMessage, dateField }) => {
  const filteredContacts = contacts.filter(c =>
    c.phone?.includes(searchTerm) ||
    c.first_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.last_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <Icon className="w-6 h-6" />
            <div>
              <CardTitle>{title}</CardTitle>
              <CardDescription>{description}</CardDescription>
            </div>
          </div>
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search contacts..."
              className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[320px]"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Contact</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead className="text-right">Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredContacts.length > 0 ? (
                filteredContacts.map(contact => (
                  <TableRow key={contact.id}>
                    <TableCell>
                      <div className="font-medium">{contact.first_name || 'N/A'} {contact.last_name}</div>
                      <div className="text-sm text-muted-foreground">{contact.email || 'No email'}</div>
                    </TableCell>
                    <TableCell>{contact.phone}</TableCell>
                    <TableCell className="text-right">
                      {contact[dateField] ? new Date(contact[dateField]).toLocaleDateString() : 'N/A'}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan="3" className="h-24 text-center">
                    {emptyMessage}
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

const SmsAnalyticsPage = () => {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({ total: 0, registered: 0, optedOut: 0 });
  const [campaignPerformance, setCampaignPerformance] = useState([]);
  const [registeredContacts, setRegisteredContacts] = useState([]);
  const [optedOutContacts, setOptedOutContacts] = useState([]);
  const [registeredSearch, setRegisteredSearch] = useState('');
  const [optedOutSearch, setOptedOutSearch] = useState('');
  const [error, setError] = useState(null);
  const { toast } = useToast();

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const { data, error: rpcError } = await supabase.rpc('get_sms_analytics');

      if (rpcError) {
        throw new Error(rpcError.message);
      }
      
      const responseData = data;
      setStats(responseData.stats);
      setRegisteredContacts(responseData.registeredContacts);
      setOptedOutContacts(responseData.optedOutContacts);
      setCampaignPerformance(responseData.campaignPerformance.map(cp => ({ ...cp, name: cp.campaign })));

    } catch (err) {
      console.error("Error fetching SMS analytics:", err);
      setError("Failed to load analytics data. Please try again.");
      toast({
        variant: "destructive",
        title: "Error",
        description: err.message,
      });
    } finally {
      setLoading(false);
    }
  }, [toast]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <p className="ml-3 text-lg">Loading Analytics...</p>
      </div>
    );
  }

  if (error) {
    return (
        <div className="flex flex-col items-center justify-center h-full bg-red-50 dark:bg-red-900/20 p-8 rounded-lg">
            <AlertTriangle className="h-12 w-12 text-red-500 mb-4" />
            <h2 className="text-2xl font-bold text-red-700 dark:text-red-400">Loading Failed</h2>
            <p className="text-red-600 dark:text-red-300 mt-2">{error}</p>
            <Button onClick={fetchData} className="mt-6 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700">Retry</Button>
        </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>SMS Campaign Analytics | RE360App Admin</title>
      </Helmet>
      <motion.div 
        className="space-y-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold">SMS Campaign Analytics</h1>
        
        <div className="grid gap-4 md:grid-cols-3">
          <StatCard title="Total Contacts" value={stats.total} icon={Users} color="border-blue-500" />
          <StatCard title="Total Registered" value={stats.registered} icon={UserCheck} color="border-green-500" />
          <StatCard title="Total Opted Out" value={stats.optedOut} icon={UserX} color="border-red-500" />
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-8">
            <ContactTable
              title="Registered Contacts"
              description="Contacts who have completed registration via SMS link."
              contacts={registeredContacts}
              searchTerm={registeredSearch}
              setSearchTerm={setRegisteredSearch}
              icon={UserCheck}
              emptyMessage="No contacts have registered yet."
              dateField="user_updated_at"
            />
            <ContactTable
              title="Opted-Out Contacts"
              description="Contacts who have replied 'STOP' or unsubscribed."
              contacts={optedOutContacts}
              searchTerm={optedOutSearch}
              setSearchTerm={setOptedOutSearch}
              icon={UserX}
              emptyMessage="No contacts have opted out."
              dateField="opted_out_at"
            />
          </div>

          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <BarChart className="w-6 h-6" />
                <div>
                  <CardTitle>Campaign Performance</CardTitle>
                  <CardDescription>Breakdown of registrations by campaign.</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Campaign</TableHead>
                      <TableHead>Sent</TableHead>
                      <TableHead>Conv.</TableHead>
                      <TableHead className="text-right">Rate</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {campaignPerformance.length > 0 ? (
                      campaignPerformance.map(campaign => (
                        <TableRow key={campaign.name}>
                          <TableCell><Badge variant="outline">{campaign.name}</Badge></TableCell>
                          <TableCell>{campaign.sent}</TableCell>
                          <TableCell>{campaign.conversions}</TableCell>
                          <TableCell className="text-right font-mono">
                            {campaign.sent > 0 ? ((campaign.conversions / campaign.sent) * 100).toFixed(1) + '%' : '0.0%'}
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan="4" className="h-24 text-center">No campaign data available.</TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </div>
      </motion.div>
    </>
  );
};

export default SmsAnalyticsPage;
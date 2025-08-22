import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Helmet } from 'react-helmet-async';
import { useAuth } from '@/contexts/SupabaseAuthContext';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useToast } from '@/components/ui/use-toast';
import { Link } from 'react-router-dom';
import { Loader2 } from 'lucide-react';

const ConversationsPage = () => {
  const { supabase } = useAuth();
  const [conversations, setConversations] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchConversations = useCallback(async () => {
    if (!supabase) return;
    setLoading(true);
    try {
      let query = supabase.from('v_sms_conversations')
        .select('*')
        .order('last_message_at', { ascending: false });

      const { data, error } = await query;

      if (error) {
        throw error;
      }
      setConversations(data);
    } catch (error) {
      console.error('Error fetching conversations:', error.message);
      toast({
        title: 'Uh oh! Something went wrong.',
        description: `Failed to load conversations: ${error.message}`,
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  }, [supabase, toast]);

  useEffect(() => {
    fetchConversations();
  }, [fetchConversations]);

  const filteredConversations = useMemo(() => {
    return conversations
      .filter(c => {
        if (filterStatus === 'all') return true;
        return (c.status || 'open') === filterStatus;
      })
      .filter(c => {
        if (!searchTerm) return true;
        const lowerCaseSearchTerm = searchTerm.toLowerCase();
        return (
          (c.phone || '').toLowerCase().includes(lowerCaseSearchTerm) ||
          `${c.first_name || ''} ${c.last_name || ''}`.toLowerCase().includes(lowerCaseSearchTerm)
        );
      });
  }, [conversations, searchTerm, filterStatus]);

  const handleRefresh = () => {
    toast({
      title: 'Refreshing conversations...',
      description: 'Fetching the latest data for you!',
    });
    fetchConversations();
  };

  return (
    <div className="container mx-auto py-8">
      <Helmet>
        <title>RE360 Concierge — Conversations</title>
        <meta name="description" content="Manage and view all SMS conversations with RE360 Concierge. Filter by status and search by phone or name." />
        <meta property="og:title" content="RE360 Concierge — Conversations" />
        <meta property="og:description" content="Manage and view all SMS conversations with RE360 Concierge. Filter by status and search by phone or name." />
      </Helmet>

      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">SMS Conversations</h1>

      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <Input
          type="text"
          placeholder="Search phone or name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-grow"
        />
        <Select onValueChange={setFilterStatus} value={filterStatus}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="open">Open</SelectItem>
            <SelectItem value="escalated">Escalated</SelectItem>
            <SelectItem value="closed">Closed</SelectItem>
          </SelectContent>
        </Select>
        <Button onClick={handleRefresh} disabled={loading} className="w-full sm:w-auto">
          {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : 'Refresh'}
        </Button>
      </div>

      <div className="rounded-lg border bg-card text-card-foreground shadow-sm overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[150px]">Phone</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Loan Officer</TableHead>
              <TableHead className="w-[120px]">Status</TableHead>
              <TableHead>Last Message</TableHead>
              <TableHead className="w-[180px]">When</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={6} className="h-24 text-center text-muted-foreground">
                  <div className="flex justify-center items-center">
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Loading conversations...
                  </div>
                </TableCell>
              </TableRow>
            ) : filteredConversations.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="h-24 text-center text-muted-foreground">
                  No conversations found.
                </TableCell>
              </TableRow>
            ) : (
              filteredConversations.map((r) => {
                const name = `${r.first_name || ''} ${r.last_name || ''}`.trim();
                const statusClass = r.status || 'open';
                const when = r.last_message_at ? new Date(r.last_message_at).toLocaleString() : '';
                const lastMessageBody = (r.last_message_body || '').slice(0, 80);

                return (
                  <TableRow key={r.phone}>
                    <TableCell className="font-medium">
                      <Link to={`/admin/conversations/${encodeURIComponent(r.phone)}`} className="text-primary hover:underline">
                        {r.phone}
                      </Link>
                    </TableCell>
                    <TableCell>{name || 'N/A'}</TableCell>
                    <TableCell>{r.loan_officer_name || 'Unassigned'}</TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        statusClass === 'open' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' :
                        statusClass === 'escalated' ? 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200' :
                        'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200'
                      }`}>
                        {statusClass.charAt(0).toUpperCase() + statusClass.slice(1)}
                      </span>
                    </TableCell>
                    <TableCell>{lastMessageBody}</TableCell>
                    <TableCell>{when}</TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default ConversationsPage;
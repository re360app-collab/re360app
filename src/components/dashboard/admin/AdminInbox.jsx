import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Inbox, Mail, Archive, User, Clock, Send, Loader2, AlertTriangle } from 'lucide-react';
import { getContactMessages, updateMessageStatus } from '@/lib/contact';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { useAuth } from '@/contexts/SupabaseAuthContext';

const AdminInbox = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const { toast } = useToast();
  const { supabase } = useAuth();

  const fetchMessages = useCallback(async () => {
    if (!supabase) return;
    setLoading(true);
    setError(null);
    try {
      const { data, error: fetchError } = await getContactMessages(supabase);
      if (fetchError) throw fetchError;
      setMessages(data || []);
    } catch (err) {
      console.error("Error fetching messages:", err);
      setError("Could not retrieve contact messages. Please try again later.");
      toast({
        title: "Error fetching messages",
        description: err.message || "An unexpected error occurred.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }, [toast, supabase]);

  useEffect(() => {
    fetchMessages();
  }, [fetchMessages]);
  
  const handleSelectMessage = async (message) => {
    setSelectedMessage(message);
    if (!message.is_read) {
      try {
        await updateMessageStatus(supabase, message.id, { is_read: true });
        setMessages(prev => prev.map(m => m.id === message.id ? { ...m, is_read: true } : m));
      } catch (error) {
        // Silently fail, it will be marked as read on next view
      }
    }
  };

  const handleArchive = async (messageId) => {
    try {
      await updateMessageStatus(supabase, messageId, { archived: true });
      toast({ title: "Message archived." });
      setSelectedMessage(null);
      setMessages(prev => prev.filter(m => m.id !== messageId));
    } catch (error) {
       toast({ title: "Failed to archive.", variant: "destructive" });
    }
  };
  
  const activeMessages = messages.filter(m => !m.archived);
  const unreadCount = activeMessages.filter(m => !m.is_read).length;

  if (loading) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-full p-6">
        <div className="lg:col-span-1">
            <Skeleton className="h-12 w-full mb-4" />
            <Skeleton className="h-24 w-full mb-2" />
            <Skeleton className="h-24 w-full mb-2" />
            <Skeleton className="h-24 w-full mb-2" />
        </div>
        <div className="lg:col-span-2">
            <Skeleton className="h-full w-full" />
        </div>
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg h-full"
    >
      <div className="flex items-center mb-6">
        <Inbox className="w-8 h-8 mr-3 text-blue-500" />
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Contact Inbox</h1>
        {unreadCount > 0 && 
            <Badge variant="destructive" className="ml-4">{unreadCount} New</Badge>
        }
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6" style={{height: 'calc(100% - 60px)'}}>
        <div className="lg:col-span-1 border-r border-gray-200 dark:border-gray-700 pr-4 overflow-y-auto">
          {error ? (
            <div className="text-center py-10 text-red-500">
              <AlertTriangle className="w-12 h-12 mx-auto mb-2" />
              <p>{error}</p>
              <Button onClick={fetchMessages} className="mt-4">Try Again</Button>
            </div>
          ) : activeMessages.length > 0 ? (
            activeMessages.map(msg => (
              <MessageItem 
                  key={msg.id} 
                  message={msg} 
                  isSelected={selectedMessage?.id === msg.id}
                  onSelect={handleSelectMessage}
              />
            ))
          ) : (
            <div className="text-center py-10 text-gray-500">
                <Mail className="w-12 h-12 mx-auto mb-2" />
                <p>No new messages.</p>
            </div>
          )}
        </div>
        <div className="lg:col-span-2">
          {selectedMessage ? (
            <MessageDetail 
                message={selectedMessage} 
                onArchive={handleArchive}
            />
          ) : (
             <div className="flex flex-col items-center justify-center h-full text-gray-400 dark:text-gray-500">
                <Mail className="w-24 h-24 mb-4" />
                <h2 className="text-xl font-semibold">Select a message to read</h2>
                <p>Your messages will appear here.</p>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

const MessageItem = ({ message, isSelected, onSelect }) => (
    <motion.div
        whileHover={{ scale: 1.02 }}
        className={`p-4 mb-2 rounded-lg cursor-pointer border-l-4 ${isSelected ? 'bg-blue-100 dark:bg-blue-900/50 border-blue-500' : 'bg-gray-50 dark:bg-gray-900/50 border-transparent'} ${!message.is_read ? 'font-bold' : ''}`}
        onClick={() => onSelect(message)}
    >
        <div className="flex justify-between items-start">
            <p className={`text-gray-800 dark:text-gray-200 truncate`}>{message.name || 'Anonymous'}</p>
            {!message.is_read && <div className="w-2.5 h-2.5 bg-blue-500 rounded-full flex-shrink-0 ml-2 mt-1.5"></div>}
        </div>
        <p className={`text-sm text-gray-600 dark:text-gray-400 truncate ${!message.is_read ? 'font-semibold' : 'font-normal'}`}>{message.email}</p>
        <p className="text-xs text-gray-400 dark:text-gray-500 mt-2">{new Date(message.created_at).toLocaleString()}</p>
    </motion.div>
);

const MessageDetail = ({ message, onArchive }) => {
    const { toast } = useToast();
    return (
        <div className="p-4 h-full flex flex-col">
            <div className="flex-grow">
                <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center">
                        <User className="w-5 h-5 mr-2 text-gray-500" />
                        <div>
                            <p className="font-semibold text-lg text-gray-900 dark:text-gray-100">{message.name}</p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">{message.email}</p>
                        </div>
                    </div>
                    <Button variant="outline" size="sm" onClick={() => onArchive(message.id)}>
                        <Archive className="w-4 h-4 mr-2" />
                        Archive
                    </Button>
                </div>
                <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-6">
                    <Clock className="w-4 h-4 mr-2" />
                    <span>{new Date(message.created_at).toLocaleString()}</span>
                </div>
                <div className="prose dark:prose-invert max-w-none bg-gray-50 dark:bg-gray-900/50 rounded-lg p-4">
                    <p>{message.message}</p>
                </div>
            </div>
            <div className="mt-6 border-t border-gray-200 dark:border-gray-700 pt-4">
                <h3 className="text-lg font-semibold mb-2">Reply (Coming Soon)</h3>
                 <textarea
                    rows="3"
                    placeholder={`Reply to ${message.name}...`}
                    className="w-full bg-gray-100 dark:bg-gray-700/50 border-gray-300 dark:border-gray-600 text-gray-800 dark:text-white rounded-md p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-shadow"
                    disabled
                ></textarea>
                <div className="flex justify-end mt-2">
                    <Button disabled onClick={() => toast({ title: "Feature coming soon!", description: "Replying from the inbox is on the roadmap."})}>
                        <Send className="w-4 h-4 mr-2"/>
                        Send Reply
                    </Button>
                </div>
            </div>
        </div>
    )
};

export default AdminInbox;
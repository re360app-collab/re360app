import { useState, useEffect, useCallback, useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { supabase } from '@/lib/supabase';
import { getChatHistory } from '@/lib/chats';
import { useToast } from "@/components/ui/use-toast";

export const useNathanChatLogic = (user) => {
  const { toast } = useToast();
  const [sessionId, setSessionId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isTyping, setIsTyping] = useState(false);
  const abortControllerRef = useRef(null);

  useEffect(() => {
    let currentSessionId = sessionStorage.getItem('nathanChatSessionId');
    if (!currentSessionId) {
      currentSessionId = uuidv4();
      sessionStorage.setItem('nathanChatSessionId', currentSessionId);
    }
    setSessionId(currentSessionId);
  }, []);

  useEffect(() => {
    if (!user || !sessionId) {
      setIsLoading(true);
      return;
    }

    const fetchHistory = async () => {
      setIsLoading(true);
      const { data, error } = await getChatHistory(user.id, sessionId);
      if (error) {
        toast({
          title: "Error",
          description: "Could not load chat history.",
          variant: "destructive",
        });
        setMessages([{
          sender: 'ai',
          content: "Hello! I'm Nathan, your AI Mortgage Mentor. How can I help you today?"
        }]);
      } else {
        const formattedMessages = data.map(msg => ({ sender: msg.sender, content: msg.content }));
        if (formattedMessages.length === 0) {
          formattedMessages.push({
            sender: 'ai',
            content: "Hello! I'm Nathan, your AI Mortgage Mentor. How can I help you today?"
          });
        }
        setMessages(formattedMessages);
      }
      setIsLoading(false);
    };
    
    fetchHistory();
  }, [sessionId, user, toast]);

  const addMessage = useCallback((message) => {
    setMessages(prev => [...prev, message]);
  }, []);
  
  const updateLastMessage = useCallback((chunk) => {
    setMessages(prev => {
      const newMessages = [...prev];
      const lastMessage = newMessages[newMessages.length - 1];
      if (lastMessage && lastMessage.sender === 'ai') {
        lastMessage.content += chunk;
      }
      return newMessages;
    });
  }, []);

  useEffect(() => {
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, []);

  return {
    messages,
    setMessages,
    input,
    setInput,
    isLoading,
    isTyping,
    setIsTyping,
    addMessage,
    updateLastMessage
  };
};
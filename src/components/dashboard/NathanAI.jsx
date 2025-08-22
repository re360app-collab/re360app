import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mic, MicOff, Bot, Loader2 } from 'lucide-react';
import { useNathanChatLogic } from '@/components/dashboard/nathan/useNathanChatLogic';
import { useLiveConversation } from '@/hooks/useLiveConversation';
import { useAuth } from '@/contexts/SupabaseAuthContext';
import { useToast } from '@/components/ui/use-toast';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { supabase } from '@/lib/supabase';
import NathanMessageBubble from '@/components/dashboard/nathan/NathanMessageBubble';
import NathanInput from '@/components/dashboard/nathan/NathanInput';
import NathanTypingIndicator from '@/components/dashboard/nathan/NathanTypingIndicator';

const LiveStatusIndicator = ({ status }) => {
  const statusConfig = {
    idle: { text: "Idle", color: "bg-gray-400" },
    listening: { text: "Listening...", color: "bg-green-500 animate-pulse" },
    thinking: { text: "Thinking...", color: "bg-yellow-500" },
    speaking: { text: "Speaking...", color: "bg-blue-500" },
  };
  const { text, color } = statusConfig[status] || statusConfig.idle;

  return (
    <div className="flex items-center space-x-2 text-xs text-gray-500 dark:text-gray-400">
      <div className={cn("w-2 h-2 rounded-full", color)}></div>
      <span>{text}</span>
    </div>
  );
};

const NathanAI = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const { messages, setMessages, input, setInput, isLoading, isTyping, setIsTyping, addMessage, updateLastMessage } = useNathanChatLogic(user);
  const messagesEndRef = useRef(null);
  const audioRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [messages, isTyping]);

  const { isLive, status, setStatus, transcript, toggleLiveConversation, startListening } = useLiveConversation({
    onUserSpeech: (text) => processUserRequest(text),
    onError: (err) => {
      toast({ title: 'Voice Error', description: err, variant: 'destructive' });
      setStatus('idle');
    },
  });

  const playAudio = useCallback((audioUrl) => {
    if (audioRef.current) {
      audioRef.current.pause();
    }
    const newAudio = new Audio(audioUrl);
    newAudio.onended = () => {
      setStatus('idle');
      if (isLive) {
        startListening();
      }
    };
    audioRef.current = newAudio;
    newAudio.play();
  }, [isLive, setStatus, startListening]);

  const processUserRequest = useCallback(async (text) => {
    if (!text.trim()) return;

    addMessage({ sender: 'user', content: text });
    await supabase.from('chat_messages').insert({ user_id: user.id, session_id: sessionStorage.getItem('nathanChatSessionId'), sender: 'user', content: text });

    setIsTyping(true);
    setStatus('thinking');
    addMessage({ sender: 'ai', content: '' });

    try {
      const { data: { session } } = await supabase.auth.getSession();

      // Step 1: Get streaming text from AI
      const textResponse = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/nathan-advanced-voice`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session.access_token}`,
        },
        body: JSON.stringify({ input: text }),
      });

      if (!textResponse.ok || !textResponse.body) {
        const errorText = await textResponse.text();
        throw new Error(`AI text streaming error: ${errorText}`);
      }
      
      const reader = textResponse.body.getReader();
      const decoder = new TextDecoder();
      let fullReply = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value, { stream: true });
        updateLastMessage(chunk);
        fullReply += chunk;
      }

      setIsTyping(false);
      await supabase.from('chat_messages').insert({ user_id: user.id, session_id: sessionStorage.getItem('nathanChatSessionId'), sender: 'ai', content: fullReply });
      
      // Step 2: If in live mode, get audio for the full text using direct fetch
      if (isLive) {
        setStatus('speaking');
        const audioFetchResponse = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/text-to-speech-elevenlabs`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${session.access_token}`,
          },
          body: JSON.stringify({ text: fullReply }),
        });

        if (!audioFetchResponse.ok) {
          const errorBody = await audioFetchResponse.text();
          throw new Error(`Audio generation failed: ${errorBody}`);
        }

        const audioBlob = await audioFetchResponse.blob();
        
        if (!(audioBlob instanceof Blob)) {
          throw new Error("Invalid audio data received. Expected a Blob.");
        }

        const audioUrl = URL.createObjectURL(audioBlob);
        playAudio(audioUrl);
      } else {
        setStatus('idle');
      }

    } catch (e) {
      console.error("Error in processUserRequest:", e);
      toast({ title: "Error", description: `Could not process your request: ${e.message}`, variant: "destructive" });
      setMessages(prev => prev.slice(0, -1)); // Remove the empty AI bubble
      setIsTyping(false);
      setStatus('idle');
      if (isLive) startListening();
    }

  }, [user, addMessage, updateLastMessage, setIsTyping, isLive, playAudio, toast, setStatus, startListening]);
  
  const handleTextSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    const text = input;
    setInput('');
    await processUserRequest(text);
  };
  
  if (isLoading) {
    return (
      <div className="flex h-full items-center justify-center">
        <Loader2 className="w-12 h-12 animate-spin text-blue-500" />
        <p className="ml-4 text-lg text-slate-600">Warming up Nathan AI...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-white dark:bg-slate-900 rounded-lg shadow-lg overflow-hidden border border-slate-200 dark:border-slate-700">
      <header className="flex items-center justify-between p-4 border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50">
        <div className="flex items-center space-x-3">
          <Bot className="w-8 h-8 text-blue-500" />
          <div>
            <h1 className="text-lg font-bold text-slate-800 dark:text-slate-100">Nathan AI</h1>
            <p className="text-sm text-slate-500 dark:text-slate-400">Your AI Mortgage Mentor</p>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          {isLive && <LiveStatusIndicator status={status} />}
          <Button
            size="icon"
            variant={isLive ? 'destructive' : 'outline'}
            onClick={toggleLiveConversation}
            className="rounded-full w-10 h-10 transition-all duration-300 ease-in-out transform hover:scale-110"
          >
            <AnimatePresence mode="wait">
              {isLive ? (
                <motion.div key="mic-off" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
                  <MicOff className="w-5 h-5" />
                </motion.div>
              ) : (
                <motion.div key="mic-on" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
                  <Mic className="w-5 h-5 text-green-500" />
                </motion.div>
              )}
            </AnimatePresence>
          </Button>
        </div>
      </header>

      <ScrollArea className="flex-1 p-4">
        <div className="space-y-6">
          {messages.map((msg, index) => (
            <NathanMessageBubble key={index} message={msg} />
          ))}
          {isTyping && <NathanTypingIndicator />}
          <div ref={messagesEndRef} />
        </div>
      </ScrollArea>
      
      <AnimatePresence>
        {isLive && status === 'listening' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="px-4 pb-2 text-center text-sm text-slate-500 dark:text-slate-400"
          >
            {transcript || "Listening..."}
          </motion.div>
        )}
      </AnimatePresence>

      <footer className="p-4 border-t border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50">
        <form onSubmit={handleTextSubmit}>
          <NathanInput 
            input={input}
            setInput={setInput}
            isTyping={isTyping || (isLive && status !== 'idle')}
            handleSendMessage={handleTextSubmit}
          />
        </form>
      </footer>
    </div>
  );
};

export default NathanAI;
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { motion, AnimatePresence } from 'framer-motion';
import { Mic, MicOff, Square, Bot, BrainCircuit, X } from 'lucide-react';
import { useLiveConversation } from '@/hooks/useLiveConversation';

const VoiceChat = ({ onVoiceResult }) => {
  const { toast } = useToast();
  const {
    isLive,
    status,
    transcript,
    toggleLiveConversation,
  } = useLiveConversation({
    onUserSpeech: onVoiceResult,
    onError: (error) => {
      toast({
        title: "Voice Error",
        description: error,
        variant: "destructive",
      });
    },
  });

  const [showPanel, setShowPanel] = useState(false);

  useEffect(() => {
    if (isLive) {
      setShowPanel(true);
    } else {
      // Delay hiding the panel to allow for exit animation
      setTimeout(() => setShowPanel(false), 300);
    }
  }, [isLive]);

  const getButtonState = () => {
    if (isLive) {
      switch (status) {
        case 'listening':
          return { icon: <Mic className="text-green-400" />, text: 'Listening...', color: 'bg-green-500/20 border-green-500' };
        case 'thinking':
          return { icon: <BrainCircuit className="text-yellow-400 animate-pulse" />, text: 'Thinking...', color: 'bg-yellow-500/20 border-yellow-500' };
        case 'speaking':
          return { icon: <Bot className="text-purple-400 animate-pulse" />, text: 'Speaking...', color: 'bg-purple-500/20 border-purple-500' };
        default:
          return { icon: <Square />, text: 'End Conversation', color: 'bg-red-500 hover:bg-red-600' };
      }
    }
    return { icon: <Mic />, text: 'Live Conversation', color: 'bg-blue-500 hover:bg-blue-600' };
  };

  const { icon, text, color } = getButtonState();

  return (
    <div className="relative">
      <Button
        onClick={toggleLiveConversation}
        className={`transition-all duration-300 w-48 flex items-center justify-center gap-2 ${color} ${isLive ? 'border' : ''}`}
      >
        {isLive && status !== 'idle' ? 
            React.cloneElement(icon) : 
            isLive ? <Square /> : <Mic />
        }
        <span>{text}</span>
      </Button>
      <AnimatePresence>
        {showPanel && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.2 }}
            className="absolute bottom-full right-0 mb-2 w-80 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-lg shadow-xl z-50 p-4"
          >
            <div className="flex justify-between items-center mb-2">
              <div className="flex items-center gap-2">
                {isLive && <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div>}
                <h4 className="font-semibold text-gray-800 dark:text-gray-200">
                  Live Conversation
                </h4>
              </div>
              <button onClick={toggleLiveConversation} className="text-gray-400 hover:text-gray-600">
                <X size={18} />
              </button>
            </div>
            <p className="text-gray-600 dark:text-gray-300 min-h-[40px] italic">
              {transcript || (status === 'listening' ? "I'm listening..." : "Say something to start...")}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default VoiceChat;
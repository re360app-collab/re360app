import { useState, useRef, useEffect, useCallback } from 'react';

const useSpeechRecognition = (onResult) => {
  const recognition = useRef(null);
  const [transcript, setTranscript] = useState('');
  const timeoutRef = useRef(null);

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      console.error("Speech Recognition not available.");
      return;
    }

    recognition.current = new SpeechRecognition();
    recognition.current.continuous = true;
    recognition.current.interimResults = true;

    recognition.current.onresult = (event) => {
      let finalTranscript = '';
      let interimTranscript = '';
      for (let i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
          finalTranscript += event.results[i][0].transcript;
        } else {
          interimTranscript += event.results[i][0].transcript;
        }
      }
      setTranscript(interimTranscript);

      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      timeoutRef.current = setTimeout(() => {
        if (finalTranscript.trim()) {
          onResult(finalTranscript.trim());
          stopListening();
        }
      }, 1500); // 1.5 seconds of silence
    };

    return () => {
      if (recognition.current) {
        recognition.current.stop();
      }
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [onResult]);
  
  const startListening = useCallback(() => {
    if (recognition.current) {
      setTranscript('');
      recognition.current.start();
    }
  }, []);

  const stopListening = useCallback(() => {
    if (recognition.current) {
      recognition.current.stop();
    }
     if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
  }, []);

  return { transcript, startListening, stopListening };
};

export const useLiveConversation = ({ onUserSpeech, onError }) => {
  const [isLive, setIsLive] = useState(false);
  const [status, setStatus] = useState('idle');
  const audioRef = useRef(null);

  const handleSpeechResult = useCallback((text) => {
    if (text) {
      onUserSpeech(text);
    }
  }, [onUserSpeech]);
  
  const { transcript, startListening, stopListening } = useSpeechRecognition(handleSpeechResult);

  const toggleLiveConversation = useCallback(() => {
    setIsLive(prev => {
      const nextState = !prev;
      if (nextState) {
        setStatus('listening');
        startListening();
      } else {
        setStatus('idle');
        stopListening();
        if (audioRef.current) {
          audioRef.current.pause();
        }
      }
      return nextState;
    });
  }, [startListening, stopListening]);

  useEffect(() => {
      if (isLive && status === 'listening') {
          startListening();
      }
  }, [isLive, status, startListening]);


  return {
    isLive,
    status,
    setStatus,
    transcript,
    toggleLiveConversation,
    startListening,
    stopListening
  };
};
import React, { useState, useRef, useEffect } from 'react';
import './App.css';

interface Message {
  text: string;
  sender: 'user' | 'bills-fan';
  timestamp?: Date;
}

function App() {
  const [userInput, setUserInput] = useState('');
  const [chatHistory, setChatHistory] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  // Load messages from localStorage on component mount
  useEffect(() => {
    const savedMessages = localStorage.getItem('billsChatHistory');
    if (savedMessages) {
      try {
        const parsedMessages = JSON.parse(savedMessages);
        // Convert timestamp strings back to Date objects
        const messagesWithDates = parsedMessages.map((msg: any) => ({
          ...msg,
          timestamp: msg.timestamp ? new Date(msg.timestamp) : new Date()
        }));
        setChatHistory(messagesWithDates);
        console.log('Loaded from localStorage:', messagesWithDates.length, 'messages');
      } catch (error) {
        console.log('Error loading chat history:', error);
      }
    } else {
      console.log('No saved messages found in localStorage');
    }
  }, []);

  // Save messages to localStorage whenever chatHistory changes
  useEffect(() => {
    if (chatHistory.length > 0) {
      localStorage.setItem('billsChatHistory', JSON.stringify(chatHistory));
      console.log('Saved to localStorage:', chatHistory.length, 'messages');
    }
  }, [chatHistory]);

  const billsEasterEggs = [
    'bills mafia',
    'go bills',
    'bills shout',
    'wide right',
    'bills by a billion',
    'lets go buffalo',
    'bills backers',
    'highmark stadium',
    'orchard park',
    'bills backers bar'
  ];

  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatHistory, isLoading]);

  const playBillsSound = (soundType: 'shout' | 'bell' | 'victory') => {
    const audio = new Audio();
    
    switch (soundType) {
      case 'shout':
        audio.src = '/tones/buffalo-bills-shout-song.mp3';
        break;
      case 'bell':
        audio.src = '/tones/bell-ringing-05.wav';
        break;
      case 'victory':
        audio.src = '/tones/buffalo-bills-shout-song.mp3';
        break;
      default:
        audio.src = '/tones/buffalo-bills-shout-song.mp3';
    }
    
     audio.volume = 0.5;
    
    audio.addEventListener('loadstart', () => console.log('Audio loading started for:', soundType));
    audio.addEventListener('canplay', () => console.log('Audio can play for:', soundType));
    audio.addEventListener('error', (e) => console.log('Audio error for', soundType, ':', e));
    
    audio.play().catch((error) => {
      console.log('Audio playback failed for', soundType, ':', error);
      playFallbackBeep();
    });
  };

  const playFallbackBeep = () => {
    try {
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
      oscillator.frequency.setValueAtTime(600, audioContext.currentTime + 0.1);
      oscillator.frequency.setValueAtTime(800, audioContext.currentTime + 0.2);
      
      gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
      
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.3);
    } catch (error) {
      console.log('Sound not supported in this browser');
    }
  };

  const checkEasterEgg = (message: string) => {
    const lowerMessage = message.toLowerCase();
    return billsEasterEggs.some(phrase => lowerMessage.includes(phrase));
  };

  const clearChatHistory = () => {
    setChatHistory([]);
    localStorage.removeItem('billsChatHistory');
    console.log('Chat history cleared');
  };

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userInput.trim()) return;

    const messageToSend = userInput.trim();
    setUserInput('');

    const newMessage = { 
      text: messageToSend, 
      sender: 'user' as const,
      timestamp: new Date()
    };
    setChatHistory(prev => [...prev, newMessage]);
    setIsLoading(true);
    setIsTyping(true);

    const isEasterEgg = checkEasterEgg(messageToSend);

    try {
      const response = await fetch('http://localhost:3001/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userMessage: messageToSend })
      });

      const data = await response.json();
      setChatHistory(prev => [...prev, { 
        text: data.message, 
        sender: 'bills-fan',
        timestamp: new Date()
      }]);
      
      if (isEasterEgg) {
        playBillsSound('shout');
      } else {
        playFallbackBeep();
      }
    } catch (error) {
      setChatHistory(prev => [...prev, { 
        text: "Sorry, I'm having trouble connecting to the server!", 
        sender: 'bills-fan',
        timestamp: new Date()
      }]);
    }

    setIsLoading(false);
    setIsTyping(false);
  };

  return (
    <div className="app">
      <header className="header">
        <h1>Bills Memory Keeper</h1>
        <p>Chat with your friendly Bills historian about any era!</p>
      </header>

      <div className="chat-container" ref={chatContainerRef}>
        {chatHistory.map((message, index) => (
          <div key={index} className={`message ${message.sender}`}>
            <div className="message-content">
              {message.text}
            </div>
            {message.timestamp && (
              <div className="message-timestamp">
                {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </div>
            )}
          </div>
        ))}
        {isTyping && (
          <div className="typing-indicator">
            <div className="typing-dots">
              <span></span>
              <span></span>
              <span></span>
            </div>
            <span className="typing-text">Bills Memory Keeper is typing...</span>
          </div>
        )}
      </div>

      <form onSubmit={sendMessage} className="input-form">
        <input
          type="text"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          placeholder="Ask about any Bills moment in history..."
          className="message-input"
        />
        <button type="submit" disabled={isLoading} className="send-button">
          Send
        </button>
        <button 
          type="button"
          className="clear-chat-btn" 
          onClick={clearChatHistory}
          disabled={chatHistory.length === 0}
          title={chatHistory.length === 0 ? "No messages to clear" : "Clear all messages"}
        >
          Clear
        </button>
      </form>
    </div>
  );
}

export default App;
import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Bot, Key, Info } from 'lucide-react';
import { sendMessageToGemini } from '../services/geminiService';
import { ChatMessage } from '../types';

const AIChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: "Hello! I'm the SSV Developers AI Assistant. I can help with project estimates, construction advice, or design ideas. Please note that AI features require an API key connection." }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [needsKey, setNeedsKey] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    const checkKeyStatus = async () => {
      if ((window as any).aistudio) {
        const hasKey = await (window as any).aistudio.hasSelectedApiKey();
        setNeedsKey(!hasKey);
      }
    };
    checkKeyStatus();
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleConnectKey = async () => {
    try {
      const aiStudio = (window as any).aistudio;
      if (aiStudio) {
        await aiStudio.openSelectKey();
        setNeedsKey(false);
        setMessages(prev => [...prev, { role: 'model', text: "API Key connected! How can I assist you with your construction queries now?" }]);
      }
    } catch (e) {
      console.error("Key selection failed", e);
    }
  };

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setIsLoading(true);

    try {
      const history = messages.map(m => ({ role: m.role, text: m.text }));
      const response = await sendMessageToGemini(userMessage, history);
      setMessages(prev => [...prev, { role: 'model', text: response }]);
    } catch (error: any) {
      if (error.message === "AUTH_REQUIRED") {
        setNeedsKey(true);
        setMessages(prev => [...prev, { 
          role: 'model', 
          text: "I need an API key to process your request. Please click the button below to connect with Google AI Studio.", 
          isError: true 
        }]);
      } else {
        setMessages(prev => [...prev, { role: 'model', text: "I'm having some trouble connecting. Please check your internet or try reconnecting your API key.", isError: true }]);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {/* Floating Action Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 z-40 bg-amber-500 text-white p-4 rounded-full shadow-2xl hover:bg-amber-600 transition-all duration-300 hover:scale-110 active:scale-95 ${isOpen ? 'scale-0 opacity-0' : 'scale-100 opacity-100'}`}
        aria-label="Open Chat Assistant"
      >
        <MessageSquare className="w-7 h-7" />
        {needsKey && (
          <span className="absolute -top-1 -right-1 flex h-4 w-4">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-4 w-4 bg-amber-500 border-2 border-white"></span>
          </span>
        )}
      </button>

      {/* Chat Window */}
      <div className={`fixed bottom-6 right-6 w-96 max-w-[calc(100vw-3rem)] h-[550px] bg-white rounded-3xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] z-50 flex flex-col transition-all duration-500 transform origin-bottom-right border border-slate-200 overflow-hidden ${isOpen ? 'scale-100 opacity-100 translate-y-0' : 'scale-90 opacity-0 translate-y-10 pointer-events-none'}`}>
        
        {/* Header */}
        <div className="bg-slate-900 text-white p-6 flex justify-between items-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full -mr-16 -mt-16 blur-3xl"></div>
          <div className="flex items-center gap-4 relative z-10">
            <div className={`p-2.5 rounded-2xl transition-colors ${!needsKey ? 'bg-amber-500' : 'bg-slate-700'}`}>
              <Bot className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-black text-sm tracking-tight uppercase">SSV AI Assistant</h3>
              <p className="text-[10px] text-slate-400 flex items-center gap-1.5 font-bold uppercase tracking-widest">
                <span className={`w-2 h-2 rounded-full ${!needsKey ? 'bg-green-500 animate-pulse' : 'bg-amber-500'}`}></span>
                {!needsKey ? 'Online & Ready' : 'Limited Access'}
              </p>
            </div>
          </div>
          <button onClick={() => setIsOpen(false)} className="text-slate-400 hover:text-white transition-all hover:rotate-90 relative z-10">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-5 space-y-5 bg-slate-50/50">
          {messages.map((msg, idx) => (
            <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div 
                className={`max-w-[85%] rounded-[1.25rem] px-5 py-3.5 text-sm font-medium leading-relaxed shadow-sm ${
                  msg.role === 'user' 
                    ? 'bg-slate-900 text-white rounded-tr-none' 
                    : 'bg-white text-slate-800 border border-slate-100 rounded-tl-none'
                } ${msg.isError ? 'bg-red-50 border-red-100 text-red-600 italic' : ''}`}
              >
                {msg.text}
                {msg.isError && needsKey && (
                  <button 
                    onClick={handleConnectKey}
                    className="mt-4 w-full flex items-center justify-center gap-2 bg-amber-500 text-white py-3 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-amber-600 transition-colors shadow-lg shadow-amber-500/20"
                  >
                    <Key className="w-4 h-4" />
                    Connect API Key
                  </button>
                )}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-white px-6 py-4 rounded-2xl rounded-tl-none shadow-sm border border-slate-100 flex items-center gap-3">
                <div className="flex gap-1.5">
                  <span className="w-2 h-2 bg-amber-500 rounded-full animate-bounce"></span>
                  <span className="w-2 h-2 bg-amber-500 rounded-full animate-bounce [animation-delay:0.2s]"></span>
                  <span className="w-2 h-2 bg-amber-500 rounded-full animate-bounce [animation-delay:0.4s]"></span>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-5 bg-white border-t border-slate-100">
          <div className="flex items-center gap-3">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder={needsKey ? "Connect key to chat..." : "Ask about construction..."}
              className="flex-1 px-5 py-3.5 bg-slate-100 border-2 border-transparent rounded-2xl focus:outline-none focus:border-amber-500 focus:bg-white text-sm font-bold transition-all"
            />
            <button
              onClick={handleSend}
              disabled={isLoading || !input.trim()}
              className="p-3.5 bg-slate-900 text-white rounded-2xl hover:bg-amber-500 disabled:opacity-50 transition-all shadow-xl active:scale-90"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
          <div className="flex justify-between items-center mt-4 px-1">
             <p className="text-[9px] text-slate-400 font-black uppercase tracking-widest">Engineering AI v2.5</p>
             <button onClick={handleConnectKey} className="text-[9px] text-amber-600 font-black uppercase tracking-widest hover:underline">Re-connect Key</button>
          </div>
        </div>

      </div>
    </>
  );
};

export default AIChatWidget;
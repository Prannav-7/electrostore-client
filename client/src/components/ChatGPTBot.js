import React, { useState, useEffect, useRef } from 'react';
import FallbackElectricalAssistant from '../services/fallbackElectricalAssistant';
import './ChatGPTBot.css';

const ChatGPTBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const fallbackAssistant = new FallbackElectricalAssistant();

  // Scroll to bottom when new messages arrive
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Initialize chatbot with welcome message
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const welcomeMessage = {
        id: Date.now(),
        type: 'bot',
        content: `👋 Hello! I'm your AI electrical assistant from Jaimaaruthi Electrical Store.

I can help you with:
🔌 Electrical product recommendations
⚡ Technical questions and solutions  
🛠️ Installation guidance
🔒 Safety advice
💡 Product specifications

What electrical question can I help you with today?`,
        timestamp: new Date()
      };
      setMessages([welcomeMessage]);
    }
  }, [isOpen, messages.length]);

  // Handle sending messages
  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;

    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: inputMessage.trim(),
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);
    setIsTyping(true);

    try {
      // Get response from fallback electrical assistant
      const response = fallbackAssistant.askElectricalQuestion(userMessage.content);

      // Simulate typing delay for better UX
      setTimeout(() => {
        const botMessage = {
          id: Date.now() + 1,
          type: 'bot',
          content: `🏪 **Jaimaaruthi Electrical Store Assistant**\n\n${response.answer}`,
          timestamp: new Date(),
          success: response.success,
          source: response.source || 'Store Assistant'
        };

        setMessages(prev => [...prev, botMessage]);
        setIsTyping(false);
        setIsLoading(false);
      }, 1000);

    } catch (error) {
      console.error('Chatbot error:', error);
      
      const errorMessage = {
        id: Date.now() + 1,
        type: 'bot',
        content: "I apologize, but I'm having trouble processing your question right now. Please try again in a moment!",
        timestamp: new Date(),
        success: false
      };

      setMessages(prev => [...prev, errorMessage]);
      setIsTyping(false);
      setIsLoading(false);
    }
  };

  // Handle Enter key press
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Quick action buttons
  const quickActions = [
    { text: "Product recommendations", icon: "🛒" },
    { text: "Installation help", icon: "🔧" },
    { text: "Safety guidelines", icon: "⚠️" },
    { text: "Technical specifications", icon: "📋" }
  ];

  const handleQuickAction = (action) => {
    setInputMessage(action.text);
    inputRef.current?.focus();
  };

  // Clear conversation
  const clearConversation = () => {
    setMessages([]);
  };

  if (!isOpen) {
    return (
      <div className="chatbot-toggle" onClick={() => setIsOpen(true)}>
        <div className="chatbot-icon">
          🤖
        </div>
        <div className="chatbot-pulse"></div>
      </div>
    );
  }

  return (
    <div className="chatbot-container">
      {/* Chatbot Header */}
      <div className="chatbot-header">
        <div className="chatbot-header-info">
          <div className="chatbot-avatar">🤖</div>
          <div className="chatbot-title">
            <h4>AI Electrical Assistant</h4>
            <span className="chatbot-subtitle">Jaimaaruthi Electrical Store</span>
          </div>
        </div>
        <div className="chatbot-header-actions">
          <button 
            className="chatbot-clear-btn"
            onClick={clearConversation}
            title="Clear conversation"
          >
            🗑️
          </button>
          <button 
            className="chatbot-close-btn"
            onClick={() => setIsOpen(false)}
            title="Close chat"
          >
            ✕
          </button>
        </div>
      </div>

      {/* Messages Area */}
      <div className="chatbot-messages">
        {messages.map((message) => (
          <div key={message.id} className={`message ${message.type}`}>
            <div className="message-content">
              {message.content.split('\n').map((line, index) => (
                <React.Fragment key={index}>
                  {line}
                  {index < message.content.split('\n').length - 1 && <br />}
                </React.Fragment>
              ))}
            </div>
            <div className="message-timestamp">
              {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </div>
          </div>
        ))}
        
        {/* Typing indicator */}
        {isTyping && (
          <div className="message bot">
            <div className="message-content typing">
              <div className="typing-dots">
                <span></span>
                <span></span>
                <span></span>
              </div>
              <span>AI is thinking...</span>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Quick Actions */}
      {!isLoading && messages.length <= 2 && (
        <div className="chatbot-quick-actions">
          <div className="quick-actions-title">Quick Help:</div>
          <div className="quick-actions-buttons">
            {quickActions.map((action, index) => (
              <button 
                key={index}
                className="quick-action-btn"
                onClick={() => handleQuickAction(action)}
              >
                <span className="quick-action-icon">{action.icon}</span>
                <span className="quick-action-text">{action.text}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input Area */}
      <div className="chatbot-input-area">
        <div className="chatbot-input-container">
          <textarea
            ref={inputRef}
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask me anything about electrical products..."
            className="chatbot-input"
            rows="1"
            disabled={isLoading}
          />
          <button 
            onClick={handleSendMessage}
            disabled={!inputMessage.trim() || isLoading}
            className="chatbot-send-btn"
          >
            {isLoading ? '⏳' : '📤'}
          </button>
        </div>
        <div className="chatbot-footer">
          <span>💡 Powered by ChatGPT • Electrical expertise for Jaimaaruthi Store</span>
        </div>
      </div>
    </div>
  );
};

export default ChatGPTBot;
import React, { useState, useEffect, useRef } from 'react';
import { X, Send, MessageCircle, Minimize2 } from 'lucide-react';
import { toast } from 'sonner';
import axios from 'axios';
import { API_URL } from '../config/api';

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState([]);
  const [conversationState, setConversationState] = useState('welcome');
  const [userInput, setUserInput] = useState('');
  const [leadData, setLeadData] = useState({
    projectType: '',
    projectSize: '',
    serviceRequired: '',
    timeline: '',
    contact: ''
  });
  
  const messagesEndRef = useRef(null);
  const chatRef = useRef(null);

  // Auto-scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Auto-trigger after 8-10 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!isOpen) {
        setIsOpen(true);
        initializeChat();
      }
    }, 9000); // 9 seconds

    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Scroll trigger (50-70% page) - ONLY for article pages
  useEffect(() => {
    const handleScroll = () => {
      // Check if we're on an article page
      const isArticlePage = window.location.pathname.includes('/insights/');
      
      if (!isArticlePage) return; // Only trigger on article pages
      
      const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
      
      if (scrollPercent >= 50 && !isOpen && messages.length === 0) {
        setIsOpen(true);
        addMessage('bot', 'Need help with your construction project? I can help you plan, budget, and choose the right package.', ['🏗️ Start My Project', '💰 Get Cost Estimate', '📞 Book Consultation']);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isOpen, messages.length]);

  const initializeChat = () => {
    const welcomeMsg = "Welcome to Spacexio.\nWe provide architecture, BIM, and end-to-end construction solutions.\nHow can we assist you today?";
    addMessage('bot', welcomeMsg, ['🏗️ Start My Project', '💰 Get Cost Estimate', '📐 Explore Services', '📞 Book Consultation']);
  };

  const addMessage = (sender, text, buttons = [], showInput = false) => {
    const newMessage = {
      id: Date.now(),
      sender,
      text,
      buttons,
      showInput,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const handleButtonClick = (buttonText) => {
    // Add user's choice to chat
    addMessage('user', buttonText);

    // Route based on button
    if (buttonText.includes('Start') || buttonText.includes('Project')) {
      startProjectFlow();
    } else if (buttonText.includes('Estimate')) {
      startProjectFlow();
    } else if (buttonText.includes('Services')) {
      exploreServicesFlow();
    } else if (buttonText.includes('Consultation')) {
      bookConsultationFlow();
    } else {
      handleConversationFlow(buttonText);
    }
  };

  const startProjectFlow = () => {
    setConversationState('projectType');
    addMessage('bot', 'Great! Let\'s understand your project better.\n\nWhat type of project are you planning?', 
      ['Residential', 'Commercial', 'Interior', 'Other']);
  };

  const exploreServicesFlow = () => {
    setConversationState('services');
    addMessage('bot', 'Explore our specialized services:', 
      ['Architectural Design', 'BIM & Coordination', 'MEP Services', 'Interior Design', 'Design-to-Build']);
  };

  const bookConsultationFlow = () => {
    setConversationState('consultation');
    addMessage('bot', 'How would you like to proceed?', 
      ['Schedule Call', 'Request Callback', 'Continue Chat']);
  };

  const handleConversationFlow = (response) => {
    const newLeadData = { ...leadData };

    switch (conversationState) {
      case 'projectType':
        newLeadData.projectType = response;
        setLeadData(newLeadData);
        setConversationState('projectSize');
        addMessage('bot', 'What is the approximate project size?', 
          ['Below 1,000 sqft', '1,000 - 5,000 sqft', '5,000 - 20,000 sqft', '20,000+ sqft']);
        break;

      case 'projectSize':
        newLeadData.projectSize = response;
        setLeadData(newLeadData);
        setConversationState('serviceRequired');
        addMessage('bot', 'Which service do you need?', 
          ['Architectural Design', 'BIM Services', 'Execution', 'Interiors', 'Complete Design-to-Build']);
        break;

      case 'serviceRequired':
        newLeadData.serviceRequired = response;
        setLeadData(newLeadData);
        setConversationState('timeline');
        addMessage('bot', 'When are you planning to start?', 
          ['Immediate', '1-3 Months', '3-6 Months', 'Planning Stage']);
        break;

      case 'timeline':
        newLeadData.timeline = response;
        setLeadData(newLeadData);
        generateRecommendation(newLeadData);
        break;

      case 'services':
        showServiceDetails(response);
        break;

      case 'consultation':
        handleConsultation(response);
        break;

      case 'leadCapture':
        submitLead(response);
        break;

      default:
        break;
    }
  };

  const generateRecommendation = (data) => {
    let recommendation = `Based on your ${data.projectType.toLowerCase()} project (${data.projectSize}), `;
    
    if (data.serviceRequired.includes('Complete') || data.serviceRequired.includes('Design-to-Build')) {
      recommendation += 'we recommend a design-to-build approach to ensure seamless coordination, cost efficiency, and timely execution.';
    } else if (data.serviceRequired.includes('BIM')) {
      recommendation += 'our BIM services will provide accurate 3D modeling, clash detection, and coordinated execution.';
    } else {
      recommendation += `our ${data.serviceRequired.toLowerCase()} service will deliver optimized solutions tailored to your timeline.`;
    }

    addMessage('bot', recommendation);
    
    setTimeout(() => {
      setConversationState('leadCapture');
      addMessage('bot', 'Please share your email or contact number so we can prepare a detailed proposal.', [], true);
    }, 1500);
  };

  const showServiceDetails = (service) => {
    const serviceDetails = {
      'Architectural Design': 'Comprehensive architectural planning with 3D visualization, structural design, and statutory approvals.',
      'BIM & Coordination': 'Building Information Modeling for clash-free execution, accurate cost estimation, and project coordination.',
      'MEP Services': 'Mechanical, Electrical & Plumbing design with energy-efficient solutions and compliance.',
      'Interior Design': 'Modern interior design with space optimization, material selection, and execution support.',
      'Design-to-Build': 'End-to-end solution from concept to completion with fixed pricing and timeline commitment.'
    };

    addMessage('bot', serviceDetails[service] || 'Complete construction solution with transparent pricing and quality execution.');
    
    setTimeout(() => {
      addMessage('bot', 'Would you like to proceed?', ['Start My Project', 'Get Estimate', 'Back to Menu']);
    }, 1000);
  };

  const handleConsultation = (option) => {
    if (option.includes('Schedule') || option.includes('Callback')) {
      setConversationState('leadCapture');
      addMessage('bot', 'Please share your contact details and preferred time.', [], true);
    } else {
      startProjectFlow();
    }
  };

  const handleInputSubmit = async (e) => {
    e.preventDefault();
    if (!userInput.trim()) return;

    addMessage('user', userInput);
    
    if (conversationState === 'leadCapture') {
      await submitLead(userInput);
    }
    
    setUserInput('');
  };

  const submitLead = async (contact) => {
    // Validate email or phone
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[\d\s\+\-\(\)]{10,}$/;
    
    if (!emailRegex.test(contact) && !phoneRegex.test(contact)) {
      addMessage('bot', 'Please provide a valid email address or phone number.', [], true);
      return;
    }

    try {
      await axios.post(`${API_URL}/api/chatbot/lead`, {
        ...leadData,
        contact,
        timestamp: new Date().toISOString()
      });

      addMessage('bot', 'Thank you. Our team will review your requirement and get back within 24 hours.\n\n📧 You can also reach us at hellospacexio@gmail.com\n📞 +91 96865 11132');
      
      toast.success('Your inquiry has been submitted successfully!');
      
      setTimeout(() => {
        addMessage('bot', 'Is there anything else I can help you with?', 
          ['New Project', 'Explore Services', 'Close Chat']);
      }, 2000);
      
      setConversationState('complete');
      
    } catch (error) {
      console.error('Lead submission error:', error);
      addMessage('bot', 'Something went wrong. Please try again or call us directly at +91 96865 11132.');
    }
  };

  const toggleChat = () => {
    if (!isOpen) {
      setIsOpen(true);
      if (messages.length === 0) {
        initializeChat();
      }
    } else {
      setIsOpen(false);
    }
  };

  const closeChat = () => {
    setIsOpen(false);
  };

  if (!isOpen) {
    return (
      <button
        onClick={toggleChat}
        className="fixed bottom-20 right-4 sm:bottom-6 sm:right-6 bg-gradient-to-tr from-orange-600 to-amber-500 hover:from-orange-500 hover:to-amber-400 text-white p-3.5 sm:p-4 rounded-full shadow-2xl transition-all duration-300 hover:scale-110 z-50 group cursor-pointer border border-orange-400/30"
        aria-label="Open Spacexio Assistant"
      >
        <MessageCircle className="h-6 w-6 sm:h-7 sm:w-7" />
        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold rounded-full h-5 w-5 flex items-center justify-center animate-pulse border-2 border-zinc-950">
          1
        </span>
      </button>
    );
  }

  return (
    <div className={`fixed bottom-20 right-4 sm:bottom-6 sm:right-6 w-96 max-w-[calc(100vw-2rem)] ${isMinimized ? 'h-14' : 'h-[580px] max-h-[80vh]'} bg-zinc-950 border border-zinc-800 rounded-3xl shadow-2xl flex flex-col z-50 transition-all duration-300 overflow-hidden text-zinc-100`}>
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-600 to-orange-700 text-white p-4 rounded-t-2xl flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
            <span className="text-orange-600 font-bold text-lg">S</span>
          </div>
          <div>
            <h3 className="font-bold text-sm">Spacexio Assistant</h3>
            <p className="text-xs text-orange-100">● Online</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsMinimized(!isMinimized)}
            className="hover:bg-white/20 p-1 rounded transition-colors"
          >
            <Minimize2 className="h-4 w-4" />
          </button>
          <button
            onClick={closeChat}
            className="hover:bg-white/20 p-1 rounded transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>

      {!isMinimized && (
        <>
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] ${msg.sender === 'user' ? 'bg-orange-600 text-white' : 'bg-white text-gray-900'} rounded-2xl p-3 shadow-sm`}>
                  <p className="text-sm whitespace-pre-line">{msg.text}</p>
                  {msg.buttons && msg.buttons.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-2">
                      {msg.buttons.map((btn, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleButtonClick(btn)}
                          className="bg-orange-50 hover:bg-orange-100 text-orange-700 px-4 py-2 rounded-lg text-xs font-semibold transition-colors border border-orange-200"
                        >
                          {btn}
                        </button>
                      ))}
                    </div>
                  )}
                  <p className="text-xs opacity-70 mt-1">{msg.timestamp}</p>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          {conversationState === 'leadCapture' || messages.some(m => m.showInput) ? (
            <form onSubmit={handleInputSubmit} className="p-4 bg-white border-t border-gray-200">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  placeholder="Type your email or phone..."
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500 text-sm"
                />
                <button
                  type="submit"
                  className="bg-orange-600 hover:bg-orange-700 text-white p-3 rounded-lg transition-colors"
                >
                  <Send className="h-5 w-5" />
                </button>
              </div>
            </form>
          ) : (
            <div className="p-4 bg-white border-t border-gray-200">
              <div className="flex gap-2 justify-center">
                <button
                  onClick={() => handleButtonClick('Get Estimate')}
                  className="flex-1 bg-orange-50 hover:bg-orange-100 text-orange-700 px-3 py-2 rounded-lg text-xs font-semibold transition-colors"
                >
                  💰 Estimate
                </button>
                <button
                  onClick={() => handleButtonClick('Start My Project')}
                  className="flex-1 bg-orange-50 hover:bg-orange-100 text-orange-700 px-3 py-2 rounded-lg text-xs font-semibold transition-colors"
                >
                  🏗️ Start
                </button>
                <button
                  onClick={() => handleButtonClick('Book Consultation')}
                  className="flex-1 bg-orange-50 hover:bg-orange-100 text-orange-700 px-3 py-2 rounded-lg text-xs font-semibold transition-colors"
                >
                  📞 Talk
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ChatBot;

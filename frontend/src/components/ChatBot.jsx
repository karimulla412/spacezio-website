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
    if (buttonText.includes('WhatsApp')) {
      const whatsappMsg = `Hi Spacexio team! I submitted a project inquiry via your website assistant. Please connect with me regarding architectural design and construction packages.`;
      const url = `https://wa.me/919686511132?text=${encodeURIComponent(whatsappMsg)}`;
      window.open(url, '_blank');
    } else if (buttonText.includes('Start') || buttonText.includes('Project')) {
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
    const text = userInput.trim();
    if (!text) return;

    addMessage('user', text);
    setUserInput('');

    if (conversationState === 'leadCapture') {
      await submitLead(text);
      return;
    }

    // Check if user submitted contact information at any stage
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[\d\s\+\-\(\)]{10,}$/;
    if (emailRegex.test(text) || phoneRegex.test(text)) {
      await submitLead(text);
      return;
    }

    // Conversational fallback responses for common queries
    const lower = text.toLowerCase();
    if (lower.includes('price') || lower.includes('cost') || lower.includes('rate') || lower.includes('estimate') || lower.includes('budget')) {
      addMessage('bot', 'Our construction packages in Visakhapatnam start from ₹1,850/sq.ft (Essential), ₹2,150/sq.ft (Premium), and ₹2,650/sq.ft (Luxury Turnkey) with complete material guarantees.\n\nWould you like an instant project estimate?', ['💰 Get Cost Estimate', '🏗️ Start My Project', '📞 Book Consultation']);
    } else if (lower.includes('service') || lower.includes('bim') || lower.includes('architect') || lower.includes('interior')) {
      addMessage('bot', 'We offer Architectural Design, BIM 3D Modeling, Structural Engineering, and Turnkey Home Construction.\n\nWhich service are you interested in?', ['Architectural Design', 'BIM Services', 'Execution', 'Interiors']);
    } else if (lower.includes('hi') || lower.includes('hello') || lower.includes('hey')) {
      addMessage('bot', 'Hello! Welcome to Spacexio. How can we help you plan your dream project today?', ['🏗️ Start My Project', '💰 Get Cost Estimate', '📞 Book Consultation']);
    } else {
      addMessage('bot', 'Thank you! To help you best, would you like to plan a project, get an instant cost estimate, or speak with our engineers?', ['🏗️ Start My Project', '💰 Get Cost Estimate', '📞 Book Consultation']);
    }
  };

  const submitLead = async (contact) => {
    const cleanedContact = (contact || '').trim();
    // Validate email or phone
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[\d\s\+\-\(\)]{10,}$/;
    
    if (!emailRegex.test(cleanedContact) && !phoneRegex.test(cleanedContact)) {
      addMessage('bot', 'Please provide a valid 10-digit mobile number or email address.', [], true);
      return;
    }

    const leadPayload = {
      ...leadData,
      contact: cleanedContact,
      source: 'chatbot',
      timestamp: new Date().toISOString()
    };

    // Resilient endpoint resolution: prefer relative /api/chatbot/lead in production
    const endpoint = (typeof window !== 'undefined' && window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1')
      ? '/api/chatbot/lead'
      : (API_URL ? `${API_URL}/api/chatbot/lead` : '/api/chatbot/lead');

    try {
      await axios.post(endpoint, leadPayload, {
        headers: { 'Content-Type': 'application/json' },
        timeout: 10000
      });

      addMessage('bot', 'Thank you! Our engineering team will review your requirement and get back within 24 hours.\n\n📧 hellospacexio@gmail.com\n📞 +91 96865 11132');
      toast.success('Your inquiry has been submitted successfully!');
      
      setTimeout(() => {
        addMessage('bot', 'You can also connect with our lead structural engineer directly on WhatsApp for instant drawings review:', 
          ['💬 Open WhatsApp Chat', '🏗️ New Project', 'Close Chat']);
      }, 1500);
      
      setConversationState('complete');
    } catch (primaryErr) {
      console.warn('Axios chatbot post failed, attempting raw fetch fallback:', primaryErr);
      try {
        const response = await fetch('/api/chatbot/lead', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(leadPayload)
        });
        if (response.ok) {
          addMessage('bot', 'Thank you! Our engineering team will review your requirement and get back within 24 hours.\n\n📧 hellospacexio@gmail.com\n📞 +91 96865 11132');
          toast.success('Your inquiry has been submitted successfully!');
          setTimeout(() => {
            addMessage('bot', 'You can also connect with our lead structural engineer directly on WhatsApp for instant drawings review:', 
              ['💬 Open WhatsApp Chat', '🏗️ New Project', 'Close Chat']);
          }, 1500);
          setConversationState('complete');
          return;
        }
      } catch (fallbackErr) {
        console.error('All chatbot lead submission attempts failed:', fallbackErr);
      }

      addMessage('bot', 'We noticed a brief network hiccup, but our team is on standby! You can also connect with us directly at:\n\n📞 +91 96865 11132\n📧 hellospacexio@gmail.com');
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
        className="fixed bottom-20 right-4 sm:bottom-6 sm:right-6 bg-gradient-to-tr from-[#F35A61] via-[#B85C8D] to-[#01B3D1] hover:brightness-110 text-white p-3.5 sm:p-4 rounded-full shadow-2xl transition-all duration-300 hover:scale-110 z-50 group cursor-pointer border border-white/30"
        aria-label="Open Spacexio Assistant"
      >
        <MessageCircle className="h-6 w-6 sm:h-7 sm:w-7" />
        <span className="absolute -top-1 -right-1 bg-[#F35A61] text-white text-[10px] font-bold rounded-full h-5 w-5 flex items-center justify-center animate-pulse border-2 border-white">
          1
        </span>
      </button>
    );
  }

  return (
    <div className={`fixed bottom-20 right-4 sm:bottom-6 sm:right-6 w-96 max-w-[calc(100vw-2rem)] ${isMinimized ? 'h-14' : 'h-[580px] max-h-[80vh]'} bg-white border border-slate-200 rounded-3xl shadow-2xl flex flex-col z-50 transition-all duration-300 overflow-hidden text-slate-900`}>
      {/* Header */}
      <div className="bg-gradient-to-r from-[#F35A61] via-[#B85C8D] to-[#01B3D1] text-white p-4 rounded-t-2xl flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center p-1.5 border border-white/30 shadow-inner overflow-hidden">
            <img src="/icon.png" alt="Spacexio" className="w-full h-full object-contain" width="40" height="40" />
          </div>
          <div>
            <h3 className="font-bold text-sm">Spacexio Assistant</h3>
            <p className="text-xs text-white/90">● Online</p>
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
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] ${msg.sender === 'user' ? 'bg-gradient-to-r from-[#F35A61] to-[#E04850] text-white' : 'bg-white text-slate-900 border border-slate-200'} rounded-2xl p-3 shadow-xs`}>
                  <p className="text-sm whitespace-pre-line">{msg.text}</p>
                  {msg.buttons && msg.buttons.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-2">
                      {msg.buttons.map((btn, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleButtonClick(btn)}
                          className="bg-[#FDF2F3] hover:bg-[#FEE8EA] text-[#F35A61] px-4 py-2 rounded-lg text-xs font-semibold transition-colors border border-[#FCA5A9]"
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
            <form onSubmit={handleInputSubmit} className="p-4 bg-white border-t border-slate-200">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  placeholder="Type your email or phone..."
                  className="flex-1 px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:border-[#F35A61] text-sm"
                />
                <button
                  type="submit"
                  className="bg-[#F35A61] hover:bg-[#E04850] text-white p-3 rounded-lg transition-colors"
                >
                  <Send className="h-5 w-5" />
                </button>
              </div>
            </form>
          ) : (
            <div className="p-4 bg-white border-t border-slate-200">
              <div className="flex gap-2 justify-center">
                <button
                  onClick={() => handleButtonClick('Get Estimate')}
                  className="flex-1 bg-[#FDF2F3] hover:bg-[#FEE8EA] text-[#F35A61] border border-[#FCA5A9] px-3 py-2 rounded-lg text-xs font-semibold transition-colors"
                >
                  💰 Estimate
                </button>
                <button
                  onClick={() => handleButtonClick('Start My Project')}
                  className="flex-1 bg-[#FDF2F3] hover:bg-[#FEE8EA] text-[#F35A61] border border-[#FCA5A9] px-3 py-2 rounded-lg text-xs font-semibold transition-colors"
                >
                  🏗️ Start
                </button>
                <button
                  onClick={() => handleButtonClick('Book Consultation')}
                  className="flex-1 bg-[#EFFBFC] hover:bg-[#E0F7FA] text-[#01B3D1] border border-[#99E7EF] px-3 py-2 rounded-lg text-xs font-semibold transition-colors"
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

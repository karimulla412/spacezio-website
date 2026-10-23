import React, { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';

const WhatsAppFloat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const whatsappNumber = "919686511132";

  const quickMessages = [
    {
      text: "I want to build a home",
      message: "Hi! I'm interested in building a home in Visakhapatnam. Can you share more details about your construction packages?"
    },
    {
      text: "Get cost estimate",
      message: "Hi! I would like to get a cost estimate for my home construction project in Vizag."
    },
    {
      text: "Book site visit",
      message: "Hi! I would like to book a free site visit for my plot in Visakhapatnam."
    },
    {
      text: "Interior design inquiry",
      message: "Hi! I'm interested in interior design services. Can you provide more information?"
    }
  ];

  const sendWhatsAppMessage = (message) => {
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
    setIsOpen(false);
  };

  return (
    <>
      {/* Quick Message Menu */}
      {isOpen && (
        <div className="fixed bottom-32 right-6 z-50 w-80 bg-gray-900 border border-gray-700 rounded-lg shadow-2xl animate-in slide-in-from-bottom-5">
          <div className="p-4 bg-gradient-to-r from-green-600 to-green-700 rounded-t-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                  <MessageCircle className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <p className="text-white font-semibold">Chat with us</p>
                  <p className="text-green-100 text-xs">Typically replies instantly</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white hover:text-gray-200 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>
          
          <div className="p-4">
            <p className="text-gray-400 text-sm mb-4">How can we help you today?</p>
            <div className="space-y-2">
              {quickMessages.map((item, index) => (
                <button
                  key={index}
                  onClick={() => sendWhatsAppMessage(item.message)}
                  className="w-full text-left p-3 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors text-sm text-white border border-gray-700"
                >
                  {item.text}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 w-16 h-16 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 hover:scale-110 group"
        aria-label="Chat on WhatsApp"
      >
        {isOpen ? (
          <X className="h-7 w-7 text-white" />
        ) : (
          <>
            <MessageCircle className="h-7 w-7 text-white" />
            {/* Notification Dot */}
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-white animate-pulse"></span>
          </>
        )}
      </button>

      {/* Tooltip */}
      {!isOpen && (
        <div className="fixed bottom-6 right-24 z-40 bg-gray-900 text-white px-4 py-2 rounded-lg shadow-lg text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
          Need help? Chat with us!
        </div>
      )}
    </>
  );
};

export default WhatsAppFloat;

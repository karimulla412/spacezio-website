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
        <div className="fixed bottom-36 left-4 sm:bottom-24 sm:left-6 z-50 w-80 bg-zinc-900 border border-zinc-700 rounded-2xl shadow-2xl animate-in slide-in-from-bottom-5 overflow-hidden">
          <div className="p-4 bg-gradient-to-r from-emerald-600 to-green-600 rounded-t-2xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md">
                  <MessageCircle className="h-6 w-6 text-emerald-600" />
                </div>
                <div>
                  <p className="text-white font-bold text-sm">WhatsApp Help Desk</p>
                  <p className="text-emerald-100 text-[11px] font-mono">Typically replies instantly</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white hover:text-zinc-200 transition-colors p-1"
                aria-label="Close WhatsApp menu"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>
          
          <div className="p-4 bg-zinc-950">
            <p className="text-zinc-400 text-xs mb-3 font-medium">How can our civil engineers help you?</p>
            <div className="space-y-2">
              {quickMessages.map((item, index) => (
                <button
                  key={index}
                  onClick={() => sendWhatsAppMessage(item.message)}
                  className="w-full text-left p-2.5 bg-zinc-900 hover:bg-zinc-800 rounded-xl transition-colors text-xs text-zinc-200 border border-zinc-800 hover:border-emerald-500/40 cursor-pointer"
                >
                  {item.text}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Floating Button on the LEFT */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-20 left-4 sm:bottom-6 sm:left-6 z-50 w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-tr from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 hover:scale-110 group cursor-pointer border border-emerald-400/30"
        aria-label="Chat on WhatsApp"
      >
        {isOpen ? (
          <X className="h-6 w-6 sm:h-7 sm:w-7 text-white" />
        ) : (
          <>
            <MessageCircle className="h-6 w-6 sm:h-7 sm:w-7 text-white" />
            {/* Notification Dot */}
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-400 rounded-full border-2 border-zinc-950 animate-pulse"></span>
          </>
        )}
      </button>

      {/* Tooltip on the LEFT */}
      {!isOpen && (
        <div className="hidden sm:block fixed bottom-6 left-24 z-40 bg-zinc-900 border border-zinc-800 text-white px-3.5 py-1.5 rounded-xl shadow-xl text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
          Chat on WhatsApp
        </div>
      )}
    </>
  );
};

export default WhatsAppFloat;

import React, { createContext, useContext, useState, useCallback } from 'react';

const InquiryContext = createContext();

export const InquiryProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [inquiryData, setInquiryData] = useState({
    title: 'Project Inquiry',
    category: 'General Inquiry',
    subtitle: 'Direct studio inquiry • Quick callback guaranteed',
    defaultMessage: '',
    defaultCity: 'Visakhapatnam',
    plotSize: '',
    details: null
  });

  const openInquiry = useCallback((data = {}) => {
    setInquiryData({
      title: data.title || data.subject || 'Project Inquiry',
      category: data.category || 'General Inquiry',
      subtitle: data.subtitle || 'Direct studio inquiry • Quick callback guaranteed',
      defaultMessage: data.defaultMessage || '',
      defaultCity: data.city || data.defaultCity || 'Visakhapatnam',
      plotSize: data.plotSize || '',
      details: data.details || null
    });
    setIsOpen(true);
  }, []);

  const closeInquiry = useCallback(() => {
    setIsOpen(false);
  }, []);

  return (
    <InquiryContext.Provider value={{ isOpen, inquiryData, openInquiry, closeInquiry }}>
      {children}
    </InquiryContext.Provider>
  );
};

export const useInquiry = () => {
  const context = useContext(InquiryContext);
  if (!context) {
    throw new Error('useInquiry must be used within an InquiryProvider');
  }
  return context;
};

import React from "react";
import "@/App.css";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { Toaster } from "./components/ui/sonner";
import { ContentProvider } from "./context/ContentContext";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ChatBot from "./components/ChatBot";
import WhatsAppFloat from "./components/WhatsAppFloat";
import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import WhyUs from "./pages/WhyUs";
import Industries from "./pages/Industries";
import Projects from "./pages/Projects";
import Process from "./pages/Process";
import Blog from "./pages/Blog";
import BlogArticle from "./pages/BlogArticle";
import Contact from "./pages/Contact";
import CostCalculator from "./pages/CostCalculator";
import SiteVisitBooking from "./pages/SiteVisitBooking";
import PackagesComparison from "./pages/PackagesComparison";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import Sitemap from "./pages/Sitemap";
import Admin from "./pages/Admin";

const AppContent = () => {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <>
      {!isAdminRoute && <Header />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/why-us" element={<WhyUs />} />
        <Route path="/home-types" element={<Industries />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/process" element={<Process />} />
        <Route path="/how-it-works" element={<Process />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/insights" element={<Blog />} />
        <Route path="/insights/:articleId" element={<BlogArticle />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/cost-calculator" element={<CostCalculator />} />
        <Route path="/site-visit" element={<SiteVisitBooking />} />
        <Route path="/packages" element={<PackagesComparison />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms-of-service" element={<TermsOfService />} />
        <Route path="/sitemap" element={<Sitemap />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
      {!isAdminRoute && (
        <>
          <Footer />
          <WhatsAppFloat />
          <ChatBot />
        </>
      )}
      <Toaster />
    </>
  );
};

function App() {
  return (
    <div className="App">
      <ContentProvider>
        <BrowserRouter>
          <AppContent />
        </BrowserRouter>
      </ContentProvider>
    </div>
  );
}

export default App;

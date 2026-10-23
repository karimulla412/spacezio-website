import React, { createContext, useContext, useState, useEffect } from 'react';
import { API_URL } from '../config/api';
import { 
  heroData as defaultHero,
  statsData as defaultStats,
  constructionPackagesData as defaultPackages,
  projectsData as defaultProjects,
  testimonialsData as defaultTestimonials,
  locationsData as defaultLocations
} from '../data/mock';

const ContentContext = createContext();

export const ContentProvider = ({ children }) => {
  const [content, setContent] = useState({
    heroData: defaultHero,
    statsData: defaultStats,
    constructionPackagesData: defaultPackages,
    projectsData: defaultProjects,
    testimonialsData: defaultTestimonials,
    locationsData: defaultLocations
  });

  const [loading, setLoading] = useState(true);

  const fetchContent = async () => {
    try {
      const res = await fetch(`${API_URL}/api/content`);
      if (res.ok) {
        const json = await res.json();
        setContent(prev => ({
          heroData: json.heroData || prev.heroData,
          statsData: json.statsData || prev.statsData,
          constructionPackagesData: json.constructionPackagesData || prev.constructionPackagesData,
          projectsData: json.projectsData || prev.projectsData,
          testimonialsData: json.testimonialsData || prev.testimonialsData,
          locationsData: json.locationsData || prev.locationsData
        }));
      }
    } catch (err) {
      console.warn('Could not fetch dynamic content, using defaults:', err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContent();
  }, []);

  return (
    <ContentContext.Provider value={{ content, refreshContent: fetchContent, loading }}>
      {children}
    </ContentContext.Provider>
  );
};

export const useContent = () => {
  const context = useContext(ContentContext);
  if (!context) {
    return {
      content: {
        heroData: defaultHero,
        statsData: defaultStats,
        constructionPackagesData: defaultPackages,
        projectsData: defaultProjects,
        testimonialsData: defaultTestimonials,
        locationsData: defaultLocations
      },
      refreshContent: () => {},
      loading: false
    };
  }
  return context;
};

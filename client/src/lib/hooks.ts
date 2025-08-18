import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';

export interface CardData {
  eventName: string;
  date: string;
  time: string;
  location: string;
  description: string;
  rsvpContact: string;
  backgroundColor: string;
}

export interface Template {
  id: number;
  name: string;
  category: string;
  thumbnailUrl: string;
  backgroundUrl: string;
}

export function useTemplates() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['/api/templates'],
  });

  const templates: Template[] = data?.templates || [];
  
  // Extract unique categories from templates
  const categoriesSet = new Set<string>();
  templates.forEach(template => categoriesSet.add(template.category));
  const categories = Array.from(categoriesSet);

  return {
    templates,
    categories,
    isLoading,
    error
  };
}

export function useMobileView() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    // Initial check
    checkIfMobile();
    
    // Add event listener
    window.addEventListener('resize', checkIfMobile);
    
    // Clean up
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  return isMobile;
}

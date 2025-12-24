import React from 'react';

export const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    
    const months = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    
    const day = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();
    
    const getOrdinalSuffix = (n: number): string => {
      if (n > 3 && n < 21) return 'th';
      switch (n % 10) {
        case 1: return 'st';
        case 2: return 'nd';
        case 3: return 'rd';
        default: return 'th';
      }
    };
    
    return `${month} ${day}${getOrdinalSuffix(day)}, ${year}`;
  };


  export const highlightKeywords = (text: string, query: string): React.ReactNode => {
    if (!query.trim()) return text;
    
    const keywords = query.trim().split(/\s+/).filter(k => k.length > 0);
    if (keywords.length === 0) return text;
    
    const pattern = new RegExp(`(${keywords.map(k => escapeRegExp(k)).join('|')})`, 'gi');
    
    const parts = text.split(pattern);
    
    return parts.map((part, index) => {
        const isMatch = keywords.some(keyword => 
            part.toLowerCase() === keyword.toLowerCase()
        );
        
        if (isMatch) {
            return React.createElement('mark', {
                key: index,
                style: {
                    backgroundColor: '#FFFF00',
                    padding: '0 2px',
                    borderRadius: '2px'
                }
            }, part);
        }
        return part;
    });
};

const escapeRegExp = (string: string): string => {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
};
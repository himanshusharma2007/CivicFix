exports.calculateSeverity = (description, title) => {
    const keywords = {
      high: ['urgent', 'emergency', 'severe', 'critical'],
      medium: ['problem', 'issue', 'broken', 'leak'],
    };
  
    const text = (title + ' ' + description).toLowerCase();
    if (keywords.high.some(keyword => text.includes(keyword))) return 'High';
    if (keywords.medium.some(keyword => text.includes(keyword))) return 'Medium';
    return 'Low';
  };
  
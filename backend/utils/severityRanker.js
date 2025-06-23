exports.calculateSeverity = (description, title) => {
    console.log('description', description)
    console.log('title', title)
    const keywords = {
      high: ['urgent', 'emergency', 'severe', 'leak','critical','garbage dump','fire', 'deadly', 'hazardous', 'life-threatening'],
      medium: ['problem', 'issue', 'broken',  'defect', 'faulty', 'malfunction'],
    };
  
    const text = (title + ' ' + description).toLowerCase();
    if (keywords.high.some(keyword => text.includes(keyword))) return 'High';
    if (keywords.medium.some(keyword => text.includes(keyword))) return 'Medium';
    return 'Low';
  };
  
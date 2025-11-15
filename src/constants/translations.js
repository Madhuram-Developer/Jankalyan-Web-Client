export const translations = {
  en: {
    // Navigation
    askQuestion: 'Ask Question',
    aboutUs: 'About Us',
    history: 'History',
    settings: 'Settings',
    
    // Settings Page
    language: 'Language',
    appLanguage: 'App Language',
    english: 'English',
    hindi: 'Hindi',
    display: 'Display',
    darkMode: 'Dark Mode',
    
    // Ask Doubt Page
    askYourQuestions: 'Ask Your Questions',
    fullName: 'Full Name',
    fullNamePlaceholder: 'E.g., Jane Doe',
    mobileNumber: 'Mobile Number',
    mobileNumberPlaceholder: 'E.g., +1 (555) 123-4567',
    doubtCategory: 'Doubt Category',
    generalInquiry: 'General Inquiry',
    career: 'Career',
    relationships: 'Relationships',
    finances: 'Finances',
    spirituality: 'Spirituality',
    writeYourQuestion: 'Write Your Question Here...',
    questionPlaceholder: "I'm feeling uncertain about my career path and would like some guidance...",
    submitQuestion: 'Submit Question',
    
    // History Page
    myDoubts: 'My Doubts',
    answered: 'Answered',
    pending: 'Pending',
  },
  hi: {
    // Navigation
    askQuestion: 'प्रश्न पूछें',
    aboutUs: 'हमारे बारे में',
    history: 'इतिहास',
    settings: 'सेटिंग्स',
    
    // Settings Page
    language: 'भाषा',
    appLanguage: 'ऐप की भाषा',
    english: 'अंग्रेज़ी',
    hindi: 'हिंदी',
    display: 'प्रदर्शन',
    darkMode: 'डार्क मोड',
    
    // Ask Doubt Page
    askYourQuestions: 'अपने प्रश्न पूछें',
    fullName: 'पूरा नाम',
    fullNamePlaceholder: 'उदाहरण, जेन डो',
    mobileNumber: 'मोबाइल नंबर',
    mobileNumberPlaceholder: 'उदाहरण, +91 98765 43210',
    doubtCategory: 'संदेह श्रेणी',
    generalInquiry: 'सामान्य पूछताछ',
    career: 'करियर',
    relationships: 'रिश्ते',
    finances: 'वित्त',
    spirituality: 'आध्यात्मिकता',
    writeYourQuestion: 'अपना प्रश्न यहां लिखें...',
    questionPlaceholder: 'मैं अपने करियर पथ के बारे में अनिश्चित महसूस कर रहा हूं और कुछ मार्गदर्शन चाहूंगा...',
    submitQuestion: 'प्रश्न सबमिट करें',
    
    // History Page
    myDoubts: 'मेरे संदेह',
    answered: 'उत्तर दिया गया',
    pending: 'लंबित',
  }
};

export const getTranslation = (language, key) => {
  return translations[language]?.[key] || translations.en[key] || key;
};

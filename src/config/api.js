// API Configuration
const isDevelopment = __DEV__ || process.env.NODE_ENV === 'development';

export const API_CONFIG = {
    BASE_URL: isDevelopment 
        ? 'http://localhost:8000/api' 
        : 'https://api.fixmymind.org/api',
    ENDPOINTS: {
        PRICING: '/pricing.json',
        SUBSCRIBE: '/subscribe',
        USER: '/me',
        VOICE_SESSIONS: '/voice-sessions',
        VOICE_MESSAGES: '/voice-messages',
        TESTS: '/tests'
    }
};

export const getApiUrl = (endpoint) => {
    return `${API_CONFIG.BASE_URL}${endpoint}`;
};

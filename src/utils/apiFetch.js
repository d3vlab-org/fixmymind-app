import { getSession } from './SupabaseService';

/**
 * Fetch API with authentication
 * @param {string} url - The URL to fetch
 * @param {Object} options - Fetch options
 * @returns {Promise} - Fetch response
 */
const apiFetch = async (url, options = {}) => {
  try {
    // Get session from Supabase
    const session = await getSession();
    
    // Check if session exists and has an access token
    if (!session || !session.access_token) {
      throw new Error('No authentication token available');
    }
    
    // Prepare headers with authentication token
    const headers = {
      'Authorization': `Bearer ${session.access_token}`,
      'Content-Type': 'application/json',
      ...(options.headers || {})
    };
    
    // Make the fetch request with authentication
    const response = await fetch(url, {
      ...options,
      headers
    });
    
    // Handle common error responses
    if (response.status === 401) {
      throw new Error('Unauthorized: Authentication failed');
    }
    
    if (!response.ok) {
      throw new Error(`API request failed with status: ${response.status}`);
    }
    
    // Return the response
    return response;
  } catch (error) {
    console.error('API fetch error:', error.message);
    throw error;
  }
};

export default apiFetch;
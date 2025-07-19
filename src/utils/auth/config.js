// Supabase configuration using environment variables
export const supabaseConfig = {
  url: process.env.EXPO_PUBLIC_SUPABASE_URL,
  key: process.env.EXPO_PUBLIC_SUPABASE_KEY,
};

// Validate that required environment variables are set
if (!supabaseConfig.url) {
  throw new Error('EXPO_PUBLIC_SUPABASE_URL environment variable is required');
}

if (!supabaseConfig.key) {
  throw new Error('EXPO_PUBLIC_SUPABASE_KEY environment variable is required');
}
export const API_URL = process.env.API_URL; // dopasuj do środowiska
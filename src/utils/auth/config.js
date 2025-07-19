// Supabase configuration using environment variables
export const supabaseConfig = {
  url: process.env.SUPABASE_URL,
  key: process.env.SUPABASE_KEY,
};

// Validate that required environment variables are set
if (!supabaseConfig.url) {
  throw new Error('SUPABASE_URL environment variable is required');
}

if (!supabaseConfig.key) {
  throw new Error('SUPABASE_KEY environment variable is required');
}
export const API_URL = process.env.API_URL; // dopasuj do środowiska
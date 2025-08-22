import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://wpoqhxrhcqehnwvfnffj.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Indwb3FoeHJoY3FlaG53dmZuZmZqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTAxNzk2NTgsImV4cCI6MjA2NTc1NTY1OH0.ysWlX8FNeqe0L0NXcLU2lE2WSNrdAIRAO9PHt7oRjk4';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://gwgimmnypwaazcajpdkf.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd3Z2ltbW55cHdhYXpjYWpwZGtmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQxMTM5MDEsImV4cCI6MjA1OTY4OTkwMX0.OD5WIL5Kn0H8gnP7ogsvr5UAw41xV_0xe8mC3XSx0tM";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);
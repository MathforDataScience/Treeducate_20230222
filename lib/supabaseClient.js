// import { createClient } from '@supabase/supabase-js'

// export const supabase = createClient('https://lcxxvvawjctlciiwliuo.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxjeHh2dmF3amN0bGNpaXdsaXVvIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzU2MzEwMTcsImV4cCI6MTk5MTIwNzAxN30.6jLN9tbP9_3XLeGmBPppz0YGg-ScHVb8xrc4O6PmCiQ')


import { createClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const supabaseCl = createClient(url, anonKey);




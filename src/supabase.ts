import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://brrochsoajpmpitamzkg.supabase.co';
const supabaseKey = 'sb_publishable_JBYLH2UXxv3wMEh1bo0NqQ_lG1vHAMW';

export const supabase = createClient(supabaseUrl, supabaseKey);
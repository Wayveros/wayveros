import 'server-only';
import { createClient } from '@supabase/supabase-js';

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const secretKey = process.env.SUPABASE_SECRET_KEY;

// Server-only client. This secret key bypasses RLS; never expose it to the browser.
export function createAdminClient() {
  if (!url || !secretKey) throw new Error('Supabase server environment is not configured.');
  return createClient(url, secretKey, {
    auth: { persistSession: false, autoRefreshToken: false }
  });
}

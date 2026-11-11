import { NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase-server';

// TODO SECURITY: replace this guard with verified Supabase Auth + admin-role lookup
// before exposing this endpoint publicly. It intentionally fails closed.
function isAuthorizedAdmin(request: Request) {
  const expected = process.env.INTERNAL_ADMIN_APPROVAL_TOKEN;
  const supplied = request.headers.get('x-wayveros-admin-token');
  return Boolean(expected && supplied && supplied === expected);
}

export async function POST(request: Request, context: { params: Promise<{id:string}> }) {
  if (!isAuthorizedAdmin(request)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const { id } = await context.params;
  const body = await request.json().catch(() => ({}));
  if (typeof body.itinerary !== 'string' || body.itinerary.trim().length < 20) {
    return NextResponse.json({ error: 'A reviewed itinerary is required.' }, { status: 400 });
  }
  try {
    const db = createAdminClient();
    const { data: tripExists, error: tripLookupError } = await db.from('trip_requests').select('id').eq('id', id).maybeSingle();
    if (tripLookupError) throw tripLookupError;
    if (!tripExists) return NextResponse.json({ error: 'Trip request not found.' }, { status: 404 });

    const { data, error } = await db.from('itineraries').insert({
      trip_request_id: id,
      content: body.itinerary,
      version: body.version ?? 1,
      status: 'approved',
      approved_at: new Date().toISOString()
    }).select('id,version,status,approved_at').single();
    if (error) throw error;
    const { error: updateError } = await db.from('trip_requests').update({ status: 'completed' }).eq('id', id);
    if (updateError) throw updateError;
    const { error: eventError } = await db.from('trip_status_events').insert({ trip_request_id: id, status: 'completed', note: 'Itinerary approved by admin.' });
    if (eventError) throw eventError;
    // TODO: trigger email delivery only after email provider and delivery logging are configured.
    return NextResponse.json({ itinerary: data, message: 'Approved. Email delivery is not configured.' });
  } catch (error) {
    console.error('Approval failed', error);
    return NextResponse.json({ error: 'Unable to approve itinerary.' }, { status: 500 });
  }
}

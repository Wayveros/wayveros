import { NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase-server';
import { TripRequestSchema } from '@/lib/contracts';

export async function POST(request: Request) {
  const parsed = TripRequestSchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ error: 'Invalid trip request', details: parsed.error.flatten() }, { status: 400 });

  try {
    const db = createAdminClient();
    const input = parsed.data;
    const { data: customer, error: customerError } = await db
      .from('customers')
      .upsert({ full_name: input.customerName, email: input.customerEmail.toLowerCase() }, { onConflict: 'email' })
      .select('id').single();
    if (customerError) throw customerError;

    const { data: trip, error } = await db.from('trip_requests').insert({
      customer_id: customer.id,
      package_name: input.packageName,
      destination: input.destination,
      start_date: input.startDate || null,
      end_date: input.endDate || null,
      travelers: input.travelers,
      budget: input.budget || null,
      preferences: input.preferences || null,
      status: 'processing'
    }).select('id,status,created_at').single();
    if (error) throw error;

    return NextResponse.json({ tripRequest: trip }, { status: 201 });
  } catch (error) {
    console.error('Trip request creation failed', error);
    return NextResponse.json({ error: 'Unable to create trip request.' }, { status: 500 });
  }
}

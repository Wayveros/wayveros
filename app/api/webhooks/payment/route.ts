import { NextResponse } from 'next/server';

// Payment webhooks must be verified with the selected provider's signature scheme.
// Do not accept a client-side "paid" flag as proof of payment.
export async function POST() {
  return NextResponse.json({
    error: 'Payment provider is not configured.',
    nextStep: 'Implement signature verification and idempotent event handling for the chosen provider.'
  }, { status: 501 });
}

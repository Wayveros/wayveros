import { z } from 'zod';

export const TripRequestSchema = z.object({
  packageName: z.enum([
    'The Getaway','The Signature Journey','The Grand Journey',
    'The Expedition','The Private Collection'
  ]),
  destination: z.string().min(2).max(240),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  travelers: z.number().int().min(1).max(30),
  budget: z.string().max(120).optional(),
  preferences: z.string().max(5000).optional(),
  customerName: z.string().min(2).max(120),
  customerEmail: z.string().email().max(254)
});

export type TripRequestInput = z.infer<typeof TripRequestSchema>;

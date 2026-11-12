import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'WAYVEROS | Thoughtful Journeys, Made Personal',
  description: 'Discover thoughtful travel experiences and start planning a journey shaped around you.',
  metadataBase: new URL(process.env.APP_BASE_URL || 'https://wayveros.com'),
  openGraph: {
    title: 'WAYVEROS | Thoughtful Journeys, Made Personal',
    description: 'Meaningful journeys, carefully brought together.',
    siteName: 'WAYVEROS',
    type: 'website',
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body style={{ margin: 0, fontFamily: 'Arial, sans-serif', background: '#f7f6f1', color: '#20352e' }}>
        {children}
      </body>
    </html>
  );
}

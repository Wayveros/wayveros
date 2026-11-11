import type { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'WAYVEROS Platform',
  description: 'Thoughtfully designed journeys.'
};
export default function RootLayout({ children }: Readonly<{children: React.ReactNode}>) {
  return <html lang="en"><body style={{margin:0,fontFamily:'Arial,sans-serif',background:'#f4f2eb',color:'#182923'}}>{children}</body></html>;
}

import { redirect } from 'next/navigation';

// Keep the public homepage pointed at the existing preview while the V6 refresh is prepared.
export default function Home() {
  redirect('/demo/index.html');
}

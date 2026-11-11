export default function Home() {
  return <main style={{maxWidth:850,margin:'10vh auto',padding:32}}>
    <p style={{letterSpacing:'.2em',color:'#a88b60'}}>WAYVEROS · PLATFORM FOUNDATION</p>
    <h1 style={{fontFamily:'Georgia,serif',fontSize:48,fontWeight:400}}>The journey starts here.</h1>
    <p style={{lineHeight:1.8,color:'#66736c'}}>Backend starter project for the WAYVEROS public website, customer portal and admin workspace.</p>
    <section style={{background:'#fffefa',padding:24,border:'1px solid #e6e1d6',lineHeight:1.8}}>
      <strong>Foundation status</strong>
      <ul><li>Database schema and access policies are provided in <code>supabase/schema.sql</code>.</li>
      <li>Trip request API validates incoming data.</li>
      <li>Admin approval route is protected by a server-side authorization placeholder.</li>
      <li>Payment, AI generation and email are provider integration points, not active services.</li></ul>
    </section>
  </main>;
}

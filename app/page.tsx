"use client";

import { FormEvent, useState } from "react";

const packages = [
  { name: "The Getaway", detail: "A refreshing escape, thoughtfully arranged.", price: "From $490" },
  { name: "The Signature Journey", detail: "A distinctive trip shaped around your style.", price: "From $890" },
  { name: "The Grand Journey", detail: "A richer itinerary with room to explore.", price: "From $1,490" },
  { name: "The Expedition", detail: "For curious travellers drawn off the usual path.", price: "From $1,990" },
  { name: "The Private Collection", detail: "A fully tailored private travel experience.", price: "By request" },
];

const destinations = [
  { place: "Bali, Indonesia", note: "Island rituals & slow living", image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1100&q=85" },
  { place: "Kyoto, Japan", note: "Culture, craft & quiet beauty", image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1100&q=85" },
  { place: "Amalfi Coast, Italy", note: "Coastal days & la dolce vita", image: "https://images.unsplash.com/photo-1533587851505-d119e13fa0d7?auto=format&fit=crop&w=1100&q=85" },
];

export default function Home() {
  const [form, setForm] = useState({ packageName: "The Signature Journey", destination: "", startDate: "", endDate: "", travelers: "2", budget: "", preferences: "", customerName: "", customerEmail: "" });
  const [status, setStatus] = useState("");
  const [sending, setSending] = useState(false);

  function change(field: string, value: string) {
    setForm(current => ({ ...current, [field]: value }));
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSending(true);
    setStatus("");
    try {
      const response = await fetch("/api/trips", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, travelers: Number(form.travelers) }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Please check your details and try again.");
      setStatus(`Thank you — your enquiry is received. Reference: ${result.tripRequest.id}`);
      setForm(current => ({ ...current, destination: "", startDate: "", endDate: "", budget: "", preferences: "", customerName: "", customerEmail: "" }));
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "Something went wrong. Please try again.");
    } finally {
      setSending(false);
    }
  }

  return (
    <main>
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Playfair+Display:wght@400;500;600&display=swap');
        *{box-sizing:border-box}html{scroll-behavior:smooth}body{margin:0;background:#f7f6f1;color:#20352e;font-family:'DM Sans',sans-serif}a{color:inherit;text-decoration:none}button,input,select,textarea{font:inherit}
        .serif{font-family:'Playfair Display',Georgia,serif}.wrap{width:min(1160px,calc(100% - 48px));margin:auto}.eyebrow{font-size:10px;letter-spacing:.24em;text-transform:uppercase;color:#a9895d;font-weight:700}.nav{height:82px;display:flex;align-items:center;justify-content:space-between}.brand{font-family:'Playfair Display',serif;font-size:27px;letter-spacing:.16em}.navlinks{display:flex;gap:28px;font-size:12px;color:#52645c}.navlinks a:hover{color:#ad8959}.button{display:inline-flex;align-items:center;justify-content:center;background:#29483c;color:#fff;padding:15px 23px;border:1px solid #29483c;font-size:11px;letter-spacing:.12em;text-transform:uppercase;cursor:pointer}.button:hover{background:#1d362d}.hero{min-height:650px;background:linear-gradient(90deg,rgba(17,37,31,.73),rgba(17,37,31,.1)),url('https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=2200&q=90') center 52%/cover;display:flex;align-items:center;color:white}.hero-inner{max-width:650px;padding:90px 0}.hero .eyebrow{color:#e0c49b}.hero h1{font-size:clamp(48px,7vw,82px);line-height:1.04;font-weight:400;margin:22px 0}.hero p{max-width:470px;line-height:1.9;color:#e8ece7;font-size:15px;margin-bottom:32px}.hero .button{background:#d6bd98;border-color:#d6bd98;color:#20352e}.section{padding:100px 0}.section-head{max-width:650px;margin-bottom:42px}.section h2{font-size:clamp(36px,4vw,52px);line-height:1.12;font-weight:400;margin:14px 0 18px}.muted{color:#68776f;line-height:1.85}.intro-grid{display:grid;grid-template-columns:1fr 1fr;gap:80px;align-items:center}.intro-image{width:100%;height:470px;object-fit:cover}.dest-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:20px}.dest-card{position:relative;min-height:420px;overflow:hidden;color:white}.dest-card img{position:absolute;width:100%;height:100%;object-fit:cover;transition:transform .6s}.dest-card:hover img{transform:scale(1.05)}.dest-card:after{content:'';position:absolute;inset:0;background:linear-gradient(0deg,rgba(13,29,24,.72),transparent 65%)}.dest-copy{position:absolute;z-index:1;bottom:28px;left:26px}.dest-copy h3{font:30px 'Playfair Display',serif;margin:8px 0}.dest-copy p{font-size:11px;letter-spacing:.08em;color:#e6e6dd}.steps{display:grid;grid-template-columns:repeat(3,1fr);gap:38px}.step-num{font:38px 'Playfair Display',serif;color:#b49568}.step h3{font:25px 'Playfair Display',serif;font-weight:400;margin:12px 0}.package-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:16px}.package{background:#fff;border:1px solid #e8e5dc;padding:28px;min-height:225px;display:flex;flex-direction:column}.package h3{font:24px 'Playfair Display',serif;font-weight:400;margin:14px 0 8px}.package p{font-size:13px;line-height:1.7;color:#68776f}.package span{margin-top:auto;color:#a9895d;font-size:11px;letter-spacing:.1em;text-transform:uppercase}.quote{background:#eae9e1;text-align:center;padding:90px 24px}.quote blockquote{max-width:760px;margin:20px auto;font:clamp(28px,4vw,43px)/1.3 'Playfair Display',serif}.form-wrap{display:grid;grid-template-columns:.8fr 1.2fr;gap:70px;align-items:start}.trip-form{background:#fff;padding:34px;border:1px solid #e8e5dc;display:grid;grid-template-columns:1fr 1fr;gap:16px}.field{display:flex;flex-direction:column;gap:8px}.field.full{grid-column:1/-1}.field label{font-size:10px;text-transform:uppercase;letter-spacing:.12em;color:#64736b}.field input,.field select,.field textarea{width:100%;border:1px solid #dedfd7;background:#fbfbf8;padding:13px;color:#20352e;outline-color:#a9895d}.field textarea{min-height:100px;resize:vertical}.trip-form .button{grid-column:1/-1}.status{grid-column:1/-1;font-size:13px;line-height:1.6;color:#42614f}.faq{border-top:1px solid #dedfd7;padding:22px 0}.faq h3{font:21px 'Playfair Display',serif;font-weight:400;margin:0 0 8px}.faq p{font-size:13px;line-height:1.8;color:#68776f;margin:0}.footer{background:#20382f;color:#f7f6f1;padding:55px 0}.footer-inner{display:flex;justify-content:space-between;gap:30px;align-items:center}.footer p{font-size:12px;color:#c2ccc4;line-height:1.8}
        @media(max-width:800px){.navlinks{display:none}.hero{min-height:590px}.intro-grid,.form-wrap{grid-template-columns:1fr;gap:35px}.dest-grid,.steps{grid-template-columns:1fr}.dest-card{min-height:380px}.package-grid{grid-template-columns:1fr 1fr}.section{padding:72px 0}.intro-image{height:340px}.footer-inner{align-items:flex-start;flex-direction:column}}
        @media(max-width:520px){.wrap{width:min(100% - 32px,1160px)}.nav{height:70px}.brand{font-size:23px}.hero-inner{padding:70px 0}.package-grid{grid-template-columns:1fr}.trip-form{padding:22px;grid-template-columns:1fr}.field.full,.trip-form .button,.status{grid-column:auto}.section{padding:60px 0}}
      `}</style>

      <header className="wrap nav">
        <a className="brand" href="#home">WAYVEROS</a>
        <nav className="navlinks"><a href="#about">Our approach</a><a href="#destinations">Destinations</a><a href="#journeys">Journeys</a><a href="#how">How it works</a><a href="#faq">FAQ</a></nav>
        <a className="button" href="#enquire">Plan your trip</a>
      </header>

      <section className="hero" id="home"><div className="wrap hero-inner">
        <div className="eyebrow">Travel, thoughtfully considered</div>
        <h1 className="serif">The world,<br/>at your own pace.</h1>
        <p>Meaningful journeys, carefully brought together. Discover a more considered way to see the places you have always dreamed of.</p>
        <a className="button" href="#enquire">Begin your journey&nbsp; ↗</a>
      </div></section>

      <section className="section" id="about"><div className="wrap intro-grid">
        <div><div className="eyebrow">A different way to travel</div><h2 className="serif">Go beyond the itinerary.</h2><p className="muted">At WAYVEROS, we believe the best journeys are not measured by how much ground you cover, but by how deeply you experience a place. We bring thoughtful planning, inspiring destinations and personal details together to make every trip feel like your own.</p><p className="muted">From the first idea to the final day, we make planning feel effortless — leaving you free to be there.</p><a className="button" href="#how">Discover our approach</a></div>
        <img className="intro-image" src="https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=1200&q=85" alt="Colourful coastal village overlooking the sea"/>
      </div></section>

      <section className="section" id="destinations" style={{background:"#eeeee7"}}><div className="wrap">
        <div className="section-head"><div className="eyebrow">Places worth the journey</div><h2 className="serif">Find your somewhere.</h2><p className="muted">A little inspiration for where your next story could begin.</p></div>
        <div className="dest-grid">{destinations.map(item=><a className="dest-card" href="#enquire" key={item.place}><img src={item.image} alt={item.place}/><div className="dest-copy"><p>{item.note}</p><h3>{item.place}</h3></div></a>)}</div>
      </div></section>

      <section className="section" id="how"><div className="wrap">
        <div className="section-head"><div className="eyebrow">Simple by design</div><h2 className="serif">Your journey, in three steps.</h2><p className="muted">A clear, personal process from the first thought to the trip itself.</p></div>
        <div className="steps"><div className="step"><div className="step-num">01</div><h3>Tell us what moves you</h3><p className="muted">Share where you want to go, when you want to travel and what matters most to you.</p></div><div className="step"><div className="step-num">02</div><h3>We shape the possibilities</h3><p className="muted">Choose the journey style that suits you. We will review your enquiry and follow up on the details.</p></div><div className="step"><div className="step-num">03</div><h3>Make it yours</h3><p className="muted">Refine the plans with our team and get ready to experience somewhere remarkable.</p></div></div>
      </div></section>

      <section className="section" id="journeys" style={{background:"#eeeee7"}}><div className="wrap">
        <div className="section-head"><div className="eyebrow">Ways to wander</div><h2 className="serif">Choose your kind of journey.</h2><p className="muted">Start with a travel style. We can shape the details around you.</p></div>
        <div className="package-grid">{packages.map((item,i)=><article className="package" key={item.name}><div className="eyebrow">Journey {String(i+1).padStart(2,"0")}</div><h3>{item.name}</h3><p>{item.detail}</p><span>{item.price}</span></article>)}</div>
      </div></section>

      <section className="quote"><div className="eyebrow">The WAYVEROS point of view</div><blockquote>“Travel is not just about where you go. It is about what stays with you.”</blockquote><p className="muted">Thoughtful journeys. Lasting impressions.</p></section>

      <section className="section" id="enquire"><div className="wrap form-wrap">
        <div><div className="eyebrow">Your next chapter</div><h2 className="serif">Let's start planning.</h2><p className="muted">Tell us a little about the trip you have in mind. Send an enquiry and our team can take it from there.</p><p className="muted">No fixed itinerary needed — a destination, an idea or simply a feeling is a lovely place to begin.</p></div>
        <form className="trip-form" onSubmit={submit}>
          <div className="field full"><label>Journey style</label><select value={form.packageName} onChange={e=>change("packageName",e.target.value)}>{packages.map(p=><option key={p.name}>{p.name}</option>)}</select></div>
          <div className="field full"><label>Where would you like to go?</label><input required minLength={2} value={form.destination} onChange={e=>change("destination",e.target.value)} placeholder="Destination or region"/></div>
          <div className="field"><label>Departure</label><input type="date" value={form.startDate} onChange={e=>change("startDate",e.target.value)}/></div>
          <div className="field"><label>Return</label><input type="date" value={form.endDate} onChange={e=>change("endDate",e.target.value)}/></div>
          <div className="field"><label>Travellers</label><input type="number" min="1" max="30" required value={form.travelers} onChange={e=>change("travelers",e.target.value)}/></div>
          <div className="field"><label>Approximate budget</label><input value={form.budget} onChange={e=>change("budget",e.target.value)} placeholder="e.g. $2,000 per person"/></div>
          <div className="field full"><label>Your name</label><input required minLength={2} value={form.customerName} onChange={e=>change("customerName",e.target.value)} placeholder="Full name"/></div>
          <div className="field full"><label>Email address</label><input required type="email" value={form.customerEmail} onChange={e=>change("customerEmail",e.target.value)} placeholder="you@example.com"/></div>
          <div className="field full"><label>What would make this trip special?</label><textarea value={form.preferences} onChange={e=>change("preferences",e.target.value)} placeholder="Interests, occasion, preferences or anything else we should know..."/></div>
          <button className="button" type="submit" disabled={sending}>{sending?"Sending enquiry…":"Send trip enquiry ↗"}</button>
          {status&&<p className="status" role="status">{status}</p>}
        </form>
      </div></section>

      <section className="section" id="faq" style={{background:"#eeeee7"}}><div className="wrap"><div className="section-head"><div className="eyebrow">A few helpful things</div><h2 className="serif">Good to know.</h2></div>
        <div className="faq"><h3>Is my enquiry a confirmed booking?</h3><p>No. Submitting the form sends a trip enquiry to our team. We will review the details and follow up with next steps.</p></div>
        <div className="faq"><h3>Can I customise a journey?</h3><p>Absolutely. The package styles are starting points, and you can share your interests and preferences in the enquiry form.</p></div>
        <div className="faq"><h3>Do I need exact travel dates?</h3><p>Not yet. If your dates are flexible, leave them blank and tell us more about your timing in the notes.</p></div>
      </div></section>

      <footer className="footer"><div className="wrap footer-inner"><div><div className="brand">WAYVEROS</div><p>Thoughtful travel. Made personal.</p></div><div><p>Have a journey in mind?</p><a href="#enquire" style={{color:"#e0c49b"}}>Start a conversation ↗</a></div><p>© {new Date().getFullYear()} WAYVEROS. All rights reserved.</p></div></footer>
    </main>
  );
}

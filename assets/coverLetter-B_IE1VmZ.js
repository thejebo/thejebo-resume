import"./modulepreload-polyfill-B5Qt9EMX.js";const x="/thejebo-resume/";let r;const B=e=>e,O=()=>{r&&(window.clearInterval(r),r=void 0)},V=()=>{const e=window.location.hash.replace(/^#\/?/,"").trim();return e?e.startsWith("l/")?e.slice(2):e:""},s=(e="")=>String(e).replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;"),l=(e,i,a="")=>{document.querySelector("#app").innerHTML=`
    <div class="cover-letter-message">
      <h1>${s(e)}</h1>
      <p>${s(i)}</p>
      ${a?`<pre>${s(a)}</pre>`:""}
    </div>
  `},W=e=>{var g,v,y,k,f,w,L,b,A,S;const i=((g=e.meta)==null?void 0:g.role)||"Hakemuskirje",a=((v=e.meta)==null?void 0:v.roleLabel)||"",t=((y=e.meta)==null?void 0:y.company)||"Yritys",o=((k=e.meta)==null?void 0:k.sourceUrl)||"",p=((f=e.meta)==null?void 0:f.positionId)||"",j=((w=e.recipient)==null?void 0:w.name)||"Rekrytointitiimi",h=((L=e.recipient)==null?void 0:L.team)||"",M=((b=e.recipient)==null?void 0:b.company)||t,d=((A=e.recipient)==null?void 0:A.location)||"",m="Jere Borgelin",D="Senior Full-stack Web Developer",E="Kreivinaukio 1 Turku, Finland",H="jere.borgelin@gmail.com",R="+358 44 324 8844",F=n=>{const c=n?new Date(n):new Date,Y=String(c.getDate()).padStart(2,"0"),_=String(c.getMonth()+1).padStart(2,"0"),C=c.getFullYear();return`${Y}.${_}.${C}`},u=((S=e.meta)==null?void 0:S.createdAt)||new Date().toISOString().slice(0,10),I=F(u),N=Array.isArray(e.body)?e.body:[],$=Array.isArray(e.highlights)?e.highlights:[],P=N.map(n=>`<p>${s(n)}</p>`).join(""),U=$.map(n=>`<li>${s(n)}</li>`).join(""),q=o?`<a class="job-link" href="${s(o)}" target="_blank" rel="noreferrer"><i class="fa-solid fa-arrow-up-right-from-square"></i><span>Työpaikkailmoitus</span></a>`:"";document.querySelector("#app").innerHTML=`
    <div class="cover-letter-page">
      <aside class="cover-letter-aside">
        <div class="contact-section">
          <h3>Yhteystiedot</h3>
          ${`<div class="contact-item"><i class="fa-solid fa-phone"></i> <span>${s(R)}</span></div>`}
          ${`<div class="contact-item"><i class="fa-solid fa-envelope"></i> <span>${s(H)}</span></div>`}
          ${`<div class="contact-item"><i class="fa-solid fa-location-dot"></i> <span>${s(E)}</span></div>`}
        </div>

        <div class="recipient-section">
          <h3>Vastaanottaja</h3>
          <div class="recipient-details">
            ${`<p>${s(j)}</p>`}
            ${h?`<p>${s(h)}</p>`:""}
            ${`<p>${s(M)}</p>`}
            ${d?`<p>${s(d)}</p>`:""}
          </div>
        </div>

        <div class="date-section">
          <h3>Päivämäärä</h3>
          <time dateTime="${s(u)}">${s(I)}</time>
        </div>
      </aside>

      <main class="cover-letter-main">
        <header class="main-header">
          <h1>${s(m)}</h1>
          <h2>${s(D)}</h2>
        </header>

        <div class="letter-header">
          ${a?`<p class="role-label">${s(a)}</p>`:""}
          <h3>${s(i)}${p?` <small class="position-id">(${s(p)})</small>`:""}</h3>
          <p class="company">${s(t)}</p>
          ${q}
        </div>

        <div class="letter-body">
          <section class="letter-section">
            ${e.greeting?`<p class="greeting">${s(e.greeting)}</p>`:""}
            ${e.opening?`<p class="opening">${s(e.opening)}</p>`:""}
          </section>
          
          <section class="letter-section">
            ${P}
          </section>

          ${$.length?`
          <section class="letter-section highlights-section">
            <h4>Miksi sopisin rooliin</h4>
            <ul>${U}</ul>
          </section>`:""}

          <section class="letter-section">
            ${e.closing?`<p class="closing">${s(e.closing)}</p>`:""}
          </section>

          <div class="signature">
            <p class="signature-text">${s(e.signature||m)}</p>
          </div>
        </div>
      </main>
    </div>
  `},T=async()=>{O();const e=V();if(!e){l("Yksityiset hakemuskirjeet","Anna slug URL-ankkurissa avataksesi tietyn luonnoksen.","Esimerkki: /cover-letter.html#/l/abc123xyz");return}const i=`${e}.json`,a=`${x}letters.local/${i}`;try{const t=await fetch(B(a),{cache:"no-store"});if(!t.ok){if(t.status===404)l("Luonnosta ei löytynyt","Tälle slugille ei ole paikallista luonnosta.",`Tiedosto: letters.local/${i}`);else throw new Error(`HTTP ${t.status} while fetching ${i}`);return}const o=await t.json();W(o)}catch(t){l("Luonnoksen lataus epäonnistui","Määritettyä luonnostiedostoa ei voitu ladata.",String(t))}};T();window.addEventListener("hashchange",T);

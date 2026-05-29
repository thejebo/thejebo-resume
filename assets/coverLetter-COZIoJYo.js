import"./modulepreload-polyfill-B5Qt9EMX.js";const C="/thejebo-resume/";let r;const U=e=>e,_=()=>{r&&(window.clearInterval(r),r=void 0)},x=()=>{const e=window.location.hash.replace(/^#\/?/,"").trim();return e?e.startsWith("l/")?e.slice(2):e:""},t=(e="")=>String(e).replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;"),l=(e,i,n="")=>{document.querySelector("#app").innerHTML=`
    <div class="cover-letter-message">
      <h1>${t(e)}</h1>
      <p>${t(i)}</p>
      ${n?`<pre>${t(n)}</pre>`:""}
    </div>
  `},B=e=>{var $,g,v,y,k,f,w,A,L;const i=(($=e.meta)==null?void 0:$.role)||"Hakemuskirje",n=((g=e.meta)==null?void 0:g.roleLabel)||"Tehtävänimike",s=((v=e.meta)==null?void 0:v.company)||"Yritys",o=((y=e.meta)==null?void 0:y.positionId)||"",T=((k=e.recipient)==null?void 0:k.name)||"Rekrytointitiimi",p=((f=e.recipient)==null?void 0:f.team)||"",b=((w=e.recipient)==null?void 0:w.company)||s,h=((A=e.recipient)==null?void 0:A.location)||"",d="Jere Borgelin",j="Senior Full-stack Web Developer",M="Kreivinaukio 1 D 292 Turku, Finland",D="jere.borgelin@gmail.com",E="+358 44 324 8844",H=a=>{const c=a?new Date(a):new Date,P=String(c.getDate()).padStart(2,"0"),Y=String(c.getMonth()+1).padStart(2,"0"),q=c.getFullYear();return`${P}.${Y}.${q}`},m=((L=e.meta)==null?void 0:L.createdAt)||new Date().toISOString().slice(0,10),R=H(m),F=Array.isArray(e.body)?e.body:[],u=Array.isArray(e.highlights)?e.highlights:[],I=F.map(a=>`<p>${t(a)}</p>`).join(""),N=u.map(a=>`<li>${t(a)}</li>`).join("");document.querySelector("#app").innerHTML=`
    <div class="cover-letter-page">
      <aside class="cover-letter-aside">
        <div class="contact-section">
          <h3>Yhteystiedot</h3>
          ${`<div class="contact-item"><i class="fa-solid fa-phone"></i> <span>${t(E)}</span></div>`}
          ${`<div class="contact-item"><i class="fa-solid fa-envelope"></i> <span>${t(D)}</span></div>`}
          ${`<div class="contact-item"><i class="fa-solid fa-location-dot"></i> <span>${t(M)}</span></div>`}
        </div>

        <div class="recipient-section">
          <h3>Vastaanottaja</h3>
          <div class="recipient-details">
            ${`<p>${t(T)}</p>`}
            ${p?`<p>${t(p)}</p>`:""}
            ${`<p>${t(b)}</p>`}
            ${h?`<p>${t(h)}</p>`:""}
          </div>
        </div>

        <div class="date-section">
          <h3>Päivämäärä</h3>
          <time dateTime="${t(m)}">${t(R)}</time>
        </div>
      </aside>

      <main class="cover-letter-main">
        <header class="main-header">
          <h1>${t(d)}</h1>
          <h2>${t(j)}</h2>
        </header>

        <div class="letter-header">
          ${`<p class="role-label">${t(n)}</p>`}
          <h3>${t(i)}${o?` <small class="position-id">(${t(o)})</small>`:""}</h3>
          <p class="company">${t(s)}</p>
        </div>

        <div class="letter-body">
          <section class="letter-section">
            ${e.greeting?`<p class="greeting">${t(e.greeting)}</p>`:""}
            ${e.opening?`<p class="opening">${t(e.opening)}</p>`:""}
          </section>
          
          <section class="letter-section">
            ${I}
          </section>

          ${u.length?`
          <section class="letter-section highlights-section">
            <h4>Miksi sopisin rooliin</h4>
            <ul>${N}</ul>
          </section>`:""}

          <section class="letter-section">
            ${e.closing?`<p class="closing">${t(e.closing)}</p>`:""}
          </section>

          <div class="signature">
            <p class="signature-text">${t(e.signature||d)}</p>
          </div>
        </div>
      </main>
    </div>
  `},S=async()=>{_();const e=x();if(!e){l("Yksityiset hakemuskirjeet","Anna slug URL-ankkurissa avataksesi tietyn luonnoksen.","Esimerkki: /cover-letter.html#/l/abc123xyz");return}const i=`${e}.json`,n=`${C}letters.local/${i}`;try{const s=await fetch(U(n),{cache:"no-store"});if(!s.ok){if(s.status===404)l("Luonnosta ei löytynyt","Tälle slugille ei ole paikallista luonnosta.",`Tiedosto: letters.local/${i}`);else throw new Error(`HTTP ${s.status} while fetching ${i}`);return}const o=await s.json();B(o)}catch(s){l("Luonnoksen lataus epäonnistui","Määritettyä luonnostiedostoa ei voitu ladata.",String(s))}};S();window.addEventListener("hashchange",S);

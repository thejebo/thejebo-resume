import{n as e,t}from"./translations-D11a9JY7.js";var n=`/thejebo-resume/`,r=`resume-language`,i=document.querySelector(`#app`);if(!i)throw Error(`Missing #app element`);var a,o=l(),s=null;function c(e){return t.includes(e)}function l(){try{let e=localStorage.getItem(r);if(e&&c(e))return e}catch{}return`fi`}function u(e){try{localStorage.setItem(r,e)}catch{}}function d(t){return c(t)?e[t]:e.fi}var f=e=>e,p=()=>{a&&=(window.clearInterval(a),void 0)},m=()=>{let e=window.location.hash.replace(/^#\/?/,``).trim();return e?e.startsWith(`l/`)?e.slice(2):e:``},h=(e=``)=>String(e).replaceAll(`&`,`&amp;`).replaceAll(`<`,`&lt;`).replaceAll(`>`,`&gt;`).replaceAll(`"`,`&quot;`).replaceAll(`'`,`&#39;`),g=(e,t,n=``)=>{let r=d(o);i.innerHTML=`
    <div class="cover-letter-message">
      <div class="actions language-switch" role="group" aria-label="${r.header.toggleLabel}">
        <span class="language-switch-label">${r.header.toggleLabel}</span>
        <button type="button" class="language-btn ${o===`fi`?`is-active`:``}" data-lang="fi" aria-pressed="${o===`fi`}">FI</button>
        <button type="button" class="language-btn ${o===`en`?`is-active`:``}" data-lang="en" aria-pressed="${o===`en`}">EN</button>
      </div>
      <h1>${h(e)}</h1>
      <p>${h(t)}</p>
      ${n?`<pre>${h(n)}</pre>`:``}
    </div>
  `,y()};function _(e){return{name:`Jere Borgelin`,title:`Senior Full-Stack Web Developer`,location:`Kreivinaukio 1 D 292 Turku, Finland`,email:`jere.borgelin@gmail.com`,phone:`+358 44 324 8844`}}var v=e=>{let t=d(o),n=_(e),r=e=>{let n=e?new Date(e):new Date;return new Intl.DateTimeFormat(t.dateLocale,{day:`2-digit`,month:`2-digit`,year:`numeric`}).format(n)},a=new Date().toISOString().slice(0,10),s=r(),c=Array.isArray(e.body)?e.body:[],l=Array.isArray(e.highlights)?e.highlights:[],u=c.map(e=>`<p>${h(e)}</p>`).join(``),f=l.map(e=>`<li>${h(e)}</li>`).join(``);i.innerHTML=`
    <div class="cover-letter-page">
      <main class="cover-letter-main">
        <header>
          <div>
            <h1>${h(n.name)}</h1>
            <h2>${h(n.title)}</h2>
          </div>

          <div class="contact-section">
            ${n.phone?`<span>${h(n.phone)}</span>`:``}
            <span>${h(n.email)}</span>
            ${n.location?`<span>${h(n.location)}</span>`:``}
          </div>

          <div class="date-section">
            <time dateTime="${h(a)}">${h(s)}</time>
          </div>

          <div class="actions language-switch" role="group" aria-label="${t.header.toggleLabel}">
            <span class="language-switch-label">${t.header.toggleLabel}</span>
            <button type="button" class="language-btn ${o===`fi`?`is-active`:``}" data-lang="fi" aria-pressed="${o===`fi`}">FI</button>
            <button type="button" class="language-btn ${o===`en`?`is-active`:``}" data-lang="en" aria-pressed="${o===`en`}">EN</button>
          </div>
        </header>

        <div class="letter-body">
          <section class="letter-section">
            ${e.greeting?`<p class="greeting">${h(e.greeting)}</p>`:``}
            ${e.opening?`<p class="opening">${h(e.opening)}</p>`:``}
          </section>

          <section class="letter-section">
            ${u}
          </section>

          ${l.length?`
          <section class="letter-section highlights-section">
            <h4>${t.highlightsTitle}</h4>
            <ul>${f}</ul>
          </section>`:``}

          <section class="letter-section">
            ${e.closing?`<p class="closing">${h(e.closing)}</p>`:``}
          </section>

          <div class="signature">
            <p class="signature-text">${h(e.signature||n.name)}</p>
          </div>
        </div>
      </main>
    </div>
  `,y()},y=()=>{i.querySelectorAll(`.language-btn`).forEach(e=>{e.addEventListener(`click`,()=>{let t=e.dataset.lang;t&&t!==o&&c(t)&&(o=t,u(t),s?v(s):b())})})},b=async()=>{p();let e=m(),t=d(o);if(!e){g(t.noSlugTitle,t.noSlugBody,t.noSlugDetail);return}let r=`${e}.json`,i=`${n}letters.local/${r}`;try{let e=await fetch(f(i),{cache:`no-store`});if(!e.ok){if(e.status===404)g(t.notFoundTitle,t.notFoundBody,`${t.notFoundDetailPrefix}${r}`);else throw Error(`HTTP ${e.status} while fetching ${r}`);return}let n=await e.json();s=n,v(n)}catch(e){g(t.loadErrorTitle,t.loadErrorBody,String(e))}};b(),window.addEventListener(`hashchange`,()=>{s=null,b()});
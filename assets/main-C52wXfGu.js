import{r as e,t}from"./translations-D11a9JY7.js";var n=`resume-language`;function r(){let e=document.querySelector(`#app`);if(!e)throw Error(`Missing #app element`);return e}var i=r();function a(e){return t.includes(e)}function o(){try{let e=localStorage.getItem(n);if(e&&a(e))return e}catch{}return`fi`}function s(e){try{localStorage.setItem(n,e)}catch{}}function c(e,t){let n=document.querySelector(e);n&&n.setAttribute(`content`,t)}function l(e,t){document.documentElement.lang=e,document.title=t.meta.title,c(`meta[name='description']`,t.meta.description),c(`meta[property='og:title']`,t.meta.ogTitle),c(`meta[property='og:description']`,t.meta.description),c(`meta[property='og:locale']`,t.locale),c(`meta[name='twitter:title']`,t.meta.twitterTitle),c(`meta[name='twitter:description']`,t.meta.description)}function u(e){return!e.toDateTime||!e.toLabel?`
      <div class="date-range">
        <time dateTime="${e.fromDateTime}">${e.fromLabel}</time>
      </div>
    `:`
    <div class="date-range">
      <time dateTime="${e.fromDateTime}">${e.fromLabel}</time>
      <span class="mobile-separator">-</span>
      <time dateTime="${e.toDateTime}">${e.toLabel}</time>
    </div>
  `}function d(e){return e.map(e=>`
      <li>
        <div class="details">
          <h4>${e.company}</h4>
          ${u(e)}
        </div>
        <div class="job-description">
          <span>${e.role}</span>
          <ul>
            ${e.bullets.map(e=>`<li>${e}</li>`).join(``)}
          </ul>
        </div>
      </li>
    `).join(``)}function f(e){return e.map(e=>`
      <li>
        <div class="details">
          <h4>${e.institution}</h4>
          <div class="date-range">
            <time dateTime="${e.dateTime}">${e.dateLabel}</time>
          </div>
        </div>
        <div class="job-description">
          <span>${e.degree}</span>
        </div>
      </li>
    `).join(``)}function p(e){return e.map(e=>`
      <div>
        <h4><i class="${e.icon}" aria-hidden="true"></i> ${e.title}</h4>
        <ul>
          ${e.items.map(e=>`<li>${e}</li>`).join(``)}
        </ul>
      </div>
    `).join(``)}function m(t,n={}){let r=e[t],{restoreFocusSelector:o,statusMessage:s}=n;if(i.innerHTML=`
  <a class="skip-link" href="#main-content">${r.a11y.skipToContent}</a>
  <div id="a11y-status" class="sr-only" aria-live="polite" aria-atomic="true"></div>
  <main id="main-content" tabindex="-1">
    <header>
      <div class="row">
        <h1>Jere Borgelin</h1>
        <div class="actions language-switch" role="group" aria-label="${r.header.toggleLabel}">
          <span class="language-switch-label">${r.header.toggleLabel}</span>
          <button type="button" class="language-btn ${t===`fi`?`is-active`:``}" data-lang="fi" aria-pressed="${t===`fi`}">FI</button>
          <button type="button" class="language-btn ${t===`en`?`is-active`:``}" data-lang="en" aria-pressed="${t===`en`}">EN</button>
        </div>
      </div>
      <h2>Senior Full-Stack Web Developer</h2>
    </header>
    <section>
      <p>${r.sections.summary}</p>
    </section>

    <section>
      <h3>${r.sections.workExperienceTitle}</h3>
      <ol>
        ${d(r.workExperience)}
      </ol>
    </section>
    <section class="education">
      <h3>${r.sections.educationTitle}</h3>
      <ol>
        ${f(r.education)}
      </ol>
    </section>
  </main>

  <aside>
    <h3>${r.sections.skillsetTitle}</h3>
    <div class="sets">
      ${p(r.skills)}
    </div>
    <div class="contact-section">
      <h3>${r.sections.contactTitle}</h3>
      <div class="contact-info">
        <span><i class="fa-solid fa-house-laptop" aria-hidden="true"></i> ${r.contact.location}</span>
        <a target="_blank" rel="noopener noreferrer" href="https://www.linkedin.com/in/jere-borgelin-0738b8200"><i class="fa-brands fa-linkedin" aria-hidden="true"></i> ${r.contact.linkedinLabel} <span class="sr-only"> (${r.a11y.opensInNewTab})</span> <i class="fa-solid fa-arrow-up-right-from-square" aria-hidden="true"></i></a>
        <a target="_blank" rel="noopener noreferrer" href="https://github.com/thejebo"><i class="fa-brands fa-github" aria-hidden="true"></i> ${r.contact.githubLabel} <span class="sr-only"> (${r.a11y.opensInNewTab})</span> <i class="fa-solid fa-arrow-up-right-from-square" aria-hidden="true"></i></a>
      </div>
    </div>
  </aside>
`,i.querySelector(`.skip-link`)?.addEventListener(`click`,()=>{i.querySelector(`#main-content`)?.focus()}),i.querySelectorAll(`.language-btn`).forEach(e=>{e.addEventListener(`click`,()=>{let n=e.dataset.lang;n&&n!==t&&a(n)&&g(n,{restoreFocusSelector:`.language-btn[data-lang="${n}"]`,announceChange:!0})})}),l(t,r),s){let e=i.querySelector(`#a11y-status`);e&&(e.textContent=``,requestAnimationFrame(()=>{e.textContent=s}))}o&&i.querySelector(o)?.focus()}function h(t){let n=e[t],r=n.a11y.languageNames?.[t]||t.toUpperCase();return n.a11y.languageChanged.replace(`{language}`,r)}function g(e,t={}){if(!a(e))return;s(e);let n=t.announceChange?h(e):null;m(e,{restoreFocusSelector:t.restoreFocusSelector,statusMessage:n})}m(o());
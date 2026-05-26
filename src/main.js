import "./main.scss";
import {
  DEFAULT_LOCALE,
  resumeTranslations,
  SUPPORTED_LOCALES,
} from "./translations";

const LANGUAGE_STORAGE_KEY = "resume-language";
const appElement = document.querySelector("#app");

function isSupportedLocale(locale) {
  return SUPPORTED_LOCALES.includes(locale);
}

function getInitialLocale() {
  try {
    const storedLocale = localStorage.getItem(LANGUAGE_STORAGE_KEY);
    if (storedLocale && isSupportedLocale(storedLocale)) {
      return storedLocale;
    }
  } catch {
    // localStorage may be unavailable in strict privacy contexts.
  }

  return DEFAULT_LOCALE;
}

function persistLocale(locale) {
  try {
    localStorage.setItem(LANGUAGE_STORAGE_KEY, locale);
  } catch {
    // localStorage may be unavailable in strict privacy contexts.
  }
}

function setMetaContent(selector, content) {
  const metaElement = document.querySelector(selector);
  if (metaElement) {
    metaElement.setAttribute("content", content);
  }
}

function applyMetadata(locale, copy) {
  document.documentElement.lang = locale;
  document.title = copy.meta.title;
  setMetaContent("meta[name='description']", copy.meta.description);
  setMetaContent("meta[property='og:title']", copy.meta.ogTitle);
  setMetaContent("meta[property='og:description']", copy.meta.description);
  setMetaContent("meta[property='og:locale']", copy.locale);
  setMetaContent("meta[name='twitter:title']", copy.meta.twitterTitle);
  setMetaContent("meta[name='twitter:description']", copy.meta.description);
}

function renderDateRange(item) {
  if (!item.toDateTime || !item.toLabel) {
    return `
      <div class="date-range">
        <time dateTime="${item.fromDateTime}">${item.fromLabel}</time>
      </div>
    `;
  }

  return `
    <div class="date-range">
      <time dateTime="${item.fromDateTime}">${item.fromLabel}</time>
      <span class="mobile-separator">-</span>
      <time dateTime="${item.toDateTime}">${item.toLabel}</time>
    </div>
  `;
}

function renderWorkExperience(items) {
  return items
    .map(
      (item) => `
      <li>
        <div class="details">
          <h4>${item.company}</h4>
          ${renderDateRange(item)}
        </div>
        <div class="job-description">
          <span>${item.role}</span>
          <ul>
            ${item.bullets.map((bullet) => `<li>${bullet}</li>`).join("")}
          </ul>
        </div>
      </li>
    `,
    )
    .join("");
}

function renderEducation(items) {
  return items
    .map(
      (item) => `
      <li>
        <div class="details">
          <h4>${item.institution}</h4>
          <div class="date-range">
            <time dateTime="${item.dateTime}">${item.dateLabel}</time>
          </div>
        </div>
        <div class="job-description">
          <span>${item.degree}</span>
        </div>
      </li>
    `,
    )
    .join("");
}

function renderSkills(items) {
  return items
    .map(
      (item) => `
      <div>
        <h4><i class="${item.icon}"></i> ${item.title}</h4>
        <ul>
          ${item.items.map((skill) => `<li>${skill}</li>`).join("")}
        </ul>
      </div>
    `,
    )
    .join("");
}

function renderResume(locale) {
  const copy = resumeTranslations[locale] || resumeTranslations[DEFAULT_LOCALE];

  appElement.innerHTML = `
  <main>
    <header>
      <div class="row">
        <h1>${copy.header.name}</h1>
        <div class="actions language-switch" role="group" aria-label="${copy.header.toggleLabel}">
          <span class="language-switch-label">${copy.header.toggleLabel}</span>
          <button type="button" class="language-btn ${locale === "fi" ? "is-active" : ""}" data-lang="fi" aria-pressed="${locale === "fi"}">FI</button>
          <button type="button" class="language-btn ${locale === "en" ? "is-active" : ""}" data-lang="en" aria-pressed="${locale === "en"}">EN</button>
        </div>
      </div>
      <h2>${copy.header.role}</h2>
    </header>
    <section>
      <h3>${copy.sections.summaryTitle}</h3>
      <p>${copy.sections.summary}</p>
    </section>

    <section>
      <h3>${copy.sections.workExperienceTitle}</h3>
      <ol>
        ${renderWorkExperience(copy.workExperience)}
      </ol>
    </section>
    <section class="education">
      <h3>${copy.sections.educationTitle}</h3>
      <ol>
        ${renderEducation(copy.education)}
      </ol>
    </section>
  </main>

  <aside>
    <h3>${copy.sections.skillsetTitle}</h3>
    <div class="sets">
      ${renderSkills(copy.skills)}
    </div>
    <div class="contact-section">
      <h3>${copy.sections.contactTitle}</h3>
      <div class="contact-info">
        <span><i class="fa-solid fa-house-laptop"></i> ${copy.contact.location}</span>
        <a target="_blank" rel="noopener noreferrer" href="https://www.linkedin.com/in/jere-borgelin-0738b8200"><i class="fa-brands fa-linkedin"></i> ${copy.contact.linkedinLabel} <i class="fa-solid fa-arrow-up-right-from-square"></i></a>
        <a target="_blank" rel="noopener noreferrer" href="https://github.com/thejebo"><i class="fa-brands fa-github"></i> ${copy.contact.githubLabel} <i class="fa-solid fa-arrow-up-right-from-square"></i></a>
      </div>
    </div>
  </aside>
`;

  appElement.querySelectorAll(".language-btn").forEach((button) => {
    button.addEventListener("click", () => {
      const nextLocale = button.dataset.lang;
      if (
        nextLocale &&
        nextLocale !== locale &&
        isSupportedLocale(nextLocale)
      ) {
        setLocale(nextLocale);
      }
    });
  });

  applyMetadata(locale, copy);
}

function setLocale(locale) {
  if (!isSupportedLocale(locale)) {
    return;
  }

  persistLocale(locale);
  renderResume(locale);
}

renderResume(getInitialLocale());

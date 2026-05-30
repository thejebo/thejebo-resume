import "./main.scss";
import {
  DEFAULT_LOCALE,
  resumeTranslations,
  SUPPORTED_LOCALES,
} from "./translations";
import type {
  EducationItem,
  Locale,
  RenderResumeOptions,
  ResumeTranslation,
  SetLocaleOptions,
  SkillGroup,
  WorkExperienceItem,
} from "./types/shared";

const LANGUAGE_STORAGE_KEY = "resume-language";

function getAppElement(): HTMLElement {
  const appElement = document.querySelector<HTMLElement>("#app");
  if (!appElement) {
    throw new Error("Missing #app element");
  }

  return appElement;
}

const appElement = getAppElement();

function isSupportedLocale(locale: string): locale is Locale {
  return SUPPORTED_LOCALES.includes(locale as Locale);
}

function getInitialLocale(): Locale {
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

function persistLocale(locale: Locale): void {
  try {
    localStorage.setItem(LANGUAGE_STORAGE_KEY, locale);
  } catch {
    // localStorage may be unavailable in strict privacy contexts.
  }
}

function setMetaContent(selector: string, content: string): void {
  const metaElement = document.querySelector(selector);
  if (metaElement) {
    metaElement.setAttribute("content", content);
  }
}

function applyMetadata(locale: Locale, copy: ResumeTranslation): void {
  document.documentElement.lang = locale;
  document.title = copy.meta.title;
  setMetaContent("meta[name='description']", copy.meta.description);
  setMetaContent("meta[property='og:title']", copy.meta.ogTitle);
  setMetaContent("meta[property='og:description']", copy.meta.description);
  setMetaContent("meta[property='og:locale']", copy.locale);
  setMetaContent("meta[name='twitter:title']", copy.meta.twitterTitle);
  setMetaContent("meta[name='twitter:description']", copy.meta.description);
}

function renderDateRange(item: WorkExperienceItem): string {
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

function renderWorkExperience(items: WorkExperienceItem[]): string {
  return items
    .map(
      (item: WorkExperienceItem) => `
      <li>
        <div class="details">
          <h4>${item.company}</h4>
          ${renderDateRange(item)}
        </div>
        <div class="job-description">
          <span>${item.role}</span>
          <ul>
            ${item.bullets.map((bullet: string) => `<li>${bullet}</li>`).join("")}
          </ul>
        </div>
      </li>
    `,
    )
    .join("");
}

function renderEducation(items: EducationItem[]): string {
  return items
    .map(
      (item: EducationItem) => `
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

function renderSkills(items: SkillGroup[]): string {
  return items
    .map(
      (item: SkillGroup) => `
      <div>
        <h4><i class="${item.icon}" aria-hidden="true"></i> ${item.title}</h4>
        <ul>
          ${item.items.map((skill: string) => `<li>${skill}</li>`).join("")}
        </ul>
      </div>
    `,
    )
    .join("");
}

function renderResume(locale: Locale, options: RenderResumeOptions = {}): void {
  const copy = resumeTranslations[locale];
  const { restoreFocusSelector, statusMessage } = options;

  appElement.innerHTML = `
  <a class="skip-link" href="#main-content">${copy.a11y.skipToContent}</a>
  <div id="a11y-status" class="sr-only" aria-live="polite" aria-atomic="true"></div>
  <main id="main-content" tabindex="-1">
    <header>
      <div class="row">
        <h1>${import.meta.env.VITE_AUTHOR_NAME || copy.header.name}</h1>
        <div class="actions language-switch" role="group" aria-label="${copy.header.toggleLabel}">
          <span class="language-switch-label">${copy.header.toggleLabel}</span>
          <button type="button" class="language-btn ${locale === "fi" ? "is-active" : ""}" data-lang="fi" aria-pressed="${locale === "fi"}">FI</button>
          <button type="button" class="language-btn ${locale === "en" ? "is-active" : ""}" data-lang="en" aria-pressed="${locale === "en"}">EN</button>
        </div>
      </div>
      <h2>${import.meta.env.VITE_AUTHOR_TITLE || copy.header.role}</h2>
    </header>
    <section>
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
        <span><i class="fa-solid fa-house-laptop" aria-hidden="true"></i> ${copy.contact.location}</span>
        <a target="_blank" rel="noopener noreferrer" href="https://www.linkedin.com/in/jere-borgelin-0738b8200"><i class="fa-brands fa-linkedin" aria-hidden="true"></i> ${copy.contact.linkedinLabel} <span class="sr-only"> (${copy.a11y.opensInNewTab})</span> <i class="fa-solid fa-arrow-up-right-from-square" aria-hidden="true"></i></a>
        <a target="_blank" rel="noopener noreferrer" href="https://github.com/thejebo"><i class="fa-brands fa-github" aria-hidden="true"></i> ${copy.contact.githubLabel} <span class="sr-only"> (${copy.a11y.opensInNewTab})</span> <i class="fa-solid fa-arrow-up-right-from-square" aria-hidden="true"></i></a>
      </div>
    </div>
  </aside>
`;

  const skipLink = appElement.querySelector<HTMLAnchorElement>(".skip-link");
  skipLink?.addEventListener("click", () => {
    appElement.querySelector<HTMLElement>("#main-content")?.focus();
  });

  appElement
    .querySelectorAll<HTMLButtonElement>(".language-btn")
    .forEach((button) => {
      button.addEventListener("click", () => {
        const nextLocale = button.dataset.lang;
        if (
          nextLocale &&
          nextLocale !== locale &&
          isSupportedLocale(nextLocale)
        ) {
          setLocale(nextLocale, {
            restoreFocusSelector: `.language-btn[data-lang="${nextLocale}"]`,
            announceChange: true,
          });
        }
      });
    });

  applyMetadata(locale, copy);

  if (statusMessage) {
    const statusElement = appElement.querySelector<HTMLElement>("#a11y-status");
    if (statusElement) {
      statusElement.textContent = "";
      requestAnimationFrame(() => {
        statusElement.textContent = statusMessage;
      });
    }
  }

  if (restoreFocusSelector) {
    appElement.querySelector<HTMLElement>(restoreFocusSelector)?.focus();
  }
}

function getLanguageChangeAnnouncement(locale: Locale): string {
  const copy = resumeTranslations[locale];
  const languageName =
    copy.a11y.languageNames?.[locale] || locale.toUpperCase();
  return copy.a11y.languageChanged.replace("{language}", languageName);
}

function setLocale(locale: string, options: SetLocaleOptions = {}): void {
  if (!isSupportedLocale(locale)) {
    return;
  }

  persistLocale(locale);

  const statusMessage = options.announceChange
    ? getLanguageChangeAnnouncement(locale)
    : null;

  renderResume(locale, {
    restoreFocusSelector: options.restoreFocusSelector,
    statusMessage,
  });
}

renderResume(getInitialLocale());

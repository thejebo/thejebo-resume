import "./styles/cover-letter-bundle.scss";
import {
  coverLetterTranslations,
  DEFAULT_LOCALE,
  SUPPORTED_LOCALES,
} from "./translations";
import type { CoverLetterTranslation, Locale } from "./types/shared";
import type { CoverLetterData } from "./types/cover-letter";

const BASE_URL = import.meta.env.BASE_URL;
const POLL_INTERVAL_MS = 1200;
const LANGUAGE_STORAGE_KEY = "resume-language";

type ResolvedCoverLetterAuthor = {
  name: string;
  title: string;
  location?: string;
  email: string;
  phone?: string;
};

const appElement = document.querySelector<HTMLElement>("#app");

if (!appElement) {
  throw new Error("Missing #app element");
}

let refreshTimer: number | undefined;
let currentLocale: Locale = getInitialLocale();
let currentLetter: CoverLetterData | null = null;

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

function getCopy(locale: string): CoverLetterTranslation {
  return isSupportedLocale(locale)
    ? coverLetterTranslations[locale]
    : coverLetterTranslations[DEFAULT_LOCALE];
}

const withNoCacheParam = (url: string): string => {
  if (!import.meta.env.DEV) {
    return url;
  }

  const separator = url.includes("?") ? "&" : "?";
  return `${url}${separator}t=${Date.now()}`;
};

const stopAutoRefresh = (): void => {
  if (refreshTimer) {
    window.clearInterval(refreshTimer);
    refreshTimer = undefined;
  }
};

const slugFromHash = (): string => {
  const raw = window.location.hash.replace(/^#\/?/, "").trim();
  if (!raw) {
    return "";
  }

  if (raw.startsWith("l/")) {
    return raw.slice(2);
  }

  return raw;
};

const escapeHtml = (value: string | number | null | undefined = ""): string =>
  String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");

const renderMessage = (title: string, body: string, detail = ""): void => {
  const copy = getCopy(currentLocale);
  appElement.innerHTML = `
    <div class="cover-letter-message">
      <div class="actions language-switch" role="group" aria-label="${copy.header.toggleLabel}">
        <span class="language-switch-label">${copy.header.toggleLabel}</span>
        <button type="button" class="language-btn ${currentLocale === "fi" ? "is-active" : ""}" data-lang="fi" aria-pressed="${currentLocale === "fi"}">FI</button>
        <button type="button" class="language-btn ${currentLocale === "en" ? "is-active" : ""}" data-lang="en" aria-pressed="${currentLocale === "en"}">EN</button>
      </div>
      <h1>${escapeHtml(title)}</h1>
      <p>${escapeHtml(body)}</p>
      ${detail ? `<pre>${escapeHtml(detail)}</pre>` : ""}
    </div>
  `;
  attachLanguageSwitchListeners();
};

function resolveAuthor(letter: CoverLetterData): ResolvedCoverLetterAuthor {
  const name = import.meta.env.VITE_AUTHOR_NAME || letter.author.name;
  const title = import.meta.env.VITE_AUTHOR_TITLE || letter.author.title;
  const email = import.meta.env.VITE_EMAIL || letter.author.email;
  const phone =
    import.meta.env.VITE_PHONE_NUMBER || letter.author.phone || undefined;
  const location =
    import.meta.env.VITE_AUTHOR_LOCATION || letter.author.location || undefined;

  if (!name) {
    throw new Error("Cover letter author requires a name.");
  }

  if (!title) {
    throw new Error("Cover letter author requires a title.");
  }

  if (!email) {
    throw new Error("Cover letter author requires an email address.");
  }

  return {
    name,
    title,
    location,
    email,
    phone,
  };
}

const renderCoverLetter = (letter: CoverLetterData): void => {
  const copy = getCopy(currentLocale);
  const author = resolveAuthor(letter);

  const formatDate = (isoDate?: string): string => {
    const date = isoDate ? new Date(isoDate) : new Date();
    return new Intl.DateTimeFormat(copy.dateLocale, {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    }).format(date);
  };

  const createdAt = new Date().toISOString().slice(0, 10);
  const displayDate = formatDate();

  const body = Array.isArray(letter.body) ? letter.body : [];
  const highlights = Array.isArray(letter.highlights) ? letter.highlights : [];

  const bodyMarkup = body
    .map((paragraph: string) => `<p>${escapeHtml(paragraph)}</p>`)
    .join("");

  const highlightsMarkup = highlights
    .map((point: string) => `<li>${escapeHtml(point)}</li>`)
    .join("");

  appElement.innerHTML = `
    <div class="cover-letter-page">
      <main class="cover-letter-main">
        <header>
          <div>
            <h1>${escapeHtml(author.name)}</h1>
            <h2>${escapeHtml(author.title)}</h2>
          </div>

          <div class="contact-section">
            ${author.phone ? `<span>${escapeHtml(author.phone)}</span>` : ""}
            <span>${escapeHtml(author.email)}</span>
            ${author.location ? `<span>${escapeHtml(author.location)}</span>` : ""}
          </div>

          <div class="date-section">
            <time dateTime="${escapeHtml(createdAt)}">${escapeHtml(displayDate)}</time>
          </div>

          <div class="actions language-switch" role="group" aria-label="${copy.header.toggleLabel}">
            <span class="language-switch-label">${copy.header.toggleLabel}</span>
            <button type="button" class="language-btn ${currentLocale === "fi" ? "is-active" : ""}" data-lang="fi" aria-pressed="${currentLocale === "fi"}">FI</button>
            <button type="button" class="language-btn ${currentLocale === "en" ? "is-active" : ""}" data-lang="en" aria-pressed="${currentLocale === "en"}">EN</button>
          </div>
        </header>

        <div class="letter-body">
          <section class="letter-section">
            ${letter.greeting ? `<p class="greeting">${escapeHtml(letter.greeting)}</p>` : ""}
            ${letter.opening ? `<p class="opening">${escapeHtml(letter.opening)}</p>` : ""}
          </section>

          <section class="letter-section">
            ${bodyMarkup}
          </section>

          ${
            highlights.length
              ? `
          <section class="letter-section highlights-section">
            <h4>${copy.highlightsTitle}</h4>
            <ul>${highlightsMarkup}</ul>
          </section>`
              : ""
          }

          <section class="letter-section">
            ${letter.closing ? `<p class="closing">${escapeHtml(letter.closing)}</p>` : ""}
          </section>

          <div class="signature">
            <p class="signature-text">${escapeHtml(letter.signature || author.name)}</p>
          </div>
        </div>
      </main>
    </div>
  `;
  attachLanguageSwitchListeners();
};

const attachLanguageSwitchListeners = (): void => {
  appElement
    .querySelectorAll<HTMLButtonElement>(".language-btn")
    .forEach((button) => {
      button.addEventListener("click", () => {
        const nextLocale = button.dataset.lang;
        if (
          nextLocale &&
          nextLocale !== currentLocale &&
          isSupportedLocale(nextLocale)
        ) {
          currentLocale = nextLocale;
          persistLocale(nextLocale);
          if (currentLetter) {
            renderCoverLetter(currentLetter);
          } else {
            run();
          }
        }
      });
    });
};

const run = async (): Promise<void> => {
  stopAutoRefresh();
  const slug = slugFromHash();
  const copy = getCopy(currentLocale);

  if (!slug) {
    renderMessage(copy.noSlugTitle, copy.noSlugBody, copy.noSlugDetail);
    return;
  }

  const fileName = `${slug}.json`;
  const letterUrl = `${BASE_URL}letters.local/${fileName}`;

  try {
    const letterResponse = await fetch(withNoCacheParam(letterUrl), {
      cache: "no-store",
    });

    if (!letterResponse.ok) {
      if (letterResponse.status === 404) {
        renderMessage(
          copy.notFoundTitle,
          copy.notFoundBody,
          `${copy.notFoundDetailPrefix}${fileName}`,
        );
      } else {
        throw new Error(
          `HTTP ${letterResponse.status} while fetching ${fileName}`,
        );
      }
      return;
    }

    const letter = (await letterResponse.json()) as CoverLetterData;
    currentLetter = letter;
    renderCoverLetter(letter);

    if (import.meta.env.DEV) {
      let lastFingerprint = JSON.stringify(letter);

      refreshTimer = window.setInterval(async () => {
        try {
          const liveResponse = await fetch(withNoCacheParam(letterUrl), {
            cache: "no-store",
          });

          if (!liveResponse.ok) {
            return;
          }

          const liveLetter = (await liveResponse.json()) as CoverLetterData;
          const nextFingerprint = JSON.stringify(liveLetter);

          if (nextFingerprint !== lastFingerprint) {
            lastFingerprint = nextFingerprint;
            currentLetter = liveLetter;
            renderCoverLetter(liveLetter);
          }
        } catch {
          // Silent retry during local edits.
        }
      }, POLL_INTERVAL_MS);
    }
  } catch (error) {
    renderMessage(copy.loadErrorTitle, copy.loadErrorBody, String(error));
  }
};

run();
window.addEventListener("hashchange", () => {
  currentLetter = null;
  run();
});

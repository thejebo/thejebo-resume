import "./styles/cover-letter-bundle.scss";
import {
  coverLetterTranslations,
  DEFAULT_LOCALE,
  SUPPORTED_LOCALES,
} from "./translations";

const BASE_URL = import.meta.env.BASE_URL;
const POLL_INTERVAL_MS = 1200;
const LANGUAGE_STORAGE_KEY = "resume-language";

let refreshTimer;
let currentLocale = getInitialLocale();
let currentLetter = null;

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

function getCopy(locale) {
  return (
    coverLetterTranslations[locale] || coverLetterTranslations[DEFAULT_LOCALE]
  );
}

const withNoCacheParam = (url) => {
  if (!import.meta.env.DEV) {
    return url;
  }

  const separator = url.includes("?") ? "&" : "?";
  return `${url}${separator}t=${Date.now()}`;
};

const stopAutoRefresh = () => {
  if (refreshTimer) {
    window.clearInterval(refreshTimer);
    refreshTimer = undefined;
  }
};

const slugFromHash = () => {
  const raw = window.location.hash.replace(/^#\/?/, "").trim();
  if (!raw) {
    return "";
  }

  if (raw.startsWith("l/")) {
    return raw.slice(2);
  }

  return raw;
};

const escapeHtml = (value = "") =>
  String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");

const renderMessage = (title, body, detail = "") => {
  const copy = getCopy(currentLocale);
  document.querySelector("#app").innerHTML = `
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

const renderCoverLetter = (letter) => {
  const copy = getCopy(currentLocale);
  const role = letter.meta?.role || copy.defaults.role;
  const roleLabel = letter.meta?.roleLabel || copy.defaults.roleLabel;
  const company = letter.meta?.company || copy.defaults.company;
  const positionId = letter.meta?.positionId || "";
  const recipientName = letter.recipient?.name || copy.defaults.recipientName;
  const recipientTeam = letter.recipient?.team || "";
  const recipientCompany = letter.recipient?.company || company;
  const recipientLocation = letter.recipient?.location || "";
  const authorName =
    import.meta.env.VITE_AUTHOR_NAME || letter.author?.name || "Jere Borgelin";
  const authorTitle =
    import.meta.env.VITE_AUTHOR_TITLE ||
    letter.author?.title ||
    copy.defaults.authorTitle;
  const authorLocation =
    import.meta.env.VITE_AUTHOR_LOCATION ||
    letter.author?.location ||
    copy.defaults.authorLocation;
  const authorEmail = import.meta.env.VITE_EMAIL || letter.author?.email || "";
  const authorPhone =
    import.meta.env.VITE_PHONE_NUMBER || letter.author?.phone || "";

  const formatDate = (isoDate) => {
    const date = isoDate ? new Date(isoDate) : new Date();
    return new Intl.DateTimeFormat(copy.dateLocale, {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    }).format(date);
  };

  const createdAt = new Date().toISOString().slice(0, 10);
  const displayDate = formatDate(createdAt);

  const body = Array.isArray(letter.body) ? letter.body : [];
  const highlights = Array.isArray(letter.highlights) ? letter.highlights : [];

  const bodyMarkup = body
    .map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`)
    .join("");

  const highlightsMarkup = highlights
    .map((point) => `<li>${escapeHtml(point)}</li>`)
    .join("");

  document.querySelector("#app").innerHTML = `
    <div class="cover-letter-page">
      <main class="cover-letter-main">
        <header>
          <div>
            <h1>${escapeHtml(authorName)}</h1>
            <h2>${escapeHtml(authorTitle)}</h2>
          </div>

          <div class="contact-section">
            ${authorPhone ? `<span>${escapeHtml(authorPhone)}</span>` : ""}
            ${authorEmail ? `<span>${escapeHtml(authorEmail)}</span>` : ""}
            ${authorLocation ? `<span>${escapeHtml(authorLocation)}</span>` : ""}
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
            <p class="signature-text">${escapeHtml(letter.signature || authorName)}</p>
          </div>
        </div>
      </main>
    </div>
  `;
  attachLanguageSwitchListeners();
};

const attachLanguageSwitchListeners = () => {
  document.querySelectorAll(".language-btn").forEach((button) => {
    button.addEventListener("click", () => {
      const nextLocale = button.dataset.lang;
      if (nextLocale && nextLocale !== currentLocale && isSupportedLocale(nextLocale)) {
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

const run = async () => {
  stopAutoRefresh();
  const slug = slugFromHash();
  const copy = getCopy(currentLocale);

  if (!slug) {
    renderMessage(
      copy.noSlugTitle,
      copy.noSlugBody,
      copy.noSlugDetail,
    );
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

    const letter = await letterResponse.json();
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

          const liveLetter = await liveResponse.json();
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
    renderMessage(
      copy.loadErrorTitle,
      copy.loadErrorBody,
      String(error),
    );
  }
};

run();
window.addEventListener("hashchange", () => {
  currentLetter = null;
  run();
});

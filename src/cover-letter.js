import "./styles/cover-letter-bundle.scss";

const BASE_URL = import.meta.env.BASE_URL;
const POLL_INTERVAL_MS = 1200;

let refreshTimer;

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
  document.querySelector("#app").innerHTML = `
    <div class="cover-letter-message">
      <h1>${escapeHtml(title)}</h1>
      <p>${escapeHtml(body)}</p>
      ${detail ? `<pre>${escapeHtml(detail)}</pre>` : ""}
    </div>
  `;
};

const renderCoverLetter = (letter) => {
  const role = letter.meta?.role || "Hakemuskirje";
  const roleLabel = letter.meta?.roleLabel || "";
  const company = letter.meta?.company || "Yritys";
  const sourceUrl = letter.meta?.sourceUrl || "";
  const positionId = letter.meta?.positionId || "";
  const recipientName = letter.recipient?.name || "Rekrytointitiimi";
  const recipientTeam = letter.recipient?.team || "";
  const recipientCompany = letter.recipient?.company || company;
  const recipientLocation = letter.recipient?.location || "";
  const authorName =
    import.meta.env.VITE_AUTHOR_NAME || letter.author?.name || "Jere Borgelin";
  const authorTitle =
    import.meta.env.VITE_AUTHOR_TITLE ||
    letter.author?.title ||
    "Senior Full-stack Web Developer";
  const authorLocation =
    import.meta.env.VITE_AUTHOR_LOCATION ||
    letter.author?.location ||
    "Turku, Finland";
  const authorEmail = import.meta.env.VITE_EMAIL || letter.author?.email || "";
  const authorPhone =
    import.meta.env.VITE_PHONE_NUMBER || letter.author?.phone || "";

  // Finnish date format: dd.mm.yyyy
  const formatFinnishDate = (isoDate) => {
    const date = isoDate ? new Date(isoDate) : new Date();
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}.${month}.${year}`;
  };

  const createdAt =
    letter.meta?.createdAt || new Date().toISOString().slice(0, 10);
  const displayDate = formatFinnishDate(createdAt);

  const body = Array.isArray(letter.body) ? letter.body : [];
  const highlights = Array.isArray(letter.highlights) ? letter.highlights : [];

  const bodyMarkup = body
    .map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`)
    .join("");

  const highlightsMarkup = highlights
    .map((point) => `<li>${escapeHtml(point)}</li>`)
    .join("");

  const jobLinkMarkup = sourceUrl
    ? `<a class="job-link" href="${escapeHtml(sourceUrl)}" target="_blank" rel="noreferrer"><i class="fa-solid fa-arrow-up-right-from-square"></i><span>Työpaikkailmoitus</span></a>`
    : "";

  document.querySelector("#app").innerHTML = `
    <div class="cover-letter-page">
      <aside class="cover-letter-aside">
        <div class="contact-section">
          <h3>Yhteystiedot</h3>
          ${authorPhone ? `<div class="contact-item"><i class="fa-solid fa-phone"></i> <span>${escapeHtml(authorPhone)}</span></div>` : ""}
          ${authorEmail ? `<div class="contact-item"><i class="fa-solid fa-envelope"></i> <span>${escapeHtml(authorEmail)}</span></div>` : ""}
          ${authorLocation ? `<div class="contact-item"><i class="fa-solid fa-location-dot"></i> <span>${escapeHtml(authorLocation)}</span></div>` : ""}
        </div>

        <div class="recipient-section">
          <h3>Vastaanottaja</h3>
          <div class="recipient-details">
            ${recipientName ? `<p>${escapeHtml(recipientName)}</p>` : ""}
            ${recipientTeam ? `<p>${escapeHtml(recipientTeam)}</p>` : ""}
            ${recipientCompany ? `<p>${escapeHtml(recipientCompany)}</p>` : ""}
            ${recipientLocation ? `<p>${escapeHtml(recipientLocation)}</p>` : ""}
          </div>
        </div>

        <div class="date-section">
          <h3>Päivämäärä</h3>
          <time dateTime="${escapeHtml(createdAt)}">${escapeHtml(displayDate)}</time>
        </div>
      </aside>

      <main class="cover-letter-main">
        <header class="main-header">
          <h1>${escapeHtml(authorName)}</h1>
          <h2>${escapeHtml(authorTitle)}</h2>
        </header>

        <div class="letter-header">
          ${roleLabel ? `<p class="role-label">${escapeHtml(roleLabel)}</p>` : ""}
          <h3>${escapeHtml(role)}${positionId ? ` <small class="position-id">(${escapeHtml(positionId)})</small>` : ""}</h3>
          <p class="company">${escapeHtml(company)}</p>
          ${jobLinkMarkup}
        </div>

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
            <h4>Miksi sopisin rooliin</h4>
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
};

const run = async () => {
  stopAutoRefresh();
  const slug = slugFromHash();

  if (!slug) {
    renderMessage(
      "Yksityiset hakemuskirjeet",
      "Anna slug URL-ankkurissa avataksesi tietyn luonnoksen.",
      "Esimerkki: /cover-letter.html#/l/abc123xyz",
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
          "Luonnosta ei löytynyt",
          "Tälle slugille ei ole paikallista luonnosta.",
          `Tiedosto: letters.local/${fileName}`,
        );
      } else {
        throw new Error(
          `HTTP ${letterResponse.status} while fetching ${fileName}`,
        );
      }
      return;
    }

    const letter = await letterResponse.json();
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
            renderCoverLetter(liveLetter);
          }
        } catch {
          // Silent retry during local edits.
        }
      }, POLL_INTERVAL_MS);
    }
  } catch (error) {
    renderMessage(
      "Luonnoksen lataus epäonnistui",
      "Määritettyä luonnostiedostoa ei voitu ladata.",
      String(error),
    );
  }
};

run();
window.addEventListener("hashchange", run);

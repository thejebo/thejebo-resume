import "./main.ts";

const BASE_URL = import.meta.env.BASE_URL;
const LANGUAGE_STORAGE_KEY = "resume-language";

const withNoCacheParam = (url) => {
  if (!import.meta.env.DEV) {
    return url;
  }

  const separator = url.includes("?") ? "&" : "?";
  return `${url}${separator}t=${Date.now()}`;
};

const escapeHtml = (value = "") =>
  String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");

const getInitialLocale = () => {
  try {
    const storedLocale = localStorage.getItem(LANGUAGE_STORAGE_KEY);
    if (storedLocale === "fi" || storedLocale === "en") {
      return storedLocale;
    }
  } catch {
    // localStorage may be unavailable.
  }

  return "fi";
};

const parseReferrersJson = (payload) => {
  const list = Array.isArray(payload)
    ? payload
    : payload && Array.isArray(payload.referrers)
      ? payload.referrers
      : [];

  return list
    .filter((item) => item && typeof item === "object")
    .map((item) => ({
      name: String(item.name || "").trim(),
      title: String(item.title || "").trim(),
      email: String(item.email || "").trim(),
      phone: String(item.phone || "").trim(),
    }))
    .filter((item) => item.name || item.title || item.email || item.phone);
};

const getReferencesHeading = (locale) =>
  locale === "en" ? "References" : "Suosittelijat";

const renderReferrersSection = (referrers, locale) => {
  const heading = getReferencesHeading(locale);

  if (!Array.isArray(referrers) || referrers.length === 0) {
    return `
      <main>
        <section class="references" data-private="true">
          <h3>${escapeHtml(heading)}</h3>
          <p class="references-empty">No local referrers file found (resources.local/Referrers.json).</p>
        </section>
      </main>
      <aside></aside>
    `;
  }

  const cards = referrers
    .map(
      (ref) => `
      <div class="referrer-card">
        <div class="referrer-name">${escapeHtml(ref.name)}</div>
        <div class="referrer-title">${escapeHtml(ref.title)}</div>
        <div class="referrer-contact">
          <span>${escapeHtml(ref.email)}</span>
          <span>${escapeHtml(ref.phone)}</span>
        </div>
      </div>
    `,
    )
    .join("");

  return `
    <main>
      <section class="references" data-private="true">
        <h3>${escapeHtml(heading)}</h3>
        <div class="referrers-grid">${cards}</div>
      </section>
    </main>
    <aside></aside>
  `;
};

const insertReferencesSection = (sectionHtml) => {
  const app = document.querySelector("#app");
  if (!app) {
    return;
  }

  let container = document.querySelector("#print-references");
  if (!container) {
    container = document.createElement("div");
    container.id = "print-references";
    document.body.appendChild(container);
  }

  container.innerHTML = sectionHtml;
};

const run = async () => {
  document.body.dataset.page = "print";

  const locale = getInitialLocale();
  const referrersUrl = `${BASE_URL}private/referrers.json`;

  try {
    const response = await fetch(withNoCacheParam(referrersUrl), {
      cache: "no-store",
    });

    if (!response.ok) {
      insertReferencesSection(renderReferrersSection([], locale));
      return;
    }

    const json = await response.json();
    const referrers = parseReferrersJson(json);
    insertReferencesSection(renderReferrersSection(referrers, locale));
  } catch {
    insertReferencesSection(renderReferrersSection([], locale));
  }
};

run();

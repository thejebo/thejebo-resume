export type Locale = "fi" | "en";

export type JsonPrimitive = string | number | boolean | null;
export type JsonValue = JsonPrimitive | JsonObject | JsonValue[];

export interface JsonObject {
  [key: string]: JsonValue | undefined;
}

type LanguageNames = Record<Locale, string>;

export interface CoverLetterTranslation {
  locale: string;
  dateLocale: string;
  header: {
    toggleLabel: string;
  };
  a11y: {
    languageChanged: string;
    languageNames: LanguageNames;
  };
  highlightsTitle: string;
  noSlugTitle: string;
  noSlugBody: string;
  noSlugDetail: string;
  notFoundTitle: string;
  notFoundBody: string;
  notFoundDetailPrefix: string;
  loadErrorTitle: string;
  loadErrorBody: string;
  defaults: {
    role: string;
    roleLabel: string;
    company: string;
    recipientName: string;
    authorTitle: string;
    authorLocation: string;
  };
}

export interface WorkExperienceItem {
  company: string;
  fromDateTime: string;
  fromLabel: string;
  toDateTime?: string;
  toLabel?: string;
  role: string;
  bullets: string[];
}

export interface EducationItem {
  institution: string;
  dateLabel: string;
  dateTime: string;
  degree: string;
}

export interface SkillGroup {
  icon: string;
  title: string;
  items: string[];
}

export interface ResumeTranslation {
  locale: string;
  meta: {
    title: string;
    description: string;
    ogTitle: string;
    twitterTitle: string;
  };
  header: {
    name: string;
    role: string;
    toggleLabel: string;
  };
  a11y: {
    skipToContent: string;
    opensInNewTab: string;
    languageChanged: string;
    languageNames: LanguageNames;
  };
  sections: {
    summaryTitle: string;
    summary: string;
    workExperienceTitle: string;
    educationTitle: string;
    skillsetTitle: string;
    contactTitle: string;
  };
  workExperience: WorkExperienceItem[];
  education: EducationItem[];
  skills: SkillGroup[];
  contact: {
    location: string;
    linkedinLabel: string;
    githubLabel: string;
  };
}

export interface Referrer {
  name: string;
  title: string;
  email: string;
  phone: string;
}

export type RenderResumeOptions = {
  restoreFocusSelector?: string;
  statusMessage?: string | null;
};

export type SetLocaleOptions = RenderResumeOptions & {
  announceChange?: boolean;
};

export const DEFAULT_LOCALE = "fi";

export const SUPPORTED_LOCALES = ["fi", "en"];

export const resumeTranslations = {
  fi: {
    locale: "fi_FI",
    meta: {
      title: "Senior Full-stack Web Developer - Jere Borgelin",
      description:
        "Jere Borgelinin ansioluettelo. Tutustu työkokemukseen, tekniseen osaamiseen ja yhteystietoihin.",
      ogTitle: "Senior Full-stack Web Developer - Jere Borgelin",
      twitterTitle: "Senior Full-stack Web Developer - Jere Borgelin",
    },
    header: {
      name: "Jere Borgelin",
      role: "Senior Full-stack Web Developer",
      toggleLabel: "Kieli",
    },
    sections: {
      summaryTitle: "Yhteenveto",
      summary:
        "Kokenut Senior Web Developer, jolla on vahva osaaminen full-stack-kehityksestä sekä moderneista JavaScript-frameworkeista ja backend-teknologioista, kuten Node.js, C# ja PHP. Suunnittelen ja rakennan skaalautuvia ja ylläpidettäviä sovelluksia painottaen selkeää koodia ja suorituskykyä. Toimin tehokkaasti sekä itsenäisesti että osana monialaista tiimiä. Olen intohimoinen rakentamaan ohjelmistoja, jotka yksinkertaistavat arkea ja parantavat käyttökokemusta.",
      workExperienceTitle: "Työkokemus",
      educationTitle: "Koulutus",
      skillsetTitle: "Osaaminen",
      contactTitle: "Yhteystiedot",
    },
    workExperience: [
      {
        company: "Visma Aquila Oy",
        fromDateTime: "2021-11",
        fromLabel: "Marraskuu 2021",
        toDateTime: "2026-06",
        toLabel: "Kesäkuu 2026",
        role: "Web Developerista Senior Web Developeriksi",
        bullets: [
          "Testasin ja toteutin AI- ja Agentic Workflow -ratkaisuja osaksi DevOps-sykliä.",
          "Määrittelin ja toteutin web-sovelluksiin testauskäytäntöjä, jotka kattoivat yksikkö-, integraatio-, end-to-end- ja kuormitustestauksen.",
          "Olin mukana kehittämässä ja ylläpitämässä viestintäsovellusta, joka erotettiin vanhasta monoliittisesta järjestelmästä mikroservice-arkkitehtuuriksi ja jota käyttävät koulut sekä muut ulkoiset sidosryhmät.",
          "Johdin sovelluksen arkkitehtuurin kokonaisvaltaista AWS-uudelleenrakennusta uuden alustan toteuttamiseksi.",
          "Osallistuin verkkokauppa-alustan uudelleenrakentamiseen osana monialaista tiimiä.",
        ],
      },
      {
        company: "Dikaios Oy",
        fromDateTime: "2020-04",
        fromLabel: "Huhtikuu 2020",
        toDateTime: "2021-11",
        toLabel: "Marraskuu 2021",
        role: "System Manager",
        bullets: [
          "Sähköisen oppimateriaalin ja koulukirjojen hankinta-alustan arkkitehtuuri, ylläpito ja kehitys sekä lisenssivälityksen ylläpito.",
          "API-suunnittelu ja toteutus.",
          "Useiden integraatioiden toteutus.",
          "Yhteistyö ulkoisten sidosryhmien kanssa.",
        ],
      },
      {
        company: "Hurja Solutions Oy",
        fromDateTime: "2015-05",
        fromLabel: "Toukokuu 2015",
        toDateTime: "2020-04",
        toLabel: "Huhtikuu 2020",
        role: "Harjoittelijasta Web Developeriksi",
        bullets: [
          "Tapasin asiakkaita säännöllisesti ja toteutin sekä päivitin web-sivuja UI/UX-suunnitelmien pohjalta heidän tarpeisiinsa.",
          "Sähköisen oppimateriaalin ja koulukirjojen hankinta-alustan ylläpito ja kehitys.",
          "Toteutin suunnittelumateriaaleista verkkosivuja HTML-, CSS-, JavaScript- ja PHP-teknologioilla.",
        ],
      },
    ],
    education: [
      {
        institution: "Savonia University of Applied Sciences",
        dateLabel: "Syyskuu 2012 - Toukokuu 2015",
        dateTime: "2012-09",
        degree: "Insinööri (AMK), ohjelmistokehitys",
      },
    ],
    skills: [
      {
        icon: "fa-solid fa-wand-magic-sparkles",
        title: "Frontend",
        items: [
          "Vue.js, React, jQuery",
          "TypeScript",
          "Sass, Tailwind, MUI, Bootstrap",
          "Lit, Stencil.js, Storybook",
        ],
      },
      {
        icon: "fa-solid fa-microchip",
        title: "Backend",
        items: [
          "Node.js, PHP, C#",
          "REST, GraphQL",
          "MySQL, PostgreSQL",
          "NGINX, Apache",
          "Redis",
          "Docker",
        ],
      },
      {
        icon: "fa-solid fa-circle-nodes",
        title: "Palvelut",
        items: ["GitHub, GitLab", "AWS, UpCloud", "Datadog"],
      },
      {
        icon: "fa-solid fa-wrench",
        title: "Työkalut",
        items: [
          "VS Code, Visual Studio",
          "GitHub Copilot, ChatGPT",
          "GitHub Actions",
          "Jira, Trello",
          "Confluence",
          "Slack",
          "LucidChart, Draw.io, Figma",
        ],
      },
      {
        icon: "fa-solid fa-vial-circle-check",
        title: "Testaus",
        items: ["Cypress, Playwright, Jest, k6, JMeter"],
      },
      {
        icon: "fa-solid fa-laptop",
        title: "Käyttöjärjestelmät",
        items: ["Windows, Linux"],
      },
      {
        icon: "fa-solid fa-language",
        title: "Kielet",
        items: ["Suomi, Englanti"],
      },
    ],
    contact: {
      location: "Turku, Suomi",
      linkedinLabel: "Jere Borgelin",
      githubLabel: "thejebo",
    },
  },
  en: {
    locale: "en_US",
    meta: {
      title: "Senior Full-stack Web Developer - Jere Borgelin",
      description:
        "Senior Full-stack Web Developer resume of Jere Borgelin. Explore experience, technical skills, and contact links.",
      ogTitle: "Senior Full-stack Web Developer - Jere Borgelin",
      twitterTitle: "Senior Full-stack Web Developer - Jere Borgelin",
    },
    header: {
      name: "Jere Borgelin",
      role: "Senior Full-stack Web Developer",
      toggleLabel: "Language",
    },
    sections: {
      summaryTitle: "Summary",
      summary:
        "Experienced Senior Web Developer with expertise in full-stack development, specializing in modern JavaScript frameworks and backend technologies including Node.js, C#, and PHP. Proficient in designing and building scalable, maintainable applications with a focus on clean code and performance. Adaptable and effective, thriving both as an independent contributor and as a collaborative member of cross-functional teams. Passionate about creating software that simplifies routines and enhances user experiences.",
      workExperienceTitle: "Work Experience",
      educationTitle: "Education",
      skillsetTitle: "Skillset",
      contactTitle: "Contact",
    },
    workExperience: [
      {
        company: "Visma Aquila Oy",
        fromDateTime: "2021-11",
        fromLabel: "November 2021",
        toDateTime: "2026-06",
        toLabel: "June 2026",
        role: "Web Developer to Senior Web Developer",
        bullets: [
          "Tested and implemented AI and Agentic workflows as part of the DevOps cycle.",
          "Implemented testing practices for web applications.",
          "Contributed to developing and maintaining a communication web application that was split from an aging monolithic system into a microservice architecture, used by schools and other external stakeholders.",
          "Led a full AWS rebuild of the application architecture, creating a new platform informed by the previous solution.",
          "Contributed to rebuilding an e-commerce platform as part of a cross-functional team.",
        ],
      },
      {
        company: "Dikaios Oy",
        fromDateTime: "2020-04",
        fromLabel: "April 2020",
        toDateTime: "2021-11",
        toLabel: "November 2021",
        role: "System Manager",
        bullets: [
          "Architecture, maintenance, and development of an e-learning materials and school book procurement platform, including maintenance of the licensing gateway.",
          "API design and implementation.",
          "Various integration implementations.",
          "Collaboration with external stakeholders.",
        ],
      },
      {
        company: "Hurja Solutions Oy",
        fromDateTime: "2015-05",
        fromLabel: "May 2015",
        toDateTime: "2020-04",
        toLabel: "April 2020",
        role: "From Intern to Web Developer",
        bullets: [
          "Met with clients regularly to implement and update web pages based on UI/UX mockups according to their needs.",
          "Maintenance and development of an e-learning materials and school book procurement platform.",
          "Implemented website layouts from design assets into web pages using HTML, CSS, JavaScript, and PHP.",
        ],
      },
    ],
    education: [
      {
        institution: "Savonia University of Applied Sciences",
        dateLabel: "September 2012 - May 2015",
        dateTime: "2012-09",
        degree: "Bachelor of Engineering BE, Computer Programming",
      },
    ],
    skills: [
      {
        icon: "fa-solid fa-wand-magic-sparkles",
        title: "Frontend",
        items: [
          "Vue.js, React, jQuery",
          "TypeScript",
          "Sass, Tailwind, MUI, Bootstrap",
          "Lit, Stencil.js, Storybook",
        ],
      },
      {
        icon: "fa-solid fa-microchip",
        title: "Backend",
        items: [
          "Node.js, PHP, C#",
          "REST, GraphQL",
          "MySQL, PostgreSQL",
          "NGINX, Apache",
          "Redis",
          "Docker",
        ],
      },
      {
        icon: "fa-solid fa-circle-nodes",
        title: "Services",
        items: ["GitHub, GitLab", "AWS, UpCloud", "Datadog"],
      },
      {
        icon: "fa-solid fa-wrench",
        title: "Tools",
        items: [
          "VS Code, Visual Studio",
          "GitHub Copilot, ChatGPT, CodeRabbit",
          "GitHub Actions",
          "Jira, Trello",
          "Confluence",
          "Slack",
          "LucidChart, Draw.io, Figma",
        ],
      },
      {
        icon: "fa-solid fa-vial-circle-check",
        title: "Testing",
        items: ["Cypress, Playwright, Jest, k6, JMeter"],
      },
      {
        icon: "fa-solid fa-laptop",
        title: "Operating Systems",
        items: ["Windows, Linux"],
      },
      {
        icon: "fa-solid fa-language",
        title: "Languages",
        items: ["Finnish, English"],
      },
    ],
    contact: {
      location: "Turku, Finland",
      linkedinLabel: "Jere Borgelin",
      githubLabel: "thejebo",
    },
  },
};

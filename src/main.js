import "./main.scss";

document.querySelector("#app").innerHTML = `
<main>
  <header>
    <div class="row">
      <h1>Jere Borgelin</h1>
    </div>
    <h2>Senior Full-stack Web Developer</h2>
  </header>
  <section>
    <h3>Summary</h3>
    <p>Experienced Senior Web Developer with expertise in full-stack development, specializing in modern JavaScript frameworks. Proficient in designing and building scalable, maintainable applications with a focus on clean code and performance. Adaptable and effective, thriving both as an independent contributor and as a collaborative member of cross-functional teams. I'm passionate about creating software that simplifies routines and enhances user experiences.</p>
  </section>

  <section>
    <h3>Work Experience</h3>
    <ol>
      <li>
        <div class="details">
          <h4>Visma Aquila Oy</h4>
          <div class="date-range">
            <time dateTime="2021-11">November 2021</time>
            <time dateTime="2026-06">June 2026</time>
          </div>
        </div>
        <div class="job-description">
          <span>Web Developer -&gt; Senior Web Developer</span>
          <ul>
            <li>Participation in optimizing DevOps coulture coupled with Agentic Workflows</li>
            <li>Optimization, Testing and Security related tasks</li>
            <li>Worked on communication Web App</li>
            <li>Moved existing architecture to AWS</li>
            <li>Within a team, re-created a large-scale E-commerce site</li>
          </ul>
        </div>
      </li>
      <li>
        <div class="details">
          <h4>Dikaios Oy</h4>
          <div class="date-range">
            <time dateTime="2020-04">April 2020</time>
            <span class="mobile-separator">-</span>
            <time dateTime="2021-11">November 2021</time>
          </div>
        </div>
        <div class="job-description">
          <span>System Manager</span>
          <ul>
            <li>Large scale E-commerce site architecture, maintenance and development.</li>
            <li>API design & Implementation.</li>
            <li>Various integration implementations.</li>
            <li>Collaboration with publishers and municipalities</li>
          </ul>
        </div>
      </li>
      <li>
        <div class="details">
          <h4>Hurja Solutions Oy</h4>
          <div class="date-range">
            <time dateTime="2015-05">May 2015</time>
            <span class="mobile-separator">-</span>
            <time dateTime="2020-04">April 2020</time>
          </div>
        </div>
        <div class="job-description">
          <span>Intern -&gt; Web Developer</span>
          <ul>
            <li>Collaboration with customers</li>
            <li>Large scale E-commerce site maintenance and development.</li>
            <li>Implemented website layouts from design assets into web pages using HTML, CSS, JavaScript and PHP.</li>
          </ul>
        </div>
      </li>
    </ol>
  </section>
  <section class="education">
    <h3>Education</h3>
    <ol>
      <li>
        <div class="details">
          <h4>Savonia University of Applied Sciences</h4>
          <div class="date-range">
            <time dateTime="2012-09">September 2012 - May 2015</time>
          </div>
        </div>
        <div class="job-description">
          <span>Bachelor of Engineering BE, Computer Programming</span>
        </div>
      </li>
    </ol>
  </section>
</main>

<aside>
  <h3>Skillset</h3>
  <div class="sets">
    <div>
      <h4><i class="fa-solid fa-wand-magic-sparkles"></i> Frontend</h4>
      <ul>
        <li>Vue.js, React, jQuery.</li>
        <li>TypeScript</li>
        <li>Sass, Tailwind, Bootstrap</li>
        <li>Lit, Stencil.js, Storybook</li>
      </ul>
    </div>
    <div>
      <h4><i class="fa-solid fa-microchip"></i> Backend</h4>
      <ul>
        <li>NodeJS, PHP, C#</li>
        <li>REST, GraphQL</li>
        <li>MySQL, PostgreSQL</li>
        <li>NGINX, Apache</li>
        <li>Redis</li>
        <li>Docker</li>
      </ul>
    </div>
    <div>
      <h4><i class="fa-solid fa-circle-nodes"></i> Services</h4>
      <ul>
        <li>GitHub, GitLab</li>
        <li>AWS, UpCloud</li>
        <li>~DataDog</li>
      </ul>
    </div>
    <div>
      <h4><i class="fa-solid fa-wrench"></i> Tools</h4>
      <ul>
        <li>VS Code, Visual Studio</li>
        <li>GitHub Copilot, ChatGPT</li>
        <li>GitHub Actions</li>
        <li>Jira, Trello</li>
        <li>Confluence</li>
        <li>Slack</li>
        <li>LucidChart, Draw.io</li>
        <li>Figma</li>
      </ul>
    </div>
    <div>
      <h4><i class="fa-solid fa-vial-circle-check"></i> Testing</h4>
      <ul>
        <li>Cypress, Playwright, Jest, k6, JMeter</li>
      </ul>
    </div>
    <div>
      <h4><i class="fa-solid fa-laptop"></i> Operating Systems</h4>
      <ul>
        <li>Windows, Linux</li>
      </ul>
    </div>
    <div>
      <h4><i class="fa-solid fa-language"></i> Languages</h4>
      <ul>
        <li>Finnish, English.</li>
      </ul>
    </div>
  </div>
  <div class="contact-info">
    <span><i class="fa-solid fa-house-laptop"></i> Turku, Finland</span>
    <a target="_blank" rel="noopener noreferrer" href="https://github.com/thejebo"><i class="fa-brands fa-github"></i> thejebo <i class="fa-solid fa-arrow-up-right-from-square"></i></a>
    <a target="_blank" rel="noopener noreferrer" href="https://fi.linkedin.com/in/jere-borgelin-0738b8200"><i class="fa-brands fa-linkedin"></i> Jere Borgelin <i class="fa-solid fa-arrow-up-right-from-square"></i></a>
  </div>
</aside>
`;

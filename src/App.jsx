import { useEffect, useState } from "react";
import RetinaScan from "./RetinaScan.jsx";
import {
  profile, stats, threads, research, builds, projects,
  experience, education, skills, certs, languages,
} from "./data.js";

const nav = [
  ["research", "Research"],
  ["engineering", "Engineering"],
  ["experience", "Experience"],
  ["skills", "Skills"],
  ["contact", "Contact"],
];

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll("[data-reveal]");
    if (!("IntersectionObserver" in window)) {
      els.forEach((e) => e.classList.add("in"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => entries.forEach((en) => {
        if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); }
      }),
      { rootMargin: "0px 0px -8% 0px" }
    );
    els.forEach((e) => io.observe(e));
    return () => io.disconnect();
  }, []);
}

function useTheme() {
  const [theme, setTheme] = useState(() => {
    try { return localStorage.getItem("theme") || ""; } catch { return ""; }
  });
  useEffect(() => {
    const r = document.documentElement;
    if (theme) r.dataset.theme = theme; else delete r.dataset.theme;
    try { theme ? localStorage.setItem("theme", theme) : localStorage.removeItem("theme"); } catch {}
  }, [theme]);
  const toggle = () => {
    const dark = theme
      ? theme === "dark"
      : window.matchMedia("(prefers-color-scheme: dark)").matches;
    setTheme(dark ? "light" : "dark");
  };
  return toggle;
}

const Icon = {
  mail: <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 6h18v12H3z M3 7l9 6 9-6" /></svg>,
  gh: <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 19c-4 1.3-4-2-6-2.5m12 5v-3.5c0-1 .1-1.4-.5-2 2.8-.3 5.5-1.4 5.5-6a4.6 4.6 0 0 0-1.3-3.2 4.2 4.2 0 0 0-.1-3.2s-1.1-.3-3.5 1.3a12 12 0 0 0-6.2 0C6.5 2.8 5.4 3.1 5.4 3.1a4.2 4.2 0 0 0-.1 3.2A4.6 4.6 0 0 0 4 9.5c0 4.6 2.7 5.7 5.5 6-.6.6-.6 1.2-.5 2V21" /></svg>,
  li: <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 9h4v11H4z M6 4.5a2 2 0 1 1 0 4 2 2 0 0 1 0-4 M10 9h4v1.6c.6-1 1.9-1.9 3.6-1.9 3 0 3.4 2 3.4 4.6V20h-4v-5.6c0-1.3 0-2.9-1.8-2.9S13 13 13 14.3V20h-3z" /></svg>,
  doc: <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 3h8l4 4v14H6z M14 3v4h4 M9 12h6 M9 16h6" /></svg>,
  arrow: <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 17 17 7 M8 7h9v9" /></svg>,
  moon: <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20 14.5A8 8 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5z" /></svg>,
};

function Header({ onTheme }) {
  const [open, setOpen] = useState(false);
  return (
    <header className="top">
      <div className="wrap top-in">
        <a href="#top" className="mark" aria-label="Parvez Ali — home">
          <span className="mono-badge">PA</span>
          <span className="mark-name">Parvez Ali</span>
        </a>
        <nav className={open ? "open" : ""} onClick={() => setOpen(false)}>
          {nav.map(([id, label]) => <a key={id} href={`#${id}`}>{label}</a>)}
        </nav>
        <div className="top-actions">
          <button className="icon-btn" onClick={onTheme} aria-label="Toggle colour theme">{Icon.moon}</button>
          <button className="icon-btn menu" onClick={() => setOpen(!open)} aria-label="Menu" aria-expanded={open}>
            <span /><span />
          </button>
        </div>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="hero" id="top">
      <div className="wrap hero-grid">
        <div className="hero-copy">
          <p className="status"><span className="pulse" />{profile.status} · {profile.location}</p>
          <h1>
            I build medical&nbsp;AI that knows <em>when not to be trusted</em> and ship it into real clinics.
          </h1>
          <p className="lede">
            I'm Parvez, a machine learning engineer at <strong>deepeye Medical</strong> in Munich.
            I work on retinal OCT: forecasting treatment from longitudinal scans, testing whether model
            confidence holds up under distribution shift, and running those models live in ophthalmology practices.
          </p>
          <div className="cta">
            <a className="btn primary" href={`mailto:${profile.email}`}>{Icon.mail}Get in touch</a>
            <a className="btn" href={profile.cv} target="_blank" rel="noreferrer">{Icon.doc}CV</a>
            <a className="btn ghost" href={profile.github} target="_blank" rel="noreferrer" aria-label="GitHub">{Icon.gh}</a>
            <a className="btn ghost" href={profile.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn">{Icon.li}</a>
          </div>
        </div>
        <div className="hero-visual">
          <RetinaScan />
        </div>
      </div>
      <div className="wrap">
        <dl className="stats">
          {stats.map((s) => (
            <div key={s.label}><dt>{s.value}</dt><dd>{s.label}</dd></div>
          ))}
        </dl>
      </div>
    </section>
  );
}

function SectionHead({ n, kicker, title, children }) {
  return (
    <div className="sec-head" data-reveal>
      <p className="kicker"><span>{n}</span>{kicker}</p>
      <h2>{title}</h2>
      {children && <p className="sec-sub">{children}</p>}
    </div>
  );
}

function About() {
  return (
    <section className="sec" id="about">
      <div className="wrap">
        <SectionHead n="00" kicker="About" title="Electrical engineer by training, medical-imaging researcher by choice.">
          I started with circuits, sensors and embedded systems at Sukkur IBA, moved to Germany for a joint
          master's in AI & Data Science, and found the problem I care about in ophthalmology: models that are
          accurate on a benchmark aren't automatically safe in a clinic. My work sits where research and
          deployment meet. Next, I'm looking for a PhD where I can go deeper.
        </SectionHead>
        <div className="threads">
          {threads.map((t) => (
            <article key={t.k} className="thread" data-reveal>
              <span className="tk">{t.k}</span>
              <h3>{t.title}</h3>
              <p>{t.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Research() {
  return (
    <section className="sec alt" id="research">
      <div className="wrap">
        <SectionHead n="01" kicker="Research" title="Questions I'm working on." />
        <div className="papers">
          {research.map((r, i) => (
            <article key={r.title} className={`paper ${i === 0 ? "lead" : ""}`} data-reveal>
              <div className="paper-meta">
                <span className="pill">{r.tag}</span>
                <span className="when">{r.period}</span>
              </div>
              <h3>{r.title}</h3>
              <p className="where">{r.where}</p>
              <p>{r.summary}</p>
              <ul className="ticks">{r.points.map((p) => <li key={p}>{p}</li>)}</ul>
              <div className="kw">{r.keywords.map((k) => <span key={k}>{k}</span>)}</div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Engineering() {
  return (
    <section className="sec" id="engineering">
      <div className="wrap">
        <SectionHead n="02" kicker="Engineering" title="Systems that leave the notebook.">
          Research only matters if it can run somewhere. These are the systems I've built around models — in clinics and in the lab.
        </SectionHead>
        <div className="builds">
          {builds.map((b) => (
            <article key={b.title} className="build" data-reveal>
              <p className="build-kind">{b.kind}</p>
              <h3>{b.title}</h3>
              <p>{b.body}</p>
              {b.detail.length > 0 && <ul className="ticks">{b.detail.map((d) => <li key={d}>{d}</li>)}</ul>}
              <div className="kw">{b.stack.map((s) => <span key={s}>{s}</span>)}</div>
            </article>
          ))}
        </div>

        <h3 className="sub-title" data-reveal>Other projects</h3>
        <div className="proj-list">
          {projects.map((p) => (
            <article key={p.title} className="proj" data-reveal>
              <h4>{p.title}</h4>
              <p>{p.body}</p>
              <div className="kw small">{p.tags.map((t) => <span key={t}>{t}</span>)}</div>
            </article>
          ))}
          <a className="proj more" href={profile.github} target="_blank" rel="noreferrer" data-reveal>
            <h4>More on GitHub {Icon.arrow}</h4>
            <p>Notebooks, coursework and earlier web projects at github.com/Panhwar-hub.</p>
          </a>
        </div>
      </div>
    </section>
  );
}

function Experience() {
  return (
    <section className="sec alt" id="experience">
      <div className="wrap two-col">
        <div>
          <SectionHead n="03" kicker="Experience" title="Where I've worked." />
          <ol className="timeline">
            {experience.map((e) => (
              <li key={e.role + e.period} data-reveal>
                <span className="t-when">{e.period}</span>
                <h3>{e.role}</h3>
                <p className="t-org">{e.org} · {e.place}</p>
                <p>{e.body}</p>
              </li>
            ))}
          </ol>
        </div>
        <div>
          <SectionHead n="04" kicker="Education" title="Where I've studied." />
          <div className="edu">
            {education.map((e) => (
              <article key={e.degree} data-reveal>
                <span className="t-when">{e.period}</span>
                <h3>{e.degree}</h3>
                <p className="t-org">{e.org}</p>
                <p className="edu-note">{e.note}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Skills() {
  return (
    <section className="sec" id="skills">
      <div className="wrap">
        <SectionHead n="05" kicker="Toolkit" title="What I work with." />
        <div className="skills">
          {skills.map((s) => (
            <div key={s.group} className="skill" data-reveal>
              <h3>{s.group}</h3>
              <ul>{s.items.map((i) => <li key={i}>{i}</li>)}</ul>
            </div>
          ))}
        </div>
        <div className="extras" data-reveal>
          <div>
            <h3>Certifications</h3>
            <ul>{certs.map((c) => <li key={c}>{c}</li>)}</ul>
          </div>
          <div>
            <h3>Languages</h3>
            <ul>{languages.map((l) => <li key={l}>{l}</li>)}</ul>
          </div>
        </div>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section className="contact" id="contact">
      <div className="wrap" data-reveal>
        <p className="kicker"><span>06</span>Contact</p>
        <h2>Looking for a PhD student who can do the research <em>and</em> make it run?</h2>
        <p className="sec-sub">
          I'm open to doctoral positions in medical image analysis, trustworthy machine learning,
          and perception for robotics. I'm also happy to talk about OCT, uncertainty, or clinical deployment.
        </p>
        <a className="big-mail" href={`mailto:${profile.email}`}>{profile.email}{Icon.arrow}</a>
        <div className="cta">
          <a className="btn" href={profile.github} target="_blank" rel="noreferrer">{Icon.gh}GitHub</a>
          <a className="btn" href={profile.linkedin} target="_blank" rel="noreferrer">{Icon.li}LinkedIn</a>
          <a className="btn" href={profile.cv} target="_blank" rel="noreferrer">{Icon.doc}Download CV</a>
        </div>
      </div>
      <footer className="wrap foot">
        <span>© {new Date().getFullYear()} Parvez Ali</span>
        <span>Munich, Germany</span>
      </footer>
    </section>
  );
}

export default function App() {
  const toggleTheme = useTheme();
  useReveal();
  return (
    <>
      <Header onTheme={toggleTheme} />
      <main>
        <Hero />
        <About />
        <Research />
        <Engineering />
        <Experience />
        <Skills />
        <Contact />
      </main>
    </>
  );
}

import { useEffect, useRef, useState } from 'react'
import { motion, useMotionValue, useReducedMotion, useSpring } from 'motion/react'
import { createPortal } from 'react-dom'
import './App.css'

const assets = '/assets/'
const contactEmail = 'siachonngcojustin@gmail.com'
const githubProfile = 'https://github.com/justin-ric'

const pages = [
  { id: 'home', label: 'Home', underline: 'figma-home-underline.svg' },
  { id: 'about', label: 'About', underline: 'figma-home-underline.svg' },
  { id: 'projects', label: 'Projects', underline: 'figma-project-underline.svg' },
  { id: 'skills', label: 'Skills', underline: 'figma-skills-underline.svg' },
  { id: 'contact', label: 'Contact', underline: 'figma-contact-underline.svg' },
]

const revealVariants = {
  hidden: { opacity: 0, y: 18 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.68,
      delay,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
}

const staggerVariants = {
  hidden: { opacity: 0, y: 18 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.68,
      delay,
      ease: [0.22, 1, 0.36, 1],
      delayChildren: delay + 0.08,
      staggerChildren: 0.1,
    },
  }),
}

const leftRevealVariants = {
  hidden: { opacity: 0, x: -14 },
  visible: (delay = 0) => ({
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.62,
      delay,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
}

const scaleRevealVariants = {
  hidden: { opacity: 0, scale: 0.88 },
  visible: (delay = 0) => ({
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.48,
      delay,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
}

const emphasisRevealVariants = {
  hidden: { opacity: 0, y: 22, scale: 0.98 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.78,
      delay,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
}

const reducedRevealVariants = {
  hidden: { opacity: 1, y: 0 },
  visible: { opacity: 1, y: 0, transition: { duration: 0 } },
}

function Reveal({
  as = 'div',
  children,
  className,
  delay = 0,
  stagger = false,
  lift = 0,
  ...props
}) {
  const shouldReduceMotion = useReducedMotion()
  const [animationFallback, setAnimationFallback] = useState(false)
  const fallbackTimer = useRef()
  const skipAnimation =
    shouldReduceMotion ||
    document.visibilityState === 'hidden' ||
    typeof IntersectionObserver === 'undefined'
  const Component = motion[as]

  useEffect(() => () => window.clearTimeout(fallbackTimer.current), [])

  function clearFallbackTimer() {
    window.clearTimeout(fallbackTimer.current)
  }

  function ensureVisibleIfAnimationStalls() {
    if (!skipAnimation) {
      clearFallbackTimer()
      fallbackTimer.current = window.setTimeout(() => setAnimationFallback(true), 3000)
    }
  }

  function resetAnimationFallback() {
    clearFallbackTimer()
    setAnimationFallback(false)
  }

  return (
    <Component
      className={className}
      initial={skipAnimation ? false : 'hidden'}
      whileInView="visible"
      animate={animationFallback ? 'visible' : undefined}
      onViewportEnter={ensureVisibleIfAnimationStalls}
      onViewportLeave={resetAnimationFallback}
      onAnimationComplete={clearFallbackTimer}
      viewport={{ once: false, amount: 0.2 }}
      variants={
        skipAnimation
          ? reducedRevealVariants
          : stagger
            ? staggerVariants
            : revealVariants
      }
      custom={delay}
      whileHover={lift && !skipAnimation ? { y: -lift } : undefined}
      whileTap={lift && !skipAnimation ? { y: 0, scale: 0.99 } : undefined}
      {...props}
    >
      {children}
    </Component>
  )
}

function RevealItem({
  as = 'div',
  children,
  className,
  delay = 0,
  stagger = false,
  fromLeft = false,
  scaleIn = false,
  emphasis = false,
  ...props
}) {
  const skipAnimation =
    useReducedMotion() ||
    document.visibilityState === 'hidden' ||
    typeof IntersectionObserver === 'undefined'
  const Component = motion[as]

  return (
    <Component
      className={className}
      variants={
        skipAnimation
          ? reducedRevealVariants
          : stagger
            ? staggerVariants
            : fromLeft
              ? leftRevealVariants
              : scaleIn
                ? scaleRevealVariants
                : emphasis
                  ? emphasisRevealVariants
                  : revealVariants
      }
      custom={delay}
      {...props}
    >
      {children}
    </Component>
  )
}

const previewLines = [
  <>
    <span className="syntax-purple">ui</span> / <span className="syntax-green">system</span>
  </>,
  <>
    <span className="syntax-orange">focus</span>: <span className="syntax-green">clean / arch</span>
  </>,
  <>
    <span className="syntax-orange">stack</span>: <span className="syntax-purple">ts, py, java</span>
  </>,
  <>
    <span className="syntax-orange">status</span>: <span className="syntax-green">open</span>
  </>,
  <>
    <span className="syntax-orange">goal</span>: <span className="syntax-green">build / ship</span>
  </>,
  <>
    <span className="syntax-orange">next</span>: <span className="syntax-green">intern</span>
  </>,
  <>
    <span className="syntax-orange">style</span>: <span className="syntax-green">minimal</span>
  </>,
  <>
    <span className="syntax-orange">ready</span>: <span className="syntax-green">true</span>
  </>,
  <>
    <span className="syntax-orange">mode</span>: <span className="syntax-green">dev</span>
  </>,
  <>
    <span className="syntax-orange">view</span>: <span className="syntax-green">portfolio</span>
  </>,
  <>
    <span className="syntax-orange">link</span>: <span className="syntax-green">github</span>
  </>,
  <>
    <span className="syntax-orange">contact</span>: <span className="syntax-green">open</span>
  </>,
]

const skillGroups = [
  {
    title: 'Frontend',
    icon: 'frontend',
    technologies: ['HTML', 'CSS', 'JavaScript'],
  },
  {
    title: 'Programming',
    icon: 'programming',
    technologies: ['Python', 'Java'],
  },
  {
    title: 'Development Tools',
    icon: 'development',
    technologies: ['VS Code', 'GitHub'],
  },
  {
    title: 'Design Tools',
    icon: 'design',
    technologies: ['Figma'],
  },
  {
    title: 'Platforms',
    icon: 'platforms',
    technologies: ['Windows', 'Web'],
  },
  {
    title: 'Other Technical Skills',
    icon: 'other',
    technologies: ['Data Structures', 'OOP • Responsive Design', 'UI/UX Design'],
  },
]

const codeLines = [
  [{ text: '{' }],
  [
    { text: '  "role": ' },
    { text: '"Developer / Student"', className: 'syntax-green' },
    { text: ',' },
  ],
  [
    { text: '  "languages": [' },
    { text: '"TypeScript"', className: 'syntax-purple' },
    { text: ', ' },
    { text: '"Python"', className: 'syntax-purple' },
    { text: ', ' },
    { text: '"Java"', className: 'syntax-purple' },
    { text: '],' },
  ],
  [{ text: '  "coreFocus": [' }],
  [{ text: '    "Data Structures & Algorithms",' }],
  [{ text: '    "Full-Stack System Design"' }],
  [{ text: '  ],' }],
  [
    { text: '  "status": ' },
    { text: '"Looking for internships"', className: 'syntax-orange' },
  ],
  [{ text: '}' }],
]

const profileCode = codeLines
  .map((line) => line.map(({ text }) => text).join(''))
  .join('\n')

function getTypingDelay(character, position) {
  if (position === 0) return 250
  if (character === '\n') return 150
  if (',:[]{}'.includes(character)) return 85
  return character === ' ' ? 18 : 34
}

function renderCodeLine(segments, lineIndex, typedCharacters) {
  const lineStart = codeLines
    .slice(0, lineIndex)
    .reduce((count, line) => count + line.reduce((length, segment) => length + segment.text.length, 0) + 1, 0)
  const lineLength = segments.reduce((length, segment) => length + segment.text.length, 0)
  let offset = lineStart

  return (
    <span key={lineIndex}>
      {segments.map(({ text, className }, segmentIndex) => {
        const visibleLength = Math.max(0, Math.min(text.length, typedCharacters - offset))
        const showCursor = typedCharacters >= offset && typedCharacters < offset + text.length
        offset += text.length

        return (
          <span className={className} key={segmentIndex}>
            {text.slice(0, visibleLength)}
            {showCursor && <span className="typing-cursor" aria-hidden="true" />}
          </span>
        )
      })}
      {typedCharacters === lineStart + lineLength && (
        <span className="typing-cursor" aria-hidden="true" />
      )}
    </span>
  )
}

function CodeWindow() {
  const [typedCharacters, setTypedCharacters] = useState(0)

  useEffect(() => {
    const character = profileCode[typedCharacters]
    const timeout = window.setTimeout(
      () =>
        setTypedCharacters(
          typedCharacters === profileCode.length ? 0 : typedCharacters + 1,
        ),
      typedCharacters === profileCode.length
        ? 5000
        : getTypingDelay(character, typedCharacters),
    )

    return () => window.clearTimeout(timeout)
  }, [typedCharacters])

  return (
    <aside className="code-window" aria-label="Developer profile code preview">
      <div className="file-header">
        <img className="window-controls" src={`${assets}figma-home-controls.svg`} alt="" />
        <span className="file-name">justin.json</span>
        <span className="header-spacer" aria-hidden="true" />
      </div>
      <pre className="json-code" aria-label="Developer profile">
        {codeLines.map((line, index) => renderCodeLine(line, index, typedCharacters))}
      </pre>
      <div className="preview-window">
        <div className="file-header preview-header">
          <img
            className="window-controls window-controls-compact"
            src={`${assets}figma-home-controls-compact.svg`}
            alt=""
          />
          <span className="file-name">dev-preview</span>
        </div>
        <div className="preview-code" aria-hidden="true">
          {previewLines.map((line, index) => (
            <div className="code-row" key={index}>
              <span className="line-number">{String(index + 1).padStart(2, '0')}</span>
              <code>
                {index === 0 ? '<> ' : '{ '}
                {line}
                {index === 0 ? ' </>' : ' }'}
              </code>
            </div>
          ))}
        </div>
      </div>
    </aside>
  )
}

function Navigation({ activePage }) {
  return (
    <header className="site-header">
      <a className="wordmark" href="#home" aria-label="Justin home">
        <span className="logoko">
          <span className="wordmark-bracket">&lt; </span>
          <span className="wordmark-name">Justin</span>
          <span className="wordmark-bracket"> /&gt;</span>
        </span>
      </a>
      <nav className="navigation" aria-label="Main navigation">
        {pages.map((page) => (
          <a
            className={`nav-link${activePage === page.id ? ' active' : ''}`}
            href={`#${page.id}`}
            key={page.id}
            aria-current={activePage === page.id ? 'page' : undefined}
          >
            {page.label}
            {activePage === page.id && (
              <img className="nav-underline" src={`${assets}${page.underline}`} alt="" />
            )}
          </a>
        ))}
      </nav>
    </header>
  )
}

function SocialLinks() {
  return (
    <div className="social-links" aria-label="Social profiles">
      <a href="https://www.linkedin.com/in/justin-ric-siachongco-95397842a/?isSelfProfile=true" aria-label="LinkedIn" target="_blank" rel="noreferrer">
        <img src={`${assets}figma-home-social-1.png`} alt="" />
      </a>
      <a href={githubProfile} aria-label="GitHub" target="_blank" rel="noreferrer">
        <img src={`${assets}figma-home-social-2.png`} alt="" />
      </a>
      <a href={`mailto:${contactEmail}`} aria-label="Email Justin">
        <img src={`${assets}figma-home-social-3.png`} alt="" />
      </a>
    </div>
  )
}

function HomePage() {
  return (
    <section className="hero-layout" id="home">
      <Reveal as="section" className="hero-card" aria-labelledby="hero-title" stagger>
        <RevealItem as="p" className="eyebrow">
          Hello, I'm
        </RevealItem>
        <RevealItem as="h1" id="hero-title" emphasis>
          Justin Ric Siachongco
        </RevealItem>
        <RevealItem as="h2" className="hero-role">
          Computer Science Student &amp;
          <br />
          Aspiring Developer
        </RevealItem>
        <div className="hero-description">
          <RevealItem as="p" className="hero-lead">
            Building ideas into useful digital experiences.
          </RevealItem>
          <RevealItem as="p" delay={0.12}>
            I’m a Computer Science student interested in building practical digital experiences
            through programming, web development, and UI/UX design.
          </RevealItem>
        </div>
        <RevealItem className="hero-actions">
          <a className="button button-primary" href="#projects">
            View My Projects
          </a>
          <a className="button button-secondary" href="#about">
            About me
          </a>
        </RevealItem>
        <RevealItem as="p" className="availability">
          <span aria-hidden="true" />
          Available for learning &amp; collaboration
        </RevealItem>
        <RevealItem>
          <SocialLinks />
        </RevealItem>
      </Reveal>
      <Reveal className="code-panel" delay={0.18}>
        <CodeWindow />
      </Reveal>
    </section>
  )
}

function AboutPage() {
  const shouldReduceMotion = useReducedMotion()
  const [isImageOpen, setIsImageOpen] = useState(false)
  const profileImageButtonRef = useRef(null)
  const lightboxCloseButtonRef = useRef(null)
  const tiltX = useSpring(useMotionValue(0), { stiffness: 180, damping: 24, mass: 0.5 })
  const tiltY = useSpring(useMotionValue(0), { stiffness: 180, damping: 24, mass: 0.5 })

  useEffect(() => {
    if (!isImageOpen) return undefined

    const previousOverflow = document.body.style.overflow
    const profileImageButton = profileImageButtonRef.current
    document.body.style.overflow = 'hidden'
    lightboxCloseButtonRef.current?.focus()

    function handleKeyDown(event) {
      if (event.key === 'Escape') {
        setIsImageOpen(false)
      } else if (event.key === 'Tab') {
        event.preventDefault()
        lightboxCloseButtonRef.current?.focus()
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = previousOverflow
      profileImageButton?.focus()
    }
  }, [isImageOpen])

  function updateCardTilt(event) {
    if (shouldReduceMotion || event.pointerType !== 'mouse') return

    const bounds = event.currentTarget.getBoundingClientRect()
    const x = (event.clientX - bounds.left) / bounds.width - 0.5
    const y = (event.clientY - bounds.top) / bounds.height - 0.5
    tiltX.set(y * -6)
    tiltY.set(x * 6)
  }

  function resetCardTilt() {
    tiltX.set(0)
    tiltY.set(0)
  }

  return (
    <Reveal
      as="section"
      className="about-page"
      id="about"
    >
      <Reveal as="header" className="about-heading section-heading" stagger>
        <RevealItem as="p" className="section-kicker">
          // ABOUT ME
        </RevealItem>
        <RevealItem as="h1">Translating code into real-world solutions.</RevealItem>
      </Reveal>
      <div className="about-layout">
        <Reveal
          as="aside"
          className="profile-card"
          lift={3}
          stagger
          onPointerMove={updateCardTilt}
          onPointerLeave={resetCardTilt}
          style={{ rotateX: tiltX, rotateY: tiltY, transformPerspective: 900 }}
        >
          <RevealItem
            as="button"
            type="button"
            className="profile-image"
            aria-label="View a larger portrait of Justin Ric Siachongco"
            onClick={() => setIsImageOpen(true)}
            ref={profileImageButtonRef}
          >
            <img src={`${assets}figma-about-portrait.png`} alt="Justin Ric Siachongco" />
          </RevealItem>
          <div className="student-info">
            <RevealItem as="h2">Computer Science student</RevealItem>
            <RevealItem as="p">
              Currently building modern software with a focus on clean code, performant systems,
              and user-friendly interfaces.
            </RevealItem>
            <RevealItem className="interest-list">
              <p className="mono-label">Interests</p>
              <div className="interest-tags">
                {['Programming', 'Web Development', 'Software Development', 'UI/UX'].map(
                  (interest) => (
                    <span className="interest-tag" key={interest}>
                      {interest}
                    </span>
                  ),
                )}
              </div>
            </RevealItem>
          </div>
        </Reveal>

        <div className="about-details">
          <Reveal
            as="section"
            className="bio-card"
            aria-label="About Justin"
            delay={0.1}
            lift={2}
            stagger
          >
            <div>
              <p className="mono-label">Introduction</p>
              <p>
                I am a second-year Computer Science student with a good understanding of software development. I 
                study programming, algorithms, and computer systems while creating applications that are useful and 
                easy to use.
              </p>
            </div>
            <div>
              <p className="mono-label">Personal description</p>
              <p>
                I am interested in building fast and reliable systems and creating clean,
                user-friendly websites. I always aim to write better code,
                improve my skills, and learn from experienced developers.
              </p>
            </div>
          </Reveal>

          <div className="about-lower">
            <Reveal
              as="section"
              className="journey"
              aria-labelledby="journey-title"
              delay={0.12}
              stagger
            >
              <RevealItem as="h2" id="journey-title">
                My Journey
              </RevealItem>
              <RevealItem className="journey-item">
                <RevealItem
                  className="journey-icon"
                  scaleIn
                  delay={0.12}
                >
                  <img
                    className="journey-sprite journey-sprite-education"
                    src={`${assets}figma-about-icons.png`}
                    alt=""
                  />
                </RevealItem>
                <div>
                  <h3>Education</h3>
                  <p className="journey-main">Holy Angel University</p>
                  <p className="journey-sub">Bachelor of Science in Computer Science</p>
                  <p className="journey-caption">College Department</p>
                </div>
              </RevealItem>
              <RevealItem className="journey-item">
                <RevealItem
                  className="journey-icon"
                  scaleIn
                  delay={0.12}
                >
                  <img
                    className="journey-sprite journey-sprite-experience"
                    src={`${assets}figma-about-icons.png`}
                    alt=""
                  />
                </RevealItem>
                <div>
                  <h3>Experience</h3>
                  <p className="journey-main">Academic &amp; Personal Projects</p>
                  <p className="journey-sub">Developing projects to strengthen my programming</p>
                  <p className="journey-caption">
                    Java
                    <br />
                    Python
                    <br />
                    HTML/CSS
                    <br />
                    Figma
                    <br />
                    Java
                  </p>
                </div>
              </RevealItem>
            </Reveal>

            <Reveal
              as="section"
              className="learning"
              aria-labelledby="learning-title"
              delay={0.2}
              stagger
            >
              <RevealItem as="h2" id="learning-title">
                Currently Learning
              </RevealItem>
              <RevealItem as="ol" stagger>
                <RevealItem as="li" fromLeft>
                  <span>
                    <RevealItem as="span" className="learning-number" scaleIn>
                      01
                    </RevealItem>{' '}
                    — Web Development
                  </span>
                  <small>HTML, CSS, and JavaScript</small>
                </RevealItem>
                <RevealItem as="li" fromLeft>
                  <span>
                    <RevealItem as="span" className="learning-number" scaleIn>
                      02
                    </RevealItem>{' '}
                    — Programming
                  </span>
                  <small>Java, Python, and Object-Oriented Programming</small>
                </RevealItem>
                <RevealItem as="li" fromLeft>
                  <span>
                    <RevealItem as="span" className="learning-number" scaleIn>
                      03
                    </RevealItem>{' '}
                    — UI/UX Design
                  </span>
                  <small>Figma, prototyping, and user-centered design</small>
                </RevealItem>
                <RevealItem as="li" fromLeft>
                  <span>
                    <RevealItem as="span" className="learning-number" scaleIn>
                      04
                    </RevealItem>{' '}
                    — Data &amp; Databases
                  </span>
                  <small>Data structures, MongoDB, and MySQL</small>
                </RevealItem>
              </RevealItem>
            </Reveal>
          </div>
        </div>
      </div>
      {isImageOpen &&
        createPortal(
          <div
            className="profile-lightbox"
            role="presentation"
            onClick={() => setIsImageOpen(false)}
          >
            <div
              className="profile-lightbox-dialog"
              role="dialog"
              aria-modal="true"
              aria-label="Portrait of Justin Ric Siachongco"
              onClick={(event) => event.stopPropagation()}
            >
              <button
                className="profile-lightbox-close"
                type="button"
                aria-label="Close portrait"
                onClick={() => setIsImageOpen(false)}
                ref={lightboxCloseButtonRef}
              >
                <span aria-hidden="true">×</span>
              </button>
              <img
                className="profile-lightbox-image"
                src={`${assets}figma-about-portrait.png`}
                alt="Enlarged portrait of Justin Ric Siachongco"
              />
            </div>
          </div>,
          document.body,
        )}
    </Reveal>
  )
}

function ProjectsPage() {
  return (
    <Reveal
      as="section"
      className="projects-page"
      id="projects"
    >
      <Reveal as="header" className="section-heading projects-heading" stagger>
        <RevealItem as="p" className="section-kicker">
          // MY PORTFOLIO
        </RevealItem>
        <RevealItem as="h1">Featured Projects</RevealItem>
        <RevealItem as="p" className="section-description">
          A curated list of core software projects constructed as part of academic coursework or
          independent practice.
        </RevealItem>
      </Reveal>
      <Reveal as="article" className="project-card" delay={0.12} lift={3} stagger>
        <RevealItem className="project-card-top">
          <img className="project-folder-icon" src={`${assets}figma-project-folder.svg`} alt="" />
          <a
            className="project-external-link"
            href={githubProfile}
            aria-label="Open Justin's GitHub projects"
            target="_blank"
            rel="noreferrer"
          >
            <img src={`${assets}figma-project-external.svg`} alt="" />
          </a>
        </RevealItem>
        <RevealItem className="project-copy">
          <h2>Pickleball Club Website</h2>
          <p>
            A modern website designed for a community pickleball club with open play, training, and
            court booking features.
          </p>
        </RevealItem>
        <RevealItem className="project-footer">
          <div className="technology-tags" aria-label="Technologies">
            <span>HTML</span>
            <span>CSS</span>
          </div>
          <a className="project-link" href={githubProfile} target="_blank" rel="noreferrer">
            View Project <span aria-hidden="true">→</span>
          </a>
        </RevealItem>
      </Reveal>
    </Reveal>
  )
}

function SkillsPage() {
  return (
    <section className="skills-page" id="skills">
      <Reveal as="header" className="skills-heading" stagger>
        <RevealItem as="h1">MY SKILLS</RevealItem>
        <RevealItem as="h2">Technologies &amp; Skills</RevealItem>
        <RevealItem as="p">
          Tools and technologies I'm learning and using to build digital experiences.
        </RevealItem>
      </Reveal>
      <div className="skills-grid">
        {skillGroups.map((group, index) => (
          <Reveal
            as="article"
            className={`skill-card skill-card-${group.icon}`}
            key={group.title}
            delay={index * 0.07}
            lift={4}
            stagger
          >
            <RevealItem className={`skill-sprite skill-sprite-${group.icon}`} aria-hidden="true">
              <img src={`${assets}figma-skills-icons.png`} alt="" />
            </RevealItem>
            <RevealItem as="h2">{group.title}</RevealItem>
            <ul>
              {group.technologies.map((technology, technologyIndex) => (
                <RevealItem as="li" key={technology} delay={technologyIndex * 0.06}>
                  {technology}
                </RevealItem>
              ))}
            </ul>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

function ContactPage() {
  function handleSubmit(event) {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const name = formData.get('name')
    const email = formData.get('email')
    const message = formData.get('message')
    const subject = encodeURIComponent(`Portfolio message from ${name}`)
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`)

    window.location.href = `mailto:${contactEmail}?subject=${subject}&body=${body}`
  }

  return (
    <Reveal as="section" className="contact-main" id="contact" stagger>
        <Reveal
          as="section"
          className="contact-copy"
          aria-labelledby="contact-title"
          stagger
        >
          <header className="section-heading">
            <RevealItem as="p" className="section-kicker">
              // GET IN TOUCH
            </RevealItem>
            <RevealItem as="h1" id="contact-title">
              Let's build something together
            </RevealItem>
            <RevealItem as="p" className="section-description">
              I am currently seeking software development internships. Whether you want
              to discuss a project idea or just say hello, drop me a message!
            </RevealItem>
          </header>
          <Reveal className="contact-details" delay={0.08} stagger>
            <RevealItem as="a" href={`mailto:${contactEmail}`}>
              <img src={`${assets}figma-contact-email.svg`} alt="" />
              <span>{contactEmail}</span>
            </RevealItem>
            <RevealItem as="a" href={githubProfile} target="_blank" rel="noreferrer">
              <img src={`${assets}figma-contact-github.svg`} alt="" />
              <span>github.com/justin-ric</span>
            </RevealItem>
          </Reveal>
        </Reveal>
        <Reveal
          as="form"
          className="contact-form"
          onSubmit={handleSubmit}
          delay={0.14}
          stagger
        >
          <RevealItem className="form-row">
            <RevealItem as="label">
              <span>Name</span>
              <input name="name" type="text" placeholder="Jane Doe" autoComplete="name" required />
            </RevealItem>
            <RevealItem as="label" delay={0.06}>
              <span>Email</span>
              <input
                name="email"
                type="email"
                placeholder="jane@example.com"
                autoComplete="email"
                required
              />
            </RevealItem>
          </RevealItem>
          <RevealItem as="label">
            <span>Message</span>
            <textarea
              name="message"
              placeholder="Hey Justin, I would love to connect and discuss..."
              required
            />
          </RevealItem>
          <RevealItem as="button" className="send-button" type="submit">
            <span>Send Message</span>
            <img src={`${assets}figma-contact-send.svg`} alt="" />
          </RevealItem>
        </Reveal>
    </Reveal>
  )
}

function getPageFromHash() {
  const requestedPage = window.location.hash.slice(1)
  return pages.some((page) => page.id === requestedPage) ? requestedPage : 'home'
}

function App() {
  const [activePage, setActivePage] = useState(getPageFromHash)

  useEffect(() => {
    function syncPageWithHash() {
      setActivePage(getPageFromHash())
    }

    const header = document.querySelector('.site-header')
    let scrollFrame = 0

    function syncPageWithScroll() {
      window.cancelAnimationFrame(scrollFrame)
      scrollFrame = window.requestAnimationFrame(() => {
        const headerHeight = header?.offsetHeight ?? 0
        const activationLine = headerHeight + window.innerHeight * 0.45
        const visiblePage = pages
          .map((page) => ({
            id: page.id,
            bounds: document.getElementById(page.id)?.getBoundingClientRect(),
          }))
          .filter(
            ({ bounds }) =>
              bounds && bounds.top <= activationLine && bounds.bottom > headerHeight,
          )
          .at(-1)

        if (visiblePage) setActivePage(visiblePage.id)
      })
    }

    window.addEventListener('hashchange', syncPageWithHash)
    window.addEventListener('scroll', syncPageWithScroll, { passive: true })
    window.addEventListener('resize', syncPageWithScroll)
    syncPageWithScroll()

    const requestedPage = window.location.hash.slice(1)
    if (pages.some((page) => page.id === requestedPage)) {
      window.requestAnimationFrame(() => {
        document.getElementById(requestedPage)?.scrollIntoView({ block: 'start' })
      })
    }

    return () => {
      window.removeEventListener('hashchange', syncPageWithHash)
      window.removeEventListener('scroll', syncPageWithScroll)
      window.removeEventListener('resize', syncPageWithScroll)
      window.cancelAnimationFrame(scrollFrame)
    }
  }, [])

  return (
    <>
      <Navigation activePage={activePage} />
      <main className="portfolio-sections">
        <HomePage />
        <AboutPage />
        <ProjectsPage />
        <SkillsPage />
        <ContactPage />
      </main>
      <Reveal as="footer" className="site-footer" id="footer">
        <p>© 2025 Justin. Built with clean architecture.</p>
        <nav aria-label="Social links">
          <a href={githubProfile} target="_blank" rel="noreferrer">
            [GitHub]
          </a>
          <a href="https://www.linkedin.com/in/justin-ric-siachongco-95397842a/?isSelfProfile=true" target="_blank" rel="noreferrer">
            [LinkedIn]
          </a>
          <a href="https://www.instagram.com/justinsiachongco/?hl=en" target="_blank" rel="noreferrer">
            [Intagram]
          </a>
        </nav>
      </Reveal>
    </>
  )
}

export default App

import { useCallback, useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import {
  FaHtml5,
  FaCss3Alt,
  FaJs,
  FaReact,
  FaGithub,
  FaLinkedin,
  FaEnvelope,
} from 'react-icons/fa'
import { FiMenu, FiX } from 'react-icons/fi'

const navLinks = [
  { href: '#home', label: 'Home' },
  { href: '#about', label: 'About' },
  { href: '#skills', label: 'Skills' },
  { href: '#contact', label: 'Contact' },
]

const skills = [
  { name: 'HTML', icon: FaHtml5 },
  { name: 'CSS', icon: FaCss3Alt },
  { name: 'JavaScript', icon: FaJs },
  { name: 'React', icon: FaReact },
]

const fadeIn = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, ease: 'easeOut' },
}

function App() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  })
  const [formStatus, setFormStatus] = useState({
    type: 'idle',
    message: '',
  })
  const [isSubmitting, setSubmitting] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  const handleScrollToContact = useCallback(() => {
    const target = document.querySelector('#contact')
    target?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [])

  const handleChange = useCallback((event) => {
    const { name, value } = event.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }, [])

  const handleSubmit = useCallback(
    async (event) => {
      event.preventDefault()
      if (isSubmitting) return

      setSubmitting(true)
      setFormStatus({ type: 'idle', message: '' })

      try {
        const formPayload = new FormData()
        formPayload.append('name', formData.name)
        formPayload.append('email', formData.email)
        formPayload.append('message', formData.message)

        const response = await fetch(
          'https://formsubmit.co/ajax/3ef92521740c6323fb16e54348121f95',
          {
            method: 'POST',
            body: formPayload,
            headers: {
              Accept: 'application/json',
            },
          },
        )

        if (!response.ok) {
          throw new Error('Unable to send message right now.')
        }
        const result = await response.json()
        if (!(result.success === true || result.success === 'true')) {
          throw new Error(result.message || 'Unable to send message right now.')
        }

        setFormStatus({
          type: 'success',
          message:
            result.message ||
            'Thanks for reaching out! Your message was sent successfully.',
        })
        setFormData({ name: '', email: '', message: '' })
      } catch (error) {
        setFormStatus({
          type: 'error',
          message:
            error.message ||
            'Something went wrong. Please try again in a moment.',
        })
      } finally {
        setSubmitting(false)
      }
    },
    [formData, isSubmitting],
  )

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMenuOpen(false)
      }
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  return (
    <div className="bg-surface text-gray-100 min-h-screen">
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 bg-surface/70 backdrop-blur">
        <nav className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
          <motion.a
            href="#home"
            className="text-lg font-semibold tracking-wide text-white"
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            Nikhil Kanaujia
          </motion.a>
          <div className="hidden gap-6 text-sm font-medium md:flex">
            {navLinks.map((link) => (
              <motion.a
                key={link.href}
                href={link.href}
                className="text-gray-300 transition hover:text-accent"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {link.label}
              </motion.a>
            ))}
          </div>
          <motion.button
            type="button"
            aria-label="Toggle navigation menu"
            aria-expanded={menuOpen}
            className="md:hidden rounded-full border border-white/10 p-2 text-gray-200 transition hover:border-accent hover:text-white"
            whileTap={{ scale: 0.92 }}
            onClick={() => setMenuOpen((prev) => !prev)}
          >
            {menuOpen ? <FiX size={22} /> : <FiMenu size={22} />}
          </motion.button>
        </nav>
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              className="md:hidden border-t border-white/10 bg-surface/95 px-6 pb-6 pt-2 backdrop-blur"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25, ease: 'easeInOut' }}
            >
              <div className="flex flex-col gap-3 pt-4 text-sm font-medium text-gray-300">
                {navLinks.map((link) => (
                  <motion.a
                    key={link.href}
                    href={link.href}
                    className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-center transition hover:border-accent hover:text-white"
                    whileTap={{ scale: 0.97 }}
                    onClick={() => setMenuOpen(false)}
                  >
                    {link.label}
                  </motion.a>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <main className="mx-auto flex max-w-5xl flex-col gap-32 px-6 pt-28 pb-20 sm:pt-32">
        <section
          id="home"
          className="min-h-[75vh] scroll-mt-28 sm:scroll-mt-32 flex flex-col justify-center"
        >
          <motion.div
            className="space-y-6 text-center sm:text-left"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <motion.p
              className="text-sm uppercase tracking-[0.35em] text-accent/80"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Frontend Developer
            </motion.p>
            <motion.h1
              className="text-4xl font-semibold text-white sm:text-5xl lg:text-6xl"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3, ease: 'easeOut' }}
            >
              Nikhil Kanaujia
            </motion.h1>
            <motion.h2
              className="text-xl font-medium text-gray-300 sm:text-2xl"
              {...fadeIn}
              transition={{ ...fadeIn.transition, delay: 0.45 }}
            >
              B.Tech 3rd Year Student | Frontend Developer
            </motion.h2>
            <motion.p
              className="max-w-xl text-base text-gray-400 sm:text-lg"
              {...fadeIn}
              transition={{ ...fadeIn.transition, delay: 0.6 }}
            >
              Passionate about building modern and responsive web experiences.
            </motion.p>
            <motion.div
              className="flex flex-col gap-3 sm:flex-row sm:items-center"
              {...fadeIn}
              transition={{ ...fadeIn.transition, delay: 0.75 }}
            >
              <button
                onClick={handleScrollToContact}
                className="flex items-center justify-center rounded-full bg-accent px-6 py-3 text-sm font-semibold text-white transition hover:shadow-glow"
              >
                Contact Me
              </button>
              <div className="flex gap-4 text-lg text-gray-400">
                {skills.slice(0, 3).map((skill, index) => {
                  const Icon = skill.icon
                  return (
                    <motion.span
                      key={skill.name}
                      className="rounded-full border border-white/10 bg-white/5 p-3"
                      whileHover={{ scale: 1.1, y: -4 }}
                      transition={{ type: 'spring', stiffness: 200 }}
                    >
                      <Icon className={index === 2 ? 'text-yellow-300' : ''} />
                    </motion.span>
                  )
                })}
              </div>
            </motion.div>
          </motion.div>
        </section>

        <section
          id="about"
          className="scroll-mt-28 sm:scroll-mt-32 space-y-6"
        >
          <motion.h2
            className="text-3xl font-semibold text-white"
            {...fadeIn}
          >
            About Me
          </motion.h2>
          <motion.p
            className="max-w-3xl text-lg leading-relaxed text-gray-400"
            {...fadeIn}
            transition={{ ...fadeIn.transition, delay: 0.2 }}
          >
            I’m Nikhil Kanaujia, a B.Tech 3rd year student passionate about
            frontend development. My tech stack includes HTML, CSS, JavaScript,
            and React. I enjoy learning new technologies and creating clean,
            user-friendly interfaces.
          </motion.p>
        </section>

        <section
          id="skills"
          className="scroll-mt-28 sm:scroll-mt-32 space-y-8"
        >
          <motion.h2
            className="text-3xl font-semibold text-white"
            {...fadeIn}
          >
            Skills
          </motion.h2>
          <motion.div
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            transition={{ staggerChildren: 0.12 }}
          >
            {skills.map((skill) => {
              const Icon = skill.icon
              return (
                <motion.div
                  key={skill.name}
                  className="group rounded-2xl border border-white/10 bg-white/[0.05] p-6 text-center shadow-lg shadow-black/30 transition"
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0 },
                  }}
                  whileHover={{ y: -6 }}
                >
                  <motion.div
                    className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-accent/50 bg-accent/10 text-3xl text-accent transition group-hover:border-accent group-hover:bg-accent/20 group-hover:text-white"
                    whileHover={{ scale: 1.08 }}
                  >
                    <Icon />
                  </motion.div>
                  <p className="mt-4 text-sm font-semibold uppercase tracking-wide text-gray-300">
                    {skill.name}
                  </p>
                </motion.div>
              )
            })}
          </motion.div>
        </section>

        <section
          id="contact"
          className="scroll-mt-28 sm:scroll-mt-32 space-y-10"
        >
          <motion.h2
            className="text-3xl font-semibold text-white"
            {...fadeIn}
          >
            Contact Me
          </motion.h2>
          <motion.div
            className="space-y-8 rounded-3xl border border-white/10 bg-white/[0.04] p-8 shadow-xl shadow-black/30"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7 }}
          >
            <form className="space-y-5" onSubmit={handleSubmit}>
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="name"
                  className="text-sm font-medium uppercase tracking-wide text-gray-300"
                >
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Your name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="rounded-xl border border-white/10 bg-surface-light/60 px-4 py-3 text-sm text-white placeholder:text-gray-500 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/40"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="email"
                  className="text-sm font-medium uppercase tracking-wide text-gray-300"
                >
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="rounded-xl border border-white/10 bg-surface-light/60 px-4 py-3 text-sm text-white placeholder:text-gray-500 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/40"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="message"
                  className="text-sm font-medium uppercase tracking-wide text-gray-300"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows="4"
                  placeholder="Tell me about your project..."
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="rounded-xl border border-white/10 bg-surface-light/60 px-4 py-3 text-sm text-white placeholder:text-gray-500 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/40"
                />
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full rounded-full bg-accent px-6 py-3 text-sm font-semibold text-white transition hover:shadow-glow disabled:cursor-not-allowed disabled:opacity-70"
              >
                {isSubmitting ? 'Sending...' : 'Submit'}
              </button>
              {formStatus.message && (
                <p
                  className={`text-sm ${
                    formStatus.type === 'success'
                      ? 'text-green-400'
                      : 'text-red-400'
                  }`}
                >
                  {formStatus.message}
                </p>
              )}
            </form>
            <div className="space-y-4">
              <p className="text-base text-gray-400">
                Interested in collaborating or have a question? Reach out via
                the form or connect with me on social platforms.
              </p>
              <div className="flex gap-4 text-2xl text-gray-300">
                <motion.a
                  href="https://github.com/NikhilKanaujia"
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full border border-white/10 bg-white/5 p-3 transition hover:text-white"
                  whileHover={{ scale: 1.1, boxShadow: '0 0 20px rgba(99, 102, 241, 0.45)' }}
                >
                  <FaGithub />
                </motion.a>
                <motion.a
                  href="https://www.linkedin.com/in/nikhil-kanaujia/"
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full border border-white/10 bg-white/5 p-3 transition hover:text-white"
                  whileHover={{ scale: 1.1, boxShadow: '0 0 20px rgba(99, 102, 241, 0.45)' }}
                >
                  <FaLinkedin />
                </motion.a>
                <motion.a
                  href="mailto:nikhilkanaujia.dev@gmail.com"
                  className="rounded-full border border-white/10 bg-white/5 p-3 transition hover:text-white"
                  whileHover={{ scale: 1.1, boxShadow: '0 0 20px rgba(99, 102, 241, 0.45)' }}
                >
                  <FaEnvelope />
                </motion.a>
              </div>
            </div>
            <p className="text-sm text-gray-500">
              © 2025 Nikhil Kanaujia | Built with React + Tailwind CSS
            </p>
          </motion.div>
        </section>
      </main>
    </div>
  )
}

export default App

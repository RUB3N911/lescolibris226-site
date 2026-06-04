import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Mail, MessageCircle, Send } from "lucide-react"
import { supabase } from "../lib/supabase"

const inputClass =
  "rounded-2xl border border-white/10 bg-black/40 px-5 py-4 outline-none focus:border-yellow-500"

export default function Contact() {
  const [settings, setSettings] = useState(null)
  const [sending, setSending] = useState(false)
  const [success, setSuccess] = useState(false)
  const [message, setMessage] = useState("")

  const [form, setForm] = useState({
    firstname: "",
    email: "",
    subject: "",
    message: "",
  })

  useEffect(() => {
    fetchSettings()
  }, [])

  const fetchSettings = async () => {
    const { data, error } = await supabase
      .from("site_settings")
      .select("*")
      .eq("id", 1)
      .single()

    if (!error) setSettings(data)
  }

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    })

    setSuccess(false)
    setMessage("")
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSending(true)
    setSuccess(false)
    setMessage("")

    const { error } = await supabase.from("contact_messages").insert([
      {
        firstname: form.firstname,
        email: form.email,
        subject: form.subject,
        message: form.message,
        status: "new",
      },
    ])

    setSending(false)

    if (error) {
      setMessage("Erreur lors de l’envoi du message.")
      return
    }

    setSuccess(true)
    setForm({
      firstname: "",
      email: "",
      subject: "",
      message: "",
    })
  }

  const email = settings?.email || "lescolibris972mv@hotmail.fr"
  const whatsapp = settings?.whatsapp || "https://wa.me/596696298921"

  return (
    <section
      id="contact"
      className="relative overflow-hidden bg-black px-6 py-32 text-white"
    >
      <div className="absolute left-0 top-20 h-96 w-96 rounded-full bg-yellow-500/10 blur-3xl" />

      <div className="relative z-10 mx-auto grid max-w-7xl gap-12 md:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <p className="mb-4 text-sm uppercase tracking-[0.35em] text-yellow-500">
            Contact
          </p>

          <h2 className="text-4xl font-black md:text-6xl">
            Écris-nous pour rejoindre, soutenir ou inviter les Colibris.
          </h2>

          <p className="mt-6 text-lg leading-8 text-white/65">
            Musicien, bénévole, sponsor, institution ou simple amoureux de la
            culture : nous serons heureux d’échanger avec toi.
          </p>

          <div className="mt-10 flex flex-col gap-4">
            {email && (
              <a
                href={`mailto:${email}`}
                className="flex items-center gap-3 text-white/70"
              >
                <Mail size={22} />
                {email}
              </a>
            )}

            {whatsapp && (
              <a
                href={whatsapp}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-3 text-white/70"
              >
                <MessageCircle size={22} />
                WhatsApp
              </a>
            )}
          </div>
        </motion.div>

        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-8 backdrop-blur-xl"
        >
          <div className="grid gap-5">
            <input
              name="firstname"
              value={form.firstname}
              onChange={handleChange}
              required
              className={inputClass}
              placeholder="Nom complet"
            />

            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              className={inputClass}
              placeholder="Email"
            />

            <input
              name="subject"
              value={form.subject}
              onChange={handleChange}
              required
              className={inputClass}
              placeholder="Objet"
            />

            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              required
              className="min-h-40 rounded-2xl border border-white/10 bg-black/40 px-5 py-4 outline-none focus:border-yellow-500"
              placeholder="Message"
            />

            <button
              type="submit"
              disabled={sending}
              className="inline-flex items-center justify-center gap-3 rounded-full bg-yellow-500 px-8 py-4 font-bold text-black transition hover:scale-105 disabled:opacity-50"
            >
              {sending ? "Envoi..." : "Envoyer le message"}
              <Send size={20} />
            </button>

            {success && (
              <p className="text-green-400">
                Votre message a bien été envoyé.
              </p>
            )}

            {message && <p className="text-red-400">{message}</p>}
          </div>
        </motion.form>
      </div>
    </section>
  )
}
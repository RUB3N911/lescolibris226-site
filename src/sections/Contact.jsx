import { motion } from "framer-motion"
import { Mail, MessageCircle, Send } from "lucide-react"

export default function Contact() {
  return (
    <section id="contact" className="relative overflow-hidden bg-black px-6 py-32 text-white">
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
            Musicien, bénévole, sponsor, institution ou simple amoureux de la culture :
            nous serons heureux d’échanger avec toi.
          </p>

          <div className="mt-10 flex flex-col gap-4">
            <a href="mailto:contact@lescolibris226.com" className="flex items-center gap-3 text-white/70">
              <Mail size={22} /> contact@lescolibris226.com
            </a>

            <a href="https://wa.me/596000000000" className="flex items-center gap-3 text-white/70">
              <MessageCircle size={22} /> WhatsApp
            </a>
          </div>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-8 backdrop-blur-xl"
        >
          <div className="grid gap-5">
            <input className="rounded-2xl border border-white/10 bg-black/40 px-5 py-4 outline-none focus:border-yellow-500" placeholder="Nom complet" />
            <input className="rounded-2xl border border-white/10 bg-black/40 px-5 py-4 outline-none focus:border-yellow-500" placeholder="Email" />
            <input className="rounded-2xl border border-white/10 bg-black/40 px-5 py-4 outline-none focus:border-yellow-500" placeholder="Objet" />
            <textarea className="min-h-40 rounded-2xl border border-white/10 bg-black/40 px-5 py-4 outline-none focus:border-yellow-500" placeholder="Message" />

            <button type="button" className="inline-flex items-center justify-center gap-3 rounded-full bg-yellow-500 px-8 py-4 font-bold text-black transition hover:scale-105">
              Envoyer le message <Send size={20} />
            </button>
          </div>
        </motion.form>
      </div>
    </section>
  )
}
import { motion } from "framer-motion"
import { whatsappGeneral } from "../lib/links"
import {
  Mail,
  Phone,
  MapPin,
  Camera,
  MessageCircle,
} from "lucide-react"

export default function Contact() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-black px-6 pb-24 pt-32 text-white">
      {/* BACKGROUND GLOWS */}
      <div className="absolute left-0 top-20 h-96 w-96 rounded-full bg-yellow-500/10 blur-3xl" />
      <div className="absolute bottom-0 right-0 h-[500px] w-[500px] rounded-full bg-pink-500/10 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-7xl">
        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="max-w-4xl"
        >
          <p className="mb-4 text-sm uppercase tracking-[0.35em] text-yellow-500">
            Contact
          </p>

          <h1 className="text-5xl font-black leading-none md:text-7xl">
            Entrer en contact avec les Colibris.
          </h1>

          <p className="mt-8 max-w-2xl text-lg leading-8 text-white/65">
            Pour rejoindre l’association, proposer un partenariat, inviter le
            groupe à un événement ou soutenir un projet culturel.
          </p>
        </motion.div>

        {/* CONTENT */}
        <div className="mt-20 grid gap-10 lg:grid-cols-2">
          {/* LEFT SIDE */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-10 backdrop-blur-xl"
          >
            <h2 className="text-3xl font-bold">Informations</h2>

            <div className="mt-10 flex flex-col gap-8 text-white/75">
              <a
                href="mailto:Lescolibris972mv@hotmail.fr"
                className="flex items-center gap-4 transition hover:text-yellow-400"
              >
                <Mail size={24} />
                Lescolibris972mv@hotmail.fr
              </a>

              <a
                href="https://wa.me/596000000000"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-4 transition hover:text-yellow-400"
              >
                <MessageCircle size={24} />
                WhatsApp
              </a>

              <a
                href={whatsappGeneral}
                className="flex items-center gap-4 transition hover:text-yellow-400"
              >
                <Phone size={24} />
                +596 696 29 89 21
              </a>

              <div className="flex items-center gap-4">
                <MapPin size={24} />
                Morne-Vert, Martinique
              </div>

              <a
                href="https://www.instagram.com/les_colibris_226"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-4 transition hover:text-yellow-400"
              >
                <Camera size={24} />
                Instagram
              </a>
            </div>
          </motion.div>

          {/* FORM */}
          <motion.form
            action="https://formspree.io/f/mojryqbd"
            method="POST"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-10 backdrop-blur-xl"
          >
            <input
              type="hidden"
              name="_subject"
              value="Nouveau message depuis le site Les Colibris 226"
            />

            <div className="grid gap-6">
              <div>
                <label className="mb-2 block text-sm uppercase tracking-[0.2em] text-white/40">
                  Nom
                </label>

                <input
                  type="text"
                  name="name"
                  required
                  placeholder="Votre nom"
                  className="w-full rounded-2xl border border-white/10 bg-black/40 px-5 py-4 text-white outline-none transition focus:border-yellow-500"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm uppercase tracking-[0.2em] text-white/40">
                  Email
                </label>

                <input
                  type="email"
                  name="email"
                  required
                  placeholder="Votre email"
                  className="w-full rounded-2xl border border-white/10 bg-black/40 px-5 py-4 text-white outline-none transition focus:border-yellow-500"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm uppercase tracking-[0.2em] text-white/40">
                  Sujet
                </label>

                <input
                  type="text"
                  name="subject"
                  required
                  placeholder="Sujet"
                  className="w-full rounded-2xl border border-white/10 bg-black/40 px-5 py-4 text-white outline-none transition focus:border-yellow-500"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm uppercase tracking-[0.2em] text-white/40">
                  Message
                </label>

                <textarea
                  name="message"
                  rows="6"
                  required
                  placeholder="Votre message..."
                  className="w-full rounded-2xl border border-white/10 bg-black/40 px-5 py-4 text-white outline-none transition focus:border-yellow-500"
                />
              </div>

              <button
                type="submit"
                className="mt-4 rounded-full bg-yellow-500 px-8 py-4 font-bold text-black transition hover:scale-105"
              >
                Envoyer le message
              </button>
            </div>
          </motion.form>
        </div>
      </div>
    </main>
  )
}

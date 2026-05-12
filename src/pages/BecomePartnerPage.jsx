import { motion } from "framer-motion"
import { Building2, Handshake, Send } from "lucide-react"

export default function BecomePartnerPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-black px-6 pb-24 pt-32 text-white">
      <div className="absolute left-0 top-24 h-96 w-96 rounded-full bg-yellow-500/10 blur-3xl" />
      <div className="absolute bottom-0 right-0 h-[500px] w-[500px] rounded-full bg-cyan-500/10 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl"
        >
          <p className="mb-4 text-sm uppercase tracking-[0.35em] text-yellow-500">
            Devenir partenaire
          </p>

          <h1 className="text-5xl font-black md:text-7xl">
            Construisons ensemble une dynamique culturelle forte.
          </h1>

          <p className="mt-6 max-w-3xl text-lg leading-8 text-white/65">
            Institution, entreprise, association ou acteur culturel : proposez
            une collaboration avec Les Colibris 226 et participez au rayonnement
            du Morne-Vert.
          </p>
        </motion.div>

        <div className="mt-16 grid gap-6 md:grid-cols-2">
          <div className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-8 backdrop-blur-xl">
            <Building2 className="text-yellow-500" size={36} />
            <h2 className="mt-6 text-2xl font-black">Visibilité locale</h2>
            <p className="mt-4 leading-7 text-white/60">
              Associez votre image à une association culturelle reconnue,
              engagée et enracinée dans le territoire.
            </p>
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-8 backdrop-blur-xl">
            <Handshake className="text-yellow-500" size={36} />
            <h2 className="mt-6 text-2xl font-black">Impact culturel</h2>
            <p className="mt-4 leading-7 text-white/60">
              Soutenez des projets autour du carnaval, de la transmission, de
              la jeunesse et du lien social.
            </p>
          </div>
        </div>

        <motion.form
          action="https://formspree.io/f/mojryqbd"
          method="POST"
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-20 rounded-[2rem] border border-white/10 bg-white/[0.03] p-8 backdrop-blur-xl md:p-10"
        >
          <input
            type="hidden"
            name="_subject"
            value="Nouvelle proposition de partenariat - Les Colibris 226"
          />

          <div className="grid gap-6 md:grid-cols-2">
            <input
              type="text"
              name="structure"
              required
              placeholder="Nom de la structure"
              className="rounded-2xl border border-white/10 bg-black/40 px-5 py-4 outline-none focus:border-yellow-500"
            />

            <input
              type="text"
              name="contact"
              required
              placeholder="Nom du contact"
              className="rounded-2xl border border-white/10 bg-black/40 px-5 py-4 outline-none focus:border-yellow-500"
            />

            <input
              type="email"
              name="email"
              required
              placeholder="Email"
              className="rounded-2xl border border-white/10 bg-black/40 px-5 py-4 outline-none focus:border-yellow-500"
            />

            <input
              type="tel"
              name="telephone"
              placeholder="Téléphone"
              className="rounded-2xl border border-white/10 bg-black/40 px-5 py-4 outline-none focus:border-yellow-500"
            />

            <select
              name="type_partenariat"
              required
              className="rounded-2xl border border-white/10 bg-black/40 px-5 py-4 outline-none focus:border-yellow-500 md:col-span-2"
            >
              <option value="">Type de partenariat</option>
              <option value="Sponsor">Sponsor</option>
              <option value="Institution">Institution</option>
              <option value="Partenaire culturel">Partenaire culturel</option>
              <option value="Événementiel">Événementiel</option>
              <option value="Média">Média</option>
              <option value="Autre">Autre</option>
            </select>

            <textarea
              name="message"
              rows="6"
              required
              placeholder="Présentez votre proposition ou votre envie de collaboration..."
              className="rounded-2xl border border-white/10 bg-black/40 px-5 py-4 outline-none focus:border-yellow-500 md:col-span-2"
            />
          </div>

          <button
            type="submit"
            className="mt-8 inline-flex items-center gap-3 rounded-full bg-yellow-500 px-8 py-4 font-bold text-black transition hover:scale-105"
          >
            Envoyer la proposition
            <Send size={20} />
          </button>
        </motion.form>
      </div>
    </main>
  )
}
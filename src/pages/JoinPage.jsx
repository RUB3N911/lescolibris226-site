import { motion } from "framer-motion"
import { Music, Heart, Handshake, Send } from "lucide-react"

const options = [
  {
    icon: Music,
    title: "Musique",
    text: "Percussions, cuivres, rythme et énergie carnavalesque.",
  },
  {
    icon: Heart,
    title: "Bénévolat",
    text: "Organisation, logistique, accompagnement et vie associative.",
  },
  {
    icon: Handshake,
    title: "Partenariat",
    text: "Soutien, sponsoring, projets culturels et collaborations.",
  },
]

export default function JoinPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-black px-6 pb-24 pt-32 text-white">
      <div className="absolute left-0 top-24 h-96 w-96 rounded-full bg-yellow-500/10 blur-3xl" />
      <div className="absolute bottom-0 right-0 h-[500px] w-[500px] rounded-full bg-pink-500/10 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl"
        >
          <p className="mb-4 text-sm uppercase tracking-[0.35em] text-yellow-500">
            Rejoindre
          </p>

          <h1 className="text-5xl font-black md:text-7xl">
            Entrer dans l’aventure Colibris.
          </h1>

          <p className="mt-6 max-w-3xl text-lg leading-8 text-white/65">
            Musicien, bénévole, partenaire ou passionné de culture : laisse-nous
            tes informations pour rejoindre l’énergie des Colibris 226.
          </p>
        </motion.div>

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {options.map((option, index) => {
            const Icon = option.icon

            return (
              <motion.div
                key={option.title}
                initial={{ opacity: 0, y: 35 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.7 }}
                className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-8 backdrop-blur-xl"
              >
                <div className="mb-8 flex h-16 w-16 items-center justify-center rounded-2xl bg-yellow-500 text-black">
                  <Icon size={30} />
                </div>

                <h2 className="text-2xl font-black">{option.title}</h2>

                <p className="mt-4 leading-7 text-white/60">{option.text}</p>
              </motion.div>
            )
          })}
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
            value="Nouvelle demande pour rejoindre Les Colibris 226"
          />

          <div className="grid gap-6 md:grid-cols-2">
            <input
              type="text"
              name="prenom"
              required
              placeholder="Prénom"
              className="rounded-2xl border border-white/10 bg-black/40 px-5 py-4 outline-none focus:border-yellow-500"
            />

            <input
              type="text"
              name="nom"
              required
              placeholder="Nom"
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
              required
              placeholder="Téléphone"
              className="rounded-2xl border border-white/10 bg-black/40 px-5 py-4 outline-none focus:border-yellow-500"
            />

            <input
              type="text"
              name="commune"
              placeholder="Commune"
              className="rounded-2xl border border-white/10 bg-black/40 px-5 py-4 outline-none focus:border-yellow-500"
            />

            <input
              type="number"
              name="age"
              placeholder="Âge"
              className="rounded-2xl border border-white/10 bg-black/40 px-5 py-4 outline-none focus:border-yellow-500"
            />

            <select
              name="interet"
              required
              className="rounded-2xl border border-white/10 bg-black/40 px-5 py-4 outline-none focus:border-yellow-500 md:col-span-2"
            >
              <option value="">Domaine d’intérêt</option>
              <option value="Musique">Musique</option>
              <option value="Carnaval">Carnaval</option>
              <option value="Bénévolat">Bénévolat</option>
              <option value="Organisation">Organisation</option>
              <option value="Communication">Communication</option>
              <option value="Partenariat">Partenariat</option>
            </select>

            <textarea
              name="motivation"
              rows="6"
              required
              placeholder="Pourquoi souhaitez-vous rejoindre Les Colibris ?"
              className="rounded-2xl border border-white/10 bg-black/40 px-5 py-4 outline-none focus:border-yellow-500 md:col-span-2"
            />
          </div>

          <button
            type="submit"
            className="mt-8 inline-flex items-center gap-3 rounded-full bg-yellow-500 px-8 py-4 font-bold text-black transition hover:scale-105"
          >
            Envoyer ma demande
            <Send size={20} />
          </button>
        </motion.form>
      </div>
    </main>
  )
}
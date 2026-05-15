import { motion } from "framer-motion"
import { ArrowRight, Handshake, Mail } from "lucide-react"
import { Link } from "react-router-dom"

export default function FinalCTA() {
  return (
    <section className="relative overflow-hidden bg-black px-6 py-32 text-white">
      <div className="absolute left-0 top-0 h-96 w-96 rounded-full bg-yellow-500/10 blur-3xl" />
      <div className="absolute bottom-0 right-0 h-[500px] w-[500px] rounded-full bg-pink-500/10 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-6xl rounded-[2.5rem] border border-white/10 bg-white/[0.03] p-10 backdrop-blur-xl md:p-16">
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mx-auto max-w-4xl text-center"
        >
          <p className="mb-4 text-sm uppercase tracking-[0.35em] text-yellow-500">
            Les Colibris 226
          </p>

          <h2 className="text-4xl font-black md:text-6xl">
            Rejoignez l’énergie culturelle du Morne-Vert.
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-white/65">
            Association, partenaire, bénévole ou passionné de culture :
            participez à l’aventure des Colibris 226.
          </p>
        </motion.div>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {/* REJOINDRE */}
          <motion.div
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.7 }}
            className="rounded-[2rem] border border-white/10 bg-black/30 p-8 text-center"
          >
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-yellow-500 text-black">
              <ArrowRight size={30} />
            </div>

            <h3 className="mt-6 text-2xl font-black">
              Rejoindre
            </h3>

            <p className="mt-4 leading-7 text-white/60">
              Musique, carnaval, bénévolat et transmission culturelle.
            </p>

            <Link
              to="/join"
              className="mt-8 inline-flex items-center gap-3 rounded-full bg-yellow-500 px-6 py-3 font-bold text-black transition hover:scale-105"
            >
              Entrer dans l’aventure
            </Link>
          </motion.div>

          {/* PARTENARIAT */}
          <motion.div
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.7 }}
            className="rounded-[2rem] border border-white/10 bg-black/30 p-8 text-center"
          >
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-pink-500 text-black">
              <Handshake size={30} />
            </div>

            <h3 className="mt-6 text-2xl font-black">
              Partenariat
            </h3>

            <p className="mt-4 leading-7 text-white/60">
              Soutenez et accompagnez une dynamique culturelle locale.
            </p>

            <Link
              to="/become-partner"
              className="mt-8 inline-flex items-center gap-3 rounded-full bg-pink-500 px-6 py-3 font-bold text-black transition hover:scale-105"
            >
              Devenir partenaire
            </Link>
          </motion.div>

          {/* CONTACT */}
          <motion.div
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.7 }}
            className="rounded-[2rem] border border-white/10 bg-black/30 p-8 text-center"
          >
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-cyan-500 text-black">
              <Mail size={30} />
            </div>

            <h3 className="mt-6 text-2xl font-black">
              Contact
            </h3>

            <p className="mt-4 leading-7 text-white/60">
              Une question, une proposition ou un échange avec l’association.
            </p>

            <Link
              to="/contact"
              className="mt-8 inline-flex items-center gap-3 rounded-full bg-cyan-500 px-6 py-3 font-bold text-black transition hover:scale-105"
            >
              Nous contacter
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

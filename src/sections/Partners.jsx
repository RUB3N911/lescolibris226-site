import { motion } from "framer-motion"
import { Link } from "react-router-dom"
import { ArrowRight } from "lucide-react"

const partners = [
  {
    name: "Mairie du Morne-Vert",
    logo: "/images/partners/mairie-morne-vert.png",
  },
  {
    name: "Domaine Madinina",
    logo: "/images/partners/domaine-madinina.png",
  },
  {
    name: "S.P.O.R.T Équilibre",
    logo: "/images/partners/sport-equilibre.png",
  },
]

export default function Partners() {
  return (
    <section className="relative overflow-hidden bg-black px-6 py-28 text-white">
      <div className="absolute left-0 top-0 h-72 w-72 rounded-full bg-yellow-500/10 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl"
        >
          <p className="mb-4 text-sm uppercase tracking-[0.35em] text-yellow-500">
            Partenaires
          </p>

          <h2 className="text-4xl font-black md:text-6xl">
            Ils soutiennent notre énergie culturelle.
          </h2>

          <p className="mt-6 text-lg leading-8 text-white/65">
            Institutions, associations et acteurs locaux accompagnent Les
            Colibris 226 dans leurs projets culturels et associatifs.
          </p>
        </motion.div>

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {partners.map((partner, index) => (
            <motion.div
              key={partner.name}
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                delay: index * 0.1,
                duration: 0.7,
              }}
              className="group flex items-center justify-center rounded-[2rem] border border-white/10 bg-white p-10 transition hover:-translate-y-1 hover:border-yellow-500/40"
            >
              <img
                src={partner.logo}
                alt={partner.name}
                className="max-h-24 object-contain transition duration-500 group-hover:scale-105"
              />
            </motion.div>
          ))}
        </div>

        <div className="mt-14">
          <Link
            to="/partners"
            className="inline-flex items-center gap-3 rounded-full bg-yellow-500 px-8 py-4 font-bold text-black transition hover:scale-105"
          >
            Voir tous les partenaires
            <ArrowRight size={20} />
          </Link>
        </div>
      </div>
    </section>
  )
}
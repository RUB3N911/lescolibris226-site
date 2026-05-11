import { motion } from "framer-motion"
import { Link } from "react-router-dom"
import { Building2, Handshake, HeartHandshake, ArrowRight, ExternalLink } from "lucide-react"

const currentPartners = [
  {
    name: "Mairie du Morne-Vert",
    type: "Institution",
    logo: "/images/partners/mairie-morne-vert.png",
    text: "Partenaire institutionnel engagé dans le rayonnement culturel et associatif du Morne-Vert.",
    link: "https://www.morne-vert.fr/",
  },
  {
    name: "Domaine Madinina",
    type: "Sponsor local",
    logo: "/images/partners/domaine-madinina.png",
    text: "Resort, bar et restaurant situé au Morne-Vert.",
    link: "https://www.domaine-madinina.mq/",
  },
  {
    name: "Association S.P.O.R.T Équilibre",
    type: "Association partenaire",
    logo: "/images/partners/sport-equilibre.png",
    text: "Agir par le sport, la santé, l’éducation et la formation pour mieux-être.",
    link: "https://www.facebook.com/sporteequilibre",
  },
]

const partnerTypes = [
  {
    icon: Building2,
    title: "Institutions",
    text: "Accompagner des projets culturels, associatifs et territoriaux.",
  },
  {
    icon: Handshake,
    title: "Entreprises",
    text: "Associer votre image à une initiative culturelle forte et locale.",
  },
  {
    icon: HeartHandshake,
    title: "Acteurs culturels",
    text: "Créer des collaborations autour du carnaval, de la transmission et du territoire.",
  },
]

export default function PartnersPage() {
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
            Partenaires
          </p>

          <h1 className="text-5xl font-black md:text-7xl">
            Ensemble, faisons rayonner la culture.
          </h1>

          <p className="mt-6 max-w-3xl text-lg leading-8 text-white/65">
            Les Colibris 226 avancent avec celles et ceux qui croient en la
            force de la culture, du carnaval et de la transmission au
            Morne-Vert.
          </p>
        </motion.div>

        <section className="mt-20">
          <p className="mb-4 text-sm uppercase tracking-[0.35em] text-yellow-500">
            Ils nous accompagnent
          </p>

          <h2 className="text-4xl font-black md:text-5xl">
            Nos partenaires actuels.
          </h2>

          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {currentPartners.map((partner, index) => (
              <motion.div
                key={partner.name}
                initial={{ opacity: 0, y: 35 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.7 }}
                className="flex flex-col rounded-[2rem] border border-white/10 bg-white/[0.03] p-8 backdrop-blur-xl transition hover:-translate-y-1 hover:border-yellow-500/40"
              >
                <div className="flex items-center gap-6">
                  <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white p-4">
                    <img
                      src={partner.logo}
                      alt={partner.name}
                      className="max-h-full max-w-full object-contain"
                    />
                  </div>

                  <div>
                    <p className="text-sm uppercase tracking-[0.25em] text-yellow-400">
                      {partner.type}
                    </p>

                    <h3 className="mt-2 text-2xl font-black">
                      {partner.name}
                    </h3>
                  </div>
                </div>

                <p className="mt-6 flex-1 leading-7 text-white/60">
                  {partner.text}
                </p>

                <a
                  href={partner.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-8 inline-flex items-center gap-2 text-sm font-bold text-yellow-400 transition hover:gap-4 hover:text-yellow-300"
                >
                  Découvrir le partenaire
                  <ExternalLink size={16} />
                </a>
              </motion.div>
            ))}
          </div>
        </section>

        <section className="mt-24">
          <p className="mb-4 text-sm uppercase tracking-[0.35em] text-yellow-500">
            Pourquoi nous soutenir ?
          </p>

          <div className="grid gap-10 lg:grid-cols-2">
            <h2 className="text-4xl font-black md:text-5xl">
              Soutenir les Colibris, c’est soutenir un projet culturel vivant.
            </h2>

            <p className="text-lg leading-8 text-white/65">
              Votre soutien contribue à faire vivre les traditions, encourager
              la jeunesse, renforcer la cohésion locale et développer des
              projets culturels ambitieux autour du carnaval martiniquais.
            </p>
          </div>
        </section>

        <section className="mt-20 grid gap-6 md:grid-cols-3">
          {partnerTypes.map((item, index) => {
            const Icon = item.icon

            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.7 }}
                className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-8 backdrop-blur-xl"
              >
                <div className="mb-8 flex h-16 w-16 items-center justify-center rounded-2xl bg-yellow-500 text-black">
                  <Icon size={30} />
                </div>

                <h3 className="text-2xl font-black">{item.title}</h3>

                <p className="mt-4 leading-7 text-white/60">
                  {item.text}
                </p>
              </motion.div>
            )
          })}
        </section>

        <motion.section
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-24 rounded-[2rem] border border-yellow-500/30 bg-yellow-500/10 p-10 text-center"
        >
          <h2 className="text-3xl font-black md:text-5xl">
            Vous souhaitez devenir partenaire ?
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-white/65">
            Échangeons sur la manière dont votre structure peut accompagner Les
            Colibris 226 dans leurs projets culturels et associatifs.
          </p>

          <Link
            to="/contact"
            className="mt-8 inline-flex items-center gap-3 rounded-full bg-yellow-500 px-8 py-4 font-bold text-black transition hover:scale-105"
          >
            Proposer un partenariat
            <ArrowRight size={20} />
          </Link>
        </motion.section>
      </div>
    </main>
  )
}
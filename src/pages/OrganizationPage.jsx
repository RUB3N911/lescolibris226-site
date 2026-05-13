import { motion } from "framer-motion"

const bureau = [
  {
    role: "Président",
    name: "PELAGE Ruben",
    image: "/images/organization/president.jpg",
  },
  {
    role: "Vice-Présidente",
    name: "PAIN Juliana",
    image: "/images/organization/vice-president.jpg",
  },
  {
    role: "Trésorier",
    name: "PELAGE Luc",
    image: "/images/organization/tresorier.jpg",
  },
  {
    role: "Trésorière adjoint",
    name: "MAUVOIS-GENOT Pascale",
    image: "/images/organization/tresoriere-adjoint.jpg",
  },
  {
    role: "Secrétaire",
    name: "PELAGE Floriane",
    image: "/images/organization/secretaire.jpg",
  },
  {
    role: "Secrétaire adjointe",
    name: "PAIN MAIZEROI Meling",
    image: "/images/organization/secretaire-adjointe.jpg",
  },
  {
    role: "Assesseur",
    name: "PAIN Fabrice",
    image: "/images/organization/assesseur.jpg",
  },
]

const values = [
  "Transmission",
  "Culture",
  "Cohésion",
  "Mémoire",
  "Jeunesse",
]

export default function OrganizationPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-black px-6 pb-24 pt-32 text-white">
      <div className="absolute left-0 top-20 h-96 w-96 rounded-full bg-yellow-500/10 blur-3xl" />
      <div className="absolute bottom-0 right-0 h-[500px] w-[500px] rounded-full bg-pink-500/10 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-7xl">
        {/* HERO */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl"
        >
          <p className="mb-4 text-sm uppercase tracking-[0.35em] text-yellow-500">
            Organisation
          </p>

          <h1 className="text-5xl font-black md:text-7xl">
            Une équipe engagée au service de la culture.
          </h1>

          <p className="mt-6 max-w-3xl text-lg leading-8 text-white/65">
            Depuis plus de 25 ans, Les Colibris 226 avancent grâce à des femmes
            et des hommes investis dans la transmission culturelle et la vie
            associative du Morne-Vert.
          </p>
        </motion.div>

        {/* BUREAU */}
        <section className="mt-24">
          <p className="mb-4 text-sm uppercase tracking-[0.35em] text-yellow-500">
            Le bureau
          </p>

          <h2 className="text-4xl font-black md:text-5xl">
            Les piliers de l’association.
          </h2>

          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {bureau.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  delay: index * 0.1,
                  duration: 0.7,
                }}
                className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.03]"
              >
                <img
                  src={member.image}
                  alt={member.name}
                  className="h-[340px] w-full object-cover"
                />

                <div className="p-6">
                  <p className="text-sm uppercase tracking-[0.25em] text-yellow-400">
                    {member.role}
                  </p>

                  <h3 className="mt-3 text-2xl font-black">
                    {member.name}
                  </h3>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* VALUES */}
        <section className="mt-28">
          <p className="mb-4 text-sm uppercase tracking-[0.35em] text-yellow-500">
            Nos valeurs
          </p>

          <h2 className="text-4xl font-black md:text-5xl">
            Ce qui nous anime depuis 2001.
          </h2>

          <div className="mt-12 flex flex-wrap gap-4">
            {values.map((value) => (
              <div
                key={value}
                className="rounded-full border border-yellow-500/20 bg-yellow-500/10 px-6 py-3 text-lg font-bold text-yellow-400"
              >
                {value}
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  )
}
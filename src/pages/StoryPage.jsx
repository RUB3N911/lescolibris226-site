import { motion } from "framer-motion"

const timeline = [
  {
    year: "2000",
    title: "Naissance de l’idée",
    text: "Après un état des lieux des possibilités offertes au Morne-Vert, un groupe de jeunes décide de fonder une association culturelle et sportive.",
    image: "/images/story/2000.jpg",
  },
  {
    year: "2001",
    title: "Déclaration officielle",
    text: "L’association Les Colibris est déclarée en mai 2001, après avoir vu le jour en septembre 2000.",
    image: "/images/story/2001.jpg",
  },
  {
    year: "2004",
    title: "Création du groupe à pied",
    text: "Naissance du groupe à pied avec une première participation aux parades carnavalesques de Martinique.",
    image: "/images/story/2004.jpg",
  },
  {
    year: "2005",
    title: "Premiers échanges culturels",
    text: "Les échanges avec d’autres groupes culturels prennent forme, notamment avec Les Hibiscus de Guadeloupe.",
    image: "/images/story/2005.jpg",
  },
  {
    year: "2008 / 2013",
    title: "La France hexagonale",
    text: "Les Colibris participent à plusieurs événements et carnavals en France hexagonale.",
    image: "/images/story/2008-2013.jpg",
  },
  {
    year: "2015",
    title: "Zagreb, Croatie",
    text: "Les Colibris renforcent les liens culturels à l’international avec la formation croate Na Krilima.",
    image: "/images/story/2015.jpg",
  },
  {
    year: "2024",
    title: "Dix ans après",
    text: "Les majorettes croates reviennent accompagner Les Colibris dans plusieurs parades.",
    image: "/images/story/2024.jpg",
  },
]

export default function StoryPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-black px-6 pb-24 pt-32 text-white">
      <div className="absolute left-0 top-20 h-96 w-96 rounded-full bg-yellow-500/10 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl"
        >
          <p className="mb-4 text-sm uppercase tracking-[0.35em] text-yellow-500">
            Notre histoire
          </p>

          <h1 className="text-5xl font-black md:text-7xl">
            Une mémoire culturelle depuis 2001.
          </h1>

          <p className="mt-6 max-w-3xl text-lg leading-8 text-white/65">
            Les Colibris 226 racontent une histoire de transmission, de carnaval,
            de cohésion et de culture au Morne-Vert.
          </p>
        </motion.div>

        <div className="relative mt-28">
          <div className="absolute left-5 top-0 hidden h-full w-[2px] bg-white/10 md:block" />

          <div className="flex flex-col gap-24">
            {timeline.map((item, index) => (
              <motion.div
                key={item.year}
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.7 }}
                className="relative grid gap-10 md:grid-cols-2 md:gap-20"
              >
                <div className="absolute left-[13px] top-4 hidden h-4 w-4 rounded-full bg-yellow-500 md:block" />

                <div className="md:pl-16">
                  <p className="text-sm uppercase tracking-[0.35em] text-yellow-500">
                    {item.year}
                  </p>

                  <h2 className="mt-4 text-4xl font-black">{item.title}</h2>

                  <p className="mt-6 text-lg leading-8 text-white/65">
                    {item.text}
                  </p>
                </div>

                <motion.img
                  whileHover={{ scale: 1.03 }}
                  src={item.image}
                  alt={item.title}
                  className="h-[420px] w-full rounded-[2rem] object-cover"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}
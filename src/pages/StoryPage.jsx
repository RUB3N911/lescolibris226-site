import { motion } from "framer-motion"

export default function StoryPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-black px-6 pb-24 pt-32 text-white">
      <div className="absolute left-0 top-24 h-96 w-96 rounded-full bg-yellow-500/10 blur-3xl" />
      <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-cyan-500/10 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-7xl">
        <p className="mb-4 text-sm uppercase tracking-[0.35em] text-yellow-500">
          Notre histoire
        </p>

        <h1 className="text-5xl font-black md:text-7xl">
          Une vibration née au Morne-Vert.
        </h1>

        <p className="mt-6 max-w-3xl text-lg leading-8 text-white/65">
          Les Colibris 226 portent une énergie culturelle, musicale et humaine :
          celle d’un groupe qui rassemble, transmet et fait vivre le carnaval
          autrement.
        </p>

        <div className="mt-20 grid gap-10 lg:grid-cols-2">
          <motion.img
            src="/images/story/story-1.jpg"
            alt="Histoire Les Colibris 226"
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="h-full max-h-[620px] w-full rounded-[2rem] object-cover"
          />

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-10 backdrop-blur-xl"
          >
            <h2 className="text-3xl font-black">
              Énergie. Transmission. Culture.
            </h2>

            <p className="mt-6 leading-8 text-white/65">
              L’association Les Colibris du Morne-Vert s’inscrit dans une
              volonté de faire rayonner la culture locale, de rassembler les
              générations et de transmettre l’esprit du carnaval martiniquais.
            </p>

            <p className="mt-6 leading-8 text-white/65">
              À travers les répétitions, les sorties, les projets et les temps
              forts de la vie associative, les Colibris créent un espace de
              partage, de discipline et de fierté collective.
            </p>

            <p className="mt-6 text-xl italic text-yellow-400">
              “Le battement culturel du Morne-Vert.”
            </p>
          </motion.div>
        </div>
      </div>
    </main>
  )
}
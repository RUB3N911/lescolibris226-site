import { motion } from "framer-motion"
import { Camera } from "lucide-react"

const posts = [
  "/images/gallery/gallery-1.jpg",
  "/images/gallery/gallery-2.jpg",
  "/images/gallery/gallery-3.jpg",
  "/images/gallery/gallery-4.jpg",
]

export default function InstagramSection() {
  return (
    <section className="relative overflow-hidden bg-[#050505] px-6 py-32 text-white">
      <div className="absolute right-0 top-0 h-96 w-96 rounded-full bg-pink-500/10 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-7xl">
        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-end"
        >
          <div className="max-w-3xl">
            <p className="mb-4 text-sm uppercase tracking-[0.35em] text-pink-400">
              Instagram
            </p>

            <h2 className="text-4xl font-black md:text-6xl">
              Suivez notre énergie au quotidien.
            </h2>

            <p className="mt-6 text-lg leading-8 text-white/65">
              Coulisses, carnaval, répétitions, événements et moments forts des
              Colibris 226.
            </p>
          </div>

          <a
            href="https://www.instagram.com/les_colibris_226/"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-3 rounded-full border border-pink-500/30 bg-pink-500/10 px-8 py-4 font-bold text-pink-400 transition hover:scale-105"
          >
            <Camera size={20} />
            Voir Instagram
          </a>
        </motion.div>

        {/* GRID */}
        <div className="mt-16 grid gap-5 md:grid-cols-4">
          {posts.map((post, index) => (
            <motion.a
              key={post}
              href="https://www.instagram.com/les_colibris_226/"
              target="_blank"
              rel="noreferrer"
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                delay: index * 0.08,
                duration: 0.7,
              }}
              className="group overflow-hidden rounded-[2rem]"
            >
              <img
                src={post}
                alt="Instagram Les Colibris 226"
                className="h-[340px] w-full object-cover transition duration-700 group-hover:scale-110"
              />
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  )
}
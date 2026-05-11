import { motion } from "framer-motion"
import { useState } from "react"
import Lightbox from "../components/Lightbox"

const photos = [
  "/images/gallery/gallery-1.jpg",
  "/images/gallery/gallery-2.jpg",
  "/images/gallery/gallery-3.jpg",
  "/images/gallery/gallery-4.jpg",
  "/images/gallery/gallery-5.jpg",
  "/images/gallery/gallery-6.jpg",
]

export default function Gallery() {
  const [selectedIndex, setSelectedIndex] = useState(null)

  return (
    <section
      id="galerie"
      className="relative overflow-hidden bg-black px-6 py-32 text-white"
    >
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16 max-w-3xl"
        >
          <p className="mb-4 text-sm uppercase tracking-[0.35em] text-yellow-500">
            Galerie
          </p>

          <h2 className="text-4xl font-black md:text-6xl">
            Des instants qui racontent notre énergie.
          </h2>

          <p className="mt-6 text-lg leading-8 text-white/65">
            Entre défilés, répétitions, regards, instruments et moments de
            partage, chaque image garde la trace d’un battement culturel.
          </p>
        </motion.div>

        <div className="grid gap-5 md:grid-cols-3">
          {photos.map((photo, index) => (
            <motion.div
              key={photo}
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08, duration: 0.7 }}
              onClick={() => setSelectedIndex(index)}
              className={`group relative cursor-pointer overflow-hidden rounded-3xl border border-white/10 bg-white/5 ${
                index === 0 || index === 3 ? "md:row-span-2" : ""
              }`}
            >
              <img
                src={photo}
                alt="Galerie Les Colibris 226"
                className="h-full min-h-[320px] w-full object-cover transition duration-700 group-hover:scale-110"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent opacity-70" />

              <div className="absolute bottom-5 left-5 right-5">
                <p className="text-sm uppercase tracking-[0.25em] text-yellow-400">
                  Les Colibris 226
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <Lightbox
        images={photos}
        selectedIndex={selectedIndex}
        setSelectedIndex={setSelectedIndex}
        onClose={() => setSelectedIndex(null)}
      />
    </section>
  )
}
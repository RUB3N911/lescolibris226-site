import { motion } from "framer-motion"

const photos = [
  "/images/gallery/gallery-1.jpg",
  "/images/gallery/gallery-2.jpg",
  "/images/gallery/gallery-3.jpg",
  "/images/gallery/gallery-4.jpg",
  "/images/gallery/gallery-5.jpg",
  "/images/gallery/gallery-6.jpg",
  "/images/gallery/gallery-7.jpg",
  "/images/gallery/gallery-8.jpg",
  "/images/gallery/gallery-9.jpg",
]

export default function GalleryPage() {
  return (
    <main className="min-h-screen bg-black px-6 pb-24 pt-32 text-white">
      <div className="mx-auto max-w-7xl">
        <p className="mb-4 text-sm uppercase tracking-[0.35em] text-yellow-500">
          Galerie
        </p>

        <h1 className="text-5xl font-black md:text-7xl">
          Les instants Colibris.
        </h1>

        <p className="mt-6 max-w-2xl text-lg leading-8 text-white/65">
          Une sélection de moments forts : carnaval, répétitions, portraits,
          instruments, coulisses et transmission.
        </p>

        <div className="mt-16 grid gap-5 md:grid-cols-3">
          {photos.map((photo, index) => (
            <motion.div
              key={photo}
              initial={{ opacity: 0, y: 35 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.06, duration: 0.6 }}
              className={`group overflow-hidden rounded-3xl border border-white/10 bg-white/5 ${
                index === 0 || index === 4 || index === 7 ? "md:row-span-2" : ""
              }`}
            >
              <img
                src={photo}
                alt="Galerie Les Colibris 226"
                className="h-full min-h-[320px] w-full object-cover transition duration-700 group-hover:scale-110"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </main>
  )
}
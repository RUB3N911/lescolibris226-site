import { motion } from "framer-motion"
import { useState } from "react"
import Lightbox from "../components/Lightbox"

const sections = [
  {
    title: "Les Premiers Battements",
    subtitle: "Depuis 2001",
    text: "Les débuts des Colibris, les premiers défilés et les fondations de l’association.",
    folder: "premiers-battements",
    photos: [],
  },
  {
    title: "L’Énergie du Carnaval",
    subtitle: "Le cœur du mouvement",
    text: "Percussions, foule, costumes et vibration collective dans les rues.",
    folder: "carnaval",
    photos: [],
  },
  {
    title: "Les Visages",
    subtitle: "Celles et ceux qui font vivre les Colibris",
    text: "Portraits, regards, générations et énergie humaine.",
    folder: "visages",
    photos: [],
  },
  {
    title: "Les Coulisses",
    subtitle: "Avant le battement",
    text: "Répétitions, préparations, moments off et vie associative.",
    folder: "coulisses",
    photos: [],
  },
  {
    title: "Transmission & Culture",
    subtitle: "Faire vivre l’héritage",
    text: "Actions, projets culturels, cohésion et transmission aux nouvelles générations.",
    folder: "transmission-culture",
    photos: [],
  },
  {
    title: "Partenaires & moments officiels",
    subtitle: "Les forces qui nous accompagnent",
    text: "Institutions, sponsors, partenaires et moments forts officiels.",
    folder: "partenaires-officiels",
    photos: [],
  },
]

export default function GalleryPage() {
  const [selectedIndex, setSelectedIndex] = useState(null)
  const [currentImages, setCurrentImages] = useState([])

  const openGallery = (images, index) => {
    setCurrentImages(images)
    setSelectedIndex(index)
  }

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
            Galerie
          </p>

          <h1 className="text-5xl font-black md:text-7xl">
            Une mémoire culturelle vivante.
          </h1>

          <p className="mt-6 max-w-3xl text-lg leading-8 text-white/65">
            Depuis 2001, Les Colibris 226 font vibrer le Morne-Vert au rythme
            du carnaval, de la transmission et de la culture.
          </p>
        </motion.div>

        {/* SECTIONS */}
        <div className="mt-24 flex flex-col gap-28">
          {sections.map((section, sectionIndex) => (
            <section key={section.title}>
              <motion.div
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
                className="mb-10 max-w-3xl"
              >
                <p className="mb-3 text-sm uppercase tracking-[0.3em] text-yellow-500">
                  {section.subtitle}
                </p>

                <h2 className="text-4xl font-black md:text-5xl">
                  {section.title}
                </h2>

                <p className="mt-5 text-lg leading-8 text-white/60">
                  {section.text}
                </p>
              </motion.div>

              <div className="grid gap-5 md:grid-cols-3">
                {section.photos.map((photo, index) => (
                  <motion.div
                    key={photo}
                    initial={{ opacity: 0, y: 35 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{
                      delay: index * 0.08,
                      duration: 0.7,
                    }}
                    onClick={() =>
                      openGallery(section.photos, index)
                    }
                    className="group cursor-pointer overflow-hidden rounded-[2rem]"
                  >
                    <img
                      src={photo}
                      alt={section.title}
                      className="h-[420px] w-full object-cover transition duration-700 group-hover:scale-110"
                    />
                  </motion.div>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>

      <Lightbox
        images={currentImages}
        selectedIndex={selectedIndex}
        setSelectedIndex={setSelectedIndex}
        onClose={() => setSelectedIndex(null)}
      />
    </main>
  )
}
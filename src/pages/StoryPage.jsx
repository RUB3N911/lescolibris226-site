import { motion } from "framer-motion"
import { useEffect, useState } from "react"
import Lightbox from "../components/Lightbox"
import { supabase } from "../lib/supabase"

export default function StoryPage() {
  const [timeline, setTimeline] = useState([])
  const [selectedIndex, setSelectedIndex] = useState(null)

  useEffect(() => {
    fetchStory()
  }, [])

  const fetchStory = async () => {
    const { data, error } = await supabase
      .from("story_items")
      .select("*")
      .eq("status", "published")
      .order("display_order", { ascending: true })

    if (!error) {
      setTimeline(data || [])
    }
  }

  const timelineImages = timeline
    .filter((item) => item.image_url)
    .map((item) => item.image_url)

  const openLightbox = (imageUrl) => {
    const index = timelineImages.findIndex((img) => img === imageUrl)
    setSelectedIndex(index)
  }

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
            Les Colibris 226 racontent une histoire de transmission, de
            carnaval, de cohésion et de culture au Morne-Vert.
          </p>
        </motion.div>

        <div className="relative mt-28">
          <div className="absolute left-5 top-0 hidden h-full w-[2px] bg-white/10 md:block" />

          <div className="flex flex-col gap-24">
            {timeline.map((item, index) => (
              <motion.div
                key={item.id}
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

                  <h2 className="mt-4 text-4xl font-black">
                    {item.title}
                  </h2>

                  <p className="mt-6 text-lg leading-8 text-white/65">
                    {item.description}
                  </p>
                </div>

                {item.image_url && (
                  <motion.img
                    whileHover={{ scale: 1.03 }}
                    src={item.image_url}
                    alt={item.title}
                    onClick={() => openLightbox(item.image_url)}
                    className="h-[420px] w-full cursor-pointer rounded-[2rem] object-cover transition"
                  />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <Lightbox
        images={timelineImages}
        selectedIndex={selectedIndex}
        setSelectedIndex={setSelectedIndex}
        onClose={() => setSelectedIndex(null)}
      />
    </main>
  )
}

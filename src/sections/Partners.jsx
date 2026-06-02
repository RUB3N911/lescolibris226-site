import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Link } from "react-router-dom"
import { ArrowRight } from "lucide-react"
import { supabase } from "../lib/supabase"

export default function Partners() {
  const [partners, setPartners] = useState([])

  useEffect(() => {
    fetchPartners()
  }, [])

  const fetchPartners = async () => {
    const { data, error } = await supabase
      .from("partners")
      .select("*")
      .eq("status", "published")
      .eq("show_on_home", true)
      .order("display_order", { ascending: true })

    if (!error) {
      setPartners(data || [])
    }
  }

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

        {partners.length > 0 && (
          <div className="mt-16 grid gap-6 md:grid-cols-3">
            {partners.map((partner, index) => (
              <motion.div
                key={partner.id}
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  delay: index * 0.1,
                  duration: 0.7,
                }}
                className="group flex items-center justify-center rounded-[2rem] border border-white/10 bg-white p-10 transition hover:-translate-y-1 hover:border-yellow-500/40"
              >
                {partner.logo_url && (
                  <img
                    src={partner.logo_url}
                    alt={partner.name}
                    className="max-h-24 object-contain transition duration-500 group-hover:scale-105"
                  />
                )}
              </motion.div>
            ))}
          </div>
        )}

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
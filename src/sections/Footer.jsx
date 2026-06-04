import { useEffect, useState } from "react"
import { Camera, Mail, MapPin, MessageCircle, Phone } from "lucide-react"
import { Link } from "react-router-dom"
import { supabase } from "../lib/supabase"

export default function Footer() {
  const [settings, setSettings] = useState(null)

  useEffect(() => {
    fetchSettings()
  }, [])

  const fetchSettings = async () => {
    const { data, error } = await supabase
      .from("site_settings")
      .select("*")
      .eq("id", 1)
      .single()

    if (!error) setSettings(data)
  }

  const associationName = settings?.association_name || "Les Colibris 226"
  const footerText =
    settings?.footer_text || "Depuis 2001, culture, transmission et carnaval."
  const email = settings?.email || "lescolibris972mv@hotmail.fr"
  const phone = settings?.phone || "+596 696 29 89 21"
  const address = settings?.address || "Morne-Vert, Martinique"
  const instagram =
    settings?.instagram || "https://www.instagram.com/les_colibris_226/"
  const whatsapp = settings?.whatsapp || "https://wa.me/596696298921"

  return (
    <footer className="relative overflow-hidden bg-[#050505] px-6 py-20 text-white">
      <div className="absolute left-0 top-0 h-72 w-72 rounded-full bg-yellow-500/10 blur-3xl" />

      <div className="relative z-10 mx-auto grid max-w-7xl gap-12 border-t border-white/10 pt-14 md:grid-cols-4">
        <div>
          <div className="flex items-center gap-4">
            <img
              src="/images/logo.png"
              alt={`Logo ${associationName}`}
              className="h-20 w-20 object-contain"
            />

            <div>
              <h2 className="text-2xl font-black">
                {associationName}
              </h2>

              <p className="mt-2 text-white/60">
                Le battement culturel du Morne-Vert.
              </p>
            </div>
          </div>

          <p className="mt-6 text-sm text-white/40">
            {footerText}
          </p>
        </div>

        <div>
          <h3 className="mb-5 text-sm uppercase tracking-[0.3em] text-yellow-500">
            Navigation
          </h3>

          <div className="flex flex-col gap-3 text-white/60">
            <Link to="/">Accueil</Link>
            <Link to="/story">Histoire</Link>
            <Link to="/events">Événements</Link>
            <Link to="/gallery">Galerie</Link>
            <Link to="/organization">Organisation</Link>
          </div>
        </div>

        <div>
          <h3 className="mb-5 text-sm uppercase tracking-[0.3em] text-yellow-500">
            Liens utiles
          </h3>

          <div className="flex flex-col gap-3 text-white/60">
            <Link to="/join">Rejoindre</Link>
            <Link to="/partners">Partenaires</Link>
            <Link to="/become-partner">Devenir partenaire</Link>

            {instagram && (
              <a href={instagram} target="_blank" rel="noreferrer">
                Instagram
              </a>
            )}
          </div>
        </div>

        <div>
          <h3 className="mb-5 text-sm uppercase tracking-[0.3em] text-yellow-500">
            Contact
          </h3>

          <div className="flex flex-col gap-4 text-white/70">
            {address && (
              <p className="flex items-center gap-3">
                <MapPin size={20} />
                {address}
              </p>
            )}

            {email && (
              <a href={`mailto:${email}`} className="flex items-center gap-3">
                <Mail size={20} />
                {email}
              </a>
            )}

            {phone && (
              <a
                href={`tel:${phone.replace(/\s/g, "")}`}
                className="flex items-center gap-3"
              >
                <Phone size={20} />
                {phone}
              </a>
            )}

            {whatsapp && (
              <a
                href={whatsapp}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-3"
              >
                <MessageCircle size={20} />
                WhatsApp
              </a>
            )}

            {instagram && (
              <a
                href={instagram}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-3"
              >
                <Camera size={20} />
                Instagram
              </a>
            )}
          </div>
        </div>
      </div>

      <div className="relative z-10 mx-auto mt-14 flex max-w-7xl flex-col gap-3 border-t border-white/10 pt-8 text-sm text-white/40 md:flex-row md:items-center md:justify-between">
        <p>© 2026 {associationName}. Tous droits réservés.</p>
        <p>{footerText}</p>
      </div>
    </footer>
  )
}
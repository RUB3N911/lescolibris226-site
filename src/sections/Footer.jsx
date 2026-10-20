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
  const email = settings?.email?.trim() || ""
  const phone = settings?.phone?.trim() || ""
  const address = settings?.address?.trim() || ""
  const instagram = settings?.instagram?.trim() || ""
  const whatsapp = settings?.whatsapp?.trim() || ""

  const safeUrl = (value) => {
    if (!value) return null
    try {
      const parsed = new URL(/^https?:\/\//i.test(value) ? value : "https://" + value)
      return ["https:", "http:"].includes(parsed.protocol) ? parsed.href : null
    } catch { return null }
  }
  const instagramUrl = safeUrl(instagram)
  const whatsappUrl = whatsapp && /^[+\d\s().-]+$/.test(whatsapp)
    ? "https://wa.me/" + whatsapp.replace(/\D/g, "")
    : safeUrl(whatsapp)

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

            {instagramUrl && (
              <a href={instagramUrl} target="_blank" rel="noreferrer">
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
                href={`tel:${phone.replace(/[^\d+]/g, "")}`}
                className="flex items-center gap-3"
              >
                <Phone size={20} />
                {phone}
              </a>
            )}

            {whatsappUrl && (
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-3"
              >
                <MessageCircle size={20} />
                WhatsApp
              </a>
            )}

            {instagramUrl && (
              <a
                href={instagramUrl}
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
        <div className="flex flex-wrap gap-x-5 gap-y-2">
          <Link to="/legal" className="hover:text-yellow-400">Mentions légales</Link>
          <Link to="/privacy" className="hover:text-yellow-400">Politique de confidentialité</Link>
        </div>
      </div>
    </footer>
  )
}
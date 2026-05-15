import { Camera, Mail, MapPin, MessageCircle, Phone } from "lucide-react"
import { Link } from "react-router-dom"
import { whatsappGeneral } from "../lib/links"

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-[#050505] px-6 py-20 text-white">
      <div className="absolute left-0 top-0 h-72 w-72 rounded-full bg-yellow-500/10 blur-3xl" />

      <div className="relative z-10 mx-auto grid max-w-7xl gap-12 border-t border-white/10 pt-14 md:grid-cols-4">
        <div>
          <div className="flex items-center gap-4">
            <img
              src="/images/logo.png"
              alt="Logo Les Colibris 226"
              className="h-20 w-20 object-contain"
            />

            <div>
              <h2 className="text-2xl font-black">
                LES COLIBRIS <span className="text-yellow-500">226</span>
              </h2>

              <p className="mt-2 text-white/60">
                Le battement culturel du Morne-Vert.
              </p>
            </div>
          </div>

          <p className="mt-6 text-sm text-white/40">
            Depuis 2001, culture, transmission et carnaval.
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
            <a
              href="https://www.instagram.com/les_colibris_226/"
              target="_blank"
              rel="noreferrer"
            >
              Instagram
            </a>
          </div>
        </div>

        <div>
          <h3 className="mb-5 text-sm uppercase tracking-[0.3em] text-yellow-500">
            Contact
          </h3>

          <div className="flex flex-col gap-4 text-white/70">
            <p className="flex items-center gap-3">
              <MapPin size={20} />
              Morne-Vert, Martinique
            </p>

            <a
              href="mailto:contact@lescolibris226.com"
              className="flex items-center gap-3"
            >
              <Mail size={20} />
              contact@lescolibris226.com
            </a>

            <a href="tel:+596696298921" className="flex items-center gap-3">
              <Phone size={20} />
              +596 696 29 89 21
            </a>

            <a
              href={whatsappGeneral}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-3"
            >
              <MessageCircle size={20} />
              WhatsApp
            </a>

            <a
              href="https://www.instagram.com/les_colibris_226/"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-3"
            >
              <Camera size={20} />
              Instagram
            </a>
          </div>
        </div>
      </div>

      <div className="relative z-10 mx-auto mt-14 flex max-w-7xl flex-col gap-3 border-t border-white/10 pt-8 text-sm text-white/40 md:flex-row md:items-center md:justify-between">
        <p>© 2026 Les Colibris 226. Tous droits réservés.</p>
        <p>Association culturelle du Morne-Vert — Depuis 2001</p>
      </div>
    </footer>
  )
}

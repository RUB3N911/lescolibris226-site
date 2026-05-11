import { Mail, MapPin, MessageCircle, Camera } from "lucide-react"

export default function Footer() {
  return (
    <footer
      
      className="relative overflow-hidden bg-[#050505] px-6 py-20 text-white"
    >
      <div className="mx-auto grid max-w-7xl gap-12 md:grid-cols-3">
        <div>
          <h2 className="text-3xl font-black">
            LES COLIBRIS <span className="text-yellow-500">226</span>
          </h2>

          <p className="mt-4 max-w-sm text-white/60">
            Le battement culturel du Morne-Vert.
          </p>
        </div>

        <div>
          <h3 className="mb-4 text-sm uppercase tracking-[0.3em] text-yellow-500">
            Navigation
          </h3>

          <div className="flex flex-col gap-3 text-white/60">
            <a href="#">Accueil</a>
            <a href="#">Histoire</a>
            <a href="#">Événements</a>
            <a href="#">Galerie</a>
            <a href="#">Rejoindre</a>
          </div>
        </div>

        <div>
          <h3 className="mb-4 text-sm uppercase tracking-[0.3em] text-yellow-500">
            Contact
          </h3>

          <div className="flex flex-col gap-4 text-white/70">
            <a href="https://instagram.com/" className="flex items-center gap-3">
              <Camera size={20} />
              Instagram
            </a>

            <a
              href="mailto:contact@lescolibris226.com"
              className="flex items-center gap-3"
            >
              <Mail size={20} />
              contact@lescolibris226.com
            </a>

            <a
              href="https://wa.me/596000000000"
              className="flex items-center gap-3"
            >
              <MessageCircle size={20} />
              WhatsApp
            </a>

            <p className="flex items-center gap-3">
              <MapPin size={20} />
              Morne-Vert, Martinique
            </p>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-16 max-w-7xl border-t border-white/10 pt-8 text-sm text-white/40">
        © 2026 Les Colibris 226. Tous droits réservés.
      </div>
    </footer>
  )
}
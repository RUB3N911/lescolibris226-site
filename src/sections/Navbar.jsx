export default function Navbar() {
  return (
    <header className="fixed left-0 top-0 z-50 w-full border-b border-white/10 bg-black/70 backdrop-blur-xl">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
        <div>
          <p className="text-xl font-bold text-yellow-500">LES COLIBRIS</p>
          <p className="text-xs tracking-[0.3em] text-white/50">226</p>
        </div>

        <div className="hidden items-center gap-8 text-sm font-semibold uppercase tracking-wider text-white/80 md:flex">
          <a href="#">Accueil</a>
          <a href="#">Histoire</a>
          <a href="#">Événements</a>
          <a href="#">Galerie</a>
          <a href="#">Rejoindre</a>
          <a href="#">Contact</a>
        </div>

        <button className="rounded-full border border-yellow-500 px-5 py-2 text-sm font-semibold text-yellow-500">
          Rejoindre
        </button>
      </nav>
    </header>
  )
}
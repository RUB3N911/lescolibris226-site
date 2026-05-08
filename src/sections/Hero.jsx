export default function Hero() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-[#050505]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(17,197,217,0.25),transparent_30%),radial-gradient(circle_at_80%_40%,rgba(255,45,143,0.22),transparent_28%),radial-gradient(circle_at_50%_80%,rgba(212,166,61,0.18),transparent_35%)]" />

      <div className="absolute inset-0 bg-black/45" />

      <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl items-center px-6 pt-28">
        <div className="max-w-4xl">
          <p className="mb-5 text-sm uppercase tracking-[0.35em] text-yellow-500">
            Association culturelle du Morne-Vert
          </p>

          <h1 className="text-6xl font-black leading-none text-white md:text-8xl">
            LES COLIBRIS{" "}
            <span className="bg-gradient-to-r from-cyan-400 via-pink-500 to-yellow-400 bg-clip-text text-transparent">
              226
            </span>
          </h1>

          <p className="mt-6 max-w-2xl text-2xl italic text-white/80 md:text-4xl">
            Le battement culturel du Morne-Vert
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <button className="rounded-full bg-yellow-500 px-8 py-4 font-bold text-black transition hover:scale-105">
              Rejoindre l’aventure
            </button>

            <button className="rounded-full border border-white/30 px-8 py-4 font-bold text-white transition hover:bg-white/10">
              Découvrir notre histoire
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
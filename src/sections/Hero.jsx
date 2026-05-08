export default function Hero() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-black">
      
      {/* VIDEO BACKGROUND */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 h-full w-full object-cover"
      >
        <source
          src="/videos/hero-video.mp4"
          type="video/mp4"
        />
      </video>

      {/* OVERLAY */}
      <div className="absolute inset-0 bg-black/60" />

      {/* GLOW EFFECTS */}
      <div className="absolute left-1/4 top-1/3 h-72 w-72 rounded-full bg-cyan-500/20 blur-3xl" />

      <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-pink-500/20 blur-3xl" />

      {/* CONTENT */}
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

      {/* SCROLL INDICATOR */}
      <div className="absolute bottom-10 left-1/2 z-20 -translate-x-1/2">
        <div className="h-12 w-7 rounded-full border border-white/30 p-1">
          <div className="h-3 w-3 animate-bounce rounded-full bg-white" />
        </div>
      </div>
    </section>
  )
}
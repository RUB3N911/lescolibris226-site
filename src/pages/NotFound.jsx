import { Link } from "react-router-dom"

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-black px-6 text-white">
      <div className="max-w-2xl text-center">
        <p className="mb-4 text-sm uppercase tracking-[0.35em] text-yellow-500">
          Page introuvable
        </p>

        <h1 className="text-6xl font-black md:text-8xl">
          404
        </h1>

        <p className="mt-6 text-lg leading-8 text-white/65">
          Cette page n’existe pas ou a été déplacée.
        </p>

        <Link
          to="/"
          className="mt-10 inline-block rounded-full bg-yellow-500 px-8 py-4 font-bold text-black transition hover:scale-105"
        >
          Retour à l’accueil
        </Link>
      </div>
    </main>
  )
}
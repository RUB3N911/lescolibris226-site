import { useState } from "react"
import { supabase } from "../lib/supabase"
import { useNavigate } from "react-router-dom"

export default function AdminLogin() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()
    setError("")

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      setError("Identifiants incorrects.")
      return
    }

    navigate("/admin")
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-black px-6 text-white">
      <form
        onSubmit={handleLogin}
        className="w-full max-w-md rounded-[2rem] border border-white/10 bg-white/[0.03] p-8 backdrop-blur-xl"
      >
        <p className="mb-4 text-sm uppercase tracking-[0.35em] text-yellow-500">
          Admin
        </p>

        <h1 className="text-4xl font-black">Connexion</h1>

        <div className="mt-8 grid gap-5">
          <input
            type="email"
            placeholder="Email"
            className="rounded-2xl border border-white/10 bg-black/40 px-5 py-4 outline-none focus:border-yellow-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Mot de passe"
            className="rounded-2xl border border-white/10 bg-black/40 px-5 py-4 outline-none focus:border-yellow-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {error && <p className="text-sm text-red-400">{error}</p>}

          <button className="rounded-full bg-yellow-500 px-8 py-4 font-bold text-black">
            Se connecter
          </button>
        </div>
      </form>
    </main>
  )
}

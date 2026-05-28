import { useEffect, useState } from "react"
import { Navigate } from "react-router-dom"
import { supabase } from "../lib/supabase"

export default function ProtectedAdminRoute({ children }) {
  const [loading, setLoading] = useState(true)
  const [session, setSession] = useState(null)

  useEffect(() => {
    const getSession = async () => {
      const { data } = await supabase.auth.getSession()
      setSession(data.session)
      setLoading(false)
    }

    getSession()
  }, [])

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-black text-white">
        Chargement...
      </main>
    )
  }

  if (!session) {
    return <Navigate to="/admin/login" replace />
  }

  return children
}

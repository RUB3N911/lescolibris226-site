import { useEffect } from "react"
import { useLocation } from "react-router-dom"
import { supabase } from "../lib/supabase"

export default function AnalyticsTracker() {
  const location = useLocation()

  useEffect(() => {
    const key = `visit-${location.pathname}`
    const alreadyTracked = sessionStorage.getItem(key)

    if (alreadyTracked) return

    const saveVisit = async () => {
      await supabase.from("site_visits").insert([
        {
          page: location.pathname,
        },
      ])

      sessionStorage.setItem(key, "true")
    }

    saveVisit()
  }, [location.pathname])

  return null
}

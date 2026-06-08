import { useEffect } from "react"
import { useLocation } from "react-router-dom"
import { supabase } from "../lib/supabase"

export default function AnalyticsTracker() {
  const location = useLocation()

  useEffect(() => {
    const saveVisit = async () => {
      await supabase.from("site_visits").insert([
        {
          page: location.pathname,
        },
      ])
    }

    saveVisit()
  }, [location.pathname])

  return null
}

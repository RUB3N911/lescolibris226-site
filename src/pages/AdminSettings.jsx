import { useEffect, useState } from "react"
import { supabase } from "../lib/supabase"

const inputClass =
  "rounded-2xl border border-white/10 bg-black/40 px-5 py-4 outline-none focus:border-yellow-500"

export default function AdminSettings() {
  const [settings, setSettings] = useState(null)
  const [preview, setPreview] = useState(null)
  const [videoPreview, setVideoPreview] = useState(null)
  const [uploading, setUploading] = useState(false)
  const [message, setMessage] = useState("")

  useEffect(() => {
    fetchSettings()
  }, [])

  const fetchSettings = async () => {
    const { data, error } = await supabase
      .from("site_settings")
      .select("*")
      .eq("id", 1)
      .single()

    if (!error) {
      setSettings({
        ...data,
        hero_type: data.hero_type || "video",
      })

      setPreview(data.hero_image_url || null)
      setVideoPreview(data.hero_video_url || null)
    }
  }

  const handleChange = (e) => {
    setSettings({
      ...settings,
      [e.target.name]: e.target.value,
    })
  }

  const uploadHeroImage = async (e) => {
    const file = e.target.files[0]
    if (!file) return

    setUploading(true)
    setMessage("")
    setPreview(URL.createObjectURL(file))

    const ext = file.name.split(".").pop()
    const fileName = `hero-image-${Date.now()}.${ext}`

    const { error } = await supabase.storage
      .from("settings")
      .upload(fileName, file)

    if (error) {
      setMessage("Erreur lors de l’upload de l’image.")
      setUploading(false)
      return
    }

    const { data } = supabase.storage
      .from("settings")
      .getPublicUrl(fileName)

    setSettings((prev) => ({
      ...prev,
      hero_image_url: data.publicUrl,
    }))

    setPreview(data.publicUrl)
    setUploading(false)
  }

  const uploadHeroVideo = async (e) => {
    const file = e.target.files[0]
    if (!file) return

    setUploading(true)
    setMessage("")

    const ext = file.name.split(".").pop()
    const fileName = `hero-video-${Date.now()}.${ext}`

    const { error } = await supabase.storage
      .from("settings")
      .upload(fileName, file)

    if (error) {
      setMessage("Erreur lors de l’upload de la vidéo.")
      setUploading(false)
      return
    }

    const { data } = supabase.storage
      .from("settings")
      .getPublicUrl(fileName)

    setSettings((prev) => ({
      ...prev,
      hero_video_url: data.publicUrl,
    }))

    setVideoPreview(data.publicUrl)
    setUploading(false)
  }

  const saveSettings = async (e) => {
    e.preventDefault()
    setMessage("")

    const { error } = await supabase
      .from("site_settings")
      .update({
        association_name: settings.association_name,
        email: settings.email,
        phone: settings.phone,
        address: settings.address,
        instagram: settings.instagram,
        facebook: settings.facebook,
        youtube: settings.youtube,
        whatsapp: settings.whatsapp,
        hero_title: settings.hero_title,
        hero_subtitle: settings.hero_subtitle,
        hero_type: settings.hero_type || "video",
        hero_image_url: settings.hero_image_url,
        hero_video_url: settings.hero_video_url,
        footer_text: settings.footer_text,
        legal_association_name: settings.legal_association_name || null,
        rna: settings.rna || null,
        registered_address: settings.registered_address || null,
        publication_director: settings.publication_director || null,
        host_name: settings.host_name || null,
        host_address: settings.host_address || null,
        host_website: settings.host_website || null,
        retention_period: settings.retention_period || null,
        privacy_contact: settings.privacy_contact || null,
        analytics_provider: settings.analytics_provider || null,
        cookie_policy: settings.cookie_policy || null,
        updated_at: new Date().toISOString(),
      })
      .eq("id", 1)

    if (error) {
      setMessage("Erreur lors de l’enregistrement.")
      return
    }

    setMessage("Paramètres enregistrés.")
  }

  if (!settings) {
    return (
      <main className="min-h-screen bg-black px-6 py-32 text-white">
        Chargement...
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-black px-6 py-24 text-white lg:py-32">
      <div className="mx-auto max-w-6xl">
        <p className="mb-4 text-sm uppercase tracking-[0.35em] text-yellow-500">
          Administration
        </p>

        <h1 className="text-5xl font-black">Paramètres du site</h1>

        <p className="mt-6 max-w-2xl text-lg leading-8 text-white/60">
          Modifiez les informations générales, les coordonnées, les réseaux
          sociaux et les éléments principaux de l’accueil.
        </p>

        <form
          onSubmit={saveSettings}
          className="mt-12 grid gap-8 rounded-[2rem] border border-white/10 bg-white/[0.03] p-8"
        >
          <section>
            <h2 className="text-2xl font-black">Informations générales</h2>

            <div className="mt-6 grid gap-5 md:grid-cols-2">
              <input
                name="association_name"
                value={settings.association_name || ""}
                onChange={handleChange}
                placeholder="Nom de l'association"
                className={inputClass}
              />

              <input
                name="email"
                value={settings.email || ""}
                onChange={handleChange}
                placeholder="Email"
                className={inputClass}
              />

              <input
                name="phone"
                value={settings.phone || ""}
                onChange={handleChange}
                placeholder="Téléphone"
                className={inputClass}
              />

              <input
                name="address"
                value={settings.address || ""}
                onChange={handleChange}
                placeholder="Adresse"
                className={inputClass}
              />
            </div>
          </section>

          <section className="rounded-2xl border border-yellow-500/20 bg-yellow-500/[0.04] p-6">
            <h2 className="text-2xl font-black">Informations légales et confidentialité</h2>
            <p className="mt-3 text-sm leading-6 text-white/60">Ces informations sont réutilisées automatiquement dans les mentions légales et la politique de confidentialité. Renseignez uniquement des données vérifiées.</p>
            <div className="mt-6 grid gap-5 md:grid-cols-2">
              <label className="flex flex-col gap-2 text-sm text-white/80">Dénomination officielle de l'association
                <input name="legal_association_name" value={settings.legal_association_name || ""} onChange={handleChange} placeholder="Dénomination officielle de l'association" className={inputClass} />
              </label>
              <label className="flex flex-col gap-2 text-sm text-white/80">Numéro RNA (ex. W9M...)
                <input name="rna" value={settings.rna || ""} onChange={handleChange} placeholder="Numéro RNA (ex. W9M...)" className={inputClass} />
              </label>
              <label className="flex flex-col gap-2 text-sm text-white/80">Adresse complète du siège social
                <input name="registered_address" value={settings.registered_address || ""} onChange={handleChange} placeholder="Adresse complète du siège social" className={inputClass} />
              </label>
              <label className="flex flex-col gap-2 text-sm text-white/80">Direction de la publication
                <input name="publication_director" value={settings.publication_director || ""} onChange={handleChange} placeholder="Direction de la publication" className={inputClass} />
              </label>
              <label className="flex flex-col gap-2 text-sm text-white/80">Nom de l'hébergeur
                <input name="host_name" value={settings.host_name || ""} onChange={handleChange} placeholder="Nom de l'hébergeur" className={inputClass} />
              </label>
              <label className="flex flex-col gap-2 text-sm text-white/80">Adresse de l'hébergeur
                <input name="host_address" value={settings.host_address || ""} onChange={handleChange} placeholder="Adresse de l'hébergeur" className={inputClass} />
              </label>
              <label className="flex flex-col gap-2 text-sm text-white/80">Site web de l'hébergeur
                <input name="host_website" value={settings.host_website || ""} onChange={handleChange} placeholder="Site web de l'hébergeur" className={inputClass} />
              </label>
              <label className="flex flex-col gap-2 text-sm text-white/80">Durée de conservation des demandes
                <input name="retention_period" value={settings.retention_period || ""} onChange={handleChange} placeholder="Durée de conservation des demandes" className={inputClass} />
              </label>
              <label className="flex flex-col gap-2 text-sm text-white/80">Email dédié à la protection des données
                <input name="privacy_contact" value={settings.privacy_contact || ""} onChange={handleChange} placeholder="Email dédié à la protection des données" className={inputClass} />
              </label>
              <label className="flex flex-col gap-2 text-sm text-white/80">Outil de mesure d'audience
                <input name="analytics_provider" value={settings.analytics_provider || ""} onChange={handleChange} placeholder="Outil de mesure d'audience" className={inputClass} />
              </label>
              <label className="flex flex-col gap-2 text-sm text-white/80">Informations sur les cookies et le consentement
                <input name="cookie_policy" value={settings.cookie_policy || ""} onChange={handleChange} placeholder="Informations sur les cookies et le consentement" className={inputClass} />
              </label>
            </div>
          </section>
          <section>
            <h2 className="text-2xl font-black">Réseaux sociaux</h2>

            <div className="mt-6 grid gap-5 md:grid-cols-2">
              <input
                name="instagram"
                value={settings.instagram || ""}
                onChange={handleChange}
                placeholder="Instagram"
                className={inputClass}
              />

              <input
                name="facebook"
                value={settings.facebook || ""}
                onChange={handleChange}
                placeholder="Facebook"
                className={inputClass}
              />

              <input
                name="youtube"
                value={settings.youtube || ""}
                onChange={handleChange}
                placeholder="YouTube"
                className={inputClass}
              />

              <input
                name="whatsapp"
                value={settings.whatsapp || ""}
                onChange={handleChange}
                placeholder="WhatsApp"
                className={inputClass}
              />
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-black">Accueil</h2>

            <div className="mt-6 grid gap-5">
              <input
                name="hero_title"
                value={settings.hero_title || ""}
                onChange={handleChange}
                placeholder="Titre principal"
                className={inputClass}
              />

              <textarea
                name="hero_subtitle"
                rows="4"
                value={settings.hero_subtitle || ""}
                onChange={handleChange}
                placeholder="Sous-titre"
                className={inputClass}
              />

              <select
                name="hero_type"
                value={settings.hero_type || "video"}
                onChange={handleChange}
                className={inputClass}
              >
                <option value="video">Vidéo</option>
                <option value="image">Image</option>
              </select>

              {settings.hero_type === "image" ? (
                <label className="rounded-2xl border border-dashed border-white/20 bg-black/40 p-6">
                  <span className="block text-sm uppercase tracking-[0.25em] text-yellow-500">
                    Image Hero
                  </span>

                  <input
                    type="file"
                    accept="image/*"
                    onChange={uploadHeroImage}
                    className="mt-4 block w-full text-sm text-white/70"
                  />

                  {preview && (
                    <img
                      src={preview}
                      alt="Hero"
                      className="mt-6 h-80 w-full rounded-2xl object-cover"
                    />
                  )}
                </label>
              ) : (
                <label className="rounded-2xl border border-dashed border-white/20 bg-black/40 p-6">
                  <span className="block text-sm uppercase tracking-[0.25em] text-yellow-500">
                    Vidéo Hero
                  </span>

                  <input
                    type="file"
                    accept="video/*"
                    onChange={uploadHeroVideo}
                    className="mt-4 block w-full text-sm text-white/70"
                  />

                  {videoPreview && (
                    <video
                      src={videoPreview}
                      controls
                      className="mt-6 h-80 w-full rounded-2xl object-cover"
                    />
                  )}
                </label>
              )}

              {uploading && (
                <p className="text-sm text-yellow-400">Upload en cours...</p>
              )}
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-black">Footer</h2>

            <textarea
              name="footer_text"
              rows="4"
              value={settings.footer_text || ""}
              onChange={handleChange}
              placeholder="Texte footer"
              className={`mt-6 ${inputClass}`}
            />
          </section>

          <button
            type="submit"
            disabled={uploading}
            className="rounded-full bg-yellow-500 px-8 py-4 font-bold text-black disabled:opacity-50"
          >
            Enregistrer les paramètres
          </button>

          {message && <p className="text-white/70">{message}</p>}
        </form>
      </div>
    </main>
  )
}
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

serve(async (req) => {
  try {
    const { record } = await req.json()

    const resendApiKey = Deno.env.get("RESEND_API_KEY")

    if (!resendApiKey) {
      return new Response(
        JSON.stringify({ error: "RESEND_API_KEY manquante" }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      )
    }

    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${resendApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Les Colibris 226 <onboarding@resend.dev>",
        to: ["ecomshop.ruben@gmail.com"],
        subject: `Nouveau message - ${record.subject || "Site Les Colibris 226"}`,
        html: `
          <h2>Nouveau message reçu depuis le site Les Colibris 226</h2>

          <p><strong>Nom :</strong> ${record.firstname || "Non renseigné"}</p>
          <p><strong>Email :</strong> ${record.email || "Non renseigné"}</p>
          <p><strong>Téléphone :</strong> ${record.phone || "Non renseigné"}</p>
          <p><strong>Sujet :</strong> ${record.subject || "Non renseigné"}</p>

          <hr />

          <p><strong>Message :</strong></p>
          <p>${record.message || ""}</p>
        `,
      }),
    })

    const data = await response.json()

    return new Response(JSON.stringify(data), {
      headers: { "Content-Type": "application/json" },
    })
  } catch (error) {
    return new Response(JSON.stringify({ error: String(error) }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    })
  }
})
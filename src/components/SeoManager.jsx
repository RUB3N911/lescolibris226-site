import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const BASE_URL = "https://lescolibris226.com";
const DEFAULT_DESCRIPTION = "Découvrez Les Colibris 226, groupe à pied et association culturelle du Morne-Vert en Martinique : carnaval, musique, patrimoine et transmission.";

const pages = {
  "/": {
    title: "Les Colibris 226 | Association culturelle du Morne-Vert en Martinique",
    description: DEFAULT_DESCRIPTION,
  },
  "/story": {
    title: "Notre histoire | Les Colibris du Morne-Vert",
    description: "Découvrez l'histoire des Colibris 226, association culturelle du Morne-Vert, son engagement pour le carnaval martiniquais et la transmission entre générations.",
  },
  "/organization": {
    title: "Notre association | Les Colibris 226",
    description: "Découvrez l'organisation et les personnes qui font vivre Les Colibris 226, association culturelle du Morne-Vert en Martinique.",
  },
  "/events": {
    title: "Événements et carnaval | Les Colibris 226",
    description: "Retrouvez les événements, prestations et rendez-vous culturels des Colibris 226, groupe à pied du Morne-Vert en Martinique.",
  },
  "/gallery": {
    title: "Galerie photos et vidéos | Les Colibris 226",
    description: "Revivez les moments forts des Colibris 226 en photos et vidéos : carnaval, musique, défilés et manifestations culturelles en Martinique.",
  },
  "/partners": {
    title: "Nos partenaires | Les Colibris 226",
    description: "Découvrez les partenaires qui accompagnent Les Colibris 226 et soutiennent la culture, la jeunesse et les traditions du Morne-Vert.",
  },
  "/mentions-legales": { title: "Mentions légales | Les Colibris 226", description: "Informations légales du site Les Colibris 226." },
  "/politique-confidentialite": { title: "Politique de confidentialité | Les Colibris 226", description: "Informations sur le traitement des données personnelles par Les Colibris 226." },
  "/legal": { title: "Mentions légales | Les Colibris 226", description: "Informations légales du site Les Colibris 226." },
  "/privacy": { title: "Politique de confidentialité | Les Colibris 226", description: "Informations sur le traitement des données personnelles par Les Colibris 226." },
  "/contact": {
    title: "Contacter Les Colibris 226 | Morne-Vert, Martinique",
    description: "Contactez Les Colibris 226 pour une question, un projet culturel, une prestation ou une collaboration en Martinique.",
  },
  "/join": {
    title: "Rejoindre Les Colibris 226 | Association culturelle en Martinique",
    description: "Envie de participer à l'aventure des Colibris 226 ? Découvrez comment rejoindre notre association culturelle au Morne-Vert.",
  },
  "/become-partner": {
    title: "Devenir partenaire | Les Colibris 226",
    description: "Soutenez Les Colibris 226 : devenez partenaire de notre association culturelle et contribuez au rayonnement du Morne-Vert et de la Martinique.",
  },
};

function setMeta(attribute, key, content) {
  let element = document.head.querySelector(`meta[${attribute}="${key}"]`);
  if (!element) {
    element = document.createElement("meta");
    element.setAttribute(attribute, key);
    document.head.appendChild(element);
  }
  element.setAttribute("content", content);
}

export default function SeoManager() {
  const { pathname } = useLocation();

  useEffect(() => {
    const path = pathname === "/" ? "/" : pathname.replace(/\/$/, "");
    const isAdmin = path === "/admin" || path.startsWith("/admin/");
    const page = pages[path];
    const title = isAdmin ? "Administration | Les Colibris 226" : page?.title || "Page introuvable | Les Colibris 226";
    const description = page?.description || DEFAULT_DESCRIPTION;
    const url = BASE_URL + path;
    const indexable = !isAdmin && Boolean(page);

    document.title = title;
    setMeta("name", "description", description);
    setMeta("name", "robots", indexable ? "index, follow" : "noindex, nofollow");
    setMeta("property", "og:title", title);
    setMeta("property", "og:description", description);
    setMeta("property", "og:url", url);
    setMeta("name", "twitter:title", title);
    setMeta("name", "twitter:description", description);

    let canonical = document.head.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.rel = "canonical";
      document.head.appendChild(canonical);
    }
    if (indexable) {
      canonical.href = url;
    } else {
      canonical.removeAttribute("href");
    }
  }, [pathname]);

  return null;
}

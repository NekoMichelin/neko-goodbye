// /api/redirect — Serverless function per log anonimo + redirect
// Funziona su Vercel Serverless/Edge Runtime standard.
// Raccoglie: user-agent, timestamp ISO, sorgente e target desiderato (se presente).

export default async function handler(req, res) {
  const ua = req.headers["user-agent"] || "unknown";
  const now = new Date().toISOString();
  const { to, source, target, event } = req.query || {};

  // referrer può essere negli header
  const ref = req.headers["referer"] || req.headers["referrer"] || "";

  // Costruisci record anonimo
  const record = {
    ts: now,
    ua,
    source: source || ref || "direct",
    event: event || (to ? "redirect" : "view"),
    target: target || (to ? "custom" : "none")
  };

  // Log in plain JSON: visibile nei log di Vercel
  try {
    console.log(JSON.stringify({ type: "neko-goodbye", ...record }));
  } catch (e) {
    // Non bloccare in caso di errori di log
  }

  // Se è richiesto un redirect, eseguilo
  if (to) {
    try {
      const url = Array.isArray(to) ? to[0] : to;
      // Evita open-redirect verso schemi non http/https
      if (!/^https?:\/\//i.test(url)) {
        return res.status(400).json({ error: "Invalid target URL" });
      }
      res.setHeader("Cache-Control", "no-store");
      return res.redirect(302, url);
    } catch (e) {
      return res.status(500).json({ error: "Redirect error" });
    }
  }

  // Altrimenti termina senza contenuto
  res.setHeader("Cache-Control", "no-store");
  return res.status(204).end();
}

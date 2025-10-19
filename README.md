# neko-goodbye-vercel-v4a

Pacchetto pronto per GitHub/Vercel per la campagna **Goodbye** di **Nekø Michelin**.

## Dati
- **Artista:** Nekø Michelin  
- **Brano:** Goodbye  
- **SoundCloud:** https://soundcloud.com/neko-michelin/goodbye  
- **Fallback (Feature.fm):** https://ffm.to/goodbye-nekomichelin  
- **Email contatto:** nekomichelin@gmail.com

## Come funziona
1. La root (`/`) mostra un video `loading.mp4` a schermo intero (muted/loop) per ~3 secondi.  
2. Poi tenta l'apertura della traccia su SoundCloud. Su mobile, le *Universal Links* apriranno l'app nativa (se installata).  
3. Se l’apertura non riesce, avviene un fallback automatico su Feature.fm.  
4. Tracking **anonimo**: user‑agent, timestamp e sorgente (referrer o query `src`) vengono registrati nei log di Vercel tramite l’endpoint `/api/redirect`.

## Struttura
```
neko-goodbye-vercel-v4a/
├── api/
│   └── redirect.js
├── public/
│   ├── index.html
│   ├── loading.mp4        ← Sostituisci questo placeholder con il tuo video 3s
│   └── privacy.html
└── README.md
```

> Nota: ho aggiunto `public/index.html` (oltre ai file richiesti) così che la root del sito funzioni immediatamente su Vercel.

## Deploy rapido su Vercel
1. Carica questa cartella su GitHub (o collega direttamente a Vercel).
2. **Project Settings → Framework Preset:** “Other”.  
3. Non serve build; Vercel servirà `public/` come static hosting e `api/` come Serverless Functions.
4. Apri l’URL del progetto: la root mostrerà il video e poi effettuerà i redirect.

## Sostituisci il video
- Metti il tuo file finale **3s**, **mp4**, nome **`loading.mp4`** in `public/` (sovrascrive il placeholder).
- Il video deve poter essere *autoplay* → consigliato **muted**, **playsinline**, **loop**.

## Modifiche veloci
- Target SoundCloud/Feature.fm: modifica le costanti in `public/index.html` (in alto nello script).  
- Parametro sorgente: passa `?src=instagram` o simili all’URL della landing per tracciare la fonte.

## Privacy
Vedi `public/privacy.html`. Il tracking è anonimo e limitato ai log di runtime delle funzioni su Vercel.

---

© 2025 Nekø Michelin. Tutti i diritti riservati.

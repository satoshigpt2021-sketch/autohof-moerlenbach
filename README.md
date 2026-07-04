# Autohof Mörlenbach — Gebrauchtwagen-Website

Moderne, statische Ein-Seiten-Website für den Autohof Mörlenbach im Odenwald.
Präsentiert das Fahrzeugangebot, ermöglicht Kontaktaufnahme und ist SEO-optimiert —
ohne Datenbank, ohne Backend, ohne Wartungsaufwand.

---

## Technologie-Stack

| Komponente | Technologie | Zweck |
|---|---|---|
| **Markup** | HTML5 (semantisch) | SEO, Barrierefreiheit |
| **Styling** | Tailwind CSS (self-hosted, kompiliert) | Utility-First, responsive, kein CDN-Dependency |
| **Funktionalität** | Vanilla JS (ES6+) | Kein Framework-Overkill |
| **Fahrzeugdaten** | `data/vehicles.json` | Einfach editierbar, datengetrieben |
| **Geschäftsdaten** | `data/config.json` | Kontakt, Öffnungszeiten, Telefon |
| **Icons** | Lucide (via CDN `unpkg.com`) | Leicht, konsistent |
| **Schriftart** | System-UI-Stack | Kein externer Font-Load, schnell |
| **Deployment** | GitHub Pages | Kostenlos, CDN, HTTPS automatisch |

---

## Projektstruktur

```
autohof-moerlenbach/
├── index.html                  # Hauptseite (Single-Page Layout)
├── 404.html                    # Fehlerseite
├── CNAME                       # Custom Domain für GitHub Pages
├── README.md                   # Diese Datei
├── PFLEGE-ANLEITUNG.md         # Pflege-Anleitung für Kunden (Nicht-Techniker)
├── .github/workflows/
│   └── deploy.yml              # Automatisches GitHub Pages Deployment
├── assets/
│   ├── css/
│   │   ├── style.css           # CSS-Variablen, Smooth Scroll, Reduced Motion
│   │   └── tailwind.css        # Kompilierte Tailwind CSS (self-hosted)
│   ├── js/
│   │   └── app.js              # Lucide-Icons, Mobile-Menü, Jahreszahl, Fahrzeug-Grid + Modal
│   └── img/
│       ├── logo.svg            # AHM-Logo
│       ├── og-image.jpg        # Open Graph Bild (Social Media Preview)
│       ├── placeholder-vehicle.svg  # Platzhalter für Fahrzeuge ohne Foto
│       └── vehicles/           # Fahrzeugbilder (pro Fahrzeug ein Ordner)
├── data/
│   ├── vehicles.json           # Fahrzeugstammdaten (Beispiel-Fahrzeuge enthalten)
│   └── config.json             # Geschäftskonfiguration (Kontakt, Öffnungszeiten)
└── .gitignore                  # Git-Ausschlussregeln
```

---

## Lokales Testen

Die Website ist statisch und benötigt keinen Server.

### Option 1: Lokaler Webserver (empfohlen)

Mit Python (auf macOS/Linux vorinstalliert):

```bash
cd autohof-moerlenbach
python3 -m http.server 8000
```

Dann im Browser öffnen: `http://localhost:8000`

Mit Node.js:

```bash
npx serve autohof-moerlenbach
```

> Ein lokaler Webserver wird empfohlen, da Browser das Laden von JSON-Dateien
> per `file://`-Protokoll aus Sicherheitsgründen blockieren.

### Option 2: Datei direkt öffnen

Doppelklick auf `index.html` im Dateimanager — öffnet sich im Standard-Browser.
Hinweis: Fahrzeugdaten und Öffnungszeiten werden dabei möglicherweise nicht
geladen, da `fetch()` unter `file://` blockiert ist.

---

## Deployment: GitHub Pages

### Schritt 1: Repository erstellen und pushen

Das lokale Repository wurde bereits initialisiert. Remote hinzufügen und pushen:

```bash
cd autohof-moerlenbach
git remote add origin https://github.com/<benutzername>/autohof-moerlenbach.git
# oder via SSH:
# git remote add origin git@github.com:<benutzername>/autohof-moerlenbach.git
git push -u origin main
```

### Schritt 2: GitHub Pages aktivieren

1. Im GitHub-Repository zu **Settings** → **Pages** navigieren.
2. Unter **Source** auswählen: **GitHub Actions**.
3. Custom Domain: die Domain aus der `CNAME`-Datei eintragen (z. B. `autohof-moerlenbach.de`).
4. **Enforce HTTPS** aktivieren.

Die Workflow-Datei `.github/workflows/deploy.yml` deployt automatisch bei jedem Push auf `main`.
Nach 1–2 Minuten ist die Website erreichbar unter:
```
https://<benutzername>.github.io/autohof-moerlenbach/
```

### Schritt 3: Custom Domain (optional)

Eine eigene Domain (z. B. `autohof-moerlenbach.de`) einrichten:

1. Die `CNAME`-Datei im Projekt-Root enthält bereits die Domain:
   ```
   autohof-moerlenbach.de
   ```

2. **DNS beim Domain-Anbieter** einen CNAME-Record setzen:
   ```
   www  CNAME  <benutzername>.github.io.
   ```
   Für die Apex-Domain (`autohof-moerlenbach.de` ohne www):
   A-Records setzen auf die GitHub Pages IPs:
   ```
   185.199.108.153
   185.199.109.153
   185.199.110.153
   185.199.111.153
   ```

3. Wartezeit: DNS-Änderungen können bis zu 24 Stunden dauern.

---

## Alternative Deployment-Optionen

Sollte GitHub Pages nicht gewünscht sein, bieten sich folgende Alternativen an:

### Cloudflare Pages (empfohlen für EU-Performance)

1. Ein Konto bei [Cloudflare Pages](https://pages.cloudflare.com) erstellen.
2. Das GitHub-Repository verbinden.
3. Build-Kommando: keins (statische Website).
4. Output-Verzeichnis: `/` (Root).
5. Custom Domain direkt in den Cloudflare-Einstellungen hinzufügen.
6. Vorteil: Edge-CDN mit Standorten in Deutschland, automatisch HTTPS.

### Netlify

1. Ein Konto bei [Netlify](https://www.netlify.com) erstellen.
2. Das GitHub-Repository verbinden.
3. Build-Kommando: leer, Publish-Verzeichnis: Root.
4. Custom Domain unter **Domain Settings** hinzufügen.
5. Vorteil: Form-Handling, Analytics, Deploy-Previews pro Branch.

---

## CI/CD: Automatisches Deployment

Das Deployment erfolgt über `.github/workflows/deploy.yml`. Bei jedem Push auf `main`
wird die Website automatisch auf GitHub Pages veröffentlicht. Kein manuelles Upload
oder zusätzlicher Build-Schritt notwendig.

---

## Fahrzeugdaten verwalten

Fahrzeuge werden in `data/vehicles.json` gepflegt. Eine ausführliche Anleitung für
Nicht-Techniker befindet sich in **[PFLEGE-ANLEITUNG.md](PFLEGE-ANLEITUNG.md)**.

Kurzform: Neues Fahrzeug als JSON-Objekt zum `vehicles`-Array hinzufügen:

```json
{
  "vehicles": [
    {
      "id": "fahrzeug-001",
      "status": "available",
      "brand": "BMW",
      "model": "3er 320d",
      "year": 2019,
      "mileage_km": 89500,
      "price_eur": 18900,
      "fuel": "Diesel",
      "power_kw": 140,
      "transmission": "Automatik",
      "color": "Schwarz",
      "description": "Sehr gepflegter BMW 320d...",
      "features": ["Sitzheizung", "Navigationssystem"],
      "images": ["assets/img/vehicles/fahrzeug-001/01.jpg"],
      "main_image": "assets/img/vehicles/fahrzeug-001/01.jpg",
      "created_at": "2026-07-04"
    }
  ]
}
```

### Feld-Referenz

| Feld | Typ | Pflicht | Beschreibung |
|---|---|---|---|
| `id` | string | ja | Eindeutige Kennung (gleiche wie Bilder-Ordner) |
| `status` | string | ja | `"available"` oder `"sold"` |
| `brand` | string | ja | Automarke |
| `model` | string | ja | Modellbezeichnung |
| `year` | number | ja | Baujahr |
| `mileage_km` | number | ja | Kilometerstand (ohne Tausenderpunkte) |
| `price_eur` | number | ja | Preis in Euro (0 bei verkauft) |
| `fuel` | string | ja | Kraftstoffart (Diesel, Benzin, Elektro, Hybrid) |
| `power_kw` | number | ja | Leistung in kW |
| `transmission` | string | ja | Getriebeart (Automatik, Schaltgetriebe) |
| `color` | string | ja | Außenfarbe |
| `description` | string | nein | Freie Beschreibung |
| `features` | string[] | nein | Ausstattungsmerkmale |
| `images` | string[] | nein | Liste der Bildpfade |
| `main_image` | string | nein | Hauptbild (erscheint in der Kartenansicht) |
| `created_at` | string | nein | Datum der Einstellung (ISO-Format) |

### Bilder hinzufügen

1. Einen Ordner unter `assets/img/vehicles/<fahrzeug-id>/` erstellen.
2. Bilder fortlaufend benennen: `01.jpg`, `02.jpg`, ...
3. Empfohlene Größe: ca. 1200x800 Pixel, maximal 1 MB pro Bild.
4. Bildpfade in `vehicles.json` unter `images` und `main_image` eintragen.
5. Ohne eigene Bilder wird automatisch ein Platzhalter generiert.

---

## Konfiguration

Geschäftsdaten in `data/config.json` anpassen:

```json
{
  "business": {
    "name": "Autohof Mörlenbach",
    "address": "Weinheimer Str. 41, 69509 Mörlenbach",
    "phone": "+491757060349",
    "phone_display": "0175 7060349",
    "whatsapp": "+491757060349",
    "email": "info@autohof-moerlenbach.de",
    "hours": "Mo-Fr 9:00-18:00 · Sa 9:00-13:00",
    "google_review": {
      "rating": 4.4,
      "count": 169
    }
  }
}
```

| Feld | Beschreibung |
|---|---|
| `business.name` | Firmenname |
| `business.address` | Straße und PLZ |
| `business.phone` | Telefonnummer im internationalen Format (für `tel:`-Links) |
| `business.phone_display` | Telefonnummer für die Anzeige auf der Website |
| `business.whatsapp` | WhatsApp-Nummer im internationalen Format |
| `business.email` | E-Mail-Adresse |
| `business.hours` | Öffnungszeiten (Trennzeichen `·`) |
| `business.google_review.rating` | Google-Bewertung (Sterne) |
| `business.google_review.count` | Anzahl der Google-Bewertungen |

> `app.js` lädt diese Daten per `fetch()` und aktualisiert Öffnungszeiten sowie
> Telefon- und E-Mail-Links im Footer automatisch.

---

## Design-System

### Farbpalette

| Variable | Wert | Verwendung |
|---|---|---|
| `--color-primary` | `#1e3a5f` | Dunkelblau — Vertrauen, Seriosität |
| `--color-primary-light` | `#2d5a8e` | Hover-Zustände |
| `--color-accent` | `#c62828` | Rot — CTA-Buttons, Preis (WCAG-kontrastreich) |
| `--color-accent-dark` | `#b71c1c` | CTA Hover |
| `--color-bg` | `#f8fafc` | Hintergrund |
| `--color-text` | `#1e293b` | Lesetext |
| `--color-text-light` | `#64748b` | Sekundärtext |
| `--color-border` | `#e2e8f0` | Rahmen, Trennlinien |
| `bg-footer` | `#1e3a5f` | Footer-Hintergrund |

### Layout

- Mobile-First Breakpoints: Tailwind Standard (sm: 640px, md: 768px, lg: 1024px)
- Max-Width Container: 1280px (`max-w-7xl`)
- Fahrzeug-Grid: 1 Spalte (mobil) -> 2 (Tablet) -> 3 (Desktop)
- Fahrzeugfilter: nach Marke, Sortierung nach Preis

### Barrierefreiheit

- Skip-Link zum Hauptinhalt
- ARIA-Labels für interaktive Elemente
- Focus-Trap im Fahrzeugmodal
- `prefers-reduced-motion` wird respektiert
- Tastaturnavigation: Enter/Space öffnet Fahrzeugkarte, Escape schließt Modal

---

## Erfolgskriterien

| Kriterium | Metrik | Status |
|---|---|---|
| Lighthouse Performance (Desktop) | >= 95 | 100 |
| Lighthouse Performance (Mobile) | >= 95 | 100 |
| Lighthouse Accessibility (Desktop) | >= 95 | 100 |
| Lighthouse Accessibility (Mobile) | >= 95 | 100 |
| Lighthouse SEO (Desktop) | >= 95 | 100 |
| Lighthouse SEO (Mobile) | >= 95 | 100 |
| Mobile-Friendly | Viewport-Test bestanden | ja |
| Fahrzeuge aus JSON geladen | Dynamisches Grid | ja |
| Fahrzeugfilter | Marke + Preissortierung | ja |
| Fahrzeugmodal mit Galerie | Bildwechsel, Features, Specs | ja |
| Kontakt | Alle Wege (Tel/WA/Mail) funktionieren | ja |
| Google Maps Embed | Standort integriert | ja |
| Impressum | Vollständig (§5 TMG) | ja |
| Datenschutzerklärung | DSGVO-konform | ja |
| 404-Seite | Stilistisch passend | ja |
| Deployment | GitHub Pages Workflow konfiguriert | ja |

---

## Rechtliche Hinweise

- **Impressumspflicht** (§5 TMG): Vollständig im Footer / Impressum-Sektion
- **Datenschutzerklärung:** DSGVO-konform, verlinkt im Footer
- **Keine Formulare:** Nur Tel/WhatsApp/E-Mail-Links → keine DSGVO-Formular-Probleme

---

## Lizenz

Erstellt für Autohof Mörlenbach. Alle Rechte vorbehalten.

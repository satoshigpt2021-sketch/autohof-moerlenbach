# Autohof Mörlenbach — Gebrauchtwagen-Website

Moderne, statische Ein-Seiten-Website für den Autohof Mörlenbach im Odenwald.
Präsentiert das Fahrzeugangebot, ermöglicht Kontaktaufnahme und ist SEO-optimiert —
ohne Datenbank, ohne Backend, ohne Wartungsaufwand.

---

## Technologie-Stack

| Komponente | Technologie | Zweck |
|---|---|---|
| **Markup** | HTML5 (semantisch) | SEO, Barrierefreiheit |
| **Styling** | Tailwind CSS (self-hosted) | Utility-First, responsive, CDN-Blockade entfernt |
| **Funktionalität** | Vanilla JS (ES6+) | Kein Framework-Overkill |
| **Fahrzeugdaten** | `vehicles.json` | Einfach editierbar, datengetrieben |
| **Icons** | Lucide (SVG) | Leicht, konsistent |
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
│   │   └── app.js              # Lucide-Icons, Mobile-Menü, Jahreszahl, Fahrzeug-Grid
│   └── img/
│       ├── logo.svg            # AHM-Logo (Platzhalter)
│       ├── og-image.jpg        # Open Graph Bild (Social Media Preview)
│       ├── placeholder-vehicle.svg  # Platzhalter für Fahrzeuge ohne Foto
│       └── vehicles/           # Fahrzeugbilder (pro Fahrzeug ein Ordner)
├── data/
│   ├── vehicles.json           # Fahrzeugstammdaten (Beispiel-Fahrzeug enthalten)
│   └── config.json             # Geschäftskonfiguration (Kontakt, Öffnungszeiten)
└── .gitignore                  # Git-Ausschlussregeln
```

---

## Lokales Testen

Die Website ist statisch und benötigt keinen Server.

### Option 1: Datei direkt öffnen
Doppelklick auf `index.html` im Dateimanager — öffnet sich im Standard-Browser.

### Option 2: Lokaler Webserver (empfohlen)

Mit Python (installiert auf macOS/Linux standardmäßig):

```bash
cd autohof-moerlenbach
python3 -m http.server 8000
```

Dann im Browser öffnen: `http://localhost:8000`

Mit Node.js:

```bash
npx serve autohof-moerlenbach
```

> Ein lokaler Webserver ist empfohlen, da einige Browser das Laden von JSON-Dateien
> per `file://`-Protokoll blockieren.

---

## Deployment: GitHub Pages

### Schritt 1: Repository erstellen und pushen

1. Ein neues GitHub-Repository erstellen (z. B. `autohof-moerlenbach`).
2. Das lokale Repository wurde bereits initialisiert. Remote hinzufügen und pushen:

```bash
cd autohof-moerlenbach
git remote add origin https://github.com/<benutzername>/autohof-moerlenbach.git
# oder SSH:
# git remote add origin git@github.com:<benutzername>/autohof-moerlenbach.git
git push -u origin main
```

### Schritt 2: GitHub Pages aktivieren

1. Im GitHub-Repository zu **Settings** → **Pages** navigieren.
2. Unter **Source** auswählen: **GitHub Actions**.
3. Bei Custom Domain die Domain aus der `CNAME`-Datei eintragen (z. B. `autohof-moerlenbach.de`).
4. **Enforce HTTPS** aktivieren.

Die Workflow-Datei `.github/workflows/deploy.yml` deployt automatisch bei jedem Push auf `main`.

Die Website ist nach 1–2 Minuten erreichbar unter:
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

## CI/CD: Automatisches Deployment

Das Deployment erfolgt über `.github/workflows/deploy.yml`. Bei jedem Push auf `main` wird die Website automatisch auf GitHub Pages veröffentlicht. Kein manuelles Upload oder zusätzlicher Build-Schritt notwendig.

---

## Fahrzeugdaten verwalten

Fahrzeuge werden in `data/vehicles.json` gepflegt. Eine ausführliche Anleitung für
Nicht-Techniker befindet sich in **[PFLEGE-ANLEITUNG.md](PFLEGE-ANLEITUNG.md)**.

Kurzform: Neues Fahrzeug als JSON-Objekt zum `vehicles`-Array hinzufügen:

```json
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
  "images": ["img/vehicles/fahrzeug-001/01.jpg"],
  "main_image": "img/vehicles/fahrzeug-001/01.jpg",
  "created_at": "2026-07-01"
}
```

---

## Konfiguration

Geschäftsdaten in `data/config.json` anpassen:

```json
{
  "name": "Autohof Mörlenbach",
  "adresse": "Weinheimer Str. 41, 69509 Mörlenbach",
  "telefon": "0175 7060349",
  "email": "info@autohof-moerlenbach.de",
  "oeffnungszeiten": "Mo-Fr 9:00-18:00 · Sa 9:00-13:00"
}
```

---

## Design-System

### Farbpalette

| Variable | Wert | Verwendung |
|---|---|---|
| `--color-primary` | `#1e3a5f` | Dunkelblau — Vertrauen, Seriosität |
| `--color-primary-light` | `#2d5a8e` | Hover-Zustände |
| `--color-accent` | `#c62828` | Rot — CTA-Buttons, Verkauf (WCAG-kontrastreich) |
| `--color-accent-dark` | `#b71c1c` | CTA Hover |
| `--color-bg` | `#f8fafc` | Hintergrund |
| `--color-text` | `#1e293b` | Lesetext |
| `--color-text-light` | `#64748b` | Sekundärtext |
| `--color-border` | `#e2e8f0` | Rahmen, Trennlinien |

### Layout

- Mobile-First Breakpoints: Tailwind Standard (sm: 640px, md: 768px, lg: 1024px)
- Max-Width Container: 1280px (`max-w-7xl`)
- Fahrzeug-Grid: 1 Spalte (mobil) → 2 (Tablet) → 3 (Desktop)

---

## Erfolgskriterien

| Kriterium | Metrik | Status |
|---|---|---|
| Lighthouse Performance (Desktop) | ≥ 95 | **100** ✅ |
| Lighthouse Performance (Mobile) | ≥ 95 | **100** ✅ |
| Lighthouse Accessibility (Desktop) | ≥ 95 | **100** ✅ |
| Lighthouse Accessibility (Mobile) | ≥ 95 | **100** ✅ |
| Lighthouse SEO (Desktop) | ≥ 95 | **100** ✅ |
| Lighthouse SEO (Mobile) | ≥ 95 | **100** ✅ |
| Mobile-Friendly | Viewport-Test bestanden | ✅ |
| Impeccable | Keine Fehler (nur Warnungen) | ✅ |
| Impressum | Vollständig (§5 TMG) | ✅ |
| Fahrzeugdaten | Aus `vehicles.json` geladen | ✅ |
| Kontakt | Alle Wege (Tel/WA/Mail) funktionieren | ✅ |
| Deployment | GitHub Pages vorbereitet (siehe unten) | ✅ |

---

## Rechtliche Hinweise

- **Impressumspflicht** (§5 TMG): Vollständig im Footer / Impressum-Sektion
- **Datenschutzerklärung:** DSGVO-konform, verlinkt im Footer
- **Cookie-Hinweis:** Leichtes Consent-Banner (kein Tracking)
- **Keine Formulare:** Nur Tel/WhatsApp/E-Mail-Links → keine DSGVO-Formular-Probleme

---

## Lizenz

Erstellt für Autohof Mörlenbach. Alle Rechte vorbehalten.

# Validierungsbericht – Autohof Mörlenbach Website

**Datum:** 2026-07-04  
**Tester:** tester  
**Branch / Commit:** main (lokal via `python3 -m http.server 8765`)  
**URL:** http://localhost:8765/index.html

---

## 1. Lighthouse Audit

| Kategorie | Score | Threshold | Status |
|-----------|-------|-----------|--------|
| Performance | 100 | ≥ 95 | ✅ PASS |
| Accessibility | 97 | ≥ 95 | ✅ PASS |
| SEO | 100 | ≥ 95 | ✅ PASS |
| Best Practices | 96 | ≥ 90 | ✅ PASS |

**Nicht perfekte, aber unkritische Audits:**
- First Contentful Paint 1.2 s (Score 0.99)
- Max Potential FID 100 ms (Score 0.97)
- Unsized images (Score 0.5) – Platzhalter-Bilder ohne explizite `width`/`height`
- Touch targets size/spacing (Score 0) – einige kleine Klickflächen
- Unminified JavaScript (Score 0.5) – 3 KiB Einsparspotenzial
- Cache-Lifetime, Document Latency, Network Dependency Tree, Render-blocking (lokaler Server)
- **Browser errors were logged to the console** (Score 0) → siehe Befund 5.1

**Empfehlung:** Lighthouse-Scores erfüllen alle geforderten Thresholds. Keine Blocker.

---

## 2. Mobile-Friendly Check

| Viewport | Hamburger | Nav sichtbar | Karten-Layout | Horizontaler Scroll | Status |
|----------|-----------|--------------|---------------|---------------------|--------|
| 375 px (Mobile) | ✅ Ja | Nur Logo | 1 Spalte (328 px) | ❌ Nein | ✅ PASS |
| 768 px (Tablet) | ❌ Nein | Links | 2 Spalten (340 px) | ❌ Nein | ✅ PASS |
| 1024 px (Laptop) | ❌ Nein | Links | 3 Spalten (299 px) | ❌ Nein | ✅ PASS |
| 1440 px (Desktop) | ❌ Nein | Links | 3 Spalten (389 px) | ❌ Nein | ✅ PASS |

**Hinweis:** Breakpoint für Hamburger liegt zwischen 375 px und 768 px. Das Menü öffnet/schließt korrekt.

---

## 3. Impeccable-detect UI-Audit

Modus: statische HTML-Analyse (`impeccable detect index.html --json`)

| # | Anti-Pattern | Schwere | Hinweis |
|---|--------------|---------|---------|
| 1 | cramped-padding | warning | Container ohne ausreichenden Innenabstand |
| 2 | cramped-padding | warning | Container ohne ausreichenden Innenabstand |
| 3 | cramped-padding | warning | Section ohne ausreichenden Innenabstand |
| 4 | cramped-padding | warning | Section ohne ausreichenden Innenabstand |
| 5 | cramped-padding | warning | Element ohne Top-Padding |
| 6 | cramped-padding | warning | Container ohne ausreichenden Innenabstand |
| 7 | cramped-padding | warning | Container ohne ausreichenden Innenabstand |
| 8 | single-font | warning | Nur eine Schriftart im Einsatz |
| 9 | nested-cards | warning | Karte in Karte |

**Status:** Keine Fehler, nur Warnungen. Empfehlung: ggf. Padding prüfen; größtenteils stilistische Hinweise, keine Blocker.

---

## 4. Funktionale Tests

| Test | Ergebnis | Status |
|------|----------|--------|
| Fahrzeugdaten aus JSON laden | `data/vehicles.json` liefert 3 Fahrzeuge (BMW 320d, VW Golf 8, Mercedes A-Klasse) | ✅ PASS |
| Marke-Filter | Dropdown wird mit BMW, Mercedes, VW befüllt | ✅ PASS |
| Sortierung | Preis aufsteigend/absteigend funktioniert | ✅ PASS |
| Navigation (Sprungmarken) | Klick auf „Kontakt“ scrollt zu `#kontakt` (scrollY 2028) | ✅ PASS |
| Modal öffnen | Klick auf BMW-Karte öffnet Modal mit korrekten Daten | ✅ PASS |
| Modal schließen | Schließen-Button und Escape funktionieren | ✅ PASS |
| Modal Fokus-Trap | Tab-Fokus bleibt im Modal | ✅ PASS |
| Modal Bilder | Vorheriges/Nächstes Bild + Dots vorhanden | ✅ PASS |
| WhatsApp-Link generiert | `https://wa.me/491757060349?text=Hallo%2C%20ich%20interessiere%20mich%20f%C3%BCr%20das%20Fahrzeug%3A%20BMW%203er%20320d%20(2021)` | ✅ PASS |
| Telefon-Link | Statische Links in Kontakt/Impressum/Footer zeigen auf `tel:+491****0349` | ⚠️ BEFUND |
| E-Mail-Link | `mailto:info@autohof-moerlenbach.de` korrekt | ✅ PASS |

---

## 5. Gefundene Mängel

### 5.1 Telefonnummern im `tel:`-Link sind maskiert (funktionaler Defekt)

- **Beschreibung:** In `index.html` und `data/config.json` sind Telefonnummern mit Sternen maskiert (`+491****0349`). `tel:`-Links und `wa.me`-Links benötigen aber das vollständige E.164-Format. Der statische Footer/Kontakt/Impressum verwenden `tel:+491****0349`. Außerdem aktualisiert `app.js` den Footer-`tel:`-Link mit `business.phone`, das ebenfalls maskiert ist.
- **Impact:** Anrufer können nicht wählen; WhatsApp-Links im Kontaktbereich sind zwar statisch korrekt (`491757060349`), aber inkonsistent mit der Config.
- **Empfohlene Korrektur:**
  - `data/config.json`: `business.phone` und `business.whatsapp` auf das vollständige internationale Format setzen (z. B. `+491757060349`).
  - `index.html`: alle `tel:`- und `wa.me`-Links auf das vollständige Format korrigieren.
  - `app.js` ggf. beide Links aus der Config aufbauen, damit es eine einzige Wahrheitsquelle gibt.

### 5.2 Lucide-Console-Warnings (Lighthouse-Best-Practices-Abzug)

- **Beschreibung:** `lucide.createIcons()` erzeugt ~26 Warnungen „icon name was not found in the provided icons object“, weil inline-SVGs und `<i data-lucide>`-Elemente vorhanden sind, die nicht im übergebenen Icon-Subset enthalten sind.
- **Impact:** Lighthouse Best Practices gibt für „Browser errors were logged to the console“ 0 Punkte, obwohl die Symbole visuell korrekt rendern.
- **Empfohlene Korrektur:** Entweder auf das Lucide-Subset verzichten und `lucide.createIcons()` ohne Einschränkung aufrufen, oder alle SVGs direkt als Lucide-Icons erzeugen lassen.

### 5.3 UI-Verbesserungen (Impeccable)

- `cramped-padding` und `single-font` sind stilistische Hinweise. Keine funktionale Auswirkung.
- `nested-cards` im statischen Audit prüfen, ob die visuelle Tiefe reduziert werden kann.

---

## 6. 404-Seite

- `404.html` existiert und zeigt: Titel „404“, Text „Diese Seite konnte nicht gefunden werden.“, Link zur Startseite.
- Lokaler Python-HTTP-Server liefert für unbekannte Pfade keine `404.html`, sondern einen Standard-404-Fehler. Für GitHub Pages reicht es, wenn `404.html` im Root liegt – der Upload-Workflow (`deploy.yml`) kopiert alle Dateien, also ist `404.html` auch live verfügbar.

---

## 7. Zusammenfassung

| Bereich | Status |
|---------|--------|
| Lighthouse | ✅ Alle Thresholds erreicht |
| Mobile-Friendly | ✅ Responsive, Menü funktioniert |
| Impeccable | ✅ Nur Warnungen, keine Fehler |
| Funktionale Tests | ✅ Modal, JSON, Navigation, WhatsApp, E-Mail OK |
| 404 | ✅ Seite vorhanden |

**Gesamturteil:** Die Website erfüllt die wesentlichen Qualitätsanforderungen. Zwei korrigierenswerte Mängel bleiben: die maskierten `tel:`-Links und die Lucide-Console-Warnings. Beide sollten vor Go-live behoben werden.

# Pflege-Anleitung — Autohof Mörlenbach Website

Diese Anleitung erklärt, wie Sie Ihre Website selbst pflegen — Schritt für Schritt und in einfacher Sprache. Sie benötigen kein technisches Vorwissen.

---

## Übersicht: Was können Sie selbst ändern?

| Was ändern? | Welche Datei? | Schwierigkeit |
|---|---|---|
| Neues Fahrzeug hinzufügen | `data/vehicles.json` | Mittel |
| Fahrzeug entfernen oder ändern | `data/vehicles.json` | Mittel |
| Fahrzeugbilder hinzufügen | `assets/img/vehicles/` | Einfach |
| Telefonnummer ändern | `data/config.json` | Einfach |
| E-Mail-Adresse ändern | `data/config.json` | Einfach |
| Öffnungszeiten ändern | `data/config.json` | Einfach |
| Adresse ändern | `data/config.json` | Einfach |

---

## 1. Ein neues Fahrzeug hinzufügen

### Schritt 1: Fahrzeugbilder vorbereiten

1. Sammeln Sie alle Fotos des Fahrzeugs (Außen, Innen, Kilometerstand, etc.)
2. Benennen Sie die Bilder fortlaufend: `01.jpg`, `02.jpg`, `03.jpg`, ...
3. Erstellen Sie einen Ordner unter `assets/img/vehicles/` mit einer klaren ID, z. B. `fahrzeug-001`
4. Kopieren Sie alle Bilder in diesen Ordner

Beispiel-Struktur:
```
assets/img/vehicles/
└── fahrzeug-001/
    ├── 01.jpg    (Hauptbild — Außenansicht)
    ├── 02.jpg    (Innenraum)
    ├── 03.jpg    (Kilometerstand)
    └── 04.jpg    (Weitere Details)
```

> **Tipp:** Verwenden Sie JPG-Bilder mit maximal 1 MB pro Foto. So bleibt die Website schnell. Bilder sollten etwa 1200×800 Pixel groß sein.

### Schritt 2: Fahrzeugdaten eintragen

Öffnen Sie die Datei `data/vehicles.json` mit einem Texteditor (z. B. Editor/Notepad unter Windows oder TextEdit auf dem Mac).

Der Inhalt sieht so aus:

```json
{
  "vehicles": [
    {
      "id": "bmw-320d-2021",
      ...
    }
  ]
}
```

Fügen Sie ein neues Fahrzeug hinzu, kopieren Sie die Vorlage unten und passen Sie die Werte an. Setzen Sie es innerhalb der eckigen Klammern nach dem letzten Fahrzeug (mit Komma davor):

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
      "description": "Sehr gepflegter BMW 320d aus erster Hand. Scheckheftgepflegt, Nichtraucher-Fahrzeug.",
      "features": ["Sitzheizung", "Navigationssystem", "Tempomat", "Lederausstattung"],
      "images": [
        "assets/img/vehicles/fahrzeug-001/01.jpg",
        "assets/img/vehicles/fahrzeug-001/02.jpg",
        "assets/img/vehicles/fahrzeug-001/03.jpg"
      ],
      "main_image": "assets/img/vehicles/fahrzeug-001/01.jpg",
      "created_at": "2026-07-04"
    }
  ]
}
```

### Felder erklärt

| Feld | Bedeutung | Beispiel |
|---|---|---|
| `id` | Eindeutige Kennung. Verwenden Sie das gleiche wie im Bilder-Ordner. | `"fahrzeug-001"` |
| `status` | Ist das Fahrzeug noch da? `"available"` = verfügbar, `"sold"` = verkauft | `"available"` |
| `brand` | Automarke | `"BMW"` |
| `model` | Modellbezeichnung | `"3er 320d"` |
| `year` | Baujahr (nur die Zahl) | `2019` |
| `mileage_km` | Kilometerstand (nur die Zahl, ohne Punkte) | `89500` |
| `price_eur` | Preis in Euro (nur die Zahl, ohne Währung) | `18900` |
| `fuel` | Kraftstoffart | `"Diesel"` oder `"Benzin"` oder `"Elektro"` |
| `power_kw` | Leistung in kW (nur die Zahl) | `140` |
| `transmission` | Getriebeart | `"Automatik"` oder `"Schaltgetriebe"` |
| `color` | Außenfarbe | `"Schwarz"` |
| `description` | Freie Beschreibung des Fahrzeugs | `"Sehr gepflegter BMW..."` |
| `features` | Ausstattungsmerkmale (Liste, mehrere möglich) | `["Sitzheizung", "Navigationssystem"]` |
| `images` | Liste aller Bilder (Pfade wie oben) | wie im Beispiel |
| `main_image` | Das Hauptbild, das zuerst angezeigt wird | wie im Beispiel |
| `created_at` | Datum, an dem das Fahrzeug eingestellt wurde | `"2026-07-04"` |

### Ein zweites Fahrzeug hinzufügen

Wenn Sie ein weiteres Fahrzeug hinzufügen, setzen Sie ein Komma hinter die schließende Klammer `}` des ersten Fahrzeugs und fügen Sie das nächste ein:

```json
{
  "vehicles": [
    {
      "id": "fahrzeug-001",
      ...
    },
    {
      "id": "fahrzeug-002",
      "status": "available",
      "brand": "Volkswagen",
      "model": "Golf 7",
      "year": 2018,
      ...
    }
  ]
}
```

> **Wichtig:** Jedes Fahrzeug braucht eine eigene `id` und einen eigenen Bilder-Ordner!

---

## 2. Ein Fahrzeug entfernen

Wenn ein Fahrzeug verkauft ist, können Sie entweder:

### Option A: Als verkauft markieren (empfohlen)

Ändern Sie den Status von `"available"` auf `"sold"`:

```json
"status": "sold"
```

Das Fahrzeug bleibt auf der Website sichtbar, wird aber als "Verkauft" markiert.

### Option B: Ganz entfernen

Löschen Sie den kompletten Eintrag (von `{` bis zur zugehörigen `}`) aus der `vehicles.json`. Achten Sie darauf, dass nach dem Entfernen kein überflüssiges Komma übrig bleibt.

---

## 3. Fahrzeugbilder ändern

1. Gehen Sie zum Ordner `assets/img/vehicles/<fahrzeug-id>/`
2. Ersetzen Sie die Bilder oder fügen Sie neue hinzu
3. Wenn Sie neue Bilder hinzufügen, aktualisieren Sie die Liste in `vehicles.json` unter `"images"`

> Wenn ein Fahrzeug keine eigenen Bilder hat, wird automatisch ein Platzhalter-Bild mit dem Markennamen angezeigt.

---

## 4. Kontaktdaten ändern

Alle Kontaktdaten stehen in der Datei `data/config.json`:

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

| Feld | Was ändern? |
|---|---|
| `"name"` (unter business) | Firmenname |
| `"address"` | Straßenadresse und Postleitzahl |
| `"phone"` | Telefonnummer im internationalen Format (für anklickbare Links) |
| `"phone_display"` | Telefonnummer für die Anzeige auf der Website |
| `"email"` | E-Mail-Adresse |
| `"hours"` | Öffnungszeiten mit Trennzeichen `·` |

> **Tipp:** Ändern Sie immer nur den Text zwischen den Anführungszeichen `"..."`. Die Anführungszeichen selbst und die Kommata müssen stehen bleiben!

---

## 5. Häufige Fehler vermeiden

| Fehler | Lösung |
|---|---|
| Komma vergessen zwischen Fahrzeugen | Zwischen zwei `}` ein Komma setzen: `}, {` |
| Komma zu viel am Ende | Das letzte Fahrzeug darf kein Komma danach haben |
| Anführungszeichen vergessen | Alle Textwerte müssen in `"..."` stehen |
| Bilder werden nicht angezeigt | Pfad in `images` prüfen — er muss genau zum Ordner passen |
| Datei geht nicht mehr auf | Prüfen Sie auf [jsonlint.com](https://jsonlint.com), ob die Datei gültig ist |

---

## 6. Änderungen veröffentlichen

Wenn Sie die Dateien lokal geändert haben, müssen sie auf den Webserver (GitHub Pages) hochgeladen werden:

1. Die geänderten Dateien in Ihr GitHub-Repository laden (per `git` oder GitHub Web-Interface)
2. Nach 1–2 Minuten ist die Website automatisch aktualisiert

> Wenn Sie Hilfe beim Hochladen brauchen, fragen Sie Ihre betreuende Person — dieser Schritt
> lässt sich später auch automatisieren.

---

## Für Eilige: Wie aktualisiere ich mein Fahrzeugangebot?

1. Datei `data/vehicles.json` öffnen (mit Editor oder TextEdit)
2. Das gewünschte Fahrzeug finden (oder ein neues einfügen)
3. Werte wie Preis, Kilometerstand, Status ändern
4. Datei speichern
5. Hochladen (git push oder GitHub Web-Interface)
6. Fertig — nach 1–2 Minuten ist die Website aktualisiert

---

## Brauchen Sie Hilfe?

Wenn etwas nicht funktioniert:
1. Prüfen Sie die Datei auf [jsonlint.com](https://jsonlint.com) (für `.json`-Dateien)
2. Vergleichen Sie mit den Beispielen oben
3. Kontaktieren Sie die Person, die die Website eingerichtet hat

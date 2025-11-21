# Arbeitszeiterfassung — Zeit_Rechner

Eine kleine, lokales HTML-Tool zur schnellen Erfassung und Auswertung von Arbeitszeiten. Die App speichert Einträge in `localStorage`, bietet Export/Import als JSON, einfache Bearbeitung von Einträgen, Undo für Löschvorgänge und eine "Alle löschen"-Funktion.

**Zweck**
- Schnell Arbeitsstunden pro Tag erfassen.
- Differenzen gegenüber regulären Arbeitszeiten anzeigen (Woche / Monat / Jahr / Gesamt).
- Daten lokal speichern und als JSON exportieren/importieren.

**Dateien im Projekt**
- `Rechner.html` — die komplette Anwendung (HTML/CSS/JS). Öffnen im Browser genügt.

**Features**
- Einträge hinzufügen (heutiges Datum, Stundenangabe).
- Reguläre Arbeitszeiten pro Wochentag einstellbar (Montag–Freitag).
- Speichern in `localStorage` (kein Server, nur lokal im Browser).
- Export: JSON-Download aller Einträge und Einstellungen.
- Import: JSON-Upload zum Wiederherstellen oder Übertragen von Daten.
- Einträge bearbeiten (✎), löschen (×) und innerhalb von ~8 Sekunden rückgängig machen.
- "Alle löschen"-Funktion mit Bestätigung.

**Schnelle Nutzung**
1. Datei `Rechner.html` per Doppelklick im Browser öffnen oder per einfachem HTTP-Server (siehe unten).
2. Einstellungen öffnen (Zahnradsymbol), Arbeitszeiten anpassen und speichern.
3. In das Eingabefeld Stunden eintragen und auf "Hinzufügen" klicken oder Enter drücken.
4. Einträge werden in der Liste angezeigt — bearbeiten oder löschen möglich.
5. Export/Import zur Datensicherung verwenden.

**HTTP-Server (optional)**
Wenn du statische Dateien per HTTP bereitstellen möchtest (z. B. für bequemes Testen), kannst du einen einfachen Server starten. Öffne PowerShell im Ordner `Zeit_Rechner` und führe aus:

```powershell
# Python (wenn installiert)
python -m http.server 8000;
# Oder mit PowerShell: startet einen sehr einfachen Server mit dotnet (falls .NET verfügbar)
# Weitere Optionen: mit einem Node-Server oder Live Server VSCode Extension
```
Dann im Browser zu `http://localhost:8000/Rechner.html` navigieren.

**Datenformat (Export / Import)**
Beim Export wird eine JSON-Datei erzeugt mit diesem Schema:

```json
{
  "entries": [
    {
      "id": 1630000000000,
      "date": "2023-08-27",
      "workedHours": 8.5,
      "expectedHours": 8.75,
      "difference": -0.25,
      "dayOfWeek": 1
    }
  ],
  "settings": {
    "1": 8.75,
    "2": 8.75,
    "3": 8.75,
    "4": 8.75,
    "5": 4.5
  }
}
```

Beim Import werden vorhandene `entries` und `settings` übernommen. Die App validiert nur oberflächlich; prüfe die Datei, falls der Import fehlschlägt.

**Datenschutz & Sicherheit**
- Alle Daten bleiben lokal in deinem Browser (`localStorage`). Es findet keine Übertragung an Dritte statt.
- Exportierte Dateien enthalten alle gespeicherten Daten unverschlüsselt. Bewahre sie sicher auf.

**Tipps & Troubleshooting**
- Wenn Einträge nach dem Schließen des Browsers weg sind: Stelle sicher, dass du nicht im privaten/Inkognito-Modus arbeitest (dort ist `localStorage` oft temporär).
- Beim Import einer ungültigen Datei erscheint eine Fehlermeldung. Öffne die JSON-Datei in einem Editor und prüfe die Struktur.
- Falls die Edit-Funktion stört: derzeit verwendet das Projekt ein einfaches `prompt()`-Dialogfeld zum Bearbeiten. Ich kann auf Wunsch ein eigenes Modal einbauen.

**Weiterentwicklung (Vorschläge)**
- CSV-Export für Excel/Sheets.
- Datumsauswahl beim Anlegen eines Eintrags (aktuell wird heutiges Datum verwendet).
- UI-Modal für Bearbeitung statt `prompt()`.
- Filter (Datum/Monat/Jahr) und Druck-Export.

**Mitwirken / Hinweise**
- Einfach Änderungen lokal in `Rechner.html` vornehmen. Wenn du möchtest, kann ich beim Einbauen von Features helfen (z. B. Modal, CSV-Export, Datumsauswahl).

**Lizenz**
Dieses Projekt ist minimal — verwende und passe es frei für private Zwecke. Wenn du eine spezifische Lizenz wünschst (z. B. MIT), kann ich eine `LICENSE`-Datei hinzufügen.

---

Bei Fragen oder wenn ich ein Feature (z. B. Edit-Modal oder CSV-Export) direkt implementieren soll: sag Bescheid, ich mache das gern.

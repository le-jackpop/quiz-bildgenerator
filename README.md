# Google Apps Script: Bilderlinks aus Google Sheets in Google Drive speichern

## Überblick
Dieses Google Apps Script automatisiert das Speichern von Bildern aus einer Google Sheets-Tabelle in einem Google Drive-Ordner. Das Script liest Bild-URLs aus einer Spalte der Tabelle, lädt die Bilder herunter und speichert sie im angegebenen Drive-Ordner. Zusätzlich erstellt das Script eine ZIP-Datei mit allen gespeicherten Bildern.

## Funktionen
- **Bilder herunterladen**: Liest Bild-URLs aus einer Google Sheets-Tabelle und speichert die Bilder in einem Google Drive-Ordner.
- **ZIP-Datei erstellen**: Fasst alle heruntergeladenen Bilder in einer ZIP-Datei zusammen und speichert sie im selben Drive-Ordner.
- **Automatisierung**: Kann manuell oder durch einen Trigger regelmäßig ausgeführt werden.

## Voraussetzungen
- Ein Google Konto mit Zugriff auf Google Drive und Google Sheets.
- Eine Google Sheets-Tabelle mit einer Spalte, die Bild-URLs enthält.
- Ein Google Drive-Ordner, in dem die Bilder und die ZIP-Datei gespeichert werden sollen.

## Installation
1. Öffne [Google Apps Script](https://script.google.com/).
2. Erstelle ein neues Projekt.
3. Kopiere den Code der einzelnen JS-Dateien in den Code-Editor (separat oder als einzelnes File).
4. Ersetze ggf. die Variablen für den Tabellenblatt-Namen und die Drive-Ordner-ID.
5. Speichere das Skript und autorisiere den Zugriff auf Google Drive und Google Sheets.

## Nutzung
1. Öffne das Google Apps Script-Projekt.
2. Führe die Hauptfunktion (`generateImagesFromSheet`) aus.
3. Die Bilder werden in den angegebenen Drive-Ordner heruntergeladen.
4. Eine ZIP-Datei mit allen Bildern wird ebenfalls im Ordner gespeichert.

## Automatisierung
Um das Skript regelmäßig auszuführen:
- Gehe zu **Editor > Auslöser**.
- Klicke auf **Trigger hinzufügen**.
- Wähle `generateImagesFromSheet` und setze ein passendes Intervall (z. B. täglich).

## Fehlerbehandlung
- Stelle sicher, dass die URLs gültige Bild-Links sind.
- Prüfe, ob das Google Drive-Kontingent nicht überschritten wurde.
- Falls Bilder nicht gespeichert werden, überprüfe die Zugriffsrechte auf den Drive-Ordner.

## Lizenz
Dieses Projekt steht unter der MIT-Lizenz. Siehe `LICENSE` für Details.

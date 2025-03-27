function generateImagesForSheets() {
	var ss = SpreadsheetApp.getActiveSpreadsheet();
	var sheets = ss.getSheets();

	// Prüfen, ob der Hauptordner existiert
	var mainFolderId = "1qPiZfbe04j5HZyhEdBDKOCnE0PsZiwfH";
	var mainFolder = DriveApp.getFolderById(mainFolderId);
	if (!mainFolder) {
		SpreadsheetApp.getUi().alert(
			"❌ Fehler: Hauptordner nicht gefunden! Ordner-ID: " + mainFolderId
		);
		return;
	}

	// Prüfen, ob das "EXPORT"-Tabellenblatt existiert (bzw. richtig benannt ist)
	var exportSheet = ss.getSheetByName("EXPORT");
	if (!exportSheet) {
		SpreadsheetApp.getUi().alert("❌ EXPORT-Tabellenblatt nicht gefunden");
		return; // // Wenn "EXPORT"-Tab falsch benannt ist: abbrechen
	}

	// Prüfen, ob der Ziel-Unterordner existiert – falls nicht: erstellen
	var subFolder = getOrCreateSubFolder(exportSheet, mainFolder);

	// EXPORT-Tabellenblatt leeren
	exportSheet
		.getRange(
			5,
			2,
			exportSheet.getLastRow() - 4,
			exportSheet.getLastColumn() - 1
		)
		.clearContent();

	// Leere H2 für den neuen ZIP-Link
	exportSheet.getRange("H2").clearContent();

	// Zip-Datei vorbereiten
	var zipFiles = [];
	var zipName = subFolder + "_bilder.zip";

	// Tabellenblätter durchgehen
	for (var s = 0; s < sheets.length; s++) {
		var sheet = sheets[s];
		var sheetName = sheet.getName();

		// "EXPORT"-Blatt überspringen
		if (sheetName === "EXPORT") {
			continue;
		}

		// Spalten-Nummer für Bildlink aus Zeile 4 (Headings) holen
		var bildlinkCol = getColNumber(sheet, "Bildlink");
		if (!bildlinkCol) {
			continue;
		}

		// Bildlinks aus dem Tabellenblatt holen
		var dataRange = sheet.getRange(
			5,
			bildlinkCol,
			sheet.getLastRow() - 4,
			1
		);
		var urls = dataRange.getValues();

		// Zeilen durchgehen und gefundenen Bildlinks verarbeiten
		for (var i = 0; i < urls.length; i++) {
			var cellValue = urls[i][0];

			if (cellValue) {
				// Mehrere Links in einer Zelle mit "\n" trennen (Zeilenumbrüche)
				var imageUrls = cellValue
					.split("\n")
					.map((url) => url.trim())
					.filter((url) => url !== "");

				// Wieviele
				var anzahlUrls = imageUrls.length;

				// Jeden einzelnen Link verarbeiten
				imageUrls.forEach((imageUrl, imgIndex) => {
					var result = handleUrl(
						anzahlUrls,
						imageUrl,
						imgIndex,
						sheet,
						i,
						subFolder,
						exportSheet
					);
					if (result) {
						zipFiles.push(result); // Falls erfolgreich, in ZIP packen
					}
				});
			}
		}
	}

	if (zipFiles.length > 0) {
		var zipBlob = Utilities.zip(zipFiles).setName(zipName);
		var zipFile = subFolder.createFile(zipBlob);

		// Link zum ZIP-File in H2 speichern
		exportSheet.getRange("H2").setValue(zipFile.getUrl());
	} else {
		SpreadsheetApp.getUi().alert(
			"⚠️ Keine Bilder gefunden oder ZIP konnte nicht erstellt werden."
		);
	}
}

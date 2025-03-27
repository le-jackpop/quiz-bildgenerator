/**
 * Prüft, ob ein Unterordner existiert. Falls nicht, wird er erstellt.
 * @param {Sheet} exportSheet Das EXPORT-Tabellenblatt
 * @param {Folder} mainFolder Der Hauptordner
 * @returns {Folder} Der Unterordner
 */
function getOrCreateSubFolder(exportSheet, mainFolder) {
	// Namen für den Unterordner aus Zelle E2 holen
	var folderName = exportSheet.getRange("E2").getValue();

	// Vom Hauptordner den Unterordner mit dem Namen "folderName" suchen
	var folders = mainFolder.getFoldersByName(folderName);

	if (!folders.hasNext()) {
		return mainFolder.createFolder(folderName); // Erstelle den Ordner, weil er nicht existiert
	} else {
		var ui = SpreadsheetApp.getUi();
		var response = ui.alert(
			"Warnung",
			"Der Ordner '" +
				folderName +
				"' existiert bereits. Möchtest du ihn überschreiben?",
			ui.ButtonSet.YES_NO
		);

		// Falls "Nein" gewählt wurde, Ausführung des Scripts abbrechen
		if (response == ui.Button.NO) {
			throw new Error(
				"⚠️ Abbruch durch den Benutzer: Der Ordner wurde nicht überschrieben."
			);
		}

		// Falls "Ja" gewählt wurde, Inhalt des Ordners löschen
		var existingFolder = folders.next();
		var files = existingFolder.getFiles();
		while (files.hasNext()) {
			files.next().setTrashed(true);
		}
		return existingFolder; // Rückgabe des existierenden Ordners
	}
}

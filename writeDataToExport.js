/**
 * Metadaten und generierten Drive-Link in EXPORT-Tabellenblatt speichern
 * @param {Sheet} exportSheet Das EXPORT-Tabellenblatt
 * @param {string} runde Name des gelesenen Tabellenblatts, entspricht der jeweiligen Quizrunde
 * @param {string} frage Nummer der Frage, die ein Bild enthält
 * @param {string} extension Dateiendung des Bildes
 * @param {number} width Breite des Bildes
 * @param {number} height Höhe des Bildes
 * @param {string} filesizeText Dateigröße des Bildes mit "KB-oderMB"-Formatierung
 * @param {string} drivelink Link zum Bild in Google Drive
 */
function writeDataToExport(exportSheet, ...values) {
	// Berechne die nächste leere Zeile
	var nextEmptyRow =
		exportSheet
			.getRange(5, 8, exportSheet.getLastRow()) // 8 = Drivelink-Spalte
			.getValues()
			.findIndex(function (row) {
				return !row[0]; // Suche nach der nächsten leeren Reihe
			}) + 5;

	values.forEach((value, index) => {
		exportSheet.getRange(nextEmptyRow, index + 2).setValue(value);
	});
}

/**
 * Spaltennummern ermitteln
 * @param {Sheet} sheet Das Tabellenblatt
 * @param {string} colName Der Name der Spalte
 * @returns {number} Die Spaltennummer
 */
function getColNumber(sheet, colName) {
	var headers = sheet.getRange(4, 1, 1, sheet.getLastColumn()).getValues()[0];
	var colNumber = headers.indexOf(colName) + 1;

	if (colNumber === 0) {
		SpreadsheetApp.getUi().alert(
			"Spalte Bildlink nicht in '" +
				sheet.getName() +
				"' gefunden! Springe zu nächstem Tabellenblatt."
		);
		return false;
	}
	return colNumber;
}
